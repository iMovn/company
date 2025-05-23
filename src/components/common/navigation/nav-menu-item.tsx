"use client";

import { usePathname } from "next/navigation";
import { NavDropdownLink } from "./nav-dropdown-link";
import { NavigationLink } from "./navigation-link";
import { getItemUrl } from "@shared/lib/menu-metadata";
import { NavigationMenuItem } from "@components/ui/navigation-menu";
import { LucideIcon } from "@components/ui/lucide-icon";
import { MenuItem } from "@shared/types/menu";

interface NavMenuItemProps {
  item: MenuItem;
  baseUrl?: string;
}

/**
 * Component menu item cho navbar với icon support
 */
export function NavMenuItem({ item, baseUrl = "" }: NavMenuItemProps) {
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const itemUrl = getItemUrl(item, baseUrl);

  // Kiểm tra active state
  const isActive = pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);

  // Nếu có children, sử dụng dropdown component
  if (hasChildren) {
    return <NavDropdownLink item={item} baseUrl={baseUrl} />;
  }

  // Link thông thường không có dropdown nhưng có thể có icon
  return (
    <NavigationMenuItem>
      <NavigationLink
        item={item}
        baseUrl={baseUrl}
        className="px-3 py-2 text-sm font-medium flex items-center"
        active={isActive}
        iconBefore={
          item.icon ? (
            <LucideIcon
              name={item.icon}
              className="mr-2 text-primary"
              size={16}
            />
          ) : undefined
        }
      />
    </NavigationMenuItem>
  );
}
