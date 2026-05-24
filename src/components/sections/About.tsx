"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Card3D from "../ui/Card3D";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: CounterProps): React.JSX.Element {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const totalFrames = Math.min(60, duration * 60);
    const increment = value / totalFrames;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      start += increment;
      if (frame >= totalFrames) {
        setCount(value);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span
      ref={ref}
      className="font-display text-4xl md:text-5xl font-black text-white tracking-tight"
    >
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 17,
    suffix: "+",
    label: "Years in Academia",
    sub: "Teaching, Research & Academic Leadership",
    color: "rgba(45, 212, 191, 0.12)",
    accent: "#2dd4bf",
  },
  {
    value: 4,
    suffix: "",
    label: "Indian Patents",
    sub: "Filed & Granted – IoT, AI, WSN & Smart Systems",
    color: "rgba(129, 140, 248, 0.12)",
    accent: "#818cf8",
  },
  {
    value: 1,
    suffix: "",
    label: "Book Authored",
    sub: '"Data Structures Using C" – Used across universities',
    color: "rgba(245, 158, 11, 0.12)",
    accent: "#f59e0b", // Sparingly used Warm Amber for textbook highlight
  },
  {
    value: 1000,
    suffix: "+",
    label: "Students Mentored",
    sub: "UG, PG & Doctoral researchers guided",
    color: "rgba(45, 212, 191, 0.12)",
    accent: "#2dd4bf",
  },
];

export default function About(): React.JSX.Element {
  const textRef = useRef<HTMLDivElement>(null);
  const inView = useInView(textRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="relative py-24 px-6 flex items-center justify-center overflow-hidden scroll-mt-20"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vw] bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.04)_0%,transparent_65%)] pointer-events-none z-0" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-[2]">
        {/* ── Left: Bio ── */}
        <div ref={textRef} className="lg:col-span-6 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-px w-8 bg-[#818cf8]" />
            <span className="text-[11px] font-display font-bold tracking-[0.22em] text-[#818cf8] uppercase">
              Biography
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.6rem] font-display font-black tracking-tight text-white mb-6 leading-tight"
          >
            Shaping the Future of AI &amp; Data Science Education
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5 text-[15px] font-sans text-slate-300/90 leading-[1.8]"
          >
            <p>
              Dr. Chinmaya Kumar Nayak is a distinguished academic leader
              serving as{" "}
              <span className="text-slate-100 font-semibold">
                Head of the School of AI &amp; Data Science
              </span>{" "}
              at Sri Sri University, Odisha. Holding a{" "}
              <span className="text-[#2dd4bf] font-medium">
                Ph.D. in Computer Science &amp; Engineering
              </span>{" "}
              from VSSUT Burla, he brings over 17 years of deep expertise in
              teaching, research, and institutional leadership.
            </p>
            <p>
              His research spans{" "}
              <span className="text-slate-100 font-medium">
                Wireless Sensor Networks
              </span>
              ,{" "}
              <span className="text-slate-100 font-medium">
                Artificial Intelligence
              </span>
              , Machine Learning, IoT, and Big Data Analytics — disciplines at
              the core of tomorrow's intelligent infrastructure. He has authored
              the widely-used textbook{" "}
              <span className="text-[#818cf8] font-semibold italic">
                "Data Structures Using C"
              </span>{" "}
              and holds{" "}
              <span className="text-[#2dd4bf] font-semibold">
                4 Indian Patents
              </span>{" "}
              across smart systems, healthcare IoT, and edge AI.
            </p>
            <p>
              A recipient of multiple{" "}
              <span className="text-slate-100 font-medium">
                Best Teacher &amp; Research Excellence Awards
              </span>
              , Dr. Nayak is passionate about bridging theoretical knowledge
              with real-world impact — mentoring students, leading collaborative
              research teams, and fostering innovation at every level.
            </p>
          </motion.div>

          {/* Highlight pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap gap-2 mt-7"
          >
            {[
              "WSN",
              "Artificial Intelligence",
              "Machine Learning",
              "IoT",
              "Big Data",
              "Edge Computing",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-display font-semibold tracking-wider text-[#2dd4bf]/80 border border-[#2dd4bf]/15 rounded-full bg-[#2dd4bf]/5"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Stat Cards (now use bg-slate-800/50 borders and hover translateY) ── */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-48"
            >
              <Card3D
                className="w-full h-full p-6 flex flex-col justify-between"
                glowColor={stat.color}
              >
                <div className="flex justify-end">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: stat.accent,
                      boxShadow: `0 0 8px ${stat.accent}`,
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5 mb-1.5">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm font-display font-bold text-slate-200 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-[11px] font-sans text-slate-400 leading-snug">
                    {stat.sub}
                  </p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
