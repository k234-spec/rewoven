# Rewoven setup and handover

## Run locally

Requires Node.js 24 (built-in SQLite), npm and writable persistent storage.

```powershell
npm.cmd install
npm.cmd run dev -- --port 3000
```

Open http://localhost:3000. The reference-inspired collection is `/shop`.

```powershell
npx.cmd tsc --noEmit
npx.cmd tsx tests/rewoven-server.test.ts
npm.cmd run build
npm.cmd start
```

Stop the development server before building: both use `.next`. Use `.cmd` wrappers if PowerShell blocks npm scripts.

## Implemented

Responsive homepage, sticky header, mobile menu, search, category strip, collection filters and sorting, two/three-column grids, active filters and empty states. Product pages and Quick View require available colour and size selection and include quantity, wishlist, zoom, size guide, cart and checkout. Additional product `images` enable gallery thumbnails and alternate-image hover. Best sellers only appear once paid order data exists.

Accounts provide signup/login/logout, scrypt password hashing, opaque HTTP-only database sessions, saved addresses and order history. Cart and wishlist persist on the same device; they do not sync across devices. Password reset uses a configurable merchant email adapter. Order lookup requires reference and email.

Wholesale applications persist in SQLite. Approved users can access protected trade prices, bulk size quantities, configurable MOQ, quantity tiers, quotation requests and approved-quote test checkout. Admin supports products, image paths, variants, stock, retail/trade pricing, orders/tracking, enquiries, account approval, quotations, brand settings and policy text.

Server totals, stock reservation, Razorpay test order creation, HMAC verification, captured-payment API verification and signed webhooks are implemented. Duplicate notifications do not create duplicate orders. Live keys are deliberately rejected.

The hero's WebGL textile mesh loads separately; reduced motion and unsupported devices retain a static accent. No garment rotation is enabled without actual 360-degree assets.

## Merchant configuration

Merge `.env.rewoven.example` into `.env.local` or your deployment environment. Keep secrets private.

1. Set `REWOVEN_ADMIN_EMAIL` and a unique `REWOVEN_ADMIN_PASSWORD` of at least 14 characters. The account is created on the first authentication request. Existing passwords are not overwritten by environment changes.
2. Sign in at `/admin/login`. Set announcement, email, phone, WhatsApp digits with country code, Instagram handle and optional address.
3. Set flat shipping in INR and an additional tax percentage explicitly. Zero is valid. This is a flat calculator, not a complete GST invoice implementation; use merchant-approved requirements.
4. Replace demonstration products, prices and stock. Add `images: ["/rewoven/front.webp", "/rewoven/back.webp"]` to product JSON for gallery and hover images. Place the files in `public/rewoven` through the deployment filesystem. Browser file uploads are not implemented.
5. Supply `description`, `fabric`, `fit`, `care`, and `included`. Replace the generic size guide with actual measurements. Each current product has one colour and multiple stock-controlled sizes. Use separate product records for other colours or extend the model for unified multi-colour products.
6. Save merchant-approved Shipping, Returns, Privacy and Terms content in admin. Empty policies display an approval-pending placeholder. No promotions are invented.
7. Configure reset emails: `REWOVEN_MAIL_WEBHOOK` receives `{to, template:"password-reset", url}` with Bearer `REWOVEN_MAIL_TOKEN`. Connect a trusted email adapter. Without it, reset explicitly reports unconfigured delivery. Enquiries are saved for administrator review, not automatically emailed.

## Payment configuration and limits

Set `RAZORPAY_KEY_ID` (must start with `rzp_test_`), `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET`. Subscribe to `payment.captured` and `payment.failed` at `https://YOUR-DOMAIN/api/rewoven/webhook`.

Checkout uses server-calculated prices. Success requires signature verification plus a captured payment retrieved from Razorpay, or a signed captured webhook. Amount and currency are checked. Dismissal marks a payment cancelled without claiming a charge; delayed capture can still reconcile it to paid.

No real gateway transaction was executed: Rewoven test credentials were not supplied. Test UPI/cards, success, failure, cancellation and notification retries using your merchant account before launch. See https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/.

Pending, failed and cancelled orders retain reserved stock to avoid overselling if capture arrives late. Add automated reservation expiry, reconciliation and refunds before commercial launch. Quotes whose computed totals change require a new quote. Interrupted quote payments remain visible for manual reconciliation. Live payments and automatic refunds are not enabled.

## Storage and deployment

Data lives in `.rewoven-data/store.sqlite` with WAL journaling. `REWOVEN_DATA_DIR` can point to a persistent private directory. Never expose it through the web server. Back it up using SQLite backup facilities.

Deploy as a Node.js 24 application with persistent storage on one database host. Ephemeral/serverless filesystems are unsuitable. Multiple application instances require migration to a shared database with shared rate limits and stock transactions. The inherited Prisma schema is not the Rewoven database; legacy `/api/admin/*` endpoints return 410.

## Assets and reference

The original AI-generated demo editorial is saved at `public/rewoven/editorial.png`. `look-0.webp` through `look-3.webp` are its individual panels, created using the built-in imagegen tool. These fictional garments are not merchant inventory. Replace them with Rewoven-owned or licensed photography before launch. Octave photographs and logos were not reused.

Visual browsing reference: https://octave.co.in/collections/all-clothing-men.

Generation prompt:

> Create a photorealistic fashion editorial contact sheet for Rewoven Indian men's occasionwear demo store. Landscape 1536x1024, exactly FOUR equally wide vertical photographic panels edge to edge, no borders, no text. Each panel a separate full length head-to-shoes Indian male model with generous headroom and feet visible, standing against warm ivory sandstone architecture in gentle daylight. Panel 1: elegant ivory embroidered sherwani, cream trousers, beige mojari. Panel 2: deep burgundy Indo-Western long asymmetric jacket and black trousers. Panel 3: black tailored embroidered bandhgala Jodhpuri suit. Panel 4: muted sage green textured kurta with matching waistcoat and cream trousers. Luxury restrained Indian wedding campaign, authentic detailed textiles, editorial 85mm photography, calm poses, no accessories covering garments, no logos. These are fictional demo garment concepts.

Wordmark/favicon are typography/SVG. Fonts are Playfair Display and Plus Jakarta Sans. Genuine alternate angles and garment models have not been supplied.

## Verification

`tests/rewoven-server.test.ts` checks totals, invalid variants, combined quantities, stock limits, trade authorization, MOQ, tier pricing, password hashes, signatures, amount mismatch and notification idempotency in an isolated test database.

Browser checks cover desktop/mobile rendering, filters, required size/colour selection, cart and horizontal overflow. Launch testing must additionally cover real gateway/email services, merchant images, assistive technology, persistent hosting and approved policies.

For the default demonstration catalogue, run `npx.cmd playwright install chromium`, start the local server, then run `node tests/rewoven-browser.cjs`. This suite also verifies signup, addresses, private admin/trade access, enquiry persistence, server-owned pricing and forged-signature rejection. It creates and removes its own test account/enquiry. Screenshots are written to `tests/artifacts/`.
