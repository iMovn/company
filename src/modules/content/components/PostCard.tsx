import Link from "next/link";
import Image from "next/image";
import { Post } from "types/categories";
import { formatDateVi } from "lib/utils/format";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="box-item group flex flex-col-reverse md:flex-row gap-4 mb-4 p-4 rounded-lg overflow-hidden hover:text-primary shadow-sm hover:shadow-md dark:bg-neutral-1000/70 bg-neutral-0 hover:dark:bg-neutral-500 transition-shadow">
      <div className="box-text flex-1 md:order-first pr-4">
        <Link href={`/${post.slug}`}>
          <h3 className="font-bold dark:text-neutral-200 group-hover:dark:text-neutral-950 line-clamp-2 my-2 md:my-0">
            {post.name}
          </h3>
          <div
            className="text-sm text-gray-600 dark:text-gray-500 group-hover:dark:text-neutral-900 line-clamp-3 mb-3"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
          <div className="flex items-center text-xs group-hover:text-gray-800 text-primary/80">
            <span>{formatDateVi(post.created_at)}</span>
          </div>
        </Link>
      </div>

      {post.image_url && (
        <Link
          href={`/${post.slug}`}
          className="box-image relative aspect-video w-full sm:w-48 md:w-56 lg:w-60 h-48 sm:h-auto flex-shrink-0"
        >
          <Image
            src={post.image_url}
            alt={post.name}
            fill
            sizes="100vw"
            className="object-cover select-none hover:scale-105 transition-transform duration-300 rounded-md"
          />
        </Link>
      )}
    </article>
  );
}
