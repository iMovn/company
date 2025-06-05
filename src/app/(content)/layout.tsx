import "@styles/components/post.scss";
import { Container } from "@components/ui/Containers";
import { defaultMetadata } from "@config/metadata";

export const metadata = {
  ...defaultMetadata,
  title: {
    default: "Kiến thức Digital Marketing | iMovn",
    template: "%s | Kiến thức iMovn",
  },
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
      <Container size="lg" className="dynamic-content">
        <main>{children}</main>
      </Container>
    </>
  );
}
