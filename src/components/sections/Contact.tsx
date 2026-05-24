"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  Award,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Card3D from "../ui/Card3D";

const socialLinks = [
  {
    name: "LinkedIn Profile",
    detail: "Professional network & industry connections",
    url: "https://www.linkedin.com/in/dr-chinmaya-kumar-nayak-035252b4/",
    accent: "rgba(45,212,191,0.12)",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Sri Sri University Profile",
    detail: "Official institutional credentials & academic page",
    url: "https://srisriuniversity.edu.in/faculty/dr-chinmaya-kumar-nayak/",
    accent: "rgba(245,158,11,0.12)", // Warm Amber highlight for university profile!
    icon: <Award className="w-5 h-5" />,
  },
  {
    name: "Google Scholar",
    detail: "Publications, citations & research impact metrics",
    url: "https://scholar.google.com/citations?user=F_kFZrQAAAAJ&hl=en",
    accent: "rgba(129,140,248,0.12)",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    name: "ResearchGate Profile",
    detail: "Research papers, projects & collaboration network",
    url: "https://www.researchgate.net/profile/Chinmaya-Nayak-6",
    accent: "rgba(45,212,191,0.12)",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a12.52 12.52 0 0 0-.219 2.217v.976h-2.617v4.077h2.617v13.246h4.302V9.515h2.8l.42-4.077h-3.22V4.71c0-.553.113-.925.34-1.116.226-.192.601-.287 1.124-.287h1.756V.048L19.586 0zm-9.198 5.438v.976H7.771v4.077h2.617v13.246h4.302V10.491h2.8l.42-4.077h-3.22V5.71c0-.553.113-.925.34-1.116.226-.192.601-.287 1.124-.287h1.756V.048L16.203.015c-.97 0-1.733.18-2.289.537-.556.357-.95.894-1.182 1.61-.232.717-.35 1.692-.35 2.927v.349h-.994z" />
      </svg>
    ),
  },
];

export default function Contact(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    try {
      // Mock API call to simulate form submission
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.03) {
            resolve(true);
          } else {
            reject(new Error("Form submission error"));
          }
        }, 1500);
      });
      setSubmitStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch (err) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Form inputs focus state with ring-2 ring-teal-400/50
  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2dd4bf]/60 focus:ring-2 focus:ring-[#2dd4bf]/50 focus:bg-white/7 transition-all duration-300";

  return (
    <section
      id="contact"
      className="relative py-24 px-6 flex items-center justify-center overflow-hidden scroll-mt-20"
    >
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.02)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.02)_0%,transparent_70%)] pointer-events-none z-0" />

      <div
        ref={containerRef}
        className="w-full max-w-6xl z-[2] flex flex-col items-center"
      >
        {/* Title */}
        <div className="w-full text-center mb-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#2dd4bf]" />
            <span className="text-[11px] font-display font-bold tracking-[0.22em] text-[#2dd4bf] uppercase">
              Get In Touch
            </span>
            <span className="h-px w-8 bg-[#2dd4bf]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-4"
          >
            Establish a Connection
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 font-sans text-sm md:text-base max-w-lg leading-relaxed"
          >
            Open to research collaborations, doctoral mentorship, conference
            invitations, and academic partnerships.
          </motion.p>
        </div>

        {/* Spacious, premium responsive 2-column layout (info left, form right) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ── Left: Contact info + Social links (5/12 width) ── */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Office details */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card3D
                className="p-6 w-full flex flex-col gap-5"
                glowColor="rgba(129,140,248,0.12)"
              >
                <h3 className="text-base font-display font-bold text-white">
                  Institutional Office
                </h3>

                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#2dd4bf] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-200 text-[13px]">
                        School of AI &amp; Data Science
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                        Sri Sri University, Bidyadharpur-Arilo,
                        <br />
                        Cuttack, Odisha – 754 006
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#2dd4bf] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-200 text-[13px]">
                        Email
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        chinmaya.n@srisriuniversity.edu.in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#2dd4bf] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-200 text-[13px]">
                        Phone
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        +91 98533 17125
                      </p>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>

            {/* Social link cards */}
            {socialLinks.map((link, i) => (
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.08 }}
                className="block w-full"
                aria-label={link.name}
              >
                <Card3D
                  className="p-5 flex items-center gap-4 w-full hover:border-[#2dd4bf]/30 transition-colors duration-300"
                  glowColor={link.accent}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#2dd4bf] flex-shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-display font-bold text-white">
                      {link.name}
                    </h4>
                    <p className="text-[11px] font-sans text-slate-400 mt-0.5 truncate">
                      {link.detail}
                    </p>
                  </div>
                </Card3D>
              </motion.a>
            ))}
          </div>

          {/* ── Right: Contact Form (7/12 width) ── */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card3D
                className="p-8 md:p-10 w-full"
                glowColor="rgba(45,212,191,0.12)"
              >
                <h3 className="text-lg font-display font-bold text-white mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-[11px] font-display font-semibold tracking-wider text-slate-400 uppercase"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass}
                        suppressHydrationWarning={true}
                        aria-label="Full name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-[11px] font-display font-semibold tracking-wider text-slate-400 uppercase"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass}
                        suppressHydrationWarning={true}
                        aria-label="Email address"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="subject"
                      className="text-[11px] font-display font-semibold tracking-wider text-slate-400 uppercase"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Research Collaboration / Inquiry"
                      className={inputClass}
                      suppressHydrationWarning={true}
                      aria-label="Message subject"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-[11px] font-display font-semibold tracking-wider text-slate-400 uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Dear Dr. Nayak, I would like to discuss..."
                      className={`${inputClass} resize-none`}
                      suppressHydrationWarning={true}
                      aria-label="Message body"
                    />
                  </div>

                  {/* Submit Button with Dynamic success and error states */}
                  <button
                    suppressHydrationWarning={true}
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    aria-label="Send message"
                    className={`relative overflow-hidden w-full py-4 rounded-xl text-xs font-display font-bold tracking-[0.18em] uppercase transition-all duration-500 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 group cursor-pointer ${
                      submitStatus === "idle"
                        ? "bg-gradient-to-r from-[#2dd4bf] to-[#818cf8] text-[#0a0f1e] hover:shadow-[0_0_30px_rgba(45,212,191,0.35)]"
                        : submitStatus === "submitting"
                          ? "bg-slate-700 text-slate-300"
                          : submitStatus === "success"
                            ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                            : "bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.35)]"
                    }`}
                  >
                    {submitStatus === "submitting" ? (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
                    ) : submitStatus === "success" ? (
                      <>
                        <span>Message Sent Successfully</span>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </>
                    ) : submitStatus === "error" ? (
                      <>
                        <span>Submission Failed</span>
                        <XCircle className="w-4 h-4 text-white" />
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm font-sans text-emerald-400 text-center"
                      role="status"
                      aria-live="polite"
                    >
                      ✓ Message sent successfully. Dr. Nayak will respond
                      shortly.
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-sm font-sans text-rose-400 text-center"
                      role="status"
                      aria-live="polite"
                    >
                      ✕ Failed to send message. Please check your network or try again.
                    </motion.div>
                  )}
                </form>
              </Card3D>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
