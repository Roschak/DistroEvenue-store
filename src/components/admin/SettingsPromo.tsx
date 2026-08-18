"use client";

import { useState } from "react";
import { WEEKLY_HOURS } from "@/lib/store-hours";
import type { DayHours } from "@/lib/store-hours";
import { PROMOTIONS } from "@/data";
import { formatIDR } from "@/lib/utils";
import { Table, td } from "./AdminShell";
import { DemoBadge } from "@/components/ui/Misc";

export function SettingsPanel() {
  const [hours, setHours] = useState<DayHours[]>(WEEKLY_HOURS);

  const setTime = (day: string, field: "open" | "close", value: string) =>
    setHours(hours.map((h) => (h.day === day ? { ...h, [field]: value } : h)));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
          OPERATING HOURS · ASIA/JAKARTA
        </p>
        <DemoBadge label="DEMO CONFIG" />
      </div>
      <div className="max-w-lg divide-y divide-ink-line border border-ink-line">
        {hours.map((h) => (
          <div key={h.day} className="flex items-center justify-between gap-4 px-4 py-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone">
              {h.day}
            </span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <input
                type="time"
                value={h.open}
                onChange={(e) => setTime(h.day, "open", e.target.value)}
                className="border border-ink-line bg-ink px-2 py-1 text-bone focus:border-lime focus:outline-none"
                aria-label={`${h.day} opening time`}
              />
              <span className="text-concrete">–</span>
              <input
                type="time"
                value={h.close}
                onChange={(e) => setTime(h.day, "close", e.target.value)}
                className="border border-ink-line bg-ink px-2 py-1 text-bone focus:border-lime focus:outline-none"
                aria-label={`${h.day} closing time`}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-concrete/70">
        The storefront OPEN NOW status reads from these configured hours.
      </p>
    </div>
  );
}

export function PromotionsPanel() {
  const tone = {
    ACTIVE: "border-lime/40 bg-lime/10 text-lime",
    SCHEDULED: "border-amber-400/40 bg-amber-400/10 text-amber-400",
    ENDED: "border-bone/20 bg-bone/5 text-concrete",
  } as const;

  return (
    <div className="space-y-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
        DEMO PROMOTION CODES — not real offers
      </p>
      <Table head={["CODE", "NAME", "TYPE", "VALUE", "USES", "STATUS"]}>
        {PROMOTIONS.map((p) => (
          <tr key={p.id} className="transition-colors hover:bg-ink-line/50">
            <td className={td + " font-bold text-lime"}>{p.code}</td>
            <td className={td + " font-bold text-bone"}>{p.name}</td>
            <td className={td}>{p.type}</td>
            <td className={td}>{p.type === "PERCENT" ? `${p.value}%` : formatIDR(p.value)}</td>
            <td className={td}>{p.uses}</td>
            <td className={td}>
              <span className={"border px-2 py-0.5 text-[9px] font-bold " + tone[p.status]}>
                {p.status}
              </span>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
