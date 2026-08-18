"use client";

import { formatIDR } from "@/lib/utils";
import { PRODUCTS, ORDERS, CUSTOMERS } from "@/data";
import { DemoBadge } from "@/components/ui/Misc";
import { Table, td } from "./AdminShell";

const REVENUE_BARS = [42, 58, 47, 71, 64, 88, 79, 96, 74, 91, 84, 100];

export function Dashboard() {
  const revenue = ORDERS.reduce((n, o) => n + o.total, 0);
  const lowStock = PRODUCTS.filter((p) => p.stock <= 5 && p.status === "PUBLISHED");
  const recent = ORDERS.slice(0, 5);

  const metrics = [
    { label: "REVENUE", value: formatIDR(revenue) },
    { label: "ORDERS", value: String(ORDERS.length) },
    { label: "PRODUCTS", value: String(PRODUCTS.length) },
    { label: "LOW STOCK", value: String(lowStock.length), warn: lowStock.length > 0 },
    { label: "CUSTOMERS", value: String(CUSTOMERS.length) },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {metrics.map((m) => (
          <div key={m.label} className="border border-ink-line bg-ink-soft p-5">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-concrete">
              {m.label}
            </p>
            <p className={"mt-2 font-display text-2xl tracking-tight " + (m.warn ? "text-red-400" : "text-bone")}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Revenue chart */}
        <div className="border border-ink-line bg-ink-soft p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-bone">
              REVENUE — LAST 12 WEEKS
            </h2>
            <DemoBadge />
          </div>
          <div className="flex h-44 items-end gap-1.5" role="img" aria-label="Demo revenue bar chart">
            {REVENUE_BARS.map((h, i) => (
              <div
                key={i}
                className="group relative flex-1 bg-ink-line transition-colors hover:bg-lime"
                style={{ height: `${h}%` }}
              >
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-lime px-1.5 py-0.5 font-mono text-[8px] font-bold text-ink opacity-0 transition-opacity group-hover:opacity-100">
                  {Math.round((h / 100) * revenue)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-concrete/70">
            Simulated trend — illustrative only
          </p>
        </div>

        {/* Low stock */}
        <div className="border border-ink-line bg-ink-soft p-6">
          <h2 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-bone">
            LOW STOCK ALERTS
          </h2>
          {lowStock.length === 0 ? (
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-concrete">
              ALL PRODUCTS HEALTHY.
            </p>
          ) : (
            <ul className="space-y-3">
              {lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-bone">
                    {p.name}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-red-400">
                    {p.stock} LEFT
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <h2 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-bone">
          RECENT ORDERS
        </h2>
        <Table head={["ORDER", "CUSTOMER", "CITY", "TOTAL", "STATUS"]}>
          {recent.map((o) => (
            <tr key={o.id} className="transition-colors hover:bg-ink-line/50">
              <td className={td + " font-bold text-lime"}>{o.id}</td>
              <td className={td}>{o.customer.name}</td>
              <td className={td}>{o.customer.city}</td>
              <td className={td}>{formatIDR(o.total)}</td>
              <td className={td}>
                <span className="border border-bone/20 bg-bone/5 px-2 py-0.5 text-[9px] font-bold text-bone">
                  {o.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
