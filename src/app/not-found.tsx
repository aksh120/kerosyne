"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-white overflow-hidden relative">
      {/* Decorative Neo-Brutalist elements */}
      <div className="absolute top-10 left-10 w-24 h-24 border-[4px] border-black rotate-12 -z-10 opacity-20 hidden md:block" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-black rotate-45 -z-10 opacity-5 hidden md:block" />
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl text-center"
      >
        <div className="inline-block border-[6px] border-black bg-white px-8 py-4 mb-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default">
          <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter italic">
            404
          </h1>
        </div>

        <div className="space-y-4 mb-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
            Page Not Found
          </h2>
          <p className="text-black/60 font-bold uppercase tracking-widest text-sm md:text-base max-w-md mx-auto">
            The page you're looking for has either been moved or no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/">
            <button className="group flex items-center space-x-3 bg-black text-white px-10 py-5 font-black uppercase tracking-widest border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none min-w-[240px]">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              <span>Back Home</span>
            </button>
          </Link>

          <Link href="/shop">
            <button className="group flex items-center space-x-3 bg-white text-black px-10 py-5 font-black uppercase tracking-widest border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-x-1 active:translate-y-1 active:shadow-none min-w-[240px]">
              <Search className="w-5 h-5 group-hover:scale-125 transition-transform" />
              <span>Go to Shop</span>
            </button>
          </Link>
        </div>

        {/* Simplified info footer */}
        <div className="mt-16 text-[10px] font-mono font-bold text-black/20 uppercase tracking-widest">
          ERROR CODE: 404 // {new Date().toLocaleDateString()} // KEROSYNE GLOBAL
        </div>
      </motion.div>
    </div>
  );
}
