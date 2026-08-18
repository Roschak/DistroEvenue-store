"use client";

import { stockStatus as stockOf } from "@/lib/utils";
import { PRODUCTS } from "@/data";
import { useInventoryStore } from "@/store/inventory-store";
import { Table, td } from "./AdminShell";

export function InventoryPanel() {
  const stockMap = useInventoryStore((s) => s.stock);
  const setStock = useInventoryStore((s) => s.setStock);

  const rows = PRODUCTS.flatMap((p) =>
    p.sizes.slice(0, 2).map((size) => ({
      key: `${p.id}-${size}`,
      productId: p.id,
      sku: p.sku,
      product: p.name,
      size,
      color: p.colors[0]?.name ?? "—",
      stock: stockMap[p.id] ?? p.stock,
    }))
  );

  const tone = (s: number) =>
    s <= 0 ? "text-red-400" : s <= 5 ? "text-amber-400" : "text-lime";

  return (
    <div className="space-y-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
        {rows.length} SKU VARIANTS ·{" "}
        {PRODUCTS.filter((p) => (stockMap[p.id] ?? p.stock) <= 5).length} LOW STOCK
      </p>
      <Table head={["SKU", "PRODUCT", "SIZE", "COLOR", "STOCK", "STATUS"]}>
        {rows.map((r) => {
          const s = stockOf(r.stock);
          return (
            <tr key={r.key} className="transition-colors hover:bg-ink-line/50">
              <td className={td + " text-concrete"}>{r.sku}</td>
              <td className={td + " font-bold text-bone"}>{r.product}</td>
              <td className={td}>{r.size}</td>
              <td className={td}>{r.color}</td>
              <td className={td}>
                <input
                  type="number"
                  value={r.stock}
                  onChange={(e) => setStock(r.productId, Number(e.target.value) || 0)}
                  className={"w-16 border border-ink-line bg-transparent px-2 py-1 font-mono text-xs font-bold focus:border-lime focus:outline-none " + tone(r.stock)}
                  aria-label={`Stock for ${r.product} ${r.size}`}
                />
              </td>
              <td className={td}>
                <span className={"border px-2 py-0.5 text-[9px] font-bold " +
                  (s === "IN STOCK"
                    ? "border-lime/40 bg-lime/10 text-lime"
                    : s === "LOW STOCK"
                      ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                      : "border-avenue-red/40 bg-avenue-red/10 text-red-400")}
                >
                  {s}
                </span>
              </td>
            </tr>
          );
        })}
      </Table>
      <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-concrete/70">
        Stock edits update the shared reactive inventory — the storefront product cards
        and detail pages reflect them immediately in this session.
      </p>
    </div>
  );
}
