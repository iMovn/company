import Navbar from "@/components/common/header/nav-main";
import { InitIcons } from "@/components/ui/lucide-icon";

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InitIcons />

      <Navbar />
      <main>{children}</main>
      {/* FOOTER */}
    </>
  );
}
