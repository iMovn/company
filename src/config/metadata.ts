// src/config/metadata.ts
import { fetchSettings } from "lib/api/setting.service";
import { Metadata } from "next";
import { CategoryData } from "types/categories";
import { Post } from "types/post";

const SITE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const METADATA_BASE = new URL(SITE_URL);

const settings = await fetchSettings();
const { seo, company, logo, favicon, home_avatar } = settings;

export const defaultMetadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default:
      seo.meta_title || seo.meta_og_title || company.name || "Title Default",
    template: `%s`,
  },
  description:
    settings.seo.meta_description ||
    settings.seo.meta_og_description ||
    company.description ||
    "Description Default",
  alternates: {
    canonical: seo.canonical || `${SITE_URL}`,
  },
  applicationName:
    seo.meta_title ||
    seo.meta_og_title ||
    company.name ||
    "Application Name Default",
  creator: seo.meta_author || "Author Team Default",
  publisher: seo.meta_author || "Publisher Default",
  formatDetection: {
    email: !!company.email,
    address: !!company.address,
    telephone: !!company.phone,
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
    icon: favicon || "/favicon.ico",
    shortcut: favicon || "/favicon-16x16.ico",
    apple: logo || "/apple-touch-icon.ico",
  },
  openGraph: {
    type: "website",
    siteName: seo.meta_og_site_name || company.name || "Site Name Default",
    locale: seo.meta_og_locale || "vi_VN",
    url: seo.meta_og_url || SITE_URL,
    images: [
      {
        url: new URL(
          home_avatar || seo.meta_og_image || logo || "/images/placeholder.png",
          METADATA_BASE
        ).toString(),
        width: 1200,
        height: 630,
        alt:
          seo.meta_og_image_alt ||
          seo.meta_og_title ||
          company.name ||
          "alt-image-default",
      },
    ],
    description:
      seo.meta_og_description ||
      seo.meta_description ||
      "Meta Description openGraph Default",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.meta_og_title || company.name || "Twitter openGraph Default",
    description:
      seo.meta_og_description ||
      seo.meta_description ||
      "Twitter Description openGraph Default",
    images: [
      new URL(
        seo.meta_og_image || logo || "/images/placeholder.png",
        METADATA_BASE
      ).toString(),
    ],
  },
  verification: {
    google:
      seo.google_search_console || "Verification Google Search Console Default",
  },
};

export function buildPostMetadata(post: Post, slug: string): Metadata {
  const postTitle = post.meta_title || post.name;
  const postDescription =
    post.meta_description || post.description || defaultMetadata.description;
  const postImage = post.image_url || seo.meta_og_image || logo;
  return {
    ...defaultMetadata,
    title: postTitle,
    description: postDescription || "Add new description!",
    alternates: {
      canonical: post.canonical || `${SITE_URL}/${slug}`,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: postTitle,
      description: postDescription || "Add new description!",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.users ? [post.users.name] : [],
      tags: post.categories?.map((c) => c.name) || [],
      ...(postImage && {
        images: [
          {
            url: new URL(postImage, METADATA_BASE).toString(),
            width: 1200,
            height: 630,
            alt: postTitle,
          },
        ],
      }),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: postTitle,
      description: postDescription || "Add new description!",
      ...(postImage && {
        images: [new URL(postImage, METADATA_BASE).toString()],
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
  const categoryTitle = category.details.meta_title || category.details.name;
  const categoryDescription =
    category.details.meta_description ||
    category.details.description ||
    defaultMetadata.description ||
    "Add new description category";
  const categoryImage = category.details.image_url || seo.meta_og_image || logo;
  return {
    ...defaultMetadata,
    title: categoryTitle,
    description: categoryDescription,
    alternates: {
      canonical: category.details.canonical || `${SITE_URL}/${slug}`,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: categoryTitle,
      description: categoryDescription,
      type: "article",
      ...(categoryImage && {
        images: [
          {
            url: new URL(categoryImage, METADATA_BASE).toString(),
            width: 1200,
            height: 630,
            alt: categoryTitle,
          },
        ],
      }),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: categoryTitle,
      description: categoryDescription,
      ...(categoryImage && {
        images: [new URL(categoryImage, METADATA_BASE).toString()],
      }),
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

function buildCategorySchemaMarkup(category: CategoryData, slug: string) {
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
