import { CACHE_TAGS, REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { cache } from "react";
import { PostsApiResponse } from "types/all-posts";
import { Category, CategoryResponse } from "types/categories";

// Validate required config
const validateConfig = () => {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured");
  }
  if (!DOMAIN_ID) {
    throw new Error("DOMAIN_ID is not configured");
  }
};

// Fetch bài viết mới nhất
export const fetchRecentPosts = cache(async (limit: number = 5) => {
  try {
    validateConfig();

    const queryParams = new URLSearchParams({
      sort_name: "desc",
      sort_by: "created_at",
      page: "1",
      domain_id: DOMAIN_ID!,
      limit: Math.max(1, Math.min(20, limit)).toString(), // Giới hạn từ 1-20
    });

    const response = await fetch(
      `${API_BASE_URL}/site/posts?${queryParams.toString()}`,
      {
        next: {
          revalidate: REVALIDATE_TIMES.DYNAMIC,
          tags: [CACHE_TAGS.POSTS, "recent-posts"],
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch recent posts: ${response.status} ${response.statusText}`
      );

      return [];
    }

    const result: PostsApiResponse = await response.json();

    if (!result.status) {
      console.error("API returned error:", result.message);
      return [];
    }

    return result.data.data;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
});

// Fetch All Categoreis Post
export const fetchAllCategories = cache(async (): Promise<Category[]> => {
  try {
    validateConfig();

    const queryParams = new URLSearchParams({
      type: "post",
      domain_id: DOMAIN_ID!,
    });

    const response = await fetch(
      `${API_BASE_URL}/site/category?${queryParams.toString()}`,
      {
        next: {
          revalidate: REVALIDATE_TIMES.STATIC, // Categories ít thay đổi hơn
          tags: [CACHE_TAGS.CATEGORIES, "all-categories"],
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch categories: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const result: CategoryResponse = await response.json();

    // Validate response structure
    if (!result || typeof result.status !== "boolean") {
      console.error("Invalid response structure from API");
      return [];
    }

    if (!result.status) {
      console.error("API returned error:", result.message);
      return [];
    }

    return result.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
});

// Fetch dữ liệu sidebar (kết hợp cả hai List danh mục _ bài viết mới nhất)
export const fetchSidebarData = cache(async (recentPostsLimit: number = 5) => {
  try {
    const [categories, recentPosts] = await Promise.all([
      fetchAllCategories(),
      fetchRecentPosts(recentPostsLimit),
    ]);

    return {
      categories,
      recentPosts,
    };
  } catch (error) {
    console.error("Error fetching sidebar data:", error);
    return {
      categories: [],
      recentPosts: [],
    };
  }
});

// Helper function để lọc danh mục cha
export const getParentCategories = (categories: Category[]): Category[] => {
  return categories.filter((category) => category.parent_id === null);
};

// Helper function để lấy danh mục con
export const getChildCategories = (
  categories: Category[],
  parentId: number
): Category[] => {
  return categories.filter((category) => category.parent_id === parentId);
};
