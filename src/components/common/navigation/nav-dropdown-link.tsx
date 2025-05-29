"use client";

import { getItemUrl } from "lib/data/menu-metadata";
import { cn } from "lib/utils/utils";
import { MenuItem } from "types/menu";
import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@components/ui/NavigationMenu";
import { LucideIcon } from "@components/ui/LucideIcon";
import SpotlightCard from "@components/ui/SpotlightCard";

interface NavDropdownLinkProps {
  item: MenuItem;
}

/**
 * Component xử lý dropdown menu
 */
export function NavDropdownLink({ item }: NavDropdownLinkProps) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return null;
  }

  const itemUrl = getItemUrl(item);

  return (
    <NavigationMenuItem className="px-3 py-2 text-sm font-medium">
      <NavigationMenuTrigger className="hover:text-primary bg-transparent focus:text-primary flex items-center">
        {/* Icon cho menu cha nếu có */}
        {item.icon && (
          <LucideIcon
            name={item.icon}
            className="mr-2 text-primary"
            size={16}
          />
        )}
        <Link href={itemUrl} className="flex-1">
          {item.name}
        </Link>
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.2)">
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
            {item.children
              .filter((child) => child.is_active === 1)
              .sort((a, b) => (a.sort || 0) - (b.sort || 0)) // Sort theo thứ tự nếu có
              .map((child) => {
                const childUrl = getItemUrl(child);

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
                        <div className="text-sm font-medium font-archivo leading-none  flex items-center">
                          {/* Icon cho menu con */}
                          {child.icon && (
                            <LucideIcon
                              name={child.icon}
                              className="mr-2 text-primary"
                              size={16}
                            />
                          )}
                          {child.name}
                        </div>
                        <p className="line-clamp-2 text-xs leading-snug dark:text-neutral-400 text-neutral-700 mt-2">
                          {child.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
          </ul>
        </SpotlightCard>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
