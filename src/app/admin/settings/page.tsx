import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsPanel } from "@/components/admin/SettingsPromo";

export const metadata: Metadata = {
  title: "Admin · Store Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <AdminShell title="STORE SETTINGS">
      <SettingsPanel />
    </AdminShell>
  );
}
