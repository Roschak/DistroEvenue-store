import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { OrdersPanel } from "@/components/admin/OrdersPanel";

export const metadata: Metadata = {
  title: "Admin · Orders",
  robots: { index: false, follow: false },
};

export default function AdminOrdersPage() {
  return (
    <AdminShell title="ORDERS">
      <OrdersPanel />
    </AdminShell>
  );
}
