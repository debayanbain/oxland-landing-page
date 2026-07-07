"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stages = [
  { name: "Identified", count: 147, gradient: "from-brand-indigo to-brand-blue", percent: 100 },
  { name: "Under negotiation", count: 98, gradient: "from-brand-indigo to-brand-purple", percent: 66 },
  { name: "Consent & documentation", count: 63, gradient: "from-brand-purple to-brand-lavender", percent: 42 },
  { name: "Award & disbursement", count: 42, gradient: "from-brand-purple to-brand-lavender", percent: 28 },
];

function CountTick({ value, trigger }: { value: number; trigger: boolean }) {
  return (
    <motion.span
      key={trigger ? "in" : "out"}
      initial={{ opacity: 0, y: 8 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
      className="font-display text-sm font-extrabold text-brand-navy tabular-nums"
    >
      {value}
    </motion.span>
  );
}

export default function AnimatedFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} className="space-y-3.5">
      {stages.map((s, i) => (
        <div key={s.name} className="group">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-brand-navy/55">{s.name}</span>
            <CountTick value={s.count} trigger={inView} />
          </div>
          <div className="relative mt-1.5 h-3 overflow-hidden rounded-full bg-brand-navy/5">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${s.percent}%` } : { width: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: i * 0.18 }}
              className={`relative h-full rounded-full bg-gradient-to-r ${s.gradient} shadow-[0_2px_8px_rgba(79,70,229,0.35)]`}
            >
              {/* Shimmer */}
              <motion.span
                aria-hidden
                animate={inView ? { x: ["-100%", "200%"] } : {}}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.18 + 1.0,
                }}
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
