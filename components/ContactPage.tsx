"use client";

import { useRef, useEffect, Suspense, useState } from "react";
import React from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

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

const SOCIALS = [
  {
    label: "LinkedIn",
    Icon: FaLinkedinIn,
    href: "https://www.linkedin.com/company/skyalliancetx/",
  },
  {
    label: "Instagram",
    Icon: FaInstagram,
    href: "https://www.instagram.com/skyalliancetx",
  },
  {
    label: "X / Twitter",
    Icon: FaXTwitter,
    href: "https://x.com/SkyAllianceTX",
  },
  {
    label: "Facebook",
    Icon: FaFacebookF,
    href: "https://www.facebook.com/skyalliancetx",
  },
];

const CONTACT_INFO = [
  {
    id: "email",
    label: "Email",
    value: "info@skyallianceinc.com",
    href: "mailto:info@skyallianceinc.com",
  },
  {
    id: "phone",
    label: "Phone",
    value: "(945) 295-0020",
    href: "tel:+19452950020",
  },
  {
    id: "address",
    label: "Address",
    value: "10300 N Central Expy STE 550\nDallas, TX 75231",
    href: "https://maps.google.com/?q=10300+N+Central+Expy+STE+550,+Dallas,+TX+75231",
  },
];

const HEADLINE_WORDS = ["We'd", "love", "to", "hear", "from", "you."];

export default function ContactPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isHeadlineInView = useInView(headlineRef, {
    once: true,
    margin: "-60px",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* ── Hero ── */}
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

        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 pb-20 pt-40">
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
            Whether you have a question, an opportunity, or just want to say
            hello — drop us a line and we'll get back to you as soon as
            possible.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Info + Form ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            {/* Left — contact info */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-10"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#ff6f00" }}
                >
                  Contact
                </span>
                <h2
                  className="mt-3 text-3xl sm:text-4xl font-bold text-[#171717] leading-tight"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  Let's start a<br />
                  <span style={{ color: "#4a148c" }}>conversation.</span>
                </h2>
                <p className="mt-4 text-sm text-neutral-500 leading-relaxed max-w-xs">
                  Reach out through any of the channels below or fill in the
                  form — we respond within one business day.
                </p>
              </div>

              {/* Info items */}
              <ul className="flex flex-col gap-7">
                {CONTACT_INFO.map(({ id, label, value, href }) => (
                  <li key={id} className="flex items-start gap-4">
                    <div>
                      <p
                        className="text-[11px] font-semibold uppercase tracking-widest mb-1"
                        style={{ color: "#ff6f00" }}
                      >
                        {label}
                      </p>
                      <Link
                        href={href}
                        target={id === "address" ? "_blank" : undefined}
                        rel={
                          id === "address" ? "noopener noreferrer" : undefined
                        }
                        className="text-sm text-neutral-700 hover:text-[#4a148c] transition-colors duration-200 whitespace-pre-line"
                      >
                        {value}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Socials */}
              <div>
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "#ff6f00" }}
                >
                  Follow us
                </p>
                <div className="flex items-center gap-3">
                  {SOCIALS.map(({ label, Icon, href }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:border-[#4a148c] hover:text-[#4a148c] transition-all duration-200"
                    >
                      <Icon className="text-sm" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <FormField
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Message <span style={{ color: "#ff6f00" }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project, question, or opportunity…"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-[#171717] placeholder-neutral-400 outline-none transition-all duration-200 focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="
                      relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-neutral-700
                      px-7 py-3 text-sm font-semibold text-[#171717] cursor-pointer transition-all duration-300
                      before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:scale-[2.5]
                      before:rounded-[100%] before:bg-neutral-900 before:transition-transform before:duration-1000 before:content-['']
                      hover:scale-105 hover:border-neutral-900 hover:text-white hover:before:translate-y-[0%]
                      active:scale-100
                    "
                  >
                    Send Message
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Google Maps ── */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-screen-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden shadow-sm border border-neutral-200"
            style={{ height: "420px" }}
          >
            <iframe
              title="Sky Alliance location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=10300+N+Central+Expy+STE+550,+Dallas,+TX+75231&output=embed"
            />
          </motion.div>

          <motion.p
            className="mt-4 text-center text-xs text-neutral-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            10300 N Central Expy STE 550, Dallas, TX 75231
          </motion.p>
        </div>
      </section>
    </>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
      >
        {label} {required && <span style={{ color: "#ff6f00" }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-[#171717] placeholder-neutral-400 outline-none transition-all duration-200 focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
      />
    </div>
  );
}
