"use client";

import Image from "next/image";
import Link from "next/link";
import { products, collections } from "@/lib/data";
import BoldProductCard from "./BoldProductCard";

const CDN = "https://cdn.shopify.com/s/files/1/0763/3672/6242/files";
const featured = products.filter((p) => p.isBestseller || p.isNew).slice(0, 9);
const MARQUEE = "HAND-KNOTTED · HAND-TUFTED · DHURRIE · HANDLOOM · ARTISAN MADE · AGRA · JAIPUR · MIRZAPUR · ";

export default function BoldHomePage() {
  return (
    <div>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-[55%_45%]" style={{ minHeight: "100svh" }}>

        {/* Left — orange panel */}
        <div className="bg-terracotta flex flex-col justify-between px-10 py-12 md:px-16 md:py-16 min-h-[70vw] md:min-h-0">
          <p className="font-mono-code text-[10px] tracking-[0.3em] text-cream-50/60 uppercase">
            Est. 2023 · Agra · Jaipur · Mirzapur
          </p>

          <div>
            <h1
              className="font-display text-cream-50 leading-[0.82] mb-8"
              style={{ fontSize: "clamp(5.5rem, 14vw, 12rem)", letterSpacing: "-0.01em" }}
            >
              KAALEEN
            </h1>
            <div className="w-full h-px bg-cream-50/30 mb-7" />
            <p className="font-mono-code text-cream-50/60 text-[10px] tracking-[0.3em] uppercase mb-1.5">Hand Crafted</p>
            <p className="font-mono-code text-cream-50/60 text-[10px] tracking-[0.3em] uppercase mb-12">
              Luxury Carpets · India
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/collections"
                className="inline-block border-2 border-cream-50 text-cream-50 text-[11px] tracking-[0.3em] uppercase px-7 py-4 hover:bg-cream-50 hover:text-terracotta transition-colors font-mono-code"
              >
                Explore Catalogue →
              </Link>
              <Link
                href="/collections/hand-knotted"
                className="inline-block border-2 border-cream-50/30 text-cream-50/60 text-[11px] tracking-[0.3em] uppercase px-7 py-4 hover:border-cream-50/60 hover:text-cream-50/80 transition-colors font-mono-code"
              >
                Hand-Knotted
              </Link>
            </div>
          </div>

          <p className="font-mono-code text-[10px] tracking-[0.2em] text-cream-50/40 uppercase">
            kaaleen.in
          </p>
        </div>

        {/* Right — image */}
        <div className="relative min-h-[60vw] md:min-h-0">
          <Image src={`${CDN}/Adler7.jpg`} alt="Kaaleen" fill className="object-cover" priority unoptimized />
          <div className="absolute bottom-5 right-5 bg-cream-50 border-l-4 border-terracotta px-4 py-2.5">
            <p className="font-mono-code text-[9px] tracking-[0.25em] text-espresso uppercase">Adler Collection</p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE — blue band ───────────────────────────────────── */}
      <div className="bg-olive border-y-2 border-espresso overflow-hidden py-3.5">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 26s linear infinite" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="font-mono-code text-cream-50 text-[10px] tracking-[0.35em] uppercase">
              {MARQUEE}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATALOGUE ─────────────────────────────────────────────── */}
      <section className="border-b-2 border-espresso">
        <div className="px-8 md:px-10 py-5 border-b-2 border-espresso flex items-baseline justify-between">
          <h2 className="font-display text-4xl text-espresso tracking-wide">Catalogue</h2>
          <span className="font-mono-code text-[10px] text-espresso-muted tracking-[0.2em]">
            {String(featured.length).padStart(2, "0")} Works
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          {featured.map((p, i) => (
            <BoldProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
        <div className="px-8 md:px-10 py-4 border-t-2 border-espresso flex justify-end">
          <Link href="/collections" className="font-mono-code text-[10px] tracking-[0.25em] uppercase text-espresso hover:text-terracotta transition-colors">
            View All Works →
          </Link>
        </div>
      </section>

      {/* ── STATS — alternating orange / blue ─────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-espresso">
        {[
          { value: "5,000", sup: "+", label: "Carpets Delivered", bg: "bg-terracotta" },
          { value: "200",   sup: "+", label: "Master Artisans",   bg: "bg-olive" },
          { value: "500",   sup: "",  label: "Years of Craft",    bg: "bg-terracotta" },
          { value: "4.9",   sup: "★", label: "Average Rating",   bg: "bg-olive" },
        ].map(({ value, sup, label, bg }, i) => (
          <div key={label} className={`${bg} px-8 py-14 border-r-2 border-espresso last:border-r-0`}>
            <p className="font-display text-cream-50 leading-none mb-3" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              {value}<span className="opacity-60">{sup}</span>
            </p>
            <p className="font-mono-code text-[9px] tracking-[0.3em] uppercase text-cream-50/60">{label}</p>
          </div>
        ))}
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2 border-b-2 border-espresso">
        {/* Left — blue bg, big quote */}
        <div className="bg-olive px-10 md:px-16 py-20 border-r-2 border-espresso">
          <p className="font-mono-code text-[9px] tracking-[0.35em] uppercase text-cream-50/50 mb-10">Manifesto</p>
          <blockquote
            className="font-display text-cream-50 leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
          >
            EVERY KNOT IS AN ACT OF INTENTION.
          </blockquote>
          <p className="font-mono-code text-[9px] tracking-[0.2em] text-cream-50/40 mt-10 uppercase">
            Kaaleen Studio · 2023
          </p>
        </div>

        {/* Right — body + collection links */}
        <div className="px-10 md:px-16 py-20 flex flex-col justify-center gap-7">
          <p className="text-espresso-muted leading-relaxed text-sm">
            Kaaleen works directly with master craftsmen in Agra, Jaipur, and Mirzapur. Families who have been weaving for generations, keeping alive a tradition over 500 years old.
          </p>
          <p className="text-espresso-muted leading-relaxed text-sm">
            A single 6×9 hand-knotted carpet requires three months of work and over 160,000 individual knots. When you bring one home, you bring that story with it.
          </p>
          <div className="border-t-2 border-espresso pt-7 space-y-3">
            {[
              { label: "Hand-Knotted", href: "/collections/hand-knotted" },
              { label: "Hand-Tufted",  href: "/collections/hand-tufted" },
              { label: "Dhurrie",      href: "/collections/dhurrie" },
              { label: "Handloom",     href: "/collections/handloom" },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-espresso hover:text-terracotta transition-colors group font-mono-code">
                {label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS — grayscale to colour ─────────────────────── */}
      <section className="border-b-2 border-espresso">
        <div className="px-8 md:px-10 py-5 border-b-2 border-espresso flex items-baseline justify-between">
          <h2 className="font-display text-4xl text-espresso tracking-wide">Collections</h2>
          <span className="font-mono-code text-[10px] text-espresso-muted tracking-[0.2em]">04 Categories</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {collections.map((col, i) => (
            <Link key={col.slug} href={`/collections/${col.slug}`}
              className="group relative aspect-square overflow-hidden border-r-2 border-espresso last:border-r-0">
              <Image src={col.image} alt={col.name} fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-espresso/40 group-hover:bg-espresso/20 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 border-t-2 border-espresso/60 group-hover:border-terracotta p-5 transition-colors">
                <p className="font-mono-code text-[8px] tracking-[0.3em] text-cream-50/50 mb-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-mono-code text-cream-50 text-[10px] tracking-[0.2em] uppercase">{col.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FULL-BLEED CLOSE ──────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "65vh" }}>
        <Image src={`${CDN}/Brilliance.jpg`} alt="Carpet detail" fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-espresso/65" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[65vh] text-center px-8 py-24 gap-8">
          <p className="font-mono-code text-[9px] tracking-[0.4em] text-cream-50/50 uppercase">
            Free Shipping · 7-Day Returns · India-Wide
          </p>
          <h3 className="font-display text-cream-50 leading-[0.88]" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            BUILT TO LAST<br />
            <span className="text-terracotta">GENERATIONS.</span>
          </h3>
          <Link
            href="/collections"
            className="inline-block border-2 border-cream-50 text-cream-50 font-mono-code text-[10px] tracking-[0.3em] uppercase px-8 py-4 hover:bg-terracotta hover:border-terracotta transition-colors"
          >
            Shop the Full Catalogue →
          </Link>
        </div>
      </section>

    </div>
  );
}
