"use client";

import { Button } from "@components/ui/Button";
import { cn } from "lib/utils/utils";

interface AnimatedMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Component button menu với hiệu ứng chuyển đổi icon mượt mà
 * Phiên bản 1: Sử dụng CSS transform cho hamburger lines
 */
export function AnimatedMenuButton({
  isOpen,
  onClick,
  className,
}: AnimatedMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "md:hidden ml-2 text-neutral-100 p-2 rounded-full relative w-10 h-10",
        className
      )}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="flex flex-col justify-center items-center w-6 h-6 relative">
        {/* Top line */}
        <span
          className={cn(
            "absolute w-6 h-0.5 bg-current transition-all duration-300 ease-in-out",
            isOpen ? "rotate-45 translate-y-0" : "rotate-0 -translate-y-2"
          )}
        />

        {/* Middle line */}
        <span
          className={cn(
            "absolute w-6 h-0.5 bg-current transition-all duration-300 ease-in-out",
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}
        />

        {/* Bottom line */}
        <span
          className={cn(
            "absolute w-6 h-0.5 bg-current transition-all duration-300 ease-in-out",
            isOpen ? "-rotate-45 translate-y-0" : "rotate-0 translate-y-2"
          )}
        />
      </div>
    </Button>
  );
}

/**
 * Phiên bản 2: Sử dụng Framer Motion cho animation phức tạp hơn
 */
export function AnimatedMenuButtonWithMotion({
  isOpen,
  onClick,
  className,
}: AnimatedMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "md:hidden ml-2 text-neutral-100 p-2 rounded-full relative w-10 h-10",
        className
      )}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="flex flex-col justify-center items-center w-6 h-6 relative">
        {/* Animated hamburger to X */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500 ease-out",
            isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
          )}
        >
          {/* Top line */}
          <span
            className={cn(
              "absolute left-0 w-6 h-0.5 bg-current transition-all duration-300",
              "origin-center",
              isOpen ? "top-1/2 -translate-y-0.5 rotate-45" : "top-1 rotate-0"
            )}
          />

          {/* Middle line */}
          <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-0.5 w-6 h-0.5 bg-current transition-all duration-200",
              isOpen
                ? "opacity-0 scale-x-0"
                : "opacity-100 scale-x-100 delay-100"
            )}
          />

          {/* Bottom line */}
          <span
            className={cn(
              "absolute left-0 w-6 h-0.5 bg-current transition-all duration-300",
              "origin-center",
              isOpen
                ? "top-1/2 -translate-y-0.5 -rotate-45"
                : "bottom-1 rotate-0"
            )}
          />
        </div>
      </div>
    </Button>
  );
}

/**
 * Phiên bản 3: Icon rotation với scale effect
 */
export function AnimatedMenuButtonRotate({
  isOpen,
  onClick,
  className,
}: AnimatedMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "md:hidden ml-2 text-neutral-100 p-2 rounded-full transition-all duration-300",
        isOpen && "bg-neutral-800/50",
        className
      )}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-6">
        {/* Menu icon (hamburger) */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300 ease-out",
            isOpen
              ? "opacity-0 rotate-90 scale-75"
              : "opacity-100 rotate-0 scale-100"
          )}
        >
          <div className="flex flex-col justify-center items-center h-full space-y-1">
            <span className="w-5 h-0.5 bg-current" />
            <span className="w-5 h-0.5 bg-current" />
            <span className="w-5 h-0.5 bg-current" />
          </div>
        </div>

        {/* Close icon (X) */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300 ease-out",
            isOpen
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-75"
          )}
        >
          <div className="flex items-center justify-center h-full">
            <div className="relative w-5 h-5">
              <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-current transform -translate-y-0.5 rotate-45" />
              <span className="absolute top-1/2 left-0 w-5 h-0.5 bg-current transform -translate-y-0.5 -rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
}

/**
 * Phiên bản 4: Morphing animation (biến đổi từ hamburger thành X)
 */
export function AnimatedMenuButtonMorph({
  isOpen,
  onClick,
  className,
}: AnimatedMenuButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "md:hidden ml-2 text-neutral-100 p-2 rounded-full group",
        className
      )}
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <div className="absolute w-3 h-5">
          {/* Line 1 */}
          <span
            className={cn(
              "absolute left-0 w-4.5 h-0.5 bg-current transition-all duration-300 ease-out",
              "transform-gpu",
              isOpen
                ? "top-1/2 -translate-y-0.5 rotate-45 scale-110"
                : "top-1.5 rotate-0 scale-100"
            )}
          />

          {/* Line 2 */}
          {/* <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-0.5 w-6 h-0.5 bg-current transition-all duration-300 ease-out",
              "transform-gpu",
              isOpen
                ? "opacity-0 scale-x-0"
                : "opacity-100 scale-x-100 delay-75"
            )}
          /> */}

          {/* Line 3 */}
          <span
            className={cn(
              "absolute left-0 w-4.5 h-0.5 bg-current transition-all duration-300 ease-out",
              "transform-gpu",
              isOpen
                ? "top-1/2 -translate-y-0.5 -rotate-45 scale-110"
                : "bottom-1.5 rotate-0 scale-100"
            )}
          />
        </div>
      </div>
    </Button>
  );
}

// Export default as the best version
export default AnimatedMenuButtonMorph;
