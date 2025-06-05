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

// Configure default metadata base
const METADATA_BASE = new URL(DOMAIN_URL);

// Lazy load components with proper loading states
const CategoryPage = dynamic(() => import("@modules/content/CategoryPage"), {
  loading: () => <div className="min-h-[80vh]">Loading category...</div>,
});

const PostDetail = dynamic(() => import("@modules/content/PostDetail"), {
  loading: () => <div className="min-h-[80vh]">Loading post...</div>,
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
    const [post, category, sidebarData] = await Promise.all([
      fetchPostBySlug(slug).catch(() => null),
      fetchCategoryBySlug(slug, categoryOptions).catch(() => null),
      fetchSidebarData(SIDEBAR_POSTS_LIMIT).catch(() => null),
    ]);

    if (post) return <PostDetail post={post} />;
    if (category)
      return (
        <CategoryPage
          category={category}
          sidebarData={sidebarData ?? undefined}
        />
      );
  } catch (error) {
    console.error("Error loading page content:", error);
  }

  return notFound();
}

function buildPostMetadata(post: Post, slug: string): Metadata {
  const images = post.image_url
    ? [
        {
          url: new URL(post.image_url, METADATA_BASE),
          width: 1200,
          height: 630,
          alt: post.name,
        },
      ]
    : [];

  return {
    metadataBase: METADATA_BASE,
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
      tags: post.categories?.map((c) => c.name) || [],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title || post.name,
      description: post.meta_description || post.description || "",
      images,
      creator: post.users?.name || undefined,
    },
    other: {
      "article:published_time": post.created_at,
      "article:modified_time": post.updated_at,
      ...(post.users && { "article:author": post.users.name }),
      ...buildPostSchemaMarkup(post, slug),
    },
  };
}

function buildCategoryMetadata(category: CategoryData, slug: string): Metadata {
  const { details } = category;
  const defaultImage = {
    url: new URL("/images/placeholder.png", METADATA_BASE),
    width: 1200,
    height: 630,
    alt: details.name,
  };

  return {
    metadataBase: METADATA_BASE,
    title: details.meta_title || details.name,
    description: details.meta_description || details.description || "",
    alternates: {
      canonical: details.canonical || `${DOMAIN_URL}/${slug}`,
    },
    openGraph: {
      title: details.meta_title || details.name,
      description: details.meta_description || details.description || "",
      type: "website",
      images: [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: details.meta_title || details.name,
      description: details.meta_description || details.description || "",
      images: [defaultImage],
    },
    other: {
      ...buildCategorySchemaMarkup(category, slug),
    },
  };
}

function buildPostSchemaMarkup(post: Post, slug: string) {
  return {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.name,
      description: post.description,
      url: `${DOMAIN_URL}/${slug}`,
      datePublished: post.created_at,
      dateModified: post.updated_at,
      ...(post.image_url && {
        image: {
          "@type": "ImageObject",
          url: new URL(post.image_url, METADATA_BASE).toString(),
          width: 1200,
          height: 630,
        },
      }),
      ...(post.users && {
        author: {
          "@type": "Person",
          name: post.users.name,
        },
      }),
      publisher: {
        "@type": "Organization",
        name: "iMovn",
        logo: {
          "@type": "ImageObject",
          url: new URL("/logos/imo-vn-brand.png", METADATA_BASE).toString(),
        },
      },
    }),
  };
}

function buildCategorySchemaMarkup(category: CategoryData, slug: string) {
  return {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.details.name,
      description: category.details.description,
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
  };
}
