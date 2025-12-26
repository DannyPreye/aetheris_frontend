"use client";

import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-xl">
      <div className="relative flex flex-col items-center gap-8">
        {/* Powerful background glow animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-64 w-64 rounded-full bg-primary/20 blur-[80px]"
        />

        {/* Animated Logo/Spinner */}
        <div className="relative">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="h-32 w-32 rounded-full border-t-2 border-r-2 border-primary/30"
          />
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-primary/50"
          />
          <motion.div
            animate={{
              scale: [0.9, 1.1, 0.9],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-4 w-4 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </motion.div>
        </div>

        {/* Text Animation */}
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl font-medium tracking-tight text-foreground/90 uppercase"
          >
            Aetheris
          </motion.h2>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="h-1 w-1 rounded-full bg-primary"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
