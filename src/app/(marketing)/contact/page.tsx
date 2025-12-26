"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, Shield, Zap, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32">
      <section className="relative py-20 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Column: Info */}
            <div className="flex-1 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8">
                   <Globe className="w-4 h-4 text-emerald-400" />
                   <span className="text-sm font-medium text-emerald-100 uppercase tracking-widest">Global Support</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                  Let's Define the <br />
                  <span className="text-emerald-400 italic">Conversation.</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-xl">
                  Our solution architects are ready to help you deploy enterprise-grade AI within your existing WhatsApp ecosystem.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: Mail, label: "Intelligence Inquiry", value: "solutions@aetheris.ai" },
                  { icon: Lock, label: "Security & Compliance", value: "trust@aetheris.ai" },
                  { icon: Phone, label: "Direct Line", value: "+1 (888) AETHER-AI" },
                  { icon: MapPin, label: "HQ", value: "Silicon Valley, CA" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5"
                  >
                    <item.icon className="w-5 h-5 text-emerald-400 mb-4" />
                    <div className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">{item.label}</div>
                    <div className="text-zinc-200 font-medium">{item.value}</div>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-3 text-emerald-400" />
                  Enterprise Commitment
                </h3>
                <ul className="space-y-4">
                  {[
                    "Gauranteed 24-hour response time",
                    "Custom architectural consultation",
                    "Direct access to AI engineering team",
                    "PII & GDPR data handling advisory"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center text-zinc-400 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className="bg-zinc-900/50 border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                   <Zap className="w-32 h-32 text-emerald-500" />
                </div>

                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-black mb-8"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <h3 className="text-4xl font-bold mb-4 tracking-tighter">Request Received.</h3>
                    <p className="text-lg text-zinc-400 mb-10 font-light leading-relaxed max-w-sm">
                      An enterprise consultant is reviewing your requirements and will reach out shortly.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="rounded-full border-white/10 hover:bg-white/5 text-white px-8"
                    >
                      New Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-2">
                       <h2 className="text-3xl font-bold tracking-tighter">Inquiry Portal</h2>
                       <p className="text-zinc-500 font-light">Submit your technical requirements below.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">First Name</label>
                        <Input
                          placeholder="Alex"
                          required
                          className="bg-black/50 border-white/10 h-14 rounded-2xl focus:border-emerald-500/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Last Name</label>
                        <Input
                          placeholder="Chen"
                          required
                          className="bg-black/50 border-white/10 h-14 rounded-2xl focus:border-emerald-500/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Corporate Email</label>
                      <Input
                        type="email"
                        placeholder="a.chen@enterprise.com"
                        required
                        className="bg-black/50 border-white/10 h-14 rounded-2xl focus:border-emerald-500/50 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Message / Requirements</label>
                      <Textarea
                        placeholder="Tell us about your conversation volume and AI goals..."
                        className="bg-black/50 border-white/10 min-h-[150px] rounded-3xl focus:border-emerald-500/50 transition-all p-6"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-16 rounded-2xl font-bold text-lg bg-emerald-500 hover:bg-emerald-400 text-black shadow-xl shadow-emerald-500/20 transition-all"
                    >
                      Initiate Consultation
                      <Send className="w-5 h-5 ml-3" />
                    </Button>

                    <p className="text-[10px] text-center text-zinc-600 uppercase tracking-widest font-bold">
                      Secured by Enterprise-Grade Encryption
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
