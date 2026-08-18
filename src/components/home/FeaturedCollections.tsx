"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_SHOTS } from "@/lib/images";
import { Reveal } from "@/components/ui/Motion";

const CATS = [
  { label: "T-SHIRTS", slug: "t-shirts" },
  { label: "HOODIES", slug: "hoodies" },
  { label: "JACKETS", slug: "jackets" },
  { label: "PANTS", slug: "pants" },
  { label: "FOOTWEAR", slug: "footwear" },
  { label: "ACCESSORIES", slug: "accessories" },
];

export function FeaturedCollections() {
  return (
    <section className="border-b border-ink-line bg-ink py-20 md:py-28" aria-label="What's moving now">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                03 — CATEGORIES
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
                WHAT&apos;S MOVING NOW.
              </h2>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-concrete transition-colors hover:text-lime"
            >
              EXPLORE ALL
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {CATS.map((cat, i) => (
            <Reveal key={cat.slug} delay={Math.min(i * 0.07, 0.35)}>
              <CollectionTile label={cat.label} image={PRODUCT_SHOTS[cat.slug][0]} href={`/shop?category=${cat.slug}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionTile({ label, image, href }: { label: string; image: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ax = useSpring(mx, { stiffness: 120, damping: 18 });
  const ay = useSpring(my, { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - 18);
    my.set(e.clientY - r.top - 18);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      className="group relative block aspect-[3/4] overflow-hidden bg-ink-line"
      aria-label={`Shop ${label}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-concrete">
          SHOP
        </span>
        <h3 className="font-display text-2xl tracking-tight text-bone transition-transform duration-500 group-hover:-translate-y-1 md:text-4xl">
          {label}
        </h3>
      </div>

      {/* Cursor arrow */}
      <motion.span
        style={{ x: ax, y: ay }}
        className="pointer-events-none absolute left-0 top-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-lime text-ink"
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.6 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
    </Link>
  );
}
