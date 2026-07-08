"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Frame } from "./Frame";

export function EncroachmentVisual() {
  return (
    <Frame eyebrow="Change detection · AI" title="Village Amla · satellite diff" accent="indigo">
      <div className="grid grid-cols-2 gap-3">
        <div className="relative overflow-hidden rounded-2xl border border-brand-navy/8">
          <div
            className="h-40"
            style={{
              background: "linear-gradient(135deg, #dfe6d8 0%, #b7c9a1 55%, #a8b892 100%)",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-brand-navy shadow-soft">
            Jan 2024 · baseline
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-brand-navy/8">
          <div
            className="h-40"
            style={{
              background: "linear-gradient(135deg, #cfd6ce 0%, #96a889 55%, #7a8b6f 100%)",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* detected structures */}
          <div className="absolute left-5 top-6 h-10 w-14 rounded bg-warning/45 ring-2 ring-warning" />
          <div className="absolute right-3 bottom-4 h-7 w-9 rounded bg-warning/45 ring-2 ring-warning" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-5 top-6 h-10 w-14 rounded ring-2 ring-warning"
          />
          <div className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-brand-navy shadow-soft">
            Apr 2025 · current
          </div>
          <div className="absolute right-2 top-2 rounded-full bg-warning/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-warning ring-1 ring-warning/40">
            2 breaches
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-warning/20 bg-warning/8 p-3">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-brand-navy">
          <AlertTriangle size={13} className="text-warning" />
          Boundary breach detected — 2 unauthorized structures inside parcel 224
        </div>
        <div className="mt-1 text-[10px] text-brand-navy/55">
          Auto-generated · confidence 96% · report ready for revenue dept.
        </div>
      </div>
    </Frame>
  );
}
