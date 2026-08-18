import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductsPanel } from "@/components/admin/ProductsPanel";

export const metadata: Metadata = {
  title: "Admin · Products",
  robots: { index: false, follow: false },
};

export default function AdminProductsPage() {
  return (
    <AdminShell title="PRODUCTS">
      <ProductsPanel />
    </AdminShell>
  );
}
