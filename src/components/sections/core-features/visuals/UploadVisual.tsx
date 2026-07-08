"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, FileText } from "lucide-react";
import { Frame, EASE } from "./Frame";

export function UploadVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const files = [
    { n: "parcels_q1_2025.xlsx", size: "2.4 MB", p: 100, ok: true },
    { n: "cadastre_sehore.shp", size: "18.7 MB", p: 82, ok: false },
    { n: "boundaries.kml", size: "412 KB", p: 100, ok: true },
    { n: "compensation_ledger.csv", size: "846 KB", p: 45, ok: false },
  ];
  return (
    <Frame eyebrow="Data import" title="4 files · 62% overall · 1m 20s left" accent="purple">
      <div className="rounded-2xl border-2 border-dashed border-brand-purple/25 bg-brand-purple/[0.04] p-5 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-purple/10 text-brand-purple">
          <Upload size={22} strokeWidth={2.25} />
        </div>
        <div className="mt-3 text-[13px] font-bold text-brand-navy">Drop files or click to browse</div>
        <div className="text-[11px] text-brand-navy/55">Excel · CSV · Shapefile · KML · GeoJSON · up to 100 MB</div>
      </div>
      <div ref={ref} className="mt-4 space-y-2">
        {files.map((f, i) => (
          <div key={f.n} className="rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2">
                <FileText size={12} className={f.ok ? "text-success" : "text-brand-purple"} />
                <span className="font-semibold text-brand-navy">{f.n}</span>
                <span className="text-[10px] text-brand-navy/45">{f.size}</span>
              </div>
              <span className={`text-[11px] font-bold ${f.ok ? "text-success" : "text-brand-purple"}`}>{f.p}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-brand-navy/5">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${f.p}%` } : {}}
                transition={{ duration: 1, ease: EASE, delay: i * 0.15 }}
                className={`h-full rounded-full ${f.ok ? "bg-success" : "bg-gradient-to-r from-brand-purple to-brand-lavender"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
