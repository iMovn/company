import { REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { Post, PostResponse } from "types/post";

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout sau 5s
    const response = await fetch(
      `${API_BASE_URL}/site/post?slug=${slug}&domain_id=${DOMAIN_ID}`,
      {
        signal: controller.signal,
        next: {
          revalidate: REVALIDATE_TIMES.DYNAMIC, // 1 hour
          tags: [`post-${slug}`],
        },
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: PostResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
