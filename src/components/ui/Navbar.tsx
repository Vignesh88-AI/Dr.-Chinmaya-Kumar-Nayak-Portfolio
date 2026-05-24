"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar(): React.JSX.Element {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Scroll event to shrink navbar and change background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when section occupies the center of screen
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
      className={`sticky top-0 z-40 w-full transition-all duration-300 flex justify-center py-5 px-4 ${
        isScrolled
          ? "bg-[#0a0f1e]/80 backdrop-blur-md py-3.5 border-b border-[#2dd4bf]/15 shadow-lg shadow-[#0a0f1e]/40"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-6xl flex items-center justify-between gap-4">
        {/* Brand / logo */}
        <button
          suppressHydrationWarning={true}
          onClick={() => scrollToSection("hero")}
          aria-label="Go to top - Home"
          className="text-sm md:text-base font-display font-extrabold tracking-[0.24em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] via-[#818cf8] to-slate-200 hover:from-white hover:to-[#2dd4bf] transition-all duration-300 focus:outline-none cursor-pointer"
        >
          DR. C. K. NAYAK
        </button>

        {/* Floating Menu Dock */}
        <nav className="hidden md:flex items-center gap-0.5 glassmorphism rounded-full px-1.5 py-1 border border-white/5 shadow-2xl mx-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                suppressHydrationWarning={true}
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Scroll to ${item.label}`}
                className={`relative px-3.5 py-1.5 text-[10px] font-display font-semibold tracking-wider uppercase transition-colors duration-300 focus:outline-none cursor-pointer ${
                  isActive
                    ? "text-[#0a0f1e] font-bold"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#2dd4bf] to-[#818cf8] rounded-full -z-10 shadow-[0_0_12px_rgba(45,212,191,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button - University Link: changed from rounded-full to rounded-lg */}
        <a
          href="https://srisriuniversity.edu.in/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Sri Sri University website"
          suppressHydrationWarning={true}
          className="relative overflow-hidden rounded-lg px-4 py-2 border border-[#2dd4bf]/35 bg-[#2dd4bf]/10 text-xs font-display font-bold tracking-widest text-[#2dd4bf] uppercase hover:text-white hover:border-[#2dd4bf]/60 transition-all duration-500 group"
        >
          <span className="absolute inset-0 bg-[#2dd4bf]/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-10" />
          Sri Sri Uni
        </a>
      </div>
    </motion.header>
  );
}
