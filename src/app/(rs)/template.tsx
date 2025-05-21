export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animation-appear">{children}</div>;
}
