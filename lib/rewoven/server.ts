import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import path from 'node:path';
import {randomBytes,randomUUID,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
import {cookies} from 'next/headers';
import {products,Product} from './catalog';
import {dataDirectory} from './deployment';
let instance:DatabaseSync;
export function db(){if(instance)return instance;const dir=dataDirectory();mkdirSync(dir,{recursive:true});instance=new DatabaseSync(path.join(dir,'store.sqlite'));instance.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'customer',approved INTEGER NOT NULL DEFAULT 0,addresses TEXT NOT NULL DEFAULT '[]',created TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS resets(hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS catalog(id TEXT PRIMARY KEY,data TEXT NOT NULL,trade_price INTEGER NOT NULL,moq INTEGER NOT NULL DEFAULT 6);
CREATE TABLE IF NOT EXISTS stock(product_id TEXT NOT NULL REFERENCES catalog(id),size TEXT NOT NULL,color TEXT NOT NULL,quantity INTEGER NOT NULL CHECK(quantity>=0),PRIMARY KEY(product_id,size,color));
CREATE TABLE IF NOT EXISTS enquiries(id TEXT PRIMARY KEY,data TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'PENDING',created TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,user_id TEXT,email TEXT NOT NULL,customer TEXT NOT NULL,items TEXT NOT NULL,subtotal INTEGER NOT NULL,shipping INTEGER NOT NULL,tax INTEGER NOT NULL,total INTEGER NOT NULL,status TEXT NOT NULL DEFAULT 'PENDING',payment_id TEXT UNIQUE,gateway_id TEXT UNIQUE,tracking TEXT,reserved_until INTEGER,created TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS quotes(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),items TEXT NOT NULL,total INTEGER NOT NULL,status TEXT NOT NULL DEFAULT 'REQUESTED',order_id TEXT,created TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS payment_events(id TEXT PRIMARY KEY,created TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS rate_limits(key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires INTEGER NOT NULL);
`);
// Inspect schema rather than swallowing all migration errors.
const columns=(table:string)=>(instance.prepare(`PRAGMA table_info(${table})`).all() as {name:string}[]).map(c=>c.name);
if(!columns('orders').includes('reserved_until'))instance.exec('ALTER TABLE orders ADD COLUMN reserved_until INTEGER');
if(!columns('orders').includes('payment_checked_at'))instance.exec('ALTER TABLE orders ADD COLUMN payment_checked_at INTEGER');
if(!columns('quotes').includes('order_id'))instance.exec('ALTER TABLE quotes ADD COLUMN order_id TEXT');
if(!columns('orders').includes('stock_released')){
  instance.exec('ALTER TABLE orders ADD COLUMN stock_released INTEGER NOT NULL DEFAULT 0');
  instance.exec("UPDATE orders SET stock_released=1 WHERE status='EXPIRED'");
}
instance.exec('CREATE UNIQUE INDEX IF NOT EXISTS quotes_order_id ON quotes(order_id) WHERE order_id IS NOT NULL');
instance.exec('CREATE INDEX IF NOT EXISTS orders_reservation ON orders(status,reserved_until)');
const insert=instance.prepare('INSERT OR IGNORE INTO catalog(id,data,trade_price,moq) VALUES(?,?,?,?)');const variant=instance.prepare('INSERT OR IGNORE INTO stock(product_id,size,color,quantity) VALUES(?,?,?,?)');for(const p of products){insert.run(p.id,JSON.stringify(p),Math.round(p.price*.6),6);for(const size of p.sizes)variant.run(p.id,size,p.color,20)}return instance}
export function catalog():Product[]{const sold=new Map<string,number>();for(const row of db().prepare("SELECT items FROM orders WHERE status IN ('PAID','PROCESSING','DISPATCHED','DELIVERED')").all() as {items:string}[])for(const i of JSON.parse(row.items))sold.set(i.id,(sold.get(i.id)||0)+i.qty);return (db().prepare('SELECT data FROM catalog').all() as {data:string}[]).map(r=>{const p=JSON.parse(r.data) as Product;const available=db().prepare('SELECT size FROM stock WHERE product_id=? AND color=? AND quantity>0').all(p.id,p.color) as {size:string}[];return {...p,sales:sold.get(p.id)||0,sizes:p.sizes.filter(size=>available.some(v=>v.size===size))}})}
export function hash(value:string){return createHash('sha256').update(value).digest('hex')}
export function passwordHash(password:string){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex')}
export function passwordMatches(password:string,stored:string){const[salt,key]=stored.split(':');if(!salt||!key)return false;const digest=scryptSync(password,salt,64);const expected=Buffer.from(key,'hex');return digest.length===expected.length&&timingSafeEqual(digest,expected)}
export type User={id:string;email:string;name:string;role:string;approved:number;addresses:string};
export async function currentUser(){const token=(await cookies()).get('rewoven_session')?.value;if(!token)return null;return db().prepare('SELECT u.id,u.email,u.name,u.role,u.approved,u.addresses FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.hash=? AND s.expires>?').get(hash(token),Date.now()) as User|undefined||null}
export async function session(userId:string){const token=randomBytes(32).toString('hex');db().prepare('INSERT INTO sessions VALUES(?,?,?)').run(hash(token),userId,Date.now()+7*86400000);(await cookies()).set('rewoven_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:604800})}
export async function logout(){const c=await cookies();const token=c.get('rewoven_session')?.value;if(token)db().prepare('DELETE FROM sessions WHERE hash=?').run(hash(token));c.delete('rewoven_session')}
export function rateLimit(key:string,max=10){const now=Date.now();db().prepare('DELETE FROM rate_limits WHERE expires<?').run(now);const r=db().prepare('SELECT count FROM rate_limits WHERE key=?').get(key) as {count:number}|undefined;if(r&&r.count>=max)throw new Error('Too many requests. Please try again in 15 minutes.');db().prepare('INSERT INTO rate_limits VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1').run(key,now+900000)}
export function createUser(email:string,name:string,password:string){const id=randomUUID();db().prepare('INSERT INTO users(id,email,name,password,created) VALUES(?,?,?,?,?)').run(id,email,name,passwordHash(password),new Date().toISOString());return id}
export function settings(){return Object.fromEntries((db().prepare('SELECT key,value FROM settings').all() as {key:string;value:string}[]).map(r=>[r.key,JSON.parse(r.value)]))}
export function ensureAdmin(){const email=process.env.REWOVEN_ADMIN_EMAIL?.trim().toLowerCase(),password=process.env.REWOVEN_ADMIN_PASSWORD;if(!email||!password||password.length<14)return;const found=db().prepare('SELECT id FROM users WHERE email=?').get(email);if(!found){const id=createUser(email,'Rewoven administrator',password);db().prepare("UPDATE users SET role='admin' WHERE id=?").run(id)}}
export function transaction<T>(fn:()=>T){db().exec('BEGIN IMMEDIATE');try{const result=fn();db().exec('COMMIT');return result}catch(e){db().exec('ROLLBACK');throw e}}
