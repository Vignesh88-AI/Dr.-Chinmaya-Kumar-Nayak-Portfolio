"use client";

import React, { useEffect, useRef, useMemo, Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import Card3D from "../ui/Card3D";

// Static import for next/image dynamic placeholder blur generation
import drNayakImg from "../../../public/dr-nayak.jpg";

function Constellation(): React.JSX.Element {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 180;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8; // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8; // Z
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle drift and slow rotation of constellation nodes
    pointsRef.current.rotation.y = time * 0.035;
    pointsRef.current.rotation.x = time * 0.015;

    // Drifting coordinates subtly
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      positionAttribute.setX(i, x + Math.sin(time * 0.3 + y) * 0.08);
      positionAttribute.setY(i, y + Math.cos(time * 0.2 + x) * 0.08);
      positionAttribute.setZ(i, z + Math.sin(time * 0.4 + z) * 0.08);
    }
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#2dd4bf"
        size={0.065}
        sizeAttenuation={true}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero(): React.JSX.Element {
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
      gsap.to(".hero-fade", {
        opacity: 1,
        y: 0,
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
      <div className="absolute inset-0 bg-grid-pattern opacity-15 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1e]/40 to-[#0a0f1e] z-[1]" />
      
      {/* Accent glow blobs: Capped at 7% maximum opacity (subtle, premium) */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#818cf8]/7 rounded-full blur-[140px] z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#2dd4bf]/7 rounded-full blur-[160px] z-0" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center z-[2]">
        {/* ── Left: Text ── */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 max-w-3xl">
          <div className="hero-fade flex items-center gap-3 mb-5 opacity-0 translate-y-7">
            <span className="h-px w-12 bg-gradient-to-r from-slate-200/60 to-transparent" />
            <span className="text-[10px] font-display font-bold tracking-[0.25em] text-[#818cf8] uppercase">
              Head of School of AI &amp; Data Science · Sri Sri University
            </span>
          </div>

          {/* BIG NAME (adjusted font size on mobile) */}
          <div className="reveal-text-parent mb-8 max-w-[min(100%,760px)]">
            <h1
              ref={nameRef}
              className="text-[clamp(3rem,7vw,6.5rem)] font-display font-black leading-[0.94] tracking-[-0.06em] text-white max-w-full"
              style={{
                textShadow:
                  "0 0 32px rgba(255,255,255,0.18), 0 0 140px rgba(45,212,191,0.14)",
              }}
            >
              DR. CHINMAYA KUMAR NAYAK
            </h1>
          </div>

          <p className="hero-fade opacity-0 translate-y-7 text-base md:text-lg font-sans text-slate-300/90 max-w-xl mb-6 leading-relaxed">
            Ph.D. in Computer Science &amp; Engineering ·{" "}
            <span className="text-slate-100 font-semibold">17+ years</span> of
            academic excellence · Pioneering research in{" "}
            <span className="text-[#2dd4bf] font-semibold">
              AI, WSN, ML &amp; IoT
            </span>
            .
          </p>

          {/* Credential badges */}
          <div className="hero-fade opacity-0 translate-y-7 flex flex-wrap gap-2.5 mb-9">
            {[
              "4 Indian Patents",
              "Data Structures Book",
              "53+ Publications",
              "VSSUT Ph.D.",
            ].map((badge) => (
              <span
                key={badge}
                className="px-3.5 py-1.5 text-[10px] font-display font-semibold tracking-wider text-slate-300 border border-white/10 rounded-lg bg-white/5 hover:border-[#2dd4bf]/40 hover:text-[#2dd4bf] transition-all duration-300"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTA Buttons: Changed from rounded-full to rounded-lg */}
          <div className="hero-fade opacity-0 translate-y-7 flex flex-wrap gap-3">
            <button
              suppressHydrationWarning={true}
              onClick={() => scrollTo("contact")}
              className="relative px-9 py-3.5 rounded-lg overflow-hidden border border-[#2dd4bf] bg-[#2dd4bf]/10 text-xs font-display font-bold tracking-widest text-[#2dd4bf] uppercase shadow-[0_0_20px_rgba(45,212,191,0.15)] hover:shadow-[0_0_40px_rgba(45,212,191,0.4)] hover:text-[#0a0f1e] transition-all duration-400 group"
            >
              <span className="absolute inset-0 bg-[#2dd4bf] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 -z-10" />
              Send Message
            </button>
            <button
              suppressHydrationWarning={true}
              onClick={() => scrollTo("research")}
              className="px-8 py-3.5 rounded-lg border border-white/10 bg-white/5 text-xs font-display font-bold tracking-widest text-slate-200 uppercase hover:border-white/30 hover:bg-white/10 transition-all duration-300"
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
            className="relative w-full max-w-[360px]"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#2dd4bf]/10 via-[#818cf8]/8 to-[#2dd4bf]/5 blur-xl photo-glow" />

            {/* Photo card (vignette styling instead of harsh corners) */}
            <Card3D
              className="relative w-[280px] h-[360px] md:w-[320px] md:h-[420px] p-2.5"
              glowColor="rgba(45,212,191,0.12)"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={drNayakImg}
                  alt="Dr. Chinmaya Kumar Nayak – Head of AI & Data Science, Sri Sri University"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(max-width: 768px) 80vw, 35vw"
                  className="object-cover object-top"
                />
                
                {/* Vignette Overlay for Photo */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,15,30,0.85)_100%)] mix-blend-multiply pointer-events-none" />

                {/* Bottom gradient overlay for label */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/85 via-transparent to-transparent z-[1]" />

                {/* Label */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="text-[9px] font-display font-bold tracking-[0.2em] text-[#818cf8] uppercase mb-0.5">
                    Sri Sri University · Cuttack
                  </p>
                  <p className="text-sm font-display font-bold text-slate-100">
                    Dr. C. K. Nayak
                  </p>
                </div>
              </div>
            </Card3D>

            {/* Floating 3D Canvas behind card (with Suspense fallback) */}
            <div className="absolute -inset-8 -z-10 opacity-60 pointer-events-none">
              <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
                <Canvas camera={{ position: [0, 0, 4] }} dpr={[1, 1.5]}>
                  <ambientLight intensity={1.2} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} />
                  <Constellation />
                </Canvas>
              </Suspense>
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
            className="w-1 h-2 bg-[#2dd4bf] rounded-full shadow-[0_0_6px_#2dd4bf]"
          />
        </div>
      </div>
    </section>
  );
}
