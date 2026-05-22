"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import Card3D from "../ui/Card3D";

function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    const x = Math.sin(value++) * 10000;
    return x - Math.floor(x);
  };
}

function WsnMesh() {
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
        color="#06b6d4"
        size={0.07}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function AiMesh() {
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
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.7} />
    </mesh>
  );
}

function IotMesh() {
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
          color="#d946ef"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[0.65, 0.04, 12, 36]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[0.35, 0.03, 12, 24]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

function DataMesh() {
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
                color={i + j + k === 0 ? "#06b6d4" : "#8b5cf6"}
                wireframe
                transparent
                opacity={0.5}
              />
            </mesh>
          )),
        ),
      )}
    </group>
  );
}

const areas = [
  {
    title: "Wireless Sensor Networks",
    tagline: "WSN · Cluster Routing · Localization",
    desc: "Energy-efficient routing protocols, node localization algorithms, and adaptive cluster-head selection in large-scale heterogeneous sensor deployments for smart monitoring and disaster-response systems.",
    glow: "rgba(6,182,212,0.1)",
    mesh: <WsnMesh />,
  },
  {
    title: "Artificial Intelligence & ML",
    tagline: "Deep Learning · Edge AI · Prediction Models",
    desc: "Developing lightweight neural architectures for resource-constrained edge devices, applied in healthcare diagnostics, smart agriculture, and predictive maintenance.",
    glow: "rgba(139,92,246,0.1)",
    mesh: <AiMesh />,
  },
  {
    title: "Internet of Things (IoT)",
    tagline: "Smart Devices · Security · Cyber-Physical Systems",
    desc: "Architecting zero-trust security frameworks for cognitive smart gateways, enabling secure device-to-cloud communication and intelligent handshake protocols at the network edge.",
    glow: "rgba(217,70,239,0.1)",
    mesh: <IotMesh />,
  },
  {
    title: "Data Science & Big Data",
    tagline: "Analytics · Stream Processing · Clustering",
    desc: "Distributed processing frameworks for multi-sensor streaming arrays, heuristic spatial clustering for pattern extraction in high-velocity real-world datasets.",
    glow: "rgba(6,182,212,0.1)",
    mesh: <DataMesh />,
  },
];

export default function Research() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="research"
      className="relative py-32 px-6 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(6,182,212,0.02)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(217,70,239,0.02)_0%,transparent_70%)] pointer-events-none z-0" />

      <div
        ref={ref}
        className="w-full max-w-6xl z-[2] flex flex-col items-center"
      >
        {/* Title */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-neon-cyan" />
            <span className="text-[11px] font-display font-bold tracking-[0.22em] text-neon-cyan uppercase">
              Core Expertise
            </span>
            <span className="h-px w-8 bg-neon-cyan" />
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

        {/* Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-7">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-[340px] w-full"
            >
              <Card3D
                className="w-full h-full p-7 flex flex-col justify-between"
                glowColor={area.glow}
              >
                <div className="grid grid-cols-12 gap-4 h-full items-center">
                  {/* Left */}
                  <div className="col-span-7 flex flex-col justify-center gap-3 h-full py-2">
                    <span className="text-[9px] font-display font-bold tracking-[0.22em] text-slate-500 uppercase">
                      0{i + 1} / Research
                    </span>
                    <div>
                      <h3 className="text-[1.05rem] font-display font-bold text-white leading-snug mb-1">
                        {area.title}
                      </h3>
                      <p className="text-[10px] font-display font-semibold text-neon-cyan/70 tracking-wider mb-3">
                        {area.tagline}
                      </p>
                      <p className="text-[12.5px] font-sans text-slate-400 leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right: Canvas */}
                  <div className="col-span-5 w-full h-[180px] relative">
                    <div className="w-full h-full">
                      <Canvas
                        camera={{ position: [0, 0, 2.5] }}
                        gl={{ alpha: true }}
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
        </div>
      </div>
    </section>
  );
}
