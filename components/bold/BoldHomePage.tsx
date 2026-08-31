"use client";

import Image from "next/image";
import Link from "next/link";
import { products, collections } from "@/lib/data";
import BoldProductCard from "./BoldProductCard";

const CDN = "https://cdn.shopify.com/s/files/1/0763/3672/6242/files";
const featured    = products.filter((p) => p.isBestseller || p.isNew).slice(0, 6);
const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
const MARQUEE = "HAND-KNOTTED · HAND-TUFTED · DHURRIE · HANDLOOM · ARTISAN MADE · AGRA · JAIPUR · MIRZAPUR · ";

function SectionLabel({ sub, title }: { sub: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <p className="font-serif italic text-espresso-muted text-sm mb-1">{sub}</p>
      <h2 className="font-display text-espresso tracking-widest" style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)" }}>
        {title}
      </h2>
      <div className="w-6 h-px bg-espresso-muted mx-auto mt-3" />
    </div>
  );
}

function RectButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block border border-espresso text-espresso font-mono-code text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 hover:bg-espresso hover:text-cream-50 transition-colors"
    >
      {children}
    </Link>
  );
}

export default function BoldHomePage() {
  return (
    <div className="bg-cream-50">

      {/* ── HERO — image fills viewport, text overlays from bottom ──── */}
      <section className="relative w-full" style={{ minHeight: "100svh" }}>
        <Image
          src={`${CDN}/Adler7.jpg`}
          alt="Kaaleen luxury carpet"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Gradient rising from cream-50 at the bottom */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: "55%", background: "linear-gradient(to top, var(--color-cream-50) 30%, transparent)" }}
        />
        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 text-center px-6 pb-16 z-10">
          <p className="font-serif italic text-espresso-muted text-base mb-3">presenting</p>
          <h1
            className="font-display text-espresso leading-none mb-5"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "0.03em" }}
          >
            ICONS OF INDIAN CRAFT
          </h1>
          <p className="text-espresso-muted text-sm max-w-sm mx-auto leading-relaxed mb-8">
            Master artisans from Agra, Jaipur and Mirzapur weave centuries of tradition into every carpet.
          </p>
          <RectButton href="/collections">Discover the Collection</RectButton>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────── */}
      <div className="bg-espresso overflow-hidden py-3 border-y border-espresso">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="font-mono-code text-cream-50/40 text-[9px] tracking-[0.35em] uppercase">
              {MARQUEE}
            </span>
          ))}
        </div>
      </div>

      {/* ── NEW ARRIVALS ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-16 border-b border-cream-200">
        <SectionLabel sub="just landed" title="NEW ARRIVALS" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {newArrivals.map((p, i) => (
            <BoldProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
        <div className="text-center mt-12">
          <RectButton href="/collections">View All Carpets</RectButton>
        </div>
      </section>

      {/* ── EDITORIAL BANNER 1 — Hand-Knotted, text overlays bottom ─── */}
      <section className="relative border-b border-cream-200" style={{ minHeight: "88vh" }}>
        <Image
          src={`${CDN}/Brilliance.jpg`}
          alt="Hand-Knotted collection"
          fill
          className="object-cover"
          unoptimized
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: "50%", background: "linear-gradient(to top, var(--color-cream-50) 25%, transparent)" }}
        />
        <div className="absolute inset-x-0 bottom-0 text-center px-6 pb-16 z-10">
          <p className="font-serif italic text-espresso-muted text-sm mb-2">the finest</p>
          <h3 className="font-display text-espresso tracking-widest leading-none mb-1"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
            HAND-KNOTTED
          </h3>
          <h3 className="font-display text-espresso tracking-widest leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
            COLLECTION
          </h3>
          <div className="w-6 h-px bg-espresso-muted mx-auto mb-6" />
          <p className="text-espresso-muted text-sm max-w-xs mx-auto leading-relaxed mb-8">
            Three months. 160,000 knots. One carpet built to last generations.
          </p>
          <RectButton href="/collections/hand-knotted">Shop This Collection</RectButton>
        </div>
      </section>

      {/* ── FEATURED WORKS ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-16 border-b border-cream-200">
        <SectionLabel sub="handpicked" title="FEATURED WORKS" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
          {featured.map((p, i) => (
            <BoldProductCard key={p.id} product={p} index={i + 1} />
          ))}
        </div>
      </section>

      {/* ── EDITORIAL BANNER 2 — The Art of Fine Living ─────────────── */}
      <section className="relative border-b border-cream-200" style={{ minHeight: "80vh" }}>
        <Image
          src={`${CDN}/harb1_1.png`}
          alt="Carpet in room"
          fill
          className="object-cover"
          unoptimized
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: "45%", background: "linear-gradient(to top, var(--color-cream-50) 25%, transparent)" }}
        />
        <div className="absolute inset-x-0 bottom-0 text-center px-6 pb-16 z-10">
          <p className="font-serif italic text-espresso-muted text-sm mb-2">for every space</p>
          <h3 className="font-display text-espresso tracking-widest leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)" }}>
            THE ART OF FINE LIVING
          </h3>
          <div className="w-6 h-px bg-espresso-muted mx-auto mb-8" />
          <RectButton href="/collections">Shop This Edit</RectButton>
        </div>
      </section>

      {/* ── COLLECTIONS 4-UP ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-16 border-b border-cream-200">
        <SectionLabel sub="explore by craft" title="COLLECTIONS" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((col) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <p className="font-mono-code text-[9px] tracking-[0.25em] uppercase text-espresso-muted mb-1">
                {col.count} carpets
              </p>
              <p className="font-display text-espresso tracking-widest text-lg">
                {col.name.toUpperCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── THE ARTISANS ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-16 border-b border-cream-200">
        <SectionLabel sub="the" title="ARTISANS" />
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center max-w-5xl mx-auto">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={`${CDN}/Adler7.jpg`}
              alt="Kaaleen artisan"
              fill
              className="object-cover grayscale"
              unoptimized
            />
          </div>
          <div>
            <p className="font-serif italic text-espresso-muted text-sm mb-6">A 500-year tradition</p>
            <blockquote
              className="font-display text-espresso leading-[0.9] mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              EVERY KNOT IS AN ACT OF INTENTION.
            </blockquote>
            <p className="text-espresso-muted text-sm leading-relaxed mb-4">
              Kaaleen works directly with master craftsmen in Agra, Jaipur, and Mirzapur, families who have been weaving for generations.
            </p>
            <p className="text-espresso-muted text-sm leading-relaxed mb-10">
              A single 6×9 hand-knotted carpet requires three months of work and over 160,000 individual knots.
            </p>
            <RectButton href="/collections/hand-knotted">Explore Hand-Knotted</RectButton>
          </div>
        </div>
      </section>

      {/* ── A LITTLE BIT ABOUT US ────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 text-center border-b border-cream-200">
        <h3 className="font-serif italic text-espresso mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
          A little bit about us
        </h3>
        <p className="text-espresso-muted text-sm max-w-lg mx-auto leading-relaxed mb-2">
          Kaaleen is a destination for India's finest handcrafted carpets, curated from artisan studios across Agra, Jaipur, and Mirzapur.
        </p>
        <p className="text-espresso-muted text-sm max-w-lg mx-auto leading-relaxed mb-12">
          Each piece is made without machines, by families who have spent generations perfecting their craft.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-cream-300">
          {[
            { value: "5,000+", label: "Carpets sold" },
            { value: "200+",   label: "Master artisans" },
            { value: "500 yrs", label: "Of tradition" },
            { value: "4.9★",   label: "Avg. rating" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center px-8 py-2">
              <p className="font-display text-espresso text-2xl mb-0.5">{value}</p>
              <p className="font-mono-code text-[9px] tracking-[0.2em] uppercase text-espresso-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TWO CTA BAR ─────────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2">
        <Link href="/collections"
          className="bg-espresso text-cream-50 text-center font-mono-code text-[10px] tracking-[0.3em] uppercase py-5 hover:opacity-80 transition-opacity border-r border-cream-400/20">
          View All Carpets
        </Link>
        <Link href="/collections/hand-knotted"
          className="bg-espresso text-cream-50 text-center font-mono-code text-[10px] tracking-[0.3em] uppercase py-5 hover:opacity-80 transition-opacity">
          Hand-Knotted Heirlooms
        </Link>
      </section>

    </div>
  );
}
