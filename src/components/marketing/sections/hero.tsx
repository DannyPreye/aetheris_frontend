"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Play, MessageSquare, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black text-white">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-100/80">New: Enterprise AI v3.0 is now live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50"
          >
            Scale Your <br />
            <span className="text-emerald-400">WhatsApp</span> <span className="italic font-serif">Impact</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl leading-relaxed font-light"
          >
            The world's most advanced AI platform for WhatsApp Business. <br className="hidden md:block" />
            Automate at scale, deliver personalization, and drive revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-20"
          >
            <Link href="/register">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black rounded-full px-10 h-16 text-lg font-bold shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all hover:scale-105 active:scale-95 group">
                Request Access
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 backdrop-blur-sm rounded-full px-10 h-16 text-lg font-semibold ">
              <Play className="w-5 h-5 mr-3 fill-current" />
              Watch Vision
            </Button>
          </motion.div>

          <motion.div
            style={{ opacity, scale }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-7xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000" />

            <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <Image
                src="/marketing/hero-dashboard.png"
                alt="AI Platform Interface"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
                priority
              />

              {/* Floating UI Elements for depth */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-zinc-400">Response Rate</p>
                    <p className="text-lg font-bold">99.9%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-10 z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-zinc-400">Enterprise Security</p>
                    <p className="text-lg font-bold">Bank-Grade</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
