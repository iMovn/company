"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { MenuItem } from "@/types/menu";
import { getItemUrl } from "@/lib/menu-metadata";
import { cn } from "@/lib/utils";

interface NavigationLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  item: MenuItem;
  baseUrl?: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  active?: boolean;
}

/**
 * Component link cho navigation menu
 */
const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  (
    { item, baseUrl = "", className, iconBefore, iconAfter, active, ...props },
    ref
  ) => {
    const url = getItemUrl(item, baseUrl);

    // Xử lý external link
    const isExternal = url.startsWith("http");
    const externalProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
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
        <span>{item.name}</span>
        {iconAfter}
      </Link>
    );
  }
);

NavigationLink.displayName = "NavigationLink";

export { NavigationLink };
