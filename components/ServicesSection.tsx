"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "OUTSOURCED MARKETING & SALES CAMPAIGNS",
    description:
      "Our team executes high-impact, in-person acquisition campaigns that help brands scale quickly and effectively. From market penetration to customer conversion, we deliver quantifiable results through B2B sales.",
  },
  {
    number: "02",
    title: "BRAND REPS & CUSTOMER ACQUISITION",
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
    descColor: "#555",
  },
  {
    bg: "#4a148c",
    numColor: "#ce93d8",
    titleColor: "#ffffff",
    descColor: "rgba(255,255,255,0.7)",
  },
  {
    bg: "#f8f4ff",
    numColor: "#4a148c",
    titleColor: "#171717",
    descColor: "#555",
  },
  {
    bg: "#4a148c",
    numColor: "#ce93d8",
    titleColor: "#ffffff",
    descColor: "rgba(255,255,255,0.7)",
  },
];

export default function ServicesSection() {
  return (
    <section id="services">
      <div className="relative h-fit" style={{ backgroundColor: "#f8f4ff" }}>
        <Features />
      </div>
    </section>
  );
}

const Features = () => (
  <div className="relative mx-auto grid h-full w-full container grid-cols-1 gap-8 px-4 md:grid-cols-2">
    <Copy />
    <Carousel />
  </div>
);

const Copy = () => (
  <div className="flex h-fit w-full flex-col justify-center py-12 md:sticky md:top-0 md:h-screen">
    <span
      className="w-fit px-4 py-2 text-sm uppercase font-medium tracking-widest"
      style={{ backgroundColor: "#4a148c", color: "#e9d5ff" }}
    >
      Sky Alliance Inc.
    </span>
    <h2
      className="mb-4 mt-4 font-black uppercase leading-[0.9] tracking-tight"
      style={{
        fontSize: "clamp(3rem, 6vw, 5.5rem)",
        color: "#171717",
        fontFamily: "var(--font-sora), sans-serif",
      }}
    >
      <span className="block">Ambition</span>
      <span className="block" style={{ color: "#4a148c" }}>
        Meets
      </span>
      <span className="block">Action.</span>
    </h2>
    <p className="text-base leading-relaxed max-w-sm" style={{ color: "#444" }}>
      Four pillars that drive every campaign we run — built to grow your brand
      and develop the leaders behind it.
    </p>
  </div>
);

const Carousel = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div className="relative w-full">
      <Gradient />
      <div ref={ref} className="relative z-0 flex flex-col gap-4 md:gap-6">
        {SERVICES.map((service, i) => (
          <CarouselItem
            key={i}
            scrollYProgress={scrollYProgress}
            position={i + 1}
            numItems={SERVICES.length}
            service={service}
            theme={CARD_THEMES[i]}
          />
        ))}
      </div>
      <Buffer />
    </div>
  );
};

const CarouselItem = ({
  scrollYProgress,
  position,
  numItems,
  service,
  theme,
}: {
  scrollYProgress: MotionValue<number>;
  position: number;
  numItems: number;
  service: (typeof SERVICES)[number];
  theme: (typeof CARD_THEMES)[number];
}) => {
  const stepSize = 1 / numItems;
  const end = stepSize * position;
  const start = end - stepSize;

  const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.75]);

  return (
    <motion.div
      style={{ opacity, scale, backgroundColor: theme.bg, minHeight: "42vh" }}
      className="w-full shrink-0 p-6 md:p-8 flex flex-col justify-center"
    >
      <span
        className="block font-black leading-none mb-4"
        style={{
          fontSize: "clamp(3rem, 7vw, 6rem)",
          color: theme.numColor,
        }}
      >
        {service.number}
      </span>
      <h3
        className="font-bold uppercase tracking-wide leading-tight mb-3"
        style={{
          fontSize: "clamp(1rem, 1.6vw, 1.4rem)",
          color: theme.titleColor,
        }}
      >
        {service.title}
      </h3>
      <p
        className="text-sm md:text-base leading-relaxed max-w-md"
        style={{ color: theme.descColor }}
      >
        {service.description}
      </p>
    </motion.div>
  );
};

const Gradient = () => (
  <div
    className="sticky top-0 z-10 hidden h-24 w-full md:block"
    style={{
      background: "linear-gradient(to bottom, #f8f4ff, transparent)",
    }}
  />
);

const Buffer = () => <div className="h-24 w-full md:h-48" />;
