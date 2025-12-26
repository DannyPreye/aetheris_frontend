"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ShieldCheck, Zap, Globe, Lock, Key } from "lucide-react";
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

const resetSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetSchema>) {
    setIsLoading(true);
    try {
      // Mock success for cinematic demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      toast.success("Master key updated successfully!");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error) {
      toast.error("Protocol failure. Link may be expired.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px]" />
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
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold">Key Synchronization</p>
        </div>

        <Card className="bg-zinc-900/50 backdrop-blur-3xl border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="pt-10 px-10 pb-4">
            <CardTitle className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
               <Lock className="w-6 h-6 text-emerald-400" />
               New Master Key
            </CardTitle>
            <CardDescription className="text-zinc-400 text-base font-light">
              Establish a fresh security protocol for your neural identity.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10 pt-4">
             {isSuccess ? (
                <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center py-10 space-y-6"
                >
                   <div className="relative mx-auto w-24 h-24">
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                      <div className="relative w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                   </div>
                   <div className="space-y-2">
                       <h3 className="text-2xl font-bold text-white tracking-tight">Sync Complete</h3>
                       <p className="text-sm text-zinc-500 font-light leading-relaxed">
                          Your master access keys have been re-indexed. Redirecting to secure login...
                       </p>
                   </div>
                   <div className="flex justify-center">
                      <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                   </div>
                </motion.div>
             ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">New Access Key</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="bg-black/50 border-white/10 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500 text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Confirm Identity Key</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="bg-black/50 border-white/10 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-rose-500 text-xs" />
                        </FormItem>
                      )}
                    />
                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all group"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          <div className="flex items-center">
                            Finalize Synchronization
                            <Key className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
             )}
          </CardContent>
          <div className="bg-white/[0.02] border-t border-white/5 p-8 flex items-center justify-center gap-8">
               <ShieldCheck className="w-5 h-5 text-emerald-500/50" />
               <Zap className="w-5 h-5 text-blue-500/50" />
               <Globe className="w-5 h-5 text-indigo-500/50" />
          </div>
        </Card>

        <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">
          Multi-Factor Neural Isolation Active
        </p>
      </motion.div>
    </div>
  );
}
