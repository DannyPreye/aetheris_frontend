"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Brain,
  ShieldAlert,
  Play,
  Save,
  HelpCircle,
  Terminal,
  Zap,
  X,
  Loader2,
  FileSignature,
  Megaphone
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrganizationsService } from "@/lib/api/services/OrganizationsService";
import { useUserDeps } from "@/components/contexts/UserDeps";
import { AgentSettings } from "@/lib/api/models/AgentSettings";

const agentSettingsSchema = z.object({
  systemPrompt: z.string().min(10, "System prompt must be at least 10 characters.").max(8000, "System prompt too long."),
  tone: z.enum([AgentSettings.tone.CONCISE, AgentSettings.tone.FRIENDLY, AgentSettings.tone.FORMAL, AgentSettings.tone.PLAYFUL]),
  maxReplyLength: z.number().min(50).max(1000),
  signature: z.string().optional(),
  callToAction: z.string().optional(),
  followUpEnabled: z.boolean(),
  escalation: z.object({
    enabled: z.boolean(),
    rules: z.array(z.string()),
    phone: z.string().optional().nullable(),
  }),
});

type AgentSettingsFormValues = z.infer<typeof agentSettingsSchema>;

export default function AgentSettingsPage() {
  const { deps } = useUserDeps();
  const queryClient = useQueryClient();

  // Safely access organization ID with fallback for potential type mismatches
  const organizationData = deps?.organizations?.[0]?.organization;
  const organizationId = (organizationData as any)?._id || (organizationData as any)?.id;

  const form = useForm<AgentSettingsFormValues>({
    resolver: zodResolver(agentSettingsSchema),
    defaultValues: {
      systemPrompt: "",
      tone: AgentSettings.tone.FORMAL,
      maxReplyLength: 250,
      signature: "",
      callToAction: "",
      followUpEnabled: false,
      escalation: {
        enabled: true,
        rules: ["pricing", "refund", "complaint", "talk to human"],
        phone: null
      }
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "escalation.rules" as any,
  } as any);

  // Custom keyword input state
  const [newKeyword, setNewKeyword] = useState("");

  const { data: settingsData, isLoading } = useQuery({
    queryKey: ["agent-settings", organizationId],
    queryFn: () => OrganizationsService.getApiV1OrganizationsAgentSettings(organizationId!),
    enabled: !!organizationId,
  });

  useEffect(() => {
    if (settingsData?.data) {
      const data = settingsData.data;
      form.reset({
        systemPrompt: data.systemPrompt || "",
        tone: data.tone || AgentSettings.tone.FORMAL,
        maxReplyLength: data.maxReplyLength || 250,
        signature: data.signature || "",
        callToAction: data.callToAction || "",
        followUpEnabled: data.followUpEnabled || false,
        escalation: {
          enabled: data.escalation?.enabled ?? true,
          rules: data.escalation?.rules || ["pricing", "refund", "complaint", "talk to human"],
          phone: data.escalation?.phone
        }
      });
    }
  }, [settingsData, form]);

  const updateMutation = useMutation({
    mutationFn: (values: AgentSettingsFormValues) => {
      // Map form values to the API model structure strict compat
      const apiPayload: AgentSettings = {
        ...values,
        signature: values.signature || undefined, // explicit undefined for optional strings if needed
        callToAction: values.callToAction || undefined,
        escalation: {
          ...values.escalation,
          phone: values.escalation.phone || null,
          rules: values.escalation.rules
        }
      };
      return OrganizationsService.putApiV1OrganizationsAgentSettings(organizationId!, apiPayload);
    },
    onSuccess: () => {
      toast.success("Agent synapse reconfigured successfully.");
      queryClient.invalidateQueries({ queryKey: ["agent-settings", organizationId] });
    },
    onError: (error) => {
      toast.error("Neural synchronization failed.");
      console.error(error);
    },
  });

  const onSubmit = (values: AgentSettingsFormValues) => {
    updateMutation.mutate(values);
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      append(newKeyword.trim());
      setNewKeyword("");
    }
  };

  const currentTone = form.watch("tone");
  const currentMaxLength = form.watch("maxReplyLength");
  const escalationEnabled = form.watch("escalation.enabled");

  // Removed faulty watch that caused issues, using fields from useFieldArray for iterating rules
  const rules = form.watch("escalation.rules") || [];

  if (isLoading) {
     return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
               <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Neural Configuration</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Synthetic Persona</h1>
              <p className="text-zinc-500 font-light text-lg">
                Architect the consciousness and interaction logic of your autonomous agent.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <Button type="button" variant="ghost" className="text-zinc-500 hover:text-white hover:bg-white/5 h-12 rounded-xl px-6 font-bold uppercase tracking-widest text-[10px] gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Manifesto
               </Button>
               <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl px-8 shadow-xl shadow-emerald-500/20 group"
               >
                {updateMutation.isPending ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Save className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                )}
                Synchronize Agent
              </Button>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            {/* Personality Config */}
            <div className="lg:col-span-8 space-y-10">
              <Card className="bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] overflow-hidden group">
                <CardHeader className="p-10 pb-4 border-b border-white/5 bg-white/[0.01]">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase tracking-tight">Synaptic Directives</CardTitle>
                      <CardDescription className="text-zinc-500 font-light">Define the base instructions and behavioral constraints of the neural model.</CardDescription>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-2xl">
                      <Cpu className="w-6 h-6" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                  <FormField
                    control={form.control}
                    name="systemPrompt"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                          <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Core System Prompt</FormLabel>
                          <span className={cn("text-[10px] font-bold uppercase tracking-[0.2em]", field.value.length > 7000 ? "text-rose-500" : "text-zinc-600")}>
                            {field.value.length} / 8,000 shards
                          </span>
                        </div>
                        <div className="relative group/prompt">
                           <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-[1.5rem] opacity-0 group-focus-within/prompt:opacity-100 transition-opacity pointer-events-none" />
                           <FormControl>
                             <Textarea
                              {...field}
                              placeholder="Example: You are a high-performance neural assistant..."
                              className="min-h-[250px] bg-black/40 border-white/5 rounded-[1.5rem] p-6 text-sm leading-relaxed text-zinc-300 placeholder:text-zinc-800 focus:border-emerald-500/50 transition-all relative z-10"
                             />
                           </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-12 pt-4">
                    <FormField
                      control={form.control}
                      name="tone"
                      render={({ field }) => (
                        <FormItem className="space-y-6">
                           <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Interaction Resonance</FormLabel>
                           <FormControl>
                             <div className="grid grid-cols-2 gap-3">
                              {[
                                { label: "Professional", value: AgentSettings.tone.FORMAL },
                                { label: "Friendly", value: AgentSettings.tone.FRIENDLY },
                                { label: "Concise", value: AgentSettings.tone.CONCISE },
                                { label: "Casual", value: AgentSettings.tone.PLAYFUL }
                              ].map((t) => (
                                <button
                                  type="button"
                                  key={t.value}
                                  onClick={() => field.onChange(t.value)}
                                  className={cn(
                                    "px-6 py-4 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all text-center relative overflow-hidden group/btn",
                                    field.value === t.value
                                      ? "bg-emerald-500 border-emerald-500 text-black shadow-xl shadow-emerald-500/10"
                                      : "bg-zinc-800/50 border-white/5 text-zinc-500 hover:border-white/20 hover:text-white"
                                  )}
                                >
                                   {field.value === t.value && (
                                      <motion.div layoutId="tone-bg" className="absolute inset-0 bg-emerald-500" />
                                   )}
                                   <span className="relative z-10">{t.label}</span>
                                </button>
                              ))}
                            </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxReplyLength"
                      render={({ field }) => (
                        <FormItem className="space-y-8">
                           <div className="flex items-center justify-between px-1">
                            <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Neural Output Density</FormLabel>
                            <span className="text-xs font-bold text-emerald-400">{field.value} TOKENS</span>
                          </div>
                          <FormControl>
                            <div className="pt-4 px-2">
                              <Slider
                                min={50}
                                max={1000}
                                step={10}
                                value={[field.value]}
                                onValueChange={(val) => field.onChange(val[0])}
                                className="text-emerald-500"
                              />
                              <div className="flex justify-between mt-6 px-1">
                                 <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">Sub-Atomic</span>
                                 <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">Dense Cluster</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* New Fields Section */}
                  <div className="grid md:grid-cols-2 gap-10 pt-4 border-t border-white/5">
                     <FormField
                        control={form.control}
                        name="signature"
                        render={({ field }) => (
                           <FormItem className="space-y-3">
                              <div className="flex items-center gap-2">
                                 <FileSignature className="w-4 h-4 text-zinc-500" />
                                 <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Agent Signature</FormLabel>
                              </div>
                              <FormControl>
                                 <Input {...field} placeholder="e.g. - AI Support Team" className="bg-black/40 border-white/5 h-12 rounded-xl focus:border-emerald-500/50 text-white placeholder:text-zinc-700 font-medium" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="callToAction"
                        render={({ field }) => (
                           <FormItem className="space-y-3">
                              <div className="flex items-center gap-2">
                                 <Megaphone className="w-4 h-4 text-zinc-500" />
                                 <FormLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Call To Action</FormLabel>
                              </div>
                              <FormControl>
                                 <Input {...field} placeholder="e.g. Visit our website for more info." className="bg-black/40 border-white/5 h-12 rounded-xl focus:border-emerald-500/50 text-white placeholder:text-zinc-700 font-medium" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-3xl bg-black/40 border border-white/5 group/toggle">
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-white uppercase tracking-tight group-hover/toggle:text-emerald-400 transition-colors">Conversational Continuity</p>
                        <p className="text-xs text-zinc-600 font-light italic">Enable autonomous follow-up inquiries to drive engagement.</p>
                     </div>
                     <FormField
                        control={form.control}
                        name="followUpEnabled"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-emerald-500"
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>

                </CardContent>
              </Card>

              <Card className="bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] overflow-hidden group">
                <CardHeader className="p-10 pb-4 bg-amber-500/[0.02] border-b border-white/5">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <ShieldAlert className="w-5 h-5" />
                     </div>
                     <div>
                        <CardTitle className="text-2xl font-bold text-white tracking-tight uppercase tracking-tight">Escalation Thresholds</CardTitle>
                        <CardDescription className="text-zinc-500 font-light">Trigger manual intervention protocols based on semantic cues.</CardDescription>
                     </div>
                  </div>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                  <FormField
                    control={form.control}
                    name="escalation.enabled"
                    render={({ field }) => (
                       <div className="flex items-center justify-between p-6 rounded-3xl bg-black/40 border border-white/5 group/toggle">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-white uppercase tracking-tight group-hover/toggle:text-emerald-400 transition-colors">Autonomous De-escalation</p>
                          <p className="text-xs text-zinc-600 font-light italic">Force hand-off if neural confidence drops or triggers are detected.</p>
                        </div>
                         <FormItem>
                            <FormControl>
                               <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-emerald-500"
                               />
                            </FormControl>
                         </FormItem>
                      </div>
                    )}
                  />

                  {escalationEnabled && (
                    <div className="space-y-4">
                      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Critical Semantic Triggers</Label>
                      <div className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-6">
                         <div className="flex flex-wrap gap-3">
                            <AnimatePresence>
                              {rules.map((k, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                >
                                   <Badge variant="secondary" className="gap-2 pl-4 pr-2 py-1.5 text-[10px] font-bold bg-zinc-800 border border-white/5 text-zinc-400 hover:border-rose-500/30 transition-all uppercase tracking-widest rounded-xl">
                                     {k}
                                     <button type="button" onClick={() => remove(index)} className="hover:text-rose-400 transition-colors">
                                        <X className="w-3.5 h-3.5" />
                                     </button>
                                   </Badge>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                         </div>
                         <div className="flex gap-4">
                           <Input
                            placeholder="Enter synaptic trigger..."
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddKeyword();
                              }
                            }}
                            className="bg-zinc-900/50 border-white/5 h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 text-sm text-white placeholder:text-zinc-800 transition-all"
                           />
                           <Button type="button" onClick={handleAddKeyword} className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold h-12 rounded-xl px-6 border border-white/5">Inject</Button>
                         </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Neural Preview / Sandbox */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] min-h-[700px] flex flex-col sticky top-10 overflow-hidden group/browser">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />
                <CardHeader className="p-8 pb-4 border-b border-white/5 relative z-10">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-2xl bg-emerald-500 border border-emerald-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                           <Brain className="w-6 h-6 text-black" />
                         </div>
                         <div>
                           <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Agent Simulator</CardTitle>
                           <p className="text-[9px] text-emerald-500/60 font-bold uppercase tracking-[0.2em] mt-0.5">Real-time Synthesis</p>
                         </div>
                      </div>
                      <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                         <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                         <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      </div>
                   </div>
                </CardHeader>
                <CardContent className="flex-1 p-8 space-y-8 overflow-y-auto relative z-10 scrollbar-none">
                   <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                      <div className="relative">
                         <Terminal className="w-16 h-16 text-zinc-800 opacity-20" />
                         <motion.div
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 flex items-center justify-center"
                         >
                            <Zap className="w-8 h-8 text-emerald-500/20" />
                         </motion.div>
                      </div>
                      <div className="space-y-2">
                         <p className="text-xs text-zinc-600 font-bold uppercase tracking-[0.2em]">Matrix Initialized</p>
                         <p className="text-[11px] text-zinc-700 italic font-light max-w-[200px]">Send a pulse to test synaptic response paths.</p>
                      </div>
                   </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 relative z-10">
                   <div className="w-full relative group/input">
                     <div className="absolute -inset-px bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl opacity-0 group-focus-within/input:opacity-20 transition-opacity blur" />
                     <Input
                      placeholder="Query the model..."
                      className="bg-zinc-900 border-white/5 text-sm pr-14 h-16 rounded-2xl focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/50 text-white placeholder:text-zinc-800 font-medium relative z-10"
                     />
                     <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-zinc-200 text-black rounded-xl shadow-2xl relative z-20 active:scale-90 transition-all">
                        <Play className="w-5 h-5 fill-current" />
                     </Button>
                   </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
