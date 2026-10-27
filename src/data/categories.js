// youtubeCategoryId links the category to YouTube's own category id,
// so that related videos can be fetched for the right topic.
export const MAIN_CATEGORIES = [
  {
    id: "home",
    label: "Home",
    youtubeCategoryId: 0,
    query: "warhammer 40k OR wh40k OR warhammer OR space marines OR 40k lore",
  },
  {
    id: "gaming",
    label: "Gaming",
    youtubeCategoryId: 20,
    query:
      "warhammer 40k game OR space marine 2 OR dawn of war OR darktide OR total war warhammer",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    youtubeCategoryId: 24,
    query:
      "warhammer 40k animation OR warhammer cinematic OR warhammer trailer OR warhammer fan film",
  },
  {
    id: "music",
    label: "Music",
    youtubeCategoryId: 10,
    query:
      "warhammer music OR warhammer soundtrack OR mechanicus OST OR warhammer 40k ambience",
  },
  {
    id: "lore",
    label: "Lore",
    youtubeCategoryId: 22,
    query:
      "warhammer lore OR warhammer battle report OR warhammer painting OR warhammer hobby OR 40k lore",
  },
];

export const THEME_CATEGORIES = [
  {
    id: "titan-lore",
    label: "Titan Lore",
    query: "warhammer titan lore OR adeptus titanicus lore",
  },
  {
    id: "majorkill",
    label: "Majorkill",
    query: "Majorkill warhammer",
  },
  {
    id: "macragge-news",
    label: "Macragge News",
    query: "macragge news warhammer 40k",
  },
  {
    id: "the-rock-lore",
    label: "The Rock Lore",
    query: "dark angels lore OR the rock warhammer 40k lore",
  },
  {
    id: "heretical-lore",
    label: "Heretical Lore",
    query: "warhammer 40k chaos lore OR heresy lore OR world eaters lore",
  },
];

export const ALL_CATEGORIES = [...MAIN_CATEGORIES, ...THEME_CATEGORIES];

export function getCategoryById(id) {
  return ALL_CATEGORIES.find((category) => category.id === id);
}

// The query used for related videos, based on a YouTube category
export function getRelatedQuery(youtubeCategoryId) {
  const category =
    MAIN_CATEGORIES.find(
      (item) => item.youtubeCategoryId === Number(youtubeCategoryId),
    ) ?? MAIN_CATEGORIES[0];

  return category.query;
}
