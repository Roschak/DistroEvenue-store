import { Reveal } from "@/components/ui/Motion";

export function BogorIdentity() {
  return (
    <section className="border-b border-ink-line bg-ink py-20 md:py-28" aria-label="Made for the city">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
                02 — THE CITY
              </p>
              <h2 className="font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
                MADE FOR
                <br />
                THE CITY.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-concrete md:text-lg">
                Bogor is the source. The rain, the rides, the blocks where the culture
                lives. Everything on the avenue starts with the streets of this city.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { name: "BOGOR", sub: "The city that raised the vibe" },
                  { name: "PAKUAN", sub: "The name on the streets" },
                  { name: "CIHEULEUT", sub: "Where the culture gathers" },
                  { name: "STREET CULTURE", sub: "The everyday runway" },
                ].map((item, i) => (
                  <Reveal as="li" key={item.name} delay={0.2 + i * 0.08}>
                    <div className="group flex items-baseline justify-between border-b border-ink-line pb-3">
                      <span className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-bone transition-colors group-hover:text-lime">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-concrete">
                        {item.sub}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Abstract map visual */}
          <Reveal delay={0.1} className="relative">
            <div className="relative overflow-hidden border border-ink-line bg-ink-soft">
              <svg
                viewBox="0 0 600 700"
                className="h-auto w-full"
                role="img"
                aria-label="Abstract map-inspired lines of Bogor"
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f1f1f" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="600" height="700" fill="url(#grid)" />

                {/* Streets */}
                {[
                  "M 20 520 C 140 480, 220 560, 340 500 S 520 420, 580 460",
                  "M 40 300 C 180 260, 260 340, 400 280 S 560 220, 580 240",
                  "M 120 20 L 160 300 S 200 500, 180 680",
                  "M 420 20 L 400 220 S 380 420, 440 680",
                  "M 20 140 L 580 160",
                  "M 60 620 C 220 600, 380 660, 560 620",
                ].map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={i % 2 === 0 ? "#3a3a3a" : "#2a2a2a"}
                    strokeWidth={i % 2 === 0 ? 2 : 1.2}
                  />
                ))}

                {/* Main avenue */}
                <path
                  d="M 120 700 C 200 500, 340 400, 480 240 S 560 60, 560 20"
                  fill="none"
                  stroke="#c8f135"
                  strokeWidth="3"
                  strokeDasharray="10 8"
                />
                <circle cx="120" cy="700" r="5" fill="#c8f135" />
                <circle cx="560" cy="20" r="5" fill="#c8f135" />

                {/* Place markers */}
                {[
                  { x: 300, y: 240, label: "PAKUAN", note: "THE AVENUE" },
                  { x: 180, y: 420, label: "BARANANGSIANG", note: "THE BLOCK" },
                  { x: 440, y: 130, label: "CIHEULEUT", note: "THE SCENE" },
                ].map((m, i) => (
                  <g key={i}>
                    <circle cx={m.x} cy={m.y} r="10" fill="none" stroke="#c8f135" strokeWidth="1.5" />
                    <circle cx={m.x} cy={m.y} r="3" fill="#c8f135" />
                    <text
                      x={m.x + 16}
                      y={m.y + 4}
                      fill="#f2f0ea"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="monospace"
                      letterSpacing="2"
                    >
                      {m.label}
                    </text>
                    <text
                      x={m.x + 16}
                      y={m.y + 18}
                      fill="#747474"
                      fontSize="9"
                      fontFamily="monospace"
                      letterSpacing="2"
                    >
                      {m.note}
                    </text>
                  </g>
                ))}

                {/* Compass */}
                <g transform="translate(520 600)">
                  <circle cx="0" cy="0" r="28" fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
                  <path d="M 0 -18 L 6 6 L 0 2 L -6 6 Z" fill="#c8f135" />
                  <text y="44" textAnchor="middle" fill="#747474" fontSize="10" fontFamily="monospace" letterSpacing="2">
                    N
                  </text>
                </g>
              </svg>
              <div className="absolute left-4 top-4 border border-bone/15 bg-ink/70 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-bone backdrop-blur">
                BOGOR · MAP CONCEPT
              </div>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-concrete/70">
              Stylized concept visual — not an official map or city branding.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
