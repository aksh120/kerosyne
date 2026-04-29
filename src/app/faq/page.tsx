import React from "react";

export default function FAQPage() {
  const sections = [
    {
      id: "account",
      title: "Your Account",
      questions: [
        { q: "How do I secure my account?", a: "Enable two-factor authentication in your settings and use a strong password." },
        { q: "Can I delete my account?", a: "Yes. You can delete your account and all associated data through your account dashboard." }
      ]
    },
    {
      id: "orders",
      title: "Shipping & Orders",
      questions: [
        { q: "How can I track my order?", a: "You can track your shipment using the link provided in your confirmation email." },
        { q: "Can I change my delivery address?", a: "Once an order has been shipped, we cannot change the delivery address for security reasons." }
      ]
    },
    {
      id: "payments",
      title: "Payments & Pricing",
      questions: [
        { q: "What payment methods do you accept?", a: "We accept all major credit cards and other secure payment methods." },
        { q: "Is my payment information safe?", a: "Yes, we use secure, industry-standard payment processors to ensure your data is always safe." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-4xl mx-auto space-y-20">
        <header className="space-y-4">
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">
            Help Center
          </h1>
          <p className="text-xl font-bold uppercase tracking-widest text-black/40">Common Questions & Answers</p>
        </header>

        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32 space-y-8">
              <h2 className="text-4xl font-black uppercase italic bg-black text-white inline-block px-6 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.questions.map((item, i) => (
                  <div key={i} className="border-[4px] border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    <h3 className="text-xl font-black uppercase mb-4 tracking-tight underline">Q: {item.q}</h3>
                    <p className="text-lg font-bold uppercase opacity-60 leading-tight">A: {item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
