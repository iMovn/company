"use client";

import { ContactForm } from "../form/ContactForm";
import { Database, Phone, Star } from "lucide-react";
import { cn } from "lib/utils/utils";
import dynamic from "next/dynamic";

const SpotlightCard = dynamic(() => import("@components/ui/SpotlightCard"), {
  ssr: false,
});
const CountUp = dynamic(() => import("@components/ui/CountUp"), {
  ssr: false,
});

export default function FooterClient() {
  return (
    <SpotlightCard
      className={cn(
        "my-20 rounded-3xl shadow-lg shadow-neutral-300 dark:shadow-neutral-1000",
        "dark:border-0 dark:border-transparent dark:bg-radial-[at_0%_100%] dark:from-neutral-950/80 dark:via-neutral-900 dark:to-transparent",
        "bg-neutral-50 border-[1px] border-primary/30"
      )}
      spotlightColor="rgba(0, 229, 255, 0.3)"
    >
      <section className="form-group grid md:grid-cols-[40%_58%] gap-4 md:py-0 py-3  dark:bg-neutral-1000/70">
        {/* Left content */}
        <div className="md:p-8 p-5 space-y-6">
          <div>
            <h4 className="text-3xl mb-2 font-archivo font-bold">
              Làm việc với IMO VN
            </h4>
            <p className="text-sm text-neutral-800 dark:text-neutral-400">
              Để đảm bảo chất lượng chúng tôi chỉ nhận 3 dự án mỗi quý.
            </p>
          </div>
          <hr />
          {/* Features List - Matching the image design */}
          <div className="space-y-5">
            {/* Slots Feature */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center flex-shrink-0">
                <Database className="w-4 h-4 dark:text-gray-300" />
              </div>
              <div>
                <h5 className="font-semibold text-base">01 Slot</h5>
                <p className="text-sm text-neutral-800 dark:text-neutral-400">
                  Còn lại trong quý tới
                </p>
              </div>
            </div>

            {/* Book Intro Call Feature */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 dark:text-gray-300" />
              </div>
              <div>
                <h5 className="font-semibold text-base">Trao đổi 15 phút</h5>
                <p className="text-sm text-neutral-800 dark:text-neutral-400">
                  iMovn có thể hỗ trợ bạn
                </p>
              </div>
            </div>

            {/* Reviews Feature */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary-700 flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 bg-error rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-warning text-warning"
                    />
                  ))}
                </div>
                <CountUp
                  from={0}
                  to={126}
                  duration={3}
                  suffix="+"
                  className="text-sm text-neutral-800 dark:text-neutral-400 font-medium"
                />{" "}
                <span className="text-sm text-neutral-800 dark:text-neutral-400 font-medium">
                  REVIEW
                </span>
              </div>
            </div>
          </div>

          {/* Progress or Additional Info */}
          <div className="pt-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-0">
                  Dự án đã thực hiện
                </span>
                <CountUp
                  from={0}
                  to={252}
                  duration={2}
                  className="text-sm font-semibold text-white"
                />
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <ContactForm className="md:border-l-[1px] border-gray-700/30 md:p-8 p-5" />
      </section>
    </SpotlightCard>
  );
}
