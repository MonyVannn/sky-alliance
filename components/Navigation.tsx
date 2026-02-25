"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const backdropBlur = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["blur(0px)", "blur(10px)"],
  );
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.08],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.5)"],
  );

  return (
    <motion.nav
      style={{
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        backgroundColor,
      }}
      className="fixed z-50 w-full"
    >
      <div className="flex items-center justify-between container mx-auto py-4 px-4 sm:px-6 lg:px-12 text-sm text-[#171717]">
        <Logo />

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6 text-base font-medium">
          <NavLink href="/">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#careers">Careers</NavLink>
          <JoinButton />
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
            className="block w-6 h-[2px] bg-[#171717] origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block w-6 h-[2px] bg-[#171717]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-[2px] bg-[#171717] origin-center"
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
            <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink href="#services" onClick={() => setMenuOpen(false)}>Services</MobileNavLink>
            <MobileNavLink href="#careers" onClick={() => setMenuOpen(false)}>Careers</MobileNavLink>
            <div className="px-4 py-4">
              <JoinButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo1.png"
        alt="Sky Alliance"
        width={500}
        height={500}
        className="h-8 md:h-16 w-auto"
        priority
      />
    </Link>
  );
};

const NavLink = ({ children, href }: { children: string; href: string }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Link href={href} onClick={handleClick} className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center text-foreground font-medium">
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

const JoinButton = () => {
  return (
    <Link href="/contact">
      <button
        className={`
          relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border-[1px] 
          border-neutral-600 px-4 py-1.5 font-medium cursor-pointer
          text-[#171717] transition-all duration-300
          
          before:absolute before:inset-0
          before:-z-10 before:translate-y-[200%]
          before:scale-[2.5]
          before:rounded-[100%] before:bg-neutral-900
          before:transition-transform before:duration-1000
          before:content-[""]
  
          hover:scale-105 hover:border-neutral-900 hover:text-white
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
