import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { BagDrawer } from "@/components/layout/BagDrawer";
import { QuickView } from "@/components/products/QuickView";
import { SITE, STORE } from "@/data/site";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — Streetwear from the Heart of Bogor`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "distro avenue",
    "streetwear",
    "bogor",
    "distro",
    "fashion",
    "clothing store bogor",
    "pakuan",
  ],
  openGraph: {
    type: "website",
    locale: "en_ID",
    siteName: SITE.name,
    title: `${SITE.name} — Streetwear from the Heart of Bogor`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

/** Structured data — only verified public business information. No phone, email or price range. */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: STORE.name,
  description:
    "A clothing store in Bogor, Indonesia. This website is an unofficial portfolio concept.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Pakuan, RT.05/RW.08, Baranangsiang",
    addressLocality: "Bogor Timur",
    addressRegion: "Jawa Barat",
    postalCode: "16143",
    addressCountry: "ID",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "13:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "09:00", closes: "21:00" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spaceGrotesk.variable} ${spaceMono.variable} grain h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink text-bone">
        <MotionConfig reducedMotion="user">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-lime focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-ink"
          >
            SKIP TO CONTENT
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileMenu />
          <SearchOverlay />
          <BagDrawer />
          <QuickView />
        </MotionConfig>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
