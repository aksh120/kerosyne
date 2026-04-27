"use client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React, { useRef } from "react";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import Image from "next/image";
import NewsLetterSection from "./NewsLetterSection";
import LayoutSpacing from "./LayoutSpacing";
import { motion, useScroll, useTransform } from "framer-motion";

const socialsData: SocialNetworks[] = [
  { id: 3, icon: <FaInstagram />, url: "https://instagram.com" },
];

const paymentBadgesData: PaymentBadge[] = [
  { id: 1, srcUrl: "/icons/googlePay.svg" },
  { id: 2, srcUrl: "/icons/UPI.png" },
];

const Footer = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <footer ref={containerRef} className="mt-20 relative overflow-hidden bg-white border-t-[4px] border-black">
      <div className="relative z-10 -mt-10 px-4">
        <NewsLetterSection />
      </div>
      <motion.div style={{ y }} className="pt-16 md:pt-[50px] px-4 pb-4 bg-white relative z-0">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-8">
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
              <Link href="/" className="flex items-center mb-6">
                <h1 className={cn([integralCF.className, "text-[28px] lg:text-[32px]"])}>
                  KEROSYNE
                </h1>
              </Link>
              <p className="text-black/80 font-medium text-sm mb-9">
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className="flex items-center">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-white hover:bg-black hover:text-white transition-all mr-3 w-10 h-10 border-[3px] border-black flex items-center justify-center p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
              <LinksSection />
            </div>
          </nav>

          <hr className="h-[3px] border-black mb-6" />
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-6">
            <p className="text-sm font-bold text-center sm:text-left text-black mb-4 sm:mb-0 sm:mr-1 uppercase">
              KEROSYNE © 2026
            </p>
            <div className="flex items-center space-x-3">
              {paymentBadgesData.map((badge) => (
                <span
                  key={badge.id}
                  className="w-[50px] h-[34px] border-[2px] border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Image
                    priority
                    src={badge.srcUrl}
                    width={33}
                    height={100}
                    alt="payment method"
                    className="max-h-[15px]"
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center py-4 overflow-hidden">
            <h1 className={cn([integralCF.className, "text-[13vw] lg:text-[150px] xl:text-[175px] leading-none text-black tracking-tighter"])}>
              KEROSYNE
            </h1>
          </div>
        </div>
        <LayoutSpacing />
      </motion.div>
    </footer>
  );
};

export default Footer;
