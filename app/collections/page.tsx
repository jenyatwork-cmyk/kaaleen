import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, collections } from "@/lib/data";

export const metadata = { title: "All Carpets – Kaaleen" };

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs text-espresso-muted tracking-widest uppercase mb-3">Handcrafted in India</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-espresso mb-4">All Carpets</h1>
        <p className="text-espresso-muted max-w-lg mx-auto leading-relaxed">
          Every carpet in our collection is made by hand by master artisans across India. Browse by craft or explore the full range below.
        </p>
      </div>

      {/* Collection cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {collections.map((col) => (
          <Link key={col.slug} href={`/collections/${col.slug}`} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src={col.image} alt={col.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <div>
                <p className="text-cream-50 font-serif text-lg">{col.name}</p>
                <p className="text-cream-300 text-xs">{col.count} carpets</p>
              </div>
              <ArrowRight size={16} className="text-cream-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* All products */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-espresso">All Carpets <span className="text-espresso-muted font-sans text-base font-normal ml-2">({products.length})</span></h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
