import { formatDateVi } from "lib/utils/format";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Post } from "types/categories";

export default function BlogCardTwo({ post }: { post: Post }) {
  return (
    <article className="box-item group flex md:flex-row gap-4 rounded-tr-xl rounded-bl-xl overflow-hidden hover:text-primary shadow-sm hover:shadow-md dark:bg-neutral-1000/70 bg-neutral-0 hover:dark:bg-neutral-500 transition-shadow">
      {post.image_url && (
        <Link
          href={`/${post.slug}`}
          className="box-image relative md:w-24 w-24 flex-shrink-0"
        >
          <Image
            src={post.image_url}
            alt={post.name}
            fill
            sizes="100vw"
            className="object-cover select-none hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      <div className="box-text flex-1 p-2">
        <Link href={`/${post.slug}`}>
          <h3 className="font-bold dark:text-neutral-200 group-hover:dark:text-neutral-950 line-clamp-2 my-2 md:my-0">
            {post.name}
          </h3>
          <div className="flex items-center text-xs group-hover:text-gray-800 text-primary/80">
            <span>{formatDateVi(post.created_at)}</span>
          </div>
        </Link>
      </div>
    </article>
  );
}
