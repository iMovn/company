import { fetchAllCategories } from "lib/api/sidebar.service";
import { fetchCategoryBySlug } from "lib/api/category.service";
import dynamic from "next/dynamic";
import Breadcrumb from "@components/common/breadcrumb";
import { Container } from "@components/ui/Containers";
import { defaultMetadata } from "@config/metadata";

const BlogSection = dynamic(
  () => import("@modules/content/components/BlogSection")
);

export const metadata = {
  ...defaultMetadata,
  title: "Blog - Khám phá nội dung đa dạng",
  description:
    "Tìm hiểu các chủ đề thú vị qua những bài viết chất lượng cao được phân loại theo danh mục.",
  openGraph: {
    type: "article",
    title: "Blog - Khám phá nội dung đa dạng",
    description:
      "Tìm hiểu các chủ đề thú vị qua những bài viết chất lượng cao được phân loại theo danh mục.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Khám phá nội dung đa dạng",
    description:
      "Tìm hiểu các chủ đề thú vị qua những bài viết chất lượng cao được phân loại theo danh mục.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogDefaultPage() {
  try {
    const allCategories = await fetchAllCategories();

    if (!allCategories || allCategories.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Blog đang được cập nhật
            </h1>
            <p className="text-gray-600 max-w-md">
              Hiện tại chưa có danh mục nào được tạo. Vui lòng quay lại sau khi
              nội dung được thêm.
            </p>
          </div>
        </div>
      );
    }

    const activeRootCategories = allCategories.filter(
      (category) => category.is_active === 1 && category.parent_id === null
    );

    if (activeRootCategories.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Không có danh mục khả dụng
            </h1>
            <p className="text-gray-600 max-w-md">
              Tất cả danh mục hiện đang được bảo trì. Vui lòng quay lại sau.
            </p>
          </div>
        </div>
      );
    }

    const categoriesWithPosts = await Promise.all(
      activeRootCategories.map(async (category) => {
        const categoryData = await fetchCategoryBySlug(category.slug, {
          page: 1,
          limit: 7,
          sort_by: "desc",
        });

        if (!categoryData || !categoryData.items) {
          return {
            ...category,
            posts: [],
            totalPosts: 0,
            hasMorePosts: false,
          };
        }

        return {
          ...category,
          ...categoryData.details,
          posts: categoryData.items.data,
          totalPosts: categoryData.items.total,
          hasMorePosts: categoryData.items.total > 7,
        };
      })
    );

    const breadcrumbs = [
      { name: "Trang chủ", slug: "/", is_active: false },
      { name: "Blog", slug: "blog", is_active: true },
    ];

    return (
      <Container size="lg" className="px-0">
        <div className="header-blog mb-[93px]">
          <Breadcrumb items={breadcrumbs} />
          <h1 className="md:text-6xl text-3xl font-semibold font-archivo mb-3">
            Blog & Cẩm Nang
          </h1>
        </div>
        {categoriesWithPosts.map((category) => (
          <BlogSection key={category.id} category={category} />
        ))}
      </Container>
    );
  } catch (error) {
    console.error("Error loading blog page:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Đã xảy ra lỗi
          </h1>
          <p className="text-gray-600 max-w-md">
            Không thể tải trang blog. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }
}
