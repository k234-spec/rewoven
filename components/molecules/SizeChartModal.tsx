'use client';

import { useState, useEffect } from 'react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MeasurementRow {
  size: string;
  bustIn: string;
  bustCm: string;
  waistIn: string;
  waistCm: string;
  lengthIn: string;
  lengthCm: string;
  neckIn: string;
  neckCm: string;
}

const SIZE_DATA: MeasurementRow[] = [
  {
    size: 'XS (32)',
    bustIn: '32"',
    bustCm: '81 cm',
    waistIn: '26"',
    waistCm: '66 cm',
    lengthIn: '14.0"',
    lengthCm: '35.5 cm',
    neckIn: '7.5"',
    neckCm: '19.0 cm',
  },
  {
    size: 'S (34)',
    bustIn: '34"',
    bustCm: '86 cm',
    waistIn: '28"',
    waistCm: '71 cm',
    lengthIn: '14.5"',
    lengthCm: '36.8 cm',
    neckIn: '7.5"',
    neckCm: '19.0 cm',
  },
  {
    size: 'M (36)',
    bustIn: '36"',
    bustCm: '91 cm',
    waistIn: '30"',
    waistCm: '76 cm',
    lengthIn: '15.0"',
    lengthCm: '38.1 cm',
    neckIn: '8.0"',
    neckCm: '20.3 cm',
  },
  {
    size: 'L (38)',
    bustIn: '38"',
    bustCm: '96 cm',
    waistIn: '32"',
    waistCm: '81 cm',
    lengthIn: '15.0"',
    lengthCm: '38.1 cm',
    neckIn: '8.0"',
    neckCm: '20.3 cm',
  },
  {
    size: 'XL (40)',
    bustIn: '40"',
    bustCm: '101 cm',
    waistIn: '34"',
    waistCm: '86 cm',
    lengthIn: '15.5"',
    lengthCm: '39.4 cm',
    neckIn: '8.5"',
    neckCm: '21.6 cm',
  },
  {
    size: 'XXL (42)',
    bustIn: '42"',
    bustCm: '106 cm',
    waistIn: '36"',
    waistCm: '91 cm',
    lengthIn: '16.0"',
    lengthCm: '40.6 cm',
    neckIn: '8.5"',
    neckCm: '21.6 cm',
  },
  {
    size: 'Custom Stitching',
    bustIn: 'Bespoke',
    bustCm: 'Bespoke',
    waistIn: 'Bespoke',
    waistCm: 'Bespoke',
    lengthIn: 'Bespoke',
    lengthCm: 'Bespoke',
    neckIn: 'Bespoke',
    neckCm: 'Bespoke',
  },
];

export default function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white border border-hairline shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-hairline bg-ivory">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-noir/50 block">
              Atelier Fit &amp; Sizing
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-normal text-noir mt-0.5">
              Blouse Measurement Guide
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="p-2 rounded-full text-noir/60 hover:text-noir hover:bg-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Unit Switcher */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-noir/60">
              Standard Indian Couture Sizing (All garments include inner padding &amp; hooks/ties)
            </p>
            <div className="inline-flex p-1 bg-ivory border border-hairline rounded">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  unit === 'inches'
                    ? 'bg-noir text-white shadow-xs'
                    : 'text-noir/60 hover:text-noir'
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                  unit === 'cm'
                    ? 'bg-noir text-white shadow-xs'
                    : 'text-noir/60 hover:text-noir'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto border border-hairline">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory border-b border-hairline text-noir uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-3.5 sm:px-4">Size</th>
                  <th className="py-3 px-3.5 sm:px-4">Bust</th>
                  <th className="py-3 px-3.5 sm:px-4">Underbust / Waist</th>
                  <th className="py-3 px-3.5 sm:px-4">Blouse Length</th>
                  <th className="py-3 px-3.5 sm:px-4">Front Neck</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline/60">
                {SIZE_DATA.map((row, idx) => (
                  <tr
                    key={row.size}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-ivory/30'}
                  >
                    <td className="py-2.5 px-3.5 sm:px-4 font-semibold text-noir whitespace-nowrap">
                      {row.size}
                    </td>
                    <td className="py-2.5 px-3.5 sm:px-4 text-noir/80">
                      {unit === 'inches' ? row.bustIn : row.bustCm}
                    </td>
                    <td className="py-2.5 px-3.5 sm:px-4 text-noir/80">
                      {unit === 'inches' ? row.waistIn : row.waistCm}
                    </td>
                    <td className="py-2.5 px-3.5 sm:px-4 text-noir/80">
                      {unit === 'inches' ? row.lengthIn : row.lengthCm}
                    </td>
                    <td className="py-2.5 px-3.5 sm:px-4 text-noir/80">
                      {unit === 'inches' ? row.neckIn : row.neckCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alteration Guarantee Callout Banner */}
          <div className="p-4 bg-ivory border border-hairline flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5 border border-gold/30 font-display font-bold text-sm">
              2″
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-noir">
                Bespoke Alteration Margins
              </h4>
              <p className="text-xs text-noir/70 leading-relaxed mt-1">
                Every Madamcutie blouse is crafted with <strong>2 inches of inner margin</strong> on both sides. If you fluctuate between sizes, simply order your nearest size — your local tailor or our concierge can adjust it in minutes.
              </p>
            </div>
          </div>

          {/* How to Measure Instructions & Visual Guide */}
          <div className="pt-2 border-t border-hairline">
            <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-noir mb-3">
              How to Measure Yourself
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-noir/70">
              <div className="p-3 bg-white border border-hairline/70">
                <span className="font-semibold text-noir block mb-1">1. Bust</span>
                Measure around the fullest part of your chest, keeping the tape parallel to the floor.
              </div>
              <div className="p-3 bg-white border border-hairline/70">
                <span className="font-semibold text-noir block mb-1">2. Underbust / Waist</span>
                Measure directly under the bust line where the lower band of the blouse will sit.
              </div>
              <div className="p-3 bg-white border border-hairline/70">
                <span className="font-semibold text-noir block mb-1">3. Blouse Length</span>
                Measure from high shoulder point straight down to your desired crop hemline.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-hairline bg-ivory/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 bg-noir text-white text-xs uppercase tracking-[0.16em] font-semibold hover:bg-noir/90 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
