import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, ExternalLink } from "lucide-react";
import { STORE } from "@/data/site";
import { WEEKLY_HOURS } from "@/lib/store-hours";
import { Reveal, ArrowLink } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";
import { StoreStatusBadge } from "@/components/ui/Misc";

export function StorePreview() {
  return (
    <section className="border-b border-ink-line bg-ink py-20 md:py-28" aria-label="Visit the store">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
              07 — THE STORE
            </p>
            <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
              COME THROUGH.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-concrete">
              The physical store is the real destination. The website is just the digital
              street that leads you there.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <StoreStatusBadge />
                </div>
                <p className="flex items-start gap-2 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-bone/80">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                  <span>
                    {STORE.name} · {STORE.plusCode}
                    <br />
                    {STORE.addressLines.join(", ")}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {WEEKLY_HOURS.map((h) => (
                  <div key={h.day} className="border border-ink-line px-3 py-2.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-concrete">
                      {h.day}
                    </p>
                    <p className="mt-1 font-mono text-xs font-bold text-bone">
                      {h.open}–{h.close}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ButtonLink href={STORE.mapsLink} external size="md">
                  GET DIRECTIONS
                  <ExternalLink className="h-4 w-4" />
                </ButtonLink>
                <ArrowLink href="/store">FULL STORE PAGE</ArrowLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/store"
              className="group relative block overflow-hidden border border-ink-line"
              aria-label="Open store page"
            >
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
                alt="Clothing store interior — editorial atmosphere"
                width={1600}
                height={1200}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-bone">
                  FIND US IN BOGOR
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
