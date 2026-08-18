"use client";

import { formatDate } from "@/lib/utils";
import { COLLECTIONS } from "@/data/collections";
import { LOOKS } from "@/data/looks";
import { JOURNAL } from "@/data/journal";
import { Table, td } from "./AdminShell";

export function CollectionsPanel() {
  return (
    <Table head={["COLLECTION", "SLUG", "PRODUCTS", "TAGLINE"]}>
      {COLLECTIONS.map((c) => (
        <tr key={c.id} className="transition-colors hover:bg-ink-line/50">
          <td className={td + " font-bold text-bone"}>{c.name}</td>
          <td className={td + " text-concrete"}>{c.slug}</td>
          <td className={td}>{c.productCount}</td>
          <td className={td}>{c.tagline}</td>
        </tr>
      ))}
    </Table>
  );
}

export function LookbookPanel() {
  return (
    <Table head={["LOOK", "SUBTITLE", "PRODUCTS", "LAYOUT"]}>
      {LOOKS.map((l) => (
        <tr key={l.id} className="transition-colors hover:bg-ink-line/50">
          <td className={td + " font-bold text-bone"}>{l.title}</td>
          <td className={td + " text-concrete"}>{l.subtitle}</td>
          <td className={td}>{l.productIds.length}</td>
          <td className={td}>{l.layout.toUpperCase()}</td>
        </tr>
      ))}
    </Table>
  );
}

export function JournalPanel() {
  return (
    <Table head={["TITLE", "CATEGORY", "DATE", "READ TIME", "STATUS"]}>
      {JOURNAL.map((a) => (
        <tr key={a.id} className="transition-colors hover:bg-ink-line/50">
          <td className={td + " font-bold text-bone"}>{a.title}</td>
          <td className={td}>{a.category}</td>
          <td className={td}>{formatDate(a.publishedAt)}</td>
          <td className={td}>{a.readTime}</td>
          <td className={td}>
            <span className={"border px-2 py-0.5 text-[9px] font-bold " +
              (a.status === "PUBLISHED"
                ? "border-lime/40 bg-lime/10 text-lime"
                : "border-bone/20 bg-bone/5 text-concrete")}
            >
              {a.status}
            </span>
          </td>
        </tr>
      ))}
    </Table>
  );
}
