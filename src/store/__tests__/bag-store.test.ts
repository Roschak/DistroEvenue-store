import { describe, expect, it, beforeEach } from "vitest";
import { useBagStore } from "@/store/bag-store";
import type { BagItem } from "@/types";

const base = {
  productId: "p-01",
  slug: "graphic-tee-01",
  brand: "DISTRO AVENUE",
  name: "GRAPHIC TEE 01",
  price: 249000,
  salePrice: null,
  image: "img.jpg",
};

beforeEach(() => {
  useBagStore.setState({ items: [] });
});

describe("bag store", () => {
  it("adds an item", () => {
    useBagStore.getState().addItem({ ...base, size: "M" });
    expect(useBagStore.getState().count()).toBe(1);
  });

  it("merges same product + size into one line", () => {
    useBagStore.getState().addItem({ ...base, size: "M" });
    useBagStore.getState().addItem({ ...base, size: "M", qty: 2 });
    const items = useBagStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].qty).toBe(3);
  });

  it("keeps different sizes separate", () => {
    useBagStore.getState().addItem({ ...base, size: "M" });
    useBagStore.getState().addItem({ ...base, size: "L" });
    expect(useBagStore.getState().items).toHaveLength(2);
  });

  it("removes an item", () => {
    useBagStore.getState().addItem({ ...base, size: "M" });
    const key = useBagStore.getState().items[0].key;
    useBagStore.getState().removeItem(key);
    expect(useBagStore.getState().count()).toBe(0);
  });

  it("updates quantity and never goes below 1", () => {
    useBagStore.getState().addItem({ ...base, size: "M" });
    const key = useBagStore.getState().items[0].key;
    useBagStore.getState().updateQty(key, 5);
    expect(useBagStore.getState().items[0].qty).toBe(5);
    useBagStore.getState().updateQty(key, 0);
    expect(useBagStore.getState().items[0].qty).toBe(1);
  });

  it("computes subtotal using sale price when present", () => {
    useBagStore.getState().addItem({ ...base, salePrice: 179000, size: "M", qty: 2 });
    useBagStore.getState().addItem({ ...base, productId: "p-02", slug: "x", name: "TEE 02", size: "L" });
    expect(useBagStore.getState().subtotal()).toBe(179000 * 2 + 249000);
  });

  it("clears the bag", () => {
    useBagStore.getState().addItem({ ...base, size: "M" });
    useBagStore.getState().clear();
    expect(useBagStore.getState().items).toEqual([] as BagItem[]);
  });
});
