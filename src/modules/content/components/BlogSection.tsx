import Link from "next/link";
import { Post } from "types/categories";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@components/ui/Button";

const BlogCardOne = dynamic(() => import("./BlogCardOne"));
const BlogCardTwo = dynamic(() => import("./BlogCardTwo"));

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

  const firstThreePosts = category.posts.slice(0, 3);
  const remainingPosts = category.posts.slice(3);

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
            className="md:flex hidden group text-primary-300 text-sm hover:text-primary whitespace-nowrap items-center gap-1 uppercase"
          >
            <span>Xem thêm</span>{" "}
            <ArrowUpRight size={19} className="group-hover:text-warning" />
          </Link>
        )}
      </div>

      {/* Grid 3 bài đầu tiên */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {firstThreePosts.map((post) => (
          <BlogCardOne key={post.id} post={post} />
        ))}
      </div>

      {/* Grid các bài còn lại (nếu có) */}
      {remainingPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
          {remainingPosts.map((post) => (
            <BlogCardTwo key={post.id} post={post} />
          ))}
        </div>
      )}

      {category.hasMorePosts && (
        <Button
          asChild
          className="group md:hidden mt-6 text-neutral-50 font-bold"
        >
          <Link
            href={`${category.slug}`}
            className="flex text-sm hover:text-primary whitespace-nowrap items-center gap-1 uppercase"
          >
            <span>Xem thêm</span>{" "}
            <ArrowUpRight size={19} className="text-neutral-950" />
          </Link>
        </Button>
      )}
    </section>
  );
}
