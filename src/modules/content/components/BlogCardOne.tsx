import { formatDateVi } from "lib/utils/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "types/categories";

export default function BlogCardOne({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg shadow-sm hover:shadow-md transition-shadow hover:text-primary overflow-hidden h-full flex flex-col dark:bg-neutral-1000/70 bg-neutral-0 hover:dark:bg-neutral-500">
      <Link href={`/${post.slug}`} className="flex flex-col h-full">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={post.image_url || "/placeholder.png"}
            alt={post.name}
            fill
            sizes="100vw"
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
          <div className="mt-auto pt-3 border-t border-primary-100 dark:border-neutral-900/50">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{formatDateVi(post.created_at)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
