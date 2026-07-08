"use client";
import { Frame } from "./Frame";

export function GISVisual() {
  return (
    <Frame eyebrow="GIS Mapping · dashboard" title="Interactive parcel intelligence" accent="indigo">
      <div
        className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5f7ff] to-[#eef0fc]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,70,229,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.08) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      >
        <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="gis-full-p" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          <rect x="70" y="30" width="260" height="160" fill="rgba(245,158,11,0.06)" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4" rx="4" />
          <polygon points="110,70 180,64 190,120 115,125" fill="url(#gis-full-p)" stroke="#4F46E5" strokeWidth="1.75" />
          <polygon points="190,64 270,72 265,125 190,120" fill="url(#gis-full-p)" stroke="#4F46E5" strokeWidth="1.75" />
          <polygon points="115,125 190,120 200,175 120,178" fill="rgba(167,139,250,0.28)" stroke="#7C3AED" strokeWidth="1.5" />
          <polygon points="190,120 265,125 275,175 200,175" fill="url(#gis-full-p)" stroke="#4F46E5" strokeWidth="1.75" />
          <text x="150" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1437">128</text>
          <text x="225" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1437">202</text>
          <text x="160" y="155" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1437">255</text>
          <text x="235" y="155" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B1437">280</text>
          <circle cx="280" cy="145" r="5" fill="#4F46E5">
            <animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="absolute left-3 top-3 rounded-xl border border-brand-navy/8 bg-white/95 p-2.5 backdrop-blur-md shadow-soft">
          <div className="text-[9px] font-bold uppercase tracking-wider text-brand-navy/50">Layers</div>
          <div className="mt-1 space-y-1 text-[10px] text-brand-navy/70">
            <div className="flex items-center justify-between gap-3">Cadastre <span className="h-2 w-4 rounded-full bg-brand-indigo" /></div>
            <div className="flex items-center justify-between gap-3">Roads <span className="h-2 w-4 rounded-full bg-brand-indigo" /></div>
            <div className="flex items-center justify-between gap-3">Satellite <span className="h-2 w-4 rounded-full bg-brand-indigo" /></div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { l: "Parcels", v: "1,248" },
          { l: "Acquired", v: "68 ha", accent: true },
          { l: "Pending", v: "31 ha" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-brand-navy/8 bg-white p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-navy/45">{k.l}</div>
            <div className={`mt-1 font-display text-lg font-extrabold ${k.accent ? "text-brand-indigo" : "text-brand-navy"}`}>{k.v}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
