"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to requestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Emit a namespaced custom event instead of re-dispatching the native
    // 'scroll' event. Re-dispatching 'scroll' causes Lenis to receive the
    // event again and can produce an infinite loop when Lenis also emits
    // 'scroll'. Other code can listen for 'lenis:scroll' if needed.
    const handleScroll = (e: any) => {
      try {
        window.dispatchEvent(new CustomEvent("lenis:scroll", { detail: e }));
      } catch (err) {
        // ignore event dispatch errors in older browsers
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      try {
        lenis.off("scroll", handleScroll);
      } catch (err) {}
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
