import Link from "next/link";
import { MessageSquare, Twitter, Github, Linkedin, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 md:px-6 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-8">
          <div className="lg:col-span-2 flex flex-col space-y-8">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Aetheris Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-black tracking-[0.1em] text-white">
                AETHERIS
              </span>
            </Link>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-sm font-light">
              Designing the next generation of conversational intelligence for the world's most innovative enterprises.
            </p>
            <div className="flex items-center space-x-5">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Platform</h3>
            <ul className="space-y-4">
              {["Intelligence", "Automation", "Analytics", "Security"].map((item) => (
                <li key={item}>
                  <Link href="/features" className="text-zinc-400 hover:text-emerald-400 text-base transition-colors font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Company</h3>
            <ul className="space-y-4">
              {["Our Vision", "Pricing", "Enterprise", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={item === "Our Vision" ? "/about" : `/${item.toLowerCase()}`} className="text-zinc-400 hover:text-emerald-400 text-base transition-colors font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Support</h3>
            <ul className="space-y-4">
              {["Documentation", "API Status", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <Link href={["Privacy", "Terms"].includes(item) ? `/${item.toLowerCase()}` : "#"} className="text-zinc-400 hover:text-emerald-400 text-base transition-colors font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-zinc-500 font-light">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© {new Date().getFullYear()} Aetheris Intelligence. All rights reserved.</p>
            <Link href="mailto:hq@aetheris.ai" className="flex items-center hover:text-white transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              hq@aetheris.ai
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-emerald-400/80">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
