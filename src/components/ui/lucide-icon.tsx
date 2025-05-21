"use client";

import { useEffect, useRef } from "react";
import { createIcons, icons } from "lucide";

// Mở rộng type cho createIcons để chấp nhận tham số root
interface CreateIconsOptions {
  icons?: Record<string, string | unknown>;
  nameAttr?: string;
  attrs?: Record<string, string | number>;
  root?: HTMLElement;
}

// Hàm khởi tạo icons với type tùy chỉnh
function createIconsWithRoot(options: CreateIconsOptions) {
  return createIcons(options);
}

// Khởi tạo icons một lần cho toàn ứng dụng
export function initLucideIcons() {
  if (typeof window !== "undefined") {
    createIconsWithRoot({
      icons,
      attrs: {
        "stroke-width": 1.5,
        width: 20,
        height: 20,
      },
    });
  }
}

interface LucideIconProps {
  name: string | null | undefined;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * Component hiển thị icon Lucide với data-lucide attribute
 */
export function LucideIcon({
  name,
  size,
  className = "",
  color,
  strokeWidth,
}: LucideIconProps) {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!name || !iconRef.current) return;

    // Cách 1: Sử dụng DOM API để thêm icon và khởi tạo
    const iconElement = document.createElement("i");
    iconElement.setAttribute("data-lucide", name);

    // Set size attributes
    if (size) {
      iconElement.setAttribute("width", size.toString());
      iconElement.setAttribute("height", size.toString());
    }

    // Set stroke width
    if (strokeWidth) {
      iconElement.setAttribute("stroke-width", strokeWidth.toString());
    }

    // Set color
    if (color) {
      iconElement.style.color = color;
    }

    // Xóa nội dung hiện tại và thêm icon
    if (iconRef.current) {
      iconRef.current.innerHTML = "";
      iconRef.current.appendChild(iconElement);

      // Khởi tạo icon với hàm tùy chỉnh
      createIconsWithRoot({
        icons,
        attrs: {
          "stroke-width": strokeWidth || 1.5,
          width: size || 20,
          height: size || 20,
        },
        root: iconRef.current,
      });
    }
  }, [name, size, color, strokeWidth]);

  if (!name) return null;

  return <div ref={iconRef} className={className} />;
}

/**
 * Cách triển khai thay thế sử dụng HTML trực tiếp nếu cần
 */
export function LucideIconSimple({
  name,
  size = 20,
  className = "",
  color,
  strokeWidth = 1.5,
}: LucideIconProps) {
  useEffect(() => {
    // Khởi tạo tất cả icons sau khi component mount
    initLucideIcons();
  }, []);

  if (!name) return null;

  // Tạo inline style
  const style: React.CSSProperties = {};
  if (color) {
    style.color = color;
  }

  // Sử dụng dangerouslySetInnerHTML để tạo icon
  // Lưu ý: Cách này an toàn vì chúng ta kiểm soát nội dung hoàn toàn
  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{
        __html: `<i data-lucide="${name}" width="${size}" height="${size}" stroke-width="${strokeWidth}"></i>`,
      }}
    />
  );
}

/**
 * Component khởi tạo tất cả icons cho toàn ứng dụng
 */
export function InitIcons() {
  useEffect(() => {
    initLucideIcons();
  }, []);

  return null;
}
