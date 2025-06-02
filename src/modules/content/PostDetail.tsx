import Link from "next/link";
import Image from "next/image";
import { Post } from "types/post";
import Breadcrumb from "@components/common/breadcrumb";
import { Container } from "@components/ui/Containers";
import "@styles/components/post.scss";
import { ArrowRight, Crown } from "lucide-react";
import { formatDateVi } from "lib/utils/format";
import { Button } from "@components/ui/Button";

export default function PostDetail({ post }: { post: Post }) {
  // Lấy danh mục chính của bài viết
  const mainCategory = post.categories?.[0];
  // Lấy tất cả bài viết liên quan
  const allRelatedPosts = post.related_posts || [];
  // Chỉ hiển thị 3 bài đầu tiên
  const displayedRelatedPosts = allRelatedPosts.slice(0, 5);
  // Kiểm tra nếu có nhiều hơn 3 bài viết liên quan
  const shouldShowViewMore = allRelatedPosts.length > 5;

  return (
    <>
      <Container size="md" className="px-0">
        <section className="header-layout-category">
          <Breadcrumb items={post.breadcrumbs || []} />
          {/* Category Header */}
          <div className="mb-8">
            <h1 className="md:text-6xl text-3xl font-extrabold mb-3 font-archivo">
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
            {post.content && (
              <div
                className="entry-content prose prose-gray max-w-none text-justify text-neutral-950"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>

          {/* Related Posts */}
          {displayedRelatedPosts.length > 0 && (
            <section className="mt-12">
              <h5 className="flex items-center text-xl font-semibold mb-6">
                <Crown className="w-5.5 h-5.5 mr-2 text-primary font-semibold capitalize" />
                Bài viết liên quan
              </h5>

              <div className="space-y-4">
                {displayedRelatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="box-item flex flex-col-reverse md:flex-row gap-4 p-4 border rounded-lg overflow-hidden hover:text-primary dark:hover:text-neutral-1000 hover:shadow-md dark:bg-neutral-950 bg-neutral-0 hover:dark:bg-neutral-300 transition-shadow"
                  >
                    <div className="box-text flex-1 md:order-first">
                      <Link href={`/${relatedPost.slug}`}>
                        <h3 className="font-bold line-clamp-2 my-2 md:my-0">
                          {relatedPost.name}
                        </h3>
                        {relatedPost.description && (
                          <div
                            className="text-sm text-gray-600 dark:text-gray-500 line-clamp-3 mb-3"
                            dangerouslySetInnerHTML={{
                              __html: relatedPost.description,
                            }}
                          />
                        )}
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{formatDateVi(relatedPost.created_at)}</span>
                        </div>
                      </Link>
                    </div>

                    {relatedPost.image_url && (
                      <Link
                        href={`/${relatedPost.slug}`}
                        className="box-image relative aspect-video w-full md:w-56 h-48 md:h-auto flex-shrink-0"
                      >
                        <Image
                          src={relatedPost.image_url}
                          alt={relatedPost.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                          className="object-cover select-none hover:scale-105 transition-transform duration-300 rounded-md"
                          loading="lazy"
                        />
                      </Link>
                    )}
                  </article>
                ))}
              </div>

              {shouldShowViewMore && mainCategory && (
                <div className="mt-6 text-center">
                  <Button asChild variant="outline" className="gap-2">
                    <Link href={`/${mainCategory.slug}`}>
                      Xem thêm bài viết cùng danh mục
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </section>
          )}
        </Container>
      </article>
    </>
  );
}
