"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "lib/utils/utils";

export function GradientBackground({
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

  // Gradient config với 4 màu cho light mode
  const lightGradient = [
    [240, 240, 245], // Light gray (0%)
    [232, 252, 255], // Light blue (33%)
    [240, 240, 240], // Medium blue (66%)
    [232, 252, 255], // Dark blue (100%)
  ];

  // Gradient config với 4 màu cho dark mode
  const darkGradient = [
    [0, 0, 0], // Dark blue (0%)
    [64, 64, 64], // Darker blue (33%)
    [60, 70, 90], // Dark slate (66%)
    [50, 50, 50], // Almost black (100%)
  ];

  // Sử dụng resolvedTheme
  const currentTheme = mounted ? resolvedTheme : "light";
  const gradientColors = currentTheme === "dark" ? darkGradient : lightGradient;

  if (!mounted) {
    return (
      <div
        className={cn(
          "min-h-screen w-full",
          currentTheme === "dark" ? "bg-[#0f172a]" : "bg-[#f0f0f5]",
          className
        )}
      >
        {children}
      </div>
    );
  }

  // Tính toán màu sắc dựa trên vị trí scroll
  const getGradientStops = () => {
    const stops = [];
    const segments = gradientColors.length - 1;

    // Thêm màu đầu tiên
    stops.push(`rgb(${gradientColors[0].join(",")}) 0%`);

    // Tính toán các điểm chuyển màu
    for (let i = 0; i < segments; i++) {
      const startPercent = i / segments;
      const endPercent = (i + 1) / segments;

      if (scrollPosition >= startPercent && scrollPosition <= endPercent) {
        const segmentProgress = (scrollPosition - startPercent) * segments;
        const currentColor = gradientColors[i].map((channel, index) => {
          const nextColor = gradientColors[i + 1][index] || channel;
          return Math.round(channel + (nextColor - channel) * segmentProgress);
        });

        stops.push(`rgb(${currentColor.join(",")}) ${scrollPosition * 100}%`);
      }

      // Thêm điểm dừng giữa các segment
      if (i < segments - 1) {
        stops.push(
          `rgb(${gradientColors[i + 1].join(",")}) ${endPercent * 100}%`
        );
      }
    }

    // Thêm màu cuối cùng
    stops.push(
      `rgb(${gradientColors[gradientColors.length - 1].join(",")}) 100%`
    );

    return stops.join(", ");
  };

  const gradientStyle = {
    background: `linear-gradient(to bottom, ${getGradientStops()})`,
    //hướng gradient từ trái sang phải
    //background: `linear-gradient(to right, ${getGradientStops()})`,
    //hiệu ứng phức tạp hơn (radial gradient)
    //background: `radial-gradient(circle at center, ${getGradientStops()})`,
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-all duration-300 ease-in-out",
        className
      )}
      style={gradientStyle}
    >
      {children}
    </div>
  );
}
