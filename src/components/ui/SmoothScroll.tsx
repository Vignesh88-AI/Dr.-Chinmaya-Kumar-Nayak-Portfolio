"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  useEffect(() => {
    // Initialize Lenis with updated API (v1.3 supports autoRaf: true)
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
