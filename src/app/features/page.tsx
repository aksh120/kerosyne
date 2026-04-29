import React from "react";
import { Zap, Shield, Globe, Cpu } from "lucide-react";

const features = [
  {
    title: "Fast Delivery",
    desc: "Optimized shipping networks ensuring your order arrives as quickly as possible.",
    icon: Zap
  },
  {
    title: "Secure Payments",
    desc: "Industry-standard encryption to keep your transaction data safe and private.",
    icon: Shield
  },
  {
    title: "Global Shipping",
    desc: "We ship to over 150 countries worldwide. True global coverage.",
    icon: Globe
  },
  {
    title: "Authentic Quality",
    desc: "Every item in our collection is guaranteed to be 100% authentic.",
    icon: Cpu
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-6xl mx-auto space-y-20">
        <header className="text-center space-y-6">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">
            Features
          </h1>
          <p className="text-xl font-bold uppercase tracking-[0.5em] text-black/40">
            Premium Shopping Experience
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((f, i) => (
            <div key={i} className="group border-[4px] border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              <f.icon className="w-16 h-16 mb-8 transition-transform group-hover:scale-110 group-hover:rotate-12" />
              <h3 className="text-3xl font-black uppercase tracking-tight mb-4 italic">{f.title}</h3>
              <p className="text-lg font-bold uppercase tracking-tight opacity-60 group-hover:opacity-100">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-black text-white p-12 border-[4px] border-black text-center space-y-8 shadow-[16px_16px_0px_0px_rgba(255,255,255,1),16px_16px_0px_4px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-black uppercase italic">Our Evolution</h2>
          <p className="max-w-2xl mx-auto font-bold uppercase tracking-widest text-sm opacity-60">
            We are constantly improving our platform to provide you with the best fashion and shopping experience.
          </p>
        </div>
      </div>
    </div>
  );
}
