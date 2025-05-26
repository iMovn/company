import { SidebarSkeleton } from "@components/ui/SkeletonSection";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Content",
  description: "Blog posts, articles, and resources",
};

// Dynamic with ISR for content pages
export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minutes

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b">
        <div className="container mx-auto px-4 py-2">
          <Suspense
            fallback={
              <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            }
          >
            {/* <Breadcrumbs /> */}
            <h3>BreadCrumbs</h3>
          </Suspense>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 xl:col-span-9">
            <main>{children}</main>
          </div>

          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-8">
              <Suspense fallback={<SidebarSkeleton />}>
                {/* <ContentSidebar /> */}
                <h3>Content Sidebar</h3>
              </Suspense>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
