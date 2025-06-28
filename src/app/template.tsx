export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground">
      <div className="flex-1 md:mt-64 mt-40">{children}</div>
    </div>
  );
}
