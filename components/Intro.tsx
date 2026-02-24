"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

function RevealWord({
  word,
  index,
  totalWords,
  scrollYProgress,
}: {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
}) {
  const revealWindow = 0.4;
  const wordDuration = 0.06;
  const start = (index / totalWords) * revealWindow + 0.13;
  const end = start + wordDuration;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.span
      style={{ opacity, marginRight: "0.25em" }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
}

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headline =
    "Most people talk about reaching the top. We're actually building the path to get you there.";
  const words = headline.split(" ");

  // Body: simple block reveal (staggered after headline)
  const bodyOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-44 px-4 sm:px-6 md:px-12"
      style={{ backgroundColor: "#fefefe" }}
    >
      <div className="container mx-auto text-center">
        {/* Main heading with word-by-word scroll reveal */}
        <div className="relative mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#222222] leading-tight">
            {words.map((word, i) => (
              <RevealWord
                key={i}
                word={word}
                index={i}
                totalWords={words.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </h2>
        </div>

        {/* Body paragraph with block reveal */}
        <motion.p
          style={{ opacity: bodyOpacity }}
          className="text-base sm:text-2xl text-[#222222] leading-relaxed mb-6 max-w-2xl mx-auto"
        >
          At Sky Alliance, we bridge the gap between where you are and where you
          want to be. We provide the mentorship, the rigorous training, and the
          industry connections you need to go from applicant to top-tier hire.
        </motion.p>
      </div>
    </section>
  );
}
