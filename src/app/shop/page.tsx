import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the demo catalog — tees, hoodies, jackets, pants, footwear and accessories from the Digital Avenue.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; collection?: string; q?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <header className="border-b border-ink-line px-5 pt-28 pb-8 md:px-10 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
            THE CATALOG
          </p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-bone md:text-8xl">
            SHOP.
          </h1>
          <p className="mt-4 max-w-xl text-base text-concrete">
            Browse, filter and sort the current rotation. Everything here is demo
            catalog data — explore freely.
          </p>
        </div>
      </header>
      <div className="pt-8">
        <ShopClient
          initialCategory={params.category}
          initialCollection={params.collection}
          initialQuery={params.q}
        />
      </div>
    </>
  );
}
