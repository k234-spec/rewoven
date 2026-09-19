'use client';

import { useState } from 'react';

interface DeliveryResult {
  pincode: string;
  city: string;
  state: string;
  estimatedDate: string;
  codAvailable: boolean;
  courier: string;
}

export default function PincodeChecker() {
  const [pincode, setPincode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DeliveryResult | null>(null);
  const [error, setError] = useState('');

  const calculateEstimatedDate = () => {
    const today = new Date();
    // 3 to 5 business days delivery timeline
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 4);

    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();

    if (!/^\d{6}$/.test(cleanPin)) {
      setError('Please enter a valid 6-digit Indian PIN code');
      setResult(null);
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulated Courier API lookup (Shiprocket / Delhivery stub)
    setTimeout(() => {
      setIsLoading(false);

      // Derive approximate regional hub based on first digit of pincode
      const firstDigit = cleanPin[0];
      let region = { city: 'New Delhi & NCR', state: 'North Hub' };
      if (firstDigit === '4') region = { city: 'Mumbai / Pune', state: 'West Hub' };
      if (firstDigit === '5' || firstDigit === '6')
        region = { city: 'Bengaluru / Hyderabad / Chennai', state: 'South Hub' };
      if (firstDigit === '7') region = { city: 'Kolkata / Guwahati', state: 'East Hub' };

      setResult({
        pincode: cleanPin,
        city: region.city,
        state: region.state,
        estimatedDate: calculateEstimatedDate(),
        codAvailable: true,
        courier: 'Bluedart / Delhivery Express',
      });
    }, 450);
  };

  return (
    <div className="p-4 bg-ivory border border-hairline space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="pincode-input"
          className="text-xs font-bold uppercase tracking-[0.14em] text-noir flex items-center gap-1.5"
        >
          <svg
            className="w-4 h-4 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Delivery &amp; Pincode Checker
        </label>
        <span className="text-[11px] text-noir/50">Pan-India Dispatch</span>
      </div>

      {/* Input Row */}
      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          id="pincode-input"
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit PIN code (e.g. 110001)"
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPincode(val);
            if (error) setError('');
          }}
          className="flex-1 px-3.5 py-2.5 bg-white border border-hairline text-xs tracking-wider text-noir placeholder:text-noir/40 focus:border-noir focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || pincode.length !== 6}
          className="px-5 py-2.5 bg-noir text-white text-xs uppercase tracking-wider font-semibold hover:bg-noir/90 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {error && (
        <p className="text-[11px] text-pink-accent font-medium">{error}</p>
      )}

      {/* Delivery Result Card */}
      {result && (
        <div className="pt-2 border-t border-hairline/60 space-y-1.5 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-noir font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald" />
            <span>
              Estimated Delivery by <strong>{result.estimatedDate}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-noir/70">
            <span className="flex items-center gap-1">
              <span className="text-emerald">✓</span> Cash on Delivery (COD) Available
            </span>
            <span className="flex items-center gap-1">
              <span className="text-emerald">✓</span> Dispatches from New Delhi Atelier
            </span>
          </div>
        </div>
      )}

      {/* Default Shipping Promise */}
      {!result && !error && (
        <p className="text-[11px] text-noir/60 leading-tight">
          Handcrafted in Chandni Chowk. Usually dispatches within 24–48 hours with door-to-door tracking.
        </p>
      )}
    </div>
  );
}
