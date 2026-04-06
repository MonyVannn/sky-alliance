"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  desktopPositionClassName: string;
  mobileMinHeightClassName: string;
  sizes: string;
};

const TEAM_NIGHT_IMAGES: GalleryImage[] = [
  {
    id: "top",
    src: "/team-night/team8.jpg",
    alt: "Team night moment with the crew",
    desktopPositionClassName:
      "md:-top-10 md:right-[16%] md:h-[150px] md:w-[150px] lg:-top-16 lg:right-[20%] lg:h-[200px] lg:w-[200px] border-6 border-[#f8f4ff]",
    mobileMinHeightClassName: "min-h-[250px]",
    sizes: "(max-width: 767px) 100vw, 25vw",
  },
  {
    id: "top-left",
    src: "/team-night/team1.jpg",
    alt: "Team night moment with the crew",
    desktopPositionClassName:
      "md:top-[20px] md:left-[3%] md:h-[220px] md:w-[20%] lg:top-0 lg:left-[8%] lg:h-[280px] lg:w-[16%] border-6 border-[#f8f4ff]",
    mobileMinHeightClassName: "min-h-[250px]",
    sizes: "(max-width: 767px) 100vw, 25vw",
  },
  {
    id: "top-right",
    src: "/team-night/team2.jpg",
    alt: "Crew night group photo",
    desktopPositionClassName:
      "md:-top-8 md:left-[30%] md:h-[150px] md:w-[30%] lg:-top-16 lg:left-[32%] lg:h-[200px] lg:w-[24%] border-6 border-[#f8f4ff]",
    mobileMinHeightClassName: "min-h-[220px]",
    sizes: "(max-width: 767px) 100vw, 45vw",
  },
  {
    id: "middle-left",
    src: "/team-night/team3.jpg",
    alt: "Sky Alliance team sharing laughs during team night",
    desktopPositionClassName:
      "md:top-[250px] md:left-[3%] md:h-[170px] md:w-[20%] lg:top-[380px] lg:left-[8%] lg:h-[190px] lg:w-[16%] border-6 border-[#f8f4ff]",
    mobileMinHeightClassName: "min-h-[210px]",
    sizes: "(max-width: 767px) 100vw, 25vw",
  },
  {
    id: "center",
    src: "/team-night/team5.jpg",
    alt: "Team night highlight with the full crew",
    desktopPositionClassName:
      "md:top-[190px] md:left-1/2 md:h-[330px] md:w-[56%] md:-translate-x-1/2 lg:top-[165px] lg:h-[360px] lg:w-[46%] border-6 border-[#f8f4ff]",
    mobileMinHeightClassName: "min-h-[280px]",
    sizes: "(max-width: 767px) 100vw, 50vw",
  },
  {
    id: "middle-right",
    src: "/team-night/team4.jpg",
    alt: "Crew night candid at Sky Alliance",
    desktopPositionClassName:
      "md:top-[260px] md:right-[3%] md:h-[190px] md:w-[20%] lg:top-[210px] lg:right-[6%] lg:h-[240px] lg:w-[16%] border-6 border-[#f8f4ff]",
    mobileMinHeightClassName: "min-h-[210px]",
    sizes: "(max-width: 767px) 100vw, 25vw",
  },
  {
    id: "bottom-left",
    src: "/team-night/team6.jpg",
    alt: "Another weekly team night memory",
    desktopPositionClassName:
      "md:bottom-[8px] md:left-[28%] md:h-[150px] md:w-[20%] lg:-bottom-10 lg:left-[30%] lg:h-[170px] lg:w-[17%] border-6 border-[#f8f4ff]",
    mobileMinHeightClassName: "min-h-[210px]",
    sizes: "(max-width: 767px) 100vw, 25vw",
  },
  {
    id: "bottom-right",
    src: "/team-night/team7.jpg",
    alt: "Crew celebrating another productive week",
    desktopPositionClassName:
      "md:-bottom-8 md:right-[8%] md:h-[180px] md:w-[40%] lg:-bottom-20 lg:right-[18%] lg:h-[225px] lg:w-[28%] border-6 border-[#f8f4ff]",
    mobileMinHeightClassName: "min-h-[220px]",
    sizes: "(max-width: 767px) 100vw, 45vw",
  },
];

function MobileGalleryTile({ image }: { image: GalleryImage }) {
  return (
    <div
      className={`relative overflow-hidden ${image.mobileMinHeightClassName}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={image.sizes}
        className="object-cover"
      />
    </div>
  );
}

export default function TeamNightGallery() {
  return (
    <section
      id="team-night"
      className="relative overflow-hidden py-20 md:py-44 px-4 sm:px-6"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          filter: "blur(32px)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -160 180 C 180 -80, 560 480, 920 220 S 1380 -40, 1600 160"
            stroke="rgba(180,60,210,0.75)"
            strokeWidth="180"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -160 500 C 220 650, 580 260, 960 520 S 1340 780, 1600 560"
            stroke="rgba(255,140,20,0.72)"
            strokeWidth="195"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -160 820 C 240 560, 660 880, 1020 620 S 1380 360, 1600 480"
            stroke="rgba(120,15,210,0.7)"
            strokeWidth="115"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 1600 100 C 1280 380, 880 80, 580 340 S 120 620, -160 440"
            stroke="rgba(255,165,25,0.68)"
            strokeWidth="100"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M -160 680 C 300 500, 700 760, 1060 560 S 1420 700, 1600 780"
            stroke="rgba(205,135,235,0.65)"
            strokeWidth="98"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <motion.div
        initial={{ transform: "translateX(-10%) translateY(-10%)" }}
        animate={{ transform: "translateX(10%) translateY(10%)" }}
        transition={{
          repeat: Infinity,
          duration: 0.2,
          ease: "linear",
          repeatType: "mirror",
        }}
        style={{ backgroundImage: 'url("/black-noise.png")' }}
        className="pointer-events-none absolute -inset-full opacity-5"
      />

      <div className="relative z-10 container mx-auto">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#a8a8a8] mb-5"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Team Night
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f8f4ff] leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-archivo-black), sans-serif" }}
          >
            Weekly crew nights that keep our team connected.
          </h2>
          <p className="text-sm sm:text-base text-[#d6d6d6] leading-relaxed">
            Every week, we make space to celebrate wins, recharge together, and
            strengthen the team culture behind our best work.
          </p>
        </div>

        <div className="grid grid-cols-2 grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-2 lg:hidden">
          {TEAM_NIGHT_IMAGES.map((image) => (
            <MobileGalleryTile key={`${image.id}-mobile`} image={image} />
          ))}
        </div>

        <div className="relative hidden lg:block h-[700px] xl:h-[740px]">
          {TEAM_NIGHT_IMAGES.map((image) => (
            <div
              key={image.id}
              className={`absolute overflow-hidden ${image.desktopPositionClassName}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={image.sizes}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
