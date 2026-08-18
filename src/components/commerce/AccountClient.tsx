"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Package, User } from "lucide-react";
import { cn, formatDate, formatIDR } from "@/lib/utils";
import { ORDERS, PRODUCTS } from "@/data";
import { useWishlistStore } from "@/store/wishlist-store";
import { DemoBadge, Price, StockLabel } from "@/components/ui/Misc";
import { ButtonLink } from "@/components/ui/Button";

type Tab = "PROFILE" | "ORDERS" | "WISHLIST" | "ADDRESSES";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "PROFILE", label: "PROFILE", icon: User },
  { id: "ORDERS", label: "ORDERS", icon: Package },
  { id: "WISHLIST", label: "WISHLIST", icon: Heart },
  { id: "ADDRESSES", label: "ADDRESSES", icon: MapPin },
];

const demoUser = {
  name: "DEMO CUSTOMER",
  email: "demo.customer@example.com",
  phone: "08xx xxxx xxxx",
};

const demoAddress = {
  label: "HOME",
  lines: ["Jl. Contoh No. 1", "Kec. Bogor Timur", "Kota Bogor, Jawa Barat 16143"],
};

export function AccountClient() {
  const [tab, setTab] = useState<Tab>("PROFILE");
  const wishlist = useWishlistStore((s) => s.ids);
  const wishProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
  const myOrders = ORDERS.slice(0, 3);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      {/* Tabs */}
      <aside>
        <nav className="flex gap-1 overflow-x-auto border-b border-ink-line pb-1 no-scrollbar lg:flex-col lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6" aria-label="Account sections">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
                  active
                    ? "bg-lime text-ink"
                    : "text-concrete hover:bg-ink-line hover:text-bone"
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                {t.id === "WISHLIST" && wishlist.length > 0 && (
                  <span className="ml-auto rounded-full bg-ink px-1.5 font-mono text-[9px] font-bold text-bone lg:bg-ink lg:text-lime">
                    {wishlist.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-3xl tracking-tight text-bone md:text-4xl">
            {tab === "PROFILE" ? "YOUR PROFILE" : tab === "ORDERS" ? "ORDER HISTORY" : tab === "WISHLIST" ? "YOUR WISHLIST" : "ADDRESS BOOK"}
          </h2>
          <DemoBadge label="DEMO ACCOUNT" />
        </div>

        {tab === "PROFILE" && (
          <div className="max-w-lg space-y-5">
            <p className="font-mono text-sm uppercase tracking-[0.1em] text-bone">{demoUser.name}</p>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-concrete">{demoUser.email}</p>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-concrete">{demoUser.phone}</p>
            <div className="border border-ink-line p-5">
              <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-concrete">
                MEMBER SINCE
              </p>
              <p className="font-mono text-sm font-bold text-bone">08 AUG 2026</p>
            </div>
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-concrete/70">
              Demo profile — no real customer information is stored anywhere.
            </p>
          </div>
        )}

        {tab === "ORDERS" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-ink-line text-left font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-concrete">
                  <th className="py-3 pr-4">ORDER</th>
                  <th className="py-3 pr-4">DATE</th>
                  <th className="py-3 pr-4">ITEMS</th>
                  <th className="py-3 pr-4">TOTAL</th>
                  <th className="py-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-line">
                {myOrders.map((o) => (
                  <tr key={o.id} className="font-mono text-xs">
                    <td className="py-4 pr-4 font-bold text-lime">{o.id}</td>
                    <td className="py-4 pr-4 uppercase tracking-[0.1em] text-bone/80">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="py-4 pr-4 text-bone/80">
                      {o.items.map((i) => i.name).join(", ")}
                    </td>
                    <td className="py-4 pr-4 font-bold text-bone">{formatIDR(o.total)}</td>
                    <td className="py-4">
                      <span
                        className={cn(
                          "border px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]",
                          o.orderStatus === "COMPLETED"
                            ? "border-lime/40 bg-lime/10 text-lime"
                            : o.orderStatus === "CANCELLED"
                              ? "border-avenue-red/40 bg-avenue-red/10 text-red-400"
                              : "border-bone/20 bg-bone/5 text-bone/80"
                        )}
                      >
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "WISHLIST" && (
          wishProducts.length === 0 ? (
            <div className="border border-dashed border-ink-line py-20 text-center">
              <Heart className="mx-auto mb-4 h-10 w-10 text-concrete/40" strokeWidth={1} />
              <p className="font-display text-3xl tracking-tight text-bone">NOTHING SAVED YET.</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-concrete">
                Tap the heart on any product to save it here.
              </p>
              <div className="mt-6">
                <ButtonLink href="/shop" variant="outline">BROWSE THE SHOP</ButtonLink>
              </div>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishProducts.map((p) => (
                <li key={p.id}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <div className="relative overflow-hidden bg-ink-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-concrete">{p.brand}</p>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-bone group-hover:text-lime">
                      {p.name}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <Price price={p.price} salePrice={p.salePrice} />
                      <StockLabel stock={p.stock} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )
        )}

        {tab === "ADDRESSES" && (
          <div className="grid gap-6 md:grid-cols-2">
            {[demoAddress, { label: "WORK", lines: ["Jl. Contoh Kerja No. 22", "Kec. Bogor Tengah", "Kota Bogor, Jawa Barat 16129"] }].map((a) => (
              <div key={a.label} className="border border-ink-line p-6">
                <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
                  <MapPin className="h-3.5 w-3.5" /> {a.label}
                </p>
                <p className="font-mono text-xs uppercase leading-loose tracking-[0.1em] text-bone/80">
                  {a.lines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-center border border-dashed border-ink-line p-6">
              <button className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-concrete hover:text-lime">
                + ADD NEW ADDRESS (DEMO)
              </button>
            </div>
          </div>
        )}

        <div className="mt-10">
          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-concrete/70">
            {tab === "ORDERS"
              ? "Demo order history — simulated data, no real transactions."
              : "Demo data only. No real customer information is stored."}
          </p>
        </div>
      </div>
    </div>
  );
}
