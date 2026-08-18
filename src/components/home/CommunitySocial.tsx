import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { Reveal } from "@/components/ui/Motion";
import { DemoBadge } from "@/components/ui/Misc";

const COMMUNITY = [
  { src: IMAGES.community1, alt: "Street photography — local style" },
  { src: IMAGES.community2, alt: "Street photography — local style" },
  { src: IMAGES.community3, alt: "Street photography — friends on the street" },
  { src: IMAGES.community4, alt: "Street photography — weekend rider culture" },
];

const SOCIAL = [
  { src: IMAGES.social1, handle: "@avenue.afterdark", likes: "1.2K" },
  { src: IMAGES.social2, handle: "@pakuan.walk", likes: "864" },
  { src: IMAGES.social3, handle: "@city.uniform", likes: "2.4K" },
  { src: IMAGES.social4, handle: "@weekend.ride", likes: "980" },
  { src: IMAGES.social5, handle: "@distro.days", likes: "1.7K" },
  { src: IMAGES.social6, handle: "@bogor.finds", likes: "640" },
];

export function Community() {
  return (
    <section className="border-b border-ink-line bg-ink py-20 md:py-28" aria-label="The avenue is people">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
            05 — COMMUNITY
          </p>
          <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
            THE AVENUE IS PEOPLE.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {COMMUNITY.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.08}>
              <div className="group relative overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/70">
          Demo imagery representing local culture — not real customer photos or testimonials.
        </p>
      </div>
    </section>
  );
}

export function SocialFeed() {
  return (
    <section className="border-b border-ink-line bg-ink py-20 md:py-28" aria-label="See what's happening">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                06 — SOCIAL
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
                SEE WHAT&apos;S HAPPENING.
              </h2>
            </div>
            <DemoBadge label="DEMO FEED" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {SOCIAL.map((post, i) => (
            <Reveal key={post.src} delay={Math.min(i * 0.06, 0.3)}>
              <div className="group relative overflow-hidden border border-ink-line">
                <Image
                  src={post.src}
                  alt={`Demo social post from ${post.handle}`}
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lime">
                    {post.handle}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone/80">
                    ♥ {post.likes} · DEMO POST
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-concrete/70">
          Simulated social content for demonstration — not real posts from Distro Avenue.
        </p>
      </div>
    </section>
  );
}
