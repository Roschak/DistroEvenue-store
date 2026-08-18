"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowUpRight, Package } from "lucide-react";
import { searchAll } from "@/data";
import { formatIDR } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

export function SearchOverlay() {
  const open = useUiStore((s) => s.searchOpen);
  const close = useUiStore((s) => s.closeSearch);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[75] flex flex-col bg-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <SearchPanel onClose={close} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Inner panel remounts on every open, so the query state resets naturally. */
function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = searchAll(query);
  const hasQuery = query.trim().length > 0;
  const hasResults =
    results.products.length > 0 ||
    results.collections.length > 0 ||
    results.articles.length > 0;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-24 md:pt-32">
      <div className="flex items-center gap-4 border-b-2 border-bone pb-4">
        <Search className="h-6 w-6 shrink-0 text-lime" strokeWidth={1.5} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH THE AVENUE — TRY 'TEE'..."
          aria-label="Search products, collections and journal"
          className="w-full bg-transparent font-display text-3xl uppercase tracking-tight text-bone placeholder:text-concrete/60 focus:outline-none md:text-5xl"
        />
        <button
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-concrete hover:text-lime"
          aria-label="Close search"
        >
          <X className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      {/* Prompt chips */}
      {!hasQuery && (
        <div className="mt-6 flex flex-wrap gap-2">
          {["TEE", "HOODIE", "JACKET", "BOGOR", "ESSENTIALS"].map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip.toLowerCase())}
              className="border border-ink-line px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-concrete transition-colors hover:border-lime hover:text-lime"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {hasQuery && !hasResults && (
        <div className="py-20 text-center">
          <Package className="mx-auto mb-4 h-10 w-10 text-concrete/40" strokeWidth={1} />
          <p className="font-display text-3xl tracking-tight text-bone">NO MATCHES FOUND.</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-concrete">
            Try a different word — the avenue is long.
          </p>
        </div>
      )}

      {/* Results */}
      {hasResults && (
        <div className="mt-8 max-h-[60vh] overflow-y-auto pb-16">
          {results.products.length > 0 && (
            <ResultGroup label="PRODUCTS">
              {results.products.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} onClick={onClose} className="result-row">
                  <span className="flex items-center gap-3">
                    <span className="h-10 w-8 shrink-0 overflow-hidden bg-ink-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                    </span>
                    <span>
                      <span className="block font-mono text-xs font-bold uppercase tracking-[0.14em] text-bone">
                        {p.name}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
                        {p.brand} · {p.category}
                      </span>
                    </span>
                  </span>
                  <span className="font-mono text-xs font-bold text-lime">
                    {formatIDR(p.salePrice ?? p.price)}
                  </span>
                </Link>
              ))}
            </ResultGroup>
          )}
          {results.collections.length > 0 && (
            <ResultGroup label="COLLECTIONS">
              {results.collections.map((c) => (
                <Link key={c.id} href={`/collections#${c.slug}`} onClick={onClose} className="result-row">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-bone">
                    {c.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-concrete" />
                </Link>
              ))}
            </ResultGroup>
          )}
          {results.articles.length > 0 && (
            <ResultGroup label="JOURNAL">
              {results.articles.map((a) => (
                <Link key={a.id} href={`/journal/${a.slug}`} onClick={onClose} className="result-row">
                  <span>
                    <span className="block font-mono text-xs font-bold uppercase tracking-[0.14em] text-bone">
                      {a.title}
                    </span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-concrete">
                      {a.category} · {a.readTime}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-concrete" />
                </Link>
              ))}
            </ResultGroup>
          )}
        </div>
      )}
    </div>
  );
}

function ResultGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-lime">
        {label}
      </h3>
      <div className="divide-y divide-ink-line border-y border-ink-line">{children}</div>
    </section>
  );
}
