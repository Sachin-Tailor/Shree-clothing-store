'use client';

import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Package } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CartModal({ isOpen, onClose }) {
  const { cart, cartTotal, cartCount, removeFromCart, updateQty, openCheckout } = useApp();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    openCheckout(); // null = use full cart
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 modal-overlay animate-fade-in"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-shree-bg">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-shree" />
            <h2 className="font-serif text-xl text-shree-dark font-semibold">Your Cart</h2>
            {cartCount > 0 && (
              <span className="bg-shree text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-shree-dark transition p-1 rounded-full hover:bg-shree-bg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-shree-bg rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-shree-light" />
              </div>
              <p className="font-serif text-xl text-shree-dark">Your cart is empty</p>
              <p className="text-sm text-gray-500">Discover our beautiful collections and add items to your cart</p>
              <button
                onClick={onClose}
                className="mt-2 text-sm text-shree border-b border-shree pb-0.5 hover:text-shree-dark transition"
              >
                Browse Collections →
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.key} className="flex gap-4 py-4 border-b border-shree-bg last:border-0 cart-item-enter">
                {/* Image */}
                <div className="relative w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-shree-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm text-shree-dark font-medium leading-snug line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.selectedSize} · {item.selectedColor}
                  </p>
                  <p className="text-shree font-semibold text-sm mt-1.5">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>

                  {/* Qty + Remove */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-shree-muted rounded-sm">
                      <button
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        className="p-1.5 hover:bg-shree-bg transition"
                      >
                        <Minus className="w-3 h-3 text-shree-dark" />
                      </button>
                      <span className="px-3 text-sm font-medium text-shree-dark">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        className="p-1.5 hover:bg-shree-bg transition"
                      >
                        <Plus className="w-3 h-3 text-shree-dark" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.key)}
                      className="text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-shree-bg px-6 py-5 space-y-4 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Subtotal ({cartCount} items)</span>
              <span className="font-serif text-xl font-semibold text-shree-dark">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Free shipping badge */}
            {cartTotal < 999 && (
              <div className="bg-amber-50 border border-amber-200 rounded-sm px-3 py-2">
                <p className="text-xs text-amber-700">
                  Add ₹{(999 - cartTotal).toLocaleString('en-IN')} more for <strong>FREE shipping</strong>
                </p>
                <div className="h-1 bg-amber-200 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${Math.min((cartTotal / 999) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <button
              id="proceed-checkout"
              onClick={handleCheckout}
              className="w-full bg-shree-dark text-white py-4 text-sm uppercase tracking-wider font-semibold hover:bg-shree transition-colors duration-200 flex items-center justify-center gap-2 rounded-sm"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-sm text-gray-500 hover:text-shree-dark transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
