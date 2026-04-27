"use client";
import React from "react";
import { motion } from "framer-motion";

const marqueeText = [
  "KEROSYNE",
  "//",
  "NEW ARRIVALS",
  "//",
  "FAST FASHION IS DEAD",
  "//",
  "KEROSYNE",
  "//",
  "EST. 2025",
  "//",
];

const Brands = () => {
  return (
    <div className="bg-black py-6 md:py-10 overflow-hidden relative w-full flex items-center shadow-[0_8px_0px_0px_rgba(0,0,0,1)] z-10">
      <motion.div
        className="flex whitespace-nowrap items-center w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {[...marqueeText, ...marqueeText, ...marqueeText, ...marqueeText, ...marqueeText].map((text, idx) => (
          <span
            key={idx}
            className={`text-white font-black uppercase tracking-widest text-3xl md:text-5xl mx-6 md:mx-10 ${text === "//" ? "text-white/40" : "hover:text-transparent hover:webkit-text-stroke-[2px_white] transition-all"}`}
            style={text !== "//" ? { WebkitTextStroke: "2px white" } : {}}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Brands;
