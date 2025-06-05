export const DOMAIN_URL =
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;
export const ENABLE_CACHE = process.env.NEXT_PUBLIC_ENABLE_CACHE === "true";

export const DEFAULT_LIMIT = 9;
export const DEFAULT_SORT_FIELD = "id";
export const DEFAULT_SORT_DIRECTION = "desc";
export const SIDEBAR_POSTS_LIMIT = 5;
