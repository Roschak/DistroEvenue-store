"use client";

import { formatDate, formatIDR } from "@/lib/utils";
import { CUSTOMERS } from "@/data";
import { Table, td } from "./AdminShell";

export function CustomersPanel() {
  return (
    <div className="space-y-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
        {CUSTOMERS.length} DEMO CUSTOMERS
      </p>
      <Table head={["CUSTOMER", "EMAIL", "CITY", "ORDERS", "TOTAL SPENT", "JOINED"]}>
        {CUSTOMERS.map((c) => (
          <tr key={c.id} className="transition-colors hover:bg-ink-line/50">
            <td className={td + " font-bold text-bone"}>{c.name}</td>
            <td className={td + " text-concrete"}>{c.email}</td>
            <td className={td}>{c.city}</td>
            <td className={td}>{c.orders}</td>
            <td className={td + " font-bold text-lime"}>{formatIDR(c.totalSpent)}</td>
            <td className={td}>{formatDate(c.joinedAt)}</td>
          </tr>
        ))}
      </Table>
      <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-concrete/70">
        Simulated customer records — no real personal data.
      </p>
    </div>
  );
}
