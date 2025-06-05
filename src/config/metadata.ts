// src/config/metadata.ts
import { Metadata } from "next";
import { CategoryData } from "types/categories";
import { Post } from "types/post";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const METADATA_BASE = new URL(SITE_URL);

export const defaultMetadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: "iMovn - Digital Marketing Solutions",
    template: "%s | iMovn",
  },
  description: "Chuyên gia Digital Marketing hàng đầu Việt Nam",
  applicationName: "iMovn",
  keywords: [
    "digital marketing",
    "thiết kế website",
    "SEO",
    "quảng cáo Facebook",
    "Google Ads",
  ],
  creator: "iMovn Team",
  publisher: "iMovn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "iMovn",
    locale: "vi_VN",
    url: SITE_URL,
    images: [
      {
        url: new URL("/images/placeholder.png", METADATA_BASE).toString(),
        width: 1200,
        height: 630,
        alt: "iMovn Digital Marketing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iMovn - Digital Marketing Solutions",
    description: "Chuyên gia Digital Marketing hàng đầu Việt Nam",
    images: [new URL("/images/placeholder.png", METADATA_BASE).toString()],
  },
};

export function buildPostMetadata(post: Post, slug: string): Metadata {
  return {
    ...defaultMetadata,
    title: post.meta_title || post.name,
    description:
      post.meta_description || post.description || defaultMetadata.description,
    alternates: {
      canonical: post.canonical || `${SITE_URL}/${slug}`,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: post.meta_title || post.name,
      description:
        post.meta_description ||
        post.description ||
        defaultMetadata.description ||
        "Add new description!",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.users ? [post.users.name] : [],
      tags: post.categories?.map((c) => c.name) || [],
      ...(post.image_url && {
        images: [
          {
            url: new URL(post.image_url, METADATA_BASE).toString(),
            width: 1200,
            height: 630,
            alt: post.name,
          },
        ],
      }),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: post.meta_title || post.name,
      description:
        post.meta_description ||
        post.description ||
        defaultMetadata.description ||
        "Add new description!",
      ...(post.image_url && {
        images: [new URL(post.image_url, METADATA_BASE).toString()],
      }),
    },
    other: {
      "article:published_time": post.created_at,
      "article:modified_time": post.updated_at,
      ...(post.users && { "article:author": post.users.name }),
      ...buildPostSchemaMarkup(post, slug),
    },
  };
}

export function buildCategoryMetadata(
  category: CategoryData,
  slug: string
): Metadata {
  return {
    ...defaultMetadata,
    title: category.details.meta_title || category.details.name,
    description:
      category.details.meta_description ||
      category.details.description ||
      defaultMetadata.description,
    alternates: {
      canonical: category.details.canonical || `${SITE_URL}/${slug}`,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: category.details.meta_title || category.details.name,
      description:
        category.details.meta_description ||
        category.details.description ||
        defaultMetadata.description ||
        "Add new description!",
      ...(category.details.image_url && {
        images: [
          {
            url: new URL(category.details.image_url, METADATA_BASE).toString(),
            width: 1200,
            height: 630,
            alt: category.details.name,
          },
        ],
      }),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: category.details.meta_title || category.details.name,
      description:
        category.details.meta_description ||
        category.details.description ||
        defaultMetadata.description ||
        "Add new description!",
      ...(category.details.image_url && {
        images: [new URL(category.details.image_url, METADATA_BASE).toString()],
      }),
    },
    other: {
      ...buildCategorySchemaMarkup(category, slug),
    },
  };
}

export function buildPostSchemaMarkup(post: Post, slug: string) {
  return {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.name,
      description: post.description,
      url: `${SITE_URL}/${slug}`,
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

export function buildCategorySchemaMarkup(
  category: CategoryData,
  slug: string
) {
  return {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: category.details.name,
      description: category.details.description,
      url: `${SITE_URL}/${slug}`,
      ...(category.breadcrumbs && {
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: category.breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}/${item.slug}`,
          })),
        },
      }),
    }),
  };
}
