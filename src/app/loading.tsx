import React from "react";

export default function Loading(): React.JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1e]">
      <div className="relative flex flex-col items-center gap-4">
        {/* Outer glowing pulsing circle */}
        <div className="w-16 h-16 rounded-full border-4 border-[#818cf8]/20 border-t-[#2dd4bf] animate-spin shadow-[0_0_15px_rgba(45,212,191,0.2)]" />
        
        {/* Sleek brand label */}
        <div className="text-[10px] font-mono font-semibold tracking-[0.25em] text-[#e2e8f0]/80 uppercase animate-pulse">
          DR. C. K. NAYAK
        </div>
      </div>
    </div>
  );
}
