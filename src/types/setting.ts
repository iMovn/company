export interface SettingResponse {
  status: boolean;
  message: string;
  data: SettingsData;
}
export interface SeoMeta {
  meta_title?: string;
  canonical?: string;
  meta_author?: string;
  meta_description?: string;
  meta_fb_app_id?: string;
  meta_fb_admins?: string;
  meta_og_locale?: string;
  meta_og_title?: string;
  meta_og_type?: string;
  meta_og_url?: string;
  meta_og_image?: string;
  meta_og_image_alt?: string;
  meta_og_site_name?: string;
  meta_og_description?: string;
  google_analytics?: string;
  google_ads?: string;
  google_search_console?: string;
  schema?: string;
}

export interface Content {
  content?: string;
}

export interface CompanyInfo {
  name?: string;
  phone?: string;
  email?: string;
  hotline?: string;
  address?: string;
  zalo?: string;
  copyright?: string;
  description?: string;
  fanpage?: string;
  website?: string;
  instagram?: string;
  link_icon?: string;
  link_map?: string;
  iframe_facebook?: string;
  link_google_business?: string;
  map?: string;
}

export interface SettingsData {
  seo: SeoMeta;
  content: Content;
  company: CompanyInfo;
  logo: string;
  favicon: string;
  home_avatar: string;
}
