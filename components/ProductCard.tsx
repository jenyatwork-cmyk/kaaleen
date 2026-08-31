"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = Math.round((1 - product.price / product.compareAtPrice) * 100);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product, product.sizes[1] || product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="group">
      <Link href={`/products/${product.handle}`} className="block">
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-cream-200 mb-3">
          <Image
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            unoptimized
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-olive text-cream-50 text-[10px] font-medium px-2.5 py-1 rounded-full tracking-wider">NEW</span>
            )}
            {product.isBestseller && (
              <span className="bg-terracotta text-cream-50 text-[10px] font-medium px-2.5 py-1 rounded-full tracking-wider">BESTSELLER</span>
            )}
            {!product.inStock && (
              <span className="bg-espresso-muted text-cream-50 text-[10px] font-medium px-2.5 py-1 rounded-full tracking-wider">SOLD OUT</span>
            )}
          </div>
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-cream-50 text-espresso text-[10px] font-medium px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}

          {/* Quick add */}
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            } ${product.inStock
              ? added ? "bg-olive text-cream-50" : "bg-cream-50/95 text-espresso hover:bg-espresso hover:text-cream-50"
              : "bg-cream-200 text-espresso-muted cursor-not-allowed"
            }`}
          >
            <ShoppingBag size={13} />
            {!product.inStock ? "Sold Out" : added ? "Added to bag" : "Quick add"}
          </button>
        </div>

        {/* Info */}
        <div className="space-y-1.5 px-0.5">
          <p className="text-[11px] text-espresso-muted tracking-widest uppercase">{product.material}</p>
          <h3 className="text-sm font-medium text-espresso leading-snug line-clamp-2 group-hover:text-terracotta transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-sm font-medium text-espresso">{formatPrice(product.price)}</span>
            {product.compareAtPrice > product.price && (
              <span className="text-xs text-espresso-muted line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {product.sizes.slice(0, 4).map((size) => (
              <span key={size} className="text-[10px] text-espresso-muted border border-cream-300 rounded px-1.5 py-0.5 leading-tight">
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-espresso-muted">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
