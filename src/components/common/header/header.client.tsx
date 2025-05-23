"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import DesktopNav from "../navigation/desktop-nav";
import { MobileMenu } from "../navigation/mobile-menu";
import Logo from "../navigation/logo";
import SearchOverlay from "../navigation/search";
import { MenuItem } from "@shared/types/menu";
import { Container } from "@components/ui/container";
import { Button } from "@components/ui/button";
import { AnimatedMenuButtonMorph } from "@components/ui/animated-menu-button"; //Phiên bản 4
import GradientText from "@components/ui/gradient-text";
import { SettingsData } from "@shared/types/setting";
import ThemeToggler from "../navigation/theme-toggle";
import { useMobileMenu } from "@hooks/useMenu";

type Props = {
  menu: MenuItem[]; // Main menu từ SSR để fallback và desktop nav
  settings: SettingsData;
};

/**
 * Component navbar chính của ứng dụng
 *
 * Tại sao tách menu desktop và mobile?
 * 1. Desktop: Sử dụng main menu (từ SSR) - ổn định, không cần loading
 * 2. Mobile: Có thể có menu riêng tối ưu UX - fetch client-side
 * 3. Fallback: Mobile dùng main menu nếu không có menu riêng
 * 4. Performance: Desktop render ngay, mobile có loading state
 */
export default function HeaderClient({ settings, menu }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Fetch mobile menu với fallback logic
  // Tại sao client-side? Để không block SSR và có loading state tốt
  const {
    mobileMenu,
    isLoading: isMobileMenuLoading,
    error: mobileMenuError,
    menuSource,
  } = useMobileMenu(menu); // menu (main) làm fallback

  // Toggle handlers
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const closeSearch = () => setSearchOpen(false);

  // Debug info trong development
  if (process.env.NODE_ENV === "development" && menuOpen) {
    console.log(`📱 Mobile menu source: ${menuSource}`);
    console.log(`📱 Mobile menu items: ${mobileMenu.length}`);
  }

  return (
    <Container
      as="header"
      size="lg"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-neutral-900/80 backdrop-blur-md rounded-full py-1.5 px-4 flex items-center justify-between">
        {/* Logo */}
        <Logo initialLogo={settings} />

        {/* Desktop Navigation */}
        <DesktopNav initialMenu={menu} />

        {/* Right Side Utilities */}
        <div className="flex items-center space-x-3">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            className="flex text-neutral-100 hover:text-primary transition-colors p-1 rounded-full md:[&_svg]:size-4 [&_svg]:size-4.5"
            onClick={toggleSearch}
            aria-label="Search"
          >
            <Search />
          </Button>

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

            <span className="text-neutral-100">
              <span>1 Slot </span>
              <br />
              <span className="text-neutral-400">còn lại trong quý này</span>
            </span>
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden md:flex items-center justify-center bg-gray-600 text-neutral-900 hover:bg-gray-700 hover:text-neutral-100 transition-colors rounded-full px-4 py-2 text-sm font-medium"
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

      {/* Mobile Menu */}
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

      {/* Search Overlay */}
      {searchOpen && <SearchOverlay onClose={closeSearch} />}
    </Container>
  );
}
