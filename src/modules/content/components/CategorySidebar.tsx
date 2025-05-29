"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Category } from "types/categories";
import { formatDateVi } from "lib/utils/format";
import { Calendar, TrendingUp } from "lucide-react";
import { Button } from "@components/ui/Button";
import { PostItem } from "types/all-posts";

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
    <div className="sidebar-content space-y-6">
      {/* Danh mục cha */}
      <div className="sidebar-section">
        <h3 className="flex items-center text-lg font-semibold mb-4 text-gray-800">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          Danh mục
        </h3>
        <nav className="space-y-2">
          {parentCategories.map((category) => {
            const isActive =
              currentCategorySlug === category.slug ||
              pathname === `/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
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
        <h3 className="flex items-center text-lg font-semibold mb-4 text-gray-800">
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
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Nội dung */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
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

      {/* Banner hoặc CTA (optional) */}
      <div className="sidebar-section">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-gray-800 mb-2">
            Nhận thông tin mới nhất
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Đăng ký để nhận bài viết marketing mới nhất
          </p>
          <Button className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
            Đăng ký ngay
          </Button>
        </div>
      </div>
    </div>
  );
}
