"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { MessageSquare, Loader2, ArrowRight, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const checkPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length > 7) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    setPasswordStrength(strength);
  };

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    try {
      // Mock registration success
      toast.success("Registration request submitted! We will review your application.");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black relative overflow-hidden font-sans">
       {/* Background Orbs */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="flex items-center gap-4 mb-10 justify-center group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl transition-transform group-hover:scale-110">
                <img src="/logo.png" alt="Aetheris Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-2xl tracking-[0.1em] text-white uppercase mt-1">AETHERIS</span>
        </div>

        <Card className="bg-zinc-900/50 backdrop-blur-3xl border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="pt-10 px-10">
            <CardTitle className="text-3xl font-bold tracking-tight text-white text-center">Establish Node</CardTitle>
            <CardDescription className="text-zinc-400 text-center text-base font-light">
              Join the elite businesses deploying autonomous agents at scale.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Legal First Name</FormLabel>
                        <FormControl>
                          <Input
                             placeholder="John"
                             {...field}
                             className="bg-black/50 border-white/10 h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white placeholder:text-zinc-700"
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Legal Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="bg-black/50 border-white/10 h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white placeholder:text-zinc-700"
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Corporate Email Identifier</FormLabel>
                      <FormControl>
                        <Input
                           placeholder="john.doe@enterprise.com"
                           {...field}
                           className="bg-black/50 border-white/10 h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white placeholder:text-zinc-700"
                        />
                      </FormControl>
                      <FormMessage className="text-rose-500 text-xs" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Master Access Key</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              checkPasswordStrength(e.target.value);
                            }}
                            className="bg-black/50 border-white/10 h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white"
                          />
                        </FormControl>
                        <div className="pt-2 px-1">
                           <Progress value={passwordStrength} className={cn(
                             "h-1 bg-zinc-800",
                             passwordStrength < 50 ? "[&>div]:bg-rose-500" : passwordStrength < 75 ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500"
                           )} />
                           <p className="text-[9px] text-zinc-500 mt-1.5 font-bold uppercase tracking-widest">
                             Entropy: {passwordStrength}%
                           </p>
                        </div>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 ml-1">Verify Key</FormLabel>
                        <FormControl>
                          <Input
                             type="password"
                             {...field}
                             className="bg-black/50 border-white/10 h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-3">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                      By establishing this node, you agree to our <Link href="/terms" className="text-emerald-400 font-bold hover:underline">Neural Terms</Link> and <Link href="/privacy" className="text-emerald-400 font-bold hover:underline">Data Isolation Policies</Link>. All processing is SOC2 compliant.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full h-14 rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold text-lg transition-all group shadow-xl" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-black" />
                  ) : (
                    <div className="flex items-center">
                      Generate Account
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-4 bg-white/[0.02] border-t border-white/10 p-8">
            <span className="text-xs text-zinc-500 text-center w-full mb-1 tracking-wider uppercase font-bold">
              Trusted by 1,000+ Enterprise Clusters
            </span>
            <div className="flex items-center gap-2">
               <span className="text-sm text-zinc-400 font-light">Existing Operative?</span>
               <Link
                href="/login"
                className="text-sm font-bold text-white hover:text-emerald-400 transition-colors"
              >
                Secure Login
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-4 text-zinc-600">
               <Zap className="w-5 h-5" />
               <Globe className="w-5 h-5" />
               <MessageSquare className="w-5 h-5" />
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
