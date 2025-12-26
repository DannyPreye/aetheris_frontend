"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { MessageSquare, Loader2, ArrowRight, Zap, ShieldCheck, Globe } from "lucide-react";
import { toast } from "sonner";

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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
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
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold">Inquiry Portal</p>
        </div>

        <Card className="bg-zinc-900/50 backdrop-blur-3xl border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="pt-10 px-10 pb-4">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">Welcome back</CardTitle>
            <CardDescription className="text-zinc-400 text-base font-light">
              Access your autonomous conversational infrastructure.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Email Node</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="intelligence@company.com"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                       <div className="flex items-center justify-between px-1">
                          <FormLabel className="text-xs uppercase tracking-widest font-bold text-zinc-500 ml-1">Access Token</FormLabel>
                          <Link
                            href="/forgot-password"
                            className="text-[10px] uppercase font-bold text-emerald-500/70 hover:text-emerald-400 transition-colors tracking-widest"
                          >
                            Reset?
                          </Link>
                        </div>
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
                        Initiate Session
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-4 bg-white/[0.02] border-t border-white/5 p-8">
            <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500 font-light">New to the frontier?</span>
                <Link
                  href="/register"
                  className="text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  Request Access
                </Link>
            </div>
            <div className="flex items-center gap-6 mt-2">
               <ShieldCheck className="w-4 h-4 text-emerald-500/50" />
               <Zap className="w-4 h-4 text-blue-500/50" />
               <Globe className="w-4 h-4 text-indigo-500/50" />
            </div>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold">
          Encrypted with military-grade 256-bit AES
        </p>
      </motion.div>
    </div>
  );
}
