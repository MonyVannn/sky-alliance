"use client";

import Image from "next/image";
import { KeyboardEvent, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

const CAROUSEL_IMAGE_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 960px";
const SWIPE_OFFSET_THRESHOLD = 80;
const SWIPE_VELOCITY_THRESHOLD = 500;

const TEAM_NIGHT_IMAGES: GalleryImage[] = [
  {
    id: "team-8",
    src: "/team-night/team8.jpg",
    alt: "Team night moment with the crew",
  },
  {
    id: "team-1",
    src: "/team-night/team1.jpg",
    alt: "Team night moment with the crew",
  },
  {
    id: "team-2",
    src: "/team-night/team2.jpg",
    alt: "Crew night group photo",
  },
  {
    id: "team-3",
    src: "/team-night/team3.jpg",
    alt: "Sky Alliance team sharing laughs during team night",
  },
  {
    id: "team-5",
    src: "/team-night/team5.jpg",
    alt: "Team night highlight with the full crew",
  },
  {
    id: "team-4",
    src: "/team-night/team4.jpg",
    alt: "Crew night candid at Sky Alliance",
  },
  {
    id: "team-6",
    src: "/team-night/team6.jpg",
    alt: "Another weekly team night memory",
  },
  {
    id: "team-7",
    src: "/team-night/team7.jpg",
    alt: "Crew celebrating another productive week",
  },
];

export default function TeamNightGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const totalSlides = TEAM_NIGHT_IMAGES.length;
  const currentSlide = TEAM_NIGHT_IMAGES[currentIndex];

  const goToSlide = (nextIndex: number, nextDirection: 1 | -1) => {
    setDirection(nextDirection);
    setCurrentIndex((nextIndex + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    goToSlide(currentIndex + 1, 1);
  };

  const goToPreviousSlide = () => {
    goToSlide(currentIndex - 1, -1);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const didSwipeLeft =
      info.offset.x <= -SWIPE_OFFSET_THRESHOLD ||
      info.velocity.x <= -SWIPE_VELOCITY_THRESHOLD;
    const didSwipeRight =
      info.offset.x >= SWIPE_OFFSET_THRESHOLD ||
      info.velocity.x >= SWIPE_VELOCITY_THRESHOLD;

    if (didSwipeLeft) {
      goToNextSlide();
    } else if (didSwipeRight) {
      goToPreviousSlide();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNextSlide();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPreviousSlide();
    }
  };

  return (
    <section
      id="team-night"
      className="relative overflow-hidden py-20 md:py-32 px-4 sm:px-6"
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

        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Team night photo carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <p className="sr-only" aria-live="polite">
            Slide {currentIndex + 1} of {totalSlides}
          </p>

          <div className="relative overflow-hidden  bg-black/30 min-h-[340px] sm:min-h-[500px] lg:min-h-[680px] xl:min-h-[740px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={{
                  enter: (currentDirection: number) => ({
                    x: currentDirection > 0 ? 100 : -100,
                    opacity: 0,
                  }),
                  center: { x: 0, opacity: 1 },
                  exit: (currentDirection: number) => ({
                    x: currentDirection > 0 ? -100 : 100,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  fill
                  sizes={CAROUSEL_IMAGE_SIZES}
                  className="object-cover object-center"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goToPreviousSlide}
            aria-label="Show previous team night photo"
            className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[#f8f4ff]/50 bg-[#0d0d0d]/70 text-[#f8f4ff] transition hover:bg-[#0d0d0d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8f4ff] sm:left-5"
          >
            <FiChevronLeft className="mx-auto h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={goToNextSlide}
            aria-label="Show next team night photo"
            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-[#f8f4ff]/50 bg-[#0d0d0d]/70 text-[#f8f4ff] transition hover:bg-[#0d0d0d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f8f4ff] sm:right-5"
          >
            <FiChevronRight className="mx-auto h-6 w-6" />
          </button>

          <div className="mt-4 flex items-center justify-center">
            <span className="text-xs sm:text-sm tracking-wide text-[#d6d6d6]">
              {currentIndex + 1} / {totalSlides}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
