"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaLocationDot,
  FaBriefcase,
  FaBuilding,
  FaDollarSign,
} from "react-icons/fa6";
import { JOB_DETAILS } from "@/data/career";
import CareerHero from "./CareerHero";

export default function CareerPage() {
  return (
    <>
      <CareerHero />

      {/* ── Job Details ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 ">
          <div className="w-full">
            <motion.div
              className="flex flex-col gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#ff6f00" }}
                  >
                    {JOB_DETAILS.company}
                  </span>
                  <h2
                    className="mt-3 text-4xl sm:text-5xl font-bold text-[#171717] leading-tight"
                    style={{ fontFamily: "var(--font-sora), sans-serif" }}
                  >
                    {JOB_DETAILS.title}
                  </h2>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-600">
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-neutral-400" />
                      <span>{JOB_DETAILS.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLocationDot className="text-neutral-400" />
                      <span>{JOB_DETAILS.location}</span>
                    </div>
                    {JOB_DETAILS.salary ? (
                      <div className="flex items-center gap-2">
                        <FaDollarSign className="text-neutral-400" />
                        <span>{JOB_DETAILS.salary}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#4a148c]/10 text-[#4a148c]">
                      <FaBuilding />
                      <span>{JOB_DETAILS.department}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/career/application"
                  className="
                    relative z-0 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-neutral-700
                    px-7 py-3 text-sm font-semibold text-[#171717] cursor-pointer transition-all duration-300
                    before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:scale-[2.5]
                    before:rounded-[100%] before:bg-neutral-900 before:transition-transform before:duration-1000 before:content-['']
                    hover:scale-[1.02] hover:border-neutral-900 hover:text-white hover:before:translate-y-[0%]
                    active:scale-100
                  "
                >
                  Apply now
                </Link>
              </div>

              <div className="prose prose-neutral max-w-none text-[#171717]">
                {JOB_DETAILS.sections.map((section, idx) => (
                  <div key={idx} className={idx === 0 ? "" : "mt-10"}>
                    <h3 className="text-xl font-bold text-[#171717] mb-4">
                      {section.title}
                    </h3>
                    {"content" in section && section.content ? (
                      <div className="space-y-4 text-neutral-600 leading-relaxed">
                        {section.content.split("\n\n").map((para, pIdx) => (
                          <p key={pIdx}>{para.trim()}</p>
                        ))}
                      </div>
                    ) : null}
                    {"items" in section && section.items?.length ? (
                      <ul
                        className={`list-disc pl-5 space-y-2 text-neutral-600 ${
                          "content" in section && section.content ? "mt-4" : ""
                        }`}
                      >
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/career/application"
                  className="
                    inline-flex relative z-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-neutral-700
                    px-7 py-3 text-sm font-semibold text-[#171717] cursor-pointer transition-all duration-300
                    before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:scale-[2.5]
                    before:rounded-[100%] before:bg-neutral-900 before:transition-transform before:duration-1000 before:content-['']
                    hover:scale-[1.02] hover:border-neutral-900 hover:text-white hover:before:translate-y-[0%]
                    active:scale-100
                  "
                >
                  Apply now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
