import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { Dashboard } from "@/components/admin/Dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Portfolio demo admin dashboard — all data simulated.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <AdminShell title="DASHBOARD">
      <Dashboard />
    </AdminShell>
  );
}
