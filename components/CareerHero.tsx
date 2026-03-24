"use client";

import { motion, useInView } from "framer-motion";
import { useRef, Suspense, useEffect } from "react";
import React from "react";
import dynamic from "next/dynamic";

const HEADLINE_WORDS = ["We're", "hiring!"];

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false },
);

function SplineBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkCanvas = setInterval(() => {
      if (wrapperRef.current) {
        const canvas = wrapperRef.current.querySelector("canvas");
        if (canvas) {
          canvas.style.background = "transparent";
          clearInterval(checkCanvas);
        }
      }
    }, 100);
    return () => clearInterval(checkCanvas);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <Spline
        scene="https://prod.spline.design/jjMMrwS3BGTZVcSx/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}

export default function CareerHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isHeadlineInView = useInView(headlineRef, {
    once: true,
    margin: "-60px",
  });

  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ backgroundColor: "#fefefe", minHeight: "62vh" }}
    >
      {/* Spline 3D background */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <SplineBackground />
        </Suspense>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 pb-20 pt-40 mix-blend-difference">
        <motion.h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold text-[#fafafa] leading-[0.95] tracking-tight uppercase"
          style={{ fontFamily: "var(--font-archivo-black), sans-serif" }}
          initial="hidden"
          animate={isHeadlineInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {HEADLINE_WORDS.map((word, i, arr) => (
            <React.Fragment key={i}>
              <motion.span
                className="inline-block"
                variants={{
                  hidden: {
                    filter: "blur(10px)",
                    translateY: "20%",
                    opacity: 0,
                  },
                  visible: {
                    filter: "blur(0px)",
                    translateY: "0%",
                    opacity: 1,
                  },
                }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {word}
              </motion.span>
              {i < arr.length - 1 && " "}
            </React.Fragment>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md text-sm sm:text-base text-[#fafafa]/60 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={isHeadlineInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Discover exciting career opportunities and become part of a
          forward-thinking team. We're always looking for passionate individuals
          ready to make an impact.
        </motion.p>
      </div>
    </section>
  );
}
