import { NextResponse } from 'next/server';
import {saveProduct} from '@/lib/rewoven/inventory';
import { randomBytes, randomUUID } from 'node:crypto';
import {
  db,
  catalog,
  currentUser,
  createUser,
  passwordMatches,
  passwordHash,
  session,
  logout,
  hash,
  rateLimit,
  ensureAdmin,
  settings,
  transaction,
} from '@/lib/rewoven/server';
import {
  calculate,
  createOrder,
  gateway,
  verifySignature,
  confirmPayment,
  releaseExpiredReservations,
  releaseOrderStock,
  reconcileOrder,
} from '@/lib/rewoven/payments';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ok = (data: unknown, status = 200) => NextResponse.json(data, { status });
export async function GET(req: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  try {
    releaseExpiredReservations();
    const user = await currentUser();
    if (action === 'catalog') return ok({ products: catalog(), settings: settings() });
    if (action === 'me')
      return ok({
        user: user ? { ...user, addresses: JSON.parse(user.addresses) } : null,
        orders: user
          ? db()
              .prepare(
                'SELECT id,items,total,status,tracking,created FROM orders WHERE user_id=? ORDER BY created DESC'
              )
              .all(user.id)
          : [],
      });
    if (action === 'trade') {
      if (!user?.approved) return ok({ error: 'Approved wholesale account required.' }, 403);
      return ok({
        products: db().prepare('SELECT data,trade_price,moq FROM catalog').all(),
        quotes: db()
          .prepare('SELECT * FROM quotes WHERE user_id=? ORDER BY created DESC')
          .all(user.id),
      });
    }
    if (action === 'admin') {
      if (user?.role !== 'admin') return ok({ error: 'Administrator access required.' }, 403);
      return ok({
        products: db().prepare('SELECT * FROM catalog').all(),
        stock: db().prepare('SELECT * FROM stock').all(),
        orders: db().prepare('SELECT * FROM orders ORDER BY created DESC').all(),
        enquiries: db().prepare('SELECT * FROM enquiries ORDER BY created DESC').all(),
        users: db().prepare('SELECT id,email,name,role,approved FROM users').all(),
        quotes: db().prepare('SELECT * FROM quotes').all(),
        settings: settings(),
      });
    }
    return ok({ error: 'Not found' }, 404);
  } catch {
    return ok({ error: 'Unable to load data.' }, 500);
  }
}
export async function POST(req: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  try {
    releaseExpiredReservations();
    const origin = req.headers.get('origin');
    if (origin && origin !== new URL(req.url).origin)
      return ok({ error: 'Invalid request origin.' }, 403);
    if (Number(req.headers.get('content-length') || 0) > 50000)
      return ok({ error: 'Request too large' }, 413);
    const b = await req.json();
    const user = await currentUser();
    if (action === 'auth') {
      const email = String(b.email || '')
        .trim()
        .toLowerCase();
      rateLimit('auth:' + email);
      if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.');
      ensureAdmin();
      if (b.mode === 'Sign up') {
        if (
          typeof b.password !== 'string' ||
          b.password.length < 10 ||
          b.password.length > 200 ||
          !b.name
        )
          throw new Error('Enter your name and a password of at least 10 characters.');
        if (db().prepare('SELECT id FROM users WHERE email=?').get(email))
          throw new Error(
            'This email cannot be registered. Try signing in or resetting your password.'
          );
        const id = createUser(email, String(b.name).slice(0, 150), b.password);
        await session(id);
        return ok({ message: 'Your account is ready.' });
      }
      if (b.mode === 'Reset password') {
        const u = db().prepare('SELECT id FROM users WHERE email=?').get(email) as
          { id: string } | undefined;
        if (!process.env.REWOVEN_MAIL_WEBHOOK)
          return ok(
            { error: 'Password reset email delivery is awaiting merchant configuration.' },
            503
          );
        if (u) {
          const token = randomBytes(32).toString('hex');
          db().prepare('DELETE FROM resets WHERE user_id=?').run(u.id);
          db()
            .prepare('INSERT INTO resets VALUES(?,?,?)')
            .run(hash(token), u.id, Date.now() + 1800000);
          const sent = await fetch(process.env.REWOVEN_MAIL_WEBHOOK, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + (process.env.REWOVEN_MAIL_TOKEN || ''),
            },
            body: JSON.stringify({
              to: email,
              template: 'password-reset',
              url:
                (process.env.REWOVEN_SITE_URL || new URL(req.url).origin) +
                '/account?reset=' +
                token,
            }),
          });
          if (!sent.ok) throw new Error('Email delivery is unavailable. Please try again.');
        }
        return ok({
          message: 'If an account matches this email, a password reset link has been sent.',
        });
      }
      const found = db().prepare('SELECT id,password FROM users WHERE email=?').get(email) as
        { id: string; password: string } | undefined;
      if (
        typeof b.password !== 'string' ||
        b.password.length > 200 ||
        !found ||
        !passwordMatches(b.password, found.password)
      )
        return ok({ error: 'Email or password is incorrect.' }, 401);
      await session(found.id);
      return ok({ message: 'Welcome back.' });
    }
    if (action === 'reset') {
      if (typeof b.password !== 'string' || b.password.length < 10 || b.password.length > 200)
        throw new Error('Use a password between 10 and 200 characters.');
      const r = db()
        .prepare('SELECT user_id FROM resets WHERE hash=? AND expires>?')
        .get(hash(String(b.token)), Date.now()) as { user_id: string } | undefined;
      if (!r) throw new Error('This reset link has expired or is invalid.');
      transaction(() => {
        db()
          .prepare('UPDATE users SET password=? WHERE id=?')
          .run(passwordHash(b.password), r.user_id);
        db().prepare('DELETE FROM resets WHERE user_id=?').run(r.user_id);
        db().prepare('DELETE FROM sessions WHERE user_id=?').run(r.user_id);
      });
      return ok({ message: 'Password updated. You can now sign in.' });
    }
    if (action === 'logout') {
      await logout();
      return ok({ message: 'Signed out.' });
    }
    if (action === 'addresses') {
      if (!user) return ok({ error: 'Please sign in.' }, 401);
      if (!Array.isArray(b.addresses) || b.addresses.length > 10)
        throw new Error('Up to 10 addresses are supported.');
      for (const a of b.addresses)
        if (typeof a !== 'string' || a.length > 1000) throw new Error('Invalid address');
      db()
        .prepare('UPDATE users SET addresses=? WHERE id=?')
        .run(JSON.stringify(b.addresses), user.id);
      return ok({ message: 'Addresses saved.' });
    }
    if (action === 'totals') return ok(calculate(b.items, user, !!b.wholesale));
    if (action === 'checkout') {
      rateLimit('checkout:' + (user?.id || b.customer?.email || 'guest'), 20);
      return ok(await createOrder(b.items, b.customer, user, !!b.wholesale));
    }
    if (action === 'cancel') {
      if (
        !process.env.RAZORPAY_KEY_SECRET ||
        !verifySignature('cancel|' + b.gatewayId, b.token || '', process.env.RAZORPAY_KEY_SECRET)
      )
        return ok({ error: 'Invalid cancellation token' }, 403);
      const order=db().prepare('SELECT id FROM orders WHERE gateway_id=?').get(b.gatewayId) as {id:string}|undefined;
      if(order)releaseOrderStock(order.id,'CANCELLED');
      return ok({ message: 'Payment cancelled. Any delayed capture will be reconciled securely.' });
    }
    if (action === 'verify') {
      if (
        !process.env.RAZORPAY_KEY_SECRET ||
        !verifySignature(
          b.razorpay_order_id + '|' + b.razorpay_payment_id,
          b.razorpay_signature || '',
          process.env.RAZORPAY_KEY_SECRET
        )
      )
        return ok({ error: 'Payment signature is invalid.' }, 400);
      const p = await gateway('payments/' + encodeURIComponent(b.razorpay_payment_id));
      if (p.status !== 'captured' || p.currency !== 'INR' || p.order_id !== b.razorpay_order_id)
        return ok({ message: 'Payment is processing. Check your order status shortly.' }, 202);
      const order=confirmPayment(p.order_id,p.id,p.amount);
      const saved=db().prepare('SELECT status FROM orders WHERE id=?').get(order) as {status:string};
      return ok({message:saved.status==='PAYMENT_REVIEW'?'Payment received. Stock needs merchant review; please do not pay again.':'Payment confirmed.',order,status:saved.status});
    }
    if (action === 'tracking') {
      rateLimit('tracking:' + String(b.email), 15);
      const order = db()
        .prepare('SELECT id,status,tracking,created FROM orders WHERE id=? AND email=?')
        .get(String(b.reference), String(b.email).trim().toLowerCase());
      return order ? ok({ order }) : ok({ error: 'No order matches these details.' }, 404);
    }
    if (action === 'quote') {
      if (!user?.approved) return ok({ error: 'Approved wholesale account required.' }, 403);
      const total = calculate(b.items, user, true);
      const id = 'QT-' + randomUUID().slice(0, 8).toUpperCase();
      db()
        .prepare('INSERT INTO quotes(id,user_id,items,total,status,created) VALUES(?,?,?,?,?,?)')
        .run(
          id,
          user.id,
          JSON.stringify(total.items),
          total.total,
          'REQUESTED',
          new Date().toISOString()
        );
      return ok({ message: `Quote ${id} requested.`, id });
    }
    if (action === 'quote-pay') {
      if (!user?.approved) return ok({ error: 'Approved wholesale account required.' }, 403);
      const q = db()
        .prepare("SELECT items,total FROM quotes WHERE id=? AND user_id=? AND status='APPROVED'")
        .get(b.id, user.id) as { items: string; total: number } | undefined;
      if (!q) throw new Error('An approved quotation is required.');
      if (calculate(JSON.parse(q.items), user, true).total !== q.total)
        throw new Error('Pricing has changed. Please request an updated quotation.');
      return ok(await createOrder(JSON.parse(q.items),b.customer,user,true,String(b.id)));
    }
    if (action === 'admin') {
      if (user?.role !== 'admin') return ok({ error: 'Administrator access required.' }, 403);
      if (b.kind === 'reconcile') {
        const result=await reconcileOrder(String(b.id));
        return ok({message:'Payment status refreshed.',order:result});
      } else if (b.kind === 'approve') {
        db()
          .prepare('UPDATE users SET approved=? WHERE id=? AND role!=?')
          .run(b.approved ? 1 : 0, String(b.id), 'admin');
      } else if (b.kind === 'enquiry') {
        if (!['PENDING', 'REVIEWED', 'APPROVED', 'DECLINED'].includes(b.status))
          throw new Error('Invalid status');
        db().prepare('UPDATE enquiries SET status=? WHERE id=?').run(b.status, b.id);
      } else if (b.kind === 'order') {
        if (!['PROCESSING', 'DISPATCHED', 'DELIVERED'].includes(b.status))
          throw new Error('Invalid fulfilment status');
        const updated=db()
          .prepare(
            "UPDATE orders SET status=?,tracking=? WHERE id=? AND status IN ('PAID','PROCESSING','DISPATCHED','DELIVERED')"
          )
          .run(b.status, String(b.tracking || '').slice(0, 200), b.id);
        if(updated.changes!==1)throw new Error('Only a paid order with resolved stock can enter fulfilment.');
      } else if (b.kind === 'quote') {
        if (!['APPROVED', 'DECLINED'].includes(b.status))
          throw new Error('Invalid quotation status');
        db()
          .prepare("UPDATE quotes SET status=? WHERE id=? AND status='REQUESTED'")
          .run(b.status, b.id);
      } else if (b.kind === 'settings') {
        for (const key of [
          'announcement',
          'email',
          'phone',
          'whatsapp',
          'instagram',
          'address',
          'shipping',
          'taxPercent',
          'shippingPolicy',
          'returnsPolicy',
          'privacyPolicy',
          'termsPolicy',
        ])
          if (b.values[key] !== undefined) {
            const v = b.values[key];
            if (
              ['shipping', 'taxPercent'].includes(key) &&
              (!Number.isFinite(Number(v)) ||
                Number(v) < 0 ||
                Number(v) > (key === 'taxPercent' ? 100 : 100000))
            )
              throw new Error('Invalid amount');
            db()
              .prepare(
                'INSERT INTO settings VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value'
              )
              .run(key, JSON.stringify(v));
          }
      } else if (b.kind === 'product') {
        if(b.stock!==undefined)throw new Error('Bulk stock replacement is no longer supported. Reload the editor.');
        saveProduct(b.product,b.tradePrice,b.moq,b.stockChanges);
      } else throw new Error('Unknown admin action');
      return ok({ message: 'Changes saved.' });
    }
    return ok({ error: 'Not found' }, 404);
  } catch (e) {
    return ok({ error: e instanceof Error ? e.message : 'Unable to process request.' }, 400);
  }
}
