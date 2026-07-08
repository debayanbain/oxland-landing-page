"use client";
import { CheckCircle2, ClipboardCheck, Activity } from "lucide-react";
import { Frame } from "./Frame";

export function WorkflowVisual() {
  const stages = [
    { n: "Prepared", tone: "success", by: "Field team" },
    { n: "Legal review", tone: "success", by: "K. Sharma" },
    { n: "Director", tone: "indigo", by: "In review · 2h" },
    { n: "Sign-off", tone: "muted", by: "Pending" },
  ];
  return (
    <Frame eyebrow="Approval workflow" title="Consent letter · Parcel 224" accent="purple">
      <div className="flex items-center gap-1">
        {stages.map((s, i) => (
          <>
            <div key={s.n} className="flex-1 flex flex-col items-center gap-1.5">
              <span className={`grid h-11 w-11 place-items-center rounded-2xl ${
                s.tone === "indigo" ? "bg-brand-indigo text-white ring-4 ring-brand-indigo/15 shadow-soft" :
                s.tone === "success" ? "bg-success/15 text-success" :
                "bg-brand-navy/8 text-brand-navy/45"
              }`}>
                {s.tone === "success" ? <CheckCircle2 size={16} strokeWidth={2.5} /> :
                 s.tone === "indigo" ? <ClipboardCheck size={16} strokeWidth={2.5} /> :
                 <span className="text-[11px] font-bold">{i + 1}</span>}
              </span>
              <div className="text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-navy">{s.n}</div>
                <div className="text-[10px] text-brand-navy/55">{s.by}</div>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="mb-8 h-[2px] flex-1 bg-gradient-to-r from-brand-indigo/40 to-brand-navy/10" />
            )}
          </>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-brand-navy/8 bg-white p-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy/50">
          <Activity size={12} className="text-brand-indigo" />
          Current step · Director sign-off
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-[13px] font-semibold text-brand-navy">In queue for R. Iyer</div>
          <div className="text-[11px] text-brand-navy/55">Escalates in 22h</div>
        </div>
      </div>
    </Frame>
  );
}
