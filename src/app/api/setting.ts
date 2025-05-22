import { SettingsData } from "@/types/setting";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_BASE_URL) throw new Error("NEXT_PUBLIC_API_URL chưa được cấu hình!");

// Biến đổi DOMAIN_ID từ string sang number
const DOMAIN_ID = process.env.NEXT_PUBLIC_DOMAIN_ID;

export async function fetchSettings(): Promise<SettingsData>{
      try {
      const response = await fetch(
        `${API_BASE_URL}/site/settings?domain_id=${DOMAIN_ID}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const result = await response.json();
    return result.data;
    } catch (error) {
      console.error("Lỗi khi lấy logo:", error);
      throw error;
    }
  };
