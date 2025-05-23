"use client";
import { NavMenuItem } from "./nav-menu-item";
import { useEffect } from "react";
import { MenuItem } from "@shared/types/menu";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@components/ui/navigation-menu";

type Props = {
  initialMenu: MenuItem[];
};

export default function DesktopNav({ initialMenu }: Props) {
  // Optional: auto refresh sau 5 phút
  useEffect(() => {
    const timeout = setTimeout(() => {
      // TODO: you can refetch if muốn update realtime
    }, 5 * 60 * 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!initialMenu || initialMenu.length === 0) {
    return (
      <div className="hidden md:flex items-center space-x-1">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-5 w-16 bg-neutral-800 rounded animate-pulse mx-2"
            />
          ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-1">
      <NavigationMenu>
        <NavigationMenuList className="space-x-1">
          {initialMenu
            .filter((item) => item.is_active === 1)
            .sort((a, b) => (a.sort || 0) - (b.sort || 0))
            .map((item) => (
              <NavMenuItem key={item.id} item={item} />
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
