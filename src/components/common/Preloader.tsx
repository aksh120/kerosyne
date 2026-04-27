"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          <style dangerouslySetInnerHTML={{__html: `
            html, body {
              overflow: hidden !important;
            }
            ::-webkit-scrollbar {
              display: none !important;
            }
            * {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}} />
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] bg-[#F7F7F7] flex items-center justify-center"
          >
            <video 
              src="/loader.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full max-w-[200px] md:max-w-[400px] h-auto object-contain"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
