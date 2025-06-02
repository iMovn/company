"use client";
import { Category, CategoryData } from "types/categories";
import PostCard from "./components/PostCard";
import Breadcrumb from "@components/common/breadcrumb";
import { useState } from "react";
import { Container } from "@components/ui/Containers";
import { notFound } from "next/navigation";
import { Button } from "@components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/Dialog";
import Pagination from "@components/ui/Pagination";
import { PostItem } from "types/all-posts";
import CategorySidebar from "./components/CategorySidebar";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Xử lý trường hợp không có dữ liệu
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
          {category.details.description && (
            <p className="text-sm italic text-primary/95">
              {details.description}
            </p>
          )}
        </div>
      </section>

      {/* Posts List */}
      <div className="flex flex-col-reverse md:flex-row gap-6 mb-8">
        <aside className="aside-layout-category md:w-[25%] w-full">
          <div className="md:sticky top-8">
            {sidebarData ? (
              <CategorySidebar
                categories={sidebarData.categories}
                recentPosts={sidebarData.recentPosts}
                currentCategorySlug={details.slug}
              />
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Đang tải...</h3>
                <p className="text-sm text-gray-600">Sidebar content</p>
              </div>
            )}
          </div>
        </aside>
        {/* Main Content */}
        <div className="right-layout-category md:w-[75%] w-full space-y-6">
          {items?.data && items.data.length > 0 ? (
            <div className="">
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
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              Đọc thêm
            </Button>
          </div>
        </section>
      )}

      {/* Dialog hiển thị toàn bộ nội dung */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Container
          size="md"
          as={DialogContent}
          className="max-h-[80vh] overflow-y-auto bg-neutral-50 dark:bg-neutral-900"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{details.name}</DialogTitle>
            <DialogDescription className="sr-only">
              Mô tả trợ năng
            </DialogDescription>
          </DialogHeader>
          {details.content && (
            <section
              className="entry-content prose prose-gray max-w-none text-base text-justify"
              dangerouslySetInnerHTML={{ __html: details.content }}
            />
          )}
        </Container>
      </Dialog>
    </Container>
  );
}
