import Link from "next/link";
import { Mail } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream-100">
      {/* Newsletter */}
      <div className="border-b border-espresso-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="sm:flex-1">
            <p className="font-serif text-2xl italic text-cream-200">Join the Carpet Collective</p>
            <p className="text-sm text-cream-400 mt-1">Stories from the loom, new arrivals, and care guides, delivered to your inbox.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <div className="font-serif text-2xl text-cream-200 mb-4">kaaleen</div>
          <p className="text-xs text-cream-400 leading-relaxed">Every knot tells a story. Handcrafted carpets from India's finest artisan workshops.</p>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Instagram" className="text-cream-400 hover:text-cream-200 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="mailto:hello@kaaleen.store" aria-label="Email" className="text-cream-400 hover:text-cream-200 transition-colors"><Mail size={18} /></a>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-cream-300 tracking-widest uppercase mb-4">Collections</p>
          <ul className="space-y-2.5 text-sm text-cream-400">
            {[["Hand-Knotted", "/collections/hand-knotted"], ["Hand-Tufted", "/collections/hand-tufted"], ["Dhurrie", "/collections/dhurrie"], ["Handloom", "/collections/handloom"], ["All Carpets", "/collections"]].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-cream-200 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-cream-300 tracking-widest uppercase mb-4">Help</p>
          <ul className="space-y-2.5 text-sm text-cream-400">
            {[["Shipping & Delivery", "#"], ["Returns & Exchange", "#"], ["Size Guide", "#"], ["Care Instructions", "#"], ["Contact Us", "#"]].map(([label, href]) => (
              <li key={label}><Link href={href} className="hover:text-cream-200 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-cream-300 tracking-widest uppercase mb-4">Company</p>
          <ul className="space-y-2.5 text-sm text-cream-400">
            {[["About Us", "#"], ["Our Artisans", "#"], ["Sustainability", "#"], ["Press", "#"], ["Wholesale", "#"]].map(([label, href]) => (
              <li key={label}><Link href={href} className="hover:text-cream-200 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-espresso-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-400">
          <p>© 2025 Kaaleen Rugs Private Limited. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((label) => (
              <Link key={label} href="#" className="hover:text-cream-200 transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
