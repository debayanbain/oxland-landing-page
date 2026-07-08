"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Frame, EASE } from "./Frame";

export function LitigationVisual() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const items = [
    { d: "12 Mar", t: "Notice u/s 11 served", chip: "Done", tone: "success" },
    { d: "28 Mar", t: "Objections received · 4 parties", chip: "Processed", tone: "success" },
    { d: "14 Apr", t: "Hearing · ADM court", chip: "Concluded", tone: "success" },
    { d: "29 Apr", t: "Order u/s 19 · award computed", chip: "Active", tone: "indigo" },
    { d: "10 May", t: "Disbursement window opens", chip: "Upcoming", tone: "warning" },
  ];
  return (
    <Frame eyebrow="Case timeline" title="LC-2025/089 · Award u/s 19" accent="purple">
      <ol ref={ref} className="relative space-y-4">
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
          style={{ transformOrigin: "top" }}
          className="absolute left-[18px] top-9 bottom-9 w-px bg-gradient-to-b from-brand-purple/50 to-brand-navy/8"
        />
        {items.map((r, i) => (
          <motion.li
            key={r.t}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.15 }}
            className="relative flex gap-4"
          >
            <span className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-xl shadow-soft ${
              r.tone === "indigo" ? "bg-brand-indigo text-white ring-4 ring-brand-indigo/15" :
              r.tone === "warning" ? "bg-warning/15 text-warning" :
              "bg-success/10 text-success"
            }`}>
              <CheckCircle2 size={14} strokeWidth={2.5} />
            </span>
            <div className="flex-1 pb-1">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">{r.d}</div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  r.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
                  r.tone === "warning" ? "bg-warning/10 text-warning" :
                  "bg-success/10 text-success"
                }`}>{r.chip}</span>
              </div>
              <div className="mt-0.5 text-sm font-semibold text-brand-navy">{r.t}</div>
            </div>
          </motion.li>
        ))}
      </ol>
    </Frame>
  );
}
