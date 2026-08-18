"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "span" | "li" | "article" | "header";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Infinite horizontal marquee — used for scrolling editorial typography. */
export function Marquee({
  items,
  className,
  slow,
}: {
  items: string[];
  className?: string;
  slow?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)} aria-hidden="true">
      <div
        className={cn(
          "inline-flex w-max animate-marquee will-change-transform",
          slow && "animate-marquee-slow"
        )}
      >
        {row.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="px-6 font-display text-[11vw] leading-none tracking-tight text-bone/90 md:text-[7vw]">
              {item}
            </span>
            <span className="text-[3vw] text-lime md:text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Editorial arrow link. */
export function ArrowLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-bone transition-colors hover:text-lime",
        className
      )}
    >
      <span className="underline decoration-bone/30 underline-offset-4 group-hover:decoration-lime">
        {children}
      </span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
