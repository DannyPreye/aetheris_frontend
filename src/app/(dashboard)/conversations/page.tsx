"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
  Send,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock,
  User,
  Bot,
  ShieldCheck,
  Zap,
  Globe,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Neural handshake complete. Awaiting further telemetry.",
    time: "2m ago",
    unread: 2,
    online: true,
    avatar: "/placeholder.png",
    type: "ENTERPRISE",
  },
  {
    id: 2,
    name: "Tech Solutions",
    lastMessage: "Vector optimization applied to the knowledge cluster.",
    time: "15m ago",
    unread: 0,
    online: false,
    avatar: "/placeholder.png",
    type: "SYSTEM",
  },
  {
    id: 3,
    name: "Alice Smith",
    lastMessage: "Requesting manual override for transaction id #9842.",
    time: "1h ago",
    unread: 0,
    online: true,
    avatar: "/placeholder.png",
    type: "PRIORITY",
  },
  {
    id: 4,
    name: "Global Logistics",
    lastMessage: "Routing protocols updated for EMEA sector.",
    time: "3h ago",
    unread: 0,
    online: false,
    avatar: "/placeholder.png",
    type: "STANDARD",
  },
];

const messages = [
  {
    id: 1,
    content: "Initiating protocol sequence alpha. Standby for sync.",
    time: "10:00 AM",
    sender: "bot",
    status: "delivered",
  },
  {
    id: 2,
    content: "Synapse established. Ready for data ingestion.",
    time: "10:01 AM",
    sender: "user",
    status: "read",
  },
  {
    id: 3,
    content: "Vectorizing recent logs... complete. Synthesis accuracy at 98.4%.",
    time: "10:02 AM",
    sender: "bot",
    status: "read",
  },
];

export default function ConversationsPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="h-[calc(100vh-10rem)] flex items-stretch gap-8 overflow-hidden">
      {/* Sidebar - Cluster Registry */}
      <div className="w-[400px] flex flex-col bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">Handshakes</h2>
            <Button size="icon" className="bg-emerald-500 hover:bg-emerald-400 text-black h-10 w-10 rounded-xl shadow-lg shadow-emerald-500/10">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Locate signature..."
              className="bg-black/40 border-white/5 pl-11 h-12 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-sm text-white placeholder:text-zinc-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-2">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-3xl transition-all duration-300 text-left relative group",
                selectedChat.id === chat.id
                  ? "bg-white/[0.03] border border-white/10 ring-1 ring-white/5 shadow-2xl"
                  : "hover:bg-white/[0.01] border border-transparent"
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-12 w-12 border border-white/5 group-hover:border-emerald-500/30 transition-colors">
                  <AvatarFallback className="bg-zinc-800 text-zinc-400 font-bold group-hover:text-emerald-400">
                    {chat.name[0]}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-900 group-hover:scale-110 transition-transform" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white group-hover:text-emerald-400 transition-colors truncate uppercase tracking-tight text-sm">
                    {chat.name}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">{chat.time}</span>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-1 font-light leading-relaxed">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="absolute right-4 bottom-4 w-5 h-5 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
              {selectedChat.id === chat.id && (
                 <motion.div layoutId="chat-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area - Interface */}
      <div className="flex-1 flex flex-col bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden relative">
        {/* Header */}
        <div className="h-24 px-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="h-12 w-12 border border-white/5">
                <AvatarFallback className="bg-zinc-800 text-emerald-400 font-bold uppercase">
                  {selectedChat.name[0]}
                </AvatarFallback>
              </Avatar>
              {selectedChat.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-900" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                 <h3 className="font-bold text-white text-lg tracking-tight uppercase tracking-tight">{selectedChat.name}</h3>
                 <Badge variant="outline" className="text-[9px] font-bold uppercase border-emerald-500/20 text-emerald-400 bg-emerald-500/5 px-2">
                    {selectedChat.type}
                 </Badge>
              </div>
              <p className="text-[10px] text-emerald-500/60 flex items-center gap-2 font-bold uppercase tracking-widest mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Linked to Neural Cluster #54
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl h-11 w-11 transition-all">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl h-11 w-11 transition-all">
              <Video className="w-5 h-5" />
            </Button>
            <div className="w-px h-6 bg-white/5 mx-2" />
            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl h-11 w-11 transition-all">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-none relative">
           {/* Background Mesh */}
           <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,emerald_0%,transparent_50%)]" />
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,blue_0%,transparent_50%)]" />
           </div>

          <div className="flex justify-center my-8">
             <div className="px-6 py-2 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                End-to-End Quantum Encryption Active
             </div>
          </div>

          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[70%]",
                msg.sender === "user" ? "ml-auto items-end" : "items-start"
              )}
            >
              <div
                className={cn(
                  "p-6 rounded-[2rem] text-sm leading-relaxed shadow-2xl relative group",
                  msg.sender === "user"
                    ? "bg-white text-black font-medium rounded-tr-none"
                    : "bg-zinc-800/80 backdrop-blur-xl border border-white/5 text-zinc-100 rounded-tl-none"
                )}
              >
                 {msg.sender === "bot" && (
                    <div className="absolute -left-12 top-0">
                       <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Bot className="w-4 h-4" />
                       </div>
                    </div>
                 )}
                {msg.content}
              </div>
              <div className={cn(
                 "flex items-center gap-2 mt-2 px-2",
                 msg.sender === "user" ? "justify-end" : "justify-start"
              )}>
                <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{msg.time}</span>
                {msg.sender === "user" && (
                   <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                )}
              </div>
            </motion.div>
          ))}

          <div className="h-4" />
        </div>

        {/* Input */}
        <div className="p-8 bg-black/40 border-t border-white/5">
          <div className="relative group">
            <Input
              placeholder="Direct synthesis..."
              className="bg-zinc-900/50 border-white/5 pl-14 pr-32 h-16 rounded-[1.5rem] focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-white placeholder:text-zinc-700 font-medium"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
               <Button size="icon" variant="ghost" className="text-zinc-500 hover:text-emerald-400 hover:bg-emerald-400/5 rounded-xl h-9 w-9">
                  <Plus className="w-5 h-5" />
               </Button>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
               <div className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-lg border border-white/5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest mr-2">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  AI Assist
               </div>
               <Button size="icon" className="bg-white hover:bg-zinc-200 text-black h-11 w-11 rounded-xl shadow-xl transition-transform hover:scale-105 active:scale-95">
                  <Send className="w-5 h-5" />
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
