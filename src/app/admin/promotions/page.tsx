import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { PromotionsPanel } from "@/components/admin/SettingsPromo";

export const metadata: Metadata = {
  title: "Admin · Promotions",
  robots: { index: false, follow: false },
};

export default function AdminPromotionsPage() {
  return (
    <AdminShell title="PROMOTIONS">
      <PromotionsPanel />
    </AdminShell>
  );
}
