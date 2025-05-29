// User interface
export interface PostUser {
  id: number;
  name: string;
}

// Domain interface
export interface PostDomain {
  id: number;
  name: string;
}

// Category pivot interface
export interface PostCategoryPivot {
  post_id: number;
  category_id: number;
  is_main: number; // 1 for main category, 0 for secondary
}

// Category interface for posts
export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  pivot: PostCategoryPivot;
}

// Main Post interface
export interface PostItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string | null;
  video: string | null;
  time: string | null;
  views: number;
  favorites: number;
  user_id: number;
  domain_id: number;
  created_at: string;
  image_url: string;
  categories: PostCategory[];
  users: PostUser;
  domains: PostDomain;
}

// Pagination link interface
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Pagination data interface
export interface PostPaginationData {
  current_page: number;
  data: PostItem[];
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

// Main API response interface
export interface PostsApiResponse {
  status: boolean;
  message: string;
  data: PostPaginationData;
}

// Query parameters for posts API
export interface PostsQueryParams {
  sort_name?: "created_at" | "views" | "favorites" | "id" | "name";
  sort_by?: "asc" | "desc";
  page?: number;
  domain_id?: number;
  limit?: number;
  category_id?: number;
  user_id?: number;
  search?: string;
}

// Utility types
export type PostSortField =
  | "created_at"
  | "views"
  | "favorites"
  | "id"
  | "name";
export type SortDirection = "asc" | "desc";

// Type for post list without pagination
export type PostList = PostItem[];

// Type for single post preview (lighter version)
export interface PostPreview {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  description: string | null;
  created_at: string;
  views: number;
  categories: Pick<PostCategory, "name" | "slug">[];
}

// Error response type
export interface PostsApiError {
  status: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Combined response type
export type PostsApiResult = PostsApiResponse | PostsApiError;
