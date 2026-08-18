import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/data/collections";
import { PRODUCTS } from "@/data/products";
import { PageHeader } from "@/components/ui/Misc";
import { Reveal } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore the demo collections of the Digital Avenue — Essentials, Graphic Series, Outerwear, Footwear, Weekend and City Uniform.",
};

export default function CollectionsPage() {
  const countFor = (id: string) =>
    PRODUCTS.filter((p) => p.collectionId === id && p.status === "PUBLISHED").length;

  return (
    <>
      <PageHeader
        index="COLLECTIONS"
        label="THE AVENUE, ORGANIZED"
        title="PICK YOUR LANE."
        description="Six demo collections that give the catalog its shape. Each one is a different energy of the same street."
      />

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl space-y-16 md:space-y-24">
          {COLLECTIONS.map((c, i) => {
            const count = countFor(c.id);
            return (
              <Reveal key={c.id}>
                <article
                  id={c.slug}
                  className={
                    "group grid items-center gap-8 md:grid-cols-2 md:gap-14 " +
                    (i % 2 === 1 ? "md:[&>*:first-child]:order-2" : "")
                  }
                >
                  <Link
                    href={`/shop?collection=${c.id}`}
                    className="relative block overflow-hidden border border-ink-line"
                    aria-label={`Explore ${c.name}`}
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      width={1200}
                      height={900}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
                      {c.tagline}
                    </span>
                  </Link>

                  <div className="md:py-6">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-concrete">
                      {String(i + 1).padStart(2, "0")} / 0{COLLECTIONS.length}
                    </p>
                    <h2 className="mt-2 font-display text-4xl tracking-tight text-bone md:text-6xl">
                      {c.name}
                    </h2>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-concrete">
                      {c.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-6">
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone">
                        <span className="text-lime">{count}</span> PRODUCTS
                      </p>
                      <Link
                        href={`/shop?collection=${c.id}`}
                        className="group/link inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-bone transition-colors hover:text-lime"
                      >
                        EXPLORE
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-ink-line px-5 py-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/70">
            Demo collections — a suggested catalog structure, not an official brand
            directory.
          </p>
        </div>
      </section>
    </>
  );
}
