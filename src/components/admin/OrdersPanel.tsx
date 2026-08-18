"use client";

import { useState } from "react";
import { formatDate, formatIDR } from "@/lib/utils";
import { ORDERS } from "@/data";
import type { Order, OrderStatus } from "@/types";
import { Table, td } from "./AdminShell";

const STATUSES: OrderStatus[] = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"];

export function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);

  const setStatus = (id: string, status: OrderStatus) =>
    setOrders(orders.map((o) => (o.id === id ? { ...o, orderStatus: status } : o)));

  return (
    <div className="space-y-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
        {orders.length} ORDERS · {orders.filter((o) => o.orderStatus === "PENDING").length} PENDING
      </p>
      <Table head={["ORDER", "CUSTOMER", "DATE", "ITEMS", "TOTAL", "STATUS"]}>
        {orders.map((o) => (
          <tr key={o.id} className="transition-colors hover:bg-ink-line/50">
            <td className={td + " font-bold text-lime"}>{o.id}</td>
            <td className={td}>
              <span className="text-bone">{o.customer.name}</span>
              <span className="block text-[9px] text-concrete">{o.customer.city}</span>
            </td>
            <td className={td}>{formatDate(o.createdAt)}</td>
            <td className={td}>{o.items.reduce((n, i) => n + i.qty, 0)} ITEM(S)</td>
            <td className={td + " font-bold text-bone"}>{formatIDR(o.total)}</td>
            <td className={td}>
              <select
                value={o.orderStatus}
                onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)}
                className="border border-ink-line bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-bone focus:border-lime focus:outline-none"
                aria-label={`Status of order ${o.id}`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </Table>
      <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-concrete/70">
        Status updates are demo-only and reset on reload.
      </p>
    </div>
  );
}
