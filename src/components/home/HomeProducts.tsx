import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProducts } from "@/data";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Reveal } from "@/components/ui/Motion";

export function HomeProducts() {
  const products = getFeaturedProducts(8);
  return (
    <section className="border-b border-ink-line bg-ink py-20 md:py-28" aria-label="Featured products">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                04 — THE ROTATION
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
                THE CURRENT ROTATION.
              </h2>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-concrete transition-colors hover:text-lime"
            >
              VIEW ALL PRODUCTS
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
        <ProductGrid products={products} />
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/70">
          All prices and availability shown are synthetic demo data.
        </p>
      </div>
    </section>
  );
}
