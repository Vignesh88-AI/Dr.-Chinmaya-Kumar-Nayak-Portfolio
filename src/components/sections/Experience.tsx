"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Card3D from "../ui/Card3D";

interface TimelineItemProps {
  year: string;
  role: string;
  org: string;
  location: string;
  desc: string;
  highlight?: string;
  index: number;
}

function TimelineItem({
  year,
  role,
  org,
  location,
  desc,
  highlight,
  index,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRight = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-14 last:mb-0 ${isRight ? "md:flex-row-reverse" : ""}`}
    >
      {/* Center dot + connector */}
      <div className="absolute left-4 md:left-1/2 top-5 md:top-auto -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            delay: 0.1,
          }}
          className="w-5 h-5 rounded-full bg-space-black border-2 border-neon-cyan flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.35)]"
        >
          <div className="w-2 h-2 rounded-full bg-neon-cyan" />
        </motion.div>
      </div>

      {/* Card */}
      <div className="w-full md:w-[45%] pl-10 md:pl-0">
        <motion.div
          initial={{ opacity: 0, x: isRight ? 40 : -40, y: 20 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.15 + index * 0.05,
          }}
        >
          <Card3D
            className="p-7 md:p-8 bg-[#02070f]/80 border border-white/10 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
            glowColor="rgba(6,182,212,0.08)"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-display font-bold tracking-[0.2em] uppercase text-space-black bg-gradient-to-r from-neon-cyan to-electric-purple shadow-[0_0_20px_rgba(6,182,212,0.16)]">
                {year}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[10px] font-display font-semibold tracking-[0.18em] text-slate-300 border border-slate-700">
                {location || "Professional Experience"}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-display font-black text-white leading-tight mb-3 tracking-[-0.03em]">
              {role}
            </h3>
            <p className="text-sm font-display font-semibold text-neon-cyan mb-4">
              {org}
            </p>
            <p className="text-sm font-sans text-slate-300 leading-relaxed mb-5">
              {desc}
            </p>
            {highlight && (
              <div className="inline-flex items-center gap-2 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/10 px-4 py-2 text-[11px] font-display font-semibold uppercase tracking-[0.18em] text-neon-cyan shadow-[0_0_12px_rgba(6,182,212,0.08)]">
                {highlight}
              </div>
            )}
          </Card3D>
        </motion.div>
      </div>

      {/* Spacer on the other side (desktop) */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
}

const timeline = [
  {
    year: "2023 – Present",
    role: "Head of School of AI & Data Science & Associate Professor",
    org: "Sri Sri University",
    location: "Cuttack, Odisha",
    desc: "Leading the School of AI & Data Science. Shaping curriculum in Deep Learning, Machine Learning, IoT and Data Science. Driving research initiatives and academic excellence.",
  },
  {
    year: "2021 – 2023",
    role: "Associate Professor & Faculty of Emerging Technologies",
    org: "Sri Sri University",
    location: "Cuttack, Odisha",
    desc: "Established emerging technology initiatives. Delivered advanced modules in Machine Learning, IoT Systems, and Data Analytics. Supervised master's dissertations and mentored collaborative research projects.",
    highlight: "Best Teaching Award 2020",
  },
  {
    year: "2009 – 2021",
    role: "Assistant Professor & Ph.D. Scholar",
    org: "Gandhi Institute for Technological Advancement (GIET)",
    location: "Rayagada, Odisha",
    desc: "Completed Ph.D. in Computer Science & Engineering with a focus on energy-efficient cluster routing for Wireless Sensor Networks. Taught Algorithms, Data Structures, and IoT systems.",
    highlight: "Sandeep Mohapatra Memorial Medal",
  },
  {
    year: "2007 – 2008",
    role: "Lecturer & Senior Faculty",
    org: "Pragati Institute of Engineering and Technology (PIET)",
    location: "Odisha, India",
    desc: "Taught Data Structures, C Programming, Database Management, and Algorithms across undergraduate courses. Authored the widely-adopted textbook 'Data Structures Using C'.",
    highlight: "Co-authored academic textbook",
  },
  {
    year: "2006",
    role: "Software Engineer",
    org: "SR Infotech India",
    location: "Bhubaneswar, Odisha",
    desc: "Contributed to enterprise software development projects and gained early industry experience before moving into academia.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="relative py-32 px-6 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] z-0" />
      <div className="absolute top-1/2 right-1/4 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(139,92,246,0.02)_0%,transparent_70%)] pointer-events-none z-0" />

      <div
        ref={ref}
        className="w-full max-w-4xl z-[2] flex flex-col items-center"
      >
        {/* Title */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-label justify-center mb-4"
          >
            <span className="section-divider" />
            <span>Milestones</span>
            <span className="section-divider" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="section-title mb-4"
          >
            Experience &amp; Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-[15px] max-w-lg mx-auto leading-relaxed"
          >
            A 17-year journey of academic leadership, high-impact research, and
            institutional development.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative w-full">
          {/* Vertical gradient line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-electric-purple to-neon-magenta/20 -translate-x-1/2 z-0" />

          {timeline.map((item, i) => (
            <TimelineItem key={i} index={i} {...item} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 grid gap-4 lg:grid-cols-3"
          >
            {[
              "Sandeep Mohapatra Memorial Medal (2015 & 2016) by Institution of Engineers (India)",
              "Best Teaching Award 2020",
              "Research Excellence Award 2020",
            ].map((achievement) => (
              <Card3D
                key={achievement}
                className="p-6 bg-[#02070f]/80 border border-white/10 backdrop-blur-xl"
                glowColor="rgba(139,92,246,0.14)"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_12px_rgba(6,182,212,0.3)]" />
                  <span className="text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Achievement
                  </span>
                </div>
                <p className="text-sm md:text-base font-display font-semibold text-slate-100 leading-snug">
                  {achievement}
                </p>
              </Card3D>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
