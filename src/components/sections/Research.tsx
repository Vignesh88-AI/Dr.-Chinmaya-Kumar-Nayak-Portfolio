"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { motion, AnimatePresence, useInView } from "framer-motion";
import * as THREE from "three";
import Card3D from "../ui/Card3D";

function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    const x = Math.sin(value++) * 10000;
    return x - Math.floor(x);
  };
}

function WsnMesh(): React.JSX.Element {
  const ref = useRef<THREE.Points>(null);
  const count = 280;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const random = createSeededRandom(83621);
    for (let i = 0; i < count; i++) {
      const u = random();
      const v = random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);
      arr[i * 3] = Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.elapsedTime * 0.14;
      ref.current.rotation.y = s.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#2dd4bf" // Updated to Soft Teal
        size={0.075}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function AiMesh(): React.JSX.Element {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.22;
    ref.current.rotation.y = s.clock.elapsedTime * 0.18;
    ref.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 2.5) * 0.06);
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[1, 3]} />
      <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function IotMesh(): React.JSX.Element {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (r1.current) {
      r1.current.rotation.x = t * 0.4;
      r1.current.rotation.y = t * 0.2;
    }
    if (r2.current) {
      r2.current.rotation.x = -t * 0.3;
      r2.current.rotation.y = t * 0.45;
    }
    if (r3.current) {
      r3.current.rotation.z = t * 0.35;
      r3.current.rotation.x = t * 0.25;
    }
  });
  return (
    <group>
      <mesh ref={r1}>
        <torusGeometry args={[1, 0.05, 12, 48]} />
        <meshBasicMaterial
          color="#818cf8" // Updated to Periwinkle
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[0.65, 0.04, 12, 36]} />
        <meshBasicMaterial
          color="#2dd4bf" // Updated to Soft Teal
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[0.35, 0.03, 12, 24]} />
        <meshBasicMaterial
          color="#818cf8" // Updated to Periwinkle
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}

function DataMesh(): React.JSX.Element {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.elapsedTime * 0.22;
    ref.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.45) * 0.08;
  });
  return (
    <group ref={ref}>
      {[-0.55, 0, 0.55].map((x, i) =>
        [-0.55, 0, 0.55].map((y, j) =>
          [-0.55, 0, 0.55].map((z, k) => (
            <mesh key={`${i}-${j}-${k}`} position={[x, y, z]}>
              <boxGeometry args={[0.16, 0.16, 0.16]} />
              <meshBasicMaterial
                color={i + j + k === 0 ? "#2dd4bf" : "#818cf8"} // Updated colors
                wireframe
                transparent
                opacity={0.45}
              />
            </mesh>
          )),
        ),
      )}
    </group>
  );
}

interface ResearchArea {
  id: number;
  category: "ai-ds" | "wsn-iot";
  title: string;
  tagline: string;
  desc: string;
  glow: string;
  mesh: React.ReactNode;
}

const areas: ResearchArea[] = [
  {
    id: 1,
    category: "wsn-iot",
    title: "Wireless Sensor Networks",
    tagline: "WSN · Cluster Routing · Localization",
    desc: "Energy-efficient routing protocols, node localization algorithms, and adaptive cluster-head selection in large-scale heterogeneous sensor deployments for smart monitoring and disaster-response systems.",
    glow: "rgba(45,212,191,0.12)",
    mesh: <WsnMesh />,
  },
  {
    id: 2,
    category: "ai-ds",
    title: "Artificial Intelligence & ML",
    tagline: "Deep Learning · Edge AI · Prediction Models",
    desc: "Developing lightweight neural architectures for resource-constrained edge devices, applied in healthcare diagnostics, smart agriculture, and predictive maintenance.",
    glow: "rgba(129,140,248,0.12)",
    mesh: <AiMesh />,
  },
  {
    id: 3,
    category: "wsn-iot",
    title: "Internet of Things (IoT)",
    tagline: "Smart Devices · Security · Cyber-Physical Systems",
    desc: "Architecting zero-trust security frameworks for cognitive smart gateways, enabling secure device-to-cloud communication and intelligent handshake protocols at the network edge.",
    glow: "rgba(129,140,248,0.12)",
    mesh: <IotMesh />,
  },
  {
    id: 4,
    category: "ai-ds",
    title: "Data Science & Big Data",
    tagline: "Analytics · Stream Processing · Clustering",
    desc: "Distributed processing frameworks for multi-sensor streaming arrays, heuristic spatial clustering for pattern extraction in high-velocity real-world datasets.",
    glow: "rgba(45,212,191,0.12)",
    mesh: <DataMesh />,
  },
];

type FilterCategory = "all" | "ai-ds" | "wsn-iot";

export default function Research(): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState<FilterCategory>("all");

  const tabs: { id: FilterCategory; label: string }[] = [
    { id: "all", label: "All Expertise" },
    { id: "ai-ds", label: "AI & Data Science" },
    { id: "wsn-iot", label: "WSN & IoT" },
  ];

  const filteredAreas = useMemo(() => {
    if (activeTab === "all") return areas;
    return areas.filter((area) => area.category === activeTab);
  }, [activeTab]);

  return (
    <section
      id="research"
      className="relative py-24 px-6 flex items-center justify-center overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(45,212,191,0.015)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(129,140,248,0.015)_0%,transparent_70%)] pointer-events-none z-0" />

      <div
        ref={ref}
        className="w-full max-w-6xl z-[2] flex flex-col items-center"
      >
        {/* Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#2dd4bf]" />
            <span className="text-[11px] font-display font-bold tracking-[0.22em] text-[#2dd4bf] uppercase">
              Core Expertise
            </span>
            <span className="h-px w-8 bg-[#2dd4bf]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-4"
          >
            Research &amp; Innovation Areas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-[15px] max-w-lg mx-auto leading-relaxed"
          >
            Bridging computer science theory with intelligent systems to solve
            complex, real-world challenges.
          </motion.p>
        </div>

        {/* Dynamic Filter Tabs */}
        <div className="flex justify-center gap-1.5 mb-8 glassmorphism p-1 rounded-full border border-white/5 shadow-2xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                suppressHydrationWarning={true}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-[10px] font-display font-bold tracking-wider uppercase rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#2dd4bf] to-[#818cf8] text-[#0a0f1e] shadow-[0_0_12px_rgba(45,212,191,0.25)]"
                    : "text-slate-400 hover:text-slate-100 bg-transparent"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filtered Cards List (uses flex elements that wrap on mobile to avoid layout cramps) */}
        <motion.div
          layout
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAreas.map((area, i) => (
              <motion.div
                layout
                key={area.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full"
              >
                <Card3D
                  className="w-full min-h-[380px] p-6 lg:p-8 flex flex-col justify-between"
                  glowColor={area.glow}
                >
                  <div className="flex flex-col lg:flex-row gap-6 h-full items-center w-full">
                    {/* Left: Text Content with expanded breathing room */}
                    <div className="w-full lg:w-7/12 flex flex-col justify-center gap-3">
                      <span className="text-[9px] font-display font-bold tracking-[0.22em] text-[#818cf8] uppercase">
                        0{area.id} / Research
                      </span>
                      <div>
                        <h3 className="text-xl font-display font-black text-white leading-tight mb-2 tracking-tight">
                          {area.title}
                        </h3>
                        <p className="text-[10px] font-display font-semibold text-[#2dd4bf] tracking-wider mb-4 uppercase">
                          {area.tagline}
                        </p>
                        <p className="text-[13px] font-sans text-slate-300 leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right: Three.js visualizer */}
                    <div className="w-full lg:w-5/12 h-[180px] lg:h-[220px] relative flex-shrink-0">
                      <div className="w-full h-full">
                        <Canvas
                          camera={{ position: [0, 0, 2.3] }}
                          gl={{ alpha: true }}
                          dpr={[1, 1.5]}
                        >
                          <ambientLight intensity={1.5} />
                          {area.mesh}
                        </Canvas>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
