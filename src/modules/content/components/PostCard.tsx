import Link from "next/link";
import Image from "next/image";
import { Post } from "types/categories";
import { formatDateVi } from "lib/utils/format";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="box-item flex flex-col-reverse md:flex-row mb-4 p-4 border rounded-lg overflow-hidden hover:text-primary dark:hover:text-neutral-1000 hover:shadow-md dark:bg-neutral-950 bg-neutral-0 hover:dark:bg-neutral-300 transition-shadow">
      <div className="box-text flex-1 md:order-first pr-4">
        <Link href={`/${post.slug}`}>
          <h3 className="font-medium line-clamp-2 my-2 md:my-0">{post.name}</h3>
          <div
            className="text-sm text-gray-600 dark:text-gray-500 line-clamp-3 mb-3"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
          <div className="flex items-center text-xs text-gray-500">
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
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
            className="object-cover select-none hover:scale-105 transition-transform duration-300 rounded-md"
            loading="lazy"
          />
        </Link>
      )}
    </article>
  );
}
