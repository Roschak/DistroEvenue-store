import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { Reveal, Marquee, ArrowLink } from "@/components/ui/Motion";

export function AvenueIntro() {
  return (
    <section className="border-b border-ink-line bg-ink py-20 md:py-28" aria-label="Introduction">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <div className="relative overflow-hidden">
              <Image
                src={IMAGES.avenueIntro}
                alt="A distro clothing rack — editorial store atmosphere"
                width={1400}
                height={1050}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute bottom-4 left-4 border border-bone/15 bg-ink/70 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-bone backdrop-blur">
                THE DIGITAL AVENUE — CONCEPT
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-2">
            <Reveal delay={0.1}>
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                01 — THE IDEA
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
                THIS IS MORE THAN A STORE.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-concrete md:text-lg">
                An intersection of fashion, identity and the streets of Bogor. Not just a
                catalog — a place where people discover their style.
              </p>
              <p className="mt-4 text-base leading-relaxed text-concrete">
                Walk the avenue: discover, explore, shop, visit, belong.
              </p>
              <div className="mt-8">
                <ArrowLink href="/case-study">READ THE CASE STUDY</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling typography */}
      <div className="mt-20 border-y border-ink-line py-6 md:mt-28">
        <Marquee items={["STYLE", "CULTURE", "BOGOR", "STREET", "IDENTITY"]} />
      </div>
    </section>
  );
}
