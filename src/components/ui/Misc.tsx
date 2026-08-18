"use client";

import { useEffect, useState } from "react";
import { cn, formatIDR, stockStatus as stockOf } from "@/lib/utils";
import { getStoreStatus } from "@/lib/store-hours";
import { useHydrated } from "@/hooks/use-hydrated";

export function Tag({
  children,
  className,
  tone = "bone",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "bone" | "lime" | "red" | "outline";
}) {
  const tones = {
    bone: "bg-bone/10 text-bone",
    lime: "bg-lime text-ink",
    red: "bg-avenue-red/15 text-red-400",
    outline: "border border-bone/20 text-concrete",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  className,
}: {
  index?: string;
  label?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      {(index || label) && (
        <div className="mb-3 flex items-center gap-3">
          {index && (
            <span className="font-mono text-xs font-bold text-lime">{index}</span>
          )}
          {label && (
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-concrete">
              {label}
            </span>
          )}
          <span className="h-px flex-1 bg-ink-line" />
        </div>
      )}
      <h2 className="max-w-4xl font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
        {title}
      </h2>
    </div>
  );
}

export function PageHeader({
  index,
  label,
  title,
  description,
  children,
}: {
  index?: string;
  label?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-ink-line px-5 pt-32 pb-10 md:px-10 md:pt-44 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-3">
          {index && (
            <span className="font-mono text-xs font-bold text-lime">{index}</span>
          )}
          {label && (
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-concrete">
              {label}
            </span>
          )}
        </div>
        <h1 className="font-display text-6xl leading-[0.9] tracking-tight text-bone md:text-8xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-concrete md:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-ink-line",
        className
      )}
    />
  );
}

/** Dynamic store open/closed indicator computed in Asia/Jakarta. */
export function StoreStatusBadge({ compact }: { compact?: boolean }) {
  const mounted = useHydrated();

  if (!mounted) {
    return (
      <span
        className="inline-flex items-center gap-2 border border-bone/20 bg-bone/5 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-concrete"
        role="status"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-concrete" />
        CHECKING STATUS
      </span>
    );
  }

  return <StatusLive compact={compact} />;
}

/** Mounts only after hydration so server and client clocks never mismatch. */
function StatusLive({ compact }: { compact?: boolean }) {
  const [status, setStatus] = useState(() => getStoreStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getStoreStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]",
        status.open
          ? "border-lime/40 bg-lime/10 text-lime"
          : "border-bone/20 bg-bone/5 text-concrete"
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status.open ? "bg-lime animate-pulse-dot" : "bg-concrete"
        )}
      />
      <span>{status.label}</span>
      {!compact && (
        <span className="hidden text-[9px] text-concrete md:inline">
          · {status.message}
        </span>
      )}
    </span>
  );
}

/** Demo data badge — shown wherever synthetic data appears. */
export function DemoBadge({ label = "DEMO DATA" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-lime/30 bg-lime/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-lime">
      <span className="h-1 w-1 rounded-full bg-lime" />
      {label}
    </span>
  );
}

export function Price({
  price,
  salePrice,
  className,
}: {
  price: number;
  salePrice?: number | null;
  className?: string;
}) {
  return (
    <span className={cn("font-mono text-sm font-bold", className)}>
      {salePrice ? (
        <>
          <span className="text-lime">{formatIDR(salePrice)}</span>{" "}
          <span className="text-concrete line-through">{formatIDR(price)}</span>
        </>
      ) : (
        <span className="text-bone">{formatIDR(price)}</span>
      )}
    </span>
  );
}

export function StockLabel({ stock }: { stock: number }) {
  const s = stockOf(stock);
  const styles = {
    "IN STOCK": "text-lime",
    "LOW STOCK": "text-amber-400",
    "OUT OF STOCK": "text-red-400",
  };
  return (
    <span className={cn("font-mono text-[10px] font-bold tracking-[0.16em]", styles[s])}>
      {s}
    </span>
  );
}

