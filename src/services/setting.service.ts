import { API_BASE_URL, DOMAIN_ID } from "@shared/constants/global";
import { SettingResponse, SettingsData } from "@shared/types/setting";

export async function fetchSettings(): Promise<SettingsData> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/site/settings?domain_id=${DOMAIN_ID}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      console.error("Lỗi gọi API Menu:", response.status, response.statusText);
      throw new Error(`API error: ${response.status}`);
    }
    const result: SettingResponse = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy logo:", error);
    throw error;
  }
}
