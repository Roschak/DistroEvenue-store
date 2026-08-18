import type { Look } from "@/types";
import { IMAGES } from "@/lib/images";

/** DEMO lookbook looks — editorial styling concepts with connected demo products. */
export const LOOKS: Look[] = [
  {
    id: "look-01",
    title: "BOGOR CITY NIGHTS",
    slug: "bogor-city-nights",
    subtitle: "AVENUE LOOK 01",
    images: {
      main: IMAGES.lookMain1,
      secondary: IMAGES.community1,
      vertical: IMAGES.lookVert1,
    },
    productIds: ["p-03", "p-07", "p-10", "p-12"],
    layout: "a",
  },
  {
    id: "look-02",
    title: "RAINY DAY STANDARD",
    slug: "rainy-day-standard",
    subtitle: "AVENUE LOOK 02",
    images: {
      main: IMAGES.lookMain2,
      secondary: IMAGES.journal1,
      vertical: IMAGES.lookVert2,
    },
    productIds: ["p-05", "p-02", "p-11"],
    layout: "b",
  },
  {
    id: "look-03",
    title: "WEEKEND RIDER",
    slug: "weekend-rider",
    subtitle: "AVENUE LOOK 03",
    images: {
      main: IMAGES.lookMain3,
      secondary: IMAGES.community4,
      vertical: IMAGES.lookVert3,
    },
    productIds: ["p-08", "p-14", "p-09"],
    layout: "c",
  },
  {
    id: "look-04",
    title: "AFTER DARK",
    slug: "after-dark",
    subtitle: "AVENUE LOOK 04",
    images: {
      main: IMAGES.lookMain4,
      secondary: IMAGES.editorial3,
      vertical: IMAGES.lookVert4,
    },
    productIds: ["p-06", "p-13", "p-10", "p-04"],
    layout: "a",
  },
];
