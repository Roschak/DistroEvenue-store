"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  Boxes,
  ShoppingCart,
  Users,
  Images,
  BookOpen,
  Settings,
  Megaphone,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/data/site";
import { DemoBadge } from "@/components/ui/Misc";
import type { ReactNode } from "react";

const MODULES = [
  { label: "DASHBOARD", href: "/admin", icon: LayoutDashboard },
  { label: "PRODUCTS", href: "/admin/products", icon: Shirt },
  { label: "INVENTORY", href: "/admin/inventory", icon: Boxes },
  { label: "ORDERS", href: "/admin/orders", icon: ShoppingCart },
  { label: "CUSTOMERS", href: "/admin/customers", icon: Users },
  { label: "COLLECTIONS", href: "/admin/collections", icon: Images },
  { label: "LOOKBOOK", href: "/admin/lookbook", icon: BookOpen },
  { label: "JOURNAL", href: "/admin/journal", icon: BookOpen },
  { label: "STORE SETTINGS", href: "/admin/settings", icon: Settings },
  { label: "PROMOTIONS", href: "/admin/promotions", icon: Megaphone },
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex h-full flex-col" aria-label="Admin modules">
      <div className="border-b border-ink-line p-5">
        <Link href="/admin" className="font-display text-xl tracking-[0.08em] text-bone">
          AVENUE<span className="text-lime"> CMS</span>
        </Link>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-concrete">
          PORTFOLIO ADMIN
        </p>
      </div>
      <ul className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {MODULES.map((m) => {
          const Icon = m.icon;
          const active = pathname === m.href;
          return (
            <li key={m.href}>
              <Link
                href={m.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
                  active
                    ? "bg-lime text-ink"
                    : "text-concrete hover:bg-ink-line hover:text-bone"
                )}
              >
                <Icon className="h-4 w-4" />
                {m.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-ink-line p-4">
        <DemoBadge label={SITE.demoLabel} />
        <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-concrete/70">
          Simulated data — not real business activity.
        </p>
      </div>
    </nav>
  );

  return (
    <div className="pt-24 md:pt-28">
      {/* Demo disclaimer bar */}
      <div className="border-b border-lime/25 bg-lime/5 px-5 py-2.5 md:px-10">
        <p className="mx-auto flex max-w-7xl items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-lime">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          All analytics shown are simulated portfolio data.
        </p>
      </div>

      {/* Mobile toggle */}
      <div className="flex items-center justify-between border-b border-ink-line px-5 py-3 md:hidden">
        <h1 className="font-display text-xl tracking-tight text-bone">{title}</h1>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-bone hover:text-lime"
          aria-label={open ? "Close admin menu" : "Open admin menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-5 py-8 md:px-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-ink-line md:block">{nav}</aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-x-0 bottom-0 top-24 z-40 border-t border-ink-line bg-ink md:hidden">
            {nav}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="mb-6 hidden font-display text-3xl tracking-tight text-bone md:block">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Small reusable table wrapper. */
export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto border border-ink-line">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="border-b border-ink-line bg-ink-soft text-left">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-concrete"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-line">{children}</tbody>
      </table>
    </div>
  );
}

export const td = "px-4 py-3 font-mono text-[11px]";
