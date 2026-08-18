import type { Collection } from "@/types";
import { IMAGES } from "@/lib/images";

/** DEMO collections — portfolio catalog structure, not an official brand list. */
export const COLLECTIONS: Collection[] = [
  {
    id: "c-essentials",
    name: "ESSENTIALS",
    slug: "essentials",
    description:
      "The quiet foundation of the wardrobe. Clean cuts, no noise — pieces you reach for every single day.",
    image: IMAGES.avenueIntroAlt,
    productCount: 2,
    tagline: "THE FOUNDATION",
  },
  {
    id: "c-graphic",
    name: "GRAPHIC SERIES",
    slug: "graphic-series",
    description:
      "Prints that speak for the city. Each graphic is a chapter of Bogor street culture, worn on heavyweight cotton.",
    image: IMAGES.editorial1,
    productCount: 4,
    tagline: "PRINTED BY THE CITY",
  },
  {
    id: "c-outerwear",
    name: "OUTERWEAR",
    slug: "outerwear",
    description:
      "For the rain, the wind and the cold night rides. Shells, fleece and varsity pieces engineered for after dark.",
    image: IMAGES.journal1,
    productCount: 4,
    tagline: "AFTER DARK ARMOR",
  },
  {
    id: "c-footwear",
    name: "FOOTWEAR",
    slug: "footwear",
    description:
      "The step that carries the fit. Low-tops and night-walkers built for wet streets and long sessions.",
    image: IMAGES.lookMain4,
    productCount: 2,
    tagline: "GROUND CONTROL",
  },
  {
    id: "c-weekend",
    name: "WEEKEND",
    slug: "weekend",
    description:
      "Cargos, packs and overshirts for the ride out of the city — and the cangkruk that follows.",
    image: IMAGES.community4,
    productCount: 3,
    tagline: "RIDE · EAT · REPEAT",
  },
  {
    id: "c-city-uniform",
    name: "CITY UNIFORM",
    slug: "city-uniform",
    description:
      "The everyday uniform of the Digital Avenue. What you wear when the city is your runway.",
    image: IMAGES.storeFront,
    productCount: 2,
    tagline: "EVERYDAY ARMOR",
  },
];
