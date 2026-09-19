# Madamcutie — Technology Stack Specification & Architectural Blueprint

---

## 1. Current State vs. Recommended Future Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CURRENT STATE ARCHITECTURE                      │
│                                                                        │
│   Static HTML / CSS / JS  ──►  Vercel Edge Static CDN                  │
│             │                                                          │
│             ├── State: Browser LocalStorage (Cart, Wishlist)           │
│             ├── Database: Flat JS Array (js/products.js)               │
│             ├── Checkout: URL Redirect to WhatsApp (+91 9911852113)    │
│             └── Admin: Client-side password check ('madam2025')        │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ MIGRATION / UPGRADE
┌────────────────────────────────────────────────────────────────────────┐
│                      RECOMMENDED PRODUCTION STACK                      │
│                                                                        │
│   Frontend: Next.js 15 (App Router, React 19, TypeScript, Vanilla CSS) │
│             │                                                          │
│   Backend / Edge API: Next.js Serverless Route Handlers                │
│             │                                                          │
│   Database: Supabase (Managed PostgreSQL) + Prisma ORM                 │
│             │                                                          │
│   Integrations:                                                        │
│   ├── Payments:  Razorpay / Cashfree (UPI, Cards, Netbanking, COD)     │
│   ├── Logistics: Shiprocket API (Live Tracking, Automated AWB)         │
│   ├── Media:     Cloudinary (Auto WebP/AVIF Optimization, CDN)         │
│   ├── Messaging: WhatsApp Cloud API (Automated Order Confirmations)    │
│   └── Auth:      NextAuth.js / Supabase Auth (Role-based, bcrypt)      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Deep Dive: Current Tech Stack Audit

### 2.1 Inventory of Current Implementation
- **Core Languages:** HTML5, CSS3, ES6 JavaScript.
- **Server / Hosting:** Vercel Static Hosting (`Server: Vercel`, edge region `bom1` Mumbai, India).
  - Vercel `cleanUrls: true` (e.g., `/shop.html` 308 redirects to `/shop`).
- **Styling Architecture:**
  - Single external stylesheet (`/css/style.css` - 17.1 KB).
  - Google Fonts CDN: `Playfair Display` (serif) & `Plus Jakarta Sans` (sans-serif).
  - CSS Custom Properties (`:root`) for color palette and layout tokens.
- **State Management & Persistence:**
  - `localStorage.getItem('madamcutie_cart')`: Cart line items array.
  - `localStorage.getItem('madamWishlist')`: Wishlist product ID strings.
  - `localStorage.getItem('adminMode')`: In-place editor toggle flag.
  - `sessionStorage.getItem('adminAuth')`: Admin logged-in state.
- **Data Architecture:**
  - Static client data in `/js/products.js` (`const PRODUCTS = [...]` with 41 items).
  - Mirror static copy in `/js/products.json`.
- **Commerce & Fulfillment Mechanism:**
  - Unofficial Click-to-WhatsApp URL generator (`https://wa.me/919911852113?text=...`).
  - No database write upon order placement; no order numbers generated; no payment capture.
- **Admin System:**
  - Static file (`admin.html`) containing client-side verification `if (pwInput.value === 'madam2025')`.
  - Attempts to call missing backend route `/api/save-content` or local `server.py` (which fails on live production).

### 2.2 Critical Vulnerabilities of the Current Stack
1. **Zero Data Integrity:** Order details are lost if the customer abandons the WhatsApp screen before hitting "Send".
2. **Security Vulnerability:** Anyone can access the full admin dashboard by inspecting client JavaScript or executing `sessionStorage.setItem('adminAuth', 'true')` in browser devtools.
3. **No Dynamic Stock Control:** If an item sells out, it remains visible as "In Stock" until code is manually pushed.
4. **Poor SEO for Dynamic Routes:** Query param `/product.html?id=p5` serves generic meta tags ("View product details at Madamcutie") instead of product-specific Open Graph cards and structured JSON-LD schemas.

---

## 3. Technology Stack Evaluation & Comparison

| Criterion | Current Stack (Static JS) | Option A: Next.js 15 + Supabase (Recommended) | Option B: Shopify Headless |
| :--- | :--- | :--- | :--- |
| **Development Cost** | $0 / Free tier | Low / Open Source (Supabase Free/Pro) | Medium ($39+/mo + 2% app fees) |
| **Design Flexibility** | High (manual CSS) | **Infinite (Custom Luxury Experience)** | Moderate (Shopify constraints) |
| **SEO & SSR** | Low (Client-side rendering) | **High (Server Components + Dynamic Meta)**| High |
| **Performance (LCP)** | ~3.8s (uncompressed) | **< 1.5s (Next/Image + WebP CDN)** | ~2.5s |
| **Payment Options** | WhatsApp only | **Full India Stack (UPI, Cards, COD)** | Full (Shopify Payments / Razorpay) |
| **Admin Usability** | Broken on Vercel | **Secure Custom Admin Panel** | Shopify Admin Dashboard |

---

## 4. Recommended Production Architecture (Option A)

### 4.1 Frontend Layer
- **Framework:** **Next.js 15 (App Router)** with **React 19** and **TypeScript**.
  - *Why:* Server-side rendering (SSR) and Incremental Static Regeneration (ISR) ensure ultra-fast catalog loads, perfect SEO, and dynamic social preview cards for each product.
- **Styling:** **Vanilla CSS Modules / Tailwind CSS with Custom Design Tokens**.
  - Preserves Madamcutie’s bespoke gold metallic gradients, micro-interactions, and typography hierarchy without bulky UI framework bloat.
- **Client State Management:** **Zustand**.
  - Ultra-lightweight (1 KB) state store for shopping bag drawer, wishlist persistence, and filter selections.
- **Image Optimization:** **Next/Image + Cloudinary CDN**.
  - Automatic responsive generation, WebP/AVIF format switching, and blur placeholder generation.

---

### 4.2 Backend & Data Layer
- **Runtime:** **Next.js Serverless Functions / Edge API Routes**.
  - Hosted natively on Vercel with zero server maintenance.
- **Database:** **Supabase (PostgreSQL 16)**.
  - Relational integrity for product variants (sizes/colors), orders, transactions, and discount coupons.
- **ORM / Query Layer:** **Prisma ORM** or **Drizzle ORM**.
  - Type-safe database queries with automated migrations.
- **Authentication:** **Auth.js (NextAuth v5)** or **Supabase Auth**.
  - Secure bcrypt password hashing, JWT sessions, HTTP-only cookies, and multi-factor authentication (MFA) for the store admin.

---

### 4.3 Database Schema Blueprint (PostgreSQL / Prisma)

```prisma
// datasource db { provider = "postgresql", url = env("DATABASE_URL") }

model Product {
  id            String          @id @default(cuid())
  sku           String          @unique
  name          String
  slug          String          @unique
  category      String
  description   String          @db.Text
  fabricDetails String?         @db.Text
  careGuide     String?
  price         Decimal         @db.Decimal(10, 2)
  originalPrice Decimal?        @db.Decimal(10, 2)
  isSale        Boolean         @default(false)
  isBestseller  Boolean         @default(false)
  isFeatured    Boolean         @default(false)
  images        ProductImage[]
  variants      ProductVariant[]
  reviews       Review[]
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model ProductVariant {
  id         String      @id @default(cuid())
  productId  String
  product    Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  size       String      // "XS (32)", "S (34)", "M (36)", "L (38)", "XL (40)", "Free Size"
  color      String?     // "Emerald", "Mustard", "Noir", "Silver"
  stockQty   Int         @default(10)
  orderItems OrderItem[]
}

model ProductImage {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  altText   String?
  sortOrder Int      @default(0)
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique // e.g., "MC-2026-1042"
  customerName    String
  customerEmail   String
  customerPhone   String
  shippingAddress Json
  totalAmount     Decimal     @db.Decimal(10, 2)
  paymentMethod   String      // "RAZORPAY_UPI", "CARD", "COD", "WHATSAPP_ASSISTED"
  paymentStatus   String      // "PENDING", "PAID", "FAILED"
  orderStatus     String      @default("RECEIVED") // "RECEIVED", "PROCESSING", "DISPATCHED", "DELIVERED"
  trackingNumber  String?
  items           OrderItem[]
  createdAt       DateTime    @default(now())
}

model OrderItem {
  id        String         @id @default(cuid())
  orderId   String
  order     Order          @relation(fields: [orderId], references: [id], onDelete: Cascade)
  variantId String
  variant   ProductVariant @relation(fields: [variantId], references: [id])
  quantity  Int            @default(1)
  unitPrice Decimal        @db.Decimal(10, 2)
}
```

---

### 4.4 Third-Party Integrations & Services

```
┌──────────────────┐    Webhook     ┌─────────────────────┐
│ Razorpay Gateway │ ─────────────► │ Madamcutie Backend  │
│ (UPI/Cards/COD)  │                │ - Verifies Payment  │
└──────────────────┘                │ - Decrements Stock  │
                                    └──────────┬──────────┘
                                               │
                                 ┌─────────────┴─────────────┐
                                 ▼                           ▼
                     ┌───────────────────────┐   ┌───────────────────────┐
                     │ Shiprocket API        │   │ WhatsApp Cloud API    │
                     │ - Auto-generates AWB  │   │ - Dispatches Instant  │
                     │ - Courier Pickup Book │   │   Order Confirmation  │
                     └───────────────────────┘   └───────────────────────┘
```

1. **Payment Gateway (Razorpay India):**
   - Direct integration supporting Instant UPI (Google Pay, PhonePe, Paytm intent), RuPay/Visa/Mastercard, Netbanking, and Cash on Delivery (COD).
   - Razorpay Webhooks (`order.paid`, `payment.failed`) guarantee database status consistency.
2. **Logistics & Automated Shipping (Shiprocket API):**
   - Live pincode serviceability check on the product page.
   - Automated creation of shipment, courier allocation (Bluedart, Delhivery, DTDC), and Air Waybill (AWB) generation upon order approval in the admin panel.
3. **Automated WhatsApp Notifications (WhatsApp Business Cloud API / Gallabox):**
   - Automated transactional updates sent directly to the customer’s phone:
     - `Order Placed Successfully (with PDF Invoice link)`
     - `Order Dispatched (with live tracking URL)`
     - `Out for Delivery Alert`
4. **Media CDN (Cloudinary):**
   - Automatically processes high-res product shoots into WebP/AVIF formats at multiple widths (`320w`, `640w`, `1080w`), cutting initial image transfer weight by up to 80%.

---

## 5. Deployment, CI/CD & Security Architecture

### 5.1 Infrastructure Stack
- **Production Host:** Vercel Pro (Global Edge Network, Mumbai `bom1` compute).
- **Domain & DNS:** Cloudflare (DNS management, SSL/TLS full strict, DDoS protection, Web Application Firewall).
- **Database:** Supabase AWS Mumbai (`ap-south-1`) for single-digit millisecond latency to Indian shoppers.

### 5.2 Security Checklist
- [x] **Rate Limiting:** Protect `/api/checkout` and `/api/auth` using `@upstash/ratelimit` with Redis.
- [x] **Input Validation:** All API inputs validated using **Zod** schema parser.
- [x] **CSRF & Security Headers:** Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options headers enabled in `next.config.js`.
- [x] **Admin Route Guard:** Next.js Middleware checking cryptographically signed JWT session cookies before allowing access to `/admin/*`.
