"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import Card3D from "../ui/Card3D";

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.18;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.28;
    meshRef.current.position.y =
      Math.sin(state.clock.getElapsedTime() * 0.8) * 0.12;
  });

  return (
    <mesh ref={meshRef} scale={1.7}>
      <torusKnotGeometry args={[1, 0.32, 128, 16]} />
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.35}
        speed={1.8}
        roughness={0.1}
        metalness={0.9}
        wireframe
      />
    </mesh>
  );
}

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameRef.current) return;

    const text = nameRef.current.innerText;
    nameRef.current.innerHTML = "";

    const words = text.split(" ");
    words.forEach((word) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "inline-block whitespace-nowrap mr-[0.25em]";

      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.innerText = char;
        charSpan.className = "reveal-text-char";
        wordSpan.appendChild(charSpan);
      });

      nameRef.current?.appendChild(wordSpan);
    });

    const ctx = gsap.context(() => {
      gsap.to(".reveal-text-char", {
        translateY: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.9,
        ease: "power4.out",
        delay: 0.3,
      });
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden"
    >
      {/* Grid + gradient overlays */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-black/60 to-space-black z-[1]" />
      {/* Accent glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-electric-purple/8 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-neon-cyan/6 rounded-full blur-[140px] z-0" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center z-[2]">
        {/* ── Left: Text ── */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
          <div className="hero-fade flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gradient-to-r from-neon-cyan to-transparent" />
            <span className="text-[11px] font-display font-bold tracking-[0.25em] text-neon-cyan uppercase">
              Head of School of AI &amp; Data Science · Sri Sri University
            </span>
          </div>

          {/* BIG NAME */}
          <div className="reveal-text-parent mb-8">
            <h1
              ref={nameRef}
              className="text-[clamp(3rem,9vw,6.5rem)] font-display font-black leading-[0.9] tracking-[-0.035em] text-white"
              style={{
                textShadow:
                  "0 0 80px rgba(139,92,246,0.3), 0 0 140px rgba(6,182,212,0.18)",
              }}
            >
              DR. CHINMAYA KUMAR NAYAK
            </h1>
          </div>

          <p className="hero-fade text-base md:text-lg font-sans text-slate-300/90 max-w-xl mb-6 leading-relaxed">
            Ph.D. in Computer Science &amp; Engineering ·{" "}
            <span className="text-slate-100 font-semibold">17+ years</span> of
            academic excellence · Pioneering research in{" "}
            <span className="text-neon-cyan font-semibold">
              AI, WSN, ML &amp; IoT
            </span>
            .
          </p>

          {/* Credential badges */}
          <div className="hero-fade flex flex-wrap gap-2.5 mb-9">
            {[
              "4 Indian Patents",
              "Data Structures Book",
              "53+ Publications",
              "VSSUT Ph.D.",
            ].map((badge) => (
              <span
                key={badge}
                className="px-3.5 py-1.5 text-[10px] font-display font-semibold tracking-wider text-slate-300 border border-white/15 rounded-full bg-white/5 hover:border-neon-cyan/40 hover:text-neon-cyan/90 transition-all duration-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="hero-fade flex flex-wrap gap-3">
            <button
              suppressHydrationWarning={true}
              onClick={() => scrollTo("contact")}
              className="relative px-9 py-3.5 rounded-full overflow-hidden border border-neon-cyan bg-neon-cyan/10 text-xs font-display font-bold tracking-widest text-neon-cyan uppercase shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:text-space-black transition-all duration-400 group"
            >
              <span className="absolute inset-0 bg-neon-cyan scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 -z-10" />
              Send Message
            </button>
            <button
              suppressHydrationWarning={true}
              onClick={() => scrollTo("research")}
              className="px-8 py-3.5 rounded-full border border-white/15 bg-white/5 text-xs font-display font-bold tracking-widest text-slate-200 uppercase hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              View Research
            </button>
          </div>
        </div>

        {/* ── Right: Photo ── */}
        <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-cyan/20 via-electric-purple/15 to-neon-magenta/10 blur-xl photo-glow" />

            {/* Photo card */}
            <Card3D
              className="relative w-[280px] h-[360px] md:w-[320px] md:h-[420px] p-2.5"
              glowColor="rgba(6,182,212,0.18)"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/dr-nayak.jpg"
                  alt="Dr. Chinmaya Kumar Nayak – Head of AI & Data Science, Sri Sri University"
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 35vw"
                  className="object-cover object-top"
                />
                {/* Bottom gradient overlay for label */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 via-transparent to-transparent" />

                {/* Corner accent lines */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-neon-cyan/70 rounded-tl-sm" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-neon-cyan/70 rounded-tr-sm" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-neon-cyan/70 rounded-bl-sm" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-neon-cyan/70 rounded-br-sm" />

                {/* Label */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="text-[9px] font-display font-bold tracking-[0.2em] text-neon-cyan uppercase mb-0.5">
                    Sri Sri University · Cuttack
                  </p>
                  <p className="text-sm font-display font-bold text-white">
                    Dr. C. K. Nayak
                  </p>
                </div>
              </div>
            </Card3D>

            {/* Floating 3D canvas behind card */}
            <div className="absolute -inset-8 -z-10 opacity-50 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={1.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <FloatingSphere />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
        <span className="text-[9px] font-display font-semibold tracking-[0.2em] text-slate-500 uppercase">
          Scroll
        </span>
        <div className="w-[18px] h-[30px] rounded-full border-2 border-slate-700/80 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-neon-cyan rounded-full shadow-[0_0_6px_#06b6d4]"
          />
        </div>
      </div>
    </section>
  );
}
