import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Misc";
import { Reveal } from "@/components/ui/Motion";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Case Study",
  description:
    "How might a Bogor streetwear destination translate its physical energy into a digital experience?",
};

const SECTIONS: { n: string; t: string; body: string[] }[] = [
  {
    n: "01",
    t: "THE PROBLEM",
    body: [
      "Traditional distro websites focus heavily on product lists, basic catalogs and contact information. The rich culture around the store — the street energy, the community, the local identity — rarely makes it into the digital experience.",
      "The result is a website that sells clothes but says nothing about why the store matters.",
    ],
  },
  {
    n: "02",
    t: "THE RESEARCH",
    body: [
      "This concept was built from publicly observable context: Distro Avenue Store is located at Jl. Pakuan, Baranangsiang, Bogor Timur, with verified operating hours published across the week.",
      "No phone numbers, emails, social accounts, prices or testimonials are fabricated — everything unverified is clearly marked as demo data.",
    ],
  },
  {
    n: "03",
    t: "THE OPPORTUNITY",
    body: [
      "Distro culture in Indonesia has always been community-first. A website that treats its audience like a scene — not a checkout funnel — can turn an online store into a destination in its own right.",
      "The opportunity: make the digital experience a street that leads people back to the physical store.",
    ],
  },
  {
    n: "04",
    t: "THE BRAND DIRECTION",
    body: [
      "Positioning: streetwear from the heart of Bogor. A visual identity of near-black, warm off-white, concrete gray and a controlled electric-lime accent.",
      "Typography does the heavy lifting — condensed editorial display type, a modern grotesk for body, monospace for metadata. The interface should feel like a fashion campaign, not a template.",
    ],
  },
  {
    n: "05",
    t: "THE EXPERIENCE",
    body: [
      "The Digital Avenue: users discover (hero), explore (categories and looks), shop (catalog), visit (store page) and belong (community and journal).",
      "Editorial lookbook layouts, drop culture with labeled demo countdowns, a dynamic store status computed in Asia/Jakarta, and page transitions that feel like moving through a district.",
    ],
  },
  {
    n: "06",
    t: "THE COMMERCE SYSTEM",
    body: [
      "A full demo commerce loop: bag, three-step checkout (contact, delivery, payment) with mock payment methods, order history and an account area.",
      "All prices and availability are synthetic and labeled as demo. No real payment credentials or customer data exist anywhere in the system.",
    ],
  },
  {
    n: "07",
    t: "THE TECHNICAL ARCHITECTURE",
    body: [
      "Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion and Zustand. Mock JSON data behind a backend-ready abstraction, with a portfolio-only CMS (admin) for products, inventory, orders and content.",
      "SEO metadata, structured data built only from verified public information, responsive breakpoints from 390px to 1440px+, and WCAG-oriented accessibility.",
    ],
  },
  {
    n: "08",
    t: "THE RESULT",
    body: [
      "A complete, build-ready concept: 12+ routes, a working bag and checkout flow, dynamic store hours, editorial lookbook and journal, and a demo admin dashboard — all passing lint, typecheck and production build gates.",
      "Every synthetic metric is labeled. The concept is presentable to the business owner as an unsolicited professional idea.",
    ],
  },
  {
    n: "09",
    t: "FUTURE ROADMAP",
    body: [
      "Connect to a real backend (NestJS or ASP.NET Core) with PostgreSQL via Prisma or Entity Framework. Replace demo data with owner-verified product information, imagery and pricing.",
      "Integrate real payment providers, inventory syncing, and a production analytics setup. Add an official social presence only with verified accounts.",
    ],
  },
];

export default function CaseStudyPage() {
  return (
    <>
      <PageHeader
        index="CASE STUDY"
        label="PROJECT-AVENUE · V1.0.0"
        title="THE DIGITAL AVENUE."
        description="How might a Bogor streetwear destination translate its physical energy into a digital experience?"
      />

      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl space-y-20">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.n}>
              <section className="grid gap-6 md:grid-cols-[120px_1fr] md:gap-10">
                <div>
                  <p className="font-display text-6xl text-lime/40 md:text-7xl">{s.n}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-concrete">
                    {i === 0 ? "START" : `STEP ${String(i + 1).padStart(2, "0")}`}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-3xl tracking-tight text-bone md:text-5xl">
                    {s.t}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed text-concrete md:text-lg">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal>
            <div className="flex flex-col gap-4 border-t border-ink-line pt-12 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-concrete">
                  SEE THE CONCEPT IN ACTION
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight text-bone">
                  WALK THE AVENUE YOURSELF.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/" size="lg">HOMEPAGE</ButtonLink>
                <ButtonLink href="/shop" variant="outline" size="lg">THE SHOP</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
