"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Card3D from "../ui/Card3D";

type Category = "all" | "patents" | "books" | "papers";

interface PubItem {
  id: number;
  category: Category;
  title: string;
  detail: string;
  source?: string;
  tag: string;
  badgeColor: string;
  extraInfo?: string;
}

const publications: PubItem[] = [
  {
    id: 1,
    category: "books",
    title: "Data Structures Using C",
    detail:
      "A widely adopted academic textbook co-authored for undergraduate Computer Science and Engineering students, covering core structures, algorithms, memory management and practical code examples.",
    source: "Academic Press, India",
    tag: "Book",
    badgeColor: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  },
  {
    id: 2,
    category: "patents",
    title:
      "An IoT-Based Intelligent Landslide Detection & Early Warning System",
    detail:
      "A multi-node sensor array that monitors slope stability and issues predictive alerts using adaptive data fusion and edge intelligence.",
    source: "Indian Patent Application",
    tag: "Patent",
    badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    id: 3,
    category: "patents",
    title: "Energy-Efficient Adaptive Clustering Protocol for Smart Cities",
    detail:
      "A wireless sensor network routing protocol that balances load and extends battery life for large-scale urban deployments.",
    source: "Indian Patent Application",
    tag: "Patent",
    badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    id: 4,
    category: "patents",
    title:
      "Smart Wearable Health Tracker with Integrated Local Machine Learning",
    detail:
      "A wearable medical IoT solution that performs real-time arrhythmia analysis at the edge without cloud dependency.",
    source: "Indian Patent Application",
    tag: "Patent",
    badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    id: 5,
    category: "patents",
    title:
      "AI-Driven Distributed Traffic Management & Volume Classification Platform",
    detail:
      "An edge-aware system that optimizes traffic signal timing through computer vision and adaptive volume prediction.",
    source: "Indian Patent Application",
    tag: "Patent",
    badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    id: 6,
    category: "papers",
    title: "Energy-Aware Cluster Head Selection for Wireless Sensor Networks",
    detail:
      "A published study on optimizing cluster leadership with energy balancing strategies for long-term WSN deployments.",
    source: "IEEE Transactions on Green Communications, 2023",
    tag: "Research Paper",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    id: 7,
    category: "papers",
    title: "IoT-Based Landslide Early Warning System for Smart Terrain",
    detail:
      "A high-impact paper outlining a sensor-driven landslide alert system using edge analytics and adaptive communication.",
    source: "Elsevier Sensors, 2022",
    tag: "Research Paper",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    id: 8,
    category: "papers",
    title: "Cognitive Edge Architectures for Multi-Sensor Environments in IoT",
    detail:
      "A journal publication presenting a trust-based edge architecture for distributed sensor systems.",
    source: "IEEE IoT Research Letters, 2023",
    tag: "Research Paper",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    id: 9,
    category: "papers",
    title: "Adaptive Machine Learning for Smart City Sensor Analytics",
    detail:
      "An investigation into machine learning pipelines that deliver real-time insights from urban IoT deployments.",
    source: "International Journal of Smart Cities, 2023",
    tag: "Research Paper",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    id: 10,
    category: "papers",
    title: "Trust-Based Authentication for Secure Edge IoT Systems",
    detail:
      "A security-focused publication on layered authentication mechanisms for distributed IoT networks.",
    source: "IEEE Internet of Things Journal, 2021",
    tag: "Research Paper",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    id: 11,
    category: "papers",
    title: "Data-Driven Smart Agriculture with Wireless Sensor Networks",
    detail:
      "A study exploring IoT sensor integration and predictive analytics for precision farming applications.",
    source: "ACM Transactions on Sensor Networks, 2020",
    tag: "Research Paper",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    id: 12,
    category: "papers",
    title: "Edge AI for Healthcare Monitoring Systems",
    detail:
      "A publication on edge intelligence architectures for remote patient monitoring and early-warning analytics.",
    source: "Journal of Ambient Intelligence, 2024",
    tag: "Research Paper",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
];

export default function Publications() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All Works" },
    { id: "patents", label: "Patents (4)" },
    { id: "books", label: "Books" },
    { id: "papers", label: "Research Papers" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? publications
      : publications.filter((pub) => pub.category === activeCategory);

  return (
    <section
      id="publications"
      className="relative min-h-screen py-32 px-4 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0" />
      <div className="absolute top-16 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-24 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none mix-blend-screen" />

      <div
        ref={containerRef}
        className="w-full max-w-6xl z-[2] flex flex-col items-center"
      >
        <div className="w-full text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="h-[2px] w-8 bg-neon-cyan shadow-[0_0_10px_rgba(6,182,212,0.2)]" />
            <span className="text-[11px] font-display font-bold tracking-[0.28em] text-neon-cyan uppercase">
              Publications
            </span>
            <span className="h-[2px] w-8 bg-neon-cyan shadow-[0_0_10px_rgba(6,182,212,0.2)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-5"
          >
            Publications & Patented Research
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed"
          >
            A legacy of books, published peer-reviewed articles, and patented
            industrial solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full"
          >
            <div className="rounded-[32px] border border-white/10 bg-space-black/80 p-6 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <p className="text-4xl font-display font-black text-neon-cyan">
                53
              </p>
              <p className="mt-3 text-xs font-display font-semibold tracking-[0.28em] uppercase text-slate-400">
                Publications
              </p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-space-black/80 p-6 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <p className="text-4xl font-display font-black text-electric-purple">
                13,000+
              </p>
              <p className="mt-3 text-xs font-display font-semibold tracking-[0.28em] uppercase text-slate-400">
                Reads
              </p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-space-black/80 p-6 text-center shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
              <p className="text-4xl font-display font-black text-neon-magenta">
                400+
              </p>
              <p className="mt-3 text-xs font-display font-semibold tracking-[0.28em] uppercase text-slate-400">
                Citations
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <a
              href="https://www.researchgate.net/profile/Chinmaya-Nayak-6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-neon-cyan px-7 py-3 text-sm font-display font-bold uppercase tracking-[0.18em] text-space-black shadow-[0_0_30px_rgba(6,182,212,0.2)] transition duration-300 hover:-translate-y-0.5"
            >
              View All 53 Publications on ResearchGate
            </a>
            <a
              href="https://scholar.google.com/citations?user=F_kFZrQAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-display font-semibold uppercase tracking-[0.18em] text-slate-200 transition duration-300 hover:border-neon-cyan hover:text-neon-cyan"
            >
              View on Google Scholar
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 mt-12 glassmorphism p-1.5 rounded-full border border-white/5 shadow-2xl">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                suppressHydrationWarning={true}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 text-xs font-display font-semibold tracking-wider uppercase rounded-full transition-all duration-300 focus:outline-none ${
                  isActive
                    ? "bg-gradient-to-r from-neon-cyan to-electric-purple text-space-black shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                    : "text-slate-400 hover:text-slate-100 bg-transparent"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((pub) => (
              <motion.div
                layout
                key={pub.id}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <Card3D
                  className="w-full p-8 bg-space-black/80 border border-white/10 backdrop-blur-xl shadow-[0_35px_80px_rgba(0,0,0,0.2)]"
                  glowColor={
                    pub.category === "patents"
                      ? "rgba(6, 182, 212, 0.18)"
                      : pub.category === "books"
                        ? "rgba(217, 70, 239, 0.18)"
                        : "rgba(139, 92, 246, 0.18)"
                  }
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-[10px] font-display font-bold tracking-[0.22em] uppercase ${pub.badgeColor}`}
                      >
                        {pub.tag}
                      </span>
                      {pub.source && (
                        <span className="text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {pub.source}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-display font-black text-white leading-tight tracking-[-0.03em]">
                        {pub.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-base font-sans text-slate-300 leading-relaxed max-w-3xl">
                        {pub.detail}
                      </p>
                    </div>

                    {pub.extraInfo && (
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm font-sans text-slate-300">
                        {pub.extraInfo}
                      </div>
                    )}
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
