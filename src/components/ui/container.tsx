// components/ui/container.tsx
"use client";

import { HTMLAttributes, forwardRef, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@shared/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  centered?: boolean;
  animate?: boolean;
  animationType?: "fade" | "slide-up" | "slide-down" | "zoom";
  animationDuration?: number;
  animationDelay?: number;
  threshold?: number;
}

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-down": {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      className,
      as: Component = "div",
      size = "2xl",
      centered = true,
      animate = false,
      animationType = "fade",
      animationDuration = 0.6,
      animationDelay = 0,
      threshold = 0.1,
      children,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const containerRef = useRef<HTMLElement>(null);

    const maxWidthClass = {
      xs: "max-w-[var(--breakpoint-xs)]",
      sm: "max-w-[var(--breakpoint-sm)]",
      md: "max-w-[var(--breakpoint-md)]",
      lg: "max-w-[var(--breakpoint-lg)]",
      xl: "max-w-[var(--breakpoint-xl)]",
      "2xl": "max-w-[var(--breakpoint-2xl)]",
      "3xl": "max-w-[var(--breakpoint-3xl)]",
      full: "max-w-full",
    }[size];

    useEffect(() => {
      if (!animate || !containerRef.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          }
        },
        { threshold }
      );

      observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, [animate, controls, threshold]);

    const MotionComponent = animate ? motion(Component) : Component;

    return (
      <MotionComponent
        ref={(node: HTMLElement) => {
          if (ref) {
            if (typeof ref === "function") {
              ref(node);
            } else {
              ref.current = node;
            }
          }
          containerRef.current = node;
        }}
        className={cn(
          "w-full px-4 sm:px-6 lg:px-8",
          centered && "mx-auto",
          maxWidthClass,
          className
        )}
        {...(animate
          ? {
              initial: "hidden",
              animate: controls,
              variants: animationVariants[animationType],
              transition: {
                duration: animationDuration,
                delay: animationDelay,
                ease: [0.16, 1, 0.3, 1],
              },
            }
          : {})}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

Container.displayName = "Container";

export { Container };
