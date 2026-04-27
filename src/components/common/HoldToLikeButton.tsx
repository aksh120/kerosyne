"use client";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function HoldToLikeButton() {
  const [liked, setLiked] = useState(false);
  const controls = useAnimation();

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (liked) {
      setLiked(false);
      controls.set({ scale: 1 });
      return;
    }
    controls
      .start({
        scale: [1, 1.5],
        transition: { duration: 0.6 },
      })
      .then(() => setLiked(true));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!liked) {
      controls.stop();
      controls.start({ scale: 1, transition: { duration: 0.2 } });
    }
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={(e) => e.preventDefault()}
      className="absolute top-3 right-3 p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg z-20 hover:bg-white transition-colors"
      title="Hold to like"
    >
      <motion.div animate={controls}>
        {liked ? (
          <FaHeart className="text-red-500 text-lg" />
        ) : (
          <FaRegHeart className="text-black text-lg" />
        )}
      </motion.div>
    </button>
  );
}
