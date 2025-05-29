import type { Metadata } from "next";
import { Container } from "@components/ui/Containers";

export const metadata: Metadata = {
  title: "Content",
  description: "Blog posts, articles, and resources",
};

// Dynamic with ISR for content pages
export const dynamic = "force-dynamic";
export const revalidate = 300;

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container size="lg">
        <main>{children}</main>
      </Container>
    </>
  );
}
