"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, ChevronDown, Heart, Truck, Ruler, Package } from "lucide-react";
import type { Product } from "@/types";
import { cn, formatIDR } from "@/lib/utils";
import { useBagStore } from "@/store/bag-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Button } from "@/components/ui/Button";
import { DemoBadge, StockLabel, Tag } from "@/components/ui/Misc";
import { useInventoryStore } from "@/store/inventory-store";

export function ProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const [imageIdx, setImageIdx] = useState(0);
  const [size, setSize] = useState<string>(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<string | null>("DETAILS");
  const [added, setAdded] = useState(false);
  const addItem = useBagStore((s) => s.addItem);
  const wished = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const stock = useInventoryStore((s) => s.stock[product.id] ?? product.stock);

  const out = stock <= 0;

  const handleAdd = (goCheckout?: boolean) => {
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
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    if (goCheckout) router.push("/checkout");
  };

  const accordions = [
    {
      id: "SIZE GUIDE",
      icon: Ruler,
      body: (
        <p className="text-sm leading-relaxed text-concrete">
          Demo size chart: S = 36–38″ chest, M = 38–40″, L = 40–43″, XL = 43–46″,
          XXL = 46–49″. Footwear runs in EU sizing. When in doubt, size up — the
          avenue standard is a relaxed fit.
        </p>
      ),
    },
    {
      id: "DETAILS",
      icon: Package,
      body: (
        <ul className="space-y-2 text-sm leading-relaxed text-concrete">
          <li>• {product.description}</li>
          <li>• SKU: {product.sku}</li>
          <li>• Category: {product.category}</li>
          <li>• Colors: {product.colors.map((c) => c.name).join(", ")}</li>
          <li>• Fabric & care: heavyweight cotton / machine wash cold (demo info)</li>
        </ul>
      ),
    },
    {
      id: "SHIPPING",
      icon: Truck,
      body: (
        <p className="text-sm leading-relaxed text-concrete">
          Demo shipping: Jakarta & Bogor 1–2 days (Rp 25.000), Java 2–3 days
          (Rp 30.000), outside Java 3–7 days (Rp 45.000). Free shipping over
          Rp 750.000. Rates are simulated demo data.
        </p>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-32 md:px-10">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden border border-ink-line bg-ink-line">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIdx}
                src={product.images[imageIdx]}
                alt={`${product.name} — image ${imageIdx + 1}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
              {product.salePrice && <Tag tone="lime">SALE</Tag>}
              {out && <Tag tone="red">SOLD OUT</Tag>}
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wished}
              className={cn(
                "absolute right-3 top-3 flex h-10 w-10 items-center justify-center border transition-colors",
                wished
                  ? "border-lime bg-lime text-ink"
                  : "border-bone/20 bg-ink/50 text-bone backdrop-blur hover:border-lime hover:text-lime"
              )}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-ink")} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImageIdx(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "h-20 w-16 overflow-hidden border transition-colors",
                  imageIdx === i ? "border-lime" : "border-ink-line hover:border-bone/40"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="md:py-4">
          <nav aria-label="Breadcrumb" className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
            <Link href="/shop" className="hover:text-lime">SHOP</Link>
            {" / "}
            <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-lime">
              {product.category}
            </Link>
            {" / "}
            <span className="text-bone/60">{product.name}</span>
          </nav>

          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-concrete">
            {product.brand}
          </p>
          <h1 className="mt-1 font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center gap-4">
            <p className="font-mono text-2xl font-bold text-bone">
              {formatIDR(product.salePrice ?? product.price)}
              {product.salePrice && (
                <span className="ml-3 text-base text-concrete line-through">
                  {formatIDR(product.price)}
                </span>
              )}
            </p>
            <StockLabel stock={stock} />
          </div>

          <p className="mt-5 text-base leading-relaxed text-concrete">{product.description}</p>

          {/* Color */}
          <div className="mt-7">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-concrete">
              COLOR — <span className="text-bone">{color}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={`Color ${c.name}`}
                  aria-pressed={color === c.name}
                  className={cn(
                    "flex items-center gap-2 border px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors",
                    color === c.name
                      ? "border-lime text-lime"
                      : "border-ink-line text-bone hover:border-bone/40"
                  )}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-bone/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-concrete">
                SIZE — <span className="text-bone">{size}</span>
              </p>
              <button
                onClick={() => setOpenAcc("SIZE GUIDE")}
                className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lime hover:underline"
              >
                SIZE GUIDE
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSize(sz)}
                  aria-pressed={size === sz}
                  className={cn(
                    "h-11 min-w-12 border px-3 font-mono text-xs font-bold transition-colors",
                    size === sz
                      ? "border-lime bg-lime text-ink"
                      : "border-ink-line text-bone hover:border-bone/50"
                  )}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + CTA */}
          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center border border-ink-line">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-13 w-11 items-center justify-center text-concrete hover:text-lime"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-mono text-sm font-bold text-bone">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-13 w-11 items-center justify-center text-concrete hover:text-lime"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              onClick={() => handleAdd(false)}
              disabled={out}
              size="lg"
              className="min-w-44 flex-1 md:flex-none"
            >
              {out ? "SOLD OUT" : added ? "ADDED TO BAG ✓" : (
                <>
                  <Plus className="h-4 w-4" /> ADD TO BAG
                </>
              )}
            </Button>
            <Button
              onClick={() => handleAdd(true)}
              disabled={out}
              variant="outline"
              size="lg"
            >
              BUY NOW
            </Button>
          </div>

          <div className="mt-4">
            <DemoBadge label="DEMO PRICE — SYNTHETIC" />
          </div>

          {/* Accordions */}
          <div className="mt-8 divide-y divide-ink-line border-y border-ink-line">
            {accordions.map((acc) => {
              const Icon = acc.icon;
              const open = openAcc === acc.id;
              return (
                <div key={acc.id}>
                  <button
                    onClick={() => setOpenAcc(open ? null : acc.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-bone transition-colors hover:text-lime"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-concrete" />
                      {acc.id}
                    </span>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5">{acc.body}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-ink/95 p-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-bone">
              {product.name} · {size}
            </p>
            <p className="font-mono text-sm font-bold text-lime">
              {formatIDR((product.salePrice ?? product.price) * qty)}
            </p>
          </div>
          <Button onClick={() => handleAdd(false)} disabled={out} className="flex-1">
            {out ? "SOLD OUT" : added ? "ADDED ✓" : "ADD TO BAG"}
          </Button>
        </div>
      </div>
    </div>
  );
}
