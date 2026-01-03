"use client";

import { use, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Clock,
  Zap,
  ShieldAlert,
  Target,
  Loader2,
  MessageSquare,
  Search,
  Filter,
  Send,
  Check,
  CheckCheck,
  MoreVertical,
  ChevronLeft,
  TrendingUp,
  FileText
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CustomersService } from "@/lib/api/services/CustomersService";
import { ConversationsService } from "@/lib/api/services/ConversationsService";
import type { Customer } from "@/lib/api/models/Customer";
import type { Message } from "@/lib/api/models/Message";
import type { Conversation } from "@/lib/api/models/Conversation";
import { useIsMobile } from "@/hooks/use-mobile";

const getStageColor = (stage?: string) => {
  switch (stage?.toLowerCase()) {
    case "lead": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "prospect": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "customer": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    default: return "bg-zinc-800 text-zinc-400 border-white/5";
  }
};

export default function CustomerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isMobile = useIsMobile();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showMobileMessages, setShowMobileMessages] = useState(false);

  // Fetch Customer Details
  const { data: customerData, isLoading: isCustomerLoading } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => CustomersService.getApiV1Customers1(id),
  });

  // Fetch Conversations
  const { data: conversationsData, isLoading: isConversationsLoading } = useQuery({
    queryKey: ["customer-conversations", id],
    queryFn: () => CustomersService.getApiV1CustomersConversations(id),
  });

  const customer = customerData?.data;
  const conversations = conversationsData?.data?.items || [];

  // Set first conversation as active by default on desktop
  useEffect(() => {
    if (conversations.length > 0 && !activeConversationId && !isMobile) {
      const firstConvId = (conversations[0] as any)._id || conversations[0].id;
      setActiveConversationId(firstConvId);
    }
  }, [conversations, activeConversationId, isMobile]);

  // Fetch Messages for active conversation
  const { data: messagesData, isLoading: isMessagesLoading } = useQuery({
    queryKey: ["conversation-messages", activeConversationId],
    queryFn: () => ConversationsService.getApiV1ConversationsMessages(activeConversationId!),
    enabled: !!activeConversationId,
  });

  const messages = messagesData?.data?.items || [];

  const handleSelectConversation = (convId: string) => {
    setActiveConversationId(convId);
    if (isMobile) {
      setShowMobileMessages(true);
    }
  };

  if (isCustomerLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
        <p className="text-zinc-500 font-light uppercase tracking-widest text-xs">Accessing Neural Signature...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-6 opacity-50" />
        <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Signature Not Found</h2>
        <p className="text-zinc-500 max-w-sm mb-8 text-sm">
          The requested node does not exist in the neural registry or access has been restricted.
        </p>
        <Link href="/customers">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-zinc-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Registry
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8 pb-12 px-4 lg:px-0">
      {/* Header / Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/customers">
            <Button variant="outline" size="icon" className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl border-white/5 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="min-w-0">
            <div className="flex items-center gap-2 lg:gap-3 mb-1 min-w-0">
              <h1 className="text-xl lg:text-3xl font-bold tracking-tight text-white uppercase truncate">
                {customer.name || customer.whatsappNumber}
              </h1>
              <Badge variant="outline" className={cn("px-2 py-0 lg:px-3 lg:py-0.5 capitalize text-[9px] lg:text-[10px] font-bold border rounded-full whitespace-nowrap", getStageColor((customer as any).lifecycleStage))}>
                {(customer as any).lifecycleStage || "lead"}
              </Badge>
            </div>
            <p className="text-zinc-500 font-light text-xs lg:text-sm italic truncate">{customer.whatsappNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-3">
          <Button variant="outline" className="h-10 lg:h-11 border-white/5 bg-zinc-900/50 text-zinc-400 hover:text-white transition-all gap-2 px-4 lg:px-5 rounded-xl text-xs lg:text-sm flex-1 lg:flex-none">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Optimize Node</span>
            <span className="sm:hidden">Optimize</span>
          </Button>
          <Button className="h-10 lg:h-11 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 lg:px-6 rounded-xl shadow-lg shadow-emerald-500/20 text-xs lg:text-sm flex-1 lg:flex-none">
            <span className="hidden sm:inline">Integrate Channel</span>
            <span className="sm:hidden">Integrate</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column: Profile & Stats (Hidden on mobile chat view if desired, or pushed down) */}
        <div className={cn(
          "col-span-12 lg:col-span-4 space-y-6 lg:space-y-8",
          isMobile && showMobileMessages ? "hidden" : "block"
        )}>
          {/* Node Profile Card */}
          <Card className="bg-zinc-900/40 border-white/5 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
            <CardHeader className="p-6 lg:p-8 pb-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 lg:h-32 lg:w-32 border-2 border-white/5 shadow-inner">
                    <AvatarFallback className="bg-zinc-800 text-emerald-400 text-3xl lg:text-4xl font-bold uppercase">
                      {(customer.name || customer.whatsappNumber)[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-emerald-500 border-4 border-zinc-900" />
                </div>
              </div>
              <CardTitle className="text-center text-lg lg:text-xl font-bold text-white uppercase tracking-wider">Node Intelligence</CardTitle>
              <CardDescription className="text-center text-xs lg:text-sm text-zinc-500">Telemetry synchronization across all matrices.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 lg:p-8 pt-0 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    </div>
                    <span className="text-[10px] lg:text-xs font-medium text-zinc-500 uppercase tracking-tighter">Email Matrix</span>
                  </div>
                  <span className="text-xs lg:text-sm font-bold text-white lowercase truncate max-w-[120px] lg:max-w-none">{customer.email || "NO_SYNC"}</span>
                </div>
                <div className="flex items-center justify-between p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    </div>
                    <span className="text-[10px] lg:text-xs font-medium text-zinc-500 uppercase tracking-tighter">Last Pulse</span>
                  </div>
                  <span className="text-xs lg:text-sm font-bold text-white whitespace-nowrap">
                    {customer.updatedAt ? formatDistanceToNow(new Date(customer.updatedAt)) + " ago" : "NEVER"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[9px] lg:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Prospect Score</span>
                  <span className="text-xs font-bold text-emerald-400">{Math.round(((customer as any).prospectScore || 0) * 100)}%</span>
                </div>
                <div className="h-1.5 lg:h-2 w-full bg-black rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round(((customer as any).prospectScore || 0) * 100)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>

              <div>
                <span className="text-[9px] lg:text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 block px-1">Classifications</span>
                <div className="flex flex-wrap gap-2">
                  {customer.tags?.map(tag => (
                    <div key={tag} className="px-2 py-0.5 lg:px-3 lg:py-1 bg-zinc-800/50 border border-white/5 text-zinc-400 font-bold uppercase tracking-[0.1em] text-[8px] lg:text-[9px] rounded-lg">
                      {tag}
                    </div>
                  )) || <span className="text-[10px] text-zinc-700 italic">No tags detected</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Follow-Up Intelligence */}
          <Card className="bg-zinc-900/40 border-white/5 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden backdrop-blur-3xl">
            <CardHeader className="p-6 lg:p-8 pb-4">
              <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-500" />
                Follow-Up Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 lg:p-8 pt-0 space-y-4">
              <div className="flex items-center justify-between p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                    <MessageSquare className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  </div>
                  <span className="text-[10px] lg:text-xs font-medium text-zinc-500 uppercase tracking-tighter">Follow-Ups Sent</span>
                </div>
                <span className="text-xs lg:text-sm font-bold text-white">{(customer as any).followUpSentCount || 0}</span>
              </div>
              {(customer as any).followUpNotes && (
                <div className="p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-black/20 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-3 h-3 text-zinc-600" />
                    <p className="text-[9px] lg:text-[10px] font-bold text-zinc-600 uppercase">Notes</p>
                  </div>
                  <p className="text-[10px] lg:text-xs text-zinc-400 leading-relaxed">{(customer as any).followUpNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Metadata */}
          {customer.metadata && Object.keys(customer.metadata).length > 0 && (
            <Card className="bg-zinc-900/40 border-white/5 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden backdrop-blur-3xl">
              <CardHeader className="p-6 lg:p-8 pb-4">
                <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-amber-500" />
                  Extended Protocols
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 lg:p-8 pt-0">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  {Object.entries(customer.metadata).map(([key, value]) => (
                    <div key={key} className="p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-black/20 border border-white/5 overflow-hidden">
                      <p className="text-[9px] lg:text-[10px] font-bold text-zinc-600 uppercase mb-1 truncate">{key}</p>
                      <p className="text-xs lg:text-sm font-bold text-white truncate">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        </div>

        {/* Right Column: Conversations & Messages */}
        <div className={cn(
          "col-span-12 lg:col-span-8 h-[calc(100vh-14rem)] lg:h-[calc(100vh-12rem)] min-h-[500px] lg:min-h-[700px]",
          isMobile && !showMobileMessages && activeConversationId ? "block" : "block"
        )}>
          <div className="flex h-full w-full bg-zinc-900/40 border border-white/5 rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl relative">

            {/* Conversations Sidebar (Visible on desktop + mobile list view) */}
            <div className={cn(
              "w-full lg:w-80 border-right lg:border-r border-white/5 bg-black/20 flex flex-col transition-all",
              isMobile && showMobileMessages ? "hidden" : "flex"
            )}>
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Synchronies</h3>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-none text-[10px] px-2">{conversations.length}</Badge>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                  <Input
                    placeholder="Search logs..."
                    className="h-9 bg-black/40 border-white/5 pl-9 text-xs rounded-lg text-white placeholder:text-zinc-700 focus:border-emerald-500/30 transition-all"
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {isConversationsLoading ? (
                     <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <Loader2 className="w-5 h-5 text-zinc-700 animate-spin" />
                        <span className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">Scanning...</span>
                     </div>
                  ) : conversations.length === 0 ? (
                    <div className="p-8 text-center">
                      <MessageSquare className="w-10 h-10 text-zinc-800 mx-auto mb-3 opacity-30" />
                      <p className="text-xs text-zinc-600 font-bold uppercase tracking-tighter">Zero Interactions</p>
                    </div>
                  ) : (
                    conversations.map((conv: Conversation) => {
                      const convId = (conv as any)._id || conv.id;
                      return (
                        <button
                          key={convId}
                          onClick={() => handleSelectConversation(convId)}
                          className={cn(
                            "w-full text-left p-4 rounded-xl lg:rounded-2xl transition-all group relative overflow-hidden",
                            activeConversationId === convId
                              ? "bg-emerald-500/10 border border-emerald-500/20"
                              : "hover:bg-white/[0.03] border border-transparent"
                          )}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className={cn(
                              "text-xs font-bold uppercase tracking-tight",
                              activeConversationId === convId ? "text-emerald-400" : "text-zinc-400 group-hover:text-white"
                            )}>
                              ID: {convId.slice(-6)}
                            </span>
                            <span className="text-[9px] text-zinc-600 font-bold">
                              {conv.lastMessageAt ? format(new Date(conv.lastMessageAt), "H:mm") : ""}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 truncate leading-relaxed">
                            {conv.status || "IDLE"} PROTOCOL
                          </p>
                          {activeConversationId === convId && (
                            <motion.div
                              layoutId="active-indicator"
                              className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"
                            />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Messages View (Visible on desktop + mobile chat view) */}
            <div className={cn(
              "flex-1 flex flex-col bg-black/10 transition-all",
              isMobile && !showMobileMessages ? "hidden" : "flex"
            )}>
              {activeConversationId ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 lg:p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-3 lg:min-w-0">
                       {isMobile && (
                         <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => setShowMobileMessages(false)}
                           className="h-9 w-9 text-zinc-400 -ml-2"
                         >
                           <ChevronLeft className="w-5 h-5" />
                         </Button>
                       )}
                       <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-zinc-800 flex items-center justify-center border border-white/5 shadow-inner flex-shrink-0">
                          <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" />
                       </div>
                       <div className="min-w-0">
                          <p className="text-[10px] lg:text-xs font-bold text-white uppercase tracking-widest truncate">Neural Link Active</p>
                          <div className="flex items-center gap-1.5 lg:gap-2">
                             <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-[8px] lg:text-[9px] text-emerald-500 font-bold uppercase tracking-widest whitespace-nowrap">Secure Synchrony</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-1 lg:gap-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-9 lg:w-9 text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                          <Filter className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 lg:h-9 lg:w-9 text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                          <MoreVertical className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                       </Button>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <ScrollArea className="flex-1 p-4 lg:p-8">
                    <div className="space-y-4 lg:space-y-6 max-w-2xl mx-auto">
                      {isMessagesLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                           <Loader2 className="w-8 h-8 text-emerald-500 animate-spin opacity-50" />
                           <span className="text-[10px] text-zinc-700 uppercase tracking-[0.3em] font-bold">Unpacking Packets...</span>
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="text-center py-24">
                           <Zap className="w-10 h-10 lg:w-12 lg:h-12 text-zinc-800 mx-auto mb-4 opacity-20" />
                           <p className="text-[10px] lg:text-sm text-zinc-600 font-bold uppercase tracking-widest">No Packets Detected</p>
                        </div>
                      ) : (
                        messages.map((msg: Message, i) => {
                          const isIncoming = msg.direction === 'INBOUND';
                          return (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              key={msg.id}
                              className={cn(
                                "flex flex-col max-w-[85%] sm:max-w-[80%]",
                                isIncoming ? "mr-auto items-start" : "ml-auto items-end"
                              )}
                            >
                              <div className={cn(
                                "p-3 lg:p-4 rounded-xl lg:rounded-2xl relative group transition-all duration-300",
                                isIncoming
                                  ? "bg-zinc-800/80 text-zinc-100 border border-white/5 rounded-tl-none shadow-xl"
                                  : "bg-emerald-500/90 text-black font-medium rounded-tr-none shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                              )}>
                                <p className="text-[12px] lg:text-[13px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                <div className={cn(
                                  "mt-1 flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity",
                                  isIncoming ? "text-zinc-500" : "text-black/60"
                                )}>
                                  <span className="text-[8px] lg:text-[9px] font-bold uppercase">
                                    {msg.createdAt ? format(new Date(msg.createdAt), "HH:mm") : ""}
                                  </span>
                                  {!isIncoming && (
                                    <div className="flex">
                                      {msg.status === 'READ' ? <CheckCheck className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className="mt-1.5 text-[8px] lg:text-[9px] font-bold text-zinc-700 uppercase tracking-widest px-1">
                                {isIncoming ? "Neural Inbound" : "Neural Outbound"}
                              </span>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </ScrollArea>

                  {/* Chat Input Placeholder */}
                  <div className="p-4 lg:p-8 border-t border-white/5 bg-black/20">
                    <div className="relative max-w-2xl mx-auto">
                      <Input
                        disabled
                        placeholder={isMobile ? "Encryption locked." : "Communication terminal offline."}
                        className="h-12 lg:h-14 bg-black/60 border-white/5 pl-4 lg:pl-6 pr-14 lg:pr-16 rounded-xl lg:rounded-2xl text-[11px] lg:text-xs text-zinc-500 font-medium placeholder:text-zinc-800"
                      />
                      <Button
                        disabled
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 lg:h-10 lg:w-10 p-0 rounded-lg lg:rounded-xl bg-zinc-800 text-zinc-600 border border-white/10"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-20 text-center opacity-40">
                  <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-6 lg:mb-8">
                     <MessageSquare className="w-8 h-8 lg:w-10 lg:h-10 text-zinc-700" />
                  </div>
                  <h4 className="text-lg lg:text-xl font-bold text-white uppercase tracking-[0.2rem] mb-2 lg:mb-4">Awaiting Signal</h4>
                  <p className="text-xs lg:text-sm text-zinc-500 max-w-xs leading-relaxed">
                    Select a neural synchrony from the left matrix to initialize packet decryption and full protocol telemetry.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


  );
}
