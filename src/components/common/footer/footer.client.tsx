"use client";

import { ContactForm } from "../form/ContactForm";
import SpotlightCard from "@components/ui/SpotlightCard";

export default function FooterClient() {
  return (
    <SpotlightCard
      className="my-20 rounded-2xl shadow-lg"
      spotlightColor="rgba(0, 229, 255, 0.3)"
    >
      <section className="form-group grid md:grid-cols-[40%_58%] gap-4 dark:bg-neutral-950/80 bg-neutral-50 ">
        <div className="md:p-8 p-5">
          <h4 className="text-3xl mb-2 font-archivo font-bold">
            Làm việc với IMO VN
          </h4>

          <p className="text-sm">
            Để đảm bảo chất lượng chúng tôi chỉ nhận 3 dự án mỗi quý.
          </p>
        </div>

        <ContactForm className="md:border-l-[1px] md:p-8 p-5" />
      </section>
    </SpotlightCard>
  );
}
