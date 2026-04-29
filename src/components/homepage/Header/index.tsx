import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";
import ClientHeroScene from "@/components/common/ClientHeroScene";

const Header = () => {
  return (
    <header
      className="text-black pt-10 md:pt-24 overflow-hidden relative bg-cover bg-[position:80%_center] md:bg-center bg-no-repeat min-h-[600px] md:min-h-[700px] lg:min-h-[800px]"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <section className="max-w-frame px-4 z-10 relative">
          <div className="bg-white/70 backdrop-blur-lg p-6 md:bg-transparent md:backdrop-blur-none md:p-0 border-2 border-black md:border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-none mb-10 md:mb-0">
            <motion.h2
              initial={{ y: "100px", opacity: 0, rotate: 10 }}
              whileInView={{ y: "0", opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={cn([
                integralCF.className,
                "text-4xl lg:text-[72px] lg:leading-[72px] mb-5 lg:mb-8 font-black uppercase tracking-tighter text-black leading-[1.1]",
              ])}
            >
              FIND CLOTHES THAT MATCH YOUR VIBE
            </motion.h2>
            <motion.p
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-black/70 text-sm lg:text-lg mb-6 lg:mb-8 max-w-[545px] font-medium"
            >
              Curated drip for the digital age. Browse our latest drops and elevate your aesthetic with exclusive, hyper-modern garments.
            </motion.p>
            <motion.div
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/shop"
                  className="w-full md:w-52 mb-5 md:mb-12 inline-flex justify-center items-center text-center bg-black hover:bg-black/80 text-white font-bold text-lg px-14 py-4 rounded-full transition-all border-2 border-white md:border-none"
                >
                  Shop Drop
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8"
            >
              <div className="flex flex-col">
                <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                  <AnimatedCounter from={0} to={200} />+
                </span>
                <span className="text-xs xl:text-base text-black/60 text-nowrap">
                  Good Reviews
                </span>
              </div>
              <Separator
                className="ml-6 md:ml-0 h-12 md:h-full bg-black/10"
                orientation="vertical"
              />
              <div className="flex flex-col ml-6 md:ml-0">
                <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                  <AnimatedCounter from={0} to={20} />+
                </span>
                <span className="text-xs xl:text-base text-black/60 text-nowrap">
                  High-Quality Products
                </span>
              </div>
              <Separator
                className="hidden sm:block sm:h-12 md:h-full ml-6 md:ml-0 bg-black/10"
                orientation="vertical"
              />
              <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
                <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                  <AnimatedCounter from={0} to={300} />+
                </span>
                <span className="text-xs xl:text-base text-black/60 text-nowrap">
                  Happy Customers
                </span>
              </div>
            </motion.div>
          </div>
        </section>
        {/* <section
          className="relative md:px-4 min-h-[448px] md:min-h-[428px] overflow-hidden flex items-center justify-center"
        >
          <HeroScene />
        </section> */}
      </div>
    </header>
  );
};

export default Header;

