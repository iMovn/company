"use client";

import Link from "next/link";
import {
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/types/menu";
import { getMenuItemDescription, getItemUrl } from "@/lib/menu-metadata";

interface NavDropdownLinkProps {
  item: MenuItem;
  baseUrl?: string;
  className?: string;
}

/**
 * Component xử lý dropdown menu
 */
export function NavDropdownLink({
  item,
  baseUrl = "",
  className,
}: NavDropdownLinkProps) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return null;
  }

  const itemUrl = getItemUrl(item, baseUrl);

  return (
    <NavigationMenuItem className={className}>
      <NavigationMenuTrigger className="text-neutral-100 hover:text-primary bg-transparent hover:bg-neutral-800/70 focus:bg-neutral-800/70">
        {item.name}
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
          {item.children
            .filter((child) => child.is_active === 1)
            .map((child) => {
              const childUrl = getItemUrl(child, itemUrl);
              const description = getMenuItemDescription(child);

              return (
                <li key={child.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={childUrl}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        "hover:bg-neutral-800 hover:text-neutral-100 focus:bg-neutral-800 focus:text-neutral-100"
                      )}
                    >
                      <div className="text-sm font-medium leading-none text-neutral-100 flex items-center">
                        {child.icon && (
                          <LucideIcon
                            name={child.icon}
                            className="mr-2 text-primary"
                            size={16}
                          />
                        )}
                        {child.name}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-neutral-400 mt-2">
                        {description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              );
            })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
