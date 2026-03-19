"use client";

import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { TEAM_MEMBERS } from "@/data/team";
import TeamMemberCard from "@/components/TeamMemberCard";
import TeamProfileSheet from "@/components/TeamProfileSheet";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false },
);

const HEADLINE_WORDS = ["Meet", "Our", "Team"];

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

function TeamPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isHeadlineInView = useInView(headlineRef, {
    once: true,
    margin: "-60px",
  });

  return (
    <>
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
            Meet the talented individuals who drive Sky Alliance forward. Our
            diverse team combines industry expertise, creativity, and passion to
            deliver exceptional results for our clients.
          </motion.p>
        </div>
      </section>

      <section
        className="relative bg-[#f8f4ff] py-16 sm:py-20 md:py-24"
        aria-label="Team members"
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid gap-4 md:gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TEAM_MEMBERS.map((member, i) => (
              <TeamMemberCard
                key={member.name}
                {...member}
                onSelect={() => setSelectedIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <TeamProfileSheet
            member={TEAM_MEMBERS[selectedIndex]}
            index={selectedIndex}
            total={TEAM_MEMBERS.length}
            onClose={() => setSelectedIndex(null)}
            onNavigate={(delta) => {
              setSelectedIndex((idx) => {
                if (idx === null) return null;
                const n = TEAM_MEMBERS.length;
                return (idx + delta + n) % n;
              });
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default TeamPage;
