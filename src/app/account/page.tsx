import type { Metadata } from "next";
import { AccountClient } from "@/components/commerce/AccountClient";

export const metadata: Metadata = {
  title: "Account",
  description: "Your demo account — profile, orders, wishlist and addresses.",
};

export default function AccountPage() {
  return (
    <div className="pt-24 md:pt-36">
      <header className="px-5 pb-10 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
            YOUR SPACE
          </p>
          <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-bone md:text-8xl">
            ACCOUNT<span className="text-lime">.</span>
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
        <AccountClient />
      </div>
    </div>
  );
}
