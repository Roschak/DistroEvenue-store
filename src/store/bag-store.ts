"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BagItem } from "@/types";

interface BagState {
  items: BagItem[];
  addItem: (item: Omit<BagItem, "key" | "qty"> & { qty?: number }) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useBagStore = create<BagState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const key = `${item.productId}-${item.size}`;
        const existing = get().items.find((i) => i.key === key);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.key === key ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              { ...item, key, qty: item.qty ?? 1 },
            ],
          });
        }
      },
      removeItem: (key) =>
        set({ items: get().items.filter((i) => i.key !== key) }),
      updateQty: (key, qty) =>
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, qty: Math.max(1, qty) } : i
          ),
        }),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () =>
        get().items.reduce((n, i) => n + (i.salePrice ?? i.price) * i.qty, 0),
    }),
    { name: "avenue-bag" }
  )
);
