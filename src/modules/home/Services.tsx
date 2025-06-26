import { Container } from "@components/ui/Containers";
import React from "react";

const ItemServiceData = [
  {
    name: "Design",
    description:
      "Rõ ràng, trực quan và mang tính định hình thương hiệu, các thiết kế của chúng tôi thu hút người dùng và quảng bá thương hiệu trên internet.",
    child: [
      {
        name: "Figma UX/UI",
        link: "#",
      },
      {
        name: "Brand Logo & Hình ảnh",
        link: "#",
      },
    ],
  },
  {
    name: "Phát triển",
    description:
      "Từ các trang web đến các ứng dụng di động sẵn sàng cho tương lai, iMovn thiết kế các nền tảng được xây dựng để hoạt động hiện tại & phát triển cải tiến cùng doanh nghiệp về sau.",
    child: [
      {
        name: "Web bán hàng & TMĐT",
        link: "#",
      },
      {
        name: "Web doanh nghiệp & Công ty",
        link: "#",
      },
      {
        name: "Phát triển web ứng dụng",
        link: "#",
      },
      {
        name: "Phát triển ứng dụng di động",
        link: "#",
      },
    ],
  },

  {
    name: "Tăng trưởng",
    description:
      "Chúng tôi xây dựng các chiến lược tăng trưởng lâu dài. Với SEO tổng thể, quảng cáo nhắm mục tiêu & thông tin chi tiết về UX, xây dựng hệ thống marketing online đa kênh bền vững.",
    child: [
      {
        name: "Quảng cáo Google",
        link: "#",
      },
      {
        name: "SEO tổng thể",
        link: "#",
      },
      {
        name: "Viết nội dung SEO",
        link: "#",
      },
      {
        name: "Xây dựng hệ thống đa kênh",
        link: "#",
      },
    ],
  },
];

export const Services = () => {
  return (
    <Container as="section" size="md" className="mt-32">
      <div className="head">
        <h2 className="text-primary font-semibold pb-4">Chúng tôi làm gì?</h2>
        <h4 className="md:text-4xl text-2xl font-bold font-archivo">
          Tất cả trong một – Đội ngũ duy nhất, cùng bạn từ ý tưởng đến triển
          khai & tăng trưởng.
        </h4>
        <p className="dark:text-neutral-400 text-neutral-800 pt-3">
          Tại sao phải chấp nhận các giải pháp outsource riêng lẻ trong khi mọi
          thứ bạn cần đều có ở đây? Chúng tôi thiết kế, phát triển và mang lại
          kết quả thực sự.
        </p>
      </div>
      <div className="service">
        <div className="group grid md:grid-cols-3 gap-6 mt-10">
          {ItemServiceData.map((item, index) => (
            <div
              key={index}
              className="dark:bg-neutral-900 bg-neutral-0 dark:text-white text-neutral-1000 p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
            >
              <div>
                <h3 className="text-xl font-archivo font-bold mb-4 capitalize">
                  {item.name}
                </h3>
                <p className="text-sm dark:text-neutral-400 text-neutral-900 mb-4">
                  {item.description}
                </p>
                <ul className="flex flex-wrap gap-2 flex-col text-sm">
                  {item.child.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.link}
                        className="text-primary hover:underline underline-offset-2"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Biểu tượng minh họa đơn giản theo khối như hình */}
              <div className="mt-6 flex justify-end">
                <div className="grid grid-cols-2 gap-1 w-10 h-10">
                  <div className="bg-neutral-700 rounded-md" />
                  <div className="bg-gradient-to-br from-primary-200 to-primary rounded-full" />
                  <div className="bg-neutral-700 rounded-md" />
                  <div className="bg-neutral-700 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
