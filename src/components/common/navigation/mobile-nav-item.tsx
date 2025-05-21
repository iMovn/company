"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { MenuItem } from "@/types/menu";
import { getItemUrl } from "@/lib/menu-metadata";
import { cn } from "@/lib/utils";
import { NavigationLink } from "./navigation-link";

interface MobileNavItemProps {
  item: MenuItem;
  baseUrl?: string;
  onClick?: () => void;
  level?: number;
}

/**
 * Component item menu mobile với hỗ trợ phân cấp
 */
export function MobileNavItem({
  item,
  baseUrl = "",
  onClick,
  level = 0,
}: MobileNavItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const itemUrl = getItemUrl(item, baseUrl);

  // Kiểm tra active state
  const isActive = pathname === itemUrl || pathname.startsWith(`${itemUrl}/`);

  // Toggle dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Click handler
  const handleClick = () => {
    if (!hasChildren && onClick) {
      onClick();
    }
  };

  return (
    <div className={cn("w-full", level > 0 && "ml-4")}>
      <div className="flex items-center justify-between">
        <NavigationLink
          item={item}
          baseUrl={baseUrl}
          className={cn(
            "py-2 text-base font-medium",
            isActive && "text-primary"
          )}
          onClick={handleClick}
        />

        {hasChildren && (
          <button
            onClick={toggleDropdown}
            className="p-1 text-neutral-400 hover:text-neutral-100 transition-colors"
            aria-expanded={isOpen}
          >
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
        )}
      </div>

      {/* Dropdown content */}
      {isOpen && hasChildren && (
        <div className="pl-2 border-l border-neutral-800 mt-1 mb-2 space-y-1">
          {item.children
            .filter((child) => child.is_active === 1)
            .map((child) => (
              <div key={child.id} className="flex items-center">
                {child.icon && (
                  <LucideIcon
                    name={child.icon}
                    className="mr-2 text-primary"
                    size={14}
                  />
                )}
                <MobileNavItem
                  item={child}
                  baseUrl={itemUrl}
                  onClick={onClick}
                  level={level + 1}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
