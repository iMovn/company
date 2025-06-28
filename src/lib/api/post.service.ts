import { REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { PostItem } from "types/all-posts";
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

export async function fetchNewsPostHome(): Promise<PostItem[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/posts?domain_id=${DOMAIN_ID}&limit=4`,
      { next: { revalidate: 100 } }
    );
    if (!res.ok) throw new Error("Lỗi khi lấy bài viết mới nhất tại footer");

    const data = await res.json();
    return data.data.data || null;
  } catch (error) {
    console.error("Lỗi API News Footer:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
}
