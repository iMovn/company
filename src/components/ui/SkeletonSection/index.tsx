export function NavSkeleton() {
  return (
    <div className="hidden md:flex gap-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-6 w-20 bg-neutral-800 rounded animate-pulse"
        />
      ))}
    </div>
  );
}

export function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 bg-muted rounded w-1/2 mb-6"></div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="container mx-auto px-4 py-8">
        <div className="h-10 bg-muted rounded w-4/5 mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
        <div className="aspect-video bg-muted rounded mb-6"></div>
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <div className="h-48 bg-muted animate-pulse rounded" />
      <div className="space-y-2">
        <div className="h-6 bg-muted animate-pulse rounded" />
        <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-5 w-24 bg-muted animate-pulse rounded" />
          <div className="space-y-1">
            {Array.from({ length: 3 }, (_, j) => (
              <div key={j} className="h-4 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
