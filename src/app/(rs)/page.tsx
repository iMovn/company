import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function Home() {
  return (
    <Container size="3xl" as="section">
      <Link href="/gioi-thieu">Giới Thiệu</Link>
      <Link href="/lien-he" className="container">
        Liên Hệ
      </Link>
      <Button className="">Hi</Button>
      <h1 className="text-6xl">Hello word</h1>
    </Container>
  );
}
