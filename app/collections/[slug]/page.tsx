import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products, collections } from "@/lib/data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const col = collections.find((c) => c.slug === slug);
  return { title: col ? `${col.name} Carpets – Kaaleen` : "Collection – Kaaleen" };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const col = collections.find((c) => c.slug === slug);
  if (!col) notFound();

  const items = products.filter((p) => p.category === slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex gap-2 text-xs text-espresso-muted mb-8">
        <a href="/" className="hover:text-espresso">Home</a>
        <span>/</span>
        <a href="/collections" className="hover:text-espresso">Collections</a>
        <span>/</span>
        <span className="text-espresso">{col.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs text-espresso-muted tracking-widest uppercase mb-2">{items.length} carpets</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-espresso mb-4">{col.name}</h1>
        <p className="text-espresso-muted max-w-xl leading-relaxed">{col.description}</p>
      </div>

      {/* Product grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-espresso-muted">
          <p className="font-serif text-2xl mb-2">Coming soon</p>
          <p className="text-sm">New pieces are being added to this collection.</p>
        </div>
      )}
    </div>
  );
}
