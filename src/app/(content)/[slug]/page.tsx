import CategoryPage from "@modules/content/CategoryPage";
import PostDetail from "@modules/content/PostDetail";
import { fetchCategoryBySlug } from "lib/api/category.service";
import { fetchPostBySlug } from "lib/api/post.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Get all resolved parameters at once
  const resolvedParams = await params;

  // Thử lấy post trước
  const post = await fetchPostBySlug(resolvedParams.slug);

  if (post) {
    return {
      title: post.meta_title || post.name,
      description: post.meta_description || post.description,
      alternates: {
        canonical: `/${resolvedParams.slug}`,
      },
      openGraph: {
        images: post.image_url ? [post.image_url] : [],
      },
    };
  }

  // Nếu không phải post, thử lấy category
  const category = await fetchCategoryBySlug(resolvedParams.slug);

  if (category) {
    return {
      title: category.details.name,
      description: category.details.description,
      alternates: {
        canonical: `/${resolvedParams.slug}`,
      },
    };
  }

  return {
    title: "Không tìm thấy nội dung",
    description: "Trang bạn yêu cầu không tồn tại",
  };
}

export default async function ContentPage({ params }: Props) {
  // Get all resolved parameters at once
  const resolvedParams = await params;
  // Sử dụng Promise.all để fetch song song cả post và category
  const [post, category] = await Promise.all([
    fetchPostBySlug(resolvedParams.slug),
    fetchCategoryBySlug(resolvedParams.slug),
  ]);
  if (post) {
    return (
      <div className="container py-8">
        <PostDetail post={post} />
      </div>
    );
  }

  if (category) {
    return (
      <div className="container py-8">
        <CategoryPage category={category} />
      </div>
    );
  }

  // Nếu không tìm thấy cả hai
  return notFound();
}
