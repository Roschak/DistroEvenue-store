"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { formatIDR, stockStatus } from "@/lib/utils";
import { PRODUCTS, CATEGORIES } from "@/data";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Table, td } from "./AdminShell";
import { DemoBadge } from "@/components/ui/Misc";

const STATUSES: Product["status"][] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export function ProductsPanel() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "DISTRO AVENUE",
    category: CATEGORIES[0].label,
    price: "",
    stock: "",
  });

  const add = () => {
    if (!form.name.trim() || !form.price) return;
    const p: Product = {
      id: `p-${Date.now()}`,
      slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: form.name.toUpperCase(),
      brand: form.brand,
      collectionId: "c-graphic",
      category: form.category,
      description: "Demo product added from the portfolio CMS.",
      price: Number(form.price) || 0,
      salePrice: null,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"],
      sizes: ["S", "M", "L", "XL"],
      colors: [{ name: "BLACK", hex: "#141414" }],
      sku: `DA-NEW-${String(products.length + 1).padStart(4, "0")}`,
      stock: Number(form.stock) || 0,
      status: "DRAFT",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setProducts([p, ...products]);
    setShowAdd(false);
    setForm({ name: "", brand: "DISTRO AVENUE", category: CATEGORIES[0].label, price: "", stock: "" });
  };

  const setStatus = (id: string, status: Product["status"]) =>
    setProducts(products.map((p) => (p.id === id ? { ...p, status } : p)));

  const remove = (id: string) => setProducts(products.filter((p) => p.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-concrete">
            {products.length} PRODUCTS
          </p>
          <DemoBadge label="DEMO CRUD" />
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="h-3.5 w-3.5" /> NEW PRODUCT
        </Button>
      </div>

      <Table head={["SKU", "PRODUCT", "CATEGORY", "PRICE", "STOCK", "STATUS", ""]}>
        {products.map((p) => (
          <tr key={p.id} className="transition-colors hover:bg-ink-line/50">
            <td className={td + " text-concrete"}>{p.sku}</td>
            <td className={td}>
              <span className="font-bold text-bone">{p.name}</span>
              <span className="block text-[9px] text-concrete">{p.brand}</span>
            </td>
            <td className={td}>{p.category}</td>
            <td className={td + " font-bold text-bone"}>{formatIDR(p.price)}</td>
            <td className={td}>
              <span
                className={
                  stockStatus(p.stock) === "OUT OF STOCK"
                    ? "text-red-400"
                    : stockStatus(p.stock) === "LOW STOCK"
                      ? "text-amber-400"
                      : "text-lime"
                }
              >
                {p.stock}
              </span>
            </td>
            <td className={td}>
              <select
                value={p.status}
                onChange={(e) => setStatus(p.id, e.target.value as Product["status"])}
                className="border border-ink-line bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-bone focus:border-lime focus:outline-none"
                aria-label={`Status of ${p.name}`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </td>
            <td className={td}>
              <button
                onClick={() => remove(p.id)}
                className="text-concrete transition-colors hover:text-red-400"
                aria-label={`Delete ${p.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </Table>

      {showAdd && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Add product">
          <div className="w-full max-w-lg border border-ink-line bg-ink p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl tracking-tight text-bone">NEW PRODUCT</h2>
              <button onClick={() => setShowAdd(false)} className="text-concrete hover:text-lime" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-concrete">NAME</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-10 w-full border border-ink-line bg-transparent px-3 font-mono text-xs text-bone focus:border-lime focus:outline-none"
                  placeholder="e.g. NEW GRAPHIC TEE"
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-concrete">CATEGORY</span>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="h-10 w-full border border-ink-line bg-ink px-2 font-mono text-xs text-bone focus:border-lime focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.label}>{c.label}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-concrete">PRICE (IDR)</span>
                  <input
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    inputMode="numeric"
                    className="h-10 w-full border border-ink-line bg-transparent px-3 font-mono text-xs text-bone focus:border-lime focus:outline-none"
                    placeholder="249000"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-concrete">STOCK</span>
                <input
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  inputMode="numeric"
                  className="h-10 w-full border border-ink-line bg-transparent px-3 font-mono text-xs text-bone focus:border-lime focus:outline-none"
                  placeholder="10"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>CANCEL</Button>
              <Button size="sm" onClick={add}>SAVE DRAFT</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
