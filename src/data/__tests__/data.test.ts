import { describe, expect, it } from "vitest";
import {
  PRODUCTS,
  PUBLISHED_PRODUCTS,
  COLLECTIONS,
  LOOKS,
  searchAll,
  getProductBySlug,
  getProductsByLook,
} from "@/data";

describe("product data integrity", () => {
  it("has unique slugs", () => {
    const slugs = PRODUCTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has unique ids", () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every published product has a category and sizes", () => {
    for (const p of PUBLISHED_PRODUCTS) {
      expect(p.category).toBeTruthy();
      expect(p.sizes.length).toBeGreaterThan(0);
      expect(p.images.length).toBeGreaterThan(0);
    }
  });

  it("all published prices are positive", () => {
    for (const p of PUBLISHED_PRODUCTS) {
      expect(p.price).toBeGreaterThan(0);
    }
  });
});

describe("collections and looks", () => {
  it("collections have unique slugs", () => {
    const slugs = COLLECTIONS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every look references existing product ids", () => {
    for (const look of LOOKS) {
      expect(getProductsByLook(look.id).length).toBeGreaterThan(0);
    }
  });
});

describe("search", () => {
  it("finds products by term", () => {
    const res = searchAll("tee");
    expect(res.products.length).toBeGreaterThan(0);
  });

  it("returns empty results for empty query", () => {
    const res = searchAll("");
    expect(res.products).toHaveLength(0);
    expect(res.collections).toHaveLength(0);
    expect(res.articles).toHaveLength(0);
  });

  it("finds articles by term", () => {
    const res = searchAll("bogor");
    expect(res.articles.length).toBeGreaterThan(0);
  });
});

describe("lookups", () => {
  it("gets product by slug", () => {
    expect(getProductBySlug("graphic-tee-01")?.name).toBe("GRAPHIC TEE 01");
  });
});
