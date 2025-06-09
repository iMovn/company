// lib/api/setting.service.ts
import { REVALIDATE_TIMES } from "lib/constants/cache-tags";
import { API_BASE_URL, DOMAIN_ID } from "lib/constants/global";
import type { SettingResponse, SettingsData } from "types/setting";

export async function fetchSettings(): Promise<SettingsData> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout sau 5s
    const response = await fetch(
      `${API_BASE_URL}/site/settings?domain_id=${DOMAIN_ID}`,
      {
        signal: controller.signal,
        next: {
          revalidate: REVALIDATE_TIMES.DYNAMIC,
          tags: ["site-settings"],
        },
      }
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch settings: ${response.status}`);
    }

    const result: SettingResponse = await response.json();

    if (!result.data) {
      throw new Error("Invalid settings data structure");
    }

    // Transform data to match your Typescript interface
    return {
      seo: {
        meta_title: result.data.seo?.meta_title || "",
        canonical: result.data.seo?.canonical || "",
        meta_author: result.data.seo?.meta_author || "",
        meta_description: result.data.seo?.meta_description || "",
        meta_og_title: result.data.seo?.meta_og_title || "",
        meta_og_description: result.data.seo?.meta_og_description || "",
        meta_og_type: result.data.seo?.meta_og_type || "",
        meta_og_locale: result.data.seo?.meta_og_locale || "",
        meta_og_url: result.data.seo?.meta_og_url || "",
        meta_og_site_name: result.data.seo?.meta_og_site_name || "",
        meta_og_image: result.data.seo?.meta_og_image || "",
        meta_og_image_alt: result.data.seo?.meta_og_image_alt || "",
        google_analytics: result.data.seo?.google_analytics || "",
        google_ads: result.data.seo?.google_ads || "",
        google_search_console: result.data.seo?.google_search_console || "",
        schema: result.data.seo?.schema || "",
        // Add any missing fields from your interface
      },
      content: {
        content: result.data.content?.content || "",
      },
      company: {
        name: result.data.company?.name || "",
        phone: result.data.company?.phone || "",
        email: result.data.company?.email || "",
        hotline: result.data.company?.hotline || "",
        address: result.data.company?.address || "",
        copyright: result.data.company?.copyright || "",
        description: result.data.company?.description || "",
        fanpage: result.data.company?.fanpage || "",
        website: result.data.company?.website || "",
        link_map: result.data.company?.link_map || "",
        link_google_business: result.data.company?.link_google_business || "",
        map: result.data.company?.map || "",
      },
      logo: result.data.logo || "",
      favicon: result.data.favicon || "",
      home_avatar: result.data.home_avatar || "",
    };
  } catch (error) {
    console.error("Error fetching settings:", error);

    // Return default empty values if error occurs
    return {
      seo: {
        meta_title: "",
        canonical: "",
        meta_author: "",
        meta_description: "",
        meta_og_title: "",
        meta_og_description: "",
        meta_og_type: "",
        meta_og_locale: "",
        meta_og_url: "",
        meta_og_site_name: "",
        meta_og_image: "",
        meta_og_image_alt: "",
        google_analytics: "",
        google_ads: "",
        google_search_console: "",
        schema: "",
      },
      content: {
        content: "",
      },
      company: {
        name: "",
        phone: "",
        email: "",
        hotline: "",
        address: "",
        copyright: "",
        description: "",
        fanpage: "",
        website: "",
        link_map: "",
        link_google_business: "",
        map: "",
      },
      logo: "",
      favicon: "",
      home_avatar: "",
    };
  }
}
