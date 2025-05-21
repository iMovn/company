"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Menu, Search, X, ChevronDown } from "lucide-react";

import { fallbackMainMenu } from "@/lib/menu-metadata";
import { MenuItem } from "@/types/menu";
import { getMainMenu } from "@/app/api/menu";
import DesktopNav from "../navigation/desktop-nav";
import { MobileMenu } from "../navigation/mobile-menu";
import Logo from "../navigation/logo";
import ModeToggle from "../theme/mode-toggle";

/**
 * Component navbar chính của ứng dụng
 */
export default function Navbar() {
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
    <header className="w-full">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <nav className="bg-neutral-900/80 backdrop-blur-md rounded-full py-2 px-4 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 text-neutral-100 p-1 rounded-full"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Right Side Utilities */}
          <div className="flex items-center space-x-3">
            {/* Search Toggle */}
            <button
              className="text-neutral-100 hover:text-primary transition-colors p-1 rounded-full"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Availability Badge */}
            <div className="hidden md:flex items-center text-xs bg-neutral-800 rounded-full px-3 py-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              <span className="text-neutral-100">
                1 Slot{" "}
                <span className="text-neutral-400">remaining this quarter</span>
              </span>
            </div>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:flex items-center justify-center bg-neutral-100 text-neutral-900 hover:bg-primary hover:text-neutral-100 transition-colors rounded-full px-4 py-1.5 text-sm font-medium"
            >
              Get in touch
              <div className="ml-1 bg-neutral-900 text-neutral-100 rounded-full w-5 h-5 flex items-center justify-center">
                <ChevronDown size={14} />
              </div>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <MobileMenu
            items={menuItems}
            onItemClick={() => setMenuOpen(false)}
          />
        )}

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute top-14 left-0 w-full bg-neutral-900/95 backdrop-blur-md rounded-xl p-4 shadow-lg fade-in z-40">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-neutral-800 text-neutral-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Search
                className="absolute left-3 top-2.5 text-neutral-400"
                size={18}
              />
              <button
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-100 transition-colors"
                onClick={toggleSearch}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-3 text-xs text-neutral-400">
              Press ESC to close search
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
