import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { cache } from "react";
import type { MenuItem, MenuResponse } from "types/menu";

// Base fetch function với cache và error handling
const fetchMenuData = async (type: "main" | "mobile"): Promise<MenuItem[]> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/site/menu?type=${type}&domain_id=${DOMAIN_ID}`,
      {
        next: {
          revalidate: 600, // 10 phút
          tags: [`menu-${type}`],
        },
      }
    );

    if (!res.ok) {
      console.error(`Lỗi API Menu (${type}):`, res.status, res.statusText);
      return [];
    }

    const result: MenuResponse = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error(`Lỗi fetchMenuData (${type}):`, error);
    return [];
  }
};

// Cache riêng cho từng loại menu
export const fetchMainMenu = cache(async (): Promise<MenuItem[]> => {
  return fetchMenuData("main");
});

export const fetchMobileMenu = cache(async (): Promise<MenuItem[]> => {
  return fetchMenuData("mobile");
});
