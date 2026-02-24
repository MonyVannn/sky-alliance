"use client";

import { useEffect, useRef, Suspense } from "react";
import { animateBlurredLights, cleanupAnimations } from "@/lib/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useSplineLoading } from "@/components/SplineLoadingContext";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false },
);

const SplineWrapper = ({ scene }: { scene: string }) => {
  const splineRef = useRef<HTMLDivElement>(null);
  const { notifySplineLoaded } = useSplineLoading();

  useEffect(() => {
    const checkCanvas = setInterval(() => {
      if (splineRef.current) {
        const canvas = splineRef.current.querySelector("canvas");
        if (canvas) {
          canvas.style.background = "transparent";
          clearInterval(checkCanvas);
        }
      }
    }, 100);

    return () => clearInterval(checkCanvas);
  }, []);

  return (
    <div ref={splineRef} className="w-full h-full">
      <Spline
        scene={scene}
        className="w-full h-full"
        onLoad={notifySplineLoaded}
      />
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animateBlurredLights(containerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        cleanupAnimations(containerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated Blurred Lights Background */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-br from-white via-white to-white/95"
      >
        {/* Light 1: Purple - Top Right */}
        <div
          className="blob absolute w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[1200px] md:h-[1200px] rounded-full blur-light"
          style={{
            background:
              "radial-gradient(circle, rgba(156, 39, 176, 0.6) 0%, rgba(106, 27, 154, 0.4) 50%, transparent 70%)",
            top: "-10%",
            right: "-10%",
          }}
        />

        {/* Light 2: Orange/Gold - Middle Right (overlapping) */}
        <div
          className="blob absolute w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[1200px] md:h-[1200px] rounded-full blur-light"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 167, 38, 0.5) 0%, rgba(255, 111, 0, 0.4) 50%, transparent 70%)",
            top: "35%",
            right: "20%",
          }}
        />

        {/* Light 3: Purple/Lavender - Bottom Right (overlapping) */}
        <div
          className="blob absolute w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[1000px] md:h-[1000px] rounded-full blur-light"
          style={{
            background:
              "radial-gradient(circle, rgba(206, 147, 216, 0.5) 0%, rgba(156, 39, 176, 0.3) 50%, transparent 70%)",
            top: "50%",
            right: "-2%",
          }}
        />
      </div>

      {/* Fuzzy Overlay Effect */}
      <motion.div
        initial={{ transform: "translateX(-10%) translateY(-10%)" }}
        animate={{
          transform: "translateX(10%) translateY(10%)",
        }}
        transition={{
          repeat: Infinity,
          duration: 0.2,
          ease: "linear",
          repeatType: "mirror",
        }}
        style={{
          backgroundImage: 'url("/black-noise.png")',
        }}
        className="pointer-events-none absolute -inset-[100%] opacity-[5%]"
      />

      {/* Spline 3D Object - Right Side */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full z-[5] pointer-events-none hidden lg:block">
        <div className="relative w-full h-full">
          <Suspense fallback={null}>
            <SplineWrapper scene="https://prod.spline.design/90e2VVgs3MwvP52T/scene.splinecode" />
          </Suspense>
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-12 pt-24 md:pt-32 pb-20 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm font-medium mb-4 tracking-wide uppercase bg-white/30 backdrop-blur-md w-fit p-2 shadow-sm"
          >
            Business Consulting and Services
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            <span className="block">Beyond the sky.</span>
            <span className="block mt-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic">
              Transform for growth.
            </span>
          </motion.h1>

          {/* Body Copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed mb-8 max-w-xl"
          >
            Your journey to success starts here. We help ambitious businesses
            realize their competitive advantage, embed it deeply into their
            operations, and transform it into genuine momentum.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link href="/contact" className="inline-block">
              <button className="group flex h-10 items-center gap-2 rounded-full bg-neutral-200 cursor-pointer pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700">
                <span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-white">
                  <FiArrowRight className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45" />
                </span>
                <span>Discover how</span>
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
