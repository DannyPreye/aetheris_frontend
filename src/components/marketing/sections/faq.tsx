"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Do I need a WhatsApp Business API account?",
    answer: "Yes, you'll need an official WhatsApp Business API account. Our enterprise team handles the entire Meta verification and onboarding process for you, typically within 24-48 hours.",
  },
  {
    question: "How does the AI agent learn about my business?",
    answer: "Our Advanced Knowledge Engine ingests your technical documentation, PDFs, CRM data, and web content. It uses RAG (Retrieval-Augmented Generation) to ensure every response is grounded in your company's latest truth.",
  },
  {
    question: "Can I switch between AI and human agents?",
    answer: "Absolutely. We provide a 'Seamless Handoff' protocol. When the AI detects frustration or a high-value sales opportunity, it instantly notifies your human team and provides a full context summary for a perfect transition.",
  },
  {
    question: "What compliance standards do you follow?",
    answer: "We are SOC2 Type II, GDPR, and CCPA compliant. All conversational data is encrypted at rest and in transit. For enterprise clients, we offer PII redaction and custom data retention policies.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-8"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-100 italic">Support & Logistics</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">Common Queries</h2>
          <p className="text-zinc-400 text-xl font-light">
            Everything you need to know about implementing Enterprise AI on WhatsApp.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-[2rem] overflow-hidden transition-all duration-500 ${
                openIndex === index ? "border-white/20 bg-zinc-900/50" : "border-white/5 bg-zinc-900/20 hover:border-white/10"
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-8 text-left transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-xl font-bold tracking-tight transition-colors ${openIndex === index ? "text-emerald-400" : "text-white"}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/10 transition-transform duration-500 ${openIndex === index ? "rotate-180 border-emerald-500/50" : ""}`}>
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Plus className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 pb-8 text-zinc-400 text-lg font-light leading-relaxed max-w-3xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
