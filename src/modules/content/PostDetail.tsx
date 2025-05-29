import Link from "next/link";
import Image from "next/image";
import { Post } from "types/post";
import Breadcrumb from "@components/common/breadcrumb";
import { Container } from "@components/ui/Containers";
import "@styles/components/post.scss";

export default function PostDetail({ post }: { post: Post }) {
  return (
    <>
      <Container size="md" className="px-0">
        <section className="header-layout-category">
          <Breadcrumb items={post.breadcrumbs || []} />
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="md:text-6xl text-3xl font-semibold mb-3 font-archivo">
              {post.name}
            </h1>
            <ul role="list">
              <li className="md:flex items-center text-xs text-neutral-800 dark:text-neutral-300 gap-4">
                <p dangerouslySetInnerHTML={{ __html: post.users.name }} />
                <p className="">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p>{post.views} lượt xem</p>
              </li>
            </ul>
            {post.description && (
              <blockquote className="text-sm italic text-primary/95 mt-6">
                {post.description}
              </blockquote>
            )}
          </div>
        </section>
      </Container>

      <article>
        {/* Post Header */}
        <section className="mb-8 md:mx-12">
          {post.image_url && (
            <div className="relative aspect-video rounded-xl shadow-md overflow-hidden mb-4">
              <Image
                src={post.image_url}
                alt={post.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover select-none"
                loading="lazy"
              />
            </div>
          )}
        </section>

        {/* Post Content */}
        <Container size="md">
          <div className="dark:bg-neutral-200 bg-neutral-0 shadow-md rounded-lg p-6">
            <div
              className="entry-content prose prose-gray max-w-none text-justify text-neutral-950"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Related Posts */}
            {post.related_posts && post.related_posts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">
                  Bài viết liên quan
                </h2>
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
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover select-none"
                            loading="lazy"
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
          </div>
        </Container>
      </article>
    </>
  );
}
