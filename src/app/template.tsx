"use client";

import { Container } from "@components/ui/Containers";

export default function Template({ children }: { children: React.ReactNode }) {
  return <Container className="flex-1 mt-64">{children}</Container>;
}
