"use client";
import { Sparkles } from "lucide-react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------
   Reusable frame for large section visuals
   ------------------------------------------------------------ */
export function Frame({
  children,
  eyebrow,
  title,
  accent,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  accent: "indigo" | "blue" | "purple";
}) {
  const iconBg =
    accent === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
    accent === "blue" ? "bg-brand-blue/10 text-brand-blue" :
    "bg-brand-purple/10 text-brand-purple";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-navy/10 bg-white shadow-float">
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-50 blur-3xl" style={{ background: accent === "indigo" ? "radial-gradient(closest-side, rgba(79,70,229,0.3), transparent 70%)" : accent === "blue" ? "radial-gradient(closest-side, rgba(47,91,255,0.3), transparent 70%)" : "radial-gradient(closest-side, rgba(124,58,237,0.3), transparent 70%)" }} />
      <div className="flex items-center justify-between border-b border-brand-navy/8 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className={`grid h-9 w-9 place-items-center rounded-xl ${iconBg}`}>
            <Sparkles size={14} strokeWidth={2.25} />
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/50">{eyebrow}</div>
            <div className="mt-0.5 font-display text-base font-extrabold text-brand-navy leading-tight">{title}</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
          Live
        </span>
      </div>
      <div className="relative p-6">{children}</div>
    </div>
  );
}
