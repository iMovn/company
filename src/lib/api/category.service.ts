import { CACHE_TAGS, REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { cache } from "react";
import { CategoryResponse } from "types/categories";

// Interface for category query parameters
interface CategoryQueryOptions {
  page?: number;
  limit?: number;
  sort_name?: string;
  sort_by?: "asc" | "desc";
}

// Utility function to validate required environment variables
const validateRequiredConfig = () => {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured");
  }
  if (!DOMAIN_ID) {
    throw new Error("DOMAIN_ID is not configured");
  }
};

export const fetchCategoryBySlug = cache(
  async (slug: string, options: CategoryQueryOptions = {}) => {
    try {
      // Validate configuration - kiểm tra tất cả config cần thiết
      validateRequiredConfig();

      const {
        page = 1,
        limit = 9,
        sort_name = "id",
        sort_by = "desc",
      } = options;

      // Validate inputs
      if (!slug || slug.trim() === "") {
        console.error("Invalid slug provided");
        return null;
      }

      if (page < 1 || limit < 1) {
        console.error("Invalid pagination parameters.");
        return null;
      }

      const queryParams = new URLSearchParams({
        type: "post",
        slug: slug.trim(),
        domain_id: DOMAIN_ID!, // Using non-null assertion after validation
        page: Math.max(1, page).toString(),
        limit: Math.max(1, Math.min(100, limit)).toString(), // Limit max to 100 (Giới hạn limit tối đa để tránh quá tải API)
        sort_name,
        sort_by,
      });

      const url = `${API_BASE_URL}/site/category?${queryParams.toString()}`;

      const response = await fetch(url, {
        next: {
          revalidate: REVALIDATE_TIMES.DYNAMIC,
          tags: [CACHE_TAGS.CATEGORY(slug), `category-${slug}-page-${page}`],
        },
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch category: ${response.status} ${response.statusText}`
        );
        return null;
      }

      const result: CategoryResponse = await response.json();

      // Validate response structure
      if (!result || typeof result.status !== "boolean") {
        console.error("Invalid response structure from API.");
        return null;
      }

      if (!result.status) {
        console.error("API returned error:", result.message);
        return null;
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  }
);

// Helper function để tạo cache key dựa trên options
export const getCategoryCacheKey = (
  slug: string,
  options: CategoryQueryOptions = {}
) => {
  const { page = 1, limit = 9, sort_name = "id", sort_by = "desc" } = options;
  return `category-${slug}-${page}-${limit}-${sort_name}-${sort_by}`;
};

// Function để prefetch trang tiếp theo (optional)
export const prefetchNextPage = async (
  slug: string,
  currentPage: number,
  options: CategoryQueryOptions = {}
) => {
  const nextPageOptions = { ...options, page: currentPage + 1 };
  return fetchCategoryBySlug(slug, nextPageOptions);
};
