"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Zap,
  BarChart3,
  Shield,
  Globe,
  Users,
  Search,
  Bot,
  Brain,
  History,
  LayoutDashboard,
  Smartphone,
  Layers,
  Cpu,
  Database,
  Cloud,
  Network,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const detailFeatures = [
  {
    title: "Neural Intent Engine",
    description: "Our proprietary LLM stack understands complex nested queries and subtle emotional cues with 99.2% accuracy.",
    icon: Brain,
    color: "text-emerald-400",
  },
  {
    title: "Global Mesh Network",
    description: "Deploy AI agents across 190+ countries with sub-100ms response times powered by our edge computing layer.",
    icon: Network,
    color: "text-blue-400",
  },
  {
    title: "Zero-Trust Security",
    description: "Enterprise-grade encryption with SOC2 Type II compliance and PII redaction at the model level.",
    icon: Shield,
    color: "text-indigo-400",
  }
];

export default function FeaturesPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-32">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-100/70 uppercase tracking-widest">Platform Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
          >
            The <span className="text-emerald-400 italic">Operating System</span> <br />
            for Conversational Business.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            A high-performance infrastructure designed for businesses that demand reliability, speed, and intelligence at scale.
          </motion.p>
        </div>
      </section>

      {/* Grid of details */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {detailFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group p-8 rounded-3xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 border border-white/10 bg-white/5 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-500 text-lg leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive 1 */}
      <section className="py-32 relative overflow-hidden bg-zinc-900/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1">
              <div className="flex items-center space-x-3 text-emerald-400 mb-6">
                <Database className="w-6 h-6" />
                <span className="font-bold uppercase tracking-widest text-sm text-emerald-400/80">Adaptive Memory</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Your Data, <br /> Intelligent.</h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed font-light">
                Sync your entire product catalog, CMS, and help center. Our vector-based memory system ensures the AI always has the latest information to serve your customers.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  "Real-time CRM Synchronization",
                  "Automated Indexing of PDF & Web Content",
                  "Dynamic Product Availability Tracking",
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-zinc-200 text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-black rounded-full px-10 h-16 font-bold">
                Read documentation
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative aspect-square group"
            >
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
              <div className="relative h-full rounded-[4rem] border border-white/10 overflow-hidden bg-zinc-900/50 p-1">
                <Image
                  src="/marketing/hero-dashboard.png"
                  alt="Architecture Visualization"
                  fill
                  className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[3s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Real-time Latency</span>
                    <span className="text-emerald-400 font-mono">42ms</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scalability Section */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-white">Scale Without <span className="text-emerald-400 font-serif italic">Constraints</span></h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-light">
              Whether you're sending 1,000 or 10,000,000 messages daily, our elastic infrastructure adjusts in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-white/10">
              <Cloud className="w-12 h-12 text-blue-400 mb-8" />
              <h3 className="text-3xl font-bold mb-6 text-white">Multi-Region Cloud</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-light mb-10">
                Automatically route traffic to the nearest data center. Comply with GDPR, CCPA, and regional data residency requirements effortlessly.
              </p>
              <div className="h-64 relative rounded-2xl overflow-hidden border border-white/5 bg-black/50">
                <Image
                  src="/marketing/automation.png"
                  alt="Cloud Visual"
                  fill
                  className="object-cover opacity-30"
                />
              </div>
            </div>

            <div className="p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-white/10">
              <Layers className="w-12 h-12 text-indigo-400 mb-8" />
              <h3 className="text-3xl font-bold mb-6 text-white">Hybrid Human-AI Layer</h3>
              <p className="text-zinc-400 text-lg leading-relaxed font-light mb-10">
                Seamless handoff protocols that ensure no customer is left behind. AI prepares drafting responses for human agents to approve.
              </p>
              <div className="h-64 relative rounded-2xl overflow-hidden border border-white/5 bg-black/50">
                <Image
                  src="/marketing/ai-intelligence.png"
                  alt="Layer Visual"
                  fill
                  className="object-cover opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trust & Compliance Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-white">
                Fortified for <br />
                <span className="text-emerald-400 italic">Enterprise Trust</span>
              </h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10 max-w-xl">
                We maintain the highest security standards in the industry, ensuring your customer data is protected by multiple layers of encryption and isolation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "SOC2 Type II", subtitle: "Audited Security" },
                  { title: "GDPR Compliant", subtitle: "EU Data Privacy" },
                  { title: "AES-256", subtitle: "Military Encryption" },
                  { title: "ISO 27001", subtitle: "Standardized Ops" }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
                    <div className="text-lg font-bold text-white mb-1 tracking-tight">{item.title}</div>
                    <div className="text-emerald-500/60 text-xs uppercase tracking-widest font-bold">{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 group">
               <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors" />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <ShieldCheck className="w-20 h-20 text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold text-white mb-4">Zero-Retention Option</h3>
                  <p className="text-zinc-400 font-light max-w-sm">
                    For highly sensitive industries, we offer zero-retention processing where no message data ever hits our persistent storage.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
