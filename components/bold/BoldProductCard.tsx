"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function BoldProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product, product.sizes[1] || product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const num = String(index).padStart(2, "0");

  return (
    <article className="group border-2 border-espresso bg-cream-50">
      <Link href={`/products/${product.handle}`} className="block">

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-cream-100 border-b-2 border-espresso">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />

          {/* Catalog index — top left */}
          <span className="absolute top-4 left-5 font-display text-[4.5rem] leading-none select-none text-cream-50/20 group-hover:text-cream-50/40 transition-colors">
            {num}
          </span>

          {/* Badges — top right */}
          <div className="absolute top-4 right-4 flex flex-col gap-1">
            {product.isNew && (
              <span className="font-mono-code text-[8px] tracking-[0.2em] uppercase bg-terracotta text-cream-50 px-2 py-1">New</span>
            )}
            {product.isBestseller && (
              <span className="font-mono-code text-[8px] tracking-[0.2em] uppercase bg-espresso text-cream-50 px-2 py-1">Best</span>
            )}
          </div>

          {/* Add to bag icon — bottom right */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            title={product.inStock ? "Add to bag" : "Sold out"}
            className={`absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center border-2 transition-all duration-200
              ${added
                ? "bg-olive border-olive text-cream-50"
                : product.inStock
                  ? "bg-espresso border-espresso text-cream-50 hover:bg-terracotta hover:border-terracotta"
                  : "bg-cream-200 border-cream-300 text-espresso-muted cursor-not-allowed"
              }`}
          >
            {added
              ? <Check size={14} strokeWidth={2.5} />
              : <ShoppingBag size={14} strokeWidth={1.8} />
            }
          </button>

          {!product.inStock && (
            <div className="absolute inset-0 bg-cream-50/70 flex items-center justify-center">
              <span className="font-mono-code text-[9px] tracking-[0.3em] uppercase text-espresso-muted border border-espresso-muted px-3 py-1.5">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xs tracking-[0.1em] uppercase font-medium text-espresso leading-snug flex-1">
              {product.name}
            </h3>
            <span className="font-mono-code text-[9px] text-espresso-muted shrink-0 mt-0.5">{num}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-mono-code text-sm font-bold text-espresso">{formatPrice(product.price)}</span>
            {product.compareAtPrice > product.price && (
              <span className="font-mono-code text-xs text-espresso-muted line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.sizes.slice(0, 5).map((s) => (
              <span key={s} className="font-mono-code text-[8px] tracking-wider uppercase border border-cream-300 px-2 py-1 text-espresso-muted hover:border-espresso hover:text-espresso transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>

      </Link>
    </article>
  );
}
