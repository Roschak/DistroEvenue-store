import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PUBLISHED_JOURNAL } from "@/data/journal";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/ui/Misc";
import { Reveal } from "@/components/ui/Motion";
import { DemoBadge } from "@/components/ui/Misc";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Stories from the street — style, Bogor, culture, community and fashion writing from the Digital Avenue.",
};

const CATS = ["ALL", "STYLE", "BOGOR", "CULTURE", "COMMUNITY", "FASHION"] as const;

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = CATS.includes(category as (typeof CATS)[number])
    ? (category as (typeof CATS)[number])
    : "ALL";
  const articles =
    active === "ALL" ? PUBLISHED_JOURNAL : PUBLISHED_JOURNAL.filter((a) => a.category === active);

  const [featured, ...rest] = articles;

  return (
    <>
      <PageHeader
        index="JOURNAL"
        label="THE AVENUE PRESS"
        title="STORIES FROM THE STREET."
        description="Editorial writing on style, Bogor and the culture that moves the city. Facts are distinguished from creative portfolio copy in every article."
      >
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Journal categories">
          {CATS.map((c) => (
            <Link
              key={c}
              href={c === "ALL" ? "/journal" : `/journal?category=${c}`}
              className={cn(
                "border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
                active === c
                  ? "border-lime bg-lime text-ink"
                  : "border-ink-line text-concrete hover:border-lime hover:text-lime"
              )}
              aria-current={active === c ? "page" : undefined}
            >
              {c}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
              {articles.length} ARTICLE{articles.length === 1 ? "" : "S"} · {active}
            </p>
            <DemoBadge label="DEMO CONTENT" />
          </div>

          {articles.length === 0 && (
            <div className="border border-dashed border-ink-line py-24 text-center">
              <p className="font-display text-4xl tracking-tight text-bone">NOTHING HERE YET.</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-concrete">
                No articles in this category yet.
              </p>
            </div>
          )}

          {featured && (
            <Reveal>
              <Link
                href={`/journal/${featured.slug}`}
                className="group mb-14 block overflow-hidden border border-ink-line"
              >
                <div className="grid md:grid-cols-2">
                  <div className="overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      width={1200}
                      height={800}
                      className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-auto"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
                      FEATURED · {featured.category} · {formatDate(featured.publishedAt)}
                    </p>
                    <h2 className="font-display text-3xl leading-[1.02] tracking-tight text-bone transition-colors group-hover:text-lime md:text-5xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-concrete">{featured.excerpt}</p>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
                      {featured.readTime} READ
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.id} delay={Math.min(i * 0.07, 0.3)}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <div className="overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.title}
                      width={800}
                      height={600}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="border border-t-0 border-ink-line p-5">
                    <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-concrete">
                      {a.category} · {formatDate(a.publishedAt)} · {a.readTime}
                    </p>
                    <h3 className="font-mono text-sm font-bold uppercase leading-snug tracking-[0.08em] text-bone transition-colors group-hover:text-lime">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
