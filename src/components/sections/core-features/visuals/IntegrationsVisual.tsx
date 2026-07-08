"use client";
import { motion } from "framer-motion";
import { Puzzle } from "lucide-react";
import { Frame, EASE } from "./Frame";

export function IntegrationsVisual() {
  const systems = ["SAP", "Oracle ERP", "Tally", "Zoho", "MS Dynamics", "NIC GIS", "DigiLocker", "Court API"];
  return (
    <Frame eyebrow="Integration hub" title="8 systems connected · streaming" accent="indigo">
      <div className="relative flex items-center justify-center py-2">
        {/* Center Oxland */}
        <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-indigo to-brand-purple text-white shadow-float">
          <Puzzle size={22} strokeWidth={2.25} />
        </div>
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-24 w-24 rounded-full ring-2 ring-brand-indigo/40"
        />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {systems.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
            className="rounded-xl border border-brand-navy/10 bg-white px-2 py-3 text-center shadow-soft"
          >
            <div className="text-[11px] font-bold text-brand-navy">{s}</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-success">
              <span className="h-1 w-1 rounded-full bg-success animate-pulse-soft" />
              live
            </div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}
