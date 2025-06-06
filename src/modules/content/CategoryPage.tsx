"use client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

// Dynamic imports for heavy components
const PostCard = dynamic(() => import("@modules/content/components/PostCard"));
const CategorySidebar = dynamic(
  () => import("@modules/content/components/CategorySidebar"),
  {
    ssr: true, // vẫn cho SSR vì sidebar quan trọng SEO
    loading: () => (
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Đang tải...</h3>
        <p className="text-sm text-gray-600">Sidebar content</p>
      </div>
    ),
  }
);
const ReadMoreDialog = dynamic(
  () => import("@modules/content/components/ReadMoreDialog"),
  {
    ssr: true, // vẫn cho SSR vì sidebar quan trọng SEO
  }
);

// Static imports for critical components
import { Category, CategoryData } from "types/categories";
import { PostItem } from "types/all-posts";
import Breadcrumb from "@components/common/breadcrumb";
import { Container } from "@components/ui/Containers";
import Pagination from "@components/ui/Pagination";

interface CategoryPageProps {
  category?: CategoryData | null;
  sidebarData?: {
    categories: Category[];
    recentPosts: PostItem[];
  };
}

export default function CategoryPage({
  category,
  sidebarData,
}: CategoryPageProps) {
  if (!category || !category.details) {
    return notFound();
  }

  // Destructuring sau khi đã kiểm tra
  const { details, items, breadcrumbs } = category;

  return (
    <Container size="lg" className="px-0">
      <section className="header-layout-category">
        <Breadcrumb items={breadcrumbs || []} />
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="md:text-6xl text-3xl font-semibold font-archivo mb-3">
            {details.name}
          </h1>
          {details.description && (
            <p className="text-sm italic text-primary/95">
              {details.description}
            </p>
          )}
        </div>
      </section>

      {/* Posts List */}
      <div className="flex flex-col-reverse md:flex-row gap-6 mb-8">
        {/* Sidebar - Non-critical */}
        <aside className="aside-layout-category md:w-[30%] w-full">
          <div className="md:sticky top-8">
            <CategorySidebar
              categories={sidebarData?.categories || []}
              recentPosts={sidebarData?.recentPosts || []}
              currentCategorySlug={details.slug}
            />
          </div>
        </aside>
        {/* Posts List - Critical content */}
        <div className="right-layout-category md:w-[70%] w-full space-y-6">
          {items?.data && items.data.length > 0 ? (
            <div className="grid gap-6">
              {items.data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Danh mục <strong>{details.name}</strong> chưa có bài viết nào.
                Hãy thêm bài viết mới!
              </p>
            </div>
          )}

          {/* Pagination */}
          {items?.data && items.data.length > 0 && (
            <Pagination paginatedData={items} baseUrl={`/${details.slug}`} />
          )}
        </div>
      </div>
      {/* Category Content */}
      {details.content && details.content.trim().length > 0 && (
        <section className="entry-content mt-7 w-full">
          <div
            className="prose prose-gray max-w-none text-base text-justify line-clamp-3"
            dangerouslySetInnerHTML={{ __html: details.content }}
          />
          <ReadMoreDialog title={details.name} content={details.content} />
        </section>
      )}
    </Container>
  );
}
