export const CACHE_TAGS = {
  MENU: "menu",
  BLOG: "blog",
  SERVICES: "services",
  SETTINGS: "settings",
  CATEGORIES: "categories",
  CATEGORY: (id: string) => `category-${id}`,
} as const;

export const REVALIDATE_TIMES = {
  STATIC: 86400, // 24 hours
  POST: 3600, // 1 hourse
  DYNAMIC: 300, // 5 minutes
  REALTIME: 60, // 1 minute
} as const;
