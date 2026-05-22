"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Scroll event to shrink navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section occupies the center of screen
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 flex justify-center py-6 px-4 ${
        isScrolled
          ? "bg-space-black/30 backdrop-blur-md py-4 border-b border-white/5"
          : ""
      }`}
    >
      <div className="w-full max-w-5xl flex items-center justify-between">
        {/* Logo / C Icon (Vercel-style) */}
        <button
          suppressHydrationWarning={true}
          onClick={() => scrollToSection("hero")}
          aria-label="Go to top - Home"
          className="relative flex items-center justify-center w-10 h-10 group bg-transparent border-none focus:outline-none"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:scale-110 transition-transform duration-300"
          >
            {/* Geometric C shape inspired by Vercel logo */}
            <path
              d="M8 4 L24 4 L24 8 L12 8 L12 16 L24 16 L24 20 L12 20 L12 28 L24 28 L24 32 L8 32 Z"
              fill="url(#gradient)"
              className="group-hover:opacity-80 transition-opacity"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
          </svg>
        </button>

        {/* Floating Menu Dock */}
        <nav className="hidden md:flex items-center gap-1 glassmorphism rounded-full px-2 py-1.5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                suppressHydrationWarning={true}
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Scroll to ${item.label}`}
                className={`relative px-4 py-2 text-xs font-display font-medium tracking-widest uppercase transition-colors duration-300 focus:outline-none ${
                  isActive
                    ? "text-space-black font-semibold"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-electric-purple rounded-full -z-10 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button - University Link */}
        <a
          href="https://srisriuniversity.edu.in/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sri Sri University website"
          suppressHydrationWarning={true}
          className="relative overflow-hidden rounded-full px-4 py-2 border border-neon-cyan/40 bg-neon-cyan/5 text-xs font-display font-semibold tracking-wider text-neon-cyan uppercase hover:text-space-black hover:border-transparent transition-all duration-500 group"
        >
          <span className="absolute inset-0 bg-neon-cyan scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-10" />
          Sri Sri Uni
        </a>
      </div>
    </motion.header>
  );
}
