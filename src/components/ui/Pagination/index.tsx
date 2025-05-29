"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PaginatedData, Post } from "types/categories";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  paginatedData: PaginatedData<Post>;
  baseUrl: string; // URL cơ sở, ví dụ: "/cam-nang-marketing"
}

export default function Pagination({
  paginatedData,
  baseUrl,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const {
    current_page,
    last_page,
    prev_page_url,
    next_page_url,
    from,
    to,
    total,
  } = paginatedData;

  // Tạo URL cho trang với query params
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // Tạo array các số trang để hiển thị
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2; // Số trang hiển thị xung quanh trang hiện tại

    if (last_page <= 7) {
      // Nếu tổng số trang <= 7, hiển thị tất cả
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      // Luôn hiển thị trang 1
      pages.push(1);

      if (current_page <= 4) {
        // Gần đầu
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(last_page);
      } else if (current_page >= last_page - 3) {
        // Gần cuối
        pages.push("...");
        for (let i = last_page - 4; i <= last_page; i++) {
          pages.push(i);
        }
      } else {
        // Ở giữa
        pages.push("...");
        for (let i = current_page - delta; i <= current_page + delta; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(last_page);
      }
    }

    return pages;
  };

  // Không hiển thị pagination nếu chỉ có 1 trang
  if (last_page <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-wrapper mt-8">
      {/* Thông tin trang */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
        <div className="font-archivo">
          Hiển thị <strong>{from}</strong> đến <strong>{to}</strong> của{" "}
          <strong>{total}</strong> bài viết
        </div>
        <div className="font-archivo">
          Trang <strong>{current_page}</strong> / <strong>{last_page}</strong>
        </div>
      </div>

      {/* Navigation buttons */}
      <nav
        className="flex items-center justify-center space-x-2"
        aria-label="Pagination"
      >
        <div className="flex items-center space-x-2">
          {/* Previous button */}
          {prev_page_url ? (
            <Link
              href={createPageUrl(current_page - 1)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium border rounded-lg overflow-hidden hover:text-primary dark:hover:text-neutral-1000 hover:shadow-md dark:bg-neutral-950 bg-neutral-0 hover:dark:bg-neutral-300 transition-shadow"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Trước
            </Link>
          ) : (
            <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
              <ChevronLeft className="w-3 h-3 mr-1" />
              Trước
            </span>
          )}

          {/* Page numbers */}
          <div className="flex items-center space-x-2">
            {pageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-500"
                  >
                    <MoreHorizontal className="w-3 h-3" />
                  </span>
                );
              }

              const pageNumber = page as number;
              const isActive = pageNumber === current_page;

              return (
                <Link
                  key={pageNumber}
                  href={createPageUrl(pageNumber)}
                  className={`inline-flex items-center px-2 py-1 text-sm font-medium border rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-white border-primary cursor-default"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pageNumber}
                </Link>
              );
            })}
          </div>

          {/* Next button */}
          {next_page_url ? (
            <Link
              href={createPageUrl(current_page + 1)}
              className="inline-flex items-center px-2 py-1 text-sm font-medium border rounded-lg overflow-hidden hover:text-primary dark:hover:text-neutral-1000 hover:shadow-md dark:bg-neutral-950 bg-neutral-0 hover:dark:bg-neutral-300 transition-shadow"
            >
              Sau
              <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          ) : (
            <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed">
              Sau
              <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}
