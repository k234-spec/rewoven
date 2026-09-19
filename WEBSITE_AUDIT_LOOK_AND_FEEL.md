# Madamcutie — Comprehensive Website Audit & Look-and-Feel Teardown

> **Target URL:** [https://madamcutie.com/](https://madamcutie.com/)  
> **Audited On:** September 10, 2026  
> **Brand Classification:** Luxury Indian Ethnic & Contemporary Apparel eCommerce (Specializing in Designer & Corset Blouses)  
> **Location / Roots:** Chandni Chowk, Old Delhi, India  

---

## 1. Executive Summary

Madamcutie is an independent Indian fashion brand originating from the historic textile hub of Chandni Chowk, Delhi. The website positions itself as an upscale, boutique destination for "Everyday Queens", focusing heavily on handcrafted ethnic corset blouses, mirror-work festive bustiers, sequin tops, and occasion wear.

The site is currently deployed as a lightweight, static multi-page website on **Vercel**, relying on client-side state (`localStorage`) and a direct **"Click-to-WhatsApp" commerce model** for order fulfillment and customer interaction.

While the visual tone successfully conveys an opulent, celebratory aesthetic through warm gold tones and serif typography, the underlying digital architecture contains several technical inconsistencies, client-side vulnerabilities, hardcoded mock data remnants, and unoptimized assets that hinder conversion and brand credibility.

---

## 2. Visual Aesthetics & "Look and Feel" Teardown

### 2.1 Mood, Theme & Brand Personality
- **Aesthetic Core:** Regal, Festive, Glamorous, Slow-Fashion Boutique.
- **Tone of Voice:** Empowering, aspirational, celebrating female individuality ("Effortless Style for Modern Queens").
- **Visual Mood:** High-contrast elegance combining deep charcoal/black (`#111111`) with metallic gold accents (`#d4af37`, `#b89742`) and soft alabaster/cream backgrounds (`#faf8f5`, `#f8f6f0`). Vibrant hot pink (`#ff007f`) is used sparingly for high-urgency callouts (Sale badges, Cart Add state, Wishlist active state).

### 2.2 Color Palette Breakdown

| Role | Hex Code | Visual Sample | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Base** | `#111111` | ![#111111](https://via.placeholder.com/15/111111/000000?text=+) | Primary text, headers, footer background, primary buttons |
| **Secondary Base** | `#ffffff` | ![#ffffff](https://via.placeholder.com/15/ffffff/000000?text=+) | Card containers, main page backgrounds, button text |
| **Luxury Gold (Accent)** | `#d4af37` | ![#d4af37](https://via.placeholder.com/15/d4af37/000000?text=+) | Brand logo gradient, highlight ribbons, star ratings, borders |
| **Deep Bronze Gold** | `#b8860b` | ![#b8860b](https://via.placeholder.com/15/b8860b/000000?text=+) | Announcement bar gradient stops, hover highlights |
| **Champagne Shimmer** | `#f3e5ab` | ![#f3e5ab](https://via.placeholder.com/15/f3e5ab/000000?text=+) | Radial highlight center on banner gradients |
| **Warm Ivory (Surface)** | `#faf8f5` | ![#faf8f5](https://via.placeholder.com/15/faf8f5/000000?text=+) | Section alternating backgrounds, product image backdrops |
| **Border Tone** | `#e8e3db` | ![#e8e3db](https://via.placeholder.com/15/e8e3db/000000?text=+) | Product card borders, dividers, subtle outlines |
| **Accent Hot Pink** | `#ff007f` | ![#ff007f](https://via.placeholder.com/15/ff007f/000000?text=+) | "Added" cart button state, wishlist hearts, sale flags |
| **Success Emerald** | `#28a745` | ![#28a745](https://via.placeholder.com/15/28a745/000000?text=+) | Free shipping indicator, in-stock badge |

### 2.3 Typography & Hierarchy
- **Heading Font:** `'Playfair Display', serif` (Weights: 400, 500, 600, 700).  
  *Character:* High-contrast traditional serif evoking luxury, fashion editorials, and bespoke tailoring.
- **Body Font:** `'Plus Jakarta Sans', sans-serif` (Weights: 300, 400, 500, 600, 700).  
  *Character:* Modern geometric grotesque providing legibility for prices, specs, and mobile UI elements.
- **Typographic Scale:**
  - `Hero Title`: `clamp(36px, 4.5vw, 60px)`, bold, tracking `-0.5px`.
  - `Section H2`: `clamp(24px, 3.5vw, 42px)`, font weight 500.
  - `Product H3`: `clamp(18px, 2.5vw, 28px)` (scaled down to `0.9rem - 1.2rem` in cards).
  - `Subtitles & Overlines`: `10px - 12px`, uppercase, letter-spacing `2px - 4px`.
  - `Body Copy`: `14px - 16px`, line-height `1.6 - 1.8`.

---

## 3. Element-by-Element Site Extraction & Inventory

### 3.1 Global Header & Navigation
- **Announcement Bar:**
  - Content: `✦ Free complimentary shipping on orders over ₹2250 ✦ Use code: MADAM15 for 15% off your first luxury purchase ✦ New Summer Edit now live! ✦`
  - Style: Gold background (`#d4af37`), black text, uppercase, tracked `0.15em`, sticky/relative.
- **Header Bar:**
  - Sticky navigation (`position: sticky; top: 0; z-index: 1000`), height `80px` (desktop) / `65px` (mobile).
  - Logo:
    - Image: `/assets/images/logo.jpg` (or `/assets/images/new_logo.png`).
    - Wordmark: "Madamcutie" in Playfair Display with CSS metallic clipping gradient (`#d4af37 -> #f3e5ab -> #b8860b`).
  - Navigation Links (Desktop):
    - `Home` (`index.html`)
    - `Shop` (`shop.html`)
    - `Our Story` (`about.html`)
    - `For Wholesale` (`https://wa.me/919911852113` - external WhatsApp link)
    - `For Creators` (`creators.html`)
    - `Contact` (`contact.html`)
  - Header Action Icons:
    - Search Trigger (Magnifying Glass SVG icon that toggles a top search bar dropdown).
    - Shopping Bag Icon (Tote SVG with active badge counter indicator).
    - Mobile Menu Hamburger (`☰` button).
  - Mobile Drawer:
    - Slides in from right (`width: 85%`, max `320px`), overlay backdrop, close button (`✕`), stacked uppercase links.

---

### 3.2 Homepage Sections (`index.html`)
1. **Hero Section (`.hero-slider`):**
   - Full-bleed background image (`/Madamcutie_banner.png`).
   - Dark gradient overlay (heavy black on left, fading to transparent on right for model visibility).
   - Content:
     - Subtitle: `PREMIUM LUXURY FASHION`
     - Headline: `Effortless Style for Modern Queens`
     - Copy: `Discover our curated collection of luxury apparel designed to empower and inspire. Elegance redefined for the contemporary woman.`
     - CTAs: Primary "Shop Now" (`shop.html`) + Secondary "Our Story" (`about.html`).
2. **Trust & Value Proposition Ribbon:**
   - Gold gradient band (`#b8860b` -> `#d4af37` -> `#f3e5ab` -> `#d4af37` -> `#b8860b`).
   - 4 Value Badges with line SVGs:
     - ✦ **Premium Fabrics**
     - ✦ **Pan-India Shipping**
     - ✦ **Easy Returns**
     - ✦ **Secure Payments**
3. **Featured Looks Grid (`#madam-grid`):**
   - Heading: `Featured Looks` — "Discover our most loved pieces".
   - 8 Featured Cards:
     - Aspect ratio: `3:4` vertical portrait format.
     - Top-left Sale badge (`#d4af37`).
     - Top-right Wishlist SVG Heart (`#ff007f`).
     - Bottom-right "Add" / "Added" button (`#ff007f`).
     - Metadata: Brand "MADAMCUTIE", title, one-line teaser, 5-star rating with review count, price in INR (₹).
   - Bottom CTA: "View All Styles" (`shop.html`).
4. **Style Edits (Curated Lookbook Row):**
   - 3 Curated Category Cards with hover image scale (`1.08` zoom):
     - `Date Night` -> Shimmer Party Top (`/assets/images/madam/party_wear_1.jpg`)
     - `Office` -> Black Chevron Sequin Top (`/assets/images/madam/party_wear_2.jpg`)
     - `Weekend` -> Glamour Evening Wear (`/assets/images/madam/party_wear_3.jpg`)
5. **Brand Story Teaser ("Our Heritage"):**
   - 2-Column responsive split.
   - Left: Framed model editorial photography with gold outline border (`/assets/images/madam/saini-18.jpg`).
   - Right: "Our Heritage: Empowering Everyday Queens", storytelling grounded in Chandni Chowk craftsmanship.
   - CTA: "Read Our Story".
6. **Footer:**
   - 4-Column layout:
     - Column 1: Brand description, phone (`+91-9911852113`), email (`madamcutie1995@gmail.com`), Admin Login link, social icons (Facebook, Instagram, Pinterest).
     - Column 2 (Shop): New Arrivals, Dresses, Lookbook, Collections.
     - Column 3 (About): Our Story, Policies, Careers, For Wholesale, For Creators, Contact Us.
     - Column 4 (Help): FAQ, Shipping & Returns, Size Guide, Track Order.
   - Sub-footer: Copyright string + Payment card icons.
7. **Floating Social Action Buttons (FAB):**
   - Fixed at `bottom: 25px; right: 25px; z-index: 9999`.
   - WhatsApp Button (Green `#25D366`, white SVG, 60px circle).
   - Instagram Button (Official Instagram gradient circle, white SVG).

---

### 3.3 Shop / Catalog Experience (`shop.html`)
- **Breadcrumb & Header:** "Collections" / `Home / Shop`.
- **Control Bar:** Total count ("Showing 41 items"), mobile filter trigger, and Sort select (`Featured`, `Price: Low to High`, `Price: High to Low`).
- **Sidebar Filters:**
  - "All Items" (41 items)
  - "Designer Blouse" (items containing mirror work, sequin, embroidery)
  - "Corset Blouse" (structured lace-up bustiers, boned tops, ethnic cowrie shells)
- **Product Card Architecture:**
  - Image Wrapper with dual-image hover transition (`.product-image-alt`).
  - Badges: `SALE` (pink) and `BESTSELLER` (gold).
  - Wishlist toggle (persists IDs to `localStorage.madamWishlist`).
  - Rating stars: `★★★★★ (count)`.
  - Price + Strikethrough original price if on sale.
  - "Add to Bag" button with immediate inline feedback (`✓ Added to Bag`).

---

### 3.4 Product Details Page - PDP (`product.html?id=p...`)
- Dynamic parameter extraction via URL query: `?id=p1`.
- Breadcrumb navigation and large portrait image gallery (`aspect-ratio: 3/4`).
- Brand badge: `MADAMCUTIE LUXURY`.
- Product Title, Price, and Sale/Bestseller badge indicators.
- Short product description detailing embroidery, fabric, and occasions (Haldi, Mehendi, Sangeet, Cocktail, Reception).
- Size Selector: Pill buttons (currently defaulting to "Free Size").
- Dual CTAs:
  - "Add to Shopping Bag" (triggers flying notification modal + updates cart count).
  - Wishlist Heart Button.
- Metadata Checklist: SKU (`MC-2026-001`), Category, Availability (`In Stock`).

---

### 3.5 Shopping Bag & WhatsApp Checkout (`cart.html`)
- Empty Cart view: "Your shopping bag is currently empty" + "Continue Shopping" CTA.
- Populated Cart:
  - Line item thumbnail, title, selected size, and color.
  - Quantity Stepper (`[-] count [+]`).
  - Line total and "Remove" text button.
- Order Summary Sidebar:
  - Subtotal (sum of items * qty).
  - Shipping: `FREE` (in green).
  - Grand Total in INR.
  - **Primary CTA: "PROCEED TO CHECKOUT"**:
    - Generates a formatted WhatsApp message and redirects to `https://wa.me/919911852113?text=...`:
    ```text
    Hello Madamcutie, I would like to place an order for the following items:

    1. *Vibrant handcrafted mirror-work ethnic corset blouse*
       Size: Free Size | Color: Standard
       Qty: 1 x ₹1499 = ₹1499

    *Grand Total: ₹1499*

    Please confirm my order and let me know the payment details. Thank you!
    ```

---

### 3.6 Brand, Contact & Policy Pages
- **Our Story (`about.html`):** Chandni Chowk narrative, celebration of classic Indian artistry tailored for modern silhouettes.
- **Contact Us (`contact.html`):** Phone, Email, operating hours (Mon-Sat 10:00 AM - 8:00 PM), and contact inquiry form.
- **For Creators (`creators.html`):** Influencer program benefits (content access, perks, commission), with direct WhatsApp application link.
- **Return & Refund Policy (`policy.html`):** 2-day delivery return window, 7-day exchange window, conditions, non-returnable items.

---

### 3.7 Admin Panel (`admin.html`)
- **Access Guard:** Password check modal (`madam2025` stored in client JS).
- **Features:**
  - Product catalog table with search and category filtering.
  - Add / Edit product modal (Name, Category, Price, Original Price, Badges, Image Path, Description).
  - Image Helper Gallery (visual picker for pre-uploaded assets `saini-01.jpg` to `saini-48.jpg`).
  - Visual WYSIWYG Page Editor: Loads pages inside an `<iframe>`, enables `contentEditable="true"` on headings/paragraphs, and attempts to POST back to `/api/save-content`.

---

## 4. In-Depth Technical & UX Audit Findings

### 4.1 Critical Issues & Functional Bugs

| Issue | Location | Impact | Severity |
| :--- | :--- | :--- | :--- |
| **Insecure Admin Authentication** | `admin.html` (L1051) | Password (`madam2025`) is hardcoded in client JS; anyone inspecting source can view or bypass it. | **CRITICAL** |
| **Broken Search Functionality** | Header search bar | Submits `GET shop.html?q=...`, but `shop.html` has no query param parsing for `q`. Search does nothing. | **HIGH** |
| **Duplicate Static DOM in Shop** | `shop.html` (L115-1349) | 1,200+ lines of outdated dummy HTML exist in the file, causing 101KB payload, only to be wiped on page load by JS. | **HIGH** |
| **Phantom Server-Side Endpoints** | `admin.html`, `index.html` | Client code references `/api/save-content` and local `server.py` which do not run on static Vercel. Admin edits fail. | **HIGH** |
| **Hardcoded Arbitrary Pricing on Home** | `index.html` (L196, L219) | Homepage displays ₹100 and ₹15445 for products whose real catalog price in `products.js` is ₹1499. | **MEDIUM** |
| **Third-Party Extension Pollution** | `index.html` (L16, L188, L903) | Residual DOM markers from "Monica AI" extension (`monica-writing-entry-btn-root`) leaked into production HTML. | **MEDIUM** |
| **No Payment Gateway / Cart Abandonment** | `cart.html` | Relies exclusively on WhatsApp manual chat. Causes drop-off for users wanting instant UPI / Card / COD checkout. | **HIGH** |
| **Unoptimized Image Formats** | `/assets/images/madam/` | Large PNG/JPEG files (some > 2MB) with raw spaces and filenames like `Vibrant handcrafted mirror-work ethnic corset blouse.PNG`. | **MEDIUM** |
| **Missing Size Variations** | `product.html`, `products.js` | All products are hardcoded to "Free Size". Women's ethnic blouses require fitted chest/bust measurements (32 to 42). | **HIGH** |
| **Malformed Policy Page Layout** | `policy.html` (L127-129) | Naked anchor tags "For Wholesale" and "For Creators" injected randomly inside the "Need Help?" box. | **LOW** |

---

## 5. Element Extraction Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│                          MADAMCUTIE.COM                                │
├────────────────────────────────────────────────────────────────────────┤
│ 1. HEADER & GLOBAL                                                     │
│    ├── Announcement Bar (Promo & Free Shipping Hook)                   │
│    ├── Sticky Nav (Logo Gradient + 6 Nav Links + Search/Cart/Burger)   │
│    ├── Mobile Slide-out Drawer                                         │
│    └── Floating Buttons (WhatsApp + Instagram FAB)                     │
│                                                                        │
│ 2. HOMEPAGE EXPERIENCE                                                 │
│    ├── Hero Slider with Editorial Overlay & Call-to-Actions            │
│    ├── 4-Pillar Trust Ribbon (Fabrics, Shipping, Returns, Payments)    │
│    ├── Featured Looks (8-Product Grid with Quick Add & Wishlist)       │
│    ├── Style Edits (3-Tile Visual Lookbook)                            │
│    ├── Brand Story ("Our Heritage - Empowering Everyday Queens")       │
│    └── 4-Column Luxury Footer (Info, Shop, About, Help + Admin)        │
│                                                                        │
│ 3. CATALOG & PRODUCT DISCOVERY                                         │
│    ├── Shop Header & Breadcrumb Nav                                    │
│    ├── Sort & Filter Bar (Categories: Designer Blouse, Corset Blouse) │
│    ├── Responsive Product Card (Dual Image Hover, Badges, Price, Star) │
│    └── Wishlist Persistence (localStorage)                             │
│                                                                        │
│ 4. PRODUCT DETAIL PAGE (PDP)                                           │
│    ├── Portrait Gallery View                                           │
│    ├── Title, Price, Discount Strikethrough, Sale Badges               │
│    ├── Fabric & Occasion Description                                   │
│    ├── Size Selector (Pill Toggle)                                     │
│    ├── Add to Bag Button with Micro-Animation                          │
│    └── SKU, Category, Availability Checklist                           │
│                                                                        │
│ 5. CART & CHECKOUT                                                     │
│    ├── Line Item List with Qty Adjustment Stepper                      │
│    ├── Order Summary (Subtotal, Free Shipping, Grand Total)            │
│    └── Direct WhatsApp Automated Order Dispatch                        │
│                                                                        │
│ 6. CONTENT & COLLABORATION                                             │
│    ├── Our Story Page (Chandni Chowk Heritage Narrative)               │
│    ├── Contact Us Page (Phone, Email, Hours, Feedback Form)            │
│    ├── For Creators Page (Influencer Pitch + WA Application)           │
│    └── Policy Page (2-Day Return, 7-Day Exchange Guidelines)           │
│                                                                        │
│ 7. ADMINISTRATION                                                      │
│    ├── Password-Protected Dashboard                                    │
│    ├── Product Inventory Management Table                              │
│    └── Visual Preview & WYSIWYG Content Editor                         │
└────────────────────────────────────────────────────────────────────────┘
```
