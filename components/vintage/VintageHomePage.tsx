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
const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

/* ── Baroque cartouche — actual baroque SVG frame ─────────── */
/* Outer subpath only — the ornamental border silhouette */
const MUGHAL_PATH = "M550 787H0V294C113 229.5 47.8822 187.717 94.5 130C112.218 108.064 137.409 123.143 144.852 128.393C138.647 123.356 122.22 106.834 139.5 84C181.5 28.5 238.5 84.0001 275 0C311.5 84.0001 368.5 28.5 410.5 84C427.78 106.835 411.352 123.356 405.147 128.393C412.589 123.143 437.782 108.063 455.5 130C502.118 187.717 437 229.5 550 294V787Z";

const BAROQUE_PATH ="M441 0C499.533 76.4287 590.94 25.9313 658.293 76.4287C685.995 97.1982 659.677 112.227 649.721 116.814C661.668 112.034 702.052 98.3294 730.456 118.282C804.63 170.387 702.41 208.219 877.805 266.128L882 267.5C700.789 326.186 805.214 364.203 730.456 416.718C702.051 436.671 661.668 422.965 649.721 418.185C659.677 422.772 685.995 437.802 658.293 458.571C590.94 509.069 499.533 458.571 441 535C382.467 458.571 291.06 509.069 223.707 458.571C196.006 437.802 222.321 422.772 232.278 418.185C220.33 422.965 179.948 436.67 151.544 416.718C77.3701 364.613 179.59 326.781 4.19531 268.872L0 267.5C181.211 208.814 76.786 170.797 151.544 118.282C179.948 98.3299 220.329 112.034 232.278 116.814C222.321 112.226 196.006 97.1977 223.707 76.4287C291.06 25.9313 382.467 76.4287 441 0ZM441 1.63184C411.577 39.2941 374.04 45.7177 335.745 48.9346C297.024 52.1872 257.697 52.194 224.307 77.2285C217.473 82.3523 214.109 87.0222 212.92 91.1338C211.743 95.2042 212.654 98.8799 214.717 102.156C216.796 105.459 220.032 108.326 223.412 110.667C226.783 113.002 230.24 114.774 232.697 115.906L231.907 117.743C225.977 115.37 212.991 110.785 197.981 109.269C182.962 107.751 166.045 109.319 152.119 119.101C133.589 132.117 126.249 144.162 122.768 155.786C121.017 161.63 120.232 167.399 119.515 173.222C118.8 179.023 118.152 184.897 116.661 190.821C113.659 202.752 107.253 214.841 90.2139 227.611C73.5886 240.072 46.8325 253.186 3.21582 267.5L4.50586 267.922L4.50879 267.923C48.3971 282.413 75.0198 295.678 91.3926 308.284C107.813 320.927 113.924 332.909 116.799 344.735C118.226 350.607 118.853 356.433 119.565 362.188C120.28 367.962 121.083 373.688 122.85 379.487C126.364 391.025 133.733 402.984 152.119 415.899C166.045 425.682 182.962 427.249 197.981 425.731C212.991 424.215 225.977 419.629 231.907 417.256L232.697 419.093C230.24 420.225 226.783 421.997 223.412 424.332C220.032 426.673 216.796 429.54 214.717 432.843C212.654 436.119 211.743 439.796 212.92 443.866C214.109 447.978 217.473 452.648 224.307 457.771C257.697 482.806 297.024 482.813 335.745 486.065C374.04 489.282 411.577 495.705 441 533.367C470.423 495.705 507.96 489.282 546.255 486.065C584.976 482.813 624.303 482.806 657.693 457.771C664.527 452.648 667.891 447.978 669.08 443.866C670.257 439.795 669.345 436.119 667.282 432.843C665.203 429.54 661.967 426.673 658.587 424.332C655.216 421.997 651.76 420.225 649.303 419.093L650.092 417.256C656.022 419.628 669.008 424.215 684.018 425.731C699.037 427.249 715.955 425.682 729.881 415.899C748.411 402.883 755.751 390.838 759.232 379.214C760.983 373.37 761.768 367.601 762.485 361.778C763.2 355.977 763.848 350.103 765.339 344.179C768.341 332.248 774.747 320.159 791.786 307.389C808.411 294.928 835.167 281.813 878.783 267.499L877.494 267.078L877.491 267.077C833.603 252.587 806.98 239.322 790.607 226.716C774.187 214.073 768.076 202.091 765.201 190.265C763.774 184.393 763.147 178.567 762.435 172.812C761.72 167.038 760.917 161.312 759.15 155.513C755.636 143.975 748.267 132.016 729.881 119.101C715.955 109.318 699.037 107.751 684.018 109.269C669.008 110.785 656.022 115.371 650.092 117.743L649.303 115.906C651.76 114.774 655.216 113.002 658.587 110.667C661.967 108.326 665.203 105.46 667.282 102.157C669.345 98.8807 670.257 95.2045 669.08 91.1338C667.891 87.0222 664.527 82.3524 657.693 77.2285C624.303 52.194 584.976 52.1872 546.255 48.9346C507.96 45.7177 470.423 39.2941 441 1.63184Z";

/* Inner subpath only — the exact interior boundary of the baroque frame.
   Used as a fill shape so parchment precisely matches the baroque interior (incl. arm areas). */
const BAROQUE_INNER = "M441 1.63184C411.577 39.2941 374.04 45.7177 335.745 48.9346C297.024 52.1872 257.697 52.194 224.307 77.2285C217.473 82.3523 214.109 87.0222 212.92 91.1338C211.743 95.2042 212.654 98.8799 214.717 102.156C216.796 105.459 220.032 108.326 223.412 110.667C226.783 113.002 230.24 114.774 232.697 115.906L231.907 117.743C225.977 115.37 212.991 110.785 197.981 109.269C182.962 107.751 166.045 109.319 152.119 119.101C133.589 132.117 126.249 144.162 122.768 155.786C121.017 161.63 120.232 167.399 119.515 173.222C118.8 179.023 118.152 184.897 116.661 190.821C113.659 202.752 107.253 214.841 90.2139 227.611C73.5886 240.072 46.8325 253.186 3.21582 267.5L4.50586 267.922L4.50879 267.923C48.3971 282.413 75.0198 295.678 91.3926 308.284C107.813 320.927 113.924 332.909 116.799 344.735C118.226 350.607 118.853 356.433 119.565 362.188C120.28 367.962 121.083 373.688 122.85 379.487C126.364 391.025 133.733 402.984 152.119 415.899C166.045 425.682 182.962 427.249 197.981 425.731C212.991 424.215 225.977 419.629 231.907 417.256L232.697 419.093C230.24 420.225 226.783 421.997 223.412 424.332C220.032 426.673 216.796 429.54 214.717 432.843C212.654 436.119 211.743 439.796 212.92 443.866C214.109 447.978 217.473 452.648 224.307 457.771C257.697 482.806 297.024 482.813 335.745 486.065C374.04 489.282 411.577 495.705 441 533.367C470.423 495.705 507.96 489.282 546.255 486.065C584.976 482.813 624.303 482.806 657.693 457.771C664.527 452.648 667.891 447.978 669.08 443.866C670.257 439.795 669.345 436.119 667.282 432.843C665.203 429.54 661.967 426.673 658.587 424.332C655.216 421.997 651.76 420.225 649.303 419.093L650.092 417.256C656.022 419.628 669.008 424.215 684.018 425.731C699.037 427.249 715.955 425.682 729.881 415.899C748.411 402.883 755.751 390.838 759.232 379.214C760.983 373.37 761.768 367.601 762.485 361.778C763.2 355.977 763.848 350.103 765.339 344.179C768.341 332.248 774.747 320.159 791.786 307.389C808.411 294.928 835.167 281.813 878.783 267.499L877.494 267.078L877.491 267.077C833.603 252.587 806.98 239.322 790.607 226.716C774.187 214.073 768.076 202.091 765.201 190.265C763.774 184.393 763.147 178.567 762.435 172.812C761.72 167.038 760.917 161.312 759.15 155.513C755.636 143.975 748.267 132.016 729.881 119.101C715.955 109.318 699.037 107.751 684.018 109.269C669.008 110.785 656.022 115.371 650.092 117.743L649.303 115.906C651.76 114.774 655.216 113.002 658.587 110.667C661.967 108.326 665.203 105.46 667.282 102.157C669.345 98.8807 670.257 95.2045 669.08 91.1338C667.891 87.0222 664.527 82.3524 657.693 77.2285C624.303 52.194 584.976 52.1872 546.255 48.9346C507.96 45.7177 470.423 39.2941 441 1.63184Z";

function CartoucheSVG() {
  return (
    <svg viewBox="0 0 882 535" fill="none" className="absolute inset-0 w-full h-full" aria-hidden>
      {/* Parchment fill — the exact inner subpath of the baroque frame.
          This traces the baroque interior boundary precisely (incl. arm areas),
          so the fill matches the frame's interior shape, not a generic ellipse. */}
      <path d={BAROQUE_INNER} fill="#F5ECD6" opacity="0.97" />
    </svg>
  );
}

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
      className={`${fullWidth ? "flex justify-center" : "inline-flex w-fit"} items-center gap-3 text-[9px] tracking-[0.45em] uppercase px-9 py-3.5 transition-all duration-200 hover:opacity-85`}
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
        <div className="relative mb-5" style={{ padding: "7px", border: "1px solid var(--color-terracotta)" }}>
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-terracotta" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-terracotta" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-terracotta" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-terracotta" />
          <div className="relative aspect-[3/4] overflow-hidden">
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
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const archRef    = useRef<HTMLDivElement>(null);
  const [clip, setClip] = useState({ sw: 800, sh: 500, ax: 0, ay: 0, aw: 300 });

  useEffect(() => {
    const measure = () => {
      const s = sectionRef.current;
      const a = archRef.current;
      if (!s || !a) return;
      const sr = s.getBoundingClientRect();
      const ar = a.getBoundingClientRect();
      setClip({
        sw: sr.width,
        sh: sr.height,
        ax: ar.left - sr.left,
        ay: ar.top  - sr.top,
        aw: ar.width,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const archScale = clip.aw / 550;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "calc(100svh - 98px)", background: "#1A040A", overflow: "hidden" }}
    >
      {/* Darkened background — same image, reduced opacity */}
      <img
        src="/dye-pots-hero.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.38 }}
      />

      {/* Vignette — radial gradient darkening edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(26,4,10,0.72) 100%)",
        }}
      />

      {/* Full-section SVG: same image at FULL brightness, clipped to arch shape.
          viewBox matches section pixels → same zoom as the object-cover background. */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: clip.sw, height: clip.sh }}
        viewBox={`0 0 ${clip.sw} ${clip.sh}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="hero-arch-clip">
            <path
              d={MUGHAL_PATH}
              transform={`translate(${clip.ax} ${clip.ay}) scale(${archScale})`}
            />
          </clipPath>
          <linearGradient id="arch-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="55%" stopColor="#1A040A" stopOpacity="0" />
            <stop offset="100%" stopColor="#1A040A" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Full-section image at full brightness, clipped to arch */}
        <image
          href="/dye-pots-hero.webp"
          x="0" y="0"
          width={clip.sw} height={clip.sh}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#hero-arch-clip)"
        />
        {/* Bottom gradient for logo readability */}
        <rect
          x={clip.ax} y={clip.ay}
          width={clip.aw} height={clip.aw * 787 / 550}
          fill="url(#arch-fade)"
          clipPath="url(#hero-arch-clip)"
        />

        {/* ── Flourish lines ── */}
        {(() => {
          const stroke = "rgba(244,234,210,0.28)";
          const sw = clip.sw; const sh = clip.sh;
          const pad = 28; // inset from edges
          const arm = 48; // length of corner L-arms
          const cx = sw / 2;
          // horizontal rule lines at ~22% and ~78% height
          const hy1 = sh * 0.22; const hy2 = sh * 0.78;
          // gap around center (arch area)
          const gapX = clip.ax - 24; const gapXr = clip.ax + clip.aw + 24;
          return (
            <g stroke={stroke} strokeWidth="0.75" fill="none">
              {/* Corner L brackets — top-left */}
              <polyline points={`${pad + arm},${pad} ${pad},${pad} ${pad},${pad + arm}`} />
              {/* top-right */}
              <polyline points={`${sw - pad - arm},${pad} ${sw - pad},${pad} ${sw - pad},${pad + arm}`} />
              {/* bottom-left */}
              <polyline points={`${pad + arm},${sh - pad} ${pad},${sh - pad} ${pad},${sh - pad - arm}`} />
              {/* bottom-right */}
              <polyline points={`${sw - pad - arm},${sh - pad} ${sw - pad},${sh - pad} ${sw - pad},${sh - pad - arm}`} />

              {/* Horizontal rule — top, broken around arch */}
              <line x1={pad + arm + 8} y1={hy1} x2={gapX} y2={hy1} />
              <line x1={gapXr} y1={hy1} x2={sw - pad - arm - 8} y2={hy1} />
              {/* Small diamond ticks on the rules */}
              <polygon points={`${pad + arm + 8},${hy1 - 3} ${pad + arm + 14},${hy1} ${pad + arm + 8},${hy1 + 3} ${pad + arm + 2},${hy1}`} fill={stroke} stroke="none" />
              <polygon points={`${sw - pad - arm - 8},${hy1 - 3} ${sw - pad - arm - 14},${hy1} ${sw - pad - arm - 8},${hy1 + 3} ${sw - pad - arm - 2},${hy1}`} fill={stroke} stroke="none" />

              {/* Horizontal rule — bottom */}
              <line x1={pad + arm + 8} y1={hy2} x2={gapX} y2={hy2} />
              <line x1={gapXr} y1={hy2} x2={sw - pad - arm - 8} y2={hy2} />
              <polygon points={`${pad + arm + 8},${hy2 - 3} ${pad + arm + 14},${hy2} ${pad + arm + 8},${hy2 + 3} ${pad + arm + 2},${hy2}`} fill={stroke} stroke="none" />
              <polygon points={`${sw - pad - arm - 8},${hy2 - 3} ${sw - pad - arm - 14},${hy2} ${sw - pad - arm - 8},${hy2 + 3} ${sw - pad - arm - 2},${hy2}`} fill={stroke} stroke="none" />

              {/* Vertical center tick at top and bottom */}
              <line x1={cx} y1={pad + arm + 8} x2={cx} y2={hy1 - 8} />
              <line x1={cx} y1={hy2 + 8} x2={cx} y2={sh - pad - arm - 8} />
            </g>
          );
        })()}
      </svg>

      {/* Content column */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div style={{ width: "min(300px, 60vw)" }}>

          {/* Arch placeholder — measured for SVG clip alignment */}
          <div ref={archRef} style={{ width: "100%", aspectRatio: "550/787", position: "relative" }}>
            {/* Logo inside arch, 28px from bottom */}
            <div className="absolute inset-x-0 flex justify-center" style={{ bottom: "28px" }}>
              <img
                src="/logo.png"
                alt="Kaaleen"
                style={{
                  height: "clamp(4rem, 14vw, 9rem)",
                  width: "auto",
                  maxWidth: "82%",
                  filter: "invert(1)",
                  opacity: 0.95,
                }}
              />
            </div>
          </div>

          {/* CTA — 24px below arch */}
          <div style={{ marginTop: "24px" }}>
            <GalaButton href="/collections" light fullWidth>Shop the Collection</GalaButton>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function VintageHomePage() {
  return (
    <div style={{ background: "#2A0810", color: "var(--color-cream-50)" }}>

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── THE NEW COLLECTION ──────────────────────────────── */}
      <section className="py-24 px-6 md:px-16" style={{ background: "var(--color-cream-50)", color: "var(--color-espresso)" }}>
        <OrnateHeader eyebrow="just arrived" title="The New Collection" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {newArrivals.map((p) => <VintageCard key={p.id} product={p} />)}
        </div>
        <div className="flex justify-center mt-14">
          <GalaButton href="/collections">View All Carpets</GalaButton>
        </div>
      </section>

      {/* ── EDITORIAL — dark split panel ────────────────────── */}
      <section className="grid md:grid-cols-2" style={{ background: "#200608" }}>
        <div className="relative" style={{ minHeight: "560px" }}>
          <Image
            src={`${CDN}/Brilliance.jpg`}
            alt="Hand-Knotted collection"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.7) sepia(0.3)" }}
            unoptimized
          />
          <div className="absolute inset-6 pointer-events-none" style={{ border: "1px solid rgba(232,215,170,0.12)" }} />
        </div>
        <div className="flex flex-col justify-center px-10 md:px-16 py-20 md:py-0">
          <OrnamentDivider light className="mb-8 justify-start" />
          <p className="text-[9px] tracking-[0.55em] uppercase mb-6" style={{ color: "rgba(232,215,170,0.38)" }}>
            The Art of Craft
          </p>
          <h3
            className="font-serif text-cream-50 leading-tight mb-8"
            style={{ fontSize: "clamp(1.4rem, 3vw, 3.2rem)" }}
          >
            The Finest <span className="italic">Hand-Knotted</span><br />
            Carpets in India
          </h3>
          <p className="text-sm leading-relaxed mb-10 max-w-xs" style={{ color: "rgba(232,215,170,0.42)" }}>
            Each carpet is a collaboration between artisan and tradition — woven over months, knot by knot, in the workshops of Agra, Jaipur and Mirzapur.
          </p>
          <GalaButton href="/collections/hand-knotted" light>Shop This Collection</GalaButton>
        </div>
      </section>

      {/* ── FEATURED WORKS ──────────────────────────────────── */}
      <section className="py-24 px-6 md:px-16">
        <OrnateHeader eyebrow="handpicked" title="Featured Works" light />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
          {featured.map((p) => <VintageCard key={p.id} product={p} light />)}
        </div>
      </section>

      {/* ── THE ARTISAN ─────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-20" style={{ background: "var(--color-cream-100)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5]" style={{ boxShadow: "8px 8px 0 var(--color-terracotta)" }}>
              <Image
                src={`${CDN}/harb1_1.png`}
                alt="Artisan at work"
                fill
                className="object-cover"
                style={{ filter: "sepia(0.45) contrast(1.05) brightness(0.95)" }}
                unoptimized
              />
              <div className="absolute inset-4 pointer-events-none" style={{ border: "1px solid rgba(232,215,170,0.25)" }} />
            </div>
          </div>
          <div>
            <OrnamentDivider className="mb-8 justify-start" />
            <p className="text-[9px] tracking-[0.5em] uppercase text-espresso-muted mb-6">A 500-year tradition</p>
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
            <GalaButton href="/collections/hand-knotted">Explore Hand-Knotted</GalaButton>
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
