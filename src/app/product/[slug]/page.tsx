import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/data";
import { formatIDR } from "@/lib/utils";
import { ProductClient } from "@/components/products/ProductClient";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Reveal } from "@/components/ui/Motion";

export const dynamicParams = true;

export function generateStaticParams() {
  return PRODUCTS.filter((p) => p.status === "PUBLISHED").map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.name} by ${product.brand} — ${product.description.slice(0, 140)}`,
    openGraph: {
      title: `${product.name} — DISTRO AVENUE`,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 4);

  return (
    <div className="pt-24 md:pt-32">
      <ProductClient key={product.id} product={product} />

      {related.length > 0 && (
        <section className="border-t border-ink-line px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-10">
                <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                  KEEP WALKING
                </p>
                <h2 className="font-display text-3xl tracking-tight text-bone md:text-5xl">
                  COMPLETE THE LOOK.
                </h2>
              </div>
            </Reveal>
            <ProductGrid products={related} cols={4} />
          </div>
        </section>
      )}

      {/* Demo pricing note */}
      <section className="border-t border-ink-line px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/70">
            Demo product — price {formatIDR(product.price)} is synthetic portfolio data.
          </p>
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/70">
              SKU {product.sku} · {product.status}
            </span>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
