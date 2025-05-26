// import dynamic from "next/dynamic";

// const ContactForm = dynamic(
//   () => import('@/components/ui/contact-form'),
//   {
//     loading: () => <p>Loading form...</p>,
//     ssr: false // Chỉ tải phía client
//   }
// )

export default function ContactPage() {
  return (
    <section>
      <h1>Liên hệ</h1>
      {/* <ContactForm /> */}
    </section>
  );
}
