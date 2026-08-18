"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { useBagStore } from "@/store/bag-store";
import { useUiStore } from "@/store/ui-store";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge, Skeleton } from "@/components/ui/Misc";
import { useHydrated } from "@/hooks/use-hydrated";

export function BagDrawer() {
  const open = useUiStore((s) => s.bagOpen);
  const close = useUiStore((s) => s.closeBag);
  const items = useBagStore((s) => s.items);
  const updateQty = useBagStore((s) => s.updateQty);
  const removeItem = useBagStore((s) => s.removeItem);
  const subtotal = useBagStore((s) => s.subtotal());
  const mounted = useHydrated();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close bag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[66] flex h-full w-full max-w-md flex-col border-l border-ink-line bg-ink"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-ink-line px-6 py-5">
              <h2 className="font-display text-2xl tracking-tight text-bone">
                YOUR BAG <span className="text-lime">({mounted ? items.length : 0})</span>
              </h2>
              <button
                onClick={close}
                className="flex h-9 w-9 items-center justify-center text-concrete hover:text-lime"
                aria-label="Close bag"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!mounted ? (
              <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-display text-3xl tracking-tight text-bone">
                  YOUR BAG IS EMPTY.
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-concrete">
                  The avenue is full of finds — start exploring.
                </p>
                <ButtonLink href="/shop" onClick={close} variant="outline">
                  EXPLORE THE SHOP
                </ButtonLink>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="divide-y divide-ink-line">
                    {items.map((item) => (
                      <li key={item.key} className="flex gap-4 py-5">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={close}
                          className="h-24 w-20 shrink-0 overflow-hidden bg-ink-line"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
                                {item.brand}
                              </p>
                              <Link
                                href={`/product/${item.slug}`}
                                onClick={close}
                                className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-bone hover:text-lime"
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
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center border border-ink-line">
                              <button
                                onClick={() => updateQty(item.key, item.qty - 1)}
                                className="flex h-7 w-7 items-center justify-center text-concrete hover:text-lime"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-7 text-center font-mono text-xs font-bold text-bone">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.key, item.qty + 1)}
                                className="flex h-7 w-7 items-center justify-center text-concrete hover:text-lime"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="font-mono text-sm font-bold text-lime">
                              {formatIDR((item.salePrice ?? item.price) * item.qty)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-ink-line px-6 py-5">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-concrete">
                      Subtotal
                    </span>
                    <span className="font-mono text-lg font-bold text-bone">
                      {formatIDR(subtotal)}
                    </span>
                  </div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-concrete/70">
                    Shipping calculated at checkout · demo prices
                  </p>
                  <div className="mb-3">
                    <DemoBadge />
                  </div>
                  <div className="flex gap-3">
                    <ButtonLink href="/bag" onClick={close} variant="outline" className="flex-1">
                      VIEW BAG
                    </ButtonLink>
                    <ButtonLink href="/checkout" onClick={close} className="flex-1">
                      CHECKOUT
                    </ButtonLink>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
