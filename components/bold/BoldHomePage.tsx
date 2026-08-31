"use client";

import Image from "next/image";
import Link from "next/link";
import { products, collections, formatPrice } from "@/lib/data";
import BoldProductCard from "./BoldProductCard";

const CDN = "https://cdn.shopify.com/s/files/1/0763/3672/6242/files";
const featured = products.filter((p) => p.isBestseller || p.isNew).slice(0, 9);
const MARQUEE_TEXT = "HAND-KNOTTED · HAND-TUFTED · DHURRIE · HANDLOOM · ARTISAN MADE · AGRA · JAIPUR · MIRZAPUR · ";

export default function BoldHomePage() {
  return (
    <div className="border-t-2 border-espresso">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-[55%_45%]" style={{ minHeight: "100svh" }}>
        {/* Left: typographic */}
        <div className="bg-espresso flex flex-col justify-between p-10 md:p-16 min-h-[55vw] md:min-h-0 border-r-2 border-espresso">
          <p className="font-mono text-[10px] tracking-[0.35em] text-espresso-muted uppercase">
            Est. 2023 · Agra · Jaipur · Mirzapur
          </p>

          <div>
            <h1
              className="font-serif text-cream-50 leading-[0.88] tracking-tight mb-8"
              style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
            >
              KAA<br />LEEN
            </h1>
            <div className="w-full h-[2px] bg-espresso-muted mb-8" />
            <p className="text-cream-400 text-[11px] tracking-[0.3em] uppercase mb-1">Hand Crafted</p>
            <p className="text-cream-400 text-[11px] tracking-[0.3em] uppercase mb-12">
              Luxury Carpets · India
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/collections"
                className="inline-block border-2 border-cream-50 text-cream-50 text-[11px] tracking-[0.25em] uppercase px-7 py-3.5 hover:bg-cream-50 hover:text-espresso transition-colors"
              >
                Explore Catalogue →
              </Link>
              <Link
                href="/collections/hand-knotted"
                className="inline-block border-2 border-espresso-muted text-espresso-muted text-[11px] tracking-[0.25em] uppercase px-7 py-3.5 hover:border-cream-400 hover:text-cream-400 transition-colors"
              >
                Hand-Knotted
              </Link>
            </div>
          </div>

          <p className="font-mono text-[10px] tracking-[0.2em] text-espresso-muted">
            kaaleen.in
          </p>
        </div>

        {/* Right: image */}
        <div className="relative min-h-[60vw] md:min-h-0">
          <Image
            src={`${CDN}/Adler7.jpg`}
            alt="Kaaleen carpet"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {/* Catalogue label overlay */}
          <div className="absolute bottom-6 right-6 bg-cream-50 border-2 border-espresso px-4 py-2">
            <p className="font-mono text-[10px] tracking-[0.2em] text-espresso uppercase">Adler Collection</p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────── */}
      <div className="bg-terracotta border-y-2 border-espresso overflow-hidden py-3.5">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-cream-50 text-[11px] tracking-[0.3em] uppercase font-medium mr-0">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATALOGUE ─────────────────────────────────────────────────── */}
      <section>
        <div className="border-b-2 border-espresso px-8 md:px-16 py-5 flex items-center justify-between">
          <h2 className="text-[11px] tracking-[0.35em] uppercase font-medium text-espresso">Catalogue</h2>
          <span className="font-mono text-[10px] text-espresso-muted">{String(featured.length).padStart(2, "0")} Works</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l-2 border-espresso divide-x-0 sm:divide-x-2 divide-y-0 sm:divide-y-0 border-b-2 [&>*]:border-b-2 [&>*]:border-espresso" style={{ borderColor: "var(--color-espresso)" }}>
          {featured.map((p, i) => (
            <div key={p.id} className={`${(i + 1) % 3 !== 0 ? "sm:border-r-2" : ""} border-r-2 border-espresso`}>
              <BoldProductCard product={p} index={i + 1} />
            </div>
          ))}
        </div>
        <div className="border-b-2 border-espresso px-8 md:px-16 py-5 flex justify-end">
          <Link
            href="/collections"
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-espresso hover:text-terracotta transition-colors"
          >
            View All Works →
          </Link>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-espresso">
        {[
          { value: "5,000", sup: "+", label: "Carpets Delivered" },
          { value: "200",   sup: "+", label: "Master Artisans" },
          { value: "500",   sup: "",  label: "Years of Craft" },
          { value: "4.9",   sup: "★", label: "Average Rating" },
        ].map(({ value, sup, label }, i) => (
          <div
            key={label}
            className={`px-8 py-14 border-r-2 border-espresso ${i % 2 === 0 ? "bg-espresso text-cream-50" : "bg-cream-50 text-espresso"}`}
          >
            <p className="font-serif leading-none mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              {value}<span className="text-terracotta">{sup}</span>
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-50">{label}</p>
          </div>
        ))}
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2 border-b-2 border-espresso">
        <div className="border-r-2 border-espresso px-10 md:px-16 py-20">
          <p className="text-[10px] tracking-[0.35em] uppercase text-espresso-muted mb-12">Manifesto</p>
          <blockquote
            className="font-serif italic text-espresso leading-[1.05]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
          >
            "Every knot<br />is an act<br />of intention."
          </blockquote>
          <p className="font-mono text-[10px] tracking-[0.2em] text-espresso-muted mt-10">
            — Kaaleen Studio, 2023
          </p>
        </div>
        <div className="px-10 md:px-16 py-20 flex flex-col justify-center gap-7">
          <p className="text-espresso-muted leading-relaxed text-sm">
            Kaaleen works directly with master craftsmen in Agra, Jaipur, and Mirzapur. Families who have been weaving for generations, keeping alive a tradition over 500 years old.
          </p>
          <p className="text-espresso-muted leading-relaxed text-sm">
            A single 6×9 hand-knotted carpet requires three months of work and over 160,000 individual knots. When you bring one home, you bring that story with it.
          </p>
          <div className="border-t-2 border-espresso pt-7 flex flex-col gap-3">
            {[
              { label: "Hand-Knotted", href: "/collections/hand-knotted" },
              { label: "Hand-Tufted", href: "/collections/hand-tufted" },
              { label: "Dhurrie", href: "/collections/dhurrie" },
              { label: "Handloom", href: "/collections/handloom" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-espresso hover:text-terracotta transition-colors group"
              >
                {label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS GRID ──────────────────────────────────────────── */}
      <section>
        <div className="border-b-2 border-espresso px-8 md:px-16 py-5 flex items-center justify-between">
          <h2 className="text-[11px] tracking-[0.35em] uppercase font-medium">Collections</h2>
          <span className="font-mono text-[10px] text-espresso-muted">04 Categories</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-espresso">
          {collections.map((col, i) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group relative aspect-square overflow-hidden border-r-2 border-espresso last:border-r-0"
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-espresso/50 group-hover:bg-espresso/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 border-t-0">
                <span className="font-mono text-[9px] tracking-[0.3em] text-espresso-muted mb-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-cream-50 text-[11px] tracking-[0.2em] uppercase font-medium">{col.name}</p>
                <p className="text-cream-400 text-[10px] font-mono mt-0.5">{col.count} works</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FULL BLEED CLOSING BANNER ──────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-2 border-espresso" style={{ minHeight: "60vh" }}>
        <Image
          src={`${CDN}/Brilliance.jpg`}
          alt="Kaaleen carpet detail"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-espresso/70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-8 py-24">
          <p className="font-mono text-[10px] tracking-[0.4em] text-espresso-muted uppercase mb-6">
            Free Shipping · 7-Day Returns · India-Wide
          </p>
          <h3
            className="font-serif text-cream-50 leading-tight mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Built to last<br />
            <span className="text-terracotta italic">generations.</span>
          </h3>
          <Link
            href="/collections"
            className="inline-block border-2 border-cream-50 text-cream-50 text-[11px] tracking-[0.3em] uppercase px-8 py-4 hover:bg-cream-50 hover:text-espresso transition-colors"
          >
            Shop the Full Catalogue →
          </Link>
        </div>
      </section>

    </div>
  );
}
