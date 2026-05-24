"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g., "rgba(45, 212, 191, 0.15)"
}

export default function Card3D({
  children,
  className = "",
  glowColor = "rgba(45, 212, 191, 0.12)",
}: Card3DProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position relative to the card dimensions (values from -0.5 to 0.5)
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(rotateXVal, springConfig);
  const rotateY = useSpring(rotateYVal, springConfig);

  // Map coordinates to degrees of rotation (up to 10 degrees)
  const rotationX = useTransform(rotateX, [-0.5, 0.5], [10, -10]);
  const rotationY = useTransform(rotateY, [-0.5, 0.5], [-10, 10]);

  // Glow position variables
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card boundaries
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouse position to percentages (-0.5 to 0.5)
    const relativeX = mouseX / width - 0.5;
    const relativeY = mouseY / height - 0.5;

    rotateXVal.set(relativeY); // Mouse moving up/down tilts around X axis
    rotateYVal.set(relativeX); // Mouse moving left/right tilts around Y axis

    // Update glow coordinate values
    glowX.set(mouseX);
    glowY.set(mouseY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotationX,
        rotateY: rotationY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl border transition-all duration-300 ${
        hovered
          ? "border-[#2dd4bf]/35 bg-slate-800/60 -translate-y-1 shadow-[0_8px_30px_rgba(45,212,191,0.15)]"
          : "border-slate-800/60 bg-slate-800/50"
      } ${className}`}
    >
      {/* Light sweep / radial glow background */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle 180px at ${x}px ${y}px, ${glowColor}, transparent 80%)`,
          ),
        }}
      />

      {/* Internal wrapper for content to apply transform depth (3D Pop-out) */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="relative w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
