"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, ArrowLeft, Zap, ShieldCheck, Globe } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const forgotSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotSchema>) {
    setIsLoading(true);
    try {
      // Mock success for cinematic demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast.success("Recovery instructions broadcasted!");
    } catch (error) {
      toast.error("Telemetry failed. Please re-initiate.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden mb-6 shadow-2xl"
          >
            <img src="/logo.png" alt="Aetheris Logo" className="w-full h-full object-cover" />
          </motion.div>
          <h2 className="text-3xl font-black tracking-[0.1em] text-white mb-2 text-center uppercase">AETHERIS</h2>
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold">Neural Recovery</p>
        </div>

        <Card className="bg-zinc-900/50 backdrop-blur-3xl border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="pt-10 px-10 pb-4">
             <Link href="/login" className="flex items-center text-[10px] font-bold uppercase tracking-widest text-emerald-500/70 hover:text-emerald-400 mb-6 transition-colors group">
               <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
               Return to Node
             </Link>
            <CardTitle className="text-3xl font-bold tracking-tight text-white">Reset Access</CardTitle>
            <CardDescription className="text-zinc-400 text-base font-light">
              We&apos;ll broadcast recovery instructions to your verified node.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10 pt-4">
            <AnimatePresence mode="wait">
                {isSubmitted ? (
                   <motion.div
                     key="success"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="text-center py-6 space-y-6"
                   >
                      <div className="relative mx-auto w-24 h-24">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                        <div className="relative w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-2xl">
                          <Mail className="w-10 h-10" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-white tracking-tight">Signal Broadcasted</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed font-light">
                          Instructions sent to <span className="text-emerald-400 font-bold">{form.getValues("email")}</span>.
                          Check your secure inbox.
                        </p>
                      </div>
                      <Button
                        variant="link"
                        className="text-zinc-600 hover:text-white uppercase tracking-widest text-[10px] font-bold h-auto p-0"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Resend Handshake Signal
                      </Button>
                   </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Professional Entity Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="intelligence@company.com"
                                  {...field}
                                  className="bg-black/50 border-white/10 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white placeholder:text-zinc-700"
                                />
                              </FormControl>
                              <FormMessage className="text-rose-500 text-xs" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all group"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                          ) : (
                            <div className="flex items-center">
                              Broadcast Recovery Signal
                              <Zap className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                            </div>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                )}
            </AnimatePresence>
          </CardContent>
          <div className="bg-white/[0.02] border-t border-white/5 p-8 flex items-center justify-center gap-8">
               <ShieldCheck className="w-5 h-5 text-emerald-500/50" />
               <Zap className="w-5 h-5 text-blue-500/50" />
               <Globe className="w-5 h-5 text-indigo-500/50" />
          </div>
        </Card>

        <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">
          Neural-Link Data Protection Protocol Active
        </p>
      </motion.div>
    </div>
  );
}
