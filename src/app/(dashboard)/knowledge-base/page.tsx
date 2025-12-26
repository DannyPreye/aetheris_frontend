"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Search,
  MoreVertical,
  Download,
  Trash2,
  File,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  ShieldCheck,
  Globe,
  Database,
  Cpu,
  RefreshCcw,
  Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

const documents = [
  {
    id: "1",
    name: "Architectural_Manifesto_v2.pdf",
    size: "2.4 MB",
    type: "PDF",
    status: "SYNTHESIZED",
    uploadedAt: "Oct 12, 2024",
  },
  {
    id: "2",
    name: "Customer_Interaction_Protocols.docx",
    size: "1.1 MB",
    type: "DOCX",
    status: "VECTORIZING",
    uploadedAt: "Oct 14, 2024",
  },
  {
    id: "3",
    name: "Pricing_Elasticity_Logic.pdf",
    size: "850 KB",
    type: "PDF",
    status: "ERROR",
    uploadedAt: "Oct 15, 2024",
  },
  {
    id: "4",
    name: "Enterprise_SLA_Quantum.pdf",
    size: "3.2 MB",
    type: "PDF",
    status: "SYNTHESIZED",
    uploadedAt: "Oct 18, 2024",
  },
];

export default function KnowledgeBasePage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        setUploadProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          toast.success("Neural ingestion complete. Synthesis starting.");
        }, 500);
      } else {
        setUploadProgress(progress);
      }
    }, 400);
  };

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
           <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Synthetic Intelligence</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Neural Reservoir</h1>
          <p className="text-zinc-500 font-light text-lg">
            Curate and vectorize the knowledge fabric of your autonomous agents.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/5 px-4 py-2 rounded-xl">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">34.2 GB Vectorized</span>
           </div>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {/* Upload Section */}
        <Card className="md:col-span-1 bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col group">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-bold text-white tracking-tight uppercase tracking-tight">Ingest Intelligence</CardTitle>
            <CardDescription className="text-zinc-500 font-light">
              Inject multi-format data clusters into the neural matrix for deep-space understanding.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-4 flex-1">
            <div
              className={cn(
                "group relative border-2 border-dashed rounded-3xl p-10 transition-all flex flex-col items-center justify-center gap-6 text-center cursor-pointer min-h-[300px]",
                isUploading
                  ? "bg-white/5 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                  : "hover:bg-white/[0.03] hover:border-emerald-500/30 border-white/5"
              )}
              onClick={() => !isUploading && handleUpload()}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {isUploading ? (
                <div className="space-y-6 w-full relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                  <div className="space-y-3 px-4">
                    <p className="text-sm font-bold text-white uppercase tracking-widest">Decoding Stream...</p>
                    <div className="h-2 bg-black rounded-full overflow-hidden border border-white/5 shadow-inner p-[1px]">
                       <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                       />
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
                      {Math.round(uploadProgress)}% Fragmented
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-3xl bg-zinc-800/50 border border-white/5 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400 duration-500">
                    <Upload className="w-10 h-10 text-zinc-500 group-hover:text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-white tracking-tight">Release Fragment</p>
                    <p className="text-xs text-zinc-500 font-light max-w-[180px] mx-auto uppercase tracking-widest leading-relaxed">PDF, DOCX, TXT Mapping up to 100MB</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-8 pt-0 border-t border-white/5 bg-white/[0.01]">
            <div className="flex items-start gap-3 py-4">
               <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
               <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.1em] leading-relaxed">
                  Data Isolation Protocols active. Post-ingestion shards are processed in secure SOC2-compliant neural environments.
               </p>
            </div>
          </CardFooter>
        </Card>

        {/* Document List */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
              <Input
                placeholder="Query document matrix..."
                className="bg-zinc-900/40 border-white/5 pl-11 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-sm text-white placeholder:text-zinc-700 font-medium"
              />
            </div>
            <Button variant="outline" className="h-14 border-white/5 bg-zinc-800/50 text-zinc-400 hover:text-white transition-all px-6 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Re-Sync Matrix
            </Button>
          </div>

          <div className="grid gap-4">
            {documents.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="group"
              >
                <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 group-hover:border-white/20 transition-all duration-300 rounded-[1.5rem] overflow-hidden">
                  <div className="flex items-center p-6 gap-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:rotate-3 shadow-2xl",
                      doc.type === "PDF"
                        ? "bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20"
                    )}>
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm font-bold text-white truncate uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{doc.name}</h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[9px] h-5 px-3 uppercase font-bold tracking-widest border transition-colors",
                            doc.status === "SYNTHESIZED" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" :
                            doc.status === "VECTORIZING" ? "border-amber-500/20 bg-amber-500/5 text-amber-400" :
                            "border-rose-500/20 bg-rose-500/5 text-rose-400"
                          )}
                        >
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Cpu className="w-3 h-3" /> {doc.size}</span>
                        <div className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {doc.uploadedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl">
                        <Download className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-white/10 shadow-2xl p-2 rounded-2xl">
                           <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-white/5 focus:text-white transition-all font-medium cursor-pointer">
                             <Edit2 className="w-4 h-4" />
                             Rename Fragment
                           </DropdownMenuItem>
                           <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-all font-medium cursor-pointer">
                             <Zap className="w-4 h-4" />
                             Analyze Chunks
                           </DropdownMenuItem>
                           <DropdownMenuSeparator className="bg-white/5" />
                           <DropdownMenuItem className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 gap-3 h-10 rounded-lg transition-all font-bold cursor-pointer">
                             <Trash2 className="w-4 h-4" />
                             Purge from Matrix
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {doc.status === "VECTORIZING" && (
                     <div className="h-1 w-full bg-black overflow-hidden relative">
                       <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                       />
                     </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
