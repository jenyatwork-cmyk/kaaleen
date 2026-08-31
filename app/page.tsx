import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Truck, RefreshCw, Shield, CreditCard } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, collections, testimonials, formatPrice } from "@/lib/data";

const CDN = "https://cdn.shopify.com/s/files/1/0763/3672/6242/files";

const featuredProducts = products.filter((p) => p.isBestseller || p.isNew).slice(0, 8);
const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        {/* Background carpet image */}
        <div className="absolute inset-0">
          <Image
            src={`${CDN}/Adler7.jpg`}
            alt="Luxury handcrafted carpet"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-24 w-full">
          <div className="max-w-xl">
            <p className="text-cream-300 text-xs tracking-[0.25em] uppercase mb-4">Handcrafted in India</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-50 leading-tight mb-6">
              Every knot<br />
              <span className="italic text-cream-300">tells a story</span>
            </h1>
            <p className="text-cream-200 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Master artisans weave centuries of tradition into each carpet. From hand-knotted heirlooms to vibrant dhurries — find the one that speaks to your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/collections" className="inline-flex items-center justify-center gap-2 bg-cream-50 text-espresso px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white transition-colors">
                Shop the collection
                <ArrowRight size={16} />
              </Link>
              <Link href="/collections/hand-knotted" className="inline-flex items-center justify-center gap-2 border border-cream-300 text-cream-50 px-7 py-3.5 rounded-full text-sm font-medium hover:bg-cream-50/10 transition-colors">
                Hand-knotted heirlooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────── */}
      <section className="bg-espresso">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: "Free shipping", sub: "On all orders above ₹5,000" },
            { icon: RefreshCw, label: "7-day returns", sub: "No questions asked" },
            { icon: Shield, label: "Secure checkout", sub: "SSL encrypted payment" },
            { icon: CreditCard, label: "EMI available", sub: "No-cost EMI from ₹695/mo" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={20} className="text-terracotta flex-shrink-0" />
              <div>
                <p className="text-cream-100 text-xs font-medium">{label}</p>
                <p className="text-cream-400 text-[11px] leading-tight">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Collections grid ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-espresso-muted tracking-widest uppercase mb-2">Explore by craft</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso">Our Collections</h2>
          </div>
          <Link href="/collections" className="hidden sm:flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((col) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className="group relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src={col.image}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-cream-50 font-serif text-xl mb-0.5">{col.name}</p>
                <p className="text-cream-300 text-xs">{col.count} carpets</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured products ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-espresso-muted tracking-widest uppercase mb-2">Handpicked for you</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso">Bestsellers & New Arrivals</h2>
          </div>
          <Link href="/collections" className="hidden sm:flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Brand story / Editorial banner ──────────────────────────── */}
      <section className="bg-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={`${CDN}/Brilliance.jpg`}
                alt="Artisan weaving"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="max-w-lg">
              <p className="text-xs text-espresso-muted tracking-widest uppercase mb-4">Our story</p>
              <h2 className="font-serif text-4xl text-espresso leading-snug mb-6">
                Five centuries of craft,<br />
                <span className="italic text-terracotta">woven into every thread</span>
              </h2>
              <p className="text-espresso-muted leading-relaxed mb-4">
                Kaaleen was born from a simple belief: that the world's most beautiful carpets deserve to be in more homes. We work directly with master craftsmen in Agra, Jaipur, and Mirzapur — families who have been weaving for generations.
              </p>
              <p className="text-espresso-muted leading-relaxed mb-8">
                Each carpet is made without machines. A 6×9 hand-knotted carpet takes three months and over 160,000 individual knots. When you bring one home, you bring that story with it.
              </p>
              <Link href="/collections/hand-knotted" className="inline-flex items-center gap-2 text-sm font-medium text-espresso border-b border-espresso pb-0.5 hover:text-terracotta hover:border-terracotta transition-colors">
                Explore hand-knotted carpets
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat band ─────────────────────────────────────────────────── */}
      <section className="border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "5,000+", label: "Carpets sold" },
            { value: "200+", label: "Master artisans" },
            { value: "500", label: "Years of tradition" },
            { value: "4.9★", label: "Customer rating" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-3xl text-espresso mb-1">{value}</p>
              <p className="text-xs text-espresso-muted tracking-wider uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs text-espresso-muted tracking-widest uppercase mb-2">What customers say</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso">From our community</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-cream-100 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#C4622D" className="text-terracotta" />
                ))}
              </div>
              <p className="text-sm text-espresso leading-relaxed flex-1 italic font-serif">"{t.text}"</p>
              <div>
                <p className="text-sm font-medium text-espresso">{t.name}</p>
                <p className="text-xs text-espresso-muted">{t.location} · {t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── New arrivals (full-bleed band) ───────────────────────────── */}
      <section className="bg-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-espresso-muted tracking-widest uppercase mb-2">Just landed</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-espresso">New Arrivals</h2>
            </div>
            <Link href="/collections" className="hidden sm:flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Size guide CTA ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-espresso rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch">
          <div className="relative flex-1 min-h-48">
            <Image
              src={`${CDN}/harb1_1.png`}
              alt="Carpet in room"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1 px-10 py-12 flex flex-col justify-center">
            <p className="text-xs text-terracotta-light tracking-widest uppercase mb-3">Not sure what size?</p>
            <h3 className="font-serif text-3xl text-cream-50 mb-4 leading-snug">
              Find your perfect<br />carpet size
            </h3>
            <p className="text-cream-400 text-sm leading-relaxed mb-7">
              The right size transforms a room. Our size guide shows you exactly how a 4×6, 5×8, or 6×9 carpet looks in different spaces.
            </p>
            <Link href="/size-guide" className="self-start inline-flex items-center gap-2 bg-cream-50 text-espresso px-6 py-3 rounded-full text-sm font-medium hover:bg-white transition-colors">
              View size guide <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
