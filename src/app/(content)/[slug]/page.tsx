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
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

// Configure default metadata base
const METADATA_BASE = new URL(DOMAIN_URL);
const PostDetail = dynamic(() => import("@modules/content/PostDetail"), {
  ssr: true,
});
const CategoryPage = dynamic(() => import("@modules/content/CategoryPage"), {
  ssr: true,
});

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const [post, category] = await Promise.all([
      fetchPostBySlug(slug),
      fetchCategoryBySlug(slug),
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
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || DEFAULT_LIMIT;
  const sort_name =
    (resolvedSearchParams.sort_name as string) || DEFAULT_SORT_FIELD;
  const sort_by =
    (resolvedSearchParams.sort_by as "asc" | "desc") || DEFAULT_SORT_DIRECTION;

  try {
    // Fetch song song cả post và category
    const [post, categoryWithSidebar] = await Promise.all([
      fetchPostBySlug(slug),
      Promise.all([
        fetchCategoryBySlug(slug, { page, limit, sort_name, sort_by }),
        fetchSidebarData(SIDEBAR_POSTS_LIMIT),
      ]),
    ]);

    if (post) {
      return <PostDetail post={post} />;
    }

    const [category, sidebarData] = categoryWithSidebar;
    if (category) {
      return <CategoryPage category={category} sidebarData={sidebarData} />;
    }
  } catch (error) {
    console.error("Error loading page content:", error);
  }

  return notFound();
}
