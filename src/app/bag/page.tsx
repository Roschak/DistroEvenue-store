import type { Metadata } from "next";
import { BagPageClient } from "@/components/commerce/BagPageClient";

export const metadata: Metadata = {
  title: "Bag",
  description: "Review your bag before checkout — demo shopping experience.",
};

export default function BagPage() {
  return (
    <div className="pt-24 md:pt-36">
      <header className="px-5 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
            YOUR ITEMS
          </p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-bone md:text-8xl">
            BAG<span className="text-lime">.</span>
          </h1>
        </div>
      </header>
      <BagPageClient />
    </div>
  );
}
