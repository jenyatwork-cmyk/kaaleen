"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "@/lib/theme-context";

export default function Header() {
  const { count, openCart } = useCart();
  const { theme } = useTheme();
  const isVintage = theme === "light";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/collections/hand-knotted", label: "Hand-Knotted" },
    { href: "/collections/hand-tufted", label: "Hand-Tufted" },
    { href: "/collections/dhurrie", label: "Dhurrie" },
    { href: "/collections/handloom", label: "Handloom" },
    { href: "/collections", label: "All Carpets" },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-espresso text-cream-100 text-xs text-center py-2 px-4 tracking-widest">
        FREE SHIPPING ACROSS INDIA · USE CODE <span className="font-medium">KAALEEN10</span> FOR 10% OFF
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${isVintage ? "" : "bg-cream-50"}`}
        style={isVintage ? { background: "#2A0810" } : undefined}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className={`font-serif text-2xl tracking-tight transition-colors ${isVintage ? "" : "text-espresso hover:text-terracotta"}`}
            style={isVintage ? { color: "var(--color-cream-50)" } : undefined}>
            kaaleen
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`text-sm transition-colors tracking-wide ${isVintage ? "" : "text-espresso-muted hover:text-espresso"}`}
                style={isVintage ? { color: "rgba(244,234,210,0.7)" } : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button aria-label="Search"
              className={`transition-colors ${isVintage ? "" : "text-espresso-muted hover:text-espresso"}`}
              style={isVintage ? { color: "rgba(244,234,210,0.7)" } : undefined}>
              <Search size={20} />
            </button>
            <button onClick={openCart} aria-label={`Cart (${count} items)`}
              className={`relative transition-colors ${isVintage ? "" : "text-espresso-muted hover:text-espresso"}`}
              style={isVintage ? { color: "rgba(244,234,210,0.7)" } : undefined}>
              <ShoppingBag size={20} />
              {count > 0 && (
                <span suppressHydrationWarning className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-terracotta text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(true)} aria-label="Menu"
              className={`lg:hidden transition-colors ${isVintage ? "" : "text-espresso-muted hover:text-espresso"}`}
              style={isVintage ? { color: "rgba(244,234,210,0.7)" } : undefined}>
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-espresso/30" onClick={() => setMenuOpen(false)} />
          <nav className="absolute right-0 top-0 h-full w-72 bg-cream-50 shadow-xl flex flex-col p-8 animate-slide-in">
            <button onClick={() => setMenuOpen(false)} className="self-end mb-8 text-espresso-muted hover:text-espresso">
              <X size={24} />
            </button>
            <div className="font-serif text-xl mb-8 text-espresso">kaaleen</div>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="text-base text-espresso py-3 border-b border-cream-300 hover:text-terracotta transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="mt-8 text-xs text-espresso-muted tracking-wider">
              USE CODE KAALEEN10 FOR 10% OFF
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
