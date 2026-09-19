'use client';

import { useState } from 'react';
import { AdminOrder } from '@/app/api/admin/orders/route';

interface AdminOrderTableProps {
  orders: AdminOrder[];
  onOrderUpdated: () => void;
}

export default function AdminOrderTable({
  orders,
  onOrderUpdated,
}: AdminOrderTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const statuses = [
    'ALL',
    'RECEIVED',
    'PROCESSING',
    'DISPATCHED',
    'DELIVERED',
    'CANCELLED',
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search);
    const matchesStatus =
      statusFilter === 'ALL' || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (
    orderId: string,
    newStatus: AdminOrder['orderStatus']
  ) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderStatus: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update order status');
      onOrderUpdated();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error updating status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeClass = (status: AdminOrder['orderStatus']) => {
    switch (status) {
      case 'RECEIVED':
        return 'bg-blue-900/40 text-blue-300 border-blue-700/50';
      case 'PROCESSING':
        return 'bg-amber-900/40 text-amber-300 border-amber-700/50';
      case 'DISPATCHED':
        return 'bg-purple-900/40 text-purple-300 border-purple-700/50';
      case 'DELIVERED':
        return 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50';
      case 'CANCELLED':
        return 'bg-red-900/40 text-red-300 border-red-700/50';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-4 border border-[#222222]">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, phone, or MC-2026-..."
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

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37]"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs text-neutral-400 font-medium self-end sm:self-auto">
          Showing {filteredOrders.length} of {orders.length} orders
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-[#141414] border border-[#222222] overflow-x-auto shadow-md">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-[#1c1c1c] text-[10px] uppercase tracking-wider text-neutral-400 border-b border-[#222222]">
            <tr>
              <th className="py-3 px-4">Order #</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Destination</th>
              <th className="py-3 px-4">Items Summary</th>
              <th className="py-3 px-4">Total &amp; Payment</th>
              <th className="py-3 px-4">Order Status</th>
              <th className="py-3 px-4">Fulfillment Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222222]">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-neutral-500">
                  No orders found matching the filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white whitespace-nowrap">
                    {order.orderNumber}
                    <span className="block text-[10px] font-normal text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-medium text-white">{order.customerName}</p>
                    <p className="text-[11px] text-neutral-400">{order.customerPhone}</p>
                    <p className="text-[10px] text-neutral-500">{order.customerEmail}</p>
                  </td>

                  <td className="py-3 px-4 text-[11px]">
                    <span className="text-white font-medium">{order.shippingCity}</span>
                    <span className="block text-neutral-500">{order.shippingState}</span>
                    {order.trackingNumber && (
                      <span className="text-[10px] font-mono text-purple-300">
                        {order.trackingNumber}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-[11px]">
                    <ul className="space-y-1">
                      {order.items.map((it, idx) => (
                        <li key={idx} className="text-neutral-300">
                          <strong>{it.quantity}x</strong> {it.productName}{' '}
                          <span className="text-[10px] text-[#d4af37]">
                            ({it.size})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <p className="font-bold text-white">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </p>
                    <span
                      className={`inline-block px-1.5 py-0.5 text-[9px] uppercase font-bold rounded ${
                        order.paymentStatus === 'PAID'
                          ? 'bg-emerald-950 text-emerald-300'
                          : 'bg-amber-950 text-amber-300'
                      }`}
                    >
                      {order.paymentStatus} ({order.paymentMethod.replace('_', ' ')})
                    </span>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 border text-[10px] uppercase font-bold ${getStatusBadgeClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    <select
                      disabled={updatingId === order.id}
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as AdminOrder['orderStatus']
                        )
                      }
                      className="px-2.5 py-1.5 bg-[#1c1c1c] border border-[#333333] text-xs text-white focus:outline-none focus:border-[#d4af37] disabled:opacity-50"
                    >
                      <option value="RECEIVED">Mark RECEIVED</option>
                      <option value="PROCESSING">Mark PROCESSING</option>
                      <option value="DISPATCHED">Mark DISPATCHED</option>
                      <option value="DELIVERED">Mark DELIVERED</option>
                      <option value="CANCELLED">Mark CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
