import {db,transaction} from './server';
import {Product} from './catalog';

export type StockChange={size:string;color:string;quantity:number;expected:number};
export function saveProduct(p:Product,tradePrice:number,moq:number,changes:StockChange[]=[]){
  if(!p?.id||!/^[a-z0-9-]+$/.test(p.id)||typeof p.name!=='string'||!p.name.trim()||
    !Number.isInteger(p.price)||p.price<1||p.price>10000000||!p.color||
    !Array.isArray(p.sizes)||!p.sizes.length||new Set(p.sizes).size!==p.sizes.length||
    !p.sizes.every(s=>['S','M','L','XL','XXL'].includes(s))||
    !Number.isInteger(tradePrice)||tradePrice<1||!Number.isInteger(moq)||moq<1||
    !Array.isArray(changes)||changes.length>5)throw new Error('Invalid product, pricing or stock data.');
  const keys=new Set<string>();
  for(const c of changes){
    const key=c.color+':'+c.size;
    if(keys.has(key)||!p.sizes.includes(c.size)||c.color!==p.color||!Number.isInteger(c.quantity)||c.quantity<0||!Number.isInteger(c.expected)||c.expected<0)throw new Error('Invalid stock adjustment.');
    keys.add(key);
  }
  transaction(()=>{
    db().prepare('INSERT INTO catalog VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,trade_price=excluded.trade_price,moq=excluded.moq').run(p.id,JSON.stringify(p),tradePrice,moq);
    // A metadata edit never resets stock. New variants start unavailable.
    for(const size of p.sizes)db().prepare('INSERT OR IGNORE INTO stock VALUES(?,?,?,0)').run(p.id,size,p.color);
    for(const c of changes){
      const result=db().prepare('UPDATE stock SET quantity=? WHERE product_id=? AND size=? AND color=? AND quantity=?').run(c.quantity,p.id,c.size,c.color,c.expected);
      if(result.changes!==1)throw new Error('Stock changed since you opened this product. Reload before adjusting inventory.');
    }
  });
}
