import type { Metadata } from "next";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { PageHeader } from "@/components/ui/Misc";
import { Reveal, ArrowLink } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "The concept behind the Digital Avenue — an unofficial portfolio vision for Distro Avenue Store.",
};

const VALUES = [
  { n: "01", t: "STREET CULTURE", d: "Music, rides, art and the block — the culture comes first, the product follows." },
  { n: "02", t: "LOCAL FASHION", d: "Made for Bogor, worn by Bogor. A city uniform that starts on the streets." },
  { n: "03", t: "DISCOVERY", d: "Every visit should feel like walking a new street — something new around every corner." },
  { n: "04", t: "COMMUNITY", d: "The avenue is people. A store is a place to belong, not just to buy." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="ABOUT"
        label="THE CONCEPT"
        title="THE DIGITAL AVENUE."
        description="An unofficial portfolio concept: how a Bogor streetwear store could become a complete digital fashion destination."
      />

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal>
              <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                THE IDEA
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
                A PLACE WHERE PEOPLE DISCOVER THEIR STYLE.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-concrete md:text-lg">
                Most distro websites are catalogs. This concept turns the website into a
                digital street — an editorial experience that leads from discovery to
                exploration, shopping and, finally, to the physical store itself.
              </p>
              <p className="mt-4 text-base leading-relaxed text-concrete">
                It is a speculative, unofficial design study. It is not commissioned,
                approved or endorsed by Distro Avenue Store.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative">
                <Image
                  src={IMAGES.avenueIntroAlt}
                  alt="Editorial fashion store imagery"
                  width={1000}
                  height={750}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute -bottom-4 -left-4 border border-ink-line bg-ink p-4 md:-left-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime">
                    DISCOVER → EXPLORE → SHOP → VISIT → BELONG
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-ink-line px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-10 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
              WHAT THE AVENUE STANDS FOR
            </p>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.08}>
                <div className="border-t border-ink-line pt-5">
                  <p className="font-mono text-xs font-bold text-lime">{v.n}</p>
                  <h3 className="mt-3 font-display text-2xl tracking-tight text-bone">
                    {v.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-concrete">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-8 border border-ink-line p-8 md:p-12">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-concrete">
                  THE FULL STORY
                </p>
                <h2 className="mt-3 font-display text-3xl tracking-tight text-bone md:text-5xl">
                  HOW WOULD THIS CONCEPT COME TO LIFE?
                </h2>
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <ButtonLink href="/case-study" size="lg">
                  READ THE CASE STUDY
                </ButtonLink>
                <ArrowLink href="/store">VISIT THE STORE PAGE</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
