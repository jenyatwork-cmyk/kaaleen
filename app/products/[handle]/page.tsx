import { notFound } from "next/navigation";
import { products, getProductByHandle, formatPrice } from "@/lib/data";
import ProductPageClient from "./ProductPageClient";

interface Props { params: Promise<{ handle: string }> }

export async function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  return { title: product ? `${product.name} – Kaaleen` : "Product – Kaaleen" };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return <ProductPageClient product={product} related={related} />;
}
