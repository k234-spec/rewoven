export interface ProductImageItem {
  url: string;
  altText?: string | null;
  sortOrder: number;
}

export interface ProductVariantItem {
  id?: string;
  size: string;
  color?: string | null;
  stockQty: number;
}

export interface EnrichedProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: 'Designer Blouses' | 'Corset Blouses' | 'Party Tops' | 'Co-ord Sets' | string;
  description: string;
  fabricDetails: string;
  careGuide: string;
  stylingSuggestion?: string;
  price: number;
  originalPrice: number | null;
  isSale: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  occasion: string;
  fabric: string;
  color: string;
  images: ProductImageItem[];
  sizes: string[];
  variants?: ProductVariantItem[];
}

export const ALL_PRODUCTS: EnrichedProduct[] = [
  {
    "id": "p1",
    "sku": "MC-P1-100",
    "name": "Vibrant handcrafted mirror-work ethnic corset blouse",
    "slug": "vibrant-handcrafted-mirror-work-ethnic-corset-blou-p1",
    "category": "Co-ord Sets",
    "description": "Make a striking festive statement with this handcrafted ethnic corset top, intricately detailed with vibrant thread embroidery, traditional mirror work, and charm-accented cowrie shells.",
    "fabricDetails": "Cowrie Shells on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": true,
    "occasion": "Haldi & Mehendi",
    "fabric": "Cowrie Shells",
    "color": "Gold",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Vibrant handcrafted mirror-work ethnic corset blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Vibrant handcrafted mirror-work ethnic corset blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p2",
    "sku": "MC-P2-101",
    "name": "Vibrant handcrafted mirror-work ethnic corset blouse Green",
    "slug": "vibrant-handcrafted-mirror-work-ethnic-corset-blou-p2",
    "category": "Co-ord Sets",
    "description": "Make a striking festive statement with this handcrafted ethnic corset top, intricately detailed with vibrant thread embroidery, traditional mirror work, and charm-accented cowrie shells.",
    "fabricDetails": "Cowrie Shells on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": false,
    "isFeatured": true,
    "occasion": "Reception",
    "fabric": "Cowrie Shells",
    "color": "Emerald Green",
    "images": [
      {
        "url": "/images/products/mirror-corset-green.webp",
        "sortOrder": 0,
        "altText": "Vibrant handcrafted mirror-work ethnic corset blouse Green"
      },
      {
        "url": "/images/hero/hero-1.webp",
        "sortOrder": 1,
        "altText": "Vibrant handcrafted mirror-work ethnic corset blouse Green detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p3",
    "sku": "MC-P3-102",
    "name": "Vibrant handcrafted mirror-work ethnic corset blouse Dark Green",
    "slug": "vibrant-handcrafted-mirror-work-ethnic-corset-blou-p3",
    "category": "Co-ord Sets",
    "description": "Make a striking festive statement with this handcrafted ethnic corset top, intricately detailed with vibrant thread embroidery, traditional mirror work, and charm-accented cowrie shells.",
    "fabricDetails": "Cowrie Shells on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": true,
    "occasion": "Reception",
    "fabric": "Cowrie Shells",
    "color": "Emerald Green",
    "images": [
      {
        "url": "/images/products/mirror-corset-green.webp",
        "sortOrder": 0,
        "altText": "Vibrant handcrafted mirror-work ethnic corset blouse Dark Green"
      },
      {
        "url": "/images/hero/hero-1.webp",
        "sortOrder": 1,
        "altText": "Vibrant handcrafted mirror-work ethnic corset blouse Dark Green detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p4",
    "sku": "MC-P4-103",
    "name": "Vibrant handcrafted mirror work ethnic corset blouse",
    "slug": "vibrant-handcrafted-mirror-work-ethnic-corset-blou-p4",
    "category": "Co-ord Sets",
    "description": "Make a striking festive statement with this handcrafted ethnic corset top, intricately detailed with vibrant thread embroidery, traditional mirror work, and charm-accented cowrie shells.",
    "fabricDetails": "Cowrie Shells on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": true,
    "occasion": "Wedding Day",
    "fabric": "Cowrie Shells",
    "color": "Blue",
    "images": [
      {
        "url": "/images/products/navy-mirror-corset.webp",
        "sortOrder": 0,
        "altText": "Vibrant handcrafted mirror work ethnic corset blouse"
      },
      {
        "url": "/images/hero/hero-2.webp",
        "sortOrder": 1,
        "altText": "Vibrant handcrafted mirror work ethnic corset blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p5",
    "sku": "MC-P5-104",
    "name": "Black Beaded Corset Blouse",
    "slug": "black-beaded-corset-blouse-p5",
    "category": "Co-ord Sets",
    "description": "A glamorous black sweetheart-neck corset blouse, fully studded with tone-on-tone beads and styled with an alluring lace-up back tie.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": true,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Pearl Work",
    "color": "Black",
    "images": [
      {
        "url": "/images/products/black-beaded-corset.webp",
        "sortOrder": 0,
        "altText": "Black Beaded Corset Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Black Beaded Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p6",
    "sku": "MC-P6-105",
    "name": "Mustard Yellow Mirror Work Blouse",
    "slug": "mustard-yellow-mirror-work-blouse-p6",
    "category": "Designer Blouses",
    "description": "vibrant mustard-yellow deep V-neck blouse encrusted with dense mirror work, perfect for haldi and festive wear.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1299,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": false,
    "isFeatured": true,
    "occasion": "Haldi & Mehendi",
    "fabric": "Mirror Work",
    "color": "Mustard Yellow",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Mustard Yellow Mirror Work Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Mustard Yellow Mirror Work Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p7",
    "sku": "MC-P7-106",
    "name": "vibrant mustard-yellow deep V-neck blouse encrusted with dense mirror work, perfect for haldi and festive wear.",
    "slug": "vibrant-mustard-yellow-deep-v-neck-blouse-encruste-p7",
    "category": "Designer Blouses",
    "description": "A modern black sleeveless blouse featuring a sharp chevron sequin pattern and a sweetheart neck for sleek evening styling.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": true,
    "occasion": "Haldi & Mehendi",
    "fabric": "Mirror Work",
    "color": "Black",
    "images": [
      {
        "url": "/images/products/black-beaded-corset.webp",
        "sortOrder": 0,
        "altText": "vibrant mustard-yellow deep V-neck blouse encrusted with dense mirror work, perfect for haldi and festive wear."
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "vibrant mustard-yellow deep V-neck blouse encrusted with dense mirror work, perfect for haldi and festive wear. detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p8",
    "sku": "MC-P8-107",
    "name": "Quilted Black Embellished Top",
    "slug": "quilted-black-embellished-top-p8",
    "category": "Co-ord Sets",
    "description": "An elegant black padded corset top highlighting delicate lattice beadwork and a classic tie-up back detail.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": true,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Pearl Work",
    "color": "Black",
    "images": [
      {
        "url": "/images/products/black-beaded-corset.webp",
        "sortOrder": 0,
        "altText": "Quilted Black Embellished Top"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Quilted Black Embellished Top detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p9",
    "sku": "MC-P9-108",
    "name": "Pastel Sorbet Beaded Corset",
    "slug": "pastel-sorbet-beaded-corset-p9",
    "category": "Co-ord Sets",
    "description": "A soft pastel multi-colored corset blouse woven with dense beadwork, sweetheart neckline, and a romantic laced back.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 2499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Wedding Day",
    "fabric": "Pearl Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Pastel Sorbet Beaded Corset"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Pastel Sorbet Beaded Corset detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p10",
    "sku": "MC-P10-109",
    "name": "Ivory Pastel Threadwork Halter Blouse",
    "slug": "ivory-pastel-threadwork-halter-blouse-p10",
    "category": "Party Tops",
    "description": "A sophisticated high-neck halter top detailed with pastel floral thread embroidery and dainty bead fringe edging.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Casual Glam",
    "fabric": "Pearl Work",
    "color": "Pastels",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Ivory Pastel Threadwork Halter Blouse"
      },
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 1,
        "altText": "Ivory Pastel Threadwork Halter Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p11",
    "sku": "MC-P11-110",
    "name": "Black Geometric Sequin Blouse",
    "slug": "black-geometric-sequin-blouse-p11",
    "category": "Designer Blouses",
    "description": "A chic black sleeveless crop blouse featuring a striking geometric zig-zag pattern in shimmering silver sequins.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Black",
    "images": [
      {
        "url": "/images/products/black-beaded-corset.webp",
        "sortOrder": 0,
        "altText": "Black Geometric Sequin Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Black Geometric Sequin Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p12",
    "sku": "MC-P12-111",
    "name": "Champagne Gold Zardozi V-Neck Blouse",
    "slug": "champagne-gold-zardozi-v-neck-blouse-p12",
    "category": "Designer Blouses",
    "description": "A rich champagne-gold deep V-neck blouse intricate with delicate sequins, zardozi work, and elegant hanging pearl drop tassels.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 2499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Gold",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Champagne Gold Zardozi V-Neck Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Champagne Gold Zardozi V-Neck Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p13",
    "sku": "MC-P13-112",
    "name": "Shimmer Gold Bustier Top",
    "slug": "shimmer-gold-bustier-top-p13",
    "category": "Co-ord Sets",
    "description": "A statement gold corset top styled with heavily beaded cups, sheer-look structured boning, and strap detail.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Reception",
    "fabric": "Pearl Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Shimmer Gold Bustier Top"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Shimmer Gold Bustier Top detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p14",
    "sku": "MC-P14-113",
    "name": "High-Neck Beaded Fringe Cape Blouse",
    "slug": "high-neck-beaded-fringe-cape-blouse-p14",
    "category": "Party Tops",
    "description": "A high-neck sheer black top adorned with gold and black embroidered shoulder detailing and floor-sweeping beaded tassels.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 3499,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Pearl Work",
    "color": "Black",
    "images": [
      {
        "url": "/images/products/black-beaded-corset.webp",
        "sortOrder": 0,
        "altText": "High-Neck Beaded Fringe Cape Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "High-Neck Beaded Fringe Cape Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p15",
    "sku": "MC-P15-114",
    "name": "Antique Gold Zardosi Corset Blouse",
    "slug": "antique-gold-zardosi-corset-blouse-p15",
    "category": "Co-ord Sets",
    "description": "Exude royal elegance in this antique gold corset blouse, intricately embroidered with detailed zardosi beadwork. Finished with a flattering plunging neckline, a center tassel motif, and delicate dangling beaded fringes along the hemline, it's the ultimate statement piece for bridal lehengas and festive sarees.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 2499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Wedding Day",
    "fabric": "Pearl Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Antique Gold Zardosi Corset Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Antique Gold Zardosi Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p16",
    "sku": "MC-P16-115",
    "name": "Baby Pink Beaded Fringed Corset Blouse",
    "slug": "baby-pink-beaded-fringed-corset-blouse-p16",
    "category": "Co-ord Sets",
    "description": "Soft, feminine, and glamorous—this baby pink corset blouse is completely encrusted with tonal micro-beading. Complete with a structured silhouette and a pearl-style fringe along the lower border, it brings a fresh, chic vibe to sangeet celebrations and cocktail wear.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 2499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Pearl Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/pink-sequin-corset.webp",
        "sortOrder": 0,
        "altText": "Baby Pink Beaded Fringed Corset Blouse"
      },
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 1,
        "altText": "Baby Pink Beaded Fringed Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p17",
    "sku": "MC-P17-116",
    "name": "Glamorous Black Embellished Corset Blouse",
    "slug": "glamorous-black-embellished-corset-blouse-p17",
    "category": "Co-ord Sets",
    "description": "Turn heads in this striking black corset featuring structured bust detailing, intricate tonal threadwork, and shimmering sequin embroidery. Styled with slim shoulder straps and a sweetheart neckline, it pairs effortlessly with modern draped sarees and flared fusion skirts.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Black",
    "images": [
      {
        "url": "/images/products/black-beaded-corset.webp",
        "sortOrder": 0,
        "altText": "Glamorous Black Embellished Corset Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Glamorous Black Embellished Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p18",
    "sku": "MC-P18-117",
    "name": "Glamorous Green Embellished Corset Blouse",
    "slug": "glamorous-green-embellished-corset-blouse-p18",
    "category": "Co-ord Sets",
    "description": "Crafted in a rich emerald green shade, this corset blouse highlights opulent floral sequin patterns and structured boning for a contoured fit. Perfect for evening receptions, galas, and high-glam festive occasions.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Emerald Green",
    "images": [
      {
        "url": "/images/products/mirror-corset-green.webp",
        "sortOrder": 0,
        "altText": "Glamorous Green Embellished Corset Blouse"
      },
      {
        "url": "/images/hero/hero-1.webp",
        "sortOrder": 1,
        "altText": "Glamorous Green Embellished Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p19",
    "sku": "MC-P19-118",
    "name": "Glamorous Red Embellished Corset Blouse",
    "slug": "glamorous-red-embellished-corset-blouse-p19",
    "category": "Co-ord Sets",
    "description": "A classic festive shade transformed into a modern masterpiece. This crimson red bustier corset is adorned with intricate sequin motifs, offering a showstopping silhouette that elevated traditional lehengas and sarees instantly.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Glamorous Red Embellished Corset Blouse"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Glamorous Red Embellished Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p20",
    "sku": "MC-P20-119",
    "name": "Glamorous Silver Embellished Corset Blouse",
    "slug": "glamorous-silver-embellished-corset-blouse-p20",
    "category": "Co-ord Sets",
    "description": "Shine under the lights with this silver sequin corset top. Featuring a sweetheart neckline, defined bust structure, and all-over metallic embellishments, this piece brings instant high-fashion flair to cocktail parties and receptions.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Silver",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Glamorous Silver Embellished Corset Blouse"
      },
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 1,
        "altText": "Glamorous Silver Embellished Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p21",
    "sku": "MC-P21-120",
    "name": "Indo-Western Folk Mirror Work Corset Top",
    "slug": "indo-western-folk-mirror-work-corset-top-p21",
    "category": "Co-ord Sets",
    "description": "A blend of heritage folk art and modern silhouette, this longline corset top features large center mirror work, tribal thread embroidery, and a silver-beaded cowrie shell hemline. Perfect for styling with flared lehengas, tiered skirts, or dhoti pants for an effortless Indo-Western look.",
    "fabricDetails": "Cowrie Shells on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Haldi & Mehendi",
    "fabric": "Cowrie Shells",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Indo-Western Folk Mirror Work Corset Top"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Indo-Western Folk Mirror Work Corset Top detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p22",
    "sku": "MC-P22-121",
    "name": "Indo-Western Folk Mirror Work Corset Top",
    "slug": "indo-western-folk-mirror-work-corset-top-p22",
    "category": "Co-ord Sets",
    "description": "A blend of heritage folk art and modern silhouette, this longline corset top features large center mirror work, tribal thread embroidery, and a silver-beaded cowrie shell hemline. Perfect for styling with flared lehengas, tiered skirts, or dhoti pants for an effortless Indo-Western look.",
    "fabricDetails": "Cowrie Shells on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Cowrie Shells",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Indo-Western Folk Mirror Work Corset Top"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Indo-Western Folk Mirror Work Corset Top detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p23",
    "sku": "MC-P23-122",
    "name": "Light Olive Embellished Corset Blouse",
    "slug": "light-olive-embellished-corset-blouse-p23",
    "category": "Co-ord Sets",
    "description": "Step into elegance with this beautifully crafted light olive corset-style blouse. Adorned with intricate hand-embroidery featuring tone-on-tone sequins and fine beadwork, it creates a subtle, glamorous shimmer. The structured boning, sweetheart neckline, and unique pointed asymmetric hemline provide a flawless, flattering fit for high-fashion festive wear.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Light Olive Embellished Corset Blouse"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Light Olive Embellished Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p24",
    "sku": "MC-P24-123",
    "name": "Black and Gold Wave-Pattern Bralette",
    "slug": "black-and-gold-wave-pattern-bralette-p24",
    "category": "Co-ord Sets",
    "description": "Make a striking statement in this bold bralette top. It features eye-catching parallel wave-patterned hand-embroidery in rich gold beads on a deep black base. The structured sweetheart neckline, slender straps, playful beaded fringe, and dramatic criss-cross lace-up back closure create a sensational Indo-Western evening look.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Pearl Work",
    "color": "Black",
    "images": [
      {
        "url": "/images/products/black-beaded-corset.webp",
        "sortOrder": 0,
        "altText": "Black and Gold Wave-Pattern Bralette"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Black and Gold Wave-Pattern Bralette detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p25",
    "sku": "MC-P25-124",
    "name": "Yellow Lace-Back Corset Blouse",
    "slug": "yellow-lace-back-corset-blouse-p25",
    "category": "Co-ord Sets",
    "description": "Brighten any celebration with this vibrant golden yellow corset blouse. It features a structured sweetheart neckline, boning, and intricate tone-on-tone gilded thread and sequin floral embroidery. The defining features are its modern pointed asymmetric hemline and a sensuous, adjustable criss-cross lace-up back, blending traditional artistry with a contemporary silhouette.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Haldi & Mehendi",
    "fabric": "Sequin",
    "color": "Mustard Yellow",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Yellow Lace-Back Corset Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Yellow Lace-Back Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p26",
    "sku": "MC-P26-125",
    "name": "Black Sequin Backless Blouse",
    "slug": "black-sequin-backless-blouse-p26",
    "category": "Designer Blouses",
    "description": "Perfect your evening look with this classic and glamorous jet black blouse. Dazzling black sequins provide comprehensive sparkle on a structured, sleeveless silhouette with a simple V-neckline. The back is the highlight, featuring a dramatic, deep V-cutout secured by elegant, slender tie-up straps finished with matching tassels, ensuring you look stunning from every angle.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1599,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Black",
    "images": [
      {
        "url": "/images/products/black-beaded-corset.webp",
        "sortOrder": 0,
        "altText": "Black Sequin Backless Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Black Sequin Backless Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p27",
    "sku": "MC-P27-126",
    "name": "Silver Sequin Backless Blouse",
    "slug": "silver-sequin-backless-blouse-p27",
    "category": "Designer Blouses",
    "description": "Shine flawlessly in this dazzling silver sequin blouse. Covered entirely in shimmering silver mirror-style sequins, it features a classic sleeveless shape and V-neckline. The striking open back design features a deep V-cutout secured by a delicate, adjustable tie-up strap finished with decorative tassels, making it an ideal companion for metallic-toned sarees or lehengas.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1599,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Mirror Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Silver Sequin Backless Blouse"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Silver Sequin Backless Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p28",
    "sku": "MC-P28-127",
    "name": "Gold Sequin Backless Blouse",
    "slug": "gold-sequin-backless-blouse-p28",
    "category": "Party Tops",
    "description": "Add instant glamour to your saree or lehenga with this sparkling gold blouse. The sleeveless design is completely encrusted with all-over shimmering gold mirror-style sequins for a show-stopping effect. The dramatic deep V-back closure is secured by slender tie-up straps finished with exquisite ornate tassels, creating a sensuous and unforgettable evening ensemble.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1599,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Mirror Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Gold Sequin Backless Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Gold Sequin Backless Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p29",
    "sku": "MC-P29-128",
    "name": "Gold Diamond Lattice Corset",
    "slug": "gold-diamond-lattice-corset-p29",
    "category": "Co-ord Sets",
    "description": "Achieve a high-fashion, structured look with this stunning gold corset blouse. It is defined by intricate, all-over diamond-patterned lattice hand-embroidery featuring small mirror accents. The bustier silhouette includes a sweetheart neckline, slender straps, and is secured by a dramatic criss-cross lace-up back with adjustable ties and tassels, perfect for creating a contoured Indo-Western statement.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Wedding Day",
    "fabric": "Mirror Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Gold Diamond Lattice Corset"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Gold Diamond Lattice Corset detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p30",
    "sku": "MC-P30-129",
    "name": "Silver Patterned Corset Top",
    "slug": "silver-patterned-corset-top-p30",
    "category": "Co-ord Sets",
    "description": "Master modern glamour in this intricately designed silver corset top. It features complex, all-over ornate filigree or vine hand-embroidery using silver beads and threadwork, enhanced by structured boning and bustier styling. With its sweetheart neckline, slender straps, and subtle pointed hemline, it offers a contoured fit that effortlessly elevates both sarees and fusion high-waisted trousers.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1999,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Casual Glam",
    "fabric": "Sequin",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Silver Patterned Corset Top"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Silver Patterned Corset Top detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p31",
    "sku": "MC-P31-130",
    "name": "Hot Pink Sequin Corset",
    "slug": "hot-pink-sequin-corset-p31",
    "category": "Co-ord Sets",
    "description": "Turn heads in this electrifying hot pink corset-style blouse. Intricately adorned with all-over hot pink sequin and threadwork, it features complex geometric or floral motifs for maximalist sparkle. This structured piece includes boning, a sweetheart neckline, defined bust cups, and is finished with a distinct scalloped hemline, perfect for adding a pop of couture glam to festive attire.",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/pink-sequin-corset.webp",
        "sortOrder": 0,
        "altText": "Hot Pink Sequin Corset"
      },
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 1,
        "altText": "Hot Pink Sequin Corset detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p32",
    "sku": "MC-P32-131",
    "name": "Emerald Green Diamond Corset Blouse",
    "slug": "emerald-green-diamond-corset-blouse-p32",
    "category": "Co-ord Sets",
    "description": "Experience maximalist texture and sparkle in this luxurious emerald green corset blouse. Intricately detailed with all-over diamond-patterned lattice embroidery encrusted with green sequins and mirrors, it offers a rich and radiant effect. Featuring defined bust cups, supportive straps, and structured boning, the back is secured by a daring criss-cross lace-up tie-back closure, merging traditional opulence with modern design.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Mirror Work",
    "color": "Emerald Green",
    "images": [
      {
        "url": "/images/products/mirror-corset-green.webp",
        "sortOrder": 0,
        "altText": "Emerald Green Diamond Corset Blouse"
      },
      {
        "url": "/images/hero/hero-1.webp",
        "sortOrder": 1,
        "altText": "Emerald Green Diamond Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p33",
    "sku": "MC-P33-132",
    "name": "Hot Pink Mirror Work Lace-Up Corset Blouse",
    "slug": "hot-pink-mirror-work-lace-up-corset-blouse-p33",
    "category": "Co-ord Sets",
    "description": "Make a vibrant statement with this hot pink corset blouse featuring all-over geometric mirror embellishments. Designed with structured bustier cups, a pointed V-hemline, and an open lace-up back with adjustable dori ties, this top blends modern bridal glamour with traditional artisan work.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Wedding Day",
    "fabric": "Mirror Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/pink-sequin-corset.webp",
        "sortOrder": 0,
        "altText": "Hot Pink Mirror Work Lace-Up Corset Blouse"
      },
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 1,
        "altText": "Hot Pink Mirror Work Lace-Up Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p34",
    "sku": "MC-P34-133",
    "name": "Charcoal Grey Mirror Work Corset Blouse",
    "slug": "charcoal-grey-mirror-work-corset-blouse-p34",
    "category": "Co-ord Sets",
    "description": "Sleek and contemporary, this charcoal grey corset blouse features intricate mirror-work arranged in modern chevron and geometric lattice patterns. Its contoured bust, pointed hemline, and backless tie-up closure make it an ideal choice for high-glam evening receptions or fusion festive styling.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Mirror Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Charcoal Grey Mirror Work Corset Blouse"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Charcoal Grey Mirror Work Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p35",
    "sku": "MC-P35-134",
    "name": "Sunset Orange Mirror Work Corset Blouse",
    "slug": "sunset-orange-mirror-work-corset-blouse-p35",
    "category": "Co-ord Sets",
    "description": "Radiate warmth and energy in this bright orange corset blouse adorned with dense mirror embroidery throughout. Highlights include a sweetheart neckline, structured boning, a V-cut hemline, and an adjustable criss-cross lace-up back for a custom contoured fit.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Casual Glam",
    "fabric": "Mirror Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Sunset Orange Mirror Work Corset Blouse"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Sunset Orange Mirror Work Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p36",
    "sku": "MC-P36-135",
    "name": "Deep Maroon Mirror Work Corset Blouse",
    "slug": "deep-maroon-mirror-work-corset-blouse-p36",
    "category": "Co-ord Sets",
    "description": "Rich and opulent, this maroon corset blouse showcases dense mirror work detailed along a structured silhouette. Featuring a defined bustier, a dramatic pointed hem, and a backless tie-up closure, it's a regal addition to winter wedding lehengas or festive sarees.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Wedding Day",
    "fabric": "Mirror Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Deep Maroon Mirror Work Corset Blouse"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Deep Maroon Mirror Work Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p37",
    "sku": "MC-P37-136",
    "name": "Mint Green Floral Threadwork Blouse",
    "slug": "mint-green-floral-threadwork-blouse-p37",
    "category": "Co-ord Sets",
    "description": "Soft, romantic, and elegant—this mint green blouse features pastel floral thread embroidery accented with subtle sequin highlights. Designed with elbow-length sleeves and a flattering V-neckline",
    "fabricDetails": "Sequin on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Sequin",
    "color": "Emerald Green",
    "images": [
      {
        "url": "/images/products/mirror-corset-green.webp",
        "sortOrder": 0,
        "altText": "Mint Green Floral Threadwork Blouse"
      },
      {
        "url": "/images/hero/hero-1.webp",
        "sortOrder": 1,
        "altText": "Mint Green Floral Threadwork Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p38",
    "sku": "MC-P38-137",
    "name": "Off-White Pearl Embellished Blouse",
    "slug": "off-white-pearl-embellished-blouse-p38",
    "category": "Co-ord Sets",
    "description": "Exude ethereal charm in this off-white corset blouse covered in vertical rows of fine pearl embellishments. Finished with a plunging V-neckline, a pearl-beaded fringe along the hem, and a front tie detail with pearl tassels, this piece is tailor-made for cocktail nights and modern festive wear.",
    "fabricDetails": "Pearl Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1799,
    "originalPrice": null,
    "isSale": true,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Pearl Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/pearl-blouse.webp",
        "sortOrder": 0,
        "altText": "Off-White Pearl Embellished Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Off-White Pearl Embellished Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p39",
    "sku": "MC-P39-138",
    "name": "Metallic Silver Mirror Work Corset Blouse",
    "slug": "metallic-silver-mirror-work-corset-blouse-p39",
    "category": "Co-ord Sets",
    "description": "Designed to shine from every angle, this metallic silver corset top features intricate mirror lattice work and a structured bustier fit. The pointed V-hem and open criss-cross tie back give it a bold, high-fashion edge perfect for reception and sangeet parties.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Sangeet & Cocktail",
    "fabric": "Mirror Work",
    "color": "Red",
    "images": [
      {
        "url": "/images/products/mirror-corset-red.webp",
        "sortOrder": 0,
        "altText": "Metallic Silver Mirror Work Corset Blouse"
      },
      {
        "url": "/images/hero/hero-3.webp",
        "sortOrder": 1,
        "altText": "Metallic Silver Mirror Work Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p40",
    "sku": "MC-P40-139",
    "name": "Mustard Yellow Mirror Work Corset Blouse",
    "slug": "mustard-yellow-mirror-work-corset-blouse-p40",
    "category": "Co-ord Sets",
    "description": "Bright and festive, this mustard yellow corset top is highlighted by dense geometric mirror work and supportive boning. Featuring a sweetheart neckline, a contoured V-cut hem, and a delicate lace-up back closure, it is the perfect pick for Haldi, Mehendi, and Sangeet celebrations.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": true,
    "isFeatured": false,
    "occasion": "Haldi & Mehendi",
    "fabric": "Mirror Work",
    "color": "Mustard Yellow",
    "images": [
      {
        "url": "/images/creators/hero.webp",
        "sortOrder": 0,
        "altText": "Mustard Yellow Mirror Work Corset Blouse"
      },
      {
        "url": "/images/about/our-story.webp",
        "sortOrder": 1,
        "altText": "Mustard Yellow Mirror Work Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  },
  {
    "id": "p41",
    "sku": "MC-P41-140",
    "name": "BlueMirror Work Corset Blouse",
    "slug": "bluemirror-work-corset-blouse-p41",
    "category": "Co-ord Sets",
    "description": "Bright and festive, this mustard yellow corset top is highlighted by dense geometric mirror work and supportive boning. Featuring a sweetheart neckline, a contoured V-cut hem, and a delicate lace-up back closure, it is the perfect pick for Haldi, Mehendi, and Sangeet celebrations.",
    "fabricDetails": "Mirror Work on premium structured cotton-silk lining with 2-inch inner margins for easy alteration.",
    "careGuide": "Dry clean only. Store in breathable muslin bag away from moisture and direct sunlight.",
    "price": 1499,
    "originalPrice": null,
    "isSale": false,
    "isBestseller": false,
    "isFeatured": false,
    "occasion": "Haldi & Mehendi",
    "fabric": "Mirror Work",
    "color": "Mustard Yellow",
    "images": [
      {
        "url": "/images/products/navy-mirror-corset.webp",
        "sortOrder": 0,
        "altText": "BlueMirror Work Corset Blouse"
      },
      {
        "url": "/images/hero/hero-2.webp",
        "sortOrder": 1,
        "altText": "BlueMirror Work Corset Blouse detail"
      }
    ],
    "sizes": [
      "XS (32)",
      "S (34)",
      "M (36)",
      "L (38)",
      "XL (40)",
      "XXL (42)",
      "Custom Stitching"
    ]
  }
];

export function getProductBySlugOrId(slugOrId: string): EnrichedProduct | undefined {
  const normalized = slugOrId.toLowerCase().trim();
  return (
    ALL_PRODUCTS.find((p) => p.slug === normalized || p.id === normalized) ||
    ALL_PRODUCTS.find((p) => normalized.endsWith(`-${p.id}`)) ||
    ALL_PRODUCTS.find((p) => p.slug.includes(normalized))
  );
}

export function getRelatedProducts(productId: string, limit = 4): EnrichedProduct[] {
  const current = ALL_PRODUCTS.find((p) => p.id === productId);
  if (!current) return ALL_PRODUCTS.slice(0, limit);
  const sameCategory = ALL_PRODUCTS.filter(
    (p) => p.id !== productId && p.category === current.category
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = ALL_PRODUCTS.filter(
    (p) => p.id !== productId && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

