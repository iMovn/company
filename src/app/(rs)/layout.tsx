import HeaderServer from "@components/common/header/header.server";
import { InitIcons } from "@components/ui/lucide-icon";

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InitIcons />
      <HeaderServer />
      <main>{children}</main>
    </>
  );
}
