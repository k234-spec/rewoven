'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { EnrichedProduct } from '@/lib/products-data';
import ProductCard from '@/components/molecules/ProductCard';
import QuickAddDrawer from '@/components/molecules/QuickAddDrawer';
import ShopFilters, {
  FilterState,
  SORT_OPTIONS,
} from '@/components/organisms/ShopFilters';

interface ShopClientProps {
  initialProducts: EnrichedProduct[];
}

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  occasion: 'All',
  fabric: 'All',
  color: 'All',
  priceRange: [1000, 4000],
  sortBy: 'featured',
  searchQuery: '',
};

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState<boolean>(false);
  const [quickAddProduct, setQuickAddProduct] =
    useState<EnrichedProduct | null>(null);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Search query
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matches =
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.fabric.toLowerCase().includes(query) ||
            product.color.toLowerCase().includes(query);
          if (!matches) return false;
        }

        // Category
        if (
          filters.category !== 'All' &&
          product.category !== filters.category
        ) {
          return false;
        }

        // Occasion
        if (
          filters.occasion !== 'All' &&
          product.occasion !== filters.occasion
        ) {
          return false;
        }

        // Fabric & Craft
        if (filters.fabric !== 'All' && product.fabric !== filters.fabric) {
          return false;
        }

        // Color Family
        if (filters.color !== 'All' && product.color !== filters.color) {
          return false;
        }

        // Price Range
        if (
          product.price < filters.priceRange[0] ||
          product.price > filters.priceRange[1]
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'bestseller':
            return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
          case 'newest':
            return b.id.localeCompare(a.id);
          case 'featured':
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [initialProducts, filters]);

  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = [];
    if (filters.category !== 'All') {
      chips.push({
        label: `Category: ${filters.category}`,
        onRemove: () => handleFilterChange({ category: 'All' }),
      });
    }
    if (filters.occasion !== 'All') {
      chips.push({
        label: `Occasion: ${filters.occasion}`,
        onRemove: () => handleFilterChange({ occasion: 'All' }),
      });
    }
    if (filters.fabric !== 'All') {
      chips.push({
        label: `Fabric: ${filters.fabric}`,
        onRemove: () => handleFilterChange({ fabric: 'All' }),
      });
    }
    if (filters.color !== 'All') {
      chips.push({
        label: `Color: ${filters.color}`,
        onRemove: () => handleFilterChange({ color: 'All' }),
      });
    }
    if (filters.priceRange[0] > 1000 || filters.priceRange[1] < 4000) {
      chips.push({
        label: `₹${filters.priceRange[0]} - ₹${filters.priceRange[1]}`,
        onRemove: () => handleFilterChange({ priceRange: [1000, 4000] }),
      });
    }
    if (filters.searchQuery) {
      chips.push({
        label: `Search: "${filters.searchQuery}"`,
        onRemove: () => handleFilterChange({ searchQuery: '' }),
      });
    }
    return chips;
  }, [filters]);

  const CATEGORIES = ['All', 'Corset Blouses', 'Designer Blouses', 'Party Tops', 'Co-ord Sets'];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs & Header Banner */}
      <div className="mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
        <nav aria-label="Breadcrumbs" className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest text-noir/50 mb-3">
          <Link href="/" className="hover:text-noir transition-colors">Home</Link>
          <span>/</span>
          <span className="text-noir font-medium">Collections</span>
        </nav>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-noir">
          Collections
        </h1>
        <p className="text-xs sm:text-sm text-noir/70 mt-2 font-normal leading-relaxed">
          Handcrafted mirror-work corsets, zardozi designer blouses, and festive coordinates straight from Chandni Chowk.
        </p>
      </div>

      {/* Quick Category Filter Pills (Horizontal Scroll on Mobile) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilterChange({ category: cat })}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-noir text-white border-noir shadow-sm'
                  : 'bg-white text-noir/70 border-hairline hover:border-gold hover:text-noir'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Control Bar: Search, Mobile Filter Toggle, Product Count & Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-hairline mb-8">
        {/* Search input & Mobile filter button */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by embroidery, color, style..."
              value={filters.searchQuery}
              onChange={(e) =>
                handleFilterChange({ searchQuery: e.target.value })
              }
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-ivory border border-hairline focus:border-noir focus:outline-none transition-colors text-noir placeholder:text-noir/40"
            />
            <svg
              className="w-4 h-4 text-noir/50 absolute left-3 top-3 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => handleFilterChange({ searchQuery: '' })}
                className="absolute right-3 top-3 text-noir/40 hover:text-noir text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-noir text-noir text-xs uppercase tracking-wider font-semibold hover:bg-ivory transition-colors whitespace-nowrap"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {activeChips.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-noir text-white text-[10px] flex items-center justify-center">
                {activeChips.length}
              </span>
            )}
          </button>
        </div>

        {/* Count and Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <span className="text-xs text-noir/60 tracking-wider">
            Showing <strong className="text-noir">{filteredProducts.length}</strong> of{' '}
            {initialProducts.length} styles
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="shop-sort" className="hidden sm:inline text-xs text-noir/60 uppercase tracking-wider">
              Sort:
            </label>
            <select
              id="shop-sort"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
              className="py-2.5 px-3 bg-white border border-hairline text-xs uppercase tracking-wider text-noir focus:border-noir focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-noir/50 uppercase tracking-wider mr-1">
            Active Filters:
          </span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-ivory border border-hairline text-xs text-noir"
            >
              {chip.label}
              <button
                type="button"
                onClick={chip.onRemove}
                className="text-noir/50 hover:text-pink-accent font-bold"
                aria-label={`Remove filter ${chip.label}`}
              >
                ✕
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs text-pink-accent underline font-semibold ml-2 hover:opacity-80 uppercase tracking-wider"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Catalog Layout */}
      <div className="flex items-start gap-8">
        {/* Multi-Faceted Filters (Desktop Sidebar + Mobile Drawer) */}
        <ShopFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          isOpenMobile={isMobileFiltersOpen}
          onCloseMobile={() => setIsMobileFiltersOpen(false)}
          totalProductsCount={initialProducts.length}
          filteredCount={filteredProducts.length}
        />

        {/* Responsive Product Grid: 4 col desktop / 3 tablet / 2 mobile */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={(p) => setQuickAddProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-ivory border border-hairline/60 p-8">
              <svg
                className="w-10 h-10 text-noir/30 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="font-display text-lg text-noir mb-1">
                No styles match your filter criteria
              </h3>
              <p className="text-xs text-noir/60 mb-6 max-w-sm mx-auto">
                Try loosening your price range or clearing selected fabrics and
                colors.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-noir text-white text-xs uppercase tracking-[0.16em] font-semibold hover:bg-noir/90 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Add Drawer Component */}
      <QuickAddDrawer
        product={quickAddProduct}
        isOpen={Boolean(quickAddProduct)}
        onClose={() => setQuickAddProduct(null)}
      />
    </div>
  );
}
