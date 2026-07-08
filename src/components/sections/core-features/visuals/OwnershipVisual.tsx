"use client";
import { Frame } from "./Frame";

export function OwnershipVisual() {
  const owners = [
    { code: "SV", name: "Suresh Kumar Verma", role: "Current owner", meta: "Mar 2024 – present · Sole", chip: "Active", tone: "indigo" },
    { code: "RV", name: "Ram Lal Verma", role: "Inheritance", meta: "Jul 2011 – Mar 2024 · Joint (3 heirs)", chip: "Prior", tone: "muted" },
    { code: "PV", name: "Prakash Verma", role: "Purchase", meta: "Apr 1998 – Jul 2011", chip: "Prior", tone: "muted" },
    { code: "GV", name: "Govt. Land Grant", role: "Origin", meta: "Aug 1972 · Revenue dept", chip: "Origin", tone: "muted" },
  ];
  return (
    <Frame eyebrow="Ownership chain" title="Khasra 128/2 · 4 generations" accent="purple">
      <div className="relative space-y-3 pl-4">
        <span className="absolute left-[13px] top-4 bottom-4 w-px bg-gradient-to-b from-brand-purple/50 to-brand-navy/10" />
        {owners.map((o) => (
          <div key={o.code} className="relative flex items-center gap-3">
            <span className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-[10px] font-extrabold ${
              o.tone === "indigo" ? "bg-gradient-to-br from-brand-indigo to-brand-purple text-white ring-4 ring-brand-indigo/15" : "bg-brand-navy/10 text-brand-navy/70"
            }`}>
              {o.code}
            </span>
            <div className="flex flex-1 items-center justify-between rounded-xl border border-brand-navy/8 bg-white p-3">
              <div>
                <div className="text-[13px] font-bold text-brand-navy">{o.name}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-purple/80">{o.role}</div>
                <div className="text-[10px] text-brand-navy/55">{o.meta}</div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${o.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" : "bg-brand-navy/8 text-brand-navy/50"}`}>
                {o.chip}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
