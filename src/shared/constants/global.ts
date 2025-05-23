export const DOMAIN_URL = process.env.NEXT_PUBLIC_UR;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;
export const CACHE_TTL = parseInt(
  process.env.NEXT_PUBLIC_CACHE_TTL || "300000"
); // 5 minutes
export const ENABLE_CACHE = process.env.NEXT_PUBLIC_ENABLE_CACHE === "true";
