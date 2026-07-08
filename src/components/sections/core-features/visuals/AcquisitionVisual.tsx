"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Frame, EASE } from "./Frame";

export function AcquisitionVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const stages = [
    { name: "Identified", count: 147, pct: 100, color: "from-brand-indigo to-brand-blue" },
    { name: "Under negotiation", count: 98, pct: 66, color: "from-brand-indigo to-brand-purple" },
    { name: "Consent & documentation", count: 63, pct: 42, color: "from-brand-purple to-brand-lavender" },
    { name: "Award & disbursement", count: 42, pct: 28, color: "from-brand-purple to-brand-lavender" },
  ];
  return (
    <Frame eyebrow="Acquisition pipeline" title="Bhopal-Sehore corridor · Phase 2" accent="indigo">
      <div ref={ref} className="space-y-3">
        {stages.map((s, i) => (
          <div key={s.name}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-brand-navy/55">{s.name}</span>
              <span className="font-display text-sm font-extrabold text-brand-navy">{s.count}</span>
            </div>
            <div className="mt-1.5 relative h-3 overflow-hidden rounded-full bg-brand-navy/5">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${s.pct}%` } : {}}
                transition={{ duration: 1.1, ease: EASE, delay: i * 0.15 }}
                className={`relative h-full rounded-full bg-gradient-to-r ${s.color} shadow-[0_2px_8px_rgba(79,70,229,0.3)]`}
              >
                <motion.span
                  animate={inView ? { x: ["-100%", "200%"] } : {}}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: i * 0.15 + 1 }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-brand-navy/8 pt-4">
        <div className="rounded-xl border border-brand-navy/8 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Awards</div>
          <div className="mt-1 font-display text-lg font-extrabold text-brand-navy">₹ 24.6 Cr</div>
        </div>
        <div className="rounded-xl border border-brand-navy/8 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Families</div>
          <div className="mt-1 font-display text-lg font-extrabold text-brand-indigo">218</div>
        </div>
        <div className="rounded-xl border border-brand-navy/8 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Cycle</div>
          <div className="mt-1 font-display text-lg font-extrabold text-brand-purple">11.4mo</div>
        </div>
      </div>
    </Frame>
  );
}
