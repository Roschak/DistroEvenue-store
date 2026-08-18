import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { InventoryPanel } from "@/components/admin/InventoryPanel";

export const metadata: Metadata = {
  title: "Admin · Inventory",
  robots: { index: false, follow: false },
};

export default function AdminInventoryPage() {
  return (
    <AdminShell title="INVENTORY">
      <InventoryPanel />
    </AdminShell>
  );
}
