"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { MenuItem } from "types/menu";
import { getItemUrl } from "lib/data/menu-metadata";
import { cn } from "lib/utils/utils";

interface NavigationLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  item: MenuItem;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  active?: boolean;
}

/**
 * Component link cho navigation menu với hỗ trợ icons
 */
const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ item, className, iconBefore, iconAfter, active, ...props }, ref) => {
    const url = getItemUrl(item);

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
          "flex items-center py-2 text-sm",
          "hover:text-primary",
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
