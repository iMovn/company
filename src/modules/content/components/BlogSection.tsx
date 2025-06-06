import Link from "next/link";
import Image from "next/image";
import { Post } from "types/categories";

interface BlogSectionProps {
  category: {
    id: number;
    name: string;
    slug: string;
    posts: Post[];
    totalPosts: number;
    hasMorePosts: boolean;
    description?: string;
    image_url?: string;
  };
}

export default function BlogSection({ category }: BlogSectionProps) {
  //   if (!category.posts || category.posts.length === 0) {
  //     return (
  //       <section className="mb-12">
  //         <h2 className="text-2xl font-bold text-gray-800 mb-4">
  //           {category.name}
  //         </h2>
  //         <div className="bg-gray-50 rounded-lg p-8 text-center">
  //           <p className="text-gray-500">
  //             Chưa có bài viết nào trong danh mục này
  //           </p>
  //         </div>
  //       </section>
  //     );
  //   }
  // Ẩn hoàn toàn danh mục nếu không có bài viết
  if (
    !category.posts ||
    category.posts.length === 0 ||
    category.totalPosts === 0
  ) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {category.name}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({category.totalPosts} bài viết)
            </span>
          </h2>
          {category.description && (
            <p className="text-gray-600 mt-2 max-w-2xl">
              {category.description}
            </p>
          )}
        </div>

        {category.hasMorePosts && (
          <Link
            href={`${category.slug}`}
            className="text-blue-600 hover:underline whitespace-nowrap flex items-center"
          >
            Xem tất cả <span className="ml-1">→</span>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.posts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col"
          >
            <Link href={`${post.slug}`} className="flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image_url || "/placeholder.png"}
                  alt={post.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={false}
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                  {post.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {post.description}
                </p>
                <div className="mt-auto pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>
                      {new Date(post.created_at).toLocaleDateString("vi-VN")}
                    </span>
                    {post.users && <span>Tác giả: {post.users.name}</span>}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
