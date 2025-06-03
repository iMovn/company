"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "lib/utils/utils";

export function GradientBackgroundTwoColor({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollPosition(
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gradient config cho light mode
  const lightGradient = {
    start: [255, 255, 255], // Light gray
    mid: [235, 237, 239], // Light blue
    end: [61, 85, 103], // Dark blue
  };

  // Gradient config cho dark mode
  const darkGradient = {
    start: [2, 2, 2], // Dark blue
    mid: [9, 12, 15], // Darker blue
    end: [61, 85, 103], // Almost black
  };

  // Sử dụng resolvedTheme thay vì theme để tránh flash không mong muốn
  const currentTheme = mounted ? resolvedTheme : "light";
  const gradientConfig = currentTheme === "dark" ? darkGradient : lightGradient;

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-full",
          currentTheme === "dark" ? "bg-[#0f172a]" : "bg-[#f0f0f5]",
          className
        )}
      >
        {children}
      </div>
    );
  }

  const gradientStyle = {
    background: `linear-gradient(
      to bottom,
      rgb(${gradientConfig.start.join(",")}) 0%,
      rgb(${gradientConfig.mid
        .map((channel, i) =>
          Math.round(
            channel + (gradientConfig.end[i] - channel) * scrollPosition
          )
        )
        .join(",")}) ${scrollPosition * 100}%,
      rgb(${gradientConfig.end.join(",")}) 100%
    )`,
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-500 ease-in-out",
        className
      )}
      style={gradientStyle}
    >
      {children}
    </div>
  );
}
