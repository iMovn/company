"use client";
import { getMainMenu } from "@/app/api/menu";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Search, ChevronDown } from "lucide-react";

import { fallbackMainMenu } from "@/lib/menu-metadata";
import { MenuItem } from "@/types/menu";
import DesktopNav from "../navigation/desktop-nav";
import { MobileMenu } from "../navigation/mobile-menu";
import Logo from "../navigation/logo";
import ModeToggle from "../theme/mode-toggle";
import GradientText from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import SearchOverlay from "./search";
import { Container } from "@/components/ui/container";
import AnimatedMenuButton from "@/components/ui/animated-menu-button"; //Phiên bản 4

/**
 * Component navbar chính của ứng dụng
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Fetch menu data
  useEffect(() => {
    // Sử dụng IIFE để fetch menu
    (async () => {
      try {
        const data = await getMainMenu();
        if (data && data.length > 0) {
          setMenuItems(data);
        } else {
          setMenuItems(fallbackMainMenu);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
        setMenuItems(fallbackMainMenu);
      }
    })();
  }, []);

  // Toggle handlers
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const closeSearch = () => setSearchOpen(false);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      as="header"
      size="lg"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-neutral-900/80 backdrop-blur-md rounded-full py-1.5 px-4 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <DesktopNav />

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
          <ModeToggle />

          {/* Animated Mobile Menu Button */}
          <AnimatedMenuButton isOpen={menuOpen} onClick={toggleMenu} />

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
        <MobileMenu items={menuItems} onItemClick={() => setMenuOpen(false)} />
      )}

      {/* Search Overlay */}
      {searchOpen && <SearchOverlay onClose={closeSearch} />}
    </Container>
  );
}
