"use client";
import { Search, FileText } from "lucide-react";
import { Frame } from "./Frame";

export function RecordsVisual() {
  const rows = [
    { name: "Khasra 128/2 — Village Garhi", meta: "RoR · v3 · OCR indexed", tag: "Verified", tone: "success" },
    { name: "Order copy · LC-2025/089", meta: "Marathi · 14 pages", tag: "OCR'd", tone: "indigo" },
    { name: "Mutation register · Suresh Verma", meta: "3 chain events", tag: "Chain", tone: "purple" },
    { name: "Encumbrance · 7-12 Extract", meta: "Q1 2025 · latest", tag: "New", tone: "warning" },
    { name: "Consent letter · Ram Verma", meta: "E-signed · DSC", tag: "Signed", tone: "success" },
  ];
  return (
    <Frame eyebrow="Document repository" title="5 documents · linked to Khasra 128/2" accent="blue">
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-brand-navy/10 bg-[#f7f8fd] px-3 py-2.5">
        <Search size={13} className="text-brand-navy/50" />
        <span className="text-[12px] text-brand-navy/55">Search across khasra, owner, order number, section reference…</span>
        <span className="ml-auto text-[9px] font-bold text-brand-navy/40">⌘K</span>
      </div>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue">
                <FileText size={14} strokeWidth={2.25} />
              </span>
              <div>
                <div className="text-[12px] font-bold text-brand-navy">{r.name}</div>
                <div className="text-[10px] text-brand-navy/55">{r.meta}</div>
              </div>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
              r.tone === "success" ? "bg-success/10 text-success" :
              r.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
              r.tone === "purple" ? "bg-brand-purple/10 text-brand-purple" :
              "bg-warning/10 text-warning"
            }`}>
              {r.tag}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
