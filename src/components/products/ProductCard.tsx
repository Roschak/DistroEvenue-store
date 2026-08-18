"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus, Eye } from "lucide-react";
import type { Product } from "@/types";
import { cn, stockStatus } from "@/lib/utils";
import { useBagStore } from "@/store/bag-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUiStore } from "@/store/ui-store";
import { Price, StockLabel, Tag } from "@/components/ui/Misc";
import { useInventoryStore } from "@/store/inventory-store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useBagStore((s) => s.addItem);
  const wishlist = useWishlistStore((s) => s.ids);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const openQuickView = useUiStore((s) => s.openQuickView);
  const stock = useInventoryStore((s) => s.stock[product.id] ?? product.stock);

  const wished = wishlist.includes(product.id);
  const out = stock <= 0;
  const s = stockStatus(stock);

  const handleQuickAdd = () => {
    if (out) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      brand: product.brand,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0],
      size: product.sizes[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={`/product/${product.slug}`}
        className={cn(
          "relative block aspect-[4/5] overflow-hidden bg-ink-line",
          out && "opacity-60"
        )}
        aria-label={`${product.name} — ${product.brand}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-all duration-700 ease-out",
            hover && "scale-105"
          )}
        />
        {/* Image swap */}
        {product.images[1] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              hover ? "opacity-100" : "opacity-0"
            )}
          />
        )}
        {/* top badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.salePrice && <Tag tone="lime">SALE</Tag>}
          {out && <Tag tone="red">SOLD OUT</Tag>}
          {s === "LOW STOCK" && <Tag tone="outline">LOW STOCK</Tag>}
        </div>

        {/* hover actions */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleQuickAdd();
            }}
            disabled={out}
            className={cn(
              "flex h-10 flex-1 items-center justify-center gap-2 bg-bone font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors",
              out ? "cursor-not-allowed opacity-50" : "hover:bg-lime",
              added && "bg-lime"
            )}
            aria-label={`Quick add ${product.name}`}
          >
            <Plus className={cn("h-4 w-4 transition-transform", added && "rotate-45")} />
            {added ? "ADDED" : "QUICK ADD"}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="flex h-10 w-10 items-center justify-center bg-bone/90 text-ink transition-colors hover:bg-lime"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className={cn(
          "absolute right-3 top-3 flex h-9 w-9 items-center justify-center border transition-all",
          wished
            ? "border-lime bg-lime text-ink"
            : "border-bone/20 bg-ink/40 text-bone backdrop-blur hover:border-lime hover:text-lime"
        )}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={wished}
      >
        <Heart className={cn("h-4 w-4", wished && "fill-ink")} strokeWidth={1.8} />
      </button>

      {/* Meta */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
            {product.brand}
          </p>
          <h3 className="mt-0.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-bone transition-colors group-hover:text-lime">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <div className="text-right">
          <Price price={product.price} salePrice={product.salePrice} />
          <div className="mt-0.5">
            <StockLabel stock={stock} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
