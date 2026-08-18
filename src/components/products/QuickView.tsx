"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import type { Product } from "@/types";
import { cn, formatIDR } from "@/lib/utils";
import { useBagStore } from "@/store/bag-store";
import { useUiStore } from "@/store/ui-store";
import { Button } from "@/components/ui/Button";
import { DemoBadge, StockLabel } from "@/components/ui/Misc";

export function QuickView() {
  const product = useUiStore((s) => s.quickView);
  const close = useUiStore((s) => s.closeQuickView);

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[68] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view ${product.name}`}
        >
          <motion.div
            initial={{ scale: 0.94, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-ink-line bg-ink md:grid-cols-2"
          >
            <QuickViewInner product={product} onClose={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Keyed inner component — remounts per product so selection state resets. */
function QuickViewInner({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [added, setAdded] = useState(false);
  const addItem = useBagStore((s) => s.addItem);

  const out = product.stock <= 0;

  const handleAdd = () => {
    if (out) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      brand: product.brand,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      size,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <>
      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-ink/80 text-bone backdrop-blur hover:text-lime"
        aria-label="Close quick view"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative aspect-[4/5] md:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
          {product.brand}
        </p>
        <h2 className="mt-1 font-display text-3xl tracking-tight text-bone">
          {product.name}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-concrete line-clamp-3">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <p className="font-mono text-xl font-bold text-bone">
            {formatIDR(product.salePrice ?? product.price)}
            {product.salePrice && (
              <span className="ml-2 text-sm text-concrete line-through">
                {formatIDR(product.price)}
              </span>
            )}
          </p>
          <StockLabel stock={product.stock} />
        </div>

        <div className="mt-6">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-concrete">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "h-9 min-w-11 border px-2 font-mono text-xs font-bold transition-colors",
                  size === s
                    ? "border-lime bg-lime text-ink"
                    : "border-ink-line text-bone hover:border-bone/50"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <Button onClick={handleAdd} disabled={out} className="w-full" size="lg">
            <Plus className="h-4 w-4" />
            {out ? "SOLD OUT" : added ? "ADDED TO BAG ✓" : "ADD TO BAG"}
          </Button>
          <div className="mt-4 flex items-center justify-between">
            <DemoBadge />
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-concrete hover:text-lime"
            >
              VIEW FULL DETAILS →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
