/**
 * Verified public business information + demo-mode configuration.
 * Everything marked DEMO is synthetic portfolio data and must never
 * be presented as official business information.
 */

export const SITE = {
  name: "DISTRO AVENUE",
  legalName: "Distro Avenue Store",
  tagline: "Streetwear from the heart of Bogor.",
  statement: "WHERE BOGOR FINDS ITS STYLE.",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  demoLabel: "PORTFOLIO DEMO",
  domain: "https://distro-avenue-concept.vercel.app",
  description:
    "An unofficial portfolio concept reimagining Distro Avenue Store as a premium digital streetwear destination — the Digital Avenue of Bogor.",
};

export const STORE = {
  name: "DISTRO AVENUE STORE",
  plusCode: "9RX7+2C7",
  addressLines: [
    "Jl. Pakuan",
    "RT.05/RW.08, Baranangsiang",
    "Kec. Bogor Timur",
    "Kota Bogor, Jawa Barat 16143",
    "Indonesia",
  ],
  /** Verified public operating hours. */
  hours: [
    { day: "MON–THU", open: "09:00", close: "21:00" },
    { day: "FRI", open: "13:00", close: "21:00" },
    { day: "SAT–SUN", open: "09:00", close: "21:00" },
  ],
  mapsEmbed:
    "https://maps.google.com/maps?q=Distro%20Avenue%20Store%20Jl.%20Pakuan%20Bogor&t=&z=16&ie=UTF8&iwloc=&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=9RX7%2B2C7+Jl.+Pakuan+Baranangsiang+Bogor",
  timezone: "Asia/Jakarta",
};

/** Demo drop schedule. Never implies a real live promotion. */
export const DEMO_DROP = {
  code: "DROP 001",
  name: "AVENUE AFTER DARK",
  label: "COMING SOON",
  demo: true,
  /** Days from today for the demo countdown target. */
  daysOut: 14,
  time: "19:00 WIB",
};

export const NAV_LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "JOURNAL", href: "/journal" },
  { label: "STORE", href: "/store" },
  { label: "ABOUT", href: "/about" },
] as const;
