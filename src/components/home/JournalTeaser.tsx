import Image from "next/image";
import Link from "next/link";
import { PUBLISHED_JOURNAL } from "@/data/journal";
import { formatDate } from "@/lib/utils";
import { Reveal, ArrowLink } from "@/components/ui/Motion";

export function JournalTeaser() {
  const [first, ...rest] = PUBLISHED_JOURNAL;
  return (
    <section className="border-b border-ink-line bg-ink py-20 md:py-28" aria-label="Avenue journal">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                08 — JOURNAL
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
                STORIES FROM THE STREET.
              </h2>
            </div>
            <ArrowLink href="/journal">ALL ARTICLES</ArrowLink>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <Link href={`/journal/${first.slug}`} className="group relative block overflow-hidden">
              <Image
                src={first.image}
                alt={first.title}
                width={1200}
                height={800}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
                  {first.category} · {formatDate(first.publishedAt)}
                </p>
                <h3 className="font-display text-3xl leading-tight tracking-tight text-bone transition-colors group-hover:text-lime md:text-4xl">
                  {first.title}
                </h3>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-6">
            {rest.slice(0, 2).map((a, i) => (
              <Reveal key={a.id} delay={0.1 + i * 0.1}>
                <Link href={`/journal/${a.slug}`} className="group flex gap-4 border-b border-ink-line pb-6">
                  <Image
                    src={a.image}
                    alt={a.title}
                    width={200}
                    height={200}
                    className="h-24 w-20 shrink-0 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div>
                    <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-concrete">
                      {a.category} · {a.readTime}
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
      </div>
    </section>
  );
}
