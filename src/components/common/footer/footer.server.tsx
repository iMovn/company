import { Container } from "@components/ui/Containers";
import { fetchMobileMenu } from "lib/api/menu.service";
import { fetchSettings } from "lib/api/setting.service";
import Image from "next/image";
import Link from "next/link";
import FooterClient from "./footer.client";
import { FooterContactInfo } from "./company.client";

export default async function FooterServer() {
  const [settings, menus] = await Promise.all([
    fetchSettings(),
    fetchMobileMenu(),
  ]);

  // Lọc menu cha (level 0)
  const parentMenus = menus.filter((menu) => !menu.parent_id);

  return (
    <Container as="footer" size="md" className="my-32 mt-24">
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
  );
}
