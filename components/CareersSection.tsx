"use client";

import { useState, useRef, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiChevronDown,
  FiChevronUp,
  FiFileText,
  FiPhone,
  FiVideo,
  FiUserCheck,
  FiArrowRight,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";

// ─── Careers copy ────────────────────────────────────────────────────────────

const LEFT_COPY = {
  label: "Join Us",
  headline: "Build your future with Sky Alliance",
  paragraphs: [
    "If you're driven, ambitious, and ready to push past your limits, Sky Alliance is where your next level begins. We offer hands-on training, leadership development, and advancement opportunities designed to transform potential into career-long success.",
    "Here, you'll learn through action — developing real-world skills in communication, business leadership, and team management. We invest in people who want more: more growth, more mastery, more impact.",
  ],
};

const JOB = {
  title: "Territory Sales Manager",
  description:
    "Sky Alliance is a fast-growing B2B sales firm in Dallas specializing in face-to-face marketing and customer acquisition. We partner with major brands to drive revenue, expand market reach, and create long-term customer relationships. We're looking for motivated, outgoing individuals who want to build a career — not just find a job.",
};

// ─── Accordion ───────────────────────────────────────────────────────────────

type AccordionItem = {
  id: string;
  heading: string;
  content: React.ReactNode;
};

const ACCORDION_ITEMS: AccordionItem[] = [
  {
    id: "what-youll-do",
    heading: "WHAT YOU'LL DO",
    content: (
      <ul className="space-y-2.5 text-sm text-[#444] leading-relaxed">
        {[
          <>
            Interact with customers <strong>in person</strong> to explain
            products and drive sales
          </>,
          "Build relationships and deliver excellent customer service",
          "Meet weekly performance and sales goals",
          "Learn and apply new sales techniques through hands-on training",
          "Support basic campaign management tasks, such as reporting results and tracking metrics",
          "Participate in leadership workshops and team-building activities",
          "Assist with onboarding new team members as you grow",
          "Shadow management to learn hiring, training, and team development processes",
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[5px] flex-shrink-0 w-1 h-1 rounded-full bg-[#222] block" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "what-were-looking-for",
    heading: "WHAT WE'RE LOOKING FOR",
    content: (
      <ul className="space-y-2.5 text-sm text-[#444] leading-relaxed">
        {[
          "Strong communication and people skills",
          "Self-motivated with a results-driven mindset",
          "Comfortable working in a fast-paced, goal-oriented environment",
          "No prior sales experience required — we train from the ground up",
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[5px] flex-shrink-0 w-1 h-1 rounded-full bg-[#222] block" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "what-we-offer",
    heading: "WHAT WE OFFER",
    content: (
      <ul className="space-y-2.5 text-sm text-[#444] leading-relaxed">
        {[
          "Uncapped performance-based compensation",
          "Structured leadership and management training program",
          "Mentorship directly from experienced team leaders",
          "Clear, merit-based advancement path into management",
          "Collaborative, high-energy team environment",
          "Weekly team events, workshops, and networking opportunities",
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[5px] flex-shrink-0 w-1 h-1 rounded-full bg-[#222] block" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

function AccordionRow({ item }: { item: AccordionItem }) {
  const [open, setOpen] = useState(item.id === "what-youll-do");

  return (
    <div className="border-b border-[#e0e0e0]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase text-[#222] group-hover:text-[#4a148c] transition-colors duration-200"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          {item.heading}
        </span>
        <span className="text-[#888] group-hover:text-[#4a148c] transition-colors duration-200 flex-shrink-0 ml-4">
          {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6">{item.content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Interview Process ────────────────────────────────────────────────────────

interface InterviewStep {
  step: string;
  title: string;
  description: string;
}

const INTERVIEW_STEPS: InterviewStep[] = [
  {
    step: "Step 01",
    title: "Review Your Resume",
    description:
      "Our team reviews your application and resume to understand your background, experience, and goals. Make sure it reflects who you are and where you want to go.",
  },
  {
    step: "Step 02",
    title: "Preliminary Phone Screening",
    description:
      "A brief call with our recruiting team to learn more about you, answer your questions, and ensure we're a mutual fit before moving forward.",
  },
  {
    step: "Step 03",
    title: "Zoom Interview",
    description:
      "A virtual interview with our leadership team where we dive deeper into your goals, strengths, and potential. Come ready to be yourself.",
  },
  {
    step: "Step 04",
    title: "Final Decision Communicated",
    description:
      "We believe in transparency. Whether it's a yes or a next time, we will communicate a final decision promptly and with respect for your time.",
  },
];

// Progress bar selector — fires auto-advance onAnimationComplete
function StepSelectBtns({
  numSteps,
  selected,
  setSelected,
}: {
  numSteps: number;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex gap-1.5 mt-10">
      {Array.from(Array(numSteps).keys()).map((n) => (
        <button
          key={n}
          onClick={() => setSelected(n)}
          className="h-[3px] flex-1 relative overflow-hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.12)" }}
          aria-label={`Step ${n + 1}`}
        >
          {selected === n ? (
            <motion.span
              className="absolute inset-y-0 left-0 bg-[#171717]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              onAnimationComplete={() =>
                setSelected(selected === numSteps - 1 ? 0 : selected + 1)
              }
            />
          ) : (
            <span
              className="absolute inset-y-0 left-0 bg-[#171717]"
              style={{ width: selected > n ? "100%" : "0%" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// Individual stacked card
function StepCard({
  step,
  position,
  selected,
  setSelected,
}: {
  step: InterviewStep;
  position: number;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) {
  const isSelected = position <= selected;
  const scale = isSelected ? 1 : 1 + 0.015 * (position - selected);
  const offset = isSelected ? 0 : 95 + (position - selected) * 3;
  const isDark = position % 2 === 1;
  const bg = isDark ? "#4a148c" : "#f8f4ff";
  const fg = isDark ? "#ffffff" : "#171717";
  const iconColor = isDark ? "#ce93d8" : "#4a148c";
  const subtitleColor = isDark
    ? "rgba(255,255,255,0.45)"
    : "rgba(74,20,140,0.45)";
  const descColor = isDark ? "rgba(255,255,255,0.65)" : "#666";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background: bg,
        color: fg,
      }}
      animate={{ x: `${offset}%`, scale }}
      whileHover={{ translateX: position === selected ? 0 : -3 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onClick={() => setSelected(position)}
      className="absolute top-0 left-0 w-full h-full p-8 lg:p-12 cursor-pointer flex flex-col justify-between select-none"
    >
      {/* Top: step label + icon */}
      <div className="flex items-start justify-between">
        <span
          className="text-[10px] font-semibold tracking-[0.2em] uppercase"
          style={{
            color: subtitleColor,
            fontFamily: "var(--font-sora), sans-serif",
          }}
        >
          {step.step}
        </span>
      </div>

      {/* Middle: title */}
      <h4
        className="text-2xl lg:text-3xl font-bold leading-tight"
        style={{
          fontFamily: "var(--font-archivo-black), sans-serif",
          color: fg,
        }}
      >
        {step.title}
      </h4>

      {/* Bottom: description */}
      <p className="text-sm leading-relaxed" style={{ color: descColor }}>
        {step.description}
      </p>
    </motion.div>
  );
}

// Stacked cards container
function StepCards({
  steps,
  selected,
  setSelected,
}: {
  steps: InterviewStep[];
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="relative h-[300px] sm:h-[340px] lg:h-[380px] shadow-lg overflow-hidden">
      {steps.map((step, i) => (
        <StepCard
          key={i}
          step={step}
          position={i}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
}

// Interview Process sub-section
function InterviewProcess({ isInView }: { isInView: boolean }) {
  const [selected, setSelected] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="mt-24 md:mt-36 pt-16 md:pt-20 border-t border-[#e0e0e0]"
    >
      {/* Section heading */}
      <p
        className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#888] mb-3"
        style={{ fontFamily: "var(--font-sora), sans-serif" }}
      >
        Hiring
      </p>
      <h3
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717] leading-[1.1] tracking-tight mb-14 md:mb-16"
        style={{ fontFamily: "var(--font-archivo-black), sans-serif" }}
      >
        Our Interview Process
      </h3>

      {/* Two-column: left text + progress, right stacked cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 lg:gap-32 md:items-center">
        {/* Left */}
        <div>
          <p className="text-sm sm:text-base text-[#555] leading-relaxed">
            We keep our process simple, transparent, and human. Four focused
            steps designed to help us get to know you — and for you to get to
            know us.
          </p>

          <StepSelectBtns
            numSteps={INTERVIEW_STEPS.length}
            selected={selected}
            setSelected={setSelected}
          />

          {/* Current step label */}
          <p
            className="mt-5 text-xs font-semibold tracking-widest uppercase text-[#4a148c]"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            {INTERVIEW_STEPS[selected].step} — {INTERVIEW_STEPS[selected].title}
          </p>
        </div>

        {/* Right: stacked cards */}
        <StepCards
          steps={INTERVIEW_STEPS}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      {/* Online Application CTA */}
      <div className="mt-16 md:mt-20 flex justify-center">
        <Link
          href="https://www.careerlisterapp.com/postings/form/1144037418"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border border-[#171717] px-7 py-3.5 text-sm font-medium text-[#171717] tracking-wide hover:bg-[#171717] hover:text-white transition-all duration-300"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}
        >
          Online Application
          <FiArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function CareersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="py-24 md:py-36 px-4 sm:px-6 md:px-12"
      style={{ backgroundColor: "#f9f7f4" }}
    >
      <div className="container mx-auto">
        {/* ── Job listing two-column layout ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 md:items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#888] mb-6"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              {LEFT_COPY.label}
            </p>

            <h2
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-[#171717] leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "var(--font-archivo-black), sans-serif" }}
            >
              {LEFT_COPY.headline}
            </h2>

            <div className="space-y-4">
              {LEFT_COPY.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-base text-[#555] leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right Column — fixed height so accordion changes don't shift section */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:h-[580px] md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {/* Job title + description */}
            <div className="mb-8 pb-8 border-b border-[#e0e0e0]">
              <h3
                className="text-base font-bold text-[#171717] mb-3"
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                {JOB.title}
              </h3>
              <p className="text-sm text-[#555] leading-relaxed">
                {JOB.description}
              </p>
            </div>

            {/* Accordion */}
            <div>
              {ACCORDION_ITEMS.map((item) => (
                <AccordionRow key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Interview Process ─── */}
        <InterviewProcess isInView={isInView} />
      </div>
    </section>
  );
}
