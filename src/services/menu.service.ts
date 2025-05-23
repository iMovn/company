import { API_BASE_URL, DOMAIN_ID } from "@shared/constants/global";
import { MenuItem, MenuResponse } from "@shared/types/menu";

/**
 * Fetch menu riêng cho Desktop device
 * Được tách riêng để tối ưu UX trên PC
 * @returns Promise<MenuItem[]> - Danh sách menu items cho PC
 */
export async function fetchMainMenu(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/menu?type=main&domain_id=${DOMAIN_ID}`,
      {
        next: { revalidate: 600 },
      }
    );

    if (!res.ok) {
      console.error("Lỗi gọi API Menu:", res.status, res.statusText);
      return [];
    }

    const result: MenuResponse = await res.json();

    // Kiểm tra xem có data và không rỗng
    if (!result.data || result.data.length === 0) {
      console.log("Main menu rỗng hoặc không tồn tại");
      return [];
    }

    console.log("Fetch Main menu thành công:", result.data.length, "items");

    return result.data || [];
  } catch (error) {
    console.error("Lỗi fetchMainMenu:", error);
    return [];
  }
}

/**
 * Fetch menu riêng cho mobile device
 * Được tách riêng để tối ưu UX trên mobile
 * @returns Promise<MenuItem[]> - Danh sách menu items cho mobile
 */

export async function fetchMobileMenu(): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/menu?type=mobile&domain_id=${DOMAIN_ID}`,
      {
        next: { revalidate: 600 },
      }
    );

    if (!res.ok) {
      console.error("Lỗi gọi API Mobile Menu:", res.status, res.statusText);
      return [];
    }

    const result: MenuResponse = await res.json();

    // Kiểm tra xem có data và không rỗng
    if (!result.data || result.data.length === 0) {
      console.log("Mobile menu rỗng hoặc không tồn tại");
      return [];
    }

    console.log("Fetch mobile menu thành công:", result.data.length, "items");
    return result.data;
  } catch (error) {
    console.error("Lỗi fetchMobileMenu:", error);
    return [];
  }
}
