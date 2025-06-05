import { defaultMetadata } from "@config/metadata";

export const metadata = {
  ...defaultMetadata,
  title: {
    default: "Dịch vụ Digital Marketing | iMovn",
    template: "%s | Dịch vụ iMovn",
  },
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
