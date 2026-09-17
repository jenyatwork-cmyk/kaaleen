"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { products, collections, formatPrice } from "@/lib/data";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

const CDN = "https://cdn.shopify.com/s/files/1/0763/3672/6242/files";
const featured    = products.filter((p) => p.isBestseller || p.isNew).slice(0, 6);
const [na0, na1, na2] = products.filter((p) => p.isNew).slice(0, 3);
const newArrivals = [na1, na0, na2]; // Downes first, then Brilliance, then Grove

/* ── Thin ornament divider ────────────────────────────────── */
function OrnamentDivider({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const c = light ? "rgba(232,215,170,0.45)" : "var(--color-terracotta)";
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-14" style={{ background: `linear-gradient(to right, transparent, ${c})` }} />
      <svg width="8" height="8" viewBox="0 0 8 8">
        <rect x="0.5" y="0.5" width="7" height="7" transform="rotate(45 4 4)" stroke={c} strokeWidth="0.8"/>
        <rect x="2" y="2" width="4" height="4" transform="rotate(45 4 4)" fill={c}/>
      </svg>
      <div className="h-px w-14" style={{ background: `linear-gradient(to left, transparent, ${c})` }} />
    </div>
  );
}

/* ── Section header ───────────────────────────────────────── */
function OrnateHeader({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="text-center mb-16">
      <OrnamentDivider light={light} className="mb-6" />
      <p className={`text-[9px] tracking-[0.55em] uppercase mb-4 ${light ? "text-cream-200/50" : "text-espresso-muted"}`}>
        {eyebrow}
      </p>
      <h2
        className={`font-serif ${light ? "text-cream-50" : "text-espresso"}`}
        style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
      >
        {title}
      </h2>
      <OrnamentDivider light={light} className="mt-6" />
    </div>
  );
}

/* ── Gala CTA button ──────────────────────────────────────── */
function GalaButton({ href, children, light = false, fullWidth = false }: { href: string; children: React.ReactNode; light?: boolean; fullWidth?: boolean }) {
  return (
    <Link
      href={href}
      className={`${fullWidth ? "flex justify-center" : "inline-flex w-fit"} items-center gap-3 text-[9px] tracking-[0.45em] uppercase whitespace-nowrap px-9 py-3.5 transition-all duration-200 hover:opacity-85`}
      style={light
        ? { background: "var(--color-terracotta)", color: "var(--color-cream-50)" }
        : { background: "var(--color-espresso)", color: "var(--color-cream-50)" }
      }
    >
      {children}
      <span className="text-[11px]">→</span>
    </Link>
  );
}

/* ── Ornate frame SVG overlay ─────────────────────────────── */
function OrnateFrame({ color = "var(--color-terracotta)" }: { color?: string }) {
  return (
    <svg viewBox="0 0 75 100" preserveAspectRatio="none" fill="none" stroke={color}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10 }}>
      {/* Double border */}
      <rect x="0.5" y="0.5" width="74" height="99" strokeWidth="0.7" />
      <rect x="3.5" y="3.5" width="68" height="93" strokeWidth="0.35" />
      {/* Top-left corner */}
      <path d="M 0.5,22 C 0.5,10 10,0.5 22,0.5" strokeWidth="1.1" />
      <path d="M 3.5,22 C 3.5,13 13,3.5 22,3.5" strokeWidth="0.4" />
      <path d="M 0.5,22 C 2.5,24 5,23 3.5,20 C 2,17 -0.5,18.5 0.5,22" strokeWidth="0.55" />
      <path d="M 22,0.5 C 24,2.5 23,5 20,3.5 C 17,2 18.5,-0.5 22,0.5" strokeWidth="0.55" />
      {/* Top-right corner */}
      <path d="M 74.5,22 C 74.5,10 65,0.5 53,0.5" strokeWidth="1.1" />
      <path d="M 71.5,22 C 71.5,13 62,3.5 53,3.5" strokeWidth="0.4" />
      <path d="M 74.5,22 C 72.5,24 70,23 71.5,20 C 73,17 75.5,18.5 74.5,22" strokeWidth="0.55" />
      <path d="M 53,0.5 C 51,2.5 52,5 55,3.5 C 58,2 56.5,-0.5 53,0.5" strokeWidth="0.55" />
      {/* Bottom-left corner */}
      <path d="M 0.5,78 C 0.5,90 10,99.5 22,99.5" strokeWidth="1.1" />
      <path d="M 3.5,78 C 3.5,87 13,96.5 22,96.5" strokeWidth="0.4" />
      <path d="M 0.5,78 C 2.5,76 5,77 3.5,80 C 2,83 -0.5,81.5 0.5,78" strokeWidth="0.55" />
      <path d="M 22,99.5 C 24,97.5 23,95 20,96.5 C 17,98 18.5,100.5 22,99.5" strokeWidth="0.55" />
      {/* Bottom-right corner */}
      <path d="M 74.5,78 C 74.5,90 65,99.5 53,99.5" strokeWidth="1.1" />
      <path d="M 71.5,78 C 71.5,87 62,96.5 53,96.5" strokeWidth="0.4" />
      <path d="M 74.5,78 C 72.5,76 70,77 71.5,80 C 73,83 75.5,81.5 74.5,78" strokeWidth="0.55" />
      <path d="M 53,99.5 C 51,97.5 52,95 55,96.5 C 58,98 56.5,100.5 53,99.5" strokeWidth="0.55" />
      {/* Top center ornament */}
      <path d="M 37.5,0.5 L 34,4 M 37.5,0.5 L 41,4" strokeWidth="0.8" />
      <path d="M 37.5,3.5 L 34.5,6 L 37.5,8.5 L 40.5,6 Z" strokeWidth="0.45" />
      <line x1="23" y1="3.5" x2="33" y2="3.5" strokeWidth="0.35" />
      <line x1="42" y1="3.5" x2="52" y2="3.5" strokeWidth="0.35" />
      {/* Bottom center ornament */}
      <path d="M 37.5,99.5 L 34,96 M 37.5,99.5 L 41,96" strokeWidth="0.8" />
      <path d="M 37.5,96.5 L 34.5,94 L 37.5,91.5 L 40.5,94 Z" strokeWidth="0.45" />
      <line x1="23" y1="96.5" x2="33" y2="96.5" strokeWidth="0.35" />
      <line x1="42" y1="96.5" x2="52" y2="96.5" strokeWidth="0.35" />
    </svg>
  );
}

/* ── Vintage product card ─────────────────────────────────── */
function VintageCard({ product, light = false }: { product: Product; light?: boolean }) {
  const { addItem } = useCart();
  const [added, setAdded]     = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product, product.sizes[1] || product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative mb-5" style={{ padding: "8%" }}>
          <img src="/frame.png" alt="" aria-hidden
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10, objectFit: "fill", opacity: 0.45 }} />
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={hovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              style={{ filter: hovered ? "none" : "sepia(0.28) contrast(1.05)" }}
              unoptimized
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-cream-50/50 flex items-center justify-center">
                <span className="text-[9px] tracking-[0.3em] uppercase text-espresso-muted border border-espresso-muted px-3 py-1.5">
                  Sold Out
                </span>
              </div>
            )}
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200
                ${hovered ? "opacity-100" : "opacity-0"}`}
              style={{ background: added ? "var(--color-espresso)" : "var(--color-terracotta)", color: "var(--color-cream-50)" }}
            >
              {added ? <Check size={12} /> : <ShoppingBag size={12} />}
            </button>
          </div>
        </div>
        <div className="text-center px-1">
          <p
            className="font-serif italic text-[15px] leading-snug mb-1 transition-colors"
            style={{ color: light ? "var(--color-cream-50)" : "var(--color-espresso)" }}
          >
            {product.name}
          </p>
          <p
            className="text-[9px] tracking-[0.35em] uppercase"
            style={{ color: light ? "rgba(244,234,210,0.65)" : "var(--color-espresso-muted)" }}
          >
            {formatPrice(product.price)}
          </p>
          <p
            className="text-[9px] tracking-wider uppercase mt-0.5"
            style={{ color: light ? "rgba(244,234,210,0.4)" : "var(--color-espresso-muted)" }}
          >
            {product.material}
          </p>
        </div>
      </Link>
    </article>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
// Figma frame: 1280×832
const FRAME_W = 1280, FRAME_H = 832;

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);

  // Logo-only parallax: drifts upward slower than the scene
  useEffect(() => {
    const section = sectionRef.current;
    const logo    = logoRef.current;
    if (!section || !logo) return;
    // Capture resting top so parallax offset is 0 at page load
    const restingScrollY = window.scrollY;
    const onScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      if (top > height || top < -height) return;
      logo.style.transform = `translateX(-50%) translateY(calc(-50% + ${(window.scrollY - restingScrollY) * 0.4}px))`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} data-hero aria-label="Hero"
      style={{ height: "var(--hero-h)", position: "relative", overflow: "hidden", background: "#1A0A06" } as React.CSSProperties}>
      <style>{`
        [data-hero] {
          --hero-h: clamp(43svh, 35vw, 55svh);
          --hero-obj: left 30%;
        }
        /* Subtle bottom fade on desktop — hides floor without touching carpet */
        [data-hero]::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 15%;
          background: linear-gradient(to bottom, transparent, rgba(26,10,6,0.55));
          pointer-events: none;
          z-index: 3;
        }
        /* Medium + mobile: 42vw shows carpet but clips before the floor */
        @media (max-width: 1024px) {
          [data-hero] {
            --hero-h: calc(100vw * 0.42);
            --hero-obj: left 0%;
          }
          [data-hero]::after { display: none; }
        }
      `}</style>

      {/* Layer 0: Background — same crop as carpet layer so overlay stays aligned */}
      <img src="/hero-bg.png" alt="" aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "var(--hero-obj)", pointerEvents: "none" }} />

      {/* Layer 1: Logo — centered, upper portion */}
      <img ref={logoRef} src="/hero-logo.png" alt="Kaaleen"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "33%",
          height: "auto",
          transform: "translateX(-50%) translateY(-50%)",
          willChange: "transform",
          pointerEvents: "none",
          zIndex: 1,
        }} />

      {/* Layer 2: Carpet — same crop as bg; hidden on mobile */}
      <img data-carpet src="/hero-carpet.png" alt="" aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "var(--hero-obj)", pointerEvents: "none", zIndex: 2 }} />
    </section>
  );
}

/* ── Craft editorial section ──────────────────────────────── */
function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text    = textRef.current;
    if (!section || !text) return;
    const onScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      if (top > viewportH || top < -height) return;
      // 0 when section center is at viewport center; keeps text within bounds
      const offset = (viewportH / 2 - (top + height / 2)) * 0.18;
      text.style.transform = `translateY(calc(-50% + ${offset}px))`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textContent = (
    <>
      <OrnamentDivider light className="mb-6 justify-end" />
      <p className="text-[9px] tracking-[0.55em] uppercase mb-5"
        style={{ color: "rgba(232,215,170,0.75)" }}>
        The Art of Craft
      </p>
      <h3 className="font-serif text-cream-50 leading-tight mb-6"
        style={{ fontSize: "clamp(2rem, 3.2vw, 3.8rem)", textAlign: "right" }}>
        The Finest <span className="italic">Hand&#8209;Knotted</span><br />Carpets in India
      </h3>
      <p className="text-sm leading-relaxed mb-8"
        style={{ color: "rgba(232,215,170,0.78)", maxWidth: "26ch", textAlign: "right" }}>
        Each carpet is a collaboration between artisan and tradition — woven over months,
        knot by knot, in the workshops of Agra, Jaipur and Mirzapur.
      </p>
      <GalaButton href="/collections/hand-knotted" light>Shop This Collection</GalaButton>
    </>
  );

  return (
    <>
      {/* ── MOBILE: stacked layout, no overflow effect ─────────── */}
      <section className="block md:hidden" style={{ background: "#270303" }}>
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img src="/craft-bg.png" alt="" aria-hidden
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                     objectFit: "cover", objectPosition: "center" }} />
          <img src="/craft-carpet.png" alt="" aria-hidden
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                     objectFit: "cover", objectPosition: "center",
                     mixBlendMode: "screen" }} />
        </div>
        <div className="flex flex-col items-center text-center px-6 py-10">
          <OrnamentDivider light className="mb-6" />
          <p className="text-[9px] tracking-[0.55em] uppercase mb-5"
            style={{ color: "rgba(232,215,170,0.75)" }}>
            The Art of Craft
          </p>
          <h3 className="font-serif text-cream-50 leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>
            The Finest <span className="italic">Hand&#8209;Knotted</span><br />Carpets in India
          </h3>
          <p className="text-sm leading-relaxed mb-8 text-center"
            style={{ color: "rgba(232,215,170,0.78)" }}>
            Each carpet is a collaboration between artisan and tradition — woven over months,
            knot by knot, in the workshops of Agra, Jaipur and Mirzapur.
          </p>
          <GalaButton href="/collections/hand-knotted" light>Shop This Collection</GalaButton>
        </div>
      </section>

      {/* ── DESKTOP/TABLET: absolute parallax layout with carpet overflow ── */}
      <section ref={sectionRef} className="relative hidden md:block"
        style={{ background: "#270303", minHeight: "clamp(480px, 48vw, 660px)", zIndex: 1, position: "relative" }}>

        {/* Layer 0: bg — clipped to section, same crop as carpet */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <img src="/craft-bg.png" alt="" aria-hidden
            style={{ position: "absolute", left: 0, top: 0,
                     width: "55%", height: "auto",
                     pointerEvents: "none" }} />
        </div>

        {/* Layer 1: text — clipped to section */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }}>
          <div ref={textRef} className="absolute flex flex-col justify-center items-end text-right"
            style={{ left: "52%", top: "50%", transform: "translateY(-50%)",
                     width: "44%", paddingRight: "3rem",
                     willChange: "transform" }}>
            {textContent}
          </div>
        </div>

        {/* Layer 2: carpet — center 90% shifts crop toward bottom so img edge always lands in the PNG's transparent zone at any viewport width */}
        <img src="/craft-carpet.png" alt="" aria-hidden
          style={{ position: "absolute", left: 0, top: 0,
                   width: "55%", height: "auto",
                   mixBlendMode: "screen", pointerEvents: "none", zIndex: 2 }} />
      </section>
    </>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function VintageHomePage() {
  return (
    <div style={{ background: "#2A0810", color: "var(--color-cream-50)" }}>

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── THE NEW COLLECTION ──────────────────────────────── */}
      {/*
        Border: CSS border-image using frame-2.png as a 9-slice border.
        This tiles the lattice edge correctly at any element height — no PNG overlay.
        Arch shape: SVG clipPath with objectBoundingBox so it scales with each card.
        Layout: 1-column on mobile (stacked), 3-column on md+ desktop.
      */}
      <section className="new-collection-section" style={{ background: "#ECD7A8", color: "var(--color-espresso)" }}>
        {/* Scalable arch clip-path — coordinates normalized from 292×353 viewBox to 0-1 */}
        <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
          <defs>
            <clipPath id="mughalArch" clipPathUnits="objectBoundingBox">
              <path d="M1 1H0V0.37352C0.20545,0.29163 0.08704,0.23852 0.17181,0.16519C0.20402,0.13731 0.24983,0.15647 0.26337,0.16313C0.25209,0.15677 0.22222,0.13573 0.25363,0.10672C0.33,0.03622 0.43362,0.10672 0.5,0C0.56636,0.10672 0.67,0.03622 0.74636,0.10672C0.77778,0.13577 0.74791,0.15677 0.73664,0.16313C0.75017,0.15648 0.79596,0.13731 0.82818,0.16519C0.91295,0.23852 0.79454,0.29163 1,0.37352V1Z" />
            </clipPath>
            {/* Pixel-coord clip for inner-shadow SVG overlays (292×353 space) */}
            <clipPath id="mughalArchInnerClip">
              <path d="M292 353H0V131.87C59.9927 102.94 25.4211 84.1985 50.1709 58.31C59.5774 48.4708 72.9519 55.2344 76.903 57.589C73.6089 55.3299 64.8879 47.9191 74.0618 37.6773C96.36 12.7834 126.622 37.6773 146 0C165.378 37.6773 195.64 12.7834 217.938 37.6773C227.112 47.9195 218.39 55.3301 215.096 57.589C219.047 55.2346 232.422 48.4705 241.829 58.31C266.579 84.1985 232.007 102.94 292 131.87V353Z" />
            </clipPath>
            <filter id="mughalArchShadowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="13" />
            </filter>
          </defs>
        </svg>

        <div className="py-12 px-4 md:px-16">
          <OrnateHeader eyebrow="handcrafted" title="Handpicked for You" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mt-12">
            {newArrivals.map((p, idx) => {
              // First card (Downes): room scene is default, product shot on hover
              const defaultImg = idx === 0 ? (p.images[1] ?? p.images[0]) : p.images[0];
              const hoverImg  = idx === 0 ? p.images[0] : (p.images[1] ?? p.images[0]);
              return (
              <Link key={p.id} href={`/products/${p.handle}`}
                className="group flex flex-col items-center gap-5">
                {/* Arch-clipped carpet image with hover swap + inner shadow */}
                <div className="relative w-full max-w-[280px] md:max-w-none" style={{ aspectRatio: "292/353" }}>
                  {/* Primary image — fades out on hover */}
                  <img src={defaultImg} alt={p.name}
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
                             clipPath: "url(#mughalArch)" }} />
                  {/* Hover image — fades in on hover */}
                  <img src={hoverImg} alt="" aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
                             clipPath: "url(#mughalArch)" }} />
                  {/* Inner shadow — blurred stroke on the arch outline, clipped to arch interior */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 292 353" preserveAspectRatio="none">
                    <path
                      d="M292 353H0V131.87C59.9927 102.94 25.4211 84.1985 50.1709 58.31C59.5774 48.4708 72.9519 55.2344 76.903 57.589C73.6089 55.3299 64.8879 47.9191 74.0618 37.6773C96.36 12.7834 126.622 37.6773 146 0C165.378 37.6773 195.64 12.7834 217.938 37.6773C227.112 47.9195 218.39 55.3301 215.096 57.589C219.047 55.2346 232.422 48.4705 241.829 58.31C266.579 84.1985 232.007 102.94 292 131.87V353Z"
                      fill="none"
                      stroke="rgba(0,0,0,0.30)"
                      strokeWidth="32"
                      filter="url(#mughalArchShadowBlur)"
                      clipPath="url(#mughalArchInnerClip)"
                    />
                  </svg>
                </div>
                {/* Product info */}
                <div className="text-center">
                  <p className="font-serif italic mb-1"
                    style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", color: "var(--color-espresso)" }}>
                    {p.name}
                  </p>
                  <p className="text-[10px] tracking-[0.25em]" style={{ color: "var(--color-espresso-muted)" }}>
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[9px] tracking-[0.3em] uppercase mt-0.5" style={{ color: "var(--color-espresso-muted)" }}>
                    {p.material}
                  </p>
                </div>
              </Link>
              );
            })}
          </div>

          <div className="flex justify-center mt-12 mb-8">
            <GalaButton href="/collections">Shop All Collection</GalaButton>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ───────────────────────────────────────── */}
      <CraftSection />

      {/* ── FEATURED WORKS ──────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16">
        <OrnateHeader eyebrow="just arrived" title="The New Collection" light />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {featured.map((p) => <VintageCard key={p.id} product={p} light />)}
        </div>
      </section>

      {/* ── THE ARTISAN ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-20" style={{ background: "var(--color-cream-100)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[716/968]">
              {/* Carpet image inset inside the frame's inner border (border at ~7% from each edge) */}
              <div className="absolute overflow-hidden" style={{ inset: "8.5% 13%", zIndex: 1 }}>
                <Image
                  src={`${CDN}/harb1_1.png`}
                  alt="Artisan at work"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {/* Frame on top — decorative border appears around the carpet */}
              <img src="/frame-tradition.png" alt="" aria-hidden
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
                         pointerEvents: "none", objectFit: "fill", zIndex: 2 }} />
            </div>
          </div>
          <div className="text-center md:text-left">
            <OrnamentDivider className="mb-8 justify-center md:justify-start" />
            <p className="text-[9px] tracking-[0.5em] uppercase text-espresso-muted mb-6">A 500-year tradition</p>
            <OrnamentDivider className="mb-8 justify-center md:justify-start" />
            <blockquote
              className="font-serif italic text-espresso leading-snug mb-8"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)" }}
            >
              "Every knot is an act of intention, passed down through generations."
            </blockquote>
            <p className="text-espresso-muted text-sm leading-relaxed mb-4">
              Kaaleen works directly with master craftsmen — families who have been weaving for centuries in the workshops of Agra, Jaipur, and Mirzapur.
            </p>
            <p className="text-espresso-muted text-sm leading-relaxed mb-10">
              A single 6x9 hand-knotted carpet requires three months and over 160,000 individual knots.
            </p>
            <div className="flex justify-center md:justify-start">
              <GalaButton href="/collections/hand-knotted">Explore Hand-Knotted</GalaButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16">
        <OrnateHeader eyebrow="explore" title="Collections" light />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {collections.map((col) => (
            <Link key={col.slug} href={`/collections/${col.slug}`} className="group text-center">
              <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ border: "1px solid var(--color-terracotta)" }}>
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-terracotta z-10" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-terracotta z-10" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-terracotta z-10" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-terracotta z-10" />
                <Image
                  src={col.image} alt={col.name} fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  style={{ filter: "sepia(0.35) contrast(1.05)" }}
                  unoptimized
                />
              </div>
              <p className="font-serif italic group-hover:opacity-70 transition-opacity text-base" style={{ color: "var(--color-cream-50)" }}>{col.name}</p>
              <p className="text-[9px] tracking-[0.3em] uppercase mt-1" style={{ color: "rgba(244,234,210,0.45)" }}>{col.count} carpets</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ABOUT + STATS ────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ background: "var(--color-espresso)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <OrnamentDivider light className="mb-10" />
          <h3 className="font-serif italic text-cream-50 mb-10" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            A little bit about us
          </h3>
          <p className="text-sm leading-relaxed mb-14 max-w-lg mx-auto" style={{ color: "rgba(232,215,170,0.42)" }}>
            Kaaleen is a destination for India's finest handcrafted carpets, curated from artisan studios across Agra, Jaipur, and Mirzapur.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 relative" style={{ border: "1px solid rgba(201,160,46,0.35)" }}>
            <div className="absolute -top-px -left-px w-7 h-7 border-t-2 border-l-2" style={{ borderColor: "var(--color-terracotta)" }} />
            <div className="absolute -top-px -right-px w-7 h-7 border-t-2 border-r-2" style={{ borderColor: "var(--color-terracotta)" }} />
            <div className="absolute -bottom-px -left-px w-7 h-7 border-b-2 border-l-2" style={{ borderColor: "var(--color-terracotta)" }} />
            <div className="absolute -bottom-px -right-px w-7 h-7 border-b-2 border-r-2" style={{ borderColor: "var(--color-terracotta)" }} />
            {[
              { value: "5,000+", label: "Carpets Sold" },
              { value: "200+",   label: "Artisans" },
              { value: "500 yrs", label: "Of Tradition" },
              { value: "4.9 ★",  label: "Customer Rating" },
            ].map(({ value, label }, i) => (
              <div key={label} className="py-9 px-4" style={{ borderLeft: i > 0 ? "1px solid rgba(201,160,46,0.25)" : undefined }}>
                <p className="font-serif text-cream-50 text-2xl mb-1">{value}</p>
                <p className="text-[8px] tracking-[0.35em] uppercase" style={{ color: "rgba(232,215,170,0.32)" }}>{label}</p>
              </div>
            ))}
          </div>
          <OrnamentDivider light className="mt-10" />
        </div>
      </section>

      {/* ── CTA BAR ──────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2">
        <Link href="/collections"
          className="text-center text-[9px] tracking-[0.5em] uppercase py-5 transition-opacity hover:opacity-80"
          style={{ background: "var(--color-terracotta)", color: "var(--color-cream-50)", borderRight: "1px solid rgba(255,255,255,0.15)" }}>
          View the Full Collection
        </Link>
        <Link href="/collections/hand-knotted"
          className="text-center text-[9px] tracking-[0.5em] uppercase py-5 transition-opacity hover:opacity-80"
          style={{ background: "var(--color-terracotta-dark)", color: "var(--color-cream-50)" }}>
          Hand-Knotted Heirlooms
        </Link>
      </section>

    </div>
  );
}
