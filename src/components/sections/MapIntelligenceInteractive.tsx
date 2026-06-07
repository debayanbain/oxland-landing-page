import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Building2 } from "lucide-react";

// === Cadastral parcel generation – irregular grid ===
const COLS = 8;
const ROWS = 6;
const VW = 540;
const VH = 460;
const aoi = { x: 142, y: 108, w: 248, h: 180 };
const padX = 30;
const padY = 50;
const stepX = (VW - padX * 2) / (COLS - 1);
const stepY = (VH - padY * 2) / (ROWS - 1);

const seed = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

type V = { x: number; y: number };
const verts: V[][] = [];
for (let r = 0; r < ROWS; r++) {
  const row: V[] = [];
  for (let c = 0; c < COLS; c++) {
    const jx = (seed(r * 13.7 + c * 7.1 + 1) - 0.5) * stepX * 0.42;
    const jy = (seed(r * 23.5 + c * 9.2 + 2) - 0.5) * stepY * 0.42;
    row.push({
      x: +(padX + c * stepX + jx).toFixed(1),
      y: +(padY + r * stepY + jy).toFixed(1),
    });
  }
  verts.push(row);
}

const idPool = [
  101,114,120,121,126,128,129,130,132,136,140,141,142,143,145,146,
  195,198,202,206,209,210,214,216,219,221,224,225,227,228,233,234,
  238,239,240,242,243,245,246,247,249,250,251,253,254,255,256,259,
  262,266,271,272,274,275,276,277,278,279,280,281,285,286,291,292,
  295,301,303,307,310,311,317,325,329,330,332,334,336,342,344,346,
  348,350,353,354,356,358,359,388,412,493,495,498,507,519,559,619,
  623,626,630,651,659,660,662,667,698,
];

type Parcel = {
  id: string;
  points: string;
  cx: number;
  cy: number;
  showLabel: boolean;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};
const parcels: Parcel[] = [];
let pi = 0;
for (let r = 0; r < ROWS - 1; r++) {
  for (let c = 0; c < COLS - 1; c++) {
    const a = verts[r][c];
    const b = verts[r][c + 1];
    const e = verts[r + 1][c + 1];
    const d = verts[r + 1][c];
    const xs = [a.x, b.x, e.x, d.x];
    const ys = [a.y, b.y, e.y, d.y];
    parcels.push({
      id: String(idPool[(pi * 13 + 7) % idPool.length]),
      points: `${a.x},${a.y} ${b.x},${b.y} ${e.x},${e.y} ${d.x},${d.y}`,
      cx: +((a.x + b.x + e.x + d.x) / 4).toFixed(1),
      cy: +((a.y + b.y + e.y + d.y) / 4).toFixed(1) + 3,
      showLabel: seed(pi * 3.3) > 0.15,
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    });
    pi++;
  }
}

// Compute the AOI around a given parcel — padded bbox, clamped to canvas.
function aoiFor(p: Parcel) {
  const padX = 56;
  const padY = 42;
  const margin = 16;
  const x = Math.max(margin, p.minX - padX);
  const y = Math.max(margin, p.minY - padY);
  const right = Math.min(VW - margin, p.maxX + padX);
  const bottom = Math.min(VH - margin, p.maxY + padY);
  return { x, y, w: right - x, h: bottom - y };
}

// Deterministic fake details payload for a parcel.
function detailsFor(p: Parcel) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  const id = parseInt(p.id, 10) || 0;
  let h = id * 7919;
  let pniu = "";
  for (let i = 0; i < 13; i++) {
    pniu += chars[h % chars.length];
    h = (h * 31 + 17) % 99999991;
  }
  const f = (n: number) => String(((id * n) % 99)).padStart(2, "0");
  return {
    kide: p.id,
    pniu,
    giscode: `${f(3)}_${f(5)}_${f(7)}_${f(11)}`,
  };
}

type Phase = "pick" | "aoi" | "details";
const PHASE_MS: Record<Phase, number> = {
  pick: 1300,
  aoi: 2600,
  details: 3400,
};

// Calculate which parcel indices are inside the center AOI (aoi)
const centerParcelsIndices = parcels
  .map((p, idx) => ({ p, idx }))
  .filter(({ p }) => p.cx >= aoi.x && p.cx <= aoi.x + aoi.w && p.cy >= aoi.y && p.cy <= aoi.y + aoi.h)
  .map(({ idx }) => idx);

export default function MapIntelligenceInteractive() {
  // --- Sequential pick → aoi → details loop -----------------------------
  const [phase, setPhase] = useState<Phase>("pick");
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);

  // Pre-populate with 6 random parcel indices from anywhere on the map
  const [selected, setSelected] = useState<number[]>(() => {
    const initial: number[] = [];
    while (initial.length < 6) {
      const idx = Math.floor(Math.random() * parcels.length);
      if (!initial.includes(idx)) {
        initial.push(idx);
      }
    }
    return initial;
  });

  const spotlightedRef = useRef<number[]>([]);

  useEffect(() => {
    if (phase === "pick") {
      // Find candidate parcels inside the center AOI that haven't been spotlighted recently
      let candidates = centerParcelsIndices.filter(
        (i) => !spotlightedRef.current.includes(i)
      );

      if (candidates.length === 0) {
        spotlightedRef.current = [];
        candidates = centerParcelsIndices;
      }

      // 1. Pick a random parcel inside the center AOI to spotlight
      const newSpotlightIdx = candidates[Math.floor(Math.random() * candidates.length)];
      setCurrentIdx(newSpotlightIdx);
      spotlightedRef.current.push(newSpotlightIdx);

      // 2. Automatically select one random parcel from the entire map (if not already selected)
      // to simulate progressive selection/acquisition.
      setSelected((prev) => {
        const unselectedAll = parcels
          .map((_, i) => i)
          .filter((i) => !prev.includes(i));
        
        if (unselectedAll.length > 0) {
          const randomNewSelected = unselectedAll[Math.floor(Math.random() * unselectedAll.length)];
          return [...prev, randomNewSelected];
        }
        return prev;
      });
    }

    const t = setTimeout(() => {
      setPhase((p) => (p === "pick" ? "aoi" : p === "aoi" ? "details" : "pick"));
    }, PHASE_MS[phase]);

    return () => clearTimeout(t);
  }, [phase]);

  // Permanently select the spotlighted parcel when it reaches the details phase
  useEffect(() => {
    if (phase === "details" && currentIdx !== null) {
      setSelected((prev) => {
        if (prev.includes(currentIdx)) return prev;
        return [...prev, currentIdx];
      });
    }
  }, [phase, currentIdx]);

  // Spotlight-derived data
  const currentParcel = currentIdx === null ? null : parcels[currentIdx];
  
  // AOI is always fixed to the center position only
  const currentAoi = aoi;
  const currentDetails = currentParcel ? detailsFor(currentParcel) : null;

  // km distance labels derived from center AOI dimensions
  const kmH = (aoi.w * 0.0064).toFixed(2);
  const kmV = (aoi.h * 0.0064).toFixed(2);

  const showAoi = (phase === "aoi" || phase === "details") && !!currentAoi;
  const showDetails = phase === "details" && !!currentParcel;
  const showCursor = phase === "aoi" && !!currentAoi;

  return (
    <div className="map-stage relative h-full min-h-[520px] overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-indigo-50 via-sky-50 to-violet-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] flex flex-col justify-end">
      <svg
        viewBox="0 0 540 460"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full select-none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="mi-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="rgba(79,70,229,0.08)" strokeWidth="1" />
          </pattern>
          <pattern id="mi-grid-major" width="110" height="110" patternUnits="userSpaceOnUse">
            <path d="M110 0H0V110" fill="none" stroke="rgba(79,70,229,0.16)" strokeWidth="1" />
          </pattern>
          <linearGradient id="mi-scan" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
            <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="540" height="460" fill="url(#mi-grid)" />
        <rect width="540" height="460" fill="url(#mi-grid-major)" />

        {/* Subtle terrain washes */}
        <ellipse cx="80" cy="80" rx="180" ry="80" fill="#fde7e3" opacity="0.35" />
        <ellipse cx="460" cy="60" rx="140" ry="70" fill="#fff1c8" opacity="0.30" />
        <ellipse cx="500" cy="420" rx="160" ry="90" fill="#e0f0ff" opacity="0.45" />

        {/* Roads */}
        <g fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" opacity="0.45">
          <path d="M-10 360 C 90 320 220 380 340 340 S 480 300 560 320" />
          <path d="M120 -10 C 130 100 180 200 240 320 S 320 460 340 480" />
        </g>
        <g fill="none" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" opacity="0.6">
          <path d="M-10 200 C 80 195 220 215 320 200 S 500 180 560 195" />
          <path d="M260 -10 C 270 80 280 170 300 260" />
          <path d="M420 -10 C 415 100 425 220 410 360" />
        </g>

        {/* River */}
        <path
          d="M-10 440 C 80 430 140 460 220 440 S 360 420 560 445"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.20"
        />
        <path
          d="M-10 440 C 80 430 140 460 220 440 S 360 420 560 445"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Pick-phase scan flash sweeping across the canvas */}
        {phase === "pick" && (
          <motion.rect
            key={`scan-${currentIdx}`}
            x="0"
            y="-80"
            width="540"
            height="80"
            fill="url(#mi-scan)"
            initial={{ translateY: 0 }}
            animate={{ translateY: 540 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}

        {/* Cadastral parcels — selected (sticky) + default */}
        <g className="mi-parcels" strokeLinejoin="round">
          {parcels.map((p, idx) => {
            const isSelected = selected.includes(idx);
            const isCurrent = currentIdx === idx;

            let fill = "rgba(255,255,255,0.45)";
            let stroke = "rgba(11,20,55,0.3)";
            let strokeWidth = 0.7;

            if (isSelected) {
              fill = "rgba(47,91,255,0.32)";
              stroke = "#2F5BFF";
              strokeWidth = 2;
            }

            return (
              <motion.polygon
                key={`parcel-${idx}`}
                points={p.points}
                initial={{
                  opacity: 0,
                  fill: "rgba(255,255,255,0.45)",
                  stroke: "rgba(11,20,55,0.3)",
                  strokeWidth: 0.7,
                }}
                animate={{ opacity: 1, fill, stroke, strokeWidth }}
                whileHover={
                  isSelected
                    ? undefined
                    : { fill: "rgba(79,70,229,0.28)", stroke: "#4F46E5", strokeWidth: 1.6 }
                }
                transition={{
                  duration: isCurrent && phase === "pick" ? 0.4 : 0.6,
                  ease: "easeOut",
                }}
                className="cursor-pointer"
              />
            );
          })}
        </g>

        {/* Parcel ID labels (skip ones that have a blue badge) */}
        <g
          className="mi-labels"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="6.5"
          fontWeight="600"
          fill="rgba(11,20,55,0.65)"
        >
          {parcels.map((p, idx) =>
            p.showLabel && !selected.includes(idx) ? (
              <motion.text
                key={`label-${idx}`}
                x={p.cx}
                y={p.cy}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.005 }}
              >
                {p.id}
              </motion.text>
            ) : null
          )}
        </g>

        {/* Blue ID badges on every accumulated selected parcel */}
        <AnimatePresence>
          {selected.map((idx) => {
            const p = parcels[idx];
            return (
              <motion.g
                key={`badge-${idx}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
              >
                <rect
                  x={p.cx - 14}
                  y={p.cy - 11}
                  width="28"
                  height="14"
                  rx="7"
                  fill="#2F5BFF"
                />
                <text
                  x={p.cx}
                  y={p.cy - 1}
                  textAnchor="middle"
                  fontFamily="Geist, sans-serif"
                  fontSize="9"
                  fontWeight="800"
                  fill="#fff"
                >
                  {p.id}
                </text>
              </motion.g>
            );
          })}
        </AnimatePresence>

        {/* Pulse rings on the currently spotlighted parcel */}
        {currentParcel && (
          <>
            <motion.circle
              key={`ring-a-${currentIdx}`}
              cx={currentParcel.cx}
              cy={currentParcel.cy}
              r="14"
              fill="none"
              stroke="#2F5BFF"
              strokeWidth="1.5"
              style={{ transformOrigin: `${currentParcel.cx}px ${currentParcel.cy}px` }}
              animate={{ scale: [0.4, 2.2], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              key={`ring-b-${currentIdx}`}
              cx={currentParcel.cx}
              cy={currentParcel.cy}
              r="14"
              fill="none"
              stroke="#2F5BFF"
              strokeWidth="1.5"
              style={{ transformOrigin: `${currentParcel.cx}px ${currentParcel.cy}px` }}
              animate={{ scale: [0.4, 2.2], opacity: [0.7, 0] }}
              transition={{ duration: 2.4, delay: 1.2, repeat: Infinity, ease: "easeOut" }}
            />
          </>
        )}

        {/* ============ Dynamic AOI around current parcel ============ */}
        <AnimatePresence>
          {showAoi && currentAoi && (
            <motion.g
              key={`aoi-${currentIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* AOI fill */}
              <motion.rect
                x={currentAoi.x}
                y={currentAoi.y}
                rx="4"
                fill="#F59E0B"
                fillOpacity="0.18"
                initial={{ width: 0, height: 0 }}
                animate={{ width: currentAoi.w, height: currentAoi.h }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
              />
              {/* AOI outline */}
              <motion.rect
                x={currentAoi.x}
                y={currentAoi.y}
                rx="4"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.2"
                initial={{ width: 0, height: 0 }}
                animate={{ width: currentAoi.w, height: currentAoi.h }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
              />

              {/* Marching ants overlay */}
              <motion.rect
                x={currentAoi.x}
                y={currentAoi.y}
                width={currentAoi.w}
                height={currentAoi.h}
                rx="4"
                fill="none"
                stroke="#D97706"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, strokeDashoffset: [-36, 0] }}
                transition={{
                  opacity: { duration: 0.3, delay: 1.4 },
                  strokeDashoffset: { repeat: Infinity, duration: 1.6, ease: "linear" },
                }}
              />

              {/* Distance labels (computed from AOI) */}
              <motion.g
                className="mi-aoi-labels"
                fontFamily="Geist, sans-serif"
                fontSize="9.5"
                fontWeight="700"
                fill="#2F5BFF"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5 }}
              >
                {/* Top */}
                <rect
                  x={currentAoi.x + currentAoi.w / 2 - 22}
                  y={currentAoi.y - 14}
                  width="44"
                  height="14"
                  rx="7"
                  fill="#fff"
                  stroke="rgba(47,91,255,0.3)"
                  strokeWidth="0.8"
                />
                <text
                  x={currentAoi.x + currentAoi.w / 2}
                  y={currentAoi.y - 4}
                  textAnchor="middle"
                >
                  {kmH} km
                </text>

                {/* Bottom */}
                <rect
                  x={currentAoi.x + currentAoi.w / 2 - 22}
                  y={currentAoi.y + currentAoi.h}
                  width="44"
                  height="14"
                  rx="7"
                  fill="#fff"
                  stroke="rgba(47,91,255,0.3)"
                  strokeWidth="0.8"
                />
                <text
                  x={currentAoi.x + currentAoi.w / 2}
                  y={currentAoi.y + currentAoi.h + 10}
                  textAnchor="middle"
                >
                  {kmH} km
                </text>

                {/* Left */}
                <g
                  transform={`rotate(-90 ${currentAoi.x - 8} ${currentAoi.y + currentAoi.h / 2})`}
                >
                  <rect
                    x={currentAoi.x - 8 - 22}
                    y={currentAoi.y + currentAoi.h / 2 - 7}
                    width="44"
                    height="14"
                    rx="7"
                    fill="#fff"
                    stroke="rgba(47,91,255,0.3)"
                    strokeWidth="0.8"
                  />
                  <text
                    x={currentAoi.x - 8}
                    y={currentAoi.y + currentAoi.h / 2 + 3}
                    textAnchor="middle"
                  >
                    {kmV} km
                  </text>
                </g>

                {/* Right */}
                <g
                  transform={`rotate(90 ${currentAoi.x + currentAoi.w + 8} ${currentAoi.y + currentAoi.h / 2})`}
                >
                  <rect
                    x={currentAoi.x + currentAoi.w + 8 - 22}
                    y={currentAoi.y + currentAoi.h / 2 - 7}
                    width="44"
                    height="14"
                    rx="7"
                    fill="#fff"
                    stroke="rgba(47,91,255,0.3)"
                    strokeWidth="0.8"
                  />
                  <text
                    x={currentAoi.x + currentAoi.w + 8}
                    y={currentAoi.y + currentAoi.h / 2 + 3}
                    textAnchor="middle"
                  >
                    {kmV} km
                  </text>
                </g>
              </motion.g>

              {/* AOI corner handles */}
              <g className="mi-handles">
                {[
                  { x: currentAoi.x, y: currentAoi.y },
                  { x: currentAoi.x + currentAoi.w, y: currentAoi.y },
                  { x: currentAoi.x + currentAoi.w, y: currentAoi.y + currentAoi.h },
                  { x: currentAoi.x, y: currentAoi.y + currentAoi.h },
                ].map((c, index) => (
                  <motion.g
                    key={`handle-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 1.2 + index * 0.08,
                      type: "spring",
                      stiffness: 150,
                    }}
                    style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                  >
                    <circle cx={c.x} cy={c.y} r="7" fill="#fff" opacity="0.9" />
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="4.5"
                      fill="#fff"
                      stroke="#F59E0B"
                      strokeWidth="2.2"
                    />
                  </motion.g>
                ))}
              </g>

              {/* AOI title tag */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.6 }}
              >
                <rect
                  x={currentAoi.x + currentAoi.w / 2 - 56}
                  y={currentAoi.y + 8}
                  width="112"
                  height="18"
                  rx="9"
                  fill="#F59E0B"
                  fillOpacity="0.95"
                />
                <text
                  x={currentAoi.x + currentAoi.w / 2}
                  y={currentAoi.y + 20}
                  textAnchor="middle"
                  fontFamily="Geist, sans-serif"
                  fontSize="9.5"
                  fontWeight="800"
                  fill="#fff"
                  letterSpacing="0.3"
                >
                  AREA OF INTEREST
                </text>
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Cursor dragging out the AOI during AOI phase */}
        <AnimatePresence>
          {showCursor && currentAoi && (
            <motion.g
              key={`cursor-${currentIdx}`}
              initial={{
                opacity: 0,
                x: currentAoi.x,
                y: currentAoi.y,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [
                  currentAoi.x,
                  currentAoi.x,
                  currentAoi.x + currentAoi.w,
                  currentAoi.x + currentAoi.w,
                ],
                y: [
                  currentAoi.y,
                  currentAoi.y,
                  currentAoi.y + currentAoi.h,
                  currentAoi.y + currentAoi.h,
                ],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.2,
                times: [0, 0.1, 0.85, 1],
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <path
                d="M0 0 L0 17 L4.5 13 L7.5 19 L9.5 18 L6.5 12 L12 12 Z"
                fill="#fff"
                stroke="#0B1437"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Coordinate Display */}
      <div
        className={`absolute right-3 top-3 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/95 px-3 py-2 text-[10px] font-semibold shadow-soft backdrop-blur transition-all duration-350 ${
          phase === "details"
            ? "text-success border-success/30 bg-success/5"
            : "text-brand-navy/80"
        }`}
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${
              phase === "details" ? "bg-success" : "bg-emerald-500"
            }`}
          ></span>
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
              phase === "details" ? "bg-success" : "bg-emerald-500"
            }`}
          ></span>
        </span>
        <span className="font-mono tracking-tight">23.215°N · 77.412°E</span>
      </div>

      {/* Map Legend */}
      <div className="absolute right-3 bottom-3 flex flex-col gap-1.5 rounded-2xl border border-white/80 bg-white/95 px-3 py-2.5 text-[10.5px] font-semibold text-brand-navy shadow-soft backdrop-blur select-none">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-amber-400"></span>Area of interest
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-brand-blue"></span>Selected plot
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[3px] border border-brand-navy/40 bg-white"></span>
          Parcel
        </div>
      </div>

      {/* Soft background glow accents */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-300/25 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-blue/15 blur-3xl"></div>

      {/* =============== Dynamic details card =============== */}
      <AnimatePresence>
        {showDetails && currentParcel && currentDetails && (
          <motion.div
            key={`details-${currentIdx}`}
            initial={{ opacity: 0, scale: 0.9, y: 8, x: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8, x: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute left-3 top-3 w-[220px] overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-3.5 shadow-card backdrop-blur-md flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="relative grid h-4 w-4 place-items-center rounded bg-brand-indigo/10 text-[9px] text-brand-indigo">
                  <Building2 size={10} />
                </span>
                <span className="text-[11px] font-bold text-brand-navy leading-none">
                  Plot {currentParcel.id} Details
                </span>
              </div>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded uppercase leading-none">
                Matched
              </span>
            </div>

            {/* Info table */}
            <div className="space-y-1.5 text-[10px] font-semibold text-brand-navy/70">
              <div className="flex justify-between">
                <span>KIDE:</span>
                <span className="font-mono text-brand-navy">{currentDetails.kide}</span>
              </div>
              <div className="flex justify-between">
                <span>PNIU:</span>
                <span className="font-mono text-brand-navy truncate max-w-[120px]">
                  {currentDetails.pniu}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GISCODE:</span>
                <span className="font-mono text-brand-navy">{currentDetails.giscode}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-brand-indigo flex items-center gap-0.5">
                  <Sparkles size={8} /> Ready to Acquire
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-3 flex gap-2">
              <button className="flex-1 bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-lg py-1.5 text-[9px] font-bold shadow-soft transition active:scale-95">
                Acquire Plot
              </button>
              <button className="flex-1 border border-border bg-white hover:bg-brand-navy/5 text-brand-navy/80 rounded-lg py-1.5 text-[9px] font-bold shadow-soft transition active:scale-95">
                More Info
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
