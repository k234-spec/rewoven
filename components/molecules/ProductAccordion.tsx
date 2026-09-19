'use client';

import { useState } from 'react';
import { EnrichedProduct } from '@/lib/products-data';

interface ProductAccordionProps {
  product: EnrichedProduct;
}

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function ProductAccordion({ product }: ProductAccordionProps) {
  const [openSection, setOpenSection] = useState<string>('fabric');

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? '' : id));
  };

  const sections: Section[] = [
    {
      id: 'fabric',
      title: 'Fabric & Craftsmanship',
      content: (
        <div className="space-y-2 text-xs text-noir/75 leading-relaxed">
          <p>
            <strong>Embroidery &amp; Work:</strong> Handcrafted {product.fabric} with authentic Indian artisan needlework and heirloom detailing.
          </p>
          <p>
            <strong>Lining:</strong> 100% Breathable structured cotton-silk lining with pre-stitched cups for a structured corset silhouette.
          </p>
          <p>
            <strong>Closure:</strong> Concealed side zipper with adjustable back ties / laced eyelet detailing.
          </p>
          <p>
            <strong>Inner Margin:</strong> Generous <strong>2 inches of margin on each side</strong> for easy tailoring alterations.
          </p>
        </div>
      ),
    },
    {
      id: 'styling',
      title: 'Styling Suggestions',
      content: (
        <div className="space-y-2 text-xs text-noir/75 leading-relaxed">
          <p>
            {product.stylingSuggestion ||
              `Pair this stunning ${product.category.toLowerCase()} with a tonal georgette lehenga skirt or drape an organza saree over one shoulder to spotlight the intricate corset waistline.`}
          </p>
          <p>
            <strong>Occasion Recommendation:</strong> Ideal for {product.occasion}, festive wedding receptions, cocktails, or high-glam celebrations.
          </p>
          <p>
            <strong>Jewelry Pairing:</strong> Style with statement polki studs, minimal choker necklaces, or glass bangles.
          </p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <div className="space-y-2 text-xs text-noir/75 leading-relaxed">
          <p>
            <strong>Wash Care:</strong> Dry clean only. Do not machine wash or hand wash in water.
          </p>
          <p>
            <strong>Ironing:</strong> Steam press on reverse side only at low temperature. Do not iron directly over mirrors, sequins, or cowrie accents.
          </p>
          <p>
            <strong>Storage:</strong> Store flat in a breathable cotton or muslin bag away from direct sunlight and humidity.
          </p>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Pan-India Shipping & Returns',
      content: (
        <div className="space-y-2 text-xs text-noir/75 leading-relaxed">
          <p>
            <strong>Dispatch:</strong> Ready sizes dispatch within 24–48 hours from our Chandni Chowk studio. Custom stitched garments dispatch in 5–7 working days.
          </p>
          <p>
            <strong>Shipping:</strong> Free standard shipping across India on all prepaid orders over ₹2,250.
          </p>
          <p>
            <strong>Exchange &amp; Returns:</strong> 7-day hassle-free size exchange policy. Complimentary alteration support provided if fitting needs fine-tuning.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-hairline divide-y divide-hairline">
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div key={section.id} className="py-4">
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between text-left text-xs uppercase tracking-[0.16em] font-semibold text-noir hover:text-gold transition-colors"
            >
              <span>{section.title}</span>
              <span className="text-sm font-normal text-noir/60 transition-transform duration-200">
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {isOpen && (
              <div className="pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
