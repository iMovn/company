"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  // Thêm state để theo dõi xem component đã mount hay chưa
  const [mounted, setMounted] = useState(false);
  // Đánh dấu component đã mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Nếu component chưa mount, render một button "trống" để giữ layout
  // Điều này đảm bảo SSR và CSR sẽ render cùng một DOM structure
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="text-neutral-100 hover:text-primary p-1 rounded-full"
        aria-label="Toggle theme"
      >
        <div className="w-[18px] h-[18px]" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="text-neutral-100 hover:text-primary transition-colors p-1 rounded-full"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ModeToggle;
