import { REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import { cache } from "react";
import type { SettingResponse, SettingsData } from "types/setting";

// Tách hàm fetch nguyên bản
const fetchSettingsData = async (): Promise<SettingsData> => {
  const response = await fetch(
    `${API_BASE_URL}/site/settings?domain_id=${DOMAIN_ID}`,
    {
      next: {
        revalidate: REVALIDATE_TIMES.DYNAMIC,
        tags: ["site-settings"],
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Lỗi gọi API Settings:",
      response.status,
      response.statusText
    );
    throw new Error(`API error: ${response.status}`);
  }

  const result: SettingResponse = await response.json();
  return result.data || [];
};

// Áp dụng cache ở mức cao nhất
export const fetchSettings = cache(fetchSettingsData);
