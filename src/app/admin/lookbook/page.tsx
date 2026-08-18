import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { LookbookPanel } from "@/components/admin/ContentPanels";

export const metadata: Metadata = {
  title: "Admin · Lookbook",
  robots: { index: false, follow: false },
};

export default function AdminLookbookPage() {
  return (
    <AdminShell title="LOOKBOOK">
      <LookbookPanel />
    </AdminShell>
  );
}
