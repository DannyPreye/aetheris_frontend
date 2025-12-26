"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageSquare, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Solutions", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Company", href: "/about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-4"
          : "py-8"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn(
          "flex items-center justify-between transition-all duration-500 px-6 py-3 rounded-full border border-white/10",
          scrolled ? "bg-black/60 backdrop-blur-2xl shadow-2xl" : "bg-transparent"
        )}>
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden group-hover:rotate-6 transition-transform duration-500">
              <img src="/logo.png" alt="Aetheris Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-black tracking-[0.1em] text-white">
              AETHERIS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-all hover:text-emerald-400",
                  pathname === link.href
                    ? "text-emerald-400"
                    : "text-zinc-400"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/login">
              <span className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center">
                <Lock className="w-3.5 h-3.5 mr-2" />
                Partner Login
              </span>
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-black rounded-full px-6 font-bold transition-all hover:scale-105">
                Join Network
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 md:hidden bg-zinc-900 border border-white/10 p-8 rounded-[2rem] shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-2xl font-bold transition-colors",
                    pathname === link.href
                      ? "text-emerald-400"
                      : "text-zinc-100"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 w-full" />
              <div className="flex flex-col space-y-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-zinc-400 text-lg">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black rounded-full h-14 text-lg font-bold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
