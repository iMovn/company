"use client";

import { Fragment } from "react";
import { MobileNavItem } from "./mobile-nav-item";
import { MenuItem } from "@/types/menu";

interface MobileMenuProps {
  items: MenuItem[];
  onItemClick: () => void;
}

/**
 * Component menu cho mobile
 */
export function MobileMenu({ items, onItemClick }: MobileMenuProps) {
  return (
    <div className="md:hidden absolute top-14 left-0 w-full bg-neutral-900/95 backdrop-blur-md rounded-xl p-4 shadow-lg fade-in z-50">
      <div className="flex flex-col space-y-1">
        {items
          .filter((item) => item.is_active === 1)
          .map((item) => (
            <MobileNavItem key={item.id} item={item} onClick={onItemClick} />
          ))}

        {/* Divider with CTA */}
        <div className="pt-4 mt-2 border-t border-neutral-800">
          <a
            href="/contact"
            onClick={onItemClick}
            className="flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-md px-4 py-2 text-sm font-medium"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}
