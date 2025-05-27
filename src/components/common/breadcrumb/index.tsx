"use client";

import Link from "next/link";

interface Crumb {
  name: string;
  slug: string;
  is_active: boolean;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-4 text-sm">
      <ol className="flex flex-wrap gap-2">
        {items.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <Link
              href={`/${crumb.slug}`}
              className={`hover:text-primary ${
                crumb.is_active ? "text-primary font-medium" : ""
              }`}
            >
              {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
