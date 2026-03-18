"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSplineLoading } from "@/components/SplineLoadingContext";

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);
  const targetProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const { splineLoaded } = useSplineLoading();

  // RAF loop: smoothly animate display toward target
  useEffect(() => {
    const animate = () => {
      setDisplayProgress((prev) => {
        const diff = targetProgressRef.current - prev;
        if (Math.abs(diff) < 0.5) return targetProgressRef.current;
        return prev + diff * 0.07;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Font loading → 40%
  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsReady(true);
      targetProgressRef.current = Math.max(targetProgressRef.current, 40);
    });
  }, []);

  // Spline loaded → 100%
  useEffect(() => {
    if (splineLoaded) {
      targetProgressRef.current = 100;
    }
  }, [splineLoaded]);

  // Fallback: fonts ready but Spline never fires (mobile/hidden) → complete after timeout
  useEffect(() => {
    if (!fontsReady) return;
    const fallback = setTimeout(() => {
      targetProgressRef.current = 100;
    }, 4000);
    return () => clearTimeout(fallback);
  }, [fontsReady]);

  // Once display reaches 100%, wait a beat then dismiss
  useEffect(() => {
    if (!isLoading) return;
    if (displayProgress >= 99.5) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [displayProgress, isLoading]);

  // Lock scroll while loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const rounded = Math.min(100, Math.round(displayProgress));

  // "SKY ALLIANCE" has 11 characters (including space)
  const text = "SKY ALLIANCE";
  const visibleCharIndex = Math.floor((rounded / 100) * text.length);
  const visibleText = text.substring(0, visibleCharIndex);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[9999] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1a0533 0%, #4a148c 40%, #6a1b9a 65%, #3d1000 100%)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Fuzzy noise overlay */}
            <motion.div
              initial={{ transform: "translateX(-10%) translateY(-10%)" }}
              animate={{ transform: "translateX(10%) translateY(10%)" }}
              transition={{
                repeat: Infinity,
                duration: 0.2,
                ease: "linear",
                repeatType: "mirror",
              }}
              style={{ backgroundImage: 'url("/black-noise.png")' }}
              className="pointer-events-none absolute -inset-[100%] opacity-[8%]"
            />

            {/* White vertical bar — left edge, fills upward */}
            <motion.div
              className="absolute left-0 bottom-0 w-[14px]"
              style={{ background: "white" }}
              animate={{ height: `${rounded}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />

            {/* SKY ALLIANCE text — bottom left */}
            <div
              className="absolute bottom-10 left-14 select-none"
              style={{ fontFamily: "var(--font-archivo-black), sans-serif" }}
            >
              <div className="relative inline-block leading-none">
                <span
                  style={{
                    fontSize: "clamp(3rem, 15vw, 14rem)",
                    color: "white",
                    lineHeight: 1.1,
                    display: "block",
                    minHeight: "1em",
                  }}
                >
                  {visibleText}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
