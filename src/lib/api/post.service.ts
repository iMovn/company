import { REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { Post, PostResponse } from "types/post";

export const fetchPostBySlug = cache(
  unstable_cache(
    async (slug: string): Promise<Post | null> => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/site/post?slug=${slug}&domain_id=${DOMAIN_ID}`,
          {
            next: {
              revalidate: REVALIDATE_TIMES.POST, // 1 hour
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
    },
    ["post-by-slug"],
    { revalidate: 3600 }
  )
);
