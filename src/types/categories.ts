// Base interfaces
export interface User {
  id: number;
  name: string;
}

export interface CategoryPivot {
  post_id: number;
  category_id: number;
}

export interface PostCategory {
  id: number;
  name: string;
  pivot: CategoryPivot;
}

export interface Post {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  user_id: number;
  created_at: string;
  image_url?: string;
  categories: PostCategory[];
  users: User;
}

// Pagination interfaces
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Category interfaces
export interface BaseCategory {
  id: number;
  name: string;
  slug: string;
  is_active: number;
  parent_id: number | null;
  created_at: string;
}

export interface Category extends BaseCategory {
  children: Category[];
}

export interface CategoryDetails extends BaseCategory {
  description?: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  canonical?: string;
  image_url?: string;
  children: Category[];
}

// Breadcrumb interface
export interface Breadcrumb {
  name: string;
  slug: string;
  is_active: boolean;
}

// Main response interfaces
export interface CategoryData {
  details: CategoryDetails;
  breadcrumbs: Breadcrumb[];
  items: PaginatedData<Post>;
  categories: Category[];
}

export interface CategoryResponse {
  status: boolean;
  message: string;
  data: CategoryData;
}

// Query parameters interfaces
export interface CategoryQueryParams {
  slug?: string;
  category_id?: number;
  domain_id?: number;
  page?: number;
  per_page?: number;
  search?: string;
}

export interface PostQueryParams {
  slug?: string;
  category_id?: number;
  domain_id?: number;
  page?: number;
  limit?: number;
  sort?: "newest" | "oldest" | "popular";
  status?: "active" | "inactive" | "all";
}

// Utility types
export type CategoryTree = Category[];
export type PostList = Post[];
export type CategoryWithPosts = CategoryDetails & {
  posts: PaginatedData<Post>;
};

// API Error types
export interface ApiError {
  status: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// Filter and sort types
export interface CategoryFilters {
  search?: string;
  parent_id?: number;
  is_active?: boolean;
  has_posts?: boolean;
}

export interface PostFilters {
  category_id?: number;
  user_id?: number;
  date_from?: string;
  date_to?: string;
  has_image?: boolean;
}

// SEO and metadata types
export interface SEOData {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  image?: string;
  type?: "article" | "website" | "category";
}

export interface CategorySEO extends CategoryDetails {
  seo: SEOData;
  posts_count: number;
  latest_post?: Post;
}
