import { PRODUCTS } from "./products";
import { COLLECTIONS } from "./collections";
import { LOOKS } from "./looks";
import { PUBLISHED_JOURNAL } from "./journal";

export * from "./site";
export * from "./products";
export * from "./collections";
export * from "./looks";
export * from "./journal";
export * from "./orders";

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCollectionBySlug(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getLookBySlug(slug: string) {
  return LOOKS.find((l) => l.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return PUBLISHED_JOURNAL.find((a) => a.slug === slug);
}

export function getProductsByCollection(collectionId: string) {
  return PRODUCTS.filter(
    (p) => p.collectionId === collectionId && p.status === "PUBLISHED"
  );
}

export function getProductsByLook(lookId: string) {
  const look = LOOKS.find((l) => l.id === lookId);
  if (!look) return [];
  return look.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}

export function getRelatedProducts(slug: string, limit = 4) {
  const current = getProductBySlug(slug);
  if (!current) return [];
  return PRODUCTS.filter(
    (p) =>
      p.slug !== slug &&
      p.status === "PUBLISHED" &&
      (p.category === current.category || p.collectionId === current.collectionId)
  ).slice(0, limit);
}

export function getFeaturedProducts(limit = 8) {
  return PRODUCTS.filter(
    (p) => p.status === "PUBLISHED" && (p.featured || p.stock > 0)
  ).slice(0, limit);
}

export interface SearchResults {
  products: typeof PRODUCTS;
  collections: typeof COLLECTIONS;
  articles: typeof PUBLISHED_JOURNAL;
}

export function searchAll(query: string): SearchResults {
  const q = query.toLowerCase().trim();
  if (!q) return { products: [], collections: [], articles: [] };
  const match = (...fields: string[]) => fields.join(" ").toLowerCase().includes(q);
  return {
    products: PRODUCTS.filter(
      (p) =>
        p.status === "PUBLISHED" &&
        match(p.name, p.brand, p.category, p.description)
    ).slice(0, 6),
    collections: COLLECTIONS.filter((c) => match(c.name, c.description, c.tagline ?? "")).slice(0, 4),
    articles: PUBLISHED_JOURNAL.filter((a) =>
      match(a.title, a.excerpt, a.category)
    ).slice(0, 4),
  };
}

/** Sizes used across the catalog for filter options. */
export const ALL_SIZES = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "40", "41", "42", "43", "44", "ONE SIZE"];
export const ALL_COLORS = ["BLACK", "BONE", "LIME", "WHITE", "CHARCOAL", "OLIVE", "KHAKI", "ASH"];
