"use client";

import { Container } from "@components/ui/Containers";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground">
      <Container className="flex-1 md:mt-64 mt-40">{children}</Container>
    </div>
  );
}
