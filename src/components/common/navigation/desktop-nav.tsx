"use client";

import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavMenuItem } from "./nav-menu-item";
import { fallbackMainMenu } from "@/lib/menu-metadata";
import { MenuItem } from "@/types/menu";
import { getMainMenu } from "@/app/api/menu";

/**
 * Component navigation bar cho desktop
 */
export default function DesktopNav() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sử dụng IIFE để fetch menu
    (async () => {
      try {
        // Thử fetch từ API
        const data = await getMainMenu();
        if (data && data.length > 0) {
          setMenuItems(data);
        } else {
          // Fallback nếu API không trả về dữ liệu
          setMenuItems(fallbackMainMenu);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
        // Fallback khi có lỗi
        setMenuItems(fallbackMainMenu);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="hidden md:flex items-center space-x-1">
        {/* Skeleton loading cho menu */}
        {Array(4)
          .fill(0)
          .sort((a, b) => (a.sort || 0) - (b.sort || 0))
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
          {menuItems
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
