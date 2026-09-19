export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price?: number | null;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  in_stock: boolean;
  featured?: boolean;
  sale?: boolean;
  bestseller?: boolean;
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Vibrant handcrafted mirror-work ethnic corset blouse',
    category: 'Corset Blouse',
    price: 1499,
    original_price: null,
    rating: 5,
    reviews: 48,
    description:
      'Make a striking festive statement with this handcrafted ethnic corset top, intricately detailed with vibrant thread embroidery and traditional mirror work.',
    image: '/assets/images/madam/Vibrant handcrafted mirror-work ethnic corset blouse.PNG',
    in_stock: true,
    featured: true,
    bestseller: true,
    sale: false,
  },
  {
    id: 'p2',
    name: 'Vibrant handcrafted mirror-work ethnic corset blouse Green',
    category: 'Corset Blouse',
    price: 1499,
    original_price: null,
    rating: 5,
    reviews: 36,
    description:
      'Handcrafted ethnic corset top in rich emerald green with intricate thread needlework and shimmering mirror accents.',
    image: '/assets/images/madam/IMG_0029.PNG',
    in_stock: true,
    featured: true,
    bestseller: false,
    sale: false,
  },
  {
    id: 'p3',
    name: 'Vibrant handcrafted mirror-work ethnic corset blouse Dark Green',
    category: 'Corset Blouse',
    price: 1499,
    original_price: null,
    rating: 5,
    reviews: 52,
    description:
      'Deep forest green corset blouse adorned with dense mirror detailing and traditional artisan craftsmanship.',
    image: '/assets/images/madam/IMG_0047.PNG',
    in_stock: true,
    featured: true,
    bestseller: true,
    sale: false,
  },
  {
    id: 'p4',
    name: 'Vibrant handcrafted mirror work ethnic corset blouse Royal Blue',
    category: 'Corset Blouse',
    price: 1499,
    original_price: null,
    rating: 5,
    reviews: 29,
    description:
      'Striking royal sapphire blue corset blouse with radiant embroidery and light-catching mirror pieces.',
    image: '/assets/images/madam/Vibrant handcrafted mirror-work ethnic corset blouse Blue.PNG',
    in_stock: true,
    featured: true,
    bestseller: false,
    sale: false,
  },
  {
    id: 'p5',
    name: 'Sleeveless crop top blouse with vibrant traditional thread embroidery',
    category: 'Designer Blouse',
    price: 1499,
    original_price: null,
    rating: 5,
    reviews: 41,
    description:
      'A versatile sleeveless crop top featuring delicate thread needlework inspired by Old Delhi heritage motifs.',
    image:
      '/assets/images/madam/Sleeveless crop top blouse with vibrant traditional thread embroidery and mirror work detailing.PNG',
    in_stock: true,
    featured: true,
    bestseller: false,
    sale: false,
  },
  {
    id: 'p6',
    name: 'Sleeveless crop top blouse Vibrant Blue',
    category: 'Designer Blouse',
    price: 1499,
    original_price: null,
    rating: 5,
    reviews: 33,
    description:
      'Contemporary sleeveless silhouette in bold cobalt blue adorned with fine festive embroidery.',
    image: '/assets/images/madam/IMG_0019.PNG',
    in_stock: true,
    featured: true,
    bestseller: false,
    sale: false,
  },
  {
    id: 'p7',
    name: 'Sleeveless crop top blouse Ivory White',
    category: 'Designer Blouse',
    price: 1499,
    original_price: 1999,
    rating: 5,
    reviews: 57,
    description:
      'Elegant ivory crop blouse with multi-colored floral thread work and subtle mirror embellishments.',
    image: '/assets/images/madam/IMG_0042.PNG',
    in_stock: true,
    featured: true,
    bestseller: false,
    sale: true,
  },
  {
    id: 'p8',
    name: 'Sleeveless crop top blouse Noir Black',
    category: 'Designer Blouse',
    price: 1499,
    original_price: null,
    rating: 5,
    reviews: 44,
    description:
      'Timeless jet black designer blouse with contrasting vibrant traditional embroidery.',
    image: '/assets/images/madam/IMG_0036.PNG',
    in_stock: true,
    featured: true,
    bestseller: true,
    sale: false,
  },
];
