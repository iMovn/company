"use client";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PostItem } from "types/all-posts";
import { fetchNewsPostHome } from "lib/api/post.service";
import { Container } from "@components/ui/Containers";

const NewsPosts = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [lastNews, setLastNews] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Memoize hover handlers to prevent unnecessary re-renders
  const handleMouseEnter = useCallback((index: number) => {
    setHoveredCard(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  // Fetch bài viết mới (4 bài)
  useEffect(() => {
    const fetchNewsPost = async () => {
      setIsLoading(true);
      try {
        const data = await fetchNewsPostHome();
        setLastNews(data);
      } catch (error) {
        console.error("Failed to fetch news posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsPost();
  }, []);

  return (
    <Container size="lg" className="mb-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.3,
            duration: 0.4,
          },
        }}
        viewport={{ once: true }}
        className="mb-4"
      >
        <h2 className="text-primary font-semibold pb-4">Blog & Tin tức</h2>
        <h4 className="md:text-5xl text-2xl font-bold font-archivo">
          Chia sẻ những kiến thức
          <br />
          Digital Marketing
        </h4>
        <p className="dark:text-neutral-400 text-neutral-800 pt-3">
          Cung cấp thông tin, kiến thức & kinh nghiệm về marketing online, phát
          triển ứng dụng giúp bạn hiểu rõ hơn về lĩnh vực này và áp dụng vào
          công việc hoặc kinh doanh.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative w-full h-96 rounded-lg bg-gray-200 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.3,
              duration: 0.4,
              staggerChildren: 0.1,
            },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {lastNews.map((blog, index) => (
            <Link href={`/${blog.slug}`} key={blog.id}>
              <div
                className="block h-full will-change-transform"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="group relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
                  {/* Image overlay - Using opacity for better performance */}
                  <div
                    className="absolute inset-0 bg-black z-10 transition-opacity duration-300 ease-out"
                    style={{
                      opacity: hoveredCard === index ? 0.5 : 0.3,
                    }}
                  ></div>

                  {/* Background image with Next.js Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={blog.image_url || "/img-default.jpg"}
                      alt={blog.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover will-change-transform transition-transform duration-500 ease-out"
                      style={{
                        transform:
                          hoveredCard === index ? "scale(1.1)" : "scale(1)",
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAJAA1dvJgAAAABJRU5ErkJggg=="
                    />
                  </div>

                  {/* Category tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-teal-400 text-[12px] text-white px-2 py-1 rounded-md font-medium">
                      {blog.categories && blog.categories.length > 0
                        ? blog.categories[0].name
                        : "Tin tức"}
                    </span>
                  </div>

                  {/* Date and title - Using transform for better performance */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 z-20 transition-transform duration-300 ease-out will-change-transform"
                    style={{
                      transform:
                        hoveredCard === index
                          ? "translateY(-4.5rem)"
                          : "translateY(0)",
                    }}
                  >
                    <p className="text-primary-100 text-sm mb-2">
                      {new Date(blog.created_at).toLocaleDateString("vi-VN")}
                    </p>
                    <h3 className="text-white text-base font-bold leading-tight line-clamp-2">
                      {blog.name}
                    </h3>
                  </div>

                  {/* Description (visible on hover) - Using transform and opacity for better performance */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-300 ease-out delay-75 will-change-transform"
                    style={{
                      opacity: hoveredCard === index ? 1 : 0,
                      transform:
                        hoveredCard === index
                          ? "translateY(0)"
                          : "translateY(100%)",
                    }}
                  >
                    <p className="text-white text-sm mt-2 line-clamp-3">
                      {blog.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      )}

      {!isLoading && lastNews.length > 4 && (
        <div className="mt-8 text-center">
          <Link
            href="/tin-tuc"
            className="inline-block px-6 py-2 bg-primary_layout text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </Container>
  );
};

export default NewsPosts;
