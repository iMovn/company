import { MenuItem } from "@/types/menu";

/**
 * Map các mô tả cho menu items
 */
export const menuDescriptions: Record<string, string> = {
  // Services & child items
  services: "Our professional services and expertise",
  development: "Custom websites built with modern technologies",
  growth: "Strategic marketing campaigns to grow your business",
  design: "User-centered design solutions and creative services",

  // Web Development specific
  "web-development": "Professional websites with responsive design",
  "mobile-development": "Native and cross-platform mobile applications",
  "api-development": "RESTful and GraphQL API development",
  backend: "Scalable backend systems and database integration",

  // Growth specific
  seo: "Search engine optimization to improve visibility",
  "digital-marketing": "Multi-channel digital marketing strategies",
  "social-media": "Social media management and growth",
  "content-marketing": "Content strategy and creation for brand growth",

  // Design specific
  "ui-ux": "User interface and experience design",
  "brand-identity": "Brand identity creation and refinement",
  "graphic-design": "Professional graphic design services",

  // Main menu items
  work: "Case studies and project showcase",
  "about-us": "Learn more about our company and team",
  about: "Learn more about our company and team",
  blog: "News, insights and industry updates",
};

/**
 * Lấy mô tả cho menu item
 */
export function getMenuItemDescription(item: MenuItem): string {
  // Thử từ link và tên
  const linkParts = item.link.toLowerCase().split("/");
  const linkEnd = linkParts[linkParts.length - 1];
  const nameLower = item.name.toLowerCase();

  return (
    menuDescriptions[linkEnd] ||
    menuDescriptions[nameLower] ||
    `${item.name} services and solutions`
  );
}

/**
 * Tạo URL đầy đủ từ menu item
 */
export function getItemUrl(item: MenuItem, parentUrl: string = ""): string {
  // Nếu là URL tuyệt đối hoặc external
  if (item.link.startsWith("/") || item.link.startsWith("http")) {
    return item.link;
  }

  // Kết hợp với URL cha
  const baseUrl = parentUrl.endsWith("/") ? parentUrl : `${parentUrl}/`;
  return `${baseUrl}${item.link}`;
}

/**
 * Kiểm tra menu item có active hay không
 */
export function isActive(item: MenuItem): boolean {
  return item.is_active === 1;
}

/**
 * Fallback data cho menu chính
 */
export const fallbackMainMenu: MenuItem[] = [
  {
    id: 111,
    name: "Trang chủ",
    link: "/",
    is_active: 1,
    type: "main",
    icon: null,
    children: [],
  },
  {
    id: 112,
    name: "Services",
    link: "services",
    is_active: 1,
    type: "main",
    icon: null,
    children: [
      {
        id: 113,
        name: "Development",
        link: "development",
        is_active: 1,
        parent_id: 112,
        type: "main",
        sort: 1,
        icon: "code",
        children: [],
      },
      {
        id: 114,
        name: "Growth",
        link: "growth",
        is_active: 1,
        parent_id: 112,
        type: "main",
        sort: 2,
        icon: "bar-chart",
        children: [],
      },
      {
        id: 115,
        name: "Design",
        link: "design",
        is_active: 1,
        parent_id: 112,
        type: "main",
        sort: 3,
        icon: "pen-tool",
        children: [],
      },
    ],
  },
  {
    id: 116,
    name: "Work",
    link: "work",
    is_active: 1,
    type: "main",
    icon: null,
    children: [],
  },
  {
    id: 117,
    name: "About",
    link: "about-us",
    is_active: 1,
    type: "main",
    icon: null,
    children: [],
  },
  {
    id: 119,
    name: "Blog",
    link: "blog",
    is_active: 1,
    type: "main",
    icon: null,
    children: [],
  },
];
