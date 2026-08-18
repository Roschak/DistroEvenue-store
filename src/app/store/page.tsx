import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ExternalLink, Clock } from "lucide-react";
import { STORE } from "@/data/site";
import { WEEKLY_HOURS } from "@/lib/store-hours";
import { PageHeader } from "@/components/ui/Misc";
import { Reveal } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";
import { StoreStatusBadge } from "@/components/ui/Misc";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Find Distro Avenue Store in Bogor — Jl. Pakuan, Baranangsiang. Verified hours and directions.",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        index="STORE"
        label="THE PHYSICAL AVENUE"
        title="COME THROUGH."
        description="The website is the digital street. The store is the destination. Drop by — the block is waiting."
      >
        <div className="mt-8">
          <StoreStatusBadge />
        </div>
      </PageHeader>

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Info */}
            <div className="space-y-10">
              <Reveal>
                <div>
                  <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-concrete">
                    <MapPin className="h-4 w-4 text-lime" /> ADDRESS
                  </p>
                  <h2 className="font-display text-3xl tracking-tight text-bone md:text-5xl">
                    {STORE.name}
                  </h2>
                  <p className="mt-4 font-mono text-sm uppercase leading-loose tracking-[0.1em] text-bone/80">
                    {STORE.plusCode} · {STORE.addressLines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-concrete">
                    <Clock className="h-4 w-4 text-lime" /> OPERATING HOURS · WIB
                  </p>
                  <ul className="divide-y divide-ink-line border-y border-ink-line">
                    {WEEKLY_HOURS.map((h) => (
                      <li key={h.day} className="flex items-center justify-between py-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-bone/80">
                          {h.day}
                        </span>
                        <span className="font-mono text-xs font-bold text-bone">
                          {h.open} – {h.close}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="flex flex-wrap gap-4">
                  <ButtonLink href={STORE.mapsLink} external size="lg">
                    GET DIRECTIONS
                    <ExternalLink className="h-4 w-4" />
                  </ButtonLink>
                  <ButtonLink href="/shop" variant="outline" size="lg">
                    VISIT STORE ONLINE
                  </ButtonLink>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-concrete/70">
                  Verified public info only — no fabricated phone numbers, socials or
                  parking details.
                </p>
              </Reveal>
            </div>

            {/* Map */}
            <Reveal delay={0.1} className="min-h-[420px]">
              <div className="flex h-full flex-col border border-ink-line">
                <iframe
                  src={STORE.mapsEmbed}
                  title="Map of Distro Avenue Store, Jl. Pakuan, Bogor"
                  className="min-h-[380px] w-full flex-1 grayscale-[0.3] invert-[0.92] hue-rotate-180"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex items-center justify-between border-t border-ink-line px-4 py-3">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-bone">
                    FIND US IN BOGOR.
                  </p>
                  <Link
                    href={STORE.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lime hover:underline"
                  >
                    OPEN IN MAPS ↗
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
