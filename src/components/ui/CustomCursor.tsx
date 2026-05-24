"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor(): React.JSX.Element | null {
  const [cursorType, setCursorType] = useState<
    "default" | "hover" | "drag" | "view"
  >("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is desktop
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest interactive element or elements with custom cursor attributes
      const interactiveEl = target.closest(
        "a, button, [role='button'], input, textarea, select",
      );
      const cursorTextEl = target.closest("[data-cursor-text]");
      const canvasEl = target.closest("canvas");

      if (cursorTextEl) {
        const text = cursorTextEl.getAttribute("data-cursor-text") || "";
        setCursorText(text);
        if (text.toLowerCase() === "view") {
          setCursorType("view");
        } else if (text.toLowerCase() === "drag") {
          setCursorType("drag");
        } else {
          setCursorType("hover");
        }
      } else if (canvasEl) {
        setCursorType("drag");
        setCursorText("DRAG");
      } else if (interactiveEl) {
        setCursorType("hover");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    hover: {
      width: 50,
      height: 50,
      backgroundColor: "rgba(45, 212, 191, 0.08)",
      border: "2px solid rgba(45, 212, 191, 0.75)",
      boxShadow: "0 0 15px rgba(45, 212, 191, 0.35)",
    },
    drag: {
      width: 70,
      height: 70,
      backgroundColor: "rgba(129, 140, 248, 0.12)",
      border: "2px solid rgba(129, 140, 248, 0.75)",
      boxShadow: "0 0 20px rgba(129, 140, 248, 0.4)",
    },
    view: {
      width: 70,
      height: 70,
      backgroundColor: "rgba(245, 158, 11, 0.12)",
      border: "2px solid rgba(245, 158, 11, 0.75)",
      boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
    },
  };

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorType}
        variants={variants}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-display font-semibold tracking-widest text-slate-100 uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#2dd4bf] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#2dd4bf]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
