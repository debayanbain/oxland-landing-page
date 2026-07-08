"use client";
import { Bell } from "lucide-react";
import { Frame } from "./Frame";

export function AlertsVisual() {
  const items = [
    { text: "Hearing tomorrow · LC-089", tone: "warning", meta: "in 14h · ADM court, Bhopal" },
    { text: "Award deadline · 12 parcels", tone: "indigo", meta: "in 3 days · corridor Phase 2" },
    { text: "Survey complete · 28 parcels", tone: "success", meta: "2h ago · Ravi K." },
    { text: "Encumbrance updated · Khasra 224", tone: "purple", meta: "5h ago · auto-linked" },
    { text: "Payment cleared · ₹ 2.4L", tone: "success", meta: "yesterday · beneficiary #187" },
  ];
  return (
    <Frame eyebrow="Notification centre" title="Smart alerts · this week" accent="blue">
      <ul className="space-y-2">
        {items.map((a) => (
          <li key={a.text} className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="flex items-center gap-3">
              <span className={`grid h-9 w-9 place-items-center rounded-xl ${
                a.tone === "warning" ? "bg-warning/10 text-warning" :
                a.tone === "indigo" ? "bg-brand-indigo/10 text-brand-indigo" :
                a.tone === "purple" ? "bg-brand-purple/10 text-brand-purple" :
                "bg-success/10 text-success"
              }`}>
                <Bell size={14} strokeWidth={2.25} />
              </span>
              <div>
                <div className="text-[13px] font-bold text-brand-navy">{a.text}</div>
                <div className="text-[10px] text-brand-navy/55">{a.meta}</div>
              </div>
            </div>
            <span className={`h-2 w-2 shrink-0 rounded-full animate-pulse-soft ${
              a.tone === "warning" ? "bg-warning" :
              a.tone === "indigo" ? "bg-brand-indigo" :
              a.tone === "purple" ? "bg-brand-purple" :
              "bg-success"
            }`} />
          </li>
        ))}
      </ul>
    </Frame>
  );
}
