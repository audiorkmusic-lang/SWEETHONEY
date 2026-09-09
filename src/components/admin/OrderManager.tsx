import { useEffect, useState } from 'react';
import { AlertCircle, ShoppingCart, ChevronDown, X, Package } from 'lucide-react';
import { getOrders, updateOrderStatus, deleteOrder } from '@/lib/api';
import type { OrderWithItems, OrderStatus } from '@/lib/types';
import { ORDER_STATUSES } from '@/lib/types';

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrderManager() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this order? This cannot be undone.')) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete order');
    }
  };

  const filtered = filterStatus === 'all' ? orders : orders.filter((o) => o.status === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-honey-200 border-t-honey-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-brown-900">Orders</h2>
          <p className="text-sm text-brown-700/60">{orders.length} total orders</p>
        </div>

        {/* Status filter */}
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filterStatus === 'all'} onClick={() => setFilterStatus('all')}>
            All
          </FilterChip>
          {ORDER_STATUSES.map((status) => (
            <FilterChip
              key={status}
              active={filterStatus === status}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </FilterChip>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-3xl bg-cream-100 shadow-md transition-all hover:shadow-lg"
          >
            {/* Summary row */}
            <button
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-honey-100 text-honey-600">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-brown-900">
                    {order.customer?.name ?? 'Unknown customer'}
                  </p>
                  <p className="text-sm text-brown-700/60">
                    {new Date(order.created_at).toLocaleDateString()} ·{' '}
                    {order.order_items?.length ?? 0} item(s)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-bold text-honey-600">
                  ${order.total_amount.toFixed(2)}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_COLORS[order.status]}`}
                >
                  {order.status}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-brown-700/40 transition-transform ${
                    expanded === order.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {/* Expanded details */}
            {expanded === order.id && (
              <div className="border-t border-cream-200 p-5">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Customer & delivery */}
                  <div>
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-brown-700/50">
                      Customer
                    </h4>
                    <div className="space-y-1.5 text-sm">
                      <p className="text-brown-900">{order.customer?.name}</p>
                      <p className="text-brown-700/70">{order.customer?.email}</p>
                      {order.customer?.phone && (
                        <p className="text-brown-700/70">{order.customer.phone}</p>
                      )}
                    </div>

                    <h4 className="mb-3 mt-5 text-sm font-bold uppercase tracking-wide text-brown-700/50">
                      Delivery Address
                    </h4>
                    <p className="text-sm text-brown-700/70">{order.delivery_address}</p>
                  </div>

                  {/* Items */}
                  <div>
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-brown-700/50">
                      Items
                    </h4>
                    <div className="space-y-2">
                      {order.order_items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-2xl bg-cream-50 p-3"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-honey-100 text-honey-600">
                            <Package className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-brown-900">
                              {item.product_name}
                            </p>
                            <p className="text-xs text-brown-700/60">
                              {item.quantity} × ${item.unit_price.toFixed(2)}
                            </p>
                          </div>
                          <span className="font-semibold text-brown-900">
                            ${(item.quantity * item.unit_price).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-cream-200 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-brown-800">Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className="rounded-full border-2 border-cream-200 bg-cream-50 px-4 py-2 text-sm font-medium text-brown-900 outline-none transition-colors focus:border-honey-400"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="ml-auto rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <div className="py-20 text-center">
          <ShoppingCart className="mx-auto mb-3 h-12 w-12 text-honey-300" />
          <p className="text-brown-700/60">
            {filterStatus === 'all'
              ? 'No orders yet. Orders will appear here when customers place them.'
              : `No ${filterStatus} orders.`}
          </p>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
        active
          ? 'bg-gradient-to-r from-honey-400 to-honey-500 text-white shadow-md shadow-honey-400/25'
          : 'bg-cream-100 text-brown-700 hover:bg-cream-200'
      }`}
    >
      {children}
    </button>
  );
}
