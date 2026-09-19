# Product Requirements Document (PRD) — Madamcutie E-Commerce Platform

---

## 1. Document Overview
- **Product Name:** Madamcutie Luxury Apparel E-Commerce Platform
- **Document Version:** 2.0
- **Status:** Draft / Ready for Engineering Review
- **Owner:** Product Management & System Architecture Team
- **Target Release:** Q4 2026

---

## 2. Executive Summary & Vision

### 2.1 Vision Statement
To establish **Madamcutie** as India’s premier digital destination for modern luxury ethnic wear, bridal co-ords, and artisanal corset blouses, seamlessly bridging Chandni Chowk’s generational craftsmanship with high-converting, friction-free modern e-commerce.

### 2.2 Core Value Proposition
- **Authentic Craftsmanship:** Authentic Indian mirror-work, heavy embroidery, sequins, cowrie shell tassels, and pearl embellishments.
- **Modern Silhouettes:** Structured corset tops, boned bustiers, and contemporary co-ords tailored for modern events (Haldi, Sangeet, Cocktail, Reception).
- **Hybrid Commerce:** Seamless combination of instant self-serve digital checkout (UPI, Cards, EMI, COD) and personalized, high-touch WhatsApp concierge shopping.

---

## 3. Goals & Success Metrics (KPIs)

| Metric | Current State (Baseline) | Target Goal (v2.0) | How It Will Be Measured |
| :--- | :--- | :--- | :--- |
| **Conversion Rate (CR)** | ~0.8% (Estimated via WA) | **2.5% - 3.2%** | Analytics: Sessions to Paid Orders |
| **Cart Abandonment Rate** | > 80% (Friction at WA) | **< 58%** | Drop-off between Add-to-Cart and Payment |
| **Mobile Core Web Vitals (LCP)** | ~3.8s (uncompressed PNGs) | **< 1.8s** | Google PageSpeed & CrUX Telemetry |
| **Average Order Value (AOV)** | ₹1,500 | **₹2,800 - ₹3,500** | Bundling, Co-ords upselling, Min. free shipping hook |
| **Assisted Order Conversion** | Unmeasured | **> 35% on WhatsApp** | Tracked UTM WhatsApp link interactions |
| **Admin Efficiency** | Manual file editing | **< 2 mins per product** | Admin dashboard product upload time |

---

## 4. User Personas

### Persona A: "The Wedding Guest / Festive Shopper" (Pooja, 27)
- **Profile:** IT professional based in Bengaluru/Delhi, attending 4-5 weddings and festive parties each season.
- **Needs:** Needs a glamorous, fitted corset blouse to pair with pre-draped sarees or lehenga skirts on short notice.
- **Pain Points:** Standard blouses don't fit right; hates waiting days for custom stitching; fears buying cheap replicas online.
- **Desired Solution:** Clear size guide with bust/waist dimensions, HD video/photo zoom of embroidery, pan-India fast shipping (3-5 days), and easy return/exchange.

### Persona B: "The Boutique Reseller / Wholesale Buyer" (Sunita, 38)
- **Profile:** Runs a bridal boutique in Jaipur/Surat.
- **Needs:** Sourcing authentic Chandni Chowk mirror-work and designer blouses in bulk lots (20-100 pieces).
- **Pain Points:** Traveling to Old Delhi markets is time-consuming; needs reliable catalog and direct manufacturer pricing.
- **Desired Solution:** Dedicated wholesale inquiry flow with tier pricing, GST invoicing, and direct WhatsApp B2B channel.

### Persona C: "The Fashion Content Creator / Influencer" (Aanya, 23)
- **Profile:** Instagram creator (25k followers) specializing in festive styling and GRWM reels.
- **Needs:** Access to trending viral pieces (mirror corsets, pearl bustiers) for photoshoots and affiliate earnings.
- **Desired Solution:** Seamless collaboration application and branded affiliate links/discount codes.

---

## 5. Functional Requirements & Feature Specifications

```
                                  ┌───────────────────────┐
                                  │      STOREFRONT       │
                                  └───────────┬───────────┘
               ┌──────────────────────────────┼─────────────────────────────┐
               ▼                              ▼                             ▼
      ┌─────────────────┐           ┌──────────────────┐          ┌───────────────────┐
      │ Catalog & Search│           │ PDP & Sizing     │          │ Dual Checkout     │
      │ - Multi-filter  │           │ - Image Zoom     │          │ - Gateway (Razor) │
      │ - Live search   │           │ - Size Guide     │          │ - WhatsApp Direct │
      │ - Instant sort  │           │ - Pincode check  │          │ - COD & Discounts │
      └─────────────────┘           └──────────────────┘          └───────────────────┘
               │                              │                             │
               └──────────────────────────────┼─────────────────────────────┘
                                              ▼
                                  ┌───────────────────────┐
                                  │    ADMIN & BACKEND    │
                                  │ - Product & Inventory │
                                  │ - Order Management    │
                                  │ - Invoicing & Pincodes│
                                  └───────────────────────┘
```

### Module 1: Storefront & Brand Experience
- **FR-1.1: Dynamic Announcement Bar**
  - Configurable marquee message supporting multi-slide announcements (e.g., Free Shipping threshold, seasonal discounts, coupons).
  - Configurable countdown timer for flash sales (e.g., "Festive Edit Ends in 04h 12m").
- **FR-1.2: Global Navigation & Predictive Search**
  - Sticky glassmorphic header with smooth scroll transition.
  - Live predictive search bar with instant thumbnail suggestions as user types (`debounced 300ms`).
  - Search query param parsing (`/shop?q=corset`) matching titles, descriptions, categories, and tags.
- **FR-1.3: Visual Storytelling & Hero Banner**
  - High-resolution hero banner with responsive art direction (desktop 16:9 banner vs. mobile 4:5 portrait crop).
  - Clear dual CTAs with hover physics.

---

### Module 2: Catalog, Browsing & Filters
- **FR-2.1: Multi-Faceted Filtering & Sorting**
  - **Category:** Designer Blouses, Corset Blouses, Party Tops, Co-ord Sets.
  - **Occasion:** Haldi & Mehendi, Sangeet & Cocktail, Reception, Wedding Day, Casual Glam.
  - **Fabric & Work:** Mirror Work, Sequin, Pearl Work, Velvet, Silk, Georgette, Cowrie Shells.
  - **Color Family:** Gold, Black, Emerald Green, Mustard Yellow, Red, Silver, Pastels.
  - **Price Range Slider:** Min to Max INR range.
  - **Sort Options:** Featured, Best Sellers, Price (Low to High), Price (High to Low), Newest Arrivals.
- **FR-2.2: Responsive Product Grid**
  - Desktop: 4 columns; Tablet: 3 columns; Mobile: 2 columns (crucial for luxury fashion browsing).
  - Dual-image swap on hover showing alternate angles or detail close-ups.
  - "Quick Add" drawer for instant size selection without leaving the catalog page.
- **FR-2.3: Persistent Wishlist**
  - User can click the heart icon to save favorites.
  - Wishlist persists across sessions (localStorage + authenticated customer profile).
  - Dedicated `/wishlist` view with one-click "Move All to Cart".

---

### Module 3: Product Detail Page (PDP)
- **FR-3.1: Visual Media Gallery**
  - Multi-image thumbnail carousel with smooth swipe on mobile.
  - Pinch-to-zoom and click-to-expand modal for inspection of hand-embroidery and mirror work.
  - Optional short video support (model turnaround 5-10 second clip).
- **FR-3.2: Accurate Size Selector & Measurement Chart**
  - Replace "Free Size" limitation with standard Indian & Western blouse sizing:
    - Sizes: **XS (32"), S (34"), M (36"), L (38"), XL (40"), XXL (42")**, plus "Custom Stitching / Free Size with Margins".
  - Interactive Size Modal detailing:
    - Bust measurement (inches & cm).
    - Underbust / Waist measurement.
    - Blouse length and sleeve length.
    - Margin note: "All blouses include 2 inches of inner margin for easy alteration."
- **FR-3.3: Delivery & Pincode Checker**
  - Input field for 6-digit Indian PIN code.
  - Live validation querying courier API (Shiprocket / Delhivery) displaying estimated delivery date (e.g., "Delivery by Tuesday, 15 Sept").
  - Cash on Delivery (COD) availability indicator.
- **FR-3.4: Rich Product Details Accordion**
  - Product Specs: Fabric composition, lining material, closure type (back ties, hooks, zipper, lace-up).
  - Styling Recommendations: "Pair this with a raw silk skirt or sheer organza saree."
  - Care Instructions: "Dry Clean Only to protect delicate mirror work."

---

### Module 4: Cart & Hybrid Dual-Checkout Flow
- **FR-4.1: Slide-out Mini Cart (Cart Drawer)**
  - Slides from right upon clicking "Add to Bag" without page reload.
  - Free Shipping Progress Bar (e.g., "Add ₹751 more to unlock FREE complimentary shipping!").
  - Line-item quantity editing and instant removal with undo option.
- **FR-4.2: Hybrid Checkout Options (Dual-Channel)**
  1. **Channel A: Full Online Checkout (Razorpay / Cashfree / PhonePe)**
     - Shipping address form with auto-city/state lookup via Pincode.
     - Payment Modes:
       - UPI (Google Pay, PhonePe, Paytm, CRED).
       - Credit / Debit Cards (Visa, Mastercard, RuPay, Amex).
       - Netbanking (all major Indian banks).
       - Cash on Delivery (COD) with optional OTP verification.
     - Automated order creation and GST invoice generation.
  2. **Channel B: WhatsApp Concierge Checkout**
     - Pre-formatted message including Item titles, SKU, sizes, quantities, and order total.
     - Direct routing to Madamcutie sales team (`+91-9911852113`) for custom sizing, questions, or manual payment confirmation.

---

### Module 5: B2B Wholesale & Creator Collaboration Portals
- **FR-5.1: Wholesale Portal (`/wholesale`)**
  - Wholesale catalog showcase with Minimum Order Quantity (MOQ: 10 pcs).
  - B2B inquiry form capturing: Business Name, GST Number (optional), City, Target Quantity, Timeline.
  - Direct 1-click WhatsApp B2B hook.
- **FR-5.2: Creator Collaboration Portal (`/creators`)**
  - Influencer application capturing: Full Name, Instagram Handle, Follower Count, Location, Engagement Rate.
  - Automated notification to the marketing team.

---

### Module 6: Secure Admin Management System
- **FR-6.1: Secure Authentication**
  - Replace vulnerable client-side password check with server-side authentication (Session-based or JWT with bcrypt password hashing).
  - Multi-user role support: Admin (full access) vs. Store Associate (order view & fulfillment only).
- **FR-6.2: Product & Inventory Manager**
  - Full CRUD for products: Title, Category, Occasion, Prices, Sale badges, Inventory by size variant.
  - Multi-image drag-and-drop uploader with automatic WebP conversion and CDN hosting.
- **FR-6.3: Order & Customer Management**
  - Table of orders filtered by status: Pending, Paid, Shipped, Delivered, Cancelled.
  - 1-Click Waybill and Shipping Label generation via Shiprocket/Delhivery API integration.
  - Customer contact export (CSV) for festive marketing campaigns.

---

## 6. Non-Functional Requirements (NFR)

### 6.1 Performance & Optimization
- **Core Web Vitals:**
  - Largest Contentful Paint (LCP): `< 1.8 seconds` on 4G mobile.
  - Cumulative Layout Shift (CLS): `< 0.05`.
  - Interaction to Next Paint (INP): `< 100ms`.
- **Image Delivery:** All visual assets served via modern image formats (`WebP` / `AVIF`) with dynamic srcset responsive scaling and native lazy loading.

### 6.2 Security & Compliance
- **Data Protection:** All customer addresses, phone numbers, and order histories encrypted in transit (TLS 1.3) and at rest.
- **Payment Compliance:** PCI-DSS compliance achieved via hosted payment gateway checkouts (no raw card data touches Madamcutie servers).
- **Admin Hardening:** Rate limiting on `/admin` login route; CSRF protection on state-modifying requests; Content Security Policy (CSP) headers enabled.

### 6.3 Accessibility (a11y)
- WCAG 2.1 Level AA compliance.
- Keyboard navigability for modal drawers, filters, and image zoom sliders.
- Descriptive `alt` attributes on all product imagery for screen readers and SEO.

---

## 7. Product Release Roadmap

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│        PHASE 1          │     │        PHASE 2          │     │        PHASE 3          │
│   MVP & Polish (2 Wks)  │ ──► │  Payments & Logistics   │ ──► │ Growth & Personalization│
│                         │     │        (3-4 Wks)        │     │        (Month 2+)       │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
 • Clean static bugs            • Razorpay/Cashfree PG          • Customer Account Login
 • Dynamic size selector        • Shiprocket API logistics      • Automated Reviews Engine
 • Fix search & category query  • Secure authenticated Admin    • Video Shoppable Reels
 • Cart drawer & image WebP     • SMS & WhatsApp Bot confirm    • AI Blouse Sizing Assistant
```
