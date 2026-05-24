"use client";

import React from "react";
import Navbar from "./ui/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Research from "./sections/Research";
import Experience from "./sections/Experience";
import Publications from "./sections/Publications";
import Contact from "./sections/Contact";
import SmoothScroll from "./ui/SmoothScroll";
import ParticlesBackground from "./ui/ParticlesBackground";


export default function ClientShell(): React.JSX.Element {
  return (
    <SmoothScroll>

      {/* 3D Cosmic background */}
      <ParticlesBackground />

      {/* Main site content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar />

        <main className="w-full">
          <Hero />
          <About />
          <Research />
          <Experience />
          <Publications />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="w-full relative py-12 px-6 bg-[#06091a]/85 backdrop-blur-md">
          {/* Gradient Top Border: transparent to teal to transparent */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2dd4bf]/35 to-transparent" />
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-base font-display font-bold text-slate-200">
                Dr. C. K. Nayak
              </p>
              <p className="text-xs font-sans text-slate-400 mt-1.5">
                Head of School of AI &amp; Data Science · Sri Sri University, Odisha
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-[13px] font-display font-medium text-slate-400">
              <a
                href="https://srisriuniversity.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2dd4bf] transition-colors duration-200"
              >
                Sri Sri University
              </a>
              <a
                href="https://www.linkedin.com/in/dr-chinmaya-kumar-nayak-035252b4/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2dd4bf] transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://scholar.google.com/citations?user=F_kFZrQAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2dd4bf] transition-colors duration-200"
              >
                Google Scholar
              </a>
              <a
                href="https://www.researchgate.net/profile/Chinmaya-Nayak-6"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2dd4bf] transition-colors duration-200"
              >
                ResearchGate
              </a>
            </div>
            <p
              suppressHydrationWarning={true}
              className="text-xs text-slate-500 font-sans"
            >
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
