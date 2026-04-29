import React from "react";

export default function PrivacyPage() {
  const points = [
    { label: "Data Protection", value: "We only collect the information necessary to process and ship your order." },
    { label: "Security", value: "All personal information is encrypted and stored securely using modern standards." },
    { label: "Third Parties", value: "We do not sell or share your personal information with outside companies." },
    { label: "Cookies", value: "We use essential cookies to provide a functional and smooth shopping experience." },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="border-b-[4px] border-black pb-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
            Privacy Policy
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest opacity-40 mt-4">Version: 1.0.0</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {points.map((p, i) => (
            <div key={i} className="border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all group">
              <h2 className="text-xl font-black uppercase mb-2 group-hover:underline">{p.label}</h2>
              <p className="font-bold uppercase opacity-60 group-hover:opacity-100">{p.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4 text-xs font-black uppercase opacity-30 tracking-[1em]">
          <div className="flex-1 h-[2px] bg-black" />
          <span>Kerosyne Secure</span>
          <div className="flex-1 h-[2px] bg-black" />
        </div>
      </div>
    </div>
  );
}
