"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "types/menu";
import { fetchMainMenu, fetchMobileMenu } from "lib/api/menu.service";

interface UseMobileMenuReturn {
  mobileMenu: MenuItem[];
  isLoading: boolean;
  error: string | null;
  menuSource: "mobile" | "main" | "fallback";
}

/**
 * Custom hook để quản lý mobile menu với fallback logic
 *
 * Tại sao cần hook này?
 * 1. Mobile UX khác Desktop - cần menu tối ưu riêng
 * 2. Fallback strategy khi không có mobile menu riêng
 * 3. Client-side fetching để tránh blocking SSR
 * 4. Error handling và loading states
 *
 * @param fallbackMenu - Menu dự phòng khi cả mobile và main đều fail
 * @returns Object chứa mobile menu, loading state, error và nguồn menu
 */
export function useMobileMenu(
  fallbackMenu: MenuItem[] = []
): UseMobileMenuReturn {
  const [mobileMenu, setMobileMenu] = useState<MenuItem[]>(fallbackMenu);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuSource, setMenuSource] = useState<"mobile" | "main" | "fallback">(
    "fallback"
  );

  useEffect(() => {
    const loadMobileMenu = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Bước 1: Thử fetch mobile menu trước
        // console.log("🔍 Đang tìm mobile menu riêng...");
        const mobileMenuData = await fetchMobileMenu();

        if (mobileMenuData.length > 0) {
          // Có mobile menu riêng -> sử dụng luôn
          setMobileMenu(mobileMenuData);
          setMenuSource("mobile");
          // console.log("✅ Sử dụng mobile menu riêng");
          return;
        }

        // Bước 2: Không có mobile menu -> fallback về main menu
        // console.log("⚠️ Không có mobile menu riêng, fallback về main menu...");
        const mainMenuData = await fetchMainMenu();

        if (mainMenuData.length > 0) {
          // Có main menu -> sử dụng cho mobile
          setMobileMenu(mainMenuData);
          setMenuSource("main");
          // console.log("✅ Sử dụng main menu cho mobile");
          return;
        }

        // Bước 3: Cả hai đều fail -> sử dụng fallback
        // console.log("⚠️ Cả mobile và main menu đều fail, dùng fallback menu");
        setMobileMenu(fallbackMenu);
        setMenuSource("fallback");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        console.error("❌ Lỗi trong useMobileMenu:", errorMessage);

        setError(errorMessage);
        setMobileMenu(fallbackMenu);
        setMenuSource("fallback");
      } finally {
        setIsLoading(false);
      }
    };

    // Chỉ load khi ở client-side để tránh hydration mismatch
    if (typeof window !== "undefined") {
      loadMobileMenu();
    } else {
      // Server-side: sử dụng fallback menu
      setIsLoading(false);
    }
  }, [fallbackMenu]);

  return {
    mobileMenu,
    isLoading,
    error,
    menuSource,
  };
}
