"use client";

import * as React from "react";
import { Button } from "@components/ui/Button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  // Thêm state để theo dõi xem component đã mount hay chưa
  const [mounted, setMounted] = React.useState(false);
  // Tránh hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Nếu component chưa mount, render một button "trống" để giữ layout
  // Điều này đảm bảo SSR và CSR sẽ render cùng một DOM structure
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="hover:text-primary p-1 rounded-full"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <Button
      variant="ghost"
      className="hover:text-primary transition-colors p-1 rounded-full md:[&_svg]:size-4 [&_svg]:size-4.5"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeToggler;
