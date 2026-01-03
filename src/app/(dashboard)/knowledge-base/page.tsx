"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Search,
  MoreVertical,
  Download,
  Trash2,
  File as FileIcon,
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
  Edit2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentsService } from "@/lib/api/services/DocumentsService";
import { useUserDeps } from "@/components/contexts/UserDeps";
import { formatDistanceToNow, format } from "date-fns";
import type { Document } from "@/lib/api/models/Document";

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { deps } = useUserDeps();
  // @ts-ignore
  const organizationId = deps?.organizations?.[0]?.organization?._id;

  // Fetch Documents
  const { data: documentsData, isLoading, refetch } = useQuery({
    queryKey: ["documents", organizationId],
    queryFn: () => DocumentsService.getApiV1OrganizationsDocuments(organizationId),
    enabled: !!organizationId,
  });

  const documents = documentsData?.data || [];

  // Upload Document Mutation
  const uploadMutation = useMutation({
    mutationFn: (data: { file: File; name?: string }) => {
      return DocumentsService.postApiV1OrganizationsDocumentsUpload(
        organizationId,
        {
          file: data.file,
          name: data.name || data.file.name
        }
      );
    },
    onSuccess: () => {
      toast.success("Neural ingestion complete. Synthesis starting.");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      resetUploadForm();
      setIsUploadOpen(false);
    },
    onError: (error) => {
      toast.error("Ingestion failed. Signal interrupted.");
      console.error("Upload error:", error);
    }
  });

  // Delete Document Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return DocumentsService.deleteApiV1OrganizationsDocuments(organizationId, id);
    },
    onSuccess: () => {
      toast.success("Document purged from neural matrix.");
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      toast.error("Purge failed. Protocol error.");
      console.error("Delete error:", error);
    }
  });

  const resetUploadForm = () => {
    setSelectedFile(null);
    setCustomName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileSelected(file);
    }
  };

  const handleFileSelected = (file: File) => {
    // Basic validation
    if (file.size > 100 * 1024 * 1024) { // 100MB
      toast.error("File exceeds neural capacity (100MB limit).");
      return;
    }
    setSelectedFile(file);
    setCustomName(file.name);
  };

  const handleSubmitUpload = () => {
    if (!selectedFile) return;
    uploadMutation.mutate({ file: selectedFile, name: customName });
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetUploadForm();
  };

  const filteredDocuments = documents.filter((doc: Document) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'COMPLETED': return "border-emerald-500/20 bg-emerald-500/5 text-emerald-400";
      case 'PROCESSING': return "border-amber-500/20 bg-amber-500/5 text-amber-400";
      case 'FAILED': return "border-rose-500/20 bg-rose-500/5 text-rose-400";
      default: return "border-zinc-500/20 bg-zinc-500/5 text-zinc-400";
    }
  };

  return (
    <div className="space-y-8 lg:space-y-12 pb-12 px-4 lg:px-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
           <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Synthetic Intelligence</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">Neural Reservoir</h1>
          <p className="text-zinc-500 font-light text-base lg:text-lg">
            Curate and vectorize the knowledge fabric of your autonomous agents.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-zinc-900/50 border border-white/5 px-4 py-2 rounded-xl">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                {documents.length} Vectors Active
              </span>
           </div>
        </div>
      </div>

      <div className="grid gap-6 md:gap-10 md:grid-cols-3">
        {/* Upload Section */}
        <Dialog open={isUploadOpen} onOpenChange={(open) => {
          setIsUploadOpen(open);
          if (!open) resetUploadForm();
        }}>
          <DialogTrigger asChild>
            <Card className="md:col-span-1 bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col group cursor-pointer hover:border-emerald-500/30 transition-all">
              <CardHeader className="p-6 md:p-8 pb-4">
                <CardTitle className="text-lg md:text-xl font-bold text-white tracking-tight uppercase tracking-tight">Ingest Intelligence</CardTitle>
                <CardDescription className="text-zinc-500 font-light text-sm md:text-base">
                  Inject multi-format data clusters into the neural matrix for deep-space understanding.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4 flex-1">
                <div
                  className="group relative border-2 border-dashed border-white/5 rounded-3xl p-6 md:p-10 transition-all flex flex-col items-center justify-center gap-4 md:gap-6 text-center min-h-[250px] md:min-h-[300px] group-hover:bg-white/[0.03] group-hover:border-emerald-500/30"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-zinc-800/50 border border-white/5 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400 duration-500">
                    <Upload className="w-8 h-8 md:w-10 md:h-10 text-zinc-500 group-hover:text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base md:text-lg font-bold text-white tracking-tight">Initiate Upload</p>
                    <p className="text-[10px] md:text-xs text-zinc-500 font-light max-w-[180px] mx-auto uppercase tracking-widest leading-relaxed">Click to open neural interface</p>
                  </div>
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
          </DialogTrigger>
          <DialogContent className="sm:max-w-md w-[95%] rounded-3xl bg-zinc-950 border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold uppercase tracking-widest text-emerald-500">Upload Knowledge</DialogTitle>
              <DialogDescription className="text-zinc-500 text-xs uppercase tracking-wider">
                Select a document to vectorize into the knowledge base.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div
                className={cn(
                  "border-2 border-dashed rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
                  selectedFile ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/10 hover:border-emerald-500/30 hover:bg-white/5"
                )}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.docx,.txt,.csv"
                />

                {selectedFile ? (
                  <div className="relative w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="absolute -top-10 -right-2 p-1 rounded-full bg-zinc-900 border border-white/10 hover:bg-rose-500/20 hover:text-rose-500 cursor-pointer transition-colors" onClick={handleRemoveFile}>
                      <X className="w-4 h-4" />
                    </div>
                    <FileIcon className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 mb-3" />
                    <p className="text-xs md:text-sm font-bold text-white break-all max-w-[200px]">{selectedFile.name}</p>
                    <p className="text-[10px] md:text-xs text-zinc-500 mt-1 uppercase tracking-wider">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB Ready</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 md:w-10 md:h-10 text-zinc-600 mb-4" />
                    <p className="text-xs md:text-sm font-bold text-zinc-300">Click or drag file here</p>
                    <p className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">PDF, DOCX, TXT UP TO 100MB</p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="doc-name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Document Name (Optional)</Label>
                <Input
                  id="doc-name"
                  placeholder="Custom display name..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="bg-black/50 border-white/10 focus:border-emerald-500/50 text-white placeholder:text-zinc-700"
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-between gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsUploadOpen(false)} className="text-zinc-500 hover:text-white">
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmitUpload}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
                disabled={!selectedFile || uploadMutation.isPending}
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Vectorizing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Ingest Document
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Document List */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
              <Input
                placeholder="Query document matrix..."
                className="bg-zinc-900/40 border-white/5 pl-11 h-12 sm:h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-sm text-white placeholder:text-zinc-700 font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="h-12 sm:h-14 border-white/5 bg-zinc-800/50 text-zinc-400 hover:text-white transition-all px-6 rounded-2xl font-bold uppercase tracking-widest text-[10px]"
              onClick={() => refetch()}
            >
              <RefreshCcw className={cn("w-4 h-4 sm:mr-2", isLoading && "animate-spin")} />
              <span className="hidden sm:inline">Re-Sync Matrix</span>
            </Button>
          </div>

          <div className="grid gap-4">
            {isLoading ? (
               <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
                  <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 animate-spin mb-4" />
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Accessing Neural Registry...</p>
               </div>
            ) : filteredDocuments.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-14 md:py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                  <FileIcon className="w-10 h-10 md:w-12 md:h-12 text-zinc-700 mb-4 opacity-50" />
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight uppercase">No Vectors Found</h3>
                  <p className="text-zinc-500 text-xs md:text-sm mt-2 max-w-[250px] md:max-w-sm">
                    The knowledge matrix is empty. Ingest documents to begin neural training.
                  </p>
               </div>
            ) : (
              filteredDocuments.map((doc: Document, i: number) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="group"
                >
                  <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 group-hover:border-white/20 transition-all duration-300 rounded-[1.5rem] overflow-hidden">
                    <div className="flex items-center p-4 sm:p-6 gap-4 sm:gap-6">
                      <div className={cn(
                        "w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:rotate-3 shadow-2xl",
                        doc.type === "PDF"
                          ? "bg-rose-500/10 border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20"
                          : "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20"
                      )}>
                        <FileText className="w-5 h-5 sm:w-7 sm:h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                          <h3 className="text-xs sm:text-sm font-bold text-white truncate uppercase tracking-tight group-hover:text-emerald-400 transition-colors ">{doc.name}</h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[8px] sm:text-[9px] h-5 px-2 sm:px-3 uppercase font-bold tracking-widest border transition-colors",
                              getStatusColor(doc.status)
                            )}
                          >
                            {doc.status || "UNKNOWN"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Cpu className="w-3 h-3" /> {(doc.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                          <div className="w-1 h-1 rounded-full bg-zinc-800" />
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {doc.processedAt ? formatDistanceToNow(new Date(doc.processedAt)) + " ago" : "Pending"}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 opacity-100 translate-x-0 lg:opacity-0 lg:group-hover:opacity-100 lg:transition-all lg:translate-x-4 lg:group-hover:translate-x-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl">
                          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl">
                              <MoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                             <DropdownMenuItem
                              className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 gap-3 h-10 rounded-lg transition-all font-bold cursor-pointer"
                              onClick={() => deleteMutation.mutate(doc.id)}
                              disabled={deleteMutation.isPending}
                             >
                               {deleteMutation.isPending ? (
                                 <Loader2 className="w-4 h-4 animate-spin" />
                               ) : (
                                 <Trash2 className="w-4 h-4" />
                               )}
                               Purge from Matrix
                             </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {doc.status === "PROCESSING" && (
                       <div className="h-1 w-full bg-black overflow-hidden relative">
                         <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                         />
                       </div>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

