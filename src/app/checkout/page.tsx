import type { Metadata } from "next";
import { CheckoutClient } from "@/components/commerce/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Demo checkout — contact, delivery and mock payment.",
};

export default function CheckoutPage() {
  return (
    <div className="pt-24 md:pt-36">
      <header className="px-5 pb-10 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
            THREE STEPS
          </p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-bone md:text-8xl">
            CHECKOUT<span className="text-lime">.</span>
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 pb-28 md:px-10">
        <CheckoutClient />
      </div>
    </div>
  );
}
