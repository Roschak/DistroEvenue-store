/**
 * Central image registry. All photography is demo imagery (Unsplash),
 * used to simulate a premium streetwear editorial experience.
 * No real Distro Avenue photography is implied.
 */

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  heroMain: U("photo-1541534741688-6078c6bfb5c5", 2000),
  heroAlt: U("photo-1509942774463-acf339cf87d5", 1600),
  avenueIntro: U("photo-1441984904996-e0b6ba687e04", 1800),
  avenueIntroAlt: U("photo-1489987707025-afc232f7ea0f", 1600),
  bogorRain: U("photo-1493976040374-85c8e12f0c0e", 1800),
  bogorNight: U("photo-1519608487953-e999c86e7455", 1800),
  cityNight: U("photo-1477959858617-67f85cf4f1df", 1800),
  storeFront: U("photo-1441986300917-64674bd600d8", 1800),
  community1: U("photo-1516257984-b1b4d707412e", 1200),
  community2: U("photo-1523398002811-999ca8dec234", 1200),
  community3: U("photo-1539533018447-63fcce2678e3", 1200),
  community4: U("photo-1502716119720-b23a93e5fe1b", 1200),
  editorial1: U("photo-1469334031218-e382a71b716b", 1400),
  editorial2: U("photo-1496747611176-843222e1e57c", 1400),
  editorial3: U("photo-1495385794356-15371f348c31", 1400),
  lookMain1: U("photo-1552374196-1ab2a1c593e8", 1600),
  lookMain2: U("photo-1515886657613-9f3515b0c78f", 1600),
  lookMain3: U("photo-1509631179647-0177331693ae", 1600),
  lookMain4: U("photo-1525507119028-ed4c629a60a3", 1600),
  lookVert1: U("photo-1503342217505-b0a15ec3261c", 1200),
  lookVert2: U("photo-1524638431109-93d95c968f03", 1200),
  lookVert3: U("photo-1519861531473-9200262188bf", 1200),
  lookVert4: U("photo-1508700115892-45ecd05ae2ad", 1200),
  journal1: U("photo-1493976040374-85c8e12f0c0e", 1600),
  journal2: U("photo-1523381210434-271e8be1f52b", 1600),
  journal3: U("photo-1516975080664-ed2fc6a32937", 1600),
  journal4: U("photo-1502716119720-b23a93e5fe1b", 1600),
  journal5: U("photo-1554568218-0f1715e72254", 1600),
  dropBg: U("photo-1519501025264-65ba15a82390", 2000),
  social1: U("photo-1509942774463-acf339cf87d5", 800),
  social2: U("photo-1516257984-b1b4d707412e", 800),
  social3: U("photo-1529139574466-a303027c1d8b", 800),
  social4: U("photo-1539533018447-63fcce2678e3", 800),
  social5: U("photo-1520975661595-6453be3f7070", 800),
  social6: U("photo-1483985988355-763728e1935b", 800),
} as const;

/** Product photography by category slug. */
export const PRODUCT_SHOTS: Record<string, string[]> = {
  "t-shirts": [
    U("photo-1521572163474-6864f9cf17ab", 1200),
    U("photo-1620799140408-edc6dcb6d633", 1200),
    U("photo-1562157873-818bc0726f68", 1200),
  ],
  hoodies: [
    U("photo-1556821840-3a63f95609a7", 1200),
    U("photo-1556821833-77da8d993d39", 1200),
    U("photo-1618354691373-d851c5c3a990", 1200),
  ],
  jackets: [
    U("photo-1543076447-215ad9ba6923", 1200),
    U("photo-1541099649105-f69ad21f3246", 1200),
    U("photo-1591047139829-d91aecb6caea", 1200),
  ],
  pants: [
    U("photo-1551028719-00167b16eac5", 1200),
    U("photo-1541099649105-f69ad21f3246", 1200),
    U("photo-1506629082955-511b1aa562c8", 1200),
  ],
  footwear: [
    U("photo-1549298916-b41d501d3772", 1200),
    U("photo-1542291026-7eec264c27ff", 1200),
    U("photo-1595950653106-6c9ebd614d3a", 1200),
  ],
  accessories: [
    U("photo-1553062407-98eeb64c6a62", 1200),
    U("photo-1523205771623-e0faa4d2813d", 1200),
    U("photo-1526170375885-4d8ecf77b99f", 1200),
  ],
};
