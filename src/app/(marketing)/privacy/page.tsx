"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-black text-zinc-400 min-h-screen pt-32 pb-24">
      <section className="relative py-20 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">
              Privacy Policy
            </h1>
            <div className="flex items-center space-x-2 text-emerald-400/60 uppercase tracking-widest text-xs font-bold">
               <FileText className="w-4 h-4" />
               <span>Last updated: December 26, 2025</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="space-y-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="text-emerald-500 mr-3">01.</span> Information Collection
              </h2>
              <div className="prose prose-zinc prose-invert max-w-none font-light leading-relaxed text-lg">
                <p>
                  We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This includes your name, corporate email address, and organizational metadata.
                </p>
                <p>
                  Our AI models process conversational data to improve response accuracy. This data is isolated per enterprise tenant and is never used to train global models without explicit, written consent.
                </p>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="text-emerald-500 mr-3">02.</span> Use of Intelligence
              </h2>
              <div className="prose prose-zinc prose-invert max-w-none font-light leading-relaxed text-lg">
                <p>
                  We use the information we collect to provide, maintain, and improve our neural processing services. Specifically:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To facilitate autonomous customer interactions.</li>
                  <li>To provide predictive analytics on conversation sentiment.</li>
                  <li>To detect and prevent fraudulent messaging patterns.</li>
                  <li>To comply with regional data residency requirements.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="text-emerald-500 mr-3">03.</span> Zero-Trust Security
              </h2>
              <div className="prose prose-zinc prose-invert max-w-none font-light leading-relaxed text-lg">
                <p>
                  We implement a Zero-Trust security architecture. All data is encrypted using AES-256 at rest and TLS 1.3 in transit. Access to production environments is strictly controlled via multi-factor authentication and hardware security keys.
                </p>
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="text-emerald-500 mr-3">04.</span> Enterprise Contacts
              </h2>
              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5">
                <p className="mb-4">For all GDPR, CCPA, or regional compliance inquiries, please contact our Data Protection Office:</p>
                <div className="flex items-center space-x-3 text-white font-bold">
                   <Lock className="w-5 h-5 text-emerald-400" />
                   <span>trust@whatsappai.com</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
