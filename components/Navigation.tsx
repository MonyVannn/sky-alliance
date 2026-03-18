"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  // Check if we're on a dark background page (contact page)
  const isDarkPage = pathname === "/contact";

  const backdropBlur = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["blur(0px)", "blur(10px)"],
  );
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.08],
    isDarkPage
      ? ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)"]
      : ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"],
  );

  return (
    <motion.nav
      style={{
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        backgroundColor,
      }}
      className={`fixed z-50 w-full ${isDarkPage ? "text-white" : "text-[#171717]"}`}
    >
      <div
        className={`flex items-center justify-between container mx-auto py-2 px-4 sm:px-6 lg:px-12 text-sm ${isDarkPage ? "text-white" : "text-[#171717]"}`}
      >
        <Logo isDarkPage={isDarkPage} />

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-base font-medium">
          <NavLink href="/" isDarkPage={isDarkPage}>
            Home
          </NavLink>
          <NavLink href="#about" isDarkPage={isDarkPage}>
            About
          </NavLink>
          <NavLink href="#services" isDarkPage={isDarkPage}>
            Services
          </NavLink>
          <NavLink href="#careers" isDarkPage={isDarkPage}>
            Careers
          </NavLink>
          <NavLink href="/team" isDarkPage={isDarkPage}>
            Team
          </NavLink>
          <JoinButton isDarkPage={isDarkPage} />
        </div>

        {/* Hamburger button */}
        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] p-2 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`block w-6 h-[2px] ${isDarkPage ? "bg-white" : "bg-[#171717]"} origin-center`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className={`block w-6 h-[2px] ${isDarkPage ? "bg-white" : "bg-[#171717]"}`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`block w-6 h-[2px] ${isDarkPage ? "bg-white" : "bg-[#171717]"} origin-center`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-100 shadow-lg"
          >
            <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="#services" onClick={() => setMenuOpen(false)}>
              Services
            </MobileNavLink>
            <MobileNavLink href="#careers" onClick={() => setMenuOpen(false)}>
              Careers
            </MobileNavLink>
            <div className="px-4 py-4">
              <JoinButton isDarkPage={isDarkPage} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const Logo = ({ isDarkPage }: { isDarkPage: boolean }) => {
  return (
    <Link href="/">
      <Image
        src={isDarkPage ? "/logo-name.png" : "/logo-name.png"}
        alt="Sky Alliance"
        width={500}
        height={500}
        className={`h-8 md:h-20 w-auto`}
        priority
      />
    </Link>
  );
};

const NavLink = ({
  children,
  href,
  isDarkPage,
}: {
  children: string;
  href: string;
  isDarkPage: boolean;
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      // If target exists on current page, scroll to it
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      // If target doesn't exist, navigate to home and scroll after navigation
      router.push("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span
          className={`flex h-[20px] items-center ${isDarkPage ? "text-white" : "text-[#171717]"}`}
        >
          {children}
        </span>
        <span
          className={`flex h-[20px] items-center font-medium ${isDarkPage ? "text-white" : "text-foreground"}`}
        >
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

const JoinButton = ({ isDarkPage }: { isDarkPage: boolean }) => {
  return (
    <Link href="/contact">
      <button
        className={`
          relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border-[1px] 
          ${isDarkPage ? "border-white text-white" : "border-neutral-600 text-[#171717]"}
          px-4 py-1.5 font-medium cursor-pointer transition-all duration-300
          
          before:absolute before:inset-0
          before:-z-10 before:translate-y-[200%]
          before:scale-[2.5]
          before:rounded-[100%] ${isDarkPage ? "before:bg-white" : "before:bg-neutral-900"}
          before:transition-transform before:duration-1000
          before:content-[""]
  
          hover:scale-105 ${isDarkPage ? "hover:border-white hover:text-black" : "hover:border-neutral-900 hover:text-white"}
          hover:before:translate-y-[0%]
          active:scale-100`}
      >
        Talk to us
      </button>
    </Link>
  );
};

const MobileNavLink = ({
  children,
  href,
  onClick,
}: {
  children: string;
  href: string;
  onClick: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-neutral-600 hover:bg-neutral-100 hover:text-foreground transition-colors border-b border-neutral-200 last:border-b-0"
    >
      {children}
    </Link>
  );
};
