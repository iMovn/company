"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Container } from "@components/ui/Containers";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

const TechCodeLogo = [
  { src: "/partner/nestjs-imovn.png", alt: "Acme Logo" },
  { src: "/partner/prisma-imovn.png", alt: "Quantum Logo" },
  { src: "/partner/mongodb-imovn.png", alt: "Echo Logo" },
  { src: "/partner/laravel-imovn.png", alt: "Apexs Logo" },
  { src: "/partner/reactjs-imovn.png", alt: "Pulse Logo" },
  { src: "/partner/nextjs-imovn.png", alt: "Apex Logo" },
  { src: "/partner/vercel-imovn.png", alt: "Apexs Logo" },
];

export const Partner = () => {
  return (
    <Container size="md" as="section">
      <h4 className="text-sm dark:text-neutral-400 text-neutral-800 font-bold mt-8">
        Công nghệ code app hiện đại
      </h4>
      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={40}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          grabCursor={false}
          allowTouchMove={false}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
          className="select-none"
        >
          {TechCodeLogo.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-20">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={140}
                  height={55}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
};
