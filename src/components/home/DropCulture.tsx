"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { DEMO_DROP } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/Misc";
import { useHydrated } from "@/hooks/use-hydrated";

function getTarget(): Date {
  const d = new Date();
  d.setDate(d.getDate() + DEMO_DROP.daysOut);
  d.setHours(19, 0, 0, 0);
  return d;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(target: Date): TimeLeft {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function DropCulture() {
  const mounted = useHydrated();

  return (
    <section className="relative overflow-hidden border-b border-ink-line" aria-label="The Drop">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMAGES.dropBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-3 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-lime">
            <span className="h-px w-10 bg-lime" /> THE DROP
          </p>
          <p className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-bone/80">
            {DEMO_DROP.code} · {DEMO_DROP.label}
          </p>
          <h2 className="mt-2 font-display text-5xl leading-[0.9] tracking-tight text-bone md:text-8xl">
            AVENUE
            <br />
            AFTER DARK
          </h2>
        </motion.div>

        {/* Countdown — client-only after hydration to avoid time-based mismatch */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-2 gap-px border border-ink-line bg-ink-line sm:grid-cols-4 md:mt-16 md:max-w-2xl"
        >
          {mounted ? (
            <CountdownPanel />
          ) : (
            <>
              {["DAYS", "HOURS", "MIN", "SEC"].map((label) => (
                <div key={label} className="bg-ink px-4 py-6 text-center md:py-8">
                  <p className="font-display text-4xl tracking-tight text-bone/40 md:text-6xl">--</p>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-concrete">
                    {label}
                  </p>
                </div>
              ))}
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <ButtonLink href="/shop" size="lg">
            SHOP THE CURRENT ROTATION
          </ButtonLink>
          <DemoBadge label="DEMO COUNTDOWN — NOT A REAL DROP" />
        </motion.div>
      </div>
    </section>
  );
}

/** Mounts only after hydration — safe to compute from the client clock. */
function CountdownPanel() {
  const [target] = useState(getTarget);
  const [time, setTime] = useState<TimeLeft>(() => diff(target));
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <>
      {[
        { label: "DAYS", value: pad(time.days) },
        { label: "HOURS", value: pad(time.hours) },
        { label: "MIN", value: pad(time.minutes) },
        { label: "SEC", value: pad(time.seconds) },
      ].map((unit) => (
        <div key={unit.label} className="bg-ink px-4 py-6 text-center md:py-8">
          <motion.p
            key={unit.value}
            initial={reduce ? false : { opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="font-display text-4xl tracking-tight text-bone md:text-6xl"
          >
            {unit.value}
          </motion.p>
          <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-concrete">
            {unit.label}
          </p>
        </div>
      ))}
    </>
  );
}
