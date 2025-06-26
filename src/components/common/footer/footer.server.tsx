import { Container } from "@components/ui/Containers";
import { fetchMobileMenu } from "lib/api/menu.service";
import { fetchSettings } from "lib/api/setting.service";
import Image from "next/image";
import Link from "next/link";
import { FooterContactInfo } from "./company.client";
import { cn } from "lib/utils/utils";
import dynamic from "next/dynamic";

const FooterClient = dynamic(() => import("./footer.client"));

export default async function FooterServer() {
  const [settings, menus] = await Promise.all([
    fetchSettings(),
    fetchMobileMenu(),
  ]);

  // Lọc menu cha (level 0)
  const parentMenus = menus.filter((menu) => !menu.parent_id);

  return (
    <div className="relative flex w-full mt-6 items-center justify-center bg-background">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-neutral-950"></div>

      <Container as="footer" id="footer" size="md" className="my-32 relative">
        {/* Settings Content */}
        {settings.content?.content && (
          <section
            className="content-footer prose prose-sm dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: settings.content.content }}
          />
        )}

        {/* Client Component Section - Contact Form and Interactive Elements */}
        <FooterClient />

        {/* Logo and Copyright Section */}
        <section className="flex items-center gap-2 mb-8">
          {settings.logo && (
            <div className="md:w-16 w-14 md:h-16 h-14 relative">
              <Image
                src={settings.logo}
                alt={settings.company.name || "Company Logo"}
                fill
                sizes="(max-width: 768px) 38px, 44px"
                className="object-contain select-none"
                loading="eager"
                priority
              />
            </div>
          )}

          <div className="text-sm">
            <p>© {new Date().getFullYear()} - All rights reserved</p>
            {settings.company.copyright && (
              <p
                dangerouslySetInnerHTML={{ __html: settings.company.copyright }}
              />
            )}
          </div>
        </section>

        {/* Navigation Menu */}
        <nav className="mb-8 ml-3">
          <ul className="md:flex flex-1 items-center gap-4">
            {parentMenus.map((menu) => (
              <li key={menu.id} className="md:mb-0 mb-3">
                <Link
                  href={menu.link || "#"}
                  className="md:text-base text-sm hover:text-primary transition-colors"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Info Section Company - Client Component for Tooltips */}
        <FooterContactInfo
          address={settings.company.address}
          linkMap={settings.company.link_map}
          phone={settings.company.phone}
          email={settings.company.email}
        />
      </Container>
    </div>
  );
}
