import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AvenueIntro } from "@/components/home/AvenueIntro";
import { BogorIdentity } from "@/components/home/BogorIdentity";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { HomeProducts } from "@/components/home/HomeProducts";
import { DropCulture } from "@/components/home/DropCulture";
import { StorePreview } from "@/components/home/StorePreview";
import { Community, SocialFeed } from "@/components/home/CommunitySocial";
import { JournalTeaser } from "@/components/home/JournalTeaser";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "DISTRO AVENUE — Streetwear from the Heart of Bogor",
  description: SITE.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AvenueIntro />
      <BogorIdentity />
      <FeaturedCollections />
      <HomeProducts />
      <DropCulture />
      <StorePreview />
      <Community />
      <JournalTeaser />
      <SocialFeed />
    </>
  );
}
