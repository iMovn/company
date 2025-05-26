// components/navigation/mobile-menu.tsx
"use client";

import Link from "next/link";
import { MobileNavItem } from "./mobile-nav-item";
import type { MenuItem } from "types/menu";
import GradientText from "@components/ui/GradientText";
import { Container } from "@components/ui/Containers";

interface Props {
  items: MenuItem[];
  onItemClick?: () => void; // Thêm optional chaining
}

export function MobileMenu({ items, onItemClick = () => {} }: Props) {
  const activeItems = items
    .filter((item) => item.is_active === 1)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
  return (
    <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1024px]">
      <Container
        size="lg"
        className="bg-neutral-800 dark:bg-neutral-900 bg-radial-[at_0%_100%] from-[#1e1e1e] to-transparent to-70% backdrop-blur-md rounded-xl p-4 shadow-xs shadow-neutral-900/30 fade-in"
      >
        <div className="flex flex-col space-y-1">
          {activeItems.map((item) => (
            <MobileNavItem key={item.id} item={item} onClick={onItemClick} />
          ))}

          {/* Divider with CTA */}
          <div className="pt-4 mt-2 border-t border-neutral-800">
            <Link
              href="/contact"
              onClick={onItemClick}
              className="flex items-center justify-center bg-gray-600 text-neutral-900 hover:bg-gray-700 transition-colors rounded-md px-4 py-2 text-sm font-medium"
            >
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-sm"
              >
                Liên hệ #iMovn
              </GradientText>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
