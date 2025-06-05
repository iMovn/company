import { fetchCategoryBySlug } from "lib/api/category.service";
import { fetchPostBySlug } from "lib/api/post.service";
import { fetchSidebarData } from "lib/api/sidebar.service";
import {
  DEFAULT_LIMIT,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_FIELD,
  DOMAIN_URL,
  SIDEBAR_POSTS_LIMIT,
} from "lib/constants/global";
import { buildCategoryMetadata, buildPostMetadata } from "@config/metadata";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

// Configure default metadata base
const METADATA_BASE = new URL(DOMAIN_URL);

// Lazy load components with proper loading states
const CategoryPage = dynamic(() => import("@modules/content/CategoryPage"), {
  ssr: true, // Keep SSR for SEO
});
const PostDetail = dynamic(() => import("@modules/content/PostDetail"), {
  ssr: true, // Keep SSR for SEO
});

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const [post, category] = await Promise.all([
      fetchPostBySlug(slug).catch(() => null),
      fetchCategoryBySlug(slug).catch(() => null),
    ]);

    if (post) return buildPostMetadata(post, slug);
    if (category) return buildCategoryMetadata(category, slug);
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    metadataBase: METADATA_BASE,
    title: "Không tìm thấy nội dung",
    description: "Trang bạn yêu cầu không tồn tại",
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${DOMAIN_URL}/${slug}`,
    },
  };
}

export default async function ContentPage({ params, searchParams }: Props) {
  // Get all resolved parameters at once
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // Extract pagination parameters
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page as string)
    : 1;
  const limit = resolvedSearchParams.limit
    ? parseInt(resolvedSearchParams.limit as string)
    : DEFAULT_LIMIT;
  const sort_name =
    (resolvedSearchParams.sort_name as string) || DEFAULT_SORT_FIELD;
  const sort_by =
    (resolvedSearchParams.sort_by as "asc" | "desc") || DEFAULT_SORT_DIRECTION;

  // Category query options
  const categoryOptions = {
    page,
    limit,
    sort_name,
    sort_by,
  };

  try {
    const post = await fetchPostBySlug(slug);
    if (post) {
      return <PostDetail post={post} />;
    }

    const [category, sidebarData] = await Promise.all([
      fetchCategoryBySlug(slug, categoryOptions),
      fetchSidebarData(SIDEBAR_POSTS_LIMIT),
    ]);

    if (category) {
      return <CategoryPage category={category} sidebarData={sidebarData} />;
    }
  } catch (error) {
    console.error("Error loading page content:", error);
  }

  return notFound();
}
