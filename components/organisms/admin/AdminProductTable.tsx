'use client';

import { useState } from 'react';
import { EnrichedProduct } from '@/lib/products-data';

interface AdminProductTableProps {
  products: EnrichedProduct[];
  userRole: 'admin' | 'store_associate';
  onProductUpdated: () => void;
}

export default function AdminProductTable({
  products,
  userRole,
  onProductUpdated,
}: AdminProductTableProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<EnrichedProduct | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Co-ord Sets',
    price: 1499,
    originalPrice: '',
    description: '',
    fabricDetails: '',
    careGuide: 'Dry clean only.',
    occasion: 'Haldi & Mehendi',
    fabric: 'Mirror Work',
    color: 'Gold',
    imageUrl: '',
    isSale: false,
    isBestseller: false,
    isFeatured: false,
  });

  const categories = ['ALL', 'Co-ord Sets', 'Designer Blouses', 'Corset Blouses', 'Party Tops'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: `MC-P${Date.now().toString().slice(-4)}`,
      category: 'Designer Blouses',
      price: 1499,
      originalPrice: '1999',
      description: 'Handcrafted luxury ethnic couture blouse with artisan mirror embroidery.',
      fabricDetails: 'Structured silk lining with 2-inch inner margins on each side.',
      careGuide: 'Dry clean only.',
      occasion: 'Sangeet & Cocktail',
      fabric: 'Mirror Work',
      color: 'Gold',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      isSale: false,
      isBestseller: false,
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: EnrichedProduct) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      sku: p.sku,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice ? String(p.originalPrice) : '',
      description: p.description,
      fabricDetails: p.fabricDetails || '',
      careGuide: p.careGuide || '',
      occasion: p.occasion || 'Festive',
      fabric: p.fabric || 'Silk',
      color: p.color || 'Gold',
      imageUrl: p.images[0]?.url || '',
      isSale: p.isSale,
      isBestseller: p.isBestseller,
      isFeatured: p.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== 'admin') {
      alert('Only users with the "admin" role have permission to edit or add products.');
      return;
    }

    try {
      if (editingProduct) {
        // PUT update
        const res = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProduct.id,
            ...formData,
            price: Number(formData.price),
            originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
          }),
        });
        if (!res.ok) throw new Error('Failed to update product');
      } else {
        // POST create
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
          }),
        });
        if (!res.ok) throw new Error('Failed to create product');
      }

      setIsModalOpen(false);
      onProductUpdated();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error saving product');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (userRole !== 'admin') {
      alert('Only users with the "admin" role can delete products.');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete product');
      onProductUpdated();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting product');
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Add Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-4 border border-[#222222]">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or SKU..."
              className="w-full pl-9 pr-4 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37]"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-2.5 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Add Product Button (Admin Only) */}
        <div>
          {userRole === 'admin' ? (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0a0a] text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>+ Add New Product</span>
            </button>
          ) : (
            <span className="text-[11px] text-neutral-400 italic px-2 py-1 bg-[#1c1c1c] border border-[#333333]">
              Read-only catalog (Store Associate)
            </span>
          )}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-[#141414] border border-[#222222] overflow-x-auto shadow-md">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-[#1c1c1c] text-[10px] uppercase tracking-wider text-neutral-400 border-b border-[#222222]">
            <tr>
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Fabric &amp; Craft</th>
              <th className="py-3 px-4">Price (INR)</th>
              <th className="py-3 px-4">Badges</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222222]">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-neutral-500">
                  No products found matching your search.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#1a1a1a] transition-colors"
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-12 h-14 bg-black overflow-hidden shrink-0 border border-[#333333]">
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>
                    <div className="min-w-0 max-w-xs">
                      <p className="font-medium text-white truncate">
                        {product.name}
                      </p>
                      <span className="text-[10px] text-neutral-500">
                        {product.id}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">
                    {product.sku}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-[#222222] text-neutral-300 rounded text-[10px]">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-neutral-400 text-[11px]">
                    {product.fabric}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-white">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-neutral-500 line-through ml-1 text-[10px]">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 space-x-1">
                    {product.isSale && (
                      <span className="px-1.5 py-0.5 bg-pink-900/40 text-pink-300 border border-pink-700/50 text-[9px] uppercase font-bold">
                        Sale
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="px-1.5 py-0.5 bg-amber-900/40 text-amber-300 border border-amber-700/50 text-[9px] uppercase font-bold">
                        Bestseller
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    {userRole === 'admin' ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(product)}
                          className="px-2.5 py-1 bg-[#222222] hover:bg-[#333333] text-neutral-200 text-xs transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={isDeletingId === product.id}
                          onClick={() => handleDelete(product.id, product.name)}
                          className="px-2.5 py-1 bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-300 text-xs transition-colors disabled:opacity-50"
                        >
                          {isDeletingId === product.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-neutral-500">View Only</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2e2e2e] shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#222222] mb-5">
              <h3 className="font-display text-lg font-normal text-white">
                {editingProduct ? 'Edit Couture Silhouette' : 'Add New Couture Silhouette'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Co-ord Sets">Co-ord Sets</option>
                    <option value="Designer Blouses">Designer Blouses</option>
                    <option value="Corset Blouses">Corset Blouses</option>
                    <option value="Party Tops">Party Tops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                    Original Price (INR)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="e.g. 1999"
                    className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                    Fabric &amp; Craft Details
                  </label>
                  <input
                    type="text"
                    value={formData.fabricDetails}
                    onChange={(e) => setFormData({ ...formData, fabricDetails: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 font-semibold mb-1">
                    Care Instructions
                  </label>
                  <input
                    type="text"
                    value={formData.careGuide}
                    onChange={(e) => setFormData({ ...formData, careGuide: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isSale}
                    onChange={(e) => setFormData({ ...formData, isSale: e.target.checked })}
                  />
                  <span>Mark as Sale</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                  />
                  <span>Mark as Bestseller</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>Featured Look</span>
                </label>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#222222]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-xs text-neutral-300 uppercase font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0a0a] text-xs uppercase font-bold tracking-wider"
                >
                  {editingProduct ? 'Update Silhouette' : 'Create Silhouette'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
