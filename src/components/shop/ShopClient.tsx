"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { PRODUCTS, ALL_SIZES, ALL_COLORS, CATEGORIES, COLLECTIONS } from "@/data";
import { cn, stockStatus } from "@/lib/utils";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/Misc";

type SortKey = "FEATURED" | "NEWEST" | "PRICE LOW" | "PRICE HIGH" | "POPULAR";

const SORTS: SortKey[] = ["FEATURED", "NEWEST", "PRICE LOW", "PRICE HIGH", "POPULAR"];

const PRICE_BUCKETS = [
  { label: "UNDER 250K", min: 0, max: 250000 },
  { label: "250K – 400K", min: 250000, max: 400000 },
  { label: "400K – 600K", min: 400000, max: 600000 },
  { label: "OVER 600K", min: 600000, max: Infinity },
];

const AVAILABILITY = ["IN STOCK", "LOW STOCK", "OUT OF STOCK"] as const;

export function ShopClient({
  initialCategory,
  initialQuery,
  initialCollection,
}: {
  initialCategory?: string;
  initialQuery?: string;
  initialCollection?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [category, setCategory] = useState<string>(initialCategory ?? "ALL");
  const [collectionId, setCollectionId] = useState<string | null>(initialCollection ?? null);
  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceIdx, setPriceIdx] = useState<number | null>(null);
  const [avail, setAvail] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("FEATURED");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const brandOptions = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.brand))),
    []
  );

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.status === "PUBLISHED");

    if (category !== "ALL") list = list.filter((p) => p.category === category);

    if (collectionId) list = list.filter((p) => p.collectionId === collectionId);

    const q = query.trim().toLowerCase();
    if (q)
      list = list.filter((p) =>
        (p.name + p.brand + p.category + p.description).toLowerCase().includes(q)
      );

    if (brands.length)
      list = list.filter((p) => brands.includes(p.brand));

    if (sizes.length)
      list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));

    if (colors.length)
      list = list.filter((p) =>
        p.colors.some((c) => colors.includes(c.name.toUpperCase()))
      );

    if (priceIdx !== null) {
      const bucket = PRICE_BUCKETS[priceIdx];
      list = list.filter((p) => {
        const v = p.salePrice ?? p.price;
        return v >= bucket.min && v < bucket.max;
      });
    }

    if (avail.length)
      list = list.filter((p) => avail.includes(stockStatus(p.stock)));

    switch (sort) {
      case "NEWEST":
        list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "PRICE LOW":
        list = [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "PRICE HIGH":
        list = [...list].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "POPULAR":
        list = [...list].sort((a, b) => b.stock - a.stock);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    }
    return list;
  }, [query, category, collectionId, brands, sizes, colors, priceIdx, avail, sort]);

  const toggle = (arr: string[], value: string, set: (v: string[]) => void) =>
    set(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);

  const collectionName =
    collectionId && COLLECTIONS.find((c) => c.id === collectionId)?.name;

  const activeCount =
    (category !== "ALL" ? 1 : 0) +
    (collectionId ? 1 : 0) +
    brands.length +
    sizes.length +
    colors.length +
    (priceIdx !== null ? 1 : 0) +
    avail.length;

  const resetAll = () => {
    setCategory("ALL");
    setCollectionId(null);
    setBrands([]);
    setSizes([]);
    setColors([]);
    setPriceIdx(null);
    setAvail([]);
  };

  const FilterPanel = (
    <div className="space-y-8">
      {collectionName && (
        <FilterGroup label="COLLECTION">
          <div className="flex items-center justify-between border border-lime/40 bg-lime/10 px-3 py-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-lime">
              {collectionName}
            </span>
            <button
              onClick={() => setCollectionId(null)}
              className="text-lime hover:text-bone"
              aria-label="Clear collection filter"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </FilterGroup>
      )}

      {/* Category */}
      <FilterGroup label="CATEGORY">
        {["ALL", ...CATEGORIES.map((c) => c.label)].map((c) => (
          <FilterRow key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
        ))}
      </FilterGroup>

      {/* Brand */}
      <FilterGroup label="BRAND">
        {brandOptions.map((b) => (
          <FilterRow
            key={b}
            label={b}
            active={brands.includes(b)}
            onClick={() => toggle(brands, b, setBrands)}
            checkbox
          />
        ))}
      </FilterGroup>

      {/* Size */}
      <FilterGroup label="SIZE">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggle(sizes, s, setSizes)}
              aria-pressed={sizes.includes(s)}
              className={cn(
                "h-8 min-w-9 border px-2 font-mono text-[11px] font-bold transition-colors",
                sizes.includes(s)
                  ? "border-lime bg-lime text-ink"
                  : "border-ink-line text-bone hover:border-bone/50"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Color */}
      <FilterGroup label="COLOR">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => toggle(colors, c, setColors)}
              aria-pressed={colors.includes(c)}
              className={cn(
                "border px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-colors",
                colors.includes(c)
                  ? "border-lime bg-lime text-ink"
                  : "border-ink-line text-bone hover:border-bone/50"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup label="PRICE">
        {PRICE_BUCKETS.map((b, i) => (
          <FilterRow
            key={b.label}
            label={b.label}
            active={priceIdx === i}
            onClick={() => setPriceIdx(priceIdx === i ? null : i)}
          />
        ))}
      </FilterGroup>

      {/* Availability */}
      <FilterGroup label="AVAILABILITY">
        {AVAILABILITY.map((a) => (
          <FilterRow
            key={a}
            label={a}
            active={avail.includes(a)}
            onClick={() => toggle(avail, a, setAvail)}
            checkbox
          />
        ))}
      </FilterGroup>

      {activeCount > 0 && (
        <button
          onClick={resetAll}
          className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-lime hover:underline"
        >
          CLEAR ALL FILTERS ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
      {/* Toolbar */}
      <div className="sticky top-16 z-30 -mx-5 border-b border-ink-line bg-ink/90 px-5 py-3 backdrop-blur-md md:top-20 md:mx-0 md:px-0">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex min-w-0 flex-1 items-center gap-2 border border-ink-line px-3">
            <Search className="h-4 w-4 shrink-0 text-concrete" />
            <input
              name="product-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS..."
              aria-label="Search products"
              className="h-10 w-full bg-transparent font-mono text-xs font-bold uppercase tracking-[0.12em] text-bone placeholder:text-concrete/60 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search" className="text-concrete hover:text-lime">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile filter trigger */}
          <button
            onClick={() => setSheetOpen(true)}
            className="flex h-10 items-center gap-2 border border-ink-line px-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-bone hover:border-lime hover:text-lime lg:hidden"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
            FILTERS
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1 text-[9px] text-ink">
                {activeCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex h-10 items-center gap-2 border border-ink-line px-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-bone hover:border-lime hover:text-lime"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              {sort}
              <ChevronDown className={cn("h-4 w-4 transition-transform", sortOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-12 z-40 w-48 border border-ink-line bg-ink py-1 shadow-2xl"
                  role="listbox"
                >
                  {SORTS.map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => {
                          setSort(s);
                          setSortOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors hover:bg-ink-line",
                          sort === s ? "text-lime" : "text-bone"
                        )}
                        role="option"
                        aria-selected={sort === s}
                      >
                        {s}
                        {sort === s && <span className="text-lime">✓</span>}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
            {results.length} {results.length === 1 ? "PRODUCT" : "PRODUCTS"}
            {activeCount > 0 && ` · ${activeCount} FILTER${activeCount > 1 ? "S" : ""} ACTIVE`}
          </p>
          <DemoBadge label="DEMO CATALOG" />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-44">{FilterPanel}</div>
        </aside>

        {/* Results */}
        <div>
          <ProductGrid products={results} />
          {results.length === 0 && (
            <div className="border border-dashed border-ink-line py-24 text-center">
              <p className="font-display text-4xl tracking-tight text-bone">
                {query ? "NO MATCHES FOUND." : "NOTHING HERE YET."}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-concrete">
                {query ? "Try a different search term." : "Try adjusting or clearing your filters."}
              </p>
              <button
                onClick={resetAll}
                className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-lime hover:underline"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.button
              aria-label="Close filters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-[64] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-[65] max-h-[85vh] overflow-y-auto border-t border-ink-line bg-ink p-6"
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl tracking-tight text-bone">FILTERS</h2>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="flex h-9 w-9 items-center justify-center text-concrete hover:text-lime"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {FilterPanel}
              <div className="mt-8 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={resetAll}>
                  RESET
                </Button>
                <Button className="flex-1" onClick={() => setSheetOpen(false)}>
                  SHOW {results.length} RESULTS
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 border-b border-ink-line pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-concrete">
        {label}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FilterRow({
  label,
  active,
  onClick,
  checkbox,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  checkbox?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group flex w-full items-center justify-between py-1.5 text-left font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
        active ? "text-lime" : "text-bone/80 hover:text-lime"
      )}
    >
      <span className="flex items-center gap-2.5">
        {checkbox && (
          <span
            className={cn(
              "flex h-3.5 w-3.5 items-center justify-center border",
              active ? "border-lime bg-lime" : "border-ink-line group-hover:border-bone/50"
            )}
          >
            {active && <span className="h-1.5 w-1.5 bg-ink" />}
          </span>
        )}
        {label}
      </span>
      {active && !checkbox && <span className="text-lime">✓</span>}
    </button>
  );
}
