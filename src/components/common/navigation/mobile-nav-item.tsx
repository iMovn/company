"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavigationLink } from "./navigation-link";
import { MenuItem } from "types/menu";
import { getItemUrl } from "lib/data/menu-metadata";
import { cn } from "lib/utils/utils";
import { Button } from "@components/ui/Button";
import { LucideIcon } from "@components/ui/LucideIcon";

interface MobileNavItemProps {
  item: MenuItem;
  onClick?: () => void;
  level?: number;
}

/**
 * Component item menu mobile với hỗ trợ phân cấp
 */

export function MobileNavItem({
  item,
  onClick,
  level = 0,
}: MobileNavItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const itemUrl = getItemUrl(item);

  // Kiểm tra active state
  const isActive = pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);

  // Toggle dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Ngăn event bubbling
    setIsOpen(!isOpen);
  };

  // Click handler
  const handleClick = () => {
    // Close menu khi click vào bất kỳ navigation link nào
    if (onClick) {
      onClick();
    }
    // Close menu item có child
    // if (!hasChildren && onClick) {
    //   onClick();
    // }
  };

  return (
    <div className={cn("w-full", level > 0 && "ml-4")}>
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center flex-1">
          {/* Icon cho menu item */}
          {item.icon && (
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md mr-3 transition-colors",
                isActive ? "bg-primary/20" : "bg-neutral-800/50",
                level > 0 && "w-6 h-6"
              )}
            >
              <LucideIcon
                name={item.icon}
                className={cn(
                  "transition-colors",
                  isActive ? "text-primary" : "text-neutral-400"
                )}
                size={level > 0 ? 14 : 16}
              />
            </div>
          )}

          <NavigationLink
            item={item}
            className={cn(
              "py-2 text-base font-medium flex-1",
              isActive && "text-primary font-medium",
              level > 0 && "text-sm"
            )}
            onClick={handleClick}
          />
        </div>

        {hasChildren && (
          <Button
            variant="ghost"
            onClick={toggleDropdown}
            className="p-2 text-neutral-400 hover:text-neutral-100 transition-colors"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse menu" : "Expand menu"}
          >
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </Button>
        )}
      </div>

      {/* Dropdown content */}
      {isOpen && hasChildren && (
        <div className="pl-2 border-l border-neutral-800 mt-1 mb-2 space-y-1 animate-fade-in">
          {item.children
            .filter((child) => child.is_active === 1)
            .sort((a, b) => (a.sort || 0) - (b.sort || 0)) // Sort theo thứ tự nếu có
            .map((child) => (
              <MobileNavItem
                key={child.id}
                item={child}
                onClick={onClick}
                level={level + 1}
              />
            ))}
        </div>
      )}
    </div>
  );
}
