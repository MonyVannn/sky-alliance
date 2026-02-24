"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

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

export default function Footer() {
  const bigTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bigTextRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-[#4a148c] text-white">
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto px-8 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          {/* CTA left */}
          <div className="flex flex-col gap-8 max-w-lg">
            <h2
              className="text-4xl lg:text-5xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Ready to reach new heights?{" "}
              <span className="text-white/60">Apply today.</span>
            </h2>
            <Link
              href="#contact"
              className="self-start px-8 py-3.5 bg-[#ff6f00] hover:bg-[#e65100] transition-colors duration-200 text-sm font-semibold tracking-wide"
            >
              Contact us
            </Link>
          </div>

          {/* Info columns right */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 lg:gap-12">
            {/* Pages */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ffa726] mb-1">
                Sections
              </span>
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ffa726] mb-1">
                Email
              </span>
              <a
                href="mailto:info@skyallianceinc.com"
                className="text-sm text-white/60 hover:text-white transition-colors duration-150 break-all"
              >
                info@skyallianceinc.com
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ffa726] mb-1">
                Address
              </span>
              <p className="text-sm text-white/60 leading-relaxed">
                10300 N Central Expy STE 550, Dallas, TX 75231
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#ffa726] mb-1">
                Phone
              </span>
              <a
                href="tel:+19452950020"
                className="text-sm text-white/60 hover:text-white transition-colors duration-150"
              >
                (945) 295-0020
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Giant brand text */}
      <div className="overflow-hidden px-4 pt-4 pb-0">
        <div
          ref={bigTextRef}
          className="font-black leading-none tracking-tight whitespace-nowrap text-center select-none"
          style={{
            fontFamily: "var(--font-archivo-black)",
            fontSize: "clamp(3.5rem, 12.5vw, 17rem)",
          }}
        >
          SKY ALLIANCE
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/40">
            2026 © Sky Alliance — All rights reserved
          </span>
          <div className="flex items-center gap-6">
            {SOCIALS.map(({ label, Icon, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="text-white/50 hover:text-white transition-colors duration-150 text-base"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
