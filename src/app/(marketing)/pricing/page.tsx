"use client";

import { motion } from "framer-motion";
import { Check, ChevronRight, Zap, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const tiers = [
  {
    name: "Growth",
    price: "$290",
    description: "Ideal for scaling startups who need reliable AI automation.",
    features: [
      "25,000 AI Messages /mo",
      "3 Custom AI Agents",
      "Standard LLM Models",
      "Business Hour Support",
      "Analytics Dashboard",
    ],
    cta: "Start Scaling",
    popular: false,
    color: "text-blue-400",
  },
  {
    name: "Professional",
    price: "$990",
    description: "Advanced features for established market leaders.",
    features: [
      "100,000 AI Messages /mo",
      "10 Custom AI Agents",
      "Premium LLM Stack (GPT-4o)",
      "24/7 Priority Support",
      "White-label Options",
      "Advanced Security Layer",
      "Webhooks & API Access",
    ],
    cta: "Get Started",
    popular: true,
    color: "text-emerald-400",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Infinite scale with dedicated resource allocation.",
    features: [
      "Unlimited AI Messages",
      "Unlimited AI Agents",
      "Custom Fine-tuned Models",
      "Dedicated Solution Architect",
      "SOC2 Compliance Pack",
      "On-Premise Deployment",
      "Custom SLA & Legal",
    ],
    cta: "Contact Solutions",
    popular: false,
    color: "text-indigo-400",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  return (
    <div className="bg-black text-white min-h-screen pt-32 pb-24">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-8"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-100 uppercase tracking-widest">Enterprise Ready</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
            >
              Scaling Your <br /> <span className="text-emerald-400">Conversational ROI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-12"
            >
              Choose a plan built for high-performance teams and massive WhatsApp volumes.
            </motion.p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-zinc-500"}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="w-14 h-7 bg-zinc-800 rounded-full relative p-1 transition-colors hover:bg-zinc-700"
              >
                <motion.div
                  animate={{ x: billingCycle === "monthly" ? 0 : 28 }}
                  className="w-5 h-5 bg-emerald-500 rounded-full"
                />
              </button>
              <span className={`text-sm ${billingCycle === "annual" ? "text-white" : "text-zinc-500"}`}>Annual (Save 20%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col p-10 rounded-[2.5rem] border transition-all duration-500 group ${
                  tier.popular
                    ? "bg-zinc-900/80 border-emerald-500/50 scale-105 z-20 shadow-[0_0_80px_rgba(16,185,129,0.1)]"
                    : "bg-zinc-900/30 border-white/5 hover:border-white/20 z-10"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-black px-6 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
                    Most Popular
                  </div>
                )}

                <div className="mb-10 text-center md:text-left">
                  <h3 className={`text-2xl font-bold mb-4 ${tier.color}`}>{tier.name}</h3>
                  <div className="flex items-baseline justify-center md:justify-start space-x-2">
                    <span className="text-5xl md:text-6xl font-black tracking-tighter">
                      {tier.price !== "Custom" ? tier.price : "Enterprise"}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-zinc-500 text-lg font-light">/mo</span>
                    )}
                  </div>
                  <p className="mt-6 text-zinc-400 leading-relaxed font-light text-lg">
                    {tier.description}
                  </p>
                </div>

                <div className="h-px bg-white/5 w-full mb-10" />

                <div className="flex-grow space-y-5 mb-12">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start space-x-4">
                      <div className="mt-1 flex-shrink-0">
                        <Check className={`w-5 h-5 ${tier.color}`} />
                      </div>
                      <span className="text-zinc-300 font-light leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={tier.name === "Enterprise" ? "/contact" : "/register"} className="w-full mt-auto">
                  <Button
                    className={`w-full h-16 rounded-full text-lg font-bold transition-all duration-300 ${
                      tier.popular
                        ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-zinc-900/50 rounded-[3rem] p-12 md:p-20 border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-20 pointer-events-none opacity-50">
               <Shield className="w-64 h-64 text-emerald-500/10" />
             </div>

             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tighter">Security That Scales with You</h2>
                  <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">
                    We process billions of data points daily for the world's most sensitive industries. Your data is encrypted, isolated, and governed by strict compliance protocols.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    {["SOC2 Type II", "GDPR", "HIPAA Ready", "ISO 27001"].map((trust) => (
                      <div key={trust} className="flex items-center space-x-3">
                         <Star className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                         <span className="text-lg font-bold text-white tracking-wide">{trust}</span>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="space-y-6">
                 <blockquote className="bg-black/40 p-8 rounded-3xl border border-white/5">
                    <p className="text-zinc-300 italic text-lg font-light leading-relaxed mb-6">
                      "The level of support and technical depth the team provides is unmatched. We saw a 40% increase in conversion within 3 months."
                    </p>
                    <cite className="not-italic flex items-center space-x-4">
                       <div className="w-12 h-12 bg-zinc-800 rounded-full" />
                       <div>
                         <div className="font-bold text-white text-lg">Director of Innovation</div>
                         <div className="text-emerald-400 text-sm tracking-widest uppercase">Global FinTech Corp</div>
                       </div>
                    </cite>
                 </blockquote>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
