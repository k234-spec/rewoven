'use client';

export interface FilterState {
  category: string;
  occasion: string;
  fabric: string;
  color: string;
  priceRange: [number, number];
  sortBy: string;
  searchQuery: string;
}

interface ShopFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalProductsCount: number;
  filteredCount: number;
}

export const CATEGORIES = [
  'All',
  'Designer Blouses',
  'Corset Blouses',
  'Party Tops',
  'Co-ord Sets',
];

export const OCCASIONS = [
  'All',
  'Haldi & Mehendi',
  'Sangeet & Cocktail',
  'Reception',
  'Wedding Day',
  'Casual Glam',
];

export const FABRICS = [
  'All',
  'Mirror Work',
  'Sequin',
  'Pearl Work',
  'Velvet',
  'Silk',
  'Georgette',
  'Cowrie Shells',
];

export const COLORS = [
  'All',
  'Gold',
  'Black',
  'Emerald Green',
  'Mustard Yellow',
  'Red',
  'Silver',
  'Pastels',
];

export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Best Sellers', value: 'bestseller' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest Arrivals', value: 'newest' },
];

export default function ShopFilters({
  filters,
  onFilterChange,
  onResetFilters,
  isOpenMobile,
  onCloseMobile,
  filteredCount,
}: ShopFiltersProps) {
  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.occasion !== 'All' ||
    filters.fabric !== 'All' ||
    filters.color !== 'All' ||
    filters.priceRange[0] > 1000 ||
    filters.priceRange[1] < 4000 ||
    filters.searchQuery !== '';

  const filterContent = (
    <div className="space-y-7">
      {/* Active Filter Clear Header */}
      <div className="flex items-center justify-between pb-3 border-b border-hairline">
        <h3 className="font-display text-base font-normal tracking-wide text-noir">
          Refine Catalog
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs uppercase tracking-wider font-semibold text-pink-accent hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-noir mb-2.5">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange({ category: cat })}
                className={`px-3 py-1.5 text-xs rounded-none border transition-all ${
                  isActive
                    ? 'border-noir bg-noir text-white font-medium'
                    : 'border-hairline bg-white text-noir/80 hover:border-noir/40 hover:bg-ivory'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-noir mb-2.5">
          Occasion
        </label>
        <div className="flex flex-wrap gap-1.5">
          {OCCASIONS.map((occ) => {
            const isActive = filters.occasion === occ;
            return (
              <button
                key={occ}
                type="button"
                onClick={() => onFilterChange({ occasion: occ })}
                className={`px-3 py-1.5 text-xs rounded-none border transition-all ${
                  isActive
                    ? 'border-noir bg-noir text-white font-medium'
                    : 'border-hairline bg-white text-noir/80 hover:border-noir/40 hover:bg-ivory'
                }`}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fabric & Craft */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-noir mb-2.5">
          Fabric & Work
        </label>
        <div className="flex flex-wrap gap-1.5">
          {FABRICS.map((fab) => {
            const isActive = filters.fabric === fab;
            return (
              <button
                key={fab}
                type="button"
                onClick={() => onFilterChange({ fabric: fab })}
                className={`px-3 py-1.5 text-xs rounded-none border transition-all ${
                  isActive
                    ? 'border-noir bg-noir text-white font-medium'
                    : 'border-hairline bg-white text-noir/80 hover:border-noir/40 hover:bg-ivory'
                }`}
              >
                {fab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Family */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-noir mb-2.5">
          Color Family
        </label>
        <div className="flex flex-wrap gap-1.5">
          {COLORS.map((col) => {
            const isActive = filters.color === col;
            return (
              <button
                key={col}
                type="button"
                onClick={() => onFilterChange({ color: col })}
                className={`px-3 py-1.5 text-xs rounded-none border transition-all ${
                  isActive
                    ? 'border-noir bg-noir text-white font-medium'
                    : 'border-hairline bg-white text-noir/80 hover:border-noir/40 hover:bg-ivory'
                }`}
              >
                {col}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-noir">
            Price Range
          </label>
          <span className="text-xs font-medium text-noir">
            ₹{filters.priceRange[0]} — ₹{filters.priceRange[1]}
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={1000}
            max={4000}
            step={100}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFilterChange({
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            className="w-full accent-noir cursor-pointer"
          />
          <div className="flex gap-2">
            {[
              { label: 'Under ₹1.5k', max: 1500 },
              { label: '₹1.5k–₹2k', min: 1500, max: 2000 },
              { label: '₹2k+', min: 2000, max: 4000 },
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  onFilterChange({
                    priceRange: [p.min || 1000, p.max],
                  })
                }
                className="flex-1 py-1 text-[10px] uppercase tracking-wider border border-hairline hover:border-noir bg-white text-noir/70"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on lg screens) */}
      <aside className="hidden lg:block w-64 shrink-0 pr-6 border-r border-hairline">
        {filterContent}
      </aside>

      {/* Mobile / Tablet Filter Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
              <h2 className="font-display text-lg font-normal text-noir">
                Filters &amp; Refine
              </h2>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close filters"
                className="p-1.5 rounded-full text-noir/60 hover:text-noir hover:bg-ivory"
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

            {/* Scrollable Filters */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {filterContent}
            </div>

            {/* Bottom Footer Apply */}
            <div className="p-4 border-t border-hairline bg-ivory flex gap-3">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="w-1/3 py-3 text-xs uppercase tracking-wider font-semibold border border-hairline bg-white text-noir hover:bg-ivory"
                >
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={onCloseMobile}
                className="flex-1 py-3 bg-noir text-white text-xs uppercase tracking-[0.16em] font-semibold hover:bg-noir/90 transition-colors"
              >
                View {filteredCount} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
