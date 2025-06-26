"use client";
import { AnimatedTooltip } from "@components/ui/Tooltip/animated-tooltip";
import { Button } from "@components/ui/Button";
import { Container } from "@components/ui/Containers";
import Link from "next/link";

const people = [
  {
    id: 1,
    name: "Yến Nhi",
    designation: "Software Engineer",
    image: "/images/imo-team-5.jpg",
  },
  {
    id: 2,
    name: "Thái Hoàng",
    designation: "Product Manager",
    image: "/images/imo-team-2.jpg",
  },
  {
    id: 3,
    name: "Văn Hùng",
    designation: "Data Scientist",
    image: "/images/imo-team-1.jpg",
  },
  {
    id: 4,
    name: "Gia Hân",
    designation: "UX Designer",
    image: "/images/imo-team-4.jpg",
  },
  {
    id: 5,
    name: "Thanh Trương",
    designation: "Soap Developer",
    image: "/images/imo-team-3.jpg",
  },
  {
    id: 6,
    name: "Cẩm Vy",
    designation: "Soap Developers",
    image: "/images/imo-team-6.jpg",
  },
];

export const Hero = () => {
  return (
    <Container size="md" className="space-y-8">
      <section className="space-y-6">
        <h2 className="flex flex-col md:text-7xl md:leading-20 text-5xl font-archivo font-bold">
          <div>
            Thiết kế<span className="text-primary">.</span>
          </div>
          <div>
            Phát triển<span className="text-primary">.</span>
          </div>
          <div>
            Tăng trưởng<span className="text-primary">.</span>
          </div>
        </h2>
        <div className="space-y-2 text-lg">
          <p className="dark:text-neutral-400 text-neutral-800">
            Từ giao diện ấn tượng đến chiến lược marketing tăng trưởng. Chúng
            tôi đồng hành cùng doanh nghiệp trên hành trình số hóa và bứt phá
            doanh thu.
          </p>
          <p className="dark:text-neutral-400 text-neutral-800 font-semibold text-base">
            <span className="text-primary font-bold">#3</span> giá trị cốt lõi:
          </p>
          <ul className="list-disc ml-6">
            <li>Thiết kế ấn tượng & Tối ưu UX/UI, SEO</li>
            <li>Phát triển Website & App công nghệ mạnh mẽ</li>
            <li>Chiến lược tăng trưởng với hệ thống bền vững</li>
          </ul>
        </div>
      </section>
      <div className="cta flex items-center gap-6">
        <div className="flex flex-row items-center">
          <AnimatedTooltip items={people} />
        </div>

        <Button
          asChild
          className="bg-primary hover:bg-neutral-500 rounded-full text-neutral-0 hover:text-neutral-950"
        >
          <Link href="#footer" className="text-lg !font-extrabold py-5">
            Liên hệ tư vấn viên
          </Link>
        </Button>
      </div>
    </Container>
  );
};
