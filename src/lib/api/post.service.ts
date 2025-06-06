import { REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { cache } from "react";
import { Post, PostResponse } from "types/post";

export const fetchPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/site/post?slug=${slug}&domain_id=${DOMAIN_ID}`,
        {
          next: {
            revalidate: REVALIDATE_TIMES.DYNAMIC, // 1 hour
            tags: [`post-${slug}`],
          },
        }
      );

      if (!response.ok) return null;

      const result: PostResponse = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  }
);
