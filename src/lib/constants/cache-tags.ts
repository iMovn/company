export const CACHE_TAGS = {
  MENU: "menu",
  BLOG: "blog",
  SERVICES: "services",
  SETTINGS: "settings",
} as const;

export const REVALIDATE_TIMES = {
  STATIC: 86400, // 24 hours
  DYNAMIC: 300, // 5 minutes
  REALTIME: 60, // 1 minute
} as const;
