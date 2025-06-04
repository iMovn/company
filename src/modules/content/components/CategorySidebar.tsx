"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Category } from "types/categories";
import { formatDateVi } from "lib/utils/format";
import { ArrowUpRight, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@components/ui/Button";
import { PostItem } from "types/all-posts";
import SpotlightCard from "@components/ui/SpotlightCard";

interface CategorySidebarProps {
  categories: Category[];
  recentPosts: PostItem[];
  currentCategorySlug?: string;
}

export default function CategorySidebar({
  categories,
  recentPosts,
  currentCategorySlug,
}: CategorySidebarProps) {
  const pathname = usePathname();

  // Lọc ra các danh mục cha (parent_id = null)
  const parentCategories = categories.filter(
    (category) => category.parent_id === null
  );

  return (
    <div className="sidebar-content space-y-6 md:border-r-[1px] border-neutral-200 dark:border-neutral-800/70 md:pr-5 md:mt-0 mt-9">
      {/* Banner hoặc CTA (optional) */}
      <SpotlightCard
        className="rounded-lg"
        spotlightColor="rgba(0, 229, 255, 0.3)"
      >
        <div className="bg-gradient-to-br from-primary-100 to-indigo-100 md:px-3 px-4 md:py-6 py-9 text-center">
          <h5 className="font-extrabold text-neutral-950 mb-2 uppercase">
            Nâng tầm thương hiệu
          </h5>
          <p className="text-base text-neutral-900 mb-3">
            Biến tầm nhìn của bạn thành hiện thực – Chúng tôi đồng hành cùng
            doanh nghiệp bạn chinh phục bầu trời số!
          </p>
          <Button
            asChild
            className="group bg-primary hover:bg-primary/73 text-white text-sm py-2 px-4 mt-2 gap-1 rounded-xl transition-colors duration-200"
          >
            <Link href="/services">
              <span>Dịch vụ tại iMovn</span>
              <ArrowUpRight className="group-hover:text-neutral-800" />
            </Link>
          </Button>
        </div>
      </SpotlightCard>

      {/* Danh mục cha */}
      <div className="sidebar-section">
        <h5 className="flex items-center text-lg font-semibold mb-4 capitalize">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          Chuyên mục số
        </h5>
        <nav className="space-y-2">
          {parentCategories.map((category) => {
            const isActive =
              currentCategorySlug === category.slug ||
              pathname === `/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className={`block py-1 rounded-md text-base font-normal hover:text-primary ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bài viết mới nhất */}
      <div className="sidebar-section">
        <h3 className="flex items-center text-lg font-semibold mb-4 capitalize">
          <Calendar className="w-5 h-5 mr-2 text-primary" />
          Bài viết mới nhất
        </h3>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => (
            <article key={post.id} className="group">
              <Link href={`/${post.slug}`} className="block">
                <div className="flex gap-3">
                  {/* Hình ảnh */}
                  {post.image_url && (
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={post.name}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    </div>
                  )}

                  {/* Nội dung */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                      {post.name}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <span>{formatDateVi(post.created_at)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
