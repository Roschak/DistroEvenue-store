import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { NAV_LINKS, SITE, STORE } from "@/data/site";
import { WEEKLY_HOURS } from "@/lib/store-hours";

export function Footer() {
  return (
    <footer className="border-t border-ink-line bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Wordmark */}
          <div className="md:col-span-5">
            <p className="font-display text-5xl leading-none tracking-tight text-bone md:text-6xl">
              DISTRO
              <br />
              AVENUE<span className="text-lime">.</span>
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-concrete">
              {SITE.tagline}
            </p>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-concrete">
              An unofficial portfolio concept reimagining a Bogor streetwear store as a
              premium digital fashion destination.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <h3 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-concrete">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-bone/80 transition-colors hover:text-lime"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/bag"
                  className="text-sm text-bone/80 transition-colors hover:text-lime"
                >
                  BAG
                </Link>
              </li>
              <li>
                <Link
                  href="/case-study"
                  className="text-sm text-bone/80 transition-colors hover:text-lime"
                >
                  CASE STUDY
                </Link>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="md:col-span-3">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-concrete">
              <MapPin className="h-3.5 w-3.5 text-lime" /> Store
            </h3>
            <address className="text-sm not-italic leading-relaxed text-bone/80">
              {STORE.name}
              <br />
              {STORE.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <Link
              href={STORE.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-lime hover:underline"
            >
              OPEN IN MAPS ↗
            </Link>
          </div>

          {/* Hours */}
          <div className="md:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-concrete">
              <Clock className="h-3.5 w-3.5 text-lime" /> Hours
            </h3>
            <ul className="space-y-2">
              {WEEKLY_HOURS.map((h) => (
                <li
                  key={h.day}
                  className="flex items-baseline justify-between gap-3 font-mono text-[11px]"
                >
                  <span className="text-bone/70">{h.day}</span>
                  <span className="text-bone">
                    {h.open}–{h.close}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-concrete/70">
              WIB · {STORE.timezone}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-ink-line pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-concrete/70">
            {SITE.demoLabel} — Unofficial portfolio concept created for design and product
            demonstration purposes. Not affiliated with or endorsed by Distro Avenue
            Store. Product prices, availability and content are synthetic demo data.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-[11px] text-concrete/60 md:flex-row md:items-center md:justify-between">
            <p className="font-mono uppercase tracking-[0.18em]">
              © 2026 Distro Avenue Concept · Bogor, Indonesia
            </p>
            <p className="font-mono uppercase tracking-[0.18em]">
              MADE WITH THE STREETS IN MIND
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
