import React from "react";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">
            Customer Support
          </h1>
          <p className="text-xl font-bold uppercase tracking-widest bg-black text-white inline-block px-4 py-2">
            Available 24/7
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-start space-x-6">
            <Mail className="w-10 h-10 mt-1" />
            <div>
              <h3 className="text-xl font-black uppercase">Email Us</h3>
              <p className="font-bold opacity-60">kerosyne@akimbolabs.site</p>
            </div>
          </div>
          <div className="border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-start space-x-6">
            <MessageSquare className="w-10 h-10 mt-1" />
            <div>
              <h3 className="text-xl font-black uppercase">Chat With Us</h3>
              <p className="font-bold opacity-60">discord.gg/kerosyne</p>
            </div>
          </div>
        </div>

        <section className="border-[4px] border-black p-10 space-y-8 bg-black/5">
          <h2 className="text-3xl font-black uppercase italic underline">Contact Form</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="YOUR NAME" className="p-4 border-[3px] border-black font-bold uppercase bg-white focus:outline-none" />
              <input type="email" placeholder="YOUR EMAIL" className="p-4 border-[3px] border-black font-bold uppercase bg-white focus:outline-none" />
            </div>
            <textarea placeholder="YOUR MESSAGE" rows={6} className="w-full p-4 border-[3px] border-black font-bold uppercase bg-white focus:outline-none" />
            <button className="w-full bg-black text-white p-6 font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black border-[3px] border-black transition-all">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
