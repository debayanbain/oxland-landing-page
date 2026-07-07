"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, FileCheck2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const items = [
  { date: "12 Mar", title: "Notice u/s 11 served", chip: "Done", tone: "success" },
  { date: "28 Mar", title: "Objections received · 4 parties", chip: "Processed", tone: "success" },
  { date: "14 Apr", title: "Hearing · ADM court", chip: "Concluded", tone: "success" },
  { date: "29 Apr", title: "Order u/s 19 · award computed", chip: "Active", tone: "indigo" },
  { date: "10 May", title: "Disbursement window opens", chip: "Upcoming", tone: "warning" },
];

const toneStyles = {
  success: {
    badge: "bg-success/10 text-success",
    iconWrap: "bg-success/10 text-success",
    Icon: CheckCircle2,
  },
  indigo: {
    badge: "bg-brand-indigo/10 text-brand-indigo",
    iconWrap: "bg-brand-indigo text-white ring-4 ring-brand-indigo/15",
    Icon: FileCheck2,
  },
  warning: {
    badge: "bg-warning/10 text-warning",
    iconWrap: "bg-warning/15 text-warning",
    Icon: CheckCircle2,
  },
} as const;

export default function AnimatedTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <ol ref={ref} className="relative mt-6 space-y-4">
      {/* Single growing vertical line */}
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
        style={{ transformOrigin: "top" }}
        className="absolute left-[18px] top-9 bottom-9 w-px bg-gradient-to-b from-brand-indigo/45 via-brand-indigo/25 to-brand-indigo/5"
      />

      {items.map((t, i) => {
        const s = toneStyles[t.tone as keyof typeof toneStyles];
        const Icon = s.Icon;
        const isActive = t.tone === "indigo";
        return (
          <motion.li
            key={t.title}
            initial={{ opacity: 0, x: -14 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: 0.25 + i * 0.18 }}
            className="relative flex gap-4"
          >
            <div className="flex w-9 shrink-0 flex-col items-center">
              <span
                className={`relative z-10 grid h-9 w-9 place-items-center rounded-xl ${s.iconWrap} shadow-soft`}
              >
                <Icon size={14} strokeWidth={2.5} />
                {isActive && (
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.45, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-xl ring-2 ring-brand-indigo"
                  />
                )}
              </span>
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-navy/45">
                  {t.date}
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${s.badge}`}
                >
                  {t.chip}
                </span>
              </div>
              <div className="mt-1 text-sm font-semibold text-brand-navy">{t.title}</div>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
