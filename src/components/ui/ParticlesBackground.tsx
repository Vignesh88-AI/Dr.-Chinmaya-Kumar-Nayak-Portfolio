"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Create random points coordinates
  const count = 1300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18; // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18; // Z
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow rotation
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;

    // Mouse interactive shift (parallax)
    const targetX = (state.pointer.x * viewport.width) / 10;
    const targetY = (state.pointer.y * viewport.height) / 10;

    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      targetX,
      0.05,
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      targetY,
      0.05,
    );

    // Scroll shift effect
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    pointsRef.current.position.z = THREE.MathUtils.lerp(
      pointsRef.current.position.z,
      scrollY * 0.005,
      0.05,
    );
  });

  return (
    <group>
      <Points
        ref={pointsRef}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#7dd3fc"
          size={0.055}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.92}
        />
      </Points>
      <WhiteStars />
      {/* Secondary purple particles for color depth */}
      <PointsCloudPurple />
    </group>
  );
}

function WhiteStars() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const count = 450;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;

    const targetX = (state.pointer.x * viewport.width) / 15;
    const targetY = (state.pointer.y * viewport.height) / 15;

    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      targetX,
      0.03,
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      targetY,
      0.03,
    );

    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    pointsRef.current.position.z = THREE.MathUtils.lerp(
      pointsRef.current.position.z,
      scrollY * 0.004,
      0.05,
    );
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.7}
      />
    </Points>
  );
}

function PointsCloudPurple() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.x = -state.clock.getElapsedTime() * 0.015;
    pointsRef.current.rotation.y = -state.clock.getElapsedTime() * 0.025;

    const targetX = (state.pointer.x * viewport.width) / 15;
    const targetY = (state.pointer.y * viewport.height) / 15;

    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      targetX,
      0.03,
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      targetY,
      0.03,
    );

    const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    // Purple particles zoom in faster to create parallax depth separation
    pointsRef.current.position.z = THREE.MathUtils.lerp(
      pointsRef.current.position.z,
      scrollY * 0.008,
      0.05,
    );
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#c084fc"
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.92}
      />
    </Points>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#030307]">
      <div className="absolute inset-0 bg-radial-overlay z-[1]" />
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-glow-radial rounded-full opacity-55 filter blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.14)_0%,transparent_70%)] rounded-full opacity-50 filter blur-[160px] pointer-events-none z-0" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.95} />
        <pointLight position={[0, 4, 10]} intensity={1.1} color="#85d7ff" />
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
