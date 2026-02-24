"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    title: "OUTSOURCED MARKETING & SALES CAMPAIGNS",
    description:
      "Our team executes high-impact, in-person acquisition campaigns that help brands scale quickly and effectively. From market penetration to customer conversion, we deliver quantifiable results through B2B sales.",
  },
  {
    number: "02",
    title: "BRAND REPRESENTATION & CUSTOMER ACQUISITION",
    description:
      "We represent clients with professionalism and authenticity, ensuring every interaction reflects their values and strengthens consumer trust. Your brand becomes our mission, and we elevate it at every step.",
  },
  {
    number: "03",
    title: "SALES & TRAINING DEVELOPMENT",
    description:
      "We equip professionals with proven strategies, hands-on coaching, and leadership-focused development that drives performance and confidence in the field. We do not just train salespeople, we build market leaders.",
  },
  {
    number: "04",
    title: "BUSINESS EXPANSION & MARKET GROWTH",
    description:
      "We help brands break into new territories, broaden their reach, and create sustainable growth pipelines. Sky Alliance turns ambition into expansion beyond the Dallas Metroplex, always aiming sky-high.",
  },
];

const CARD_THEMES = [
  {
    bg: "#f8f4ff",
    numColor: "#4a148c",
    titleColor: "#171717",
    descColor: "#666",
  },
  {
    bg: "#4a148c",
    numColor: "#ce93d8",
    titleColor: "#ffffff",
    descColor: "rgba(255,255,255,0.65)",
  },
  {
    bg: "#f8f4ff",
    numColor: "#4a148c",
    titleColor: "#171717",
    descColor: "#666",
  },
  {
    bg: "#4a148c",
    numColor: "#ce93d8",
    titleColor: "#ffffff",
    descColor: "rgba(255,255,255,0.65)",
  },
];

const BG_IMAGE =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=1600&fit=crop&q=80";

function MobileServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const theme = CARD_THEMES[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className=" p-8 sm:p-10"
      style={{ backgroundColor: theme.bg }}
    >
      <span
        className="text-[5rem] font-black leading-none block mb-4"
        style={{ color: theme.numColor }}
      >
        {service.number}
      </span>
      <h3
        className="text-xl sm:text-2xl font-bold uppercase tracking-wide leading-tight mb-3"
        style={{ color: theme.titleColor }}
      >
        {service.title}
      </h3>
      <p className="text-sm sm:text-base" style={{ color: theme.descColor }}>
        {service.description}
      </p>
    </motion.div>
  );
}

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current || !stickyRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stickyRef.current,
      onUpdate: (self) => {
        const newIndex = Math.min(3, Math.floor(self.progress * 4));
        setActiveIndex(newIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  const theme = CARD_THEMES[activeIndex];
  const service = SERVICES[activeIndex];

  return (
    <>
      {/* ── Desktop (md+): sticky scroll experience ─────────────────────── */}
      <section
        id="services"
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: "300vh", backgroundColor: "#fefefe" }}
      >
        <div ref={stickyRef} className="h-fit overflow-hidden py-32 lg:py-52">
          <div className="container mx-auto h-full px-6 md:px-12 py-10">
            <div className="grid grid-cols-2 gap-4 md:gap-5 h-[800px] lg:h-[1000px]">
              {/* Left: sticky "OUR SERVICES" image card */}
              <div className="relative overflow-hidden">
                <img
                  src={BG_IMAGE}
                  alt="Our Services"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

                <div className="absolute inset-0 flex flex-col justify-between p-10 xl:p-14">
                  {/* Top: small label */}
                  <p className="text-xs font-medium tracking-widest uppercase text-white/50">
                    Sky Alliance Inc.
                  </p>

                  {/* Bottom: headline + progress indicators */}
                  <div>
                    <h2
                      className="font-black text-white uppercase leading-[0.88] tracking-tight text-5xl lg:text-8xl"
                      style={{
                        // fontSize: "clamp(3.5rem, 8vw, 7rem)",
                        fontFamily: "var(--font-sora), sans-serif",
                      }}
                    >
                      <span className="block">Ambition</span>
                      <span className="block">Meets Action.</span>
                    </h2>

                    {/* Progress bar indicators */}
                    <div className="flex gap-2 mt-8">
                      {SERVICES.map((_, i) => (
                        <div
                          key={i}
                          className="h-[2px] rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: i === activeIndex ? "2.5rem" : "1rem",
                            backgroundColor:
                              i === activeIndex
                                ? "rgba(255,255,255,0.95)"
                                : "rgba(255,255,255,0.3)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: animated service card */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 72 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -36, scale: 0.97 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 flex flex-col justify-center px-10 xl:px-16"
                    style={{ backgroundColor: theme.bg }}
                  >
                    {/* Service number */}
                    <motion.span
                      className="font-black leading-none block"
                      style={{
                        color: theme.numColor,
                        fontSize: "clamp(5rem, 13vw, 11rem)",
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {service.number}
                    </motion.span>

                    {/* Service title */}
                    <motion.h3
                      className="font-bold uppercase tracking-wide leading-tight mt-5 mb-4"
                      style={{
                        color: theme.titleColor,
                        fontSize: "clamp(1.4rem, 2.6vw, 2.5rem)",
                      }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.18,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {service.title}
                    </motion.h3>

                    {/* Service description */}
                    <motion.p
                      className="text-base md:text-lg max-w-xs leading-relaxed"
                      style={{ color: theme.descColor }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.26,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {service.description}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile (<md): stacked vertical layout ───────────────────────── */}
      <section className="md:hidden py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto space-y-5">
          {/* Header image card */}
          <div
            className="relative overflow-hidden w-full"
            style={{ height: "280px" }}
          >
            <img
              src={BG_IMAGE}
              alt="Our Services"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h2
                className="font-black text-white uppercase leading-[0.88]"
                style={{ fontSize: "clamp(3rem, 12vw, 5rem)" }}
              >
                <span className="block">OUR</span>
                <span className="block">SERVICES</span>
              </h2>
            </div>
          </div>

          {/* Service cards */}
          {SERVICES.map((svc, i) => (
            <MobileServiceCard key={i} service={svc} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
