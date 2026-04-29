import React from "react";

const works = [
  { id: "01", title: "Brutalist Winter '25", type: "Mainline Collection" },
  { id: "02", title: "Cyber-Mesh Capsule", type: "Limited Drop" },
  { id: "03", title: "Static-Noise Series", type: "Accessories" },
  { id: "04", title: "Monolith Footwear", type: "Collaboration" },
];

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-end border-b-[8px] border-black pb-8">
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic">
            Collections
          </h1>
          <p className="font-black uppercase text-xl md:text-2xl opacity-40">Portfolio</p>
        </div>

        <div className="space-y-4">
          {works.map((w) => (
            <div key={w.id} className="group flex items-center justify-between border-[4px] border-black p-8 hover:bg-black hover:text-white transition-all cursor-pointer">
              <div className="flex items-center space-x-12">
                <span className="text-4xl font-black opacity-20 group-hover:opacity-100 tabular-nums">{w.id}</span>
                <div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">{w.title}</h3>
                  <p className="font-bold uppercase tracking-widest text-xs opacity-50 group-hover:opacity-80">{w.type}</p>
                </div>
              </div>
              <div className="hidden md:block w-32 h-[2px] bg-black group-hover:bg-white" />
              <button className="px-6 py-2 border-[2px] border-black font-black uppercase text-xs group-hover:border-white">
                View Collection
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
