import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Misc";
import { LookbookClient } from "@/components/lookbook/LookbookClient";
import { Marquee } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "Editorial looks from the Digital Avenue — Bogor City Nights, Rainy Day Standard, Weekend Rider and After Dark.",
};

export default function LookbookPage() {
  return (
    <>
      <PageHeader
        index="LOOKBOOK"
        label="EDITORIAL"
        title="LOOKS FROM THE AVENUE."
        description="Styled editorial concepts shot against the mood of Bogor after dark. Click any look to shop the pieces."
      />
      <div className="border-y border-ink-line py-5">
        <Marquee items={["AVENUE", "LOOK 01", "BOGOR", "CITY", "NIGHTS"]} slow />
      </div>
      <div className="pt-20 md:pt-28">
        <LookbookClient />
      </div>
    </>
  );
}
