"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Truck, RefreshCw, Shield, ChevronDown, ChevronUp, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/ProductCard";

interface Props { product: Product; related: Product[] }

const trustItems = [
  { icon: Truck, label: "Free delivery in 4–7 days" },
  { icon: RefreshCw, label: "7-day hassle-free returns" },
  { icon: Shield, label: "Authentic handcrafted guarantee" },
];

export default function ProductPageClient({ product, related }: Props) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");
  const [added, setAdded] = useState(false);

  const discount = Math.round((1 - product.price / product.compareAtPrice) * 100);

  const handleAddToCart = () => {
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggle = (section: string) => setExpandedSection(expandedSection === section ? null : section);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex gap-2 text-xs text-espresso-muted mb-8">
        <Link href="/" className="hover:text-espresso">Home</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-espresso">Collections</Link>
        <span>/</span>
        <Link href={`/collections/${product.category}`} className="hover:text-espresso capitalize">{product.category.replace("-", " ")}</Link>
        <span>/</span>
        <span className="text-espresso line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* ── Image gallery ── */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="hidden sm:flex flex-col gap-2 w-16 flex-shrink-0">
            {product.images.slice(0, 5).map((img, i) => (
              <button key={i} onClick={() => setActiveImage(i)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${activeImage === i ? "border-espresso" : "border-transparent"}`}>
                <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 relative aspect-[3/4] rounded-2xl overflow-hidden bg-cream-200">
            <Image src={product.images[activeImage] || product.images[0]} alt={product.name} fill className="object-cover" priority unoptimized />
            {product.isBestseller && (
              <span className="absolute top-4 left-4 bg-terracotta text-cream-50 text-[10px] font-medium px-3 py-1.5 rounded-full tracking-wider">BESTSELLER</span>
            )}
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-olive text-cream-50 text-[10px] font-medium px-3 py-1.5 rounded-full tracking-wider">NEW</span>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-espresso/40 flex items-center justify-center">
                <span className="bg-cream-50 text-espresso px-6 py-2 rounded-full text-sm font-medium">Sold Out</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Product info ── */}
        <div className="flex flex-col gap-6">
          {/* Material tag */}
          <p className="text-xs text-espresso-muted tracking-widest uppercase">{product.material} · {product.category.replace("-", " ")}</p>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl text-espresso leading-snug">{product.name}</h1>

          {/* Rating mock */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="#C4622D" className="text-terracotta" />
              ))}
            </div>
            <span className="text-xs text-espresso-muted">4.9 (24 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl text-espresso">{formatPrice(product.price)}</span>
            {product.compareAtPrice > product.price && (
              <>
                <span className="text-base text-espresso-muted line-through">{formatPrice(product.compareAtPrice)}</span>
                <span className="text-sm text-terracotta font-medium">{discount}% off</span>
              </>
            )}
          </div>
          <p className="text-xs text-espresso-muted -mt-4">
            or <span className="font-medium text-espresso">₹{Math.round(product.price / 12).toLocaleString("en-IN")}/month</span> with no-cost EMI
          </p>

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-espresso">Size</p>
              <Link href="#" className="text-xs text-terracotta underline underline-offset-2">Size guide</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${selectedSize === size
                    ? "border-espresso bg-espresso text-cream-50"
                    : "border-cream-300 text-espresso hover:border-espresso"}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center justify-center gap-3 w-full py-4 rounded-full text-sm font-medium transition-all ${
              !product.inStock
                ? "bg-cream-200 text-espresso-muted cursor-not-allowed"
                : added
                ? "bg-olive text-cream-50"
                : "bg-espresso text-cream-50 hover:bg-espresso-light"
            }`}
          >
            <ShoppingBag size={18} />
            {!product.inStock ? "Sold out, check back soon" : added ? "Added to your bag!" : "Add to bag"}
          </button>

          {/* Trust signals */}
          <div className="flex flex-col gap-2.5 py-4 border-y border-cream-300">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-espresso-muted">
                <Icon size={15} className="text-olive flex-shrink-0" />
                {label}
              </div>
            ))}
          </div>

          {/* Accordion details */}
          {[
            {
              id: "description",
              label: "Description",
              content: (
                <div>
                  <p className="text-sm text-espresso-muted leading-relaxed">{product.description}</p>
                  {product.features.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-espresso-muted">
                          <span className="text-olive font-medium mt-0.5">·</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ),
            },
            {
              id: "care",
              label: "Care instructions",
              content: <p className="text-sm text-espresso-muted leading-relaxed">{product.care}</p>,
            },
            {
              id: "shipping",
              label: "Shipping & returns",
              content: (
                <div className="text-sm text-espresso-muted space-y-2 leading-relaxed">
                  <p>Free standard shipping on all orders above ₹5,000. Delivered in 4–7 business days across India.</p>
                  <p>Returns accepted within 7 days of delivery. Carpet must be unused and in original packaging.</p>
                  <p>For orders below ₹5,000, a flat ₹299 shipping charge applies.</p>
                </div>
              ),
            },
          ].map(({ id, label, content }) => (
            <div key={id} className="border-b border-cream-300 last:border-0">
              <button onClick={() => toggle(id)}
                className="flex items-center justify-between w-full py-4 text-left text-sm font-medium text-espresso hover:text-terracotta transition-colors">
                {label}
                {expandedSection === id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {expandedSection === id && (
                <div className="pb-5 animate-fade-in">{content}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl sm:text-3xl text-espresso mb-8">
            More from <span className="italic capitalize">{product.category.replace("-", " ")}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
