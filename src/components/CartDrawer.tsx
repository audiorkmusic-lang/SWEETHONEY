import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart';

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, increaseQty, decreaseQty, removeItem, clearCart } =
    useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const handleCheckout = () => {
    setCheckoutDone(true);
    clearCart();
    setTimeout(() => {
      setCheckoutDone(false);
      closeCart();
    }, 2500);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[70] bg-brown-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col bg-cream-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-honey-600" />
            <h2 className="font-display text-xl font-bold text-brown-900">Your Cart</h2>
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-brown-700 transition-colors hover:bg-cream-200"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        {checkoutDone ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <CheckCircle2 className="mb-4 h-16 w-16 text-honey-500" />
            <h3 className="font-display text-2xl font-bold text-brown-900">Order Placed!</h3>
            <p className="mt-2 text-sm text-brown-700/70">
              Thank you for your order. Your SweetHoney biscuits are on their way!
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-honey-300" />
            <h3 className="font-display text-xl font-bold text-brown-900">Your cart is empty</h3>
            <p className="mt-2 text-sm text-brown-700/60">
              Add some delicious biscuits to get started!
            </p>
            <button
              onClick={closeCart}
              className="mt-6 rounded-full bg-gradient-to-r from-honey-400 to-honey-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-honey-400/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Browse Biscuits
            </button>
          </div>
        ) : (
          <>
            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-3xl bg-cream-100 p-4"
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                    />

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-base font-bold text-brown-900">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 text-brown-700/40 transition-colors hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 font-semibold text-honey-600">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity controls */}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-50 text-brown-800 shadow-sm transition-all hover:bg-honey-100 active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-bold text-brown-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-50 text-brown-800 shadow-sm transition-all hover:bg-honey-100 active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-display text-base font-bold text-brown-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with totals */}
            <div className="border-t border-cream-200 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-medium text-brown-700">Subtotal</span>
                <span className="font-display text-2xl font-bold text-honey-600">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mb-4 text-xs text-brown-700/50">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full rounded-full bg-gradient-to-r from-honey-400 to-honey-500 py-4 text-base font-bold text-white shadow-xl shadow-honey-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-honey-400/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                Checkout · ${subtotal.toFixed(2)}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
