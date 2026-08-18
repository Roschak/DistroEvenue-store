"use client";

import { create } from "zustand";
import type { Product } from "@/types";

interface UiState {
  searchOpen: boolean;
  menuOpen: boolean;
  bagOpen: boolean;
  quickView: Product | null;
  openSearch: () => void;
  closeSearch: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  openBag: () => void;
  closeBag: () => void;
  openQuickView: (p: Product) => void;
  closeQuickView: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  searchOpen: false,
  menuOpen: false,
  bagOpen: false,
  quickView: null,
  openSearch: () => set({ searchOpen: true, menuOpen: false, bagOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
  openMenu: () => set({ menuOpen: true, searchOpen: false, bagOpen: false }),
  closeMenu: () => set({ menuOpen: false }),
  openBag: () => set({ bagOpen: true, menuOpen: false, searchOpen: false }),
  closeBag: () => set({ bagOpen: false }),
  openQuickView: (p) => set({ quickView: p, menuOpen: false, searchOpen: false }),
  closeQuickView: () => set({ quickView: null }),
}));
