import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto bg-[#F0F0F0] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-14 capitalize",
          ])}
        >
          BROWSE BY dress STYLE
        </motion.h2>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[190px] md:auto-rows-[289px]"
        >
          <div className="md:col-span-1 h-full">
            <DressStyleCard
              title="Casual"
              url="/shop#casual"
              className="bg-[url('/images/dress-style-1.png')]"
            />
          </div>
          <div className="md:col-span-2 h-full">
            <DressStyleCard
              title="Formal"
              url="/shop#formal"
              className="bg-[url('/images/dress-style-2.png')]"
            />
          </div>
          <div className="md:col-span-2 h-full">
            <DressStyleCard
              title="Party"
              url="/shop#party"
              className="bg-[url('/images/dress-style-3.png')]"
            />
          </div>
          <div className="md:col-span-1 h-full">
            <DressStyleCard
              title="Gym"
              url="/shop#gym"
              className="bg-[url('/images/dress-style-4.png')]"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;
