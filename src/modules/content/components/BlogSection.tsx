import Link from "next/link";
import Image from "next/image";
import { Post } from "types/categories";
import { formatDateVi } from "lib/utils/format";
import { ArrowUpRight } from "lucide-react";

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b-2 border-primary">
        <div className="font-archivo">
          <h2 className="md:text-3xl text-2xl font-bold capitalize text-foreground/90">
            {category.name}
          </h2>
        </div>

        {category.hasMorePosts && (
          <Link
            href={`${category.slug}`}
            className="group text-primary-300 text-sm hover:text-primary whitespace-nowrap flex items-center gap-1 uppercase"
          >
            <span>Xem thêm</span>{" "}
            <ArrowUpRight size={19} className="group-hover:text-warning" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {category.posts.map((post) => (
          <article
            key={post.id}
            className="group rounded-lg shadow-sm hover:shadow-md transition-shadow hover:text-primary overflow-hidden h-full flex flex-col dark:bg-neutral-1000/70 bg-neutral-0 hover:dark:bg-neutral-500"
          >
            <Link href={`${post.slug}`} className="flex flex-col h-full">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={post.image_url || "/placeholder.png"}
                  alt={post.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                  className="object-cover select-none hover:scale-105 transition-transform duration-300 rounded-t-md"
                  priority={false}
                />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold line-clamp-2 mb-2 dark:text-neutral-200 group-hover:dark:text-neutral-950">
                  {post.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {post.description}
                </p>
                <div className="mt-auto pt-3 border-t border-primary-100">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{formatDateVi(post.created_at)}</span>
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
