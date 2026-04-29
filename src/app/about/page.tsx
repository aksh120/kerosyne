import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            About Kerosyne
          </h1>
          <p className="text-xl font-bold uppercase tracking-widest text-black/60">
            Fueling the next generation of fashion.
          </p>
        </header>

        <section className="border-[4px] border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-6 italic underline">The Story</h2>
          <div className="space-y-6 text-lg font-bold leading-relaxed uppercase tracking-tight">
            <p>
              Kerosyne is more than a store. It is a collection of curated streetwear and modern fashion essentials. 
              We believe in high contrast, bold designs, and clean aesthetics.
            </p>
            <p>
              Born from street culture and modern design, we provide the pieces you need to express your true identity. 
              No filters. No compromises. Just pure style.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-[4px] border-black p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black uppercase mb-4">Our Mission</h3>
            <p className="font-bold text-sm uppercase opacity-80">
              To bring you the best in bold design and wearable art. Every piece in our shop is selected with a clear purpose.
            </p>
          </div>
          <div className="border-[4px] border-black p-8 bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black uppercase mb-4">Our Community</h3>
            <p className="font-bold text-sm uppercase opacity-60">
              We cater to the creators and the trendsetters who find beauty in the unconventional.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
