import { CategoryData } from "types/categories";
import PostCard from "./components/PostCard";
import Breadcrumb from "@components/common/breadcrumb";
import { Suspense } from "react";
import { SidebarSkeleton } from "@components/ui/SkeletonSection";
import { Container } from "@components/ui/Containers";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  category?: CategoryData | null;
}

export default function CategoryPage({ category }: CategoryPageProps) {
  // Xử lý trường hợp không có dữ liệu
  if (!category || !category.details) {
    return notFound();
  }

  // Destructuring sau khi đã kiểm tra
  const { details, items, breadcrumbs } = category;

  return (
    <Container size="md">
      <section className="header-layout-category">
        <Breadcrumb items={breadcrumbs || []} />
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-semibold mb-3">{details.name}</h1>
          {category.details.description && (
            <p className="text-base text-gray-600">{details.description}</p>
          )}
        </div>
      </section>

      {/* Posts List */}
      <div className="flex flex-col-reverse md:flex-row gap-6 mb-8">
        <aside className="aside-layout-category md:w-[25%] w-full">
          <div className="sticky top-8">
            <Suspense fallback={<SidebarSkeleton />}>
              {/* Replace with actual ContentSidebar component */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Categories</h3>
                <p className="text-sm text-gray-600">Content Sidebar</p>
              </div>
            </Suspense>
          </div>
        </aside>
        {/* Main Content */}
        <div className="right-layout-category md:w-[75%] w-full space-y-6">
          {items?.data && items.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
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

          {/* Category Content */}
          {details.content && (
            <div
              className="prose prose-gray max-w-none mt-7"
              dangerouslySetInnerHTML={{ __html: details.content }}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
