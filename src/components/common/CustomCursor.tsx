"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-[3px] border-black pointer-events-none z-[9999] hidden md:flex items-center justify-center backdrop-invert"
      animate={{ 
        x: mousePosition.x - 16, 
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    >
        {isHovering && <div className="w-2 h-2 bg-black rounded-full" />}
    </motion.div>
  );
}
