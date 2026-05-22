import dynamic from "next/dynamic";
import Navbar from "../components/ui/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Publications from "../components/sections/Publications";
import Contact from "../components/sections/Contact";

const SmoothScroll = dynamic(() => import("../components/ui/SmoothScroll"), {
  ssr: false,
});
const ParticlesBackground = dynamic(
  () => import("../components/ui/ParticlesBackground"),
  { ssr: false }
);
const Research = dynamic(() => import("../components/sections/Research"), {
  ssr: false,
});

export default function Home() {
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
        <footer className="w-full border-t border-white/[0.04] py-10 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-display font-semibold text-slate-300">
                Dr. Chinmaya Kumar Nayak
              </p>
              <p className="text-xs font-sans text-slate-500 mt-1">
                Head of School of AI &amp; Data Science · Sri Sri University, Odisha
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs font-display text-slate-500">
              <a href="https://srisriuniversity.edu.in/" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors duration-200">Sri Sri University</a>
              <a href="https://www.linkedin.com/in/dr-chinmaya-kumar-nayak-035252b4/" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors duration-200">LinkedIn</a>
              <a href="https://scholar.google.com/citations?user=F_kFZrQAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors duration-200">Google Scholar</a>
              <a href="https://www.researchgate.net/profile/Chinmaya-Nayak-6" target="_blank" rel="noopener noreferrer" className="hover:text-neon-cyan transition-colors duration-200">ResearchGate</a>
            </div>
            <p suppressHydrationWarning={true} className="text-xs text-slate-600 font-sans">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
