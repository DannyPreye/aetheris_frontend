"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, BarChart3, Shield, Globe, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "AI Response Automation",
    description: "Our advanced AI agents handle routine inquiries instantly, freeing up your team for complex issues.",
    icon: MessageSquare,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-transparent",
  },
  {
    title: "Instant Integration",
    description: "Connect your WhatsApp Business API in minutes and start automating your workflow immediately.",
    icon: Zap,
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-transparent",
  },
  {
    title: "Advanced Analytics",
    description: "Track performance, response times, and customer satisfaction with detailed real-time dashboards.",
    icon: BarChart3,
    color: "text-indigo-400",
    gradient: "from-indigo-500/20 to-transparent",
  },
];

export function FeaturesPreview() {
  return (
    <section className="py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              Enterprise Grade <br />
              <span className="text-emerald-400 font-serif italic text-5xl md:text-7xl">Intelligence</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-light">
              We've built the most sophisticated AI brain for WhatsApp. It doesn't just reply; it understands intent, context, and emotion.
            </p>
            <div className="space-y-6">
              {[
                "Natural Language Understanding",
                "Context-Aware Conversations",
                "Multi-Channel Knowledge Base Integration",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-zinc-200 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1 relative aspect-square"
          >
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
            <Image
              src="/marketing/ai-intelligence.png"
              alt="AI Core Visualization"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden lg:block" />

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -m-6`} />
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/10 bg-white/5 ${feature.color} group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-lg font-light mb-6">
                  {feature.description}
                </p>
                <Button variant="link" className={`p-0 ${feature.color} font-bold text-base group/btn`}>
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 p-12 rounded-[3rem] border border-white/10 bg-zinc-900/50 backdrop-blur-3xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/10" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Seamless <span className="text-indigo-400">Workflow</span> Orchestration
              </h3>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                Connect your existing tools, CRMs, and databases. Automate complex journeys without writing a single line of code.
              </p>
            </div>
            <div className="relative w-full lg:w-[400px] aspect-[4/3]">
              <Image
                src="/marketing/automation.png"
                alt="Automation Workflow"
                fill
                className="object-contain opacity-80 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
