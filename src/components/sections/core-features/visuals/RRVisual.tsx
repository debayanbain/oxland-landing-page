"use client";
import { Home } from "lucide-react";
import { Frame } from "./Frame";

export function RRVisual() {
  const fams = [
    { name: "Verma family", size: "4 members", stage: "Housing allotted · Sec 12", tone: "success" },
    { name: "Yadav family", size: "6 members", stage: "Livelihood training", tone: "indigo" },
    { name: "Devi family", size: "3 members", stage: "Awaiting land papers", tone: "warning" },
    { name: "Kumar family", size: "5 members", stage: "Compensation disbursed", tone: "success" },
  ];
  return (
    <Frame eyebrow="R&R tracker" title="Bhopal-Sehore · 218 families" accent="blue">
      <div className="grid grid-cols-4 gap-2">
        {[
          { l: "Total", v: "218", accent: "text-brand-navy" },
          { l: "Compensated", v: "142", accent: "text-success" },
          { l: "Resettled", v: "98", accent: "text-brand-indigo" },
          { l: "Pending", v: "76", accent: "text-warning" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/45">{k.l}</div>
            <div className={`mt-1 font-display text-xl font-extrabold ${k.accent}`}>{k.v}</div>
          </div>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {fams.map((f) => (
          <li key={f.name} className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Home size={14} strokeWidth={2.25} />
              </span>
              <div>
                <div className="text-[13px] font-bold text-brand-navy">{f.name}</div>
                <div className="text-[10px] text-brand-navy/55">{f.size}</div>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
              f.tone === "success" ? "bg-success/10 text-success" :
              f.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
              "bg-warning/10 text-warning"
            }`}>
              {f.stage}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
