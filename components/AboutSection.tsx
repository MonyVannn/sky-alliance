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
  headline: "Sky-high standards.",
  description:
    "Sky Alliance is a Dallas-based B2B sales firm built on one core belief: growth happens when people connect. Through personalized, face-to-face representation, we help industry-leading brands grow their customer base while shaping ambitious professionals into the leaders of tomorrow.",
};

const IMAGES = [
  {
    id: "integrity",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=700&fit=crop",
    headline: "Integrity",
    description:
      "We lead with honesty, transparency, and accountability. Whether we're representing a client or developing a team member, trust is the foundation of every decision we make.",
  },
  {
    id: "growth",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=700&fit=crop",
    headline: "Growth",
    description:
      "We believe leadership is learned through action. From day one, we empower our team to take initiative, develop their skills, and step confidently into roles that challenge and elevate them.",
  },
  {
    id: "performance",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=700&fit=crop",
    headline: "Performance",
    description:
      "Results matter. We focus on measurable outcomes and sustainable gains that compound over time.",
  },
  {
    id: "collaboration",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=700&fit=crop",
    headline: "Collaboration",
    description:
      "Teamwork fuels our momentum. By supporting each other, sharing knowledge, and aligning our strengths, we create an environment where people and brands thrive together.",
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
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ backgroundColor: "#fcfaf0" }}
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

        {/* 2x2 grid: row1 = 60/40, row2 = 40/60 */}
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
        </div>
      </div>
    </section>
  );
}
