"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100]"
        >
          <div className="bg-card border border-border shadow-2xl rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 bg-primary h-full" />

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-lg text-primary shrink-0">
                <Cookie className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">Cookie Settings</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    We use cookies to improve your experience and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Button
                    onClick={handleAccept}
                    className="w-full sm:w-auto rounded-full px-6 font-semibold"
                  >
                    Accept All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDecline}
                    className="w-full sm:w-auto rounded-full px-6"
                  >
                    Reject Optional
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  View our <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link> for more details.
                </p>
              </div>

              <button
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
