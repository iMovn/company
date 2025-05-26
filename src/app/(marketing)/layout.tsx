import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing",
};

// Static optimization for marketing pages
export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1">{children}</main>
    </>
  );
}
