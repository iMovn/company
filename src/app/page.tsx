import Hero from "@modules/home/Hero";
import NewsPosts from "@modules/home/NewPost";
import Partner from "@modules/home/Partner";
import Services from "@modules/home/Services";
import FancyTestimonials from "@modules/home/Testimonials";
import WhyPartner from "@modules/home/WhyPartner";

export default function Home() {
  return (
    <>
      <Hero />
      <Partner />
      <Services />
      <WhyPartner />
      <FancyTestimonials />
      <NewsPosts />
    </>
  );
}
