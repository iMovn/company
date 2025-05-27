"use client";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Logo from "../navigation/logo";
import { MenuItem } from "types/menu";
import { SettingsData } from "types/setting";
import { useMobileMenu } from "lib/hooks/useMenu";
import { Container } from "@components/ui/Containers";
import ThemeToggler from "../navigation/theme-toggle";
import AnimatedMenuButtonMorph from "@components/ui/Animated/ToggleButton";
import GradientText from "@components/ui/GradientText";

import { NavSkeleton } from "@components/ui/SkeletonSection";
import SearchDialog from "../navigation/search-dialog";

// Dynamic imports cho các components nặng
const DesktopNav = dynamic(() => import("../navigation/desktop-nav"));
const MobileMenu = dynamic(
  () => import("../navigation/mobile-menu").then((mod) => mod.MobileMenu),
  {
    ssr: false,
    loading: () => (
      <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1024px] p-4"></div>
    ),
  }
);

type Props = {
  menu: MenuItem[]; // Main menu từ SSR để fallback và desktop nav
  settings: SettingsData | null;
};

export default function HeaderClient({ settings, menu }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  //const [searchOpen, setSearchOpen] = useState(false);

  // Fetch mobile menu với fallback logic
  const {
    mobileMenu,
    isLoading: isMobileMenuLoading,
    error: mobileMenuError,
  } = useMobileMenu(menu); // menu (main) làm fallback

  // Toggle handlers
  const toggleMenu = () => setMenuOpen(!menuOpen);
  //const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <Container
      as="header"
      size="lg"
      className="fixed md:top-10 top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="dark:bg-neutral-900/60 bg-neutral-0 shadow-md backdrop-blur-md rounded-full py-1.5 px-4 flex items-center justify-between">
        {/* Logo */}
        {settings && <Logo initialLogo={settings.logo} />}

        {/* Desktop Navigation with MenuSkeleton */}
        <Suspense fallback={<NavSkeleton />}>
          <DesktopNav initialMenu={menu} />
        </Suspense>

        {/* Right Side Utilities */}
        <div className="flex items-center space-x-3">
          {/* Search Toggle */}
          <SearchDialog />

          {/* Theme Toggle */}
          <div>
            <ThemeToggler />
          </div>

          {/* Animated Mobile Menu Button */}
          <AnimatedMenuButtonMorph isOpen={menuOpen} onClick={toggleMenu} />

          {/* Availability Badge */}
          <div className="hidden md:flex items-center text-xs px-3 py-1.5">
            <div className="relative mr-6 mb-1.5">
              <span className="absolute w-2 h-2 rounded-full bg-red-500 "></span>
              <span className="absolute w-2 h-2 rounded-full bg-red-500 animate-pulse-soft"></span>
            </div>

            <span>
              <span>1 Slot </span>
              <br />
              <span>còn lại trong quý này</span>
            </span>
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden md:flex items-center justify-center dark:bg-gray-600 bg-gray-800 text-neutral-900 hover:bg-gray-700 hover:text-neutral-100 transition-colors rounded-full px-4 py-2 text-sm font-medium"
          >
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="text-sm"
            >
              Liên hệ #iMovn
            </GradientText>

            <div className="ml-1 bg-primary text-neutral-100 rounded-full w-5 h-5 flex items-center justify-center">
              <ChevronDown size={14} />
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu với Suspense */}
      {menuOpen && (
        <>
          {isMobileMenuLoading ? (
            // Loading state - hiển thị skeleton khi đang fetch mobile menu
            <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1024px]">
              <Container
                size="lg"
                className="bg-neutral-800 dark:bg-neutral-900 bg-radial-[at_0%_100%] from-[#1e1e1e] to-transparent to-70% backdrop-blur-md rounded-xl p-4 shadow-xs shadow-neutral-900/30"
              >
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="ml-2 text-neutral-400">
                    Đang tải menu...
                  </span>
                </div>
              </Container>
            </div>
          ) : mobileMenuError ? (
            // Error state - hiển thị fallback menu khi có lỗi
            <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1024px]">
              <Container
                size="lg"
                className="bg-neutral-800 dark:bg-neutral-900 bg-radial-[at_0%_100%] from-[#1e1e1e] to-transparent to-70% backdrop-blur-md rounded-xl p-4 shadow-xs shadow-neutral-900/30"
              >
                <div className="text-center py-4 text-neutral-400 text-sm">
                  <p>Không thể tải mobile menu</p>
                  <p>Đang sử dụng menu dự phòng</p>
                </div>
                {/* Vẫn hiển thị fallback menu */}
                <MobileMenu
                  items={menu} // Sử dụng main menu làm fallback
                  onItemClick={() => setMenuOpen(false)}
                />
              </Container>
            </div>
          ) : (
            // Success state - hiển thị mobile menu bình thường
            <MobileMenu
              items={mobileMenu}
              onItemClick={() => setMenuOpen(false)}
            />
          )}
        </>
      )}
    </Container>
  );
}
