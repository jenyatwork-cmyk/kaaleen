"use client";

import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data";

export default function CartSidebar() {
  const { items, count, total, removeItem, updateQuantity, isOpen, closeCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-50 bg-espresso/30 backdrop-blur-sm" onClick={closeCart} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 bg-cream-50 shadow-2xl flex flex-col transition-transform duration-350 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-300">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-espresso" />
            <span className="font-serif text-lg text-espresso">Your Bag</span>
            {count > 0 && <span className="text-sm text-espresso-muted">({count} item{count !== 1 ? "s" : ""})</span>}
          </div>
          <button onClick={closeCart} className="text-espresso-muted hover:text-espresso transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag size={48} className="text-cream-300" />
              <p className="font-serif text-xl text-espresso">Your bag is empty</p>
              <p className="text-sm text-espresso-muted">Discover our handcrafted carpets and find your perfect piece.</p>
              <button onClick={closeCart} className="mt-2 text-sm text-terracotta underline underline-offset-4 hover:text-terracotta-dark transition-colors">
                Continue browsing
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-cream-200">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-espresso leading-tight line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-espresso-muted mt-1">{item.size}</p>
                    <p className="text-sm font-medium text-espresso mt-1">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-cream-300 rounded-full overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="px-2.5 py-1 text-espresso-muted hover:text-espresso hover:bg-cream-100 transition-colors" aria-label="Decrease">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm text-espresso">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="px-2.5 py-1 text-espresso-muted hover:text-espresso hover:bg-cream-100 transition-colors" aria-label="Increase">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.size)}
                        className="text-xs text-espresso-muted hover:text-red-500 transition-colors underline underline-offset-2">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-cream-300 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-espresso-muted">Subtotal</span>
              <span className="font-medium text-espresso">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-espresso-muted">Shipping and taxes calculated at checkout. Free shipping above ₹5,000.</p>
            <Link href="/checkout" onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-espresso text-cream-50 py-3.5 rounded-full text-sm font-medium hover:bg-espresso-light transition-colors">
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>
            <button onClick={closeCart} className="w-full text-sm text-espresso-muted text-center hover:text-espresso transition-colors">
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
