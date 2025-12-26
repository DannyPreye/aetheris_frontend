"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User as UserIcon, Settings, LogOut, Command } from "lucide-react";
import { signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";

export function TopBar() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex items-center gap-6 flex-1">
        <SidebarTrigger className="text-zinc-400 hover:text-white transition-colors" />

        <div className="relative w-full max-w-md hidden lg:block">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
           <Input
             placeholder="Search across the cluster..."
             className="w-full bg-zinc-900/50 border-white/5 pl-11 h-11 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/10 transition-all text-sm text-white placeholder:text-zinc-600"
           />
           <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-zinc-800 px-1.5 py-0.5 rounded border border-white/5 pointer-events-none">
              <Command className="w-2.5 h-2.5 text-zinc-400" />
              <span className="text-[10px] text-zinc-400 font-bold uppercase">K</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/5 relative h-10 w-10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-black" />
           </Button>
           <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/5 h-10 w-10">
              <Settings className="w-5 h-5" />
           </Button>
        </div>

        <div className="h-8 w-px bg-white/5" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-11 px-2 hover:bg-white/5 rounded-xl transition-all group">
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-white leading-none">{userName}</p>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest font-bold">Admin</p>
                 </div>
                 <Avatar className="h-9 w-9 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                    <AvatarImage src={session?.user?.image || ""} alt={userName} />
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase">
                      {userInitial}
                    </AvatarFallback>
                 </Avatar>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 mt-2 bg-zinc-900 border-white/10 shadow-2xl rounded-2xl p-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-bold leading-none text-white">{userName}</p>
                <p className="text-xs leading-none text-zinc-500 italic">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <div className="p-1">
               <DropdownMenuItem className="h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-colors cursor-pointer gap-3">
                 <UserIcon className="h-4 w-4" />
                 <span className="font-medium">Profile Configuration</span>
               </DropdownMenuItem>
               <DropdownMenuItem className="h-10 rounded-lg focus:bg-emerald-500/10 focus:text-emerald-400 transition-colors cursor-pointer gap-3">
                 <Settings className="h-4 w-4" />
                 <span className="font-medium">Neural Settings</span>
               </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-white/5" />
            <div className="p-1">
               <DropdownMenuItem
                 className="h-10 rounded-lg text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 transition-colors cursor-pointer gap-3"
                 onSelect={() => signOut()}
               >
                 <LogOut className="h-4 w-4" />
                 <span className="font-bold">Terminate Session</span>
               </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
