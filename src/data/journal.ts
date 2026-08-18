import type { JournalArticle } from "@/types";
import { IMAGES } from "@/lib/images";

/** DEMO journal — editorial portfolio content. Facts vs creative copy are distinguished per article. */
export const JOURNAL: JournalArticle[] = [
  {
    id: "j-01",
    title: "Why Ciheuleut Became Bogor's Streetwear Destination",
    slug: "why-ciheuleut-became-bogors-streetwear-destination",
    excerpt:
      "A look at how the streets around Ciheuleut and the Pakuan area quietly grew into a hub of distro culture — from its community roots to the daily rhythm of the block.",
    content: [
      "This is creative portfolio copy informed by publicly observable context. Distro culture in Bogor grew around local neighborhoods — small stores, workshops and community spaces where music, skate and fashion overlapped.",
      "Ciheuleut, like other areas of Bogor, is part of that everyday texture: streets lined with small clothing stores, food stalls and the kind of casual energy that makes a block feel like a destination.",
      "The point of a distro has never been just the product. It's the intersection — where you meet friends, discover music, and try on a version of yourself that feels a little more yours.",
      "For a city like Bogor, that energy is the foundation of local streetwear culture: independent, community-first and proudly homegrown.",
    ],
    image: IMAGES.journal1,
    category: "CULTURE",
    publishedAt: "2026-07-18",
    readTime: "4 MIN",
    status: "PUBLISHED",
    note: "Creative portfolio essay based on publicly observable context — not official history.",
  },
  {
    id: "j-02",
    title: "The Rainy Season Layering Guide",
    slug: "the-rainy-season-layering-guide",
    excerpt:
      "Bogor is no stranger to afternoon rain. Here's how to build a fit that survives the monsoon and still looks intentional.",
    content: [
      "Rain in Bogor is a lifestyle. The key is layering with intention: a quick-dry base, a mid layer you can shed, and a shell that actually does its job.",
      "Start with a heavyweight tee — it holds shape under everything. Add a hoodie for warmth in the evening, and finish with a water-resistant shell when the clouds start rolling in.",
      "Footwear is the real test. Gum rubber and grippy outsoles handle the wet better than anything smooth-soled, and a pack with a rain cover keeps your essentials dry.",
      "The uniform logic is simple: every piece should earn its place in the rotation, rain or shine.",
    ],
    image: IMAGES.journal2,
    category: "STYLE",
    publishedAt: "2026-07-10",
    readTime: "3 MIN",
    status: "PUBLISHED",
    note: "Creative style content — general layering advice, no product claims.",
  },
  {
    id: "j-03",
    title: "Distro Culture and the Rise of Indonesian Youth Fashion",
    slug: "distro-culture-and-the-rise-of-indonesian-youth-fashion",
    excerpt:
      "From small local stores to a national movement — how the distro format shaped the way Indonesian youth dress, express and belong.",
    content: [
      "The 'distro' — short for distribution store — is an Indonesian retail format that grew out of local music and youth subcultures, selling independent clothing, accessories and media.",
      "What made distros different was the culture around them: they were places to hang out, to find music, to connect with a scene, not just to buy a shirt.",
      "That community-first model is why the format endured. It gave young people a space that felt theirs — local, affordable and expressive.",
      "Today that DNA lives on in everything from indie labels to streetwear drops, and it remains the soul of local fashion in cities like Bogor.",
    ],
    image: IMAGES.journal3,
    category: "CULTURE",
    publishedAt: "2026-06-28",
    readTime: "5 MIN",
    status: "PUBLISHED",
    note: "General cultural essay on the distro format — not a claim about any specific business.",
  },
  {
    id: "j-04",
    title: "Sunday Rides: The Weekend Ritual of Bogor",
    slug: "sunday-rides-the-weekend-ritual-of-bogor",
    excerpt:
      "Every weekend, riders take to the roads around Bogor. It's part commute, part ritual — and a big part of the city's street energy.",
    content: [
      "Weekends in Bogor have a rhythm of their own. By late morning, riders are on the move — heading out of the city toward the hills, or gathering at familiar spots along the way.",
      "The ride culture is a social ritual as much as a commute: a chance to clear your head, catch up with friends and feel the road.",
      "For streetwear, it's a natural fit. Cargos with room to move, an overshirt that layers over a tee, a pack that carries the day — the ride shapes how the city dresses.",
      "It's community, motion and identity — three words that could describe a lot of what makes Bogor's street culture tick.",
    ],
    image: IMAGES.journal4,
    category: "COMMUNITY",
    publishedAt: "2026-06-14",
    readTime: "4 MIN",
    status: "PUBLISHED",
    note: "Creative community essay — general observations, not official club or business claims.",
  },
  {
    id: "j-05",
    title: "Graphic Tees as Self-Expression",
    slug: "graphic-tees-as-self-expression",
    excerpt:
      "A printed tee is the easiest uniform of identity — a blank canvas that says something without saying a word.",
    content: [
      "There's a reason the graphic tee is the foundation of streetwear. It's low effort, high expression — a print can signal music taste, a neighborhood, an inside joke or a mood.",
      "The best graphics age like good friends: they get better with wear, fading into the shape of the person wearing them.",
      "In distro culture, the graphic tee was the original medium. Small runs, local references, art that came from the scene itself.",
      "Wear it until the print cracks. That's the point.",
    ],
    image: IMAGES.journal5,
    category: "FASHION",
    publishedAt: "2026-05-30",
    readTime: "3 MIN",
    status: "PUBLISHED",
    note: "Creative style essay — general commentary, no specific claims.",
  },
];

export const PUBLISHED_JOURNAL = JOURNAL.filter((a) => a.status === "PUBLISHED");
