"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Frame, EASE } from "./Frame";

export function ValuationVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const bars = [22, 30, 28, 42, 48, 45, 58, 62, 71, 68, 78, 84];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <Frame eyebrow="Valuation trend" title="Circle rate · Sehore district" accent="blue">
      <div ref={ref} className="grid grid-cols-[1.2fr_1fr] gap-6 items-end">
        <div className="flex h-40 items-end justify-between gap-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={inView ? { height: `${h}%` } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
              className="relative flex-1 rounded-t-md bg-gradient-to-t from-brand-blue to-brand-indigo"
            >
              {i === bars.length - 1 && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-brand-indigo px-2 py-1 text-[10px] font-bold text-white shadow-soft">
                  ₹ 42.8L
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Avg rate / acre</div>
            <div className="font-display text-2xl font-extrabold text-brand-navy tabular-nums">₹ 42.8L</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
              <TrendingUp size={10} /> +18% YoY
            </div>
          </div>
          <div className="rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">Guideline vs market</div>
            <div className="mt-1 flex items-center justify-between text-[12px]">
              <span className="font-semibold text-brand-navy">Guideline</span>
              <span className="font-bold text-brand-indigo tabular-nums">₹ 32.4L</span>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[12px]">
              <span className="font-semibold text-brand-navy">Market</span>
              <span className="font-bold text-brand-purple tabular-nums">₹ 42.8L</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[9px] font-semibold text-brand-navy/40">
        {months.map((m) => <span key={m}>{m}</span>)}
      </div>
    </Frame>
  );
}
