"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Globe,
  Zap,
  User,
  Target,
  Loader2,
  Eye
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CustomersService } from "@/lib/api/services/CustomersService";
import { useUserDeps } from "@/components/contexts/UserDeps";
import { formatDistanceToNow } from "date-fns";
import type { Customer } from "@/lib/api/models/Customer";

const getStageColor = (stage?: string) => {
  switch (stage?.toLowerCase()) {
    case "lead": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "prospect": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "customer": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    default: return "bg-zinc-800 text-zinc-400 border-white/5";
  }
};

import { CreateCustomerDialog } from "./_components/CreateCustomerDialog";
import { BulkImportDialog } from "./_components/BulkImportDialog";
import { OutreachDialog } from "./_components/OutreachDialog";

// ... (existing imports)

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { deps } = useUserDeps();
  // @ts-ignore
  const organizationId = deps?.organizations?.[0]?.organization?._id;

  const [createOpen, setCreateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [outreachOpen, setOutreachOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["customers", organizationId],
    queryFn: () => CustomersService.getApiV1Customers(organizationId),
    enabled: !!organizationId,
  });

  const customers = data?.data || [];

  const filteredCustomers = customers.filter(c =>
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.whatsappNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-12 pb-12">
      {organizationId && (
        <>
            <CreateCustomerDialog open={createOpen} onOpenChange={setCreateOpen} organizationId={organizationId} />
            <BulkImportDialog open={importOpen} onOpenChange={setImportOpen} organizationId={organizationId} />
            <OutreachDialog open={outreachOpen} onOpenChange={setOutreachOpen} organizationId={organizationId} />
        </>
      )}

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between px-4 lg:px-0">
        <div>
           <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Customer Registry</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 uppercase">Neural Nodes</h1>
          <p className="text-zinc-500 font-light text-base lg:text-lg">
            Complete telemetry of your enterprise customer matrix.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-transparent border-white/10 text-white hover:bg-white/5 h-11 lg:h-12 rounded-xl px-4 lg:px-6 text-xs lg:text-sm"
            onClick={() => setOutreachOpen(true)}
          >
            <Zap className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-purple-400" />
            <span className="hidden sm:inline">Launch Outreach</span>
            <span className="sm:hidden">Outreach</span>
          </Button>

          <Button
            variant="outline"
            className="bg-transparent border-white/10 text-white hover:bg-white/5 h-11 lg:h-12 rounded-xl px-4 lg:px-6 text-xs lg:text-sm"
            onClick={() => setImportOpen(true)}
          >
            <Download className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            <span className="hidden sm:inline">Import Excel</span>
            <span className="sm:hidden">Import</span>
          </Button>

          <Button
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-11 lg:h-12 rounded-xl px-4 lg:px-6 shadow-xl shadow-emerald-500/20 group text-xs lg:text-sm"
            onClick={() => setCreateOpen(true)}
          >
            <Plus className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:rotate-90 transition-transform" />
            <span className="hidden sm:inline">Add Node</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <div className="px-4 lg:px-0">
        <Card className="bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-6 lg:p-8 border-b border-white/5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  placeholder="Locate signature (Name, ID, Email)..."
                  className="bg-black/40 border-white/5 pl-11 h-11 lg:h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-xs lg:text-sm text-white placeholder:text-zinc-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
                <Button variant="outline" size="sm" className="h-10 lg:h-11 border-white/5 bg-zinc-800/50 text-zinc-400 hover:text-white transition-all gap-2 px-4 rounded-xl text-xs">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Spectroscopy</span>
                  <span className="sm:hidden">Filter</span>
                </Button>
                <div className="hidden sm:block h-6 w-px bg-white/5 mx-2" />
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest whitespace-nowrap">
                  {filteredCustomers.length} Nodes Online
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/[0.01] border-b border-white/5">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[250px] lg:w-[300px] pl-6 lg:pl-10 font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Node Signature</TableHead>
                  <TableHead className="font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Lifecycle State</TableHead>
                  <TableHead className="hidden lg:table-cell font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Neural Score</TableHead>
                  <TableHead className="hidden md:table-cell font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Sync Time</TableHead>
                  <TableHead className="hidden xl:table-cell font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Classification</TableHead>
                  <TableHead className="text-right pr-6 lg:pr-10 font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Protocols</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-32 text-center border-none">
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="w-10 h-10 lg:w-12 lg:h-12 text-emerald-500 animate-spin mb-4" />
                        <p className="text-zinc-500 font-light uppercase tracking-widest text-[10px] lg:text-xs">Accessing Neural Registry...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-32 text-center border-none">
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative mb-6 mx-auto">
                          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-700 animate-pulse">
                            <Search className="w-8 h-8 lg:w-10 lg:h-10" />
                          </div>
                          <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl" />
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight uppercase tracking-widest">Node Not Found</h3>
                        <p className="text-zinc-500 font-light max-w-sm text-center mt-3 text-xs lg:text-sm leading-relaxed px-6">
                          The neural registry returned zero matches for this signature. Initiate search refresh or verify coordinates.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-10 h-10 border-white/10 hover:bg-white/5 text-zinc-500 hover:text-white px-8 rounded-xl font-bold uppercase tracking-widest text-[10px]"
                          onClick={() => setSearchTerm("")}
                        >
                          Clear All Trace Filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer: Customer) => {
                    const customerId = (customer as any)._id || customer.id;
                    return (
                      <TableRow key={customerId} className="group hover:bg-white/[0.02] border-b border-white/5 transition-colors cursor-pointer">
                        <TableCell className="pl-6 lg:pl-10 py-5 lg:py-6">
                          <div className="flex items-center gap-4 lg:gap-5">
                            <div className="relative flex-shrink-0">
                              <Avatar className="h-10 w-10 lg:h-12 lg:w-12 border border-white/5 group-hover:border-emerald-500/30 transition-all">
                                <AvatarFallback className="bg-zinc-800 text-emerald-400 font-bold uppercase tracking-tighter text-xs lg:text-sm">
                                  {(customer.name || customer.whatsappNumber)[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow-xl" />
                            </div>
                            <div className="min-w-0">
                              <Link href={`/customers/${customerId}`} className="block">
                                <p className="text-xs lg:text-sm font-bold text-white hover:text-emerald-400 transition-colors uppercase tracking-tight truncate">
                                  {customer.name || customer.whatsappNumber}
                                </p>
                              </Link>
                              <p className="text-[10px] lg:text-xs text-zinc-500 mt-0.5 lg:mt-1 font-light italic truncate max-w-[150px] lg:max-w-none">
                                {customer.email || "No email matrix"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("px-2 py-0.5 lg:px-3 lg:py-1 capitalize text-[8px] lg:text-[10px] font-bold border rounded-full transition-all whitespace-nowrap", getStageColor(customer.metadata?.stage))}>
                            {customer.metadata?.stage || "lead"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-3 lg:gap-4">
                            <div className="h-1.5 w-16 lg:w-24 bg-black rounded-full overflow-hidden border border-white/5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${customer.metadata?.score || 50}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={cn(
                                  "h-full rounded-full",
                                  (customer.metadata?.score || 50) > 70 ? "bg-emerald-500" : (customer.metadata?.score || 50) > 40 ? "bg-amber-500" : "bg-zinc-600"
                                )}
                              />
                            </div>
                            <span className="text-[10px] lg:text-xs font-bold text-white tracking-widest">{customer.metadata?.score || 50}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-[10px] lg:text-xs font-medium uppercase tracking-tight whitespace-nowrap">
                              {customer.updatedAt ? formatDistanceToNow(new Date(customer.updatedAt)) + " ago" : "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div className="flex gap-2 flex-wrap max-w-[200px]">
                            {customer.tags?.map((tag: string) => (
                              <div key={tag} className="text-[8px] lg:text-[9px] px-2 py-0.5 bg-zinc-800/50 border border-white/5 text-zinc-400 font-bold uppercase tracking-widest rounded-lg">
                                {tag}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6 lg:pr-10">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-10 lg:w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
                                <MoreHorizontal className="w-4 h-4 lg:w-5 lg:h-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 lg:w-64 bg-zinc-900 border-white/10 shadow-2xl p-2 rounded-2xl">
                              <DropdownMenuLabel className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Node Operations</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-white/5" />
                              <div className="p-1 space-y-1">
                                <Link href={`/customers/${customerId}`}>
                                  <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-all font-medium cursor-pointer text-xs lg:text-sm">
                                    <Eye className="w-4 h-4" />
                                    Inspect Node
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-all font-medium cursor-pointer text-xs lg:text-sm">
                                  <ExternalLink className="w-4 h-4" />
                                  Full Spectroscopy
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-all font-medium cursor-pointer text-xs lg:text-sm lg:hidden sm:flex">
                                   <Target className="w-4 h-4 text-emerald-500" />
                                   Optimize Resonance
                                </DropdownMenuItem>
                              </div>
                              <DropdownMenuSeparator className="bg-white/5" />
                              <div className="p-1">
                                <DropdownMenuItem className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 gap-3 h-10 rounded-lg transition-all font-bold cursor-pointer text-xs lg:text-sm">
                                  <ShieldAlert className="w-4 h-4" />
                                  Isolate Node
                                </DropdownMenuItem>
                              </div>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
