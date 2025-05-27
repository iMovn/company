import Link from "next/link";
import { Home, Search, ArrowLeft, AlertTriangle } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@components/ui/Button";

export const metadata: Metadata = {
  title: "404 - Không tìm thấy trang",
  description: "Trang bạn yêu cầu không tồn tại hoặc đã bị di chuyển.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-md mx-auto text-center px-4">
        {/* Error Icon/Number */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-muted-foreground/20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-destructive animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Trang không tồn tại
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
            không khả dụng.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Về trang chủ
            </Link>
          </Button>

          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
          </Button>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 pt-8 border-t border-muted">
          <p className="text-sm text-muted-foreground mb-4">
            Hoặc thử tìm kiếm nội dung bạn cần:
          </p>
          <Button variant="secondary" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Tìm kiếm
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Các trang phổ biến:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/blog" className="text-sm text-primary hover:underline">
              Blog
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/about"
              className="text-sm text-primary hover:underline"
            >
              Giới thiệu
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/contact"
              className="text-sm text-primary hover:underline"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
