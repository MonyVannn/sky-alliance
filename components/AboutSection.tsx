"use client";

import { useRef } from "react";
import React from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
      style={{ backgroundColor: "#0d0d0d" }}
    >
      {/* Ribbon background — single CSS blur pass on the GPU layer */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          filter: "blur(32px)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ribbon 1: Purple — S-curve across upper half */}
          <path
            d="M -160 180 C 180 -80, 560 480, 920 220 S 1380 -40, 1600 160"
            stroke="rgba(180,60,210,0.75)"
            strokeWidth="180"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ribbon 2: Orange — wide arc through the middle */}
          <path
            d="M -160 500 C 220 650, 580 260, 960 520 S 1340 780, 1600 560"
            stroke="rgba(255,140,20,0.72)"
            strokeWidth="195"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ribbon 3: Deep violet — bottom-left up through center */}
          <path
            d="M -160 820 C 240 560, 660 880, 1020 620 S 1380 360, 1600 480"
            stroke="rgba(120,15,210,0.7)"
            strokeWidth="115"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ribbon 4: Amber — top-right down to bottom-left */}
          <path
            d="M 1600 100 C 1280 380, 880 80, 580 340 S 120 620, -160 440"
            stroke="rgba(255,165,25,0.68)"
            strokeWidth="100"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ribbon 5: Lavender — floats across lower third */}
          <path
            d="M -160 680 C 300 500, 700 760, 1060 560 S 1420 700, 1600 780"
            stroke="rgba(205,135,235,0.65)"
            strokeWidth="98"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
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
