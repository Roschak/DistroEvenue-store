"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { LOOKS, getProductsByLook } from "@/data";
import type { Look } from "@/types";
import { cn, formatIDR } from "@/lib/utils";
import { useBagStore } from "@/store/bag-store";
import { Button } from "@/components/ui/Button";
import { DemoBadge, Price } from "@/components/ui/Misc";
import { Reveal } from "@/components/ui/Motion";

const LAYOUTS: Record<Look["layout"], string> = {
  a: "md:grid-cols-12",
  b: "md:grid-cols-12",
  c: "md:grid-cols-12",
};

export function LookbookClient() {
  const [activeLook, setActiveLook] = useState<Look | null>(null);
  const addItem = useBagStore((s) => s.addItem);

  useEffect(() => {
    document.body.style.overflow = activeLook ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLook]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
      <div className="space-y-24 md:space-y-40">
        {LOOKS.map((look, i) => {
          const products = getProductsByLook(look.id);
          const flip = i % 2 === 1;
          return (
            <Reveal key={look.id}>
              <article className={LAYOUTS[look.layout]}>
                {/* Editorial title block */}
                <div
                  className={cn(
                    "mb-8 md:col-span-3 md:mb-0",
                    flip ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6"
                  )}
                >
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                    {look.subtitle}
                  </p>
                  <h2 className="mt-3 font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-7xl">
                    {look.title.split(" ").map((w, idx) => (
                      <span key={idx} className={cn("block", idx === 1 && "text-lime")}>
                        {w}
                      </span>
                    ))}
                  </h2>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
                    SHOT ON THE STREETS · {products.length} PIECES
                  </p>
                  <button
                    onClick={() => setActiveLook(look)}
                    className="group/look mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-bone transition-colors hover:text-lime"
                    aria-label={`Shop the look ${look.title}`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-ink transition-transform group-hover/look:rotate-6">
                      <ShoppingBag className="h-4 w-4" />
                    </span>
                    SHOP THE LOOK
                  </button>
                </div>

                {/* Asymmetric images */}
                <div
                  className={cn(
                    "grid grid-cols-2 gap-4 md:col-span-9 md:gap-5",
                    flip ? "md:order-1" : "md:order-2"
                  )}
                >
                  <div className="md:mt-16">
                    <Image
                      src={look.images.main}
                      alt={`${look.title} — main look`}
                      width={900}
                      height={1200}
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-4 md:gap-5">
                    <Image
                      src={look.images.secondary}
                      alt={`${look.title} — detail`}
                      width={900}
                      height={600}
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <Image
                      src={look.images.vertical}
                      alt={`${look.title} — vertical`}
                      width={900}
                      height={1200}
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Shop the look drawer */}
      <AnimatePresence>
        {activeLook && (
          <>
            <motion.button
              aria-label="Close look drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLook(null)}
              className="fixed inset-0 z-[64] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-[66] flex h-full w-full max-w-md flex-col border-l border-ink-line bg-ink"
              role="dialog"
              aria-modal="true"
              aria-label={`Shop the look ${activeLook.title}`}
            >
              <div className="border-b border-ink-line px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
                      {activeLook.subtitle}
                    </p>
                    <h2 className="font-display text-2xl tracking-tight text-bone">
                      {activeLook.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveLook(null)}
                    className="flex h-9 w-9 items-center justify-center text-concrete hover:text-lime"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="space-y-5">
                  {getProductsByLook(activeLook.id).map((p) => (
                    <li key={p.id} className="flex gap-4 border-b border-ink-line pb-5">
                      <Link href={`/product/${p.slug}`} onClick={() => setActiveLook(null)} className="h-28 w-22 shrink-0 overflow-hidden bg-ink-line">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-concrete">{p.brand}</p>
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={() => setActiveLook(null)}
                          className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-bone hover:text-lime"
                        >
                          {p.name}
                        </Link>
                        <div className="mt-1">
                          <Price price={p.price} salePrice={p.salePrice} />
                        </div>
                        <div className="mt-auto pt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              addItem({
                                productId: p.id,
                                slug: p.slug,
                                brand: p.brand,
                                name: p.name,
                                price: p.price,
                                salePrice: p.salePrice,
                                image: p.images[0],
                                size: p.sizes[0],
                              })
                            }
                          >
                            ADD TO BAG — {formatIDR(p.salePrice ?? p.price)}
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <DemoBadge label="DEMO LOOK PRODUCTS" />
                </div>
              </div>

              <div className="border-t border-ink-line px-6 py-5">
                <ButtonLinkHref onClick={() => setActiveLook(null)} href="/bag">
                  VIEW YOUR BAG
                </ButtonLinkHref>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ButtonLinkHref({ children, href, onClick }: { children: React.ReactNode; href: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick}>
      <Button className="w-full" size="lg">{children}</Button>
    </Link>
  );
}
