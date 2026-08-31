"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function BoldProductCard({ product, index: _index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product, product.sizes[1] || product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const discount = Math.round((1 - product.price / product.compareAtPrice) * 100);

  return (
    <article
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="block">

        {/* Portrait image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-cream-100 mb-4">
          <Image
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />

          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-terracotta text-cream-50 font-mono-code text-[9px] tracking-wider px-2 py-1">
              -{discount}%
            </span>
          )}

          {/* NEW badge */}
          {product.isNew && !discount && (
            <span className="absolute top-3 left-3 bg-espresso text-cream-50 font-mono-code text-[9px] tracking-wider px-2 py-1">
              New
            </span>
          )}

          {/* Sold out overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-cream-50/60 flex items-center justify-center">
              <span className="font-mono-code text-[9px] tracking-[0.25em] uppercase text-espresso-muted border border-espresso-muted px-3 py-1.5">
                Sold Out
              </span>
            </div>
          )}

          {/* Add to bag — appears on hover, corner icon */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            title="Add to bag"
            className={`absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center transition-all duration-200
              ${hovered ? "opacity-100" : "opacity-0"}
              ${added
                ? "bg-espresso text-cream-50"
                : "bg-cream-50 text-espresso hover:bg-espresso hover:text-cream-50"
              }
              disabled:opacity-0`}
          >
            {added ? <Check size={13} strokeWidth={2.5} /> : <ShoppingBag size={13} strokeWidth={1.6} />}
          </button>
        </div>

        {/* Info — HoT style: price first, name below, attribution */}
        <div className="space-y-1.5">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-espresso">{formatPrice(product.price)}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-xs text-espresso-muted line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <h3 className="text-sm text-espresso leading-snug group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>

          <p className="font-mono-code text-[10px] tracking-wider uppercase text-espresso-muted">
            By {product.material}
          </p>

          {product.sizes.length > 0 && (
            <p className="font-mono-code text-[9px] tracking-wider text-espresso-muted/70 uppercase">
              Options available
            </p>
          )}
        </div>

      </Link>
    </article>
  );
}
