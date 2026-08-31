import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { ThemeProvider } from "@/lib/theme-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const dmSans   = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans",     weight: ["300", "400", "500"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["normal", "italic"] });
const bebas    = Bebas_Neue({ subsets: ["latin"], variable: "--font-bebas",    weight: "400" });
const spaceMono= Space_Mono({ subsets: ["latin"], variable: "--font-space-mono", weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Kaaleen – Handcrafted Luxury Carpets",
  description: "Handcrafted carpets and rugs made by master artisans in India. Hand-knotted, hand-tufted, dhurrie, and handloom carpets delivered across India.",
  keywords: ["luxury carpets India", "hand-knotted rugs", "wool carpets", "handmade rugs"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} ${bebas.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className="bg-cream-50 font-sans">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <CartSidebar />
            <main>{children}</main>
            <Footer />
            <ThemeSwitcher />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
