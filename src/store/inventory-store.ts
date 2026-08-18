"use client";

import { create } from "zustand";
import { PRODUCTS } from "@/data/products";

interface InventoryState {
  /** productId -> current stock count */
  stock: Record<string, number>;
  setStock: (id: string, stock: number) => void;
}

const seed: Record<string, number> = {};
for (const p of PRODUCTS) seed[p.id] = p.stock;

/**
 * Shared reactive inventory. Admin edits update this store so the
 * storefront product UI reflects them (PRD §32).
 */
export const useInventoryStore = create<InventoryState>((set, get) => ({
  stock: seed,
  setStock: (id, stock) =>
    set({ stock: { ...get().stock, [id]: Math.max(0, Math.floor(stock)) } }),
}));
