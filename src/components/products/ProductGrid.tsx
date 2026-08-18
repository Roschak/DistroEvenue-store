import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  cols = 4,
  className,
}: {
  products: Product[];
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colClass =
    cols === 2
      ? "grid-cols-2"
      : cols === 3
        ? "grid-cols-2 md:grid-cols-3"
        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={className}>
      {products.length === 0 ? (
        <div className="border border-dashed border-ink-line py-20 text-center">
          <p className="font-display text-3xl tracking-tight text-bone">NOTHING HERE YET.</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-concrete">
            Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className={`grid gap-x-4 gap-y-10 md:gap-x-6 ${colClass}`}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
