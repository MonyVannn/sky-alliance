"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { motion } from "framer-motion";
import type { TeamMemberCardProps } from "@/components/TeamMemberCard";

const PANEL_BG = "#4a148c";

export type TeamProfileSheetProps = {
  member: TeamMemberCardProps;
  index: number;
  total: number;
  onClose: () => void;
  onNavigate: (delta: number) => void;
};

function BioCornerMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 2h12v1H3v11H2V2z"
        stroke="white"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export default function TeamProfileSheet({
  member,
  index,
  total,
  onClose,
  onNavigate,
}: TeamProfileSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const sheetBio = member.extendedBio ?? member.bio;
  const paragraphs = sheetBio.split(/\n\n+/).filter(Boolean);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  const displayIndex = String(index + 1).padStart(2, "0");
  const displayTotal = String(total).padStart(2, "0");
  const linkedin = member.socials?.linkedin;

  return (
    <>
      <motion.button
        key="team-sheet-backdrop"
        type="button"
        aria-label="Close profile"
        className="fixed inset-0 z-200 cursor-default border-0 bg-black/50 p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.aside
        key="team-sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="fixed top-0 right-0 z-201 flex h-dvh w-full max-w-[min(100vw,740px)] flex-col shadow-2xl p-8 md:p-14"
        style={{ backgroundColor: PANEL_BG }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border border-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3 font-mono text-sm text-white tabular-nums sm:text-base">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="p-1 transition-opacity hover:opacity-70 cursor-pointer"
              aria-label="Previous team member"
            >
              ←
            </button>
            <span>
              {displayIndex} - {displayTotal}
            </span>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="p-1 transition-opacity hover:opacity-70 cursor-pointer"
              aria-label="Next team member"
            >
              →
            </button>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="px-2 py-1 font-light text-2xl leading-none text-white transition-opacity hover:opacity-70 cursor-pointer"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="grid shrink-0 grid-cols-1 border-b border-r border-l border-white sm:grid-cols-2">
          <div className="relative aspect-square border-b border-r border-white sm:border-b-0 sm:border-r">
            <Image
              src={member.imageSrc}
              alt={member.imageAlt ?? member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 320px"
              priority
            />
          </div>
          <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div>
              <h2
                id={titleId}
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {member.name}
              </h2>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-white/90 sm:text-sm">
                {member.title}
              </p>
            </div>
            <div className="flex justify-end">
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-200 px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-[#1A237E] transition-opacity hover:opacity-90"
                >
                  LinkedIn
                </a>
              ) : (
                <span className="min-h-[36px]" aria-hidden />
              )}
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 gap-4 overflow-y-auto p-5 sm:gap-6 sm:p-8 border-b border-l border-r border-white">
          <BioCornerMark className="mt-1 shrink-0" />
          <div className="min-w-0 font-mono text-xs uppercase leading-relaxed tracking-wide text-white sm:text-sm">
            {paragraphs.map((block, i) => (
              <p key={i} className={i > 0 ? "mt-6" : undefined}>
                {block.trim()}
              </p>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
