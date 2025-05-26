import Link from "next/link";
import Image from "next/image";
import { Post } from "types/post";

export default function PostDetail({ post }: { post: Post }) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm">
        <ol className="flex flex-wrap gap-2">
          {post.breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              <Link
                href={`/${crumb.slug}`}
                className={`hover:text-primary ${
                  crumb.is_active ? "text-primary font-medium" : ""
                }`}
              >
                {crumb.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.name}</h1>
        {post.image_url && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={post.image_url}
              alt={post.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.views} lượt xem</span>
        </div>
      </header>

      {/* Post Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related Posts */}
      {post.related_posts && post.related_posts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.related_posts.map((relatedPost) => (
              <div
                key={relatedPost.id}
                className="border rounded-lg overflow-hidden"
              >
                {relatedPost.image_url && (
                  <div className="relative aspect-video">
                    <Image
                      src={relatedPost.image_url}
                      alt={relatedPost.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-medium mb-2">
                    <Link
                      href={`/${relatedPost.slug}`}
                      className="hover:text-primary"
                    >
                      {relatedPost.name}
                    </Link>
                  </h3>
                  <div
                    className="text-sm text-gray-600 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: relatedPost.description,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
