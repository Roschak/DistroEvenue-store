import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info } from "lucide-react";
import { JOURNAL, getArticleBySlug } from "@/data";
import { formatDate } from "@/lib/utils";
import { Reveal, ArrowLink } from "@/components/ui/Motion";
import { Tag } from "@/components/ui/Misc";

export const dynamicParams = true;

export function generateStaticParams() {
  return JOURNAL.filter((a) => a.status === "PUBLISHED").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — DISTRO AVENUE Journal`,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = JOURNAL.filter(
    (a) => a.slug !== slug && a.status === "PUBLISHED"
  ).slice(0, 2);

  return (
    <article className="pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-concrete transition-colors hover:text-lime"
        >
          <ArrowLeft className="h-4 w-4" /> ALL ARTICLES
        </Link>

        <header className="mt-8 max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <Tag tone="lime">{article.category}</Tag>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
              {formatDate(article.publishedAt)} · {article.readTime} READ
            </span>
          </div>
          <h1 className="font-display text-4xl leading-[0.98] tracking-tight text-bone md:text-7xl">
            {article.title}
          </h1>
        </header>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-5 md:px-10">
        <Image
          src={article.image}
          alt={article.title}
          width={1600}
          height={900}
          priority
          className="aspect-[16/7] w-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-5 py-14 md:px-0 md:py-20">
        {article.note && (
          <Reveal>
            <aside className="mb-10 flex items-start gap-3 border border-lime/25 bg-lime/5 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
              <p className="text-xs leading-relaxed text-concrete">
                <span className="font-bold uppercase tracking-[0.12em] text-lime">Editorial note: </span>
                {article.note}
              </p>
            </aside>
          </Reveal>
        )}

        <div className="space-y-6">
          {article.content.map((para, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
              <p className="text-lg leading-relaxed text-bone/85">{para}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border-t border-ink-line pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/70">
            Demo editorial content for portfolio demonstration.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-ink-line px-5 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-8 flex items-end justify-between">
                <h2 className="font-display text-3xl tracking-tight text-bone md:text-4xl">
                  KEEP READING.
                </h2>
                <ArrowLink href="/journal">ALL ARTICLES</ArrowLink>
              </div>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-2">
              {related.map((a) => (
                <Reveal key={a.id}>
                  <Link href={`/journal/${a.slug}`} className="group flex gap-4">
                    <Image
                      src={a.image}
                      alt={a.title}
                      width={400}
                      height={300}
                      className="h-32 w-40 shrink-0 object-cover transition-transform duration-500 group-hover:scale-105"
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
        </section>
      )}
    </article>
  );
}
