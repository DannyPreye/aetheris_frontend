"use client";

import { motion } from "framer-motion";
import { MessageSquare, Users, Heart, Lightbulb, Globe, Award, Target, Rocket, ShieldCheck } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Founded", value: "2023", icon: Rocket },
  { label: "Enterprise Partners", value: "500+", icon: Users },
  { label: "Neural Tokens/Month", value: "10B+", icon: MessageSquare },
  { label: "Global Transit Nodes", value: "25+", icon: Globe },
];

const values = [
  {
    title: "Intelligence First",
    description: "We don't just build chatbots; we engineer autonomous agents that understand business logic and human intent.",
    icon: Lightbulb,
    color: "text-emerald-400",
  },
  {
    title: "Mission Critical Reliability",
    description: "Our infrastructure is designed for 99.99% uptime, ensuring your business never misses a pulse.",
    icon: ShieldCheck,
    color: "text-blue-400",
  },
  {
    title: "Infinite Scalability",
    description: "From startup prototypes to global enterprise deployments, our platform grows with your conversation volume.",
    icon: Target,
    color: "text-indigo-400",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-8"
            >
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-100 uppercase tracking-widest">Our Vision</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]"
            >
              Building the <br />
              <span className="text-emerald-400 italic font-serif">Frontier of Commerce</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-3xl text-zinc-400 font-light leading-relaxed mb-16 max-w-3xl"
            >
              We are on a journey to transform how the world's most innovative companies interact with their customers through autonomous intelligence.
            </motion.p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-16">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-zinc-500 mb-2 flex items-center space-x-2">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-bold">{stat.label}</span>
                  </div>
                  <div className="text-4xl font-bold text-white tracking-tighter">{stat.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-zinc-900/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">The Principle of <br /> Autonomy.</h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                At Aetheris, we believe that efficiency shouldn't come at the cost of empathy. Our systems are designed to bridge the gap between mechanical automation and human-like understanding.
              </p>
              <div className="space-y-6">
                {values.map((v, i) => (
                  <div key={v.title} className="flex space-x-6 p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
                    <div className={`mt-1 ${v.color}`}>
                      <v.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                      <p className="text-zinc-500 font-light">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative aspect-square w-full max-w-xl">
               <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-[100px] animate-pulse" />
               <div className="relative h-full rounded-[4rem] border border-white/10 overflow-hidden bg-zinc-900/50 flex flex-col items-center justify-center p-12 text-center group">
                  <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <MessageSquare className="w-16 h-16 text-emerald-400" />
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-serif italic text-white/90 leading-snug">
                    "Democratizing intelligence means making world-class AI as accessible as a WhatsApp message."
                  </blockquote>
                  <cite className="not-italic mt-8 text-emerald-400 uppercase tracking-widest font-bold text-sm">
                    Engineering Vision @ Aetheris
                  </cite>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-12">Global Footprint</h2>
          <div className="relative h-[400px] md:h-[600px] w-full rounded-[3rem] border border-white/5 overflow-hidden bg-zinc-900/30">
             <Image
               src="/marketing/automation.png"
               alt="Global Map"
               fill
               className="object-cover opacity-20 grayscale transition-all duration-700 hover:grayscale-0 hover:opacity-40"
             />
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 backdrop-blur-sm bg-black/20">
                <div className="max-w-2xl">
                   <p className="text-2xl md:text-4xl font-light text-zinc-300 leading-relaxed">
                     Serving innovative teams across <span className="text-white font-bold">190+ countries</span>, processing billions of interactions with zero compromise on security.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
