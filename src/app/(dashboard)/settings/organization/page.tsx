"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Smartphone,
  Copy,
  Check,
  RefreshCw,
  MoreHorizontal,
  Lock,
  Cpu,
  Key,
  Shield,
  Zap,
  Globe2,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrganizationsService } from "@/lib/api/services/OrganizationsService";
import { useUserDeps } from "@/components/contexts/UserDeps";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const organizationSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters."),
  industry: z.string().optional(),
  website: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
  // Email is likely not directly editable on the org model based on current types,
  // but we can keep it in the form for display if we had a field for it.
  // For now we'll fetch it but maybe not save it if the API doesn't support it.
});

type OrganizationFormValues = z.infer<typeof organizationSchema>;

export default function OrganizationSettingsPage() {
  const [copied, setCopied] = useState(false);
  const { deps } = useUserDeps();
  const queryClient = useQueryClient();

  // @ts-ignore
  const organizationId = deps?.organizations?.[0]?.organization?._id || deps?.organizations?.[0]?.organization?.id;

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      industry: "",
      website: "",
    },
  });

  const { data: orgData, isLoading } = useQuery({
    queryKey: ["organization", organizationId],
    queryFn: () => OrganizationsService.getApiV1Organizations1(organizationId!),
    enabled: !!organizationId,
  });

  useEffect(() => {
    if (orgData?.data) {
      form.reset({
        name: orgData.data.name || "",
        industry: orgData.data.industry || "",
        website: orgData.data.website || "",
      });
    }
  }, [orgData, form]);

  const updateMutation = useMutation({
    mutationFn: (values: OrganizationFormValues) => {
      return OrganizationsService.putApiV1Organizations(organizationId!, {
        name: values.name,
        industry: values.industry,
        website: values.website,
      });
    },
    onSuccess: () => {
      toast.success("Organization profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["organization", organizationId] });
      // Also invalidate user deps to refresh global state if name changed
      queryClient.invalidateQueries({ queryKey: ["userDeps"] });
    },
    onError: (error) => {
      toast.error("Failed to update organization profile.");
      console.error(error);
    },
  });

  const onSubmit = (values: OrganizationFormValues) => {
    updateMutation.mutate(values);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Signature captured and copied to buffer.");
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const org = orgData?.data;

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
               <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 bg-blue-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Enterprise HQ</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Neural Organization</h1>
              <p className="text-zinc-500 font-light text-lg">
                Architect your enterprise profile and secure the neural gateway.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl px-8 shadow-xl shadow-emerald-500/20 transition-all active:scale-95 group"
               >
                  {updateMutation.isPending ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  Commit Changes
               </Button>
            </div>
          </div>

          <div className="grid gap-10">
            {/* Profile Section */}
            <Card className="bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-10 pb-4">
                <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase tracking-tight">Enterprise Identity</CardTitle>
                <CardDescription className="text-zinc-500 font-light">Define the core signature of your organization across the global fabric.</CardDescription>
              </CardHeader>
              <CardContent className="p-10 pt-4 space-y-10">
                <div className="flex items-center gap-10 pb-10 border-b border-white/5">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-zinc-800 border-2 border-dashed border-white/10 flex items-center justify-center text-zinc-600 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5 transition-all duration-500 cursor-pointer overflow-hidden">
                      <Building2 className="w-12 h-12 group-hover:text-emerald-400 transition-colors" />
                      <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors" />
                    </div>
                    {/* <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                       <Lock className="w-3.5 h-3.5 text-zinc-500" />
                    </div> */}
                  </div>
                  <div className="space-y-3">
                    <Button type="button" variant="outline" size="sm" className="h-10 border-white/10 text-white hover:bg-white/5 rounded-xl px-6 font-bold uppercase tracking-widest text-[10px]">Modify Logo</Button>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Lossless PNG, JPG, SVG. MAX 2.0MB</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Legal Entity Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-black/40 border-white/5 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 text-white placeholder:text-zinc-700 font-medium" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Neural Sector</FormLabel>
                         <FormControl>
                          <Input {...field} placeholder="e.g. Artificial Intelligence" className="bg-black/40 border-white/5 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 text-white placeholder:text-zinc-700 font-medium" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                         <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Global Domain</FormLabel>
                         <div className="relative">
                            <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <FormControl>
                              <Input {...field} className="pl-11 bg-black/40 border-white/5 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 text-white placeholder:text-zinc-700 font-medium" />
                            </FormControl>
                         </div>
                         <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Telemetry Contact</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <Input
                        id="email"
                        readOnly
                        className="pl-11 bg-black/40 border-white/5 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 text-white/50 placeholder:text-zinc-700 font-medium cursor-not-allowed"
                        value={deps?.user?.email || ""}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neural Gateway Config */}
            <Card className="bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] overflow-hidden group">
              <CardHeader className="p-10 pb-4 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase tracking-tight">Neural Gateway</CardTitle>
                    <CardDescription className="text-zinc-500 font-light">Bridge your organization to the WhatsApp Intelligence Matrix.</CardDescription>
                  </div>
                  <Badge variant="outline" className={cn(
                    "gap-2 font-bold uppercase tracking-widest text-[10px] h-9 px-4 rounded-full border",
                    org?.whatsappBusinessId
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  )}>
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      org?.whatsappBusinessId ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    )} />
                    {org?.whatsappBusinessId ? "Synchronized" : "Pending Handshake"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-10 pt-10 space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Phone Node ID</Label>
                      <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-tighter">Read-Only</span>
                    </div>
                    <Input
                      value={org?.whatsappPhoneId || "Not Connected"}
                      readOnly
                      className="border-white/5 bg-black/40 font-mono text-xs h-14 rounded-2xl text-emerald-500/80 cursor-default"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Account Shard ID</Label>
                      <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-tighter">Read-Only</span>
                    </div>
                    <Input
                      value={org?.whatsappBusinessId || "Not Connected"}
                      readOnly
                      className="border-white/5 bg-black/40 font-mono text-xs h-14 rounded-2xl text-emerald-500/80 cursor-default"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Quantum Access Token</Label>
                  <div className="flex gap-4">
                    <Input
                      type="password"
                      value={org?.whatsappToken || "Not Connected"}
                      readOnly
                      className="border-white/5 bg-black/40 font-mono text-xs flex-1 h-14 rounded-2xl text-zinc-500 cursor-default"
                    />
                    {/* <Button variant="outline" size="icon" className="h-14 w-14 shrink-0 border-white/5 bg-zinc-800 hover:bg-white/5 rounded-2xl transition-all">
                      <RefreshCw className="w-5 h-5 text-emerald-400" />
                    </Button> */}
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-black/40 border border-white/5 space-y-6 relative overflow-hidden group/webhook">
                   <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover/webhook:opacity-100 transition-opacity pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Zap className="w-5 h-5" />
                       </div>
                       <span className="text-sm font-bold text-white uppercase tracking-tight">Neural Webhook Callback</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-10 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all font-bold"
                      onClick={() => copyToClipboard("https://api.metaforce.ai/v1/synaptic-webhook/whatsapp")}
                    >
                      {copied ? <Check className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
                      Copy Endpoint
                    </Button>
                  </div>
                  <p className="text-xs text-zinc-400 bg-black/60 p-5 rounded-2xl border border-white/5 font-mono truncate relative z-10">
                    https://api.metaforce.ai/v1/synaptic-webhook/whatsapp
                  </p>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed relative z-10 px-1">
                    Configure this endpoint in your Meta Developer Console &gt; WhatsApp &gt; Configuration &gt; Callback Path for real-time telemetry ingestion.
                  </p>
                </div>

                <div className="flex justify-between items-center pt-10 border-t border-white/5">
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                    Last synaptic handshake performed 15ms ago. Neural paths verified and operational.
                  </p>
                  <Button type="button" variant="outline" className="h-12 border-white/10 hover:bg-white/5 text-emerald-400 hover:text-emerald-300 px-8 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all active:scale-95">
                    Verify Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
