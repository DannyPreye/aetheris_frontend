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
  Target
} from "lucide-react";
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

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.d@enterprise.com",
    whatsapp: "+1 234 567 890",
    stage: "lead",
    score: 85,
    lastContact: "2h ago",
    tags: ["High Velocity", "Strategic"],
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@techcorp.io",
    whatsapp: "+44 7700 900000",
    stage: "customer",
    score: 98,
    lastContact: "1d ago",
    tags: ["Enterprise", "Internal"],
  },
  {
    id: "3",
    name: "Global Solutions",
    email: "ops@globalsol.com",
    whatsapp: "+0 112 334 556",
    stage: "prospect",
    score: 42,
    lastContact: "3d ago",
    tags: ["Delayed"],
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@fashion.ai",
    whatsapp: "+33 600 000 000",
    stage: "lead",
    score: 67,
    lastContact: "2m ago",
    tags: ["VIP"],
  },
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case "lead": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "prospect": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "customer": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    default: return "bg-zinc-800 text-zinc-400 border-white/5";
  }
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.whatsapp.includes(searchTerm)
  );

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
           <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1">Customer Registry</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Neural Nodes</h1>
          <p className="text-zinc-500 font-light text-lg">
            Complete telemetry of your enterprise customer matrix.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 h-12 rounded-xl px-6">
            <Download className="w-5 h-5 mr-2" />
            Export Cluster
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl px-6 shadow-xl shadow-emerald-500/20 group">
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            Integrate Node
          </Button>
        </div>
      </div>

      <Card className="bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] overflow-hidden">
        <CardHeader className="p-8 border-b border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Locate signature (Name, ID, Email)..."
                className="bg-black/40 border-white/5 pl-11 h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-sm text-white placeholder:text-zinc-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="h-11 border-white/5 bg-zinc-800/50 text-zinc-400 hover:text-white transition-all gap-2 px-4 rounded-xl">
                <Filter className="w-4 h-4" />
                Spectroscopy
              </Button>
              <div className="h-6 w-px bg-white/5 mx-2" />
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest leading-none">
                {filteredCustomers.length} Nodes Online
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.01] border-b border-white/5">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[300px] pl-10 font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Node Signature</TableHead>
                <TableHead className="font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Lifecycle State</TableHead>
                <TableHead className="font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Neural Score</TableHead>
                <TableHead className="font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Sync Time</TableHead>
                <TableHead className="font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Classification</TableHead>
                <TableHead className="text-right pr-10 font-bold h-16 text-[10px] uppercase tracking-widest text-zinc-500">Protocols</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="group hover:bg-white/[0.02] border-b border-white/5 transition-colors cursor-pointer">
                  <TableCell className="pl-10 py-6">
                    <div className="flex items-center gap-5">
                       <div className="relative">
                          <Avatar className="h-12 w-12 border border-white/5 group-hover:border-emerald-500/30 transition-all">
                            <AvatarFallback className="bg-zinc-800 text-emerald-400 font-bold uppercase tracking-tighter">
                              {customer.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow-xl" />
                       </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{customer.name}</p>
                        <p className="text-xs text-zinc-500 mt-1 font-light italic">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("px-3 py-1 capitalize text-[10px] font-bold border rounded-full transition-all", getStageColor(customer.stage))}>
                      {customer.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="h-1.5 w-24 bg-black rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${customer.score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                            customer.score > 70 ? "bg-emerald-500" : customer.score > 40 ? "bg-amber-500" : "bg-zinc-600"
                          )}
                        />
                      </div>
                      <span className="text-xs font-bold text-white tracking-widest">{customer.score}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium uppercase tracking-tight">{customer.lastContact}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {customer.tags.map(tag => (
                        <div key={tag} className="text-[9px] px-2 py-0.5 bg-zinc-800/50 border border-white/5 text-zinc-400 font-bold uppercase tracking-widest rounded-lg">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-10">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64 bg-zinc-900 border-white/10 shadow-2xl p-2 rounded-2xl">
                        <DropdownMenuLabel className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Node Operations</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <div className="p-1">
                           <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-all font-medium cursor-pointer">
                             <ExternalLink className="w-4 h-4" />
                             Full Spectroscopy
                           </DropdownMenuItem>
                           <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-all font-medium cursor-pointer">
                             <Target className="w-4 h-4" />
                             Neural Optimization
                           </DropdownMenuItem>
                           <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-all font-medium cursor-pointer">
                             <Zap className="w-4 h-4" />
                             Force Sync
                           </DropdownMenuItem>
                        </div>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <div className="p-1">
                           <DropdownMenuItem className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 gap-3 h-10 rounded-lg transition-all font-bold cursor-pointer">
                             <ShieldAlert className="w-4 h-4" />
                             Isolate Node (Block)
                           </DropdownMenuItem>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCustomers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 bg-white/[0.01]">
               <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-700 animate-pulse">
                     <Search className="w-10 h-10" />
                  </div>
                  <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl" />
               </div>
              <h3 className="text-2xl font-bold text-white tracking-tight uppercase tracking-widest">Node Not Found</h3>
              <p className="text-zinc-500 font-light max-w-sm text-center mt-3 text-sm leading-relaxed">
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
