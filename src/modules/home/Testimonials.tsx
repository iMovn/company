import { AnimatedTestimonials } from "@components/ui/Testimonials/animated-testimonials";

const testimonials = [
  {
    quote:
      "Thiết kế website của iMovn rất sáng tạo và độc đáo. Họ đã giúp chúng tôi tăng khả năng tiếp cận khách hàng thông qua SEO hiệu quả. Tôi hoàn toàn tin tưởng vào chất lượng dịch vụ của họ.",
    name: "Bs. Phạm Thái Tuấn",
    designation: "Vimec Capital",
    src: "/images/story-web-design-01.jpg",
  },
  {
    quote:
      "iMovn đã thiết kế cho chúng tôi một trang web chuyên nghiệp và thân thiện với người dùng. Từ lúc bắt đầu đến khi hoàn thành, đội ngũ luôn làm việc nhiệt tình và chu đáo. Tôi rất hài lòng.",
    name: "Ms. My Thảo",
    designation: "Lead myHome",
    src: "/images/story-web-design-05.jpg",
  },
  {
    quote:
      "Website của chúng tôi không chỉ đẹp mắt mà còn chuẩn SEO, giúp tăng lượng truy cập đáng kể. Đội ngũ iMovn luôn sẵn sàng hỗ trợ mọi lúc mọi nơi. Dịch vụ tuyệt vời và chuyên nghiệp!",
    name: "Mrs. Nguyên Hy",
    designation: "Digital Cf147",
    src: "/images/testimonial-imovn-04.jpg",
  },
  {
    quote:
      "iMovn đã biến ý tưởng của chúng tôi thành hiện thực với một trang web hiện đại và dễ sử dụng. Chúng tôi rất ấn tượng với sự tận tâm và chuyên nghiệp của họ. Rất đáng để hợp tác lâu dài.",
    name: "Mr. Gia Huy",
    designation: "BĐS Gia Phát",
    src: "/images/story-web-design-02.jpg",
  },
  {
    quote:
      "Trang web mới của chúng tôi đã nhận được nhiều lời khen ngợi từ khách hàng. Tốc độ tải trang nhanh và giao diện thân thiện đã cải thiện trải nghiệm người dùng. Cảm ơn iMovn vì dịch vụ tuyệt vời.",
    name: "Mr. Thái Khang",
    designation: "Lead ViBookCar",
    src: "/images/story-web-design-04.jpg",
  },
];

export default function FancyTestimonials() {
  return <AnimatedTestimonials testimonials={testimonials} />;
}
