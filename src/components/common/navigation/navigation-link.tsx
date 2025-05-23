"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { MenuItem } from "@shared/types/menu";
import { getItemUrl } from "@shared/lib/menu-metadata";
import { cn } from "@shared/lib/utils";

interface NavigationLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  item: MenuItem;
  baseUrl?: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  active?: boolean;
  // showIcon?: boolean;
}

/**
 * Component link cho navigation menu với hỗ trợ icons
 */
const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  (
    {
      item,
      baseUrl = "",
      className,
      iconBefore,
      iconAfter,
      active,
      // showIcon = false,
      ...props
    },
    ref
  ) => {
    const url = getItemUrl(item, baseUrl);

    // Xử lý external link
    const isExternal = url.startsWith("https");
    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer nofollow" }
      : {};

    return (
      <Link
        href={url}
        ref={ref}
        className={cn(
          "flex items-center py-2 text-sm transition-colors",
          "text-neutral-100 hover:text-primary",
          active && "text-primary font-medium",
          className
        )}
        {...externalProps}
        {...props}
      >
        {iconBefore}
        <span className="flex-1">{item.name}</span>
        {iconAfter}
      </Link>
    );
  }
);

NavigationLink.displayName = "NavigationLink";

export { NavigationLink };
