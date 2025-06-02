export interface Post {
  id: number;
  name: string;
  slug: string;
  description: string;
  content: string;
  views: number;
  image: string;
  image_url: string;
  status: number;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  toc?: string;
  categories: {
    id: number;
    name: string;
    slug: string;
    pivot: {
      post_id: number;
      category_id: number;
    };
  }[];
  related_posts: RelatedPost[];
  breadcrumbs: Breadcrumb[];
  users: {
    id: number;
    name: string;
    email: string;
  };
}

export interface RelatedPost {
  id: number;
  name: string;
  slug: string;
  image: string;
  image_url: string;
  description: string;
  created_at: string;
  categories: {
    id: number;
    name: string;
    slug: string;
    pivot: {
      post_id: number;
      category_id: number;
    };
  }[];
}

export interface Breadcrumb {
  name: string;
  slug: string;
  is_active: boolean;
}

export interface PostResponse {
  status: boolean;
  message: string;
  data: Post;
}
