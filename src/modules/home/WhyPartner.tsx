"use client";
import { Parallax } from "react-parallax";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/Accordion/accordion";
import { Container } from "@components/ui/Containers";

const accordionData = [
  {
    title: "Kinh nghiệm & Chuyên môn",
    content:
      "Chúng tôi có một đội ngũ chuyên viên có tay nghề cao, giàu kinh nghiệm trong lĩnh vực của mình, đảm bảo rằng bạn sẽ nhận được dịch vụ và kết quả chất lượng hàng đầu.",
  },
  {
    title: "Giải pháp được thiết kế riêng",
    content:
      "Chúng tôi hiểu rằng mỗi khách hàng đều có nhu cầu và yêu cầu riêng. Chúng tôi làm việc chặt chẽ với bạn để hiểu mục tiêu cụ thể của bạn & điều chỉnh các dịch vụ của chúng tôi để đáp ứng những nhu cầu đó.",
  },
  {
    title: "Minh bạch & Truyền thông",
    content:
      "Chúng tôi tin vào sự giao tiếp cởi mở và rõ ràng, điều này rất cần thiết cho một mối quan hệ làm việc thành công. Chúng tôi sẽ thông báo và cập nhật cho bạn trong suốt quá trình.",
  },
  {
    title: "Hướng đến chất lượng & Kết quả",
    content:
      "Chúng tôi hướng đến kết quả và tập trung vào việc mang lại những kết quả có thể đo lường được cho khách hàng.",
  },
  {
    title: "Hỗ trợ toàn diện",
    content:
      "Chúng tôi không chỉ hoàn thành dự án mà còn liên tục hỗ trợ khách hàng để đảm bảo bạn hài lòng với kết quả và cung cấp bất kỳ trợ giúp bổ sung nào bạn cần.",
  },
];

const backgroundImageUrl = "/images/imo-marketing-online-banner.jpg";
export default function WhyPartner() {
  return (
    <div className="relative mt-24">
      <Parallax
        strength={150}
        bgImage={backgroundImageUrl}
        bgImageAlt="bg-imovn"
        className="hidden md:block"
        bgImageStyle={{
          minHeight: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "brightness(0.7)",
        }}
      >
        <div className="h-[900px]" />
      </Parallax>
      {/* Overlay Content */}
      <div className="md:absolute inset-0 flex items-center justify-center z-10 px-4 md:px-0">
        <Container
          size="sm"
          className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-primary font-semibold pb-4">
            Tại sao đối tác chọn iMovn
          </h2>
          <h4 className="text-3xl md:text-5xl md:leading-14 font-bold font-archivo text-gray-900 mb-4">
            Niềm đam mê,
            <br /> Thực tiễn & Chuyên môn
          </h4>
          <p className="text-neutral-900 mb-6">
            Trọng tâm công việc của chúng tôi là cách tiếp cận cá nhân. Chúng
            tôi dành thời gian để thực sự lắng nghe và hiểu doanh nghiệp của
            bạn, tạo ra các giải pháp phù hợp giúp hợp lý hóa hoạt động, nâng
            cao hiệu suất và mang lại hiệu quả bền vững.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {accordionData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-neutral-1000 font-archivo font-semibold text-lg hover:text-primary ">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-900 text-base">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </div>
    </div>
  );
}
