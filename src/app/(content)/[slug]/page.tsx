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
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { CategoryData } from "types/categories";

import { Post } from "types/post";

// Lazy load components để giảm initial bundle
const CategoryPage = dynamic(() => import("@modules/content/CategoryPage"));
const PostDetail = dynamic(() => import("@modules/content/PostDetail"));

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get all resolved parameters at once
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
    title: "Không tìm thấy nội dung",
    description: "Trang bạn yêu cầu không tồn tại",
    robots: {
      index: false,
      follow: false,
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
    // Sử dụng Promise.all để fetch song song cả post, category và sidebar data
    const [post, category, sidebarData] = await Promise.all([
      fetchPostBySlug(slug).catch(() => null),
      fetchCategoryBySlug(slug, categoryOptions).catch(() => null),
      fetchSidebarData(SIDEBAR_POSTS_LIMIT).catch(),
    ]);

    if (post) return <PostDetail post={post} />;
    if (category)
      return <CategoryPage category={category} sidebarData={sidebarData} />;
  } catch (error) {
    console.error("Error loading page content:", error);
  }

  return notFound();
}

// Helper functions for metadata
function buildPostMetadata(post: Post, slug: string): Metadata {
  const images = post.image_url ? [{ url: new URL(post.image_url) }] : [];

  return {
    title: post.meta_title || post.name,
    description: post.meta_description || post.description || "",
    alternates: {
      canonical: post.canonical || `${DOMAIN_URL}/${slug}`,
    },
    openGraph: {
      title: post.meta_title || post.name,
      description: post.meta_description || post.description || "",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.users ? [post.users.name] : [],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title || post.name,
      description: post.meta_description || post.description || "",
      images,
    },
  };
}

function buildCategoryMetadata(category: CategoryData, slug: string): Metadata {
  const { details } = category;
  const defaultImage = `${DOMAIN_URL}/images/placeholder.png`;

  return {
    title: details.meta_title || details.name,
    description: details.meta_description || details.description || "",
    alternates: {
      canonical: details.canonical || `${DOMAIN_URL}/${slug}`,
    },
    openGraph: {
      title: details.meta_title || details.name,
      description: details.meta_description || details.description || "",
      type: "website",
      images: [{ url: defaultImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: details.meta_title || details.name,
      description: details.meta_description || details.description || "",
      images: [{ url: defaultImage }],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: details.meta_title || details.name,
        description: details.meta_description || details.description || "",
        url: `${DOMAIN_URL}/${slug}`,
        ...(category.breadcrumbs && {
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: category.breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: `${DOMAIN_URL}/${item.slug}`,
            })),
          },
        }),
      }),
    },
  };
}
