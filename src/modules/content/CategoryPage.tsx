import Link from "next/link";
import { CategoryData } from "types/categories";
import PostCard from "./components/PostCard";

export default function CategoryPage({ category }: { category: CategoryData }) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm">
        <ol className="flex flex-wrap gap-2">
          {category.breadcrumbs.map((crumb, index) => (
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

      {/* Category Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.details.name}</h1>
        {category.details.description && (
          <p className="text-lg text-gray-600">
            {category.details.description}
          </p>
        )}
      </header>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {category.items.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Category Content */}
      {category.details.content && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: category.details.content }}
        />
      )}
    </div>
  );
}
