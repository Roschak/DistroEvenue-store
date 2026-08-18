import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { JournalPanel } from "@/components/admin/ContentPanels";

export const metadata: Metadata = {
  title: "Admin · Journal",
  robots: { index: false, follow: false },
};

export default function AdminJournalPage() {
  return (
    <AdminShell title="JOURNAL">
      <JournalPanel />
    </AdminShell>
  );
}
