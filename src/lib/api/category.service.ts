import { CACHE_TAGS, REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { cache } from "react";
import { Category, CategoryResponse } from "types/categories";

export const fetchCategoryBySlug = cache(async (slug: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/site/category?type=post&domain_id=${DOMAIN_ID}?slug=${slug}`,
      {
        next: {
          revalidate: REVALIDATE_TIMES.DYNAMIC,
          tags: [CACHE_TAGS.CATEGORY(slug)],
        },
      }
    );

    if (!response.ok) return null;

    const result: CategoryResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
});

export const fetchCategories = cache(async () => {
  const res = await fetch(
    `${API_BASE_URL}/site/categories?domain_id=${DOMAIN_ID}`,
    {
      next: {
        revalidate: REVALIDATE_TIMES.STATIC, // 24 hours
        tags: [CACHE_TAGS.CATEGORIES],
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
  return (await res.json()).data as Category[];
});

// Client-side fetch function
export const fetchCategoriesClient = async () => {
  const res = await fetch("/api/categories");
  return (await res.json()).data as Category[];
};
