"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  MoreHorizontal,
  Search,
  Shield,
  User,
  Mail,
  Clock,
  MoreVertical,
  Activity,
  Trash2,
  Edit2,
  ShieldCheck,
  Zap,
  Globe,
  Key
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

const users = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex@metaforce.ai",
    role: "OWNER",
    status: "ACTIVE",
    lastLogin: "Just now",
  },
  {
    id: "2",
    name: "Elena Chen",
    email: "elena.c@metaforce.ai",
    role: "ADMIN",
    status: "ACTIVE",
    lastLogin: "4 hours ago",
  },
  {
    id: "3",
    name: "Marcus Thorne",
    email: "m.thorne@metaforce.ai",
    role: "AGENT",
    status: "ACTIVE",
    lastLogin: "2 days ago",
  },
  {
    id: "4",
    name: "Sophie Moore",
    email: "sophie.m@metaforce.ai",
    role: "VIEWER",
    status: "INACTIVE",
    lastLogin: "1 week ago",
  },
];

const getRoleBadge = (role: string) => {
  switch (role) {
    case "OWNER": return "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]";
    case "ADMIN": return "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
    case "AGENT": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
    default: return "bg-zinc-800 text-zinc-400 border-white/5";
  }
};

export default function UsersSettingsPage() {
  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
           <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Access Matrix</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Neural Permissions</h1>
          <p className="text-zinc-500 font-light text-lg">
            Manage the synchronized intelligence of your human operatives.
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold h-12 rounded-xl px-8 shadow-xl shadow-emerald-500/20 group transition-all active:scale-95">
          <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Invite operative
        </Button>
      </div>

      <div className="grid gap-10">
        <Card className="bg-zinc-900/40 backdrop-blur-3xl border-white/5 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-10 pb-4 border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                <Input placeholder="Locate operative by ID or Email..." className="bg-black/40 border-white/5 pl-11 h-14 rounded-2xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-sm text-white placeholder:text-zinc-800 font-medium" />
              </div>
              <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                <span className="flex items-center gap-2">
                   <Activity className="w-4 h-4 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                   12 Synchronized
                </span>
                <span className="flex items-center gap-2">
                   <User className="w-4 h-4 text-zinc-700" />
                   2 Pending Sync
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-white/[0.01] border-b border-white/5">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[300px] pl-10 h-16 font-bold text-zinc-500 uppercase tracking-widest text-[10px]">Operative Identity</TableHead>
                  <TableHead className="h-16 font-bold text-zinc-500 uppercase tracking-widest text-[10px]">Protocol Role</TableHead>
                  <TableHead className="h-16 font-bold text-zinc-500 uppercase tracking-widest text-[10px]">Sync Status</TableHead>
                  <TableHead className="h-16 font-bold text-zinc-500 uppercase tracking-widest text-[10px]">Last Pulse</TableHead>
                  <TableHead className="text-right pr-10 h-16 font-bold text-zinc-500 uppercase tracking-widest text-[10px]">Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group hover:bg-white/[0.02] border-b border-white/5 transition-colors cursor-pointer"
                  >
                    <TableCell className="pl-10 py-6">
                      <div className="flex items-center gap-5">
                         <div className="relative">
                            <Avatar className="h-12 w-12 border border-white/5 group-hover:border-emerald-500/30 transition-all">
                              <AvatarFallback className="bg-zinc-800 text-emerald-400 font-bold uppercase tracking-tighter">
                                {user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            {user.status === "ACTIVE" && (
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow-xl" />
                            )}
                         </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight leading-tight">{user.name}</p>
                          <p className="text-xs text-zinc-500 mt-1 font-light italic">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("px-3 py-1 font-bold text-[10px] border leading-none rounded-full transition-all uppercase tracking-widest", getRoleBadge(user.role))}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          user.status === "ACTIVE" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-zinc-800"
                        )} />
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest",
                          user.status === "ACTIVE" ? "text-white" : "text-zinc-600"
                        )}>
                          {user.status === "ACTIVE" ? "Synchronized" : "Offline"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium uppercase tracking-tight">{user.lastLogin}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                         <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                            <Edit2 className="w-4 h-4" />
                         </Button>
                         <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all">
                            <Trash2 className="w-4 h-4" />
                         </Button>
                         <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                              <MoreHorizontal className="w-5 h-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-64 bg-zinc-900 border-white/10 shadow-2xl p-2 rounded-2xl">
                             <DropdownMenuLabel className="p-3 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Operative Controls</DropdownMenuLabel>
                             <DropdownMenuSeparator className="bg-white/5" />
                             <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-white/5 focus:text-white transition-all font-medium cursor-pointer">
                               <Shield className="w-4 h-4" />
                               Modify Permissions
                             </DropdownMenuItem>
                             <DropdownMenuItem className="gap-3 h-10 rounded-lg focus:bg-white/5 focus:text-white transition-all font-medium cursor-pointer">
                               <Key className="w-4 h-4" />
                               Reset Neural Key
                             </DropdownMenuItem>
                             <DropdownMenuSeparator className="bg-white/5" />
                             <DropdownMenuItem className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 gap-3 h-10 rounded-lg transition-all font-bold cursor-pointer">
                               <Activity className="w-4 h-4" />
                               Terminate Session
                             </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Roles Hint */}
        <div className="grid md:grid-cols-3 gap-8 pt-4">
           {[
             { role: "Owner", desc: "Absolute authority over resource allocation, synaptic settings, and operative management.", icon: ShieldCheck, color: "text-purple-400", border: "border-purple-500/20" },
             { role: "Admin", desc: "High-level management of synthetic personas, data shards, and interaction clusters.", icon: Zap, color: "text-blue-400", border: "border-blue-500/20" },
             { role: "Agent", desc: "Operational access to synaptic handshakes and node interaction telemetry.", icon: Globe, color: "text-emerald-400", border: "border-emerald-500/20" },
           ].map(hint => (
             <div key={hint.role} className={cn("p-8 rounded-[2rem] border bg-zinc-900/40 backdrop-blur-xl flex flex-col gap-4 group transition-all hover:bg-white/[0.03]", hint.border)}>
                <div className="flex items-center gap-4">
                   <div className={cn("w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center transition-all group-hover:scale-110", hint.color)}>
                      <hint.icon className="w-5 h-5 focus-within:shadow-2xl" />
                   </div>
                   <h4 className="text-xs font-bold uppercase tracking-widest text-white">{hint.role} Operative</h4>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">{hint.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
