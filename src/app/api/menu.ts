import { MenuItem, MenuResponse, MenuType } from "@/types/menu";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");

// Biến đổi DOMAIN_ID từ string sang number
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;
const DEFAULT_DOMAIN_ID =
  typeof DOMAIN_ID === "string" ? parseInt(DOMAIN_ID, 10) : 20;

/**
 * Cache lưu trữ kết quả menu đã fetch
 */
const menuCache: Record<
  string,
  {
    data: MenuItem[];
    timestamp: number;
  }
> = {};

/**
 * Thời gian cache hết hạn (miligiây)
 */
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 phút

/**
 * Lấy menu từ API
 * @param type Loại menu (main, footer, social)
 * @param domainId ID của domain
 * @param useCache Có sử dụng cache hay không
 * @returns Danh sách menu items
 */

export async function getMenu(
  type: MenuType = "main",
  domainId: number = DEFAULT_DOMAIN_ID,
  useCache: boolean = true
): Promise<MenuItem[]> {
  try {
    // Tạo cache key
    const cacheKey = `${type}_${domainId}`;

    // Kiểm tra cache nếu được yêu cầu
    if (useCache && menuCache[cacheKey]) {
      const cachedData = menuCache[cacheKey];
      const now = Date.now();

      // Kiểm tra cache còn hiệu lực
      if (now - cachedData.timestamp < CACHE_EXPIRY) {
        return cachedData.data;
      }
    }
    // Fetch dữ liệu từ API
    const response = await fetch(
      `${API_BASE_URL}/site/menu?type=${type}&domain_id=${domainId}`,
      { next: { revalidate: 300 } } // Revalidate mỗi 5 phút
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result: MenuResponse = await response.json();

    if (!result.status) {
      throw new Error(result.message);
    }

    // Thêm vào cache
    menuCache[cacheKey] = {
      data: result.data,
      timestamp: Date.now(),
    };

    return result.data;
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return [];
  }
}

/**
 * Lấy menu chính
 * @returns Danh sách menu items
 */
export const getMainMenu = () => getMenu("main");

// /**
//  * Lấy menu footer
//  * @returns Danh sách menu items
//  */
// export const getFooterMenu = () => getMenu("footer");

// /**
//  * Lấy menu social
//  * @returns Danh sách menu items
//  */
// export const getSocialMenu = () => getMenu("social");
