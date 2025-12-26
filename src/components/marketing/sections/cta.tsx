"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-zinc-900 border border-white/10 rounded-[3rem] p-12 md:p-24 overflow-hidden group shadow-2xl shadow-emerald-500/5"
        >
          {/* Animated background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] group-hover:bg-emerald-500/20 transition-colors duration-700" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] group-hover:bg-indigo-500/20 transition-colors duration-700" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-100">Ready to scale?</span>
            </motion.div>

            <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter text-white leading-[1.1]">
              The Future of <br className="hidden md:block" />
              <span className="text-emerald-400">WhatsApp Commerce</span> is Here.
            </h2>

            <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join elite enterprises using AI to automate $10M+ in conversational revenue.
              Get started with a 14-day premium trial today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/register">
                <Button size="lg" className="bg-white hover:bg-zinc-200 text-black rounded-full px-12 h-16 text-lg font-bold transition-all hover:scale-105 active:scale-95">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white rounded-full px-12 h-16 text-lg font-semibold backdrop-blur-sm transition-all">
                  Consultation
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
