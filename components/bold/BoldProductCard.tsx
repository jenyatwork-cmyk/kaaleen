"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function BoldProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product, product.sizes[1] || product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const num = String(index).padStart(2, "0");

  return (
    <article className="group border-b-2 border-espresso">
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-100 border-b-2 border-espresso">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <span className="absolute top-4 left-5 font-serif text-5xl leading-none select-none text-cream-50/25 group-hover:text-cream-50/50 transition-colors">
            {num}
          </span>
          {!product.inStock && (
            <div className="absolute inset-0 bg-cream-50/80 flex items-center justify-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-espresso-muted">Sold Out</span>
            </div>
          )}
          {product.isNew && (
            <span className="absolute top-4 right-4 bg-terracotta text-cream-50 text-[9px] tracking-[0.2em] uppercase px-2 py-1">New</span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-xs tracking-[0.15em] uppercase font-medium text-espresso leading-snug flex-1">
              {product.name}
            </h3>
            <span className="font-mono text-[10px] text-espresso-muted shrink-0">{num}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-sm font-medium text-espresso">{formatPrice(product.price)}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-xs text-espresso-muted line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="text-[9px] tracking-wider uppercase border border-espresso px-1.5 py-0.5 font-mono text-espresso-muted">
                {s}
              </span>
            ))}
          </div>

          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="w-full border-2 border-espresso text-espresso text-[10px] tracking-[0.25em] uppercase py-2.5 hover:bg-espresso hover:text-cream-50 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {added ? "Added ✓" : product.inStock ? "Add to Bag" : "Sold Out"}
          </button>
        </div>
      </Link>
    </article>
  );
}
