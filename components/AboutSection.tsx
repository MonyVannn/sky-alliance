"use client";

import { useRef, useEffect, Suspense } from "react";
import React from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

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

const SECTION = {
  headline: "Sky-high standard.",
  description:
    "These six principles aren't just words on a wall — they're the standard we hold ourselves to every single day, in every campaign, every conversation, and every decision we make.",
};

const IMAGES = [
  {
    id: "entrepreneurial-spirit",
    image: "/DSC00970.jpg",
    headline: "Entrepreneurial Spirit",
    description:
      "Freedom is the goal, but only after discipline and responsibility. We think like owners, act with urgency, and treat every opportunity as our own.",
  },
  {
    id: "solution-oriented",
    image: "/DSC01818.jpg",
    headline: "Solution Oriented",
    description:
      "Every problem has a solution and resources to solve it. We don't dwell on obstacles — we move through them with creativity and resolve.",
  },
  {
    id: "everything-communicates",
    image: "/DSC01060.jpg",
    headline: "Everything Communicates",
    description:
      "Clear, honest, and timely communication is fundamental. How we show up, what we say, and how we say it all send a message — we make sure it's the right one.",
  },
  {
    id: "invest-in-yourself",
    image: "/DSC02299.jpg",
    headline: "Invest in Yourself",
    description:
      "Being passionate about personal growth and development is non-negotiable. The more we invest in ourselves, the more value we bring to our clients and our team.",
  },
  {
    id: "law-of-the-lid",
    image: "/DSC01844.jpg",
    headline: "Law of the Lid",
    description:
      "No limiting beliefs. If someone can do it, anyone can do it. We refuse to place a ceiling on what's possible for ourselves or the people around us.",
  },
  {
    id: "mental-maturity",
    image: "/DSC02287.jpg",
    headline: "Mental Maturity",
    description:
      "Be emotional with your feelings but logical with your decisions. We lead with composure, respond with intention, and never let impulse outrun judgment.",
  },
];

function ImageCard({ item }: { item: (typeof IMAGES)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const cardEl = cardRef.current;
      const imgEl = imgRef.current;
      if (!cardEl || !imgEl) return;

      const ctx = gsap.context(() => {
        cardEl.addEventListener("mouseenter", () => {
          gsap.to(imgEl, { scale: 1.06, duration: 0.7, ease: "power2.out" });
        });
        cardEl.addEventListener("mouseleave", () => {
          gsap.to(imgEl, { scale: 1, duration: 0.6, ease: "power2.out" });
        });
      }, cardRef);

      return () => ctx.revert();
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden bg-[#171717] cursor-default flex flex-col h-full"
    >
      <div
        className="relative w-full overflow-hidden flex-shrink-0"
        style={{ height: "clamp(220px, 26vw, 400px)" }}
      >
        <img
          ref={imgRef}
          src={item.image}
          alt={item.headline}
          className="w-full h-full object-cover will-change-transform"
          style={{ objectPosition: "center 25%" }}
        />
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6 flex-1">
        <h3
          className="text-base sm:text-lg font-bold text-[#fafafa] tracking-tight mb-2"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          {item.headline}
        </h3>
        <p className="text-sm text-[#838383] leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isHeadlineInView = useInView(headlineRef, {
    once: true,
    margin: "-60px",
  });

  return (
    <section
      id="about"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: "#fefefe" }}
    >
      {/* Spline 3D background */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <SplineBackground />
        </Suspense>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12">
        {/* Header block */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 mb-16 md:mb-20">
          <motion.h2
            ref={headlineRef}
            className="flex-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-bold text-[#fafafa] leading-[0.95] tracking-tight uppercase"
            style={{ fontFamily: "var(--font-archivo-black), sans-serif" }}
            initial="hidden"
            animate={isHeadlineInView ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.06 }}
            variants={{}}
          >
            {SECTION.headline.split(" ").map((word, i, arr) => (
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
          </motion.h2>

          <motion.p
            className="lg:max-w-xs xl:max-w-sm text-sm sm:text-base text-[#fafafa]/65 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.65,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {SECTION.description.split(" ").map((word, i, arr) => (
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
          </motion.p>
        </div>

        {/* 3x2 grid: rows alternate 60/40 — 40/60 — 60/40 */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 md:gap-5">
          <div className="sm:col-span-3 h-full">
            <ImageCard item={IMAGES[0]} />
          </div>
          <div className="sm:col-span-2 h-full">
            <ImageCard item={IMAGES[1]} />
          </div>
          <div className="sm:col-span-2 h-full">
            <ImageCard item={IMAGES[2]} />
          </div>
          <div className="sm:col-span-3 h-full">
            <ImageCard item={IMAGES[3]} />
          </div>
          <div className="sm:col-span-3 h-full">
            <ImageCard item={IMAGES[4]} />
          </div>
          <div className="sm:col-span-2 h-full">
            <ImageCard item={IMAGES[5]} />
          </div>
        </div>
      </div>
    </section>
  );
}
