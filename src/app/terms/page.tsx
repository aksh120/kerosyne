import React from "react";

export default function TermsPage() {
  const sections = [
    { title: "01. Acceptance", content: "By using this website, you agree to our terms and conditions of use." },
    { title: "02. Conduct", content: "We reserve the right to suspend any account that displays abusive or fraudulent behavior." },
    { title: "03. Intellectual Property", content: "All designs, images, and content are owned by Kerosyne." },
    { title: "04. Returns & Exchanges", content: "Items must be returned within 14 days of delivery in their original condition." },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="border-b-[4px] border-black pb-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
            Terms & Conditions
          </h1>
          <p className="text-sm font-bold uppercase tracking-widest opacity-40 mt-4">Last Updated: April 30, 2026</p>
        </header>

        <div className="space-y-12">
          {sections.map((s, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-2xl font-black uppercase italic tracking-tight">{s.title}</h2>
              <p className="text-lg font-bold uppercase opacity-70 leading-relaxed">
                {s.content}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 border-[4px] border-black bg-black text-white text-center font-black uppercase tracking-widest italic">
          Kerosyne Global Fashion
        </div>
      </div>
    </div>
  );
}
