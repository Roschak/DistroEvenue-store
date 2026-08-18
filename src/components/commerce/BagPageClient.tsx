"use client";

import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { useBagStore } from "@/store/bag-store";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge, Skeleton } from "@/components/ui/Misc";
import { SITE } from "@/data/site";
import { useHydrated } from "@/hooks/use-hydrated";

export function BagPageClient() {
  const items = useBagStore((s) => s.items);
  const updateQty = useBagStore((s) => s.updateQty);
  const removeItem = useBagStore((s) => s.removeItem);
  const subtotal = useBagStore((s) => s.subtotal());
  const mounted = useHydrated();

  const shipping = mounted && items.length > 0 ? (subtotal >= 750000 ? 0 : 25000) : 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-10 md:px-10 md:pt-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <Skeleton className="mb-6 h-10 w-48" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-5 border-b border-ink-line py-6">
                <Skeleton className="h-36 w-28" />
                <div className="flex-1">
                  <Skeleton className="mb-2 h-3 w-24" />
                  <Skeleton className="mb-6 h-4 w-40" />
                  <Skeleton className="h-9 w-32" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-10 md:px-10 md:pt-14">
      {items.length === 0 ? (
        <div className="border border-dashed border-ink-line py-28 text-center">
          <p className="font-display text-4xl tracking-tight text-bone md:text-6xl">
            YOUR BAG IS EMPTY.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-concrete">
            The avenue is full of finds — start exploring.
          </p>
          <div className="mt-8">
            <ButtonLink href="/shop" size="lg">
              EXPLORE THE SHOP
            </ButtonLink>
          </div>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Items */}
          <div>
            <h2 className="mb-6 flex items-baseline justify-between border-b border-ink-line pb-4">
              <span className="font-display text-3xl tracking-tight text-bone md:text-4xl">
                YOUR BAG
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-concrete">
                {items.length} ITEM{items.length > 1 ? "S" : ""}
              </span>
            </h2>
            <ul className="divide-y divide-ink-line">
              {items.map((item) => (
                <li key={item.key} className="flex gap-5 py-6">
                  <Link
                    href={`/product/${item.slug}`}
                    className="h-36 w-28 shrink-0 overflow-hidden bg-ink-line"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
                          {item.brand}
                        </p>
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-mono text-sm font-bold uppercase tracking-[0.1em] text-bone hover:text-lime"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
                          SIZE {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-concrete transition-colors hover:text-red-400"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border border-ink-line">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="flex h-9 w-9 items-center justify-center text-concrete hover:text-lime"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center font-mono text-sm font-bold text-bone">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="flex h-9 w-9 items-center justify-center text-concrete hover:text-lime"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-mono text-base font-bold text-lime">
                        {formatIDR((item.salePrice ?? item.price) * item.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <ButtonLink href="/shop" variant="ghost">
                ← CONTINUE SHOPPING
              </ButtonLink>
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit border border-ink-line bg-ink-soft p-6 lg:sticky lg:top-44">
            <h2 className="mb-5 font-display text-2xl tracking-tight text-bone">SUMMARY</h2>
            <dl className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <dt className="uppercase tracking-[0.14em] text-concrete">Subtotal</dt>
                <dd className="font-bold text-bone">{formatIDR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="uppercase tracking-[0.14em] text-concrete">Shipping</dt>
                <dd className="font-bold text-bone">
                  {shipping === 0 ? <span className="text-lime">FREE</span> : formatIDR(shipping)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="uppercase tracking-[0.14em] text-concrete">Discount</dt>
                <dd className="font-bold text-bone">{formatIDR(discount)}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-line pt-3 text-base">
                <dt className="font-bold uppercase tracking-[0.14em] text-bone">Total</dt>
                <dd className="font-bold text-lime">{formatIDR(total)}</dd>
              </div>
            </dl>
            <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-concrete/70">
              Demo shipping rules · free over Rp 750.000
            </p>
            <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
              CHECKOUT <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <div className="mt-4">
              <DemoBadge label={`${SITE.demoLabel} — SYNTHETIC PRICES`} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
