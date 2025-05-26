import Link from "next/link";
import Image from "next/image";
import { Post } from "types/categories";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {post.image_url && (
        <div className="relative aspect-video">
          <Image
            src={post.image_url}
            alt={post.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="font-medium mb-2">
          <Link href={`/${post.slug}`} className="hover:text-primary">
            {post.name}
          </Link>
        </h2>
        <div
          className="text-sm text-gray-600 line-clamp-2 mb-3"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
        <div className="flex items-center text-xs text-gray-500">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
}
