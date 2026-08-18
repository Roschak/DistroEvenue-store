import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { CollectionsPanel } from "@/components/admin/ContentPanels";

export const metadata: Metadata = {
  title: "Admin · Collections",
  robots: { index: false, follow: false },
};

export default function AdminCollectionsPage() {
  return (
    <AdminShell title="COLLECTIONS">
      <CollectionsPanel />
    </AdminShell>
  );
}
