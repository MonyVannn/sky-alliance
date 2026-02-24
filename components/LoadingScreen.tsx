"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasPlayed =
    typeof window !== "undefined" &&
    sessionStorage.getItem("sky-loaded") === "true";

  const [isLoading, setIsLoading] = useState(!hasPlayed);
  const [fontsReady, setFontsReady] = useState(hasPlayed);

  useEffect(() => {
    if (hasPlayed) return;
    document.fonts.ready.then(() => setFontsReady(true));
  }, [hasPlayed]);

  useEffect(() => {
    if (!fontsReady) return;

    const minDisplayTime = setTimeout(() => {
      sessionStorage.setItem("sky-loaded", "true");
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(minDisplayTime);
  }, [fontsReady]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const companyName = "Sky Alliance Inc.";
  const letters = companyName.split("");

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0118]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(106, 27, 154, 0.15) 0%, transparent 70%)",
                  top: "30%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-[400px] h-[400px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 167, 38, 0.08) 0%, transparent 70%)",
                  top: "55%",
                  left: "55%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </div>

            {/* Main text */}
            <div className="relative flex overflow-hidden">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="loading-letter text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                  style={{
                    display: "inline-block",
                    whiteSpace: "pre",
                  }}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.04,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Expanding line */}
            <motion.div
              className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-purple-lavender/60 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "180px", opacity: 1 }}
              transition={{
                duration: 1,
                delay: 1,
                ease: [0.33, 1, 0.68, 1],
              }}
            />

            {/* Tagline */}
            <motion.p
              className="mt-4 text-sm tracking-[0.3em] uppercase text-white/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            >
              Beyond the sky
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
