import CategoryPage from "@modules/content/CategoryPage";
import PostDetail from "@modules/content/PostDetail";
import { fetchCategoryBySlug } from "lib/api/category.service";
import { fetchPostBySlug } from "lib/api/post.service";
import { fetchSidebarData } from "lib/api/sidebar.service";
import { DOMAIN_URL } from "lib/constants/global";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get all resolved parameters at once
  const resolvedParams = await params;

  // Thử lấy post trước
  const post = await fetchPostBySlug(resolvedParams.slug);

  if (post) {
    return {
      title: post.meta_title || post.name,
      description: post.meta_description || post.description || "",
      alternates: {
        canonical: post.canonical || `${DOMAIN_URL}/${resolvedParams.slug}`,
      },
      openGraph: {
        title: post.meta_title || post.name,
        description: post.meta_description || post.description || "",
        type: "article",
        images: post.image_url ? [post.image_url] : [],
      },
    };
  }

  // Nếu không phải post, thử lấy category
  const category = await fetchCategoryBySlug(resolvedParams.slug);

  if (category) {
    return {
      title: category.details.meta_title || category.details.name,
      description:
        category.details.meta_description || category.details.description || "",
      alternates: {
        canonical:
          category.details.canonical || `${DOMAIN_URL}/${resolvedParams.slug}`,
      },
      openGraph: {
        title: category.details.meta_title || category.details.name,
        description:
          category.details.meta_description ||
          category.details.description ||
          "",
        type: "website",
        images: [
          {
            url: `${DOMAIN_URL}/images/placeholder.png`,
          },
        ],
      },
      // Structured data cho SEO
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.details.meta_title || category.details.name,
          description:
            category.details.meta_description ||
            category.details.description ||
            "",
          url: `${DOMAIN_URL}/${resolvedParams.slug}`,
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: category.breadcrumbs?.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.slug,
            })),
          },
        }),
      },
    };
  }

  return {
    title: "Không tìm thấy nội dung",
    description: "Trang bạn yêu cầu không tồn tại",
  };
}

export default async function ContentPage({ params, searchParams }: Props) {
  // Get all resolved parameters at once
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  // Extract pagination parameters
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page as string)
    : 1;
  const limit = resolvedSearchParams.limit
    ? parseInt(resolvedSearchParams.limit as string)
    : 9;
  const sort_name = (resolvedSearchParams.sort_name as string) || "id";
  const sort_by = (resolvedSearchParams.sort_by as "asc" | "desc") || "desc";

  // Category query options
  const categoryOptions = {
    page,
    limit,
    sort_name,
    sort_by,
  };

  // Sử dụng Promise.all để fetch song song cả post, category và sidebar data
  const [post, category, sidebarData] = await Promise.all([
    fetchPostBySlug(resolvedParams.slug),
    fetchCategoryBySlug(resolvedParams.slug, categoryOptions),
    fetchSidebarData(5),
  ]);
  if (post) {
    return <PostDetail post={post} />;
  }

  if (category) {
    return <CategoryPage category={category} sidebarData={sidebarData} />;
  }

  // Nếu không tìm thấy cả hai
  return notFound();
}
