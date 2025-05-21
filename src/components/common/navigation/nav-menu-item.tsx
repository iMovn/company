"use client";

import { usePathname } from "next/navigation";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { NavDropdownLink } from "./nav-dropdown-link";
import { MenuItem } from "@/types/menu";
import { getItemUrl } from "@/lib/menu-metadata";
import { NavigationLink } from "./navigation-link";

interface NavMenuItemProps {
  item: MenuItem;
  baseUrl?: string;
}

/**
 * Component menu item cho navbar
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

  // Link thông thường không có dropdown
  return (
    <NavigationMenuItem>
      <NavigationLink
        item={item}
        baseUrl={baseUrl}
        className="px-3 py-2 text-sm font-medium"
        active={isActive}
      />
    </NavigationMenuItem>
  );
}
