"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MapPin, FileText, UserCog, Handshake, Gavel, Home, Plane, FileCheck2,
  Bell, Puzzle, CloudUpload, Users2,
  ArrowRight, ArrowUpRight,
  // detail-bullet icons
  Map, Satellite, Search, Layers3, Ruler, Compass, Download, MapPinned,
  FolderArchive, ScanText, History, Cloud, CalendarClock, Share2, ClipboardList,
  User, Users, Repeat, Sparkles, BadgeCheck, UserCheck, Link2,
  Workflow, UserSquare, Calculator, ClipboardCheck, CreditCard, Milestone, LayoutDashboard, BarChart3,
  CalendarDays, Activity, UserRoundCheck, Paperclip, ListOrdered, Timer, FileBarChart,
  TrendingUp, Building2, LineChart, Sliders,
  Scan, AlertTriangle, Radar, FileWarning,
  Settings2, MessageSquare, Inbox, Rocket,
  Mail, Server, Database, KeyRound, ShieldCheck, Cog,
  Upload, FileSpreadsheet, FileType2, Shapes, AlertCircle,
  UsersRound, HeartHandshake, HandCoins, ClipboardType,
} from "lucide-react";
import {
  GISVisual, RecordsVisual, OwnershipVisual, AcquisitionVisual, LitigationVisual,
  ValuationVisual, EncroachmentVisual, WorkflowVisual, AlertsVisual,
  IntegrationsVisual, UploadVisual, RRVisual,
} from "@/components/sections/core-features/SectionVisuals";

const EASE = [0.22, 1, 0.36, 1] as const;

/* --------------------------------------------------
   Palette per category — matches reference (image 2)
   -------------------------------------------------- */
const PALETTES = {
  green:  { chipBg: "bg-emerald-50", chipText: "text-emerald-600", bar: "bg-emerald-500", ring: "ring-emerald-400/30", ringSoft: "ring-emerald-500/30", grad: "from-emerald-600 to-teal-600" },
  violet: { chipBg: "bg-violet-50",  chipText: "text-violet-600",  bar: "bg-violet-500",  ring: "ring-violet-400/30",  ringSoft: "ring-violet-500/30",  grad: "from-violet-600 to-purple-600" },
  purple: { chipBg: "bg-purple-50",  chipText: "text-purple-600",  bar: "bg-purple-500",  ring: "ring-purple-400/30",  ringSoft: "ring-purple-500/30",  grad: "from-purple-600 to-fuchsia-600" },
  teal:   { chipBg: "bg-teal-50",    chipText: "text-teal-600",    bar: "bg-teal-500",    ring: "ring-teal-400/30",    ringSoft: "ring-teal-500/30",    grad: "from-teal-600 to-cyan-600" },
  rose:   { chipBg: "bg-rose-50",    chipText: "text-rose-600",    bar: "bg-rose-500",    ring: "ring-rose-400/30",    ringSoft: "ring-rose-500/30",    grad: "from-rose-600 to-pink-600" },
  orange: { chipBg: "bg-orange-50",  chipText: "text-orange-500",  bar: "bg-orange-500",  ring: "ring-orange-400/30",  ringSoft: "ring-orange-500/30",  grad: "from-orange-500 to-amber-500" },
  blue:   { chipBg: "bg-blue-50",    chipText: "text-blue-600",    bar: "bg-blue-500",    ring: "ring-blue-400/30",    ringSoft: "ring-blue-500/30",    grad: "from-blue-600 to-indigo-600" },
  amber:  { chipBg: "bg-amber-50",   chipText: "text-amber-600",   bar: "bg-amber-500",   ring: "ring-amber-400/30",   ringSoft: "ring-amber-500/30",   grad: "from-amber-500 to-yellow-500" },
  sky:    { chipBg: "bg-sky-50",     chipText: "text-sky-600",     bar: "bg-sky-500",     ring: "ring-sky-400/30",     ringSoft: "ring-sky-500/30",     grad: "from-sky-600 to-cyan-600" },
  pink:   { chipBg: "bg-pink-50",    chipText: "text-pink-600",    bar: "bg-pink-500",    ring: "ring-pink-400/30",    ringSoft: "ring-pink-500/30",    grad: "from-pink-600 to-rose-600" },
} as const;

type PaletteKey = keyof typeof PALETTES;

/* --------------------------------------------------
   Category cards (hero)
   -------------------------------------------------- */
type Category = {
  id: string;
  index: number;
  icon: any;
  title: string;
  short: string;
  palette: PaletteKey;
};

const CATEGORIES: Category[] = [
  { id: "gis",          index: 1,  icon: MapPin,      title: "GIS Based Land Mapping",       short: "Visualize every parcel with interactive cadastre maps.",         palette: "green"  },
  { id: "records",      index: 2,  icon: FileText,    title: "Digital Land Records",         short: "One secure, OCR-indexed vault for every land document.",         palette: "violet" },
  { id: "ownership",    index: 3,  icon: UserCog,     title: "Ownership Management",         short: "Track ownership, transfers and full family lineage history.",    palette: "purple" },
  { id: "acquisition",  index: 4,  icon: Handshake,   title: "Land Acquisition Management",  short: "Streamline the entire acquisition, approval and payout pipeline.", palette: "teal" },
  { id: "litigation",   index: 5,  icon: Gavel,       title: "Litigation Management",        short: "Manage court cases, hearings and orders with smart reminders.",  palette: "rose"   },
  { id: "valuation",    index: 6,  icon: Home,        title: "Land Rate & Valuation",        short: "Accurate circle rates and valuation reports for smart decisions.", palette: "green" },
  { id: "encroachment", index: 7,  icon: Plane,       title: "Encroachment Detection",       short: "AI-powered change detection on satellite and drone imagery.",    palette: "orange" },
  { id: "workflow",     index: 8,  icon: FileCheck2,  title: "Document Workflow & Approvals",short: "Automate document verification and approvals across teams.",     palette: "blue"   },
  { id: "alerts",       index: 9,  icon: Bell,        title: "Alerts & Notifications",       short: "Real-time alerts for tasks, hearings, deadlines and approvals.", palette: "amber"  },
  { id: "integrations", index: 10, icon: Puzzle,      title: "Easy Integrations",            short: "Connect Oxland with SAP, Oracle, GIS and gov portals.",          palette: "violet" },
  { id: "upload",       index: 11, icon: CloudUpload, title: "Simple Data Upload",           short: "Bulk upload Excel, CSV and Shapefile with secure validation.",   palette: "sky"    },
  { id: "rr",           index: 12, icon: Users2,      title: "R&R Management",               short: "Track rehabilitation and resettlement family by family.",        palette: "pink"   },
];

/* --------------------------------------------------
   Detail data — shown one at a time below hero
   -------------------------------------------------- */
type Bullet = { icon: any; text: string };
type Detail = {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  description: string;
  bullets: Bullet[];
  Visual: React.ComponentType;
};

const DETAILS: Record<string, Detail> = {
  gis: {
    eyebrow: "GIS Based Land Mapping",
    heading: "Visualize every parcel with",
    headingAccent: "interactive GIS.",
    description: "Cadastre-first mapping that snaps polygons to district boundaries and surfaces every parcel, owner, and encumbrance in one click. Built for the way Indian revenue departments actually work.",
    bullets: [
      { icon: Map, text: "Interactive GIS maps with cadastral boundaries" },
      { icon: Satellite, text: "Satellite, drone & survey layer integration" },
      { icon: Search, text: "Smart plot search and filtering" },
      { icon: Layers3, text: "Multi-layer map visualization" },
      { icon: Ruler, text: "Area & distance measurement tools" },
      { icon: Compass, text: "Plot status and ownership visualization" },
      { icon: Download, text: "High-resolution map exports" },
      { icon: MapPinned, text: "Real-time location insights" },
    ],
    Visual: GISVisual,
  },
  records: {
    eyebrow: "Digital Land Records",
    heading: "One secure repository for",
    headingAccent: "every land document.",
    description: "RoRs, mutation registers, encumbrance certificates and consent letters — all in a single vault, versioned, OCR-indexed and searchable in ten Indian languages.",
    bullets: [
      { icon: FolderArchive, text: "Centralized digital document repository" },
      { icon: ScanText, text: "OCR-based document indexing" },
      { icon: Search, text: "Smart search and quick retrieval" },
      { icon: History, text: "Version history tracking" },
      { icon: Cloud, text: "Secure cloud storage" },
      { icon: CalendarClock, text: "Document expiry reminders" },
      { icon: Share2, text: "Instant document sharing" },
      { icon: ClipboardList, text: "Complete audit trail" },
    ],
    Visual: RecordsVisual,
  },
  ownership: {
    eyebrow: "Ownership Management",
    heading: "Maintain the",
    headingAccent: "full ownership history.",
    description: "Every heir, every purchase, every partition. Oxland reconstructs the ownership chain so legal, revenue and audit teams see the same truth at the same time.",
    bullets: [
      { icon: User, text: "Owner profile management" },
      { icon: Users, text: "Joint ownership support" },
      { icon: Repeat, text: "Ownership transfer history" },
      { icon: Sparkles, text: "Family lineage tracking" },
      { icon: BadgeCheck, text: "Legal heir records" },
      { icon: UserCheck, text: "KYC information management" },
      { icon: Link2, text: "Linked land parcels" },
      { icon: History, text: "Transparent ownership timeline" },
    ],
    Visual: OwnershipVisual,
  },
  acquisition: {
    eyebrow: "Land Acquisition Management",
    heading: "Digitize the entire",
    headingAccent: "acquisition lifecycle.",
    description: "Identification, negotiation, consent capture, award computation, disbursement — one pipeline, one audit trail, one number to trust when the ministry asks.",
    bullets: [
      { icon: Workflow, text: "End-to-end acquisition workflow" },
      { icon: UserSquare, text: "Landowner information management" },
      { icon: Calculator, text: "Compensation calculation" },
      { icon: ClipboardCheck, text: "Approval workflow tracking" },
      { icon: CreditCard, text: "Payment monitoring" },
      { icon: Milestone, text: "Project milestone tracking" },
      { icon: LayoutDashboard, text: "Acquisition status dashboard" },
      { icon: BarChart3, text: "Progress reporting" },
    ],
    Visual: AcquisitionVisual,
  },
  litigation: {
    eyebrow: "Litigation Management",
    heading: "Stay ahead of",
    headingAccent: "every legal case.",
    description: "Cases, hearings, cause lists, orders — indexed by parcel and by counsel, with reminders that fire before deadlines slip. Litigation stops being a folder of PDFs.",
    bullets: [
      { icon: Gavel, text: "Court case management" },
      { icon: CalendarDays, text: "Hearing date reminders" },
      { icon: Activity, text: "Case status tracking" },
      { icon: UserRoundCheck, text: "Advocate assignment" },
      { icon: Paperclip, text: "Document attachment" },
      { icon: ListOrdered, text: "Cause list monitoring" },
      { icon: Timer, text: "Legal timeline visualization" },
      { icon: FileBarChart, text: "Litigation reports" },
    ],
    Visual: LitigationVisual,
  },
  valuation: {
    eyebrow: "Land Rate & Valuation",
    heading: "Make smarter decisions with",
    headingAccent: "accurate valuation.",
    description: "Circle rates, guideline values, market comps and historical price trends — all against your parcel geometry. So compensation offers land right the first time.",
    bullets: [
      { icon: TrendingUp, text: "Market rate management" },
      { icon: Home, text: "Circle / guideline value records" },
      { icon: Building2, text: "Plot-wise valuation" },
      { icon: Calculator, text: "Compensation estimation" },
      { icon: LineChart, text: "Historical price comparison" },
      { icon: FileBarChart, text: "Valuation reports" },
      { icon: Sliders, text: "Custom valuation parameters" },
      { icon: BarChart3, text: "Decision support analytics" },
    ],
    Visual: ValuationVisual,
  },
  encroachment: {
    eyebrow: "Encroachment Detection",
    heading: "Detect unauthorized",
    headingAccent: "land changes instantly.",
    description: "AI compares today's imagery with your baseline and surfaces boundary breaches within minutes — before they become disputes, protests or news headlines.",
    bullets: [
      { icon: Scan, text: "AI-powered change detection" },
      { icon: Satellite, text: "Satellite image comparison" },
      { icon: Plane, text: "Drone imagery analysis" },
      { icon: AlertTriangle, text: "Boundary violation alerts" },
      { icon: Radar, text: "Encroachment monitoring" },
      { icon: History, text: "Historical change timeline" },
      { icon: Map, text: "GIS-based visualization" },
      { icon: FileWarning, text: "Automated reports" },
    ],
    Visual: EncroachmentVisual,
  },
  workflow: {
    eyebrow: "Document Workflow & Approvals",
    heading: "Automate every",
    headingAccent: "approval process.",
    description: "Configurable multi-level workflows for consent letters, award orders and payment sign-offs — with digital verification, comments and full history behind every signature.",
    bullets: [
      { icon: Workflow, text: "Multi-level approval workflow" },
      { icon: Settings2, text: "Configurable approval stages" },
      { icon: FileCheck2, text: "Digital verification" },
      { icon: MessageSquare, text: "Review comments" },
      { icon: Inbox, text: "Pending approval dashboard" },
      { icon: Bell, text: "Approval notifications" },
      { icon: History, text: "Complete workflow history" },
      { icon: Rocket, text: "Faster processing" },
    ],
    Visual: WorkflowVisual,
  },
  alerts: {
    eyebrow: "Alerts & Notifications",
    heading: "Never miss a",
    headingAccent: "critical update.",
    description: "Smart alerts fired by the platform itself — hearing tomorrow, document expiring, encroachment detected, approval waiting. Delivered where your team already lives.",
    bullets: [
      { icon: CalendarClock, text: "Hearing reminders" },
      { icon: FileWarning, text: "Document expiry alerts" },
      { icon: ClipboardCheck, text: "Approval notifications" },
      { icon: Milestone, text: "Acquisition milestone alerts" },
      { icon: Repeat, text: "Ownership change notifications" },
      { icon: History, text: "Land record updates" },
      { icon: Mail, text: "Email & SMS notifications" },
      { icon: Activity, text: "Real-time activity alerts" },
    ],
    Visual: AlertsVisual,
  },
  integrations: {
    eyebrow: "Easy Integrations",
    heading: "Connect Oxland with",
    headingAccent: "your existing stack.",
    description: "REST APIs and battle-tested connectors for SAP, Oracle, Tally, Zoho, Microsoft Dynamics, NIC GIS and state land-record portals. Data flows both ways.",
    bullets: [
      { icon: Cog, text: "REST API integration" },
      { icon: Server, text: "ERP connectivity" },
      { icon: Database, text: "SAP integration" },
      { icon: Map, text: "GIS server integration" },
      { icon: Plane, text: "Drone data integration" },
      { icon: Building2, text: "Government land record systems" },
      { icon: KeyRound, text: "Third-party authentication" },
      { icon: ShieldCheck, text: "Secure data exchange" },
    ],
    Visual: IntegrationsVisual,
  },
  upload: {
    eyebrow: "Simple Data Upload",
    heading: "Import existing data",
    headingAccent: "in minutes.",
    description: "Drag in messy Excel, Shapefile, KML or CSV — Oxland cleans, dedupes, validates and maps to parcels. Migration from legacy systems stops being a six-month project.",
    bullets: [
      { icon: FileSpreadsheet, text: "Bulk Excel import" },
      { icon: FileType2, text: "CSV upload support" },
      { icon: Shapes, text: "GIS Shapefile import" },
      { icon: Map, text: "KML & GeoJSON support" },
      { icon: Upload, text: "Bulk document upload" },
      { icon: BadgeCheck, text: "Automated data validation" },
      { icon: AlertCircle, text: "Error reporting" },
      { icon: Rocket, text: "Quick migration tools" },
    ],
    Visual: UploadVisual,
  },
  rr: {
    eyebrow: "R&R Management",
    heading: "Manage rehabilitation &",
    headingAccent: "resettlement with confidence.",
    description: "Family-wise tracking from displacement notice to livelihood restoration. Every beneficiary, every disbursement, every housing allotment — visible to legal, ministry and audit.",
    bullets: [
      { icon: UsersRound, text: "Beneficiary management" },
      { icon: HeartHandshake, text: "Family-wise R&R tracking" },
      { icon: HandCoins, text: "Compensation monitoring" },
      { icon: Home, text: "Resettlement progress tracking" },
      { icon: Sparkles, text: "Livelihood restoration records" },
      { icon: CreditCard, text: "Benefit distribution management" },
      { icon: ClipboardType, text: "Compliance reporting" },
      { icon: LayoutDashboard, text: "Complete R&R dashboard" },
    ],
    Visual: RRVisual,
  },
};

/* --------------------------------------------------
   Main component — hero + interactive detail below
   -------------------------------------------------- */
const AUTO_CYCLE_MS = 3000;

export default function HeroInteractive() {
  const [active, setActive] = useState<string>("gis");
  const [autoPlay, setAutoPlay] = useState(true);
  const reduce = useReducedMotion();
  const navScrollRef = useRef<HTMLDivElement>(null);
  const activeCat = CATEGORIES.find((c) => c.id === active)!;
  const activePalette = PALETTES[activeCat.palette];
  const detail = DETAILS[active];
  const Visual = detail.Visual;

  // User interaction stops the auto-cycle permanently AND scrolls to the detail.
  const selectManually = (id: string, scroll = true) => {
    setActive(id);
    setAutoPlay(false);
    if (!scroll || typeof window === "undefined") return;

    const el = document.getElementById("feature-detail");
    if (!el) return;

    // Prefer Lenis (smooth-scroll library) so we don't fight it — that was the
    // root cause of the two-click issue. Fall back to native smooth scroll.
    // Larger offset so the detail lands BELOW the sticky jump-nav strip.
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(el, { offset: -170, duration: 1.4 });
    } else {
      const rect = el.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - 170;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  // On mount, honour a URL hash — e.g. /features#litigation opens on that pillar
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash && CATEGORIES.some((c) => c.id === hash)) {
      // Wait a beat so the layout settles before scrolling
      requestAnimationFrame(() => selectManually(hash, true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-cycle: advance every 3s while autoPlay is true and user hasn't clicked.
  useEffect(() => {
    if (!autoPlay || reduce) return;
    const interval = setInterval(() => {
      setActive((prev) => {
        const currentIndex = CATEGORIES.findIndex((c) => c.id === prev);
        const nextIndex = (currentIndex + 1) % CATEGORIES.length;
        return CATEGORIES[nextIndex].id;
      });
    }, AUTO_CYCLE_MS);
    return () => clearInterval(interval);
  }, [autoPlay, reduce]);

  // Auto-scroll the jump-nav so the active pill is always visible & centered.
  useEffect(() => {
    const container = navScrollRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLButtonElement>(`[data-cat="${active}"]`);
    if (!btn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const currentScroll = container.scrollLeft;
    const btnOffset = btnRect.left - containerRect.left;
    // Target: center the active pill horizontally within the visible strip.
    const target =
      currentScroll + btnOffset - containerRect.width / 2 + btnRect.width / 2;

    container.scrollTo({
      left: Math.max(0, target),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, reduce]);

  return (
    <>
      {/* --------------------- HERO --------------------- */}
      <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: "url(/features-background.png)" }}
          />
          {/* Softening veil so black headline stays readable, mountain still visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/10 to-white/40" />
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-grid-faint [background-size:42px_42px] opacity-20" />
          {/* Signature purple ambient orb */}
          <div
            className="absolute -top-40 right-0 h-[480px] w-[720px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(167,139,250,0.28), rgba(79,70,229,0.14) 50%, transparent 75%)",
            }}
          />
        </div>

        <div className="container relative">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            {/* LEFT — copy + static dashboard */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                Our core features
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
                className="mt-5 font-display text-[36px] font-extrabold leading-[1.05] tracking-tight text-black sm:text-[42px] lg:text-[46px]"
              >
                Everything You Need,<br />
                <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-purple bg-clip-text text-transparent">
                  All in One Place.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
                className="mt-4 max-w-md text-[15px] leading-relaxed text-black/70"
              >
                Explore the powerful modules that make Oxland the complete land management solution.
              </motion.p>

              {/* Static dashboard image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.28 }}
                className="mt-7 relative w-full max-w-[500px] overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-float"
              >
                <img
                  src="/Dashboard 1.jpg"
                  alt="Oxland dashboard"
                  className="block h-auto w-full select-none"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* RIGHT — compact 4×3 category grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
              {CATEGORIES.map((c, i) => {
                const isActive = active === c.id;
                const p = PALETTES[c.palette];
                return (
                  <motion.button
                    key={c.id}
                    type="button"
                    onClick={() => selectManually(c.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.05 + i * 0.025 }}
                    whileHover={{ y: -2 }}
                    className={`group relative overflow-hidden rounded-2xl border bg-white p-4 text-left transition-all sm:p-4 ${
                      isActive
                        ? `border-transparent shadow-float ring-2 ${p.ring}`
                        : "border-brand-navy/10 shadow-card hover:border-brand-navy/20"
                    }`}
                  >
                    {/* Number badge */}
                    <div className="absolute right-2.5 top-2 font-display text-[10px] font-bold text-brand-navy/30">
                      {String(c.index).padStart(2, "0")}
                    </div>

                    {/* Icon chip */}
                    <span className={`grid h-10 w-10 place-items-center rounded-xl ${p.chipBg} ${p.chipText}`}>
                      <c.icon size={19} strokeWidth={2.5} />
                    </span>

                    {/* Title */}
                    <h3 className="mt-3 font-display text-[13px] font-extrabold leading-tight text-brand-navy">
                      {c.title}
                    </h3>

                    {/* Colored accent bar */}
                    <div className={`mt-1.5 h-0.5 w-7 rounded-full ${p.bar}`} />

                    {/* Description */}
                    <p className="mt-2.5 text-[11px] leading-snug text-brand-navy/55">
                      {c.short}
                    </p>

                    {/* Active corner arrow */}
                    {isActive && (
                      <motion.span
                        layoutId="card-arrow"
                        className={`absolute bottom-2 right-2 grid h-5 w-5 place-items-center rounded-full ${p.chipBg} ${p.chipText} ring-2 ring-white`}
                      >
                        <ArrowUpRight size={10} strokeWidth={3} />
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* --------------- STICKY JUMP NAV + DETAIL wrap ---------------
           Wrapping both in a common parent so the sticky nav stays
           visible for the entire duration of the detail section. */}
      <div className="relative">

      {/* Spacer above the sticky pill — kept outside the sticky element */}
      <div className="pt-8 sm:pt-12" aria-hidden="true" />

      {/* --------------------- JUMP NAV — sync with hero cards ---------------------
           Sits at `top-24` so it clears the floating main navbar with a clean gap.
           Bounded by the parent wrapper so it releases once the detail section ends. */}
      <div className="sticky top-24 z-30">
        <div className="container">
          <div className="relative overflow-hidden rounded-full border border-brand-navy/10 bg-white shadow-float">
            {/* Edge fades — hint that more pills exist off-screen */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-white to-transparent" />
            <div
              ref={navScrollRef}
              className="flex items-center gap-1 overflow-x-auto scroll-smooth p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CATEGORIES.map((c) => {
                const isActive = active === c.id;
                const p = PALETTES[c.palette];
                return (
                  <button
                    key={c.id}
                    type="button"
                    data-cat={c.id}
                    onClick={() => selectManually(c.id)}
                    className={`group flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-all ${
                      isActive
                        ? `${p.chipBg} ${p.chipText} shadow-soft ring-1 ${p.ringSoft}`
                        : "text-brand-navy/65 hover:bg-brand-navy/[0.04] hover:text-brand-navy"
                    }`}
                  >
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                      isActive ? "bg-white/70" : `${p.chipBg} ${p.chipText}`
                    }`}>
                      <c.icon size={12} strokeWidth={2.5} />
                    </span>
                    <span className="whitespace-nowrap">
                      <span className={`mr-1.5 text-[10px] font-bold ${isActive ? "opacity-70" : "text-brand-navy/40"}`}>
                        {String(c.index).padStart(2, "0")}
                      </span>
                      {c.title}
                    </span>
                    {/* Auto-cycle progress pill (only on active + autoplay) */}
                    {isActive && autoPlay && !reduce && (
                      <motion.span
                        aria-hidden
                        key={c.id}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTO_CYCLE_MS / 1000, ease: "linear" }}
                        className={`ml-1 h-1 rounded-full ${p.bar}`}
                        style={{ maxWidth: 20 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          {autoPlay && !reduce && (
            <p className="mt-3 text-center text-[11px] font-semibold text-brand-navy/40">
              Auto-cycling every 3s · <button type="button" onClick={() => setAutoPlay(false)} className="underline decoration-dotted underline-offset-2 hover:text-brand-navy/70">pause</button>
            </p>
          )}
        </div>
      </div>

      {/* Spacer below the sticky pill */}
      <div className="pb-4 sm:pb-6" aria-hidden="true" />

      {/* --------------------- DETAIL — one at a time --------------------- */}
      <section id="feature-detail" className="relative py-12 sm:py-20">
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${
          activeCat.palette === "green" ? "from-emerald-50/40" :
          activeCat.palette === "violet" ? "from-violet-50/40" :
          activeCat.palette === "purple" ? "from-purple-50/40" :
          activeCat.palette === "teal" ? "from-teal-50/40" :
          activeCat.palette === "rose" ? "from-rose-50/40" :
          activeCat.palette === "orange" ? "from-orange-50/40" :
          activeCat.palette === "blue" ? "from-blue-50/40" :
          activeCat.palette === "amber" ? "from-amber-50/40" :
          activeCat.palette === "sky" ? "from-sky-50/40" :
          "from-pink-50/40"
        } to-transparent transition-colors duration-500`} />

        <div className="container relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
            >
              {/* COPY */}
              <div>
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${activePalette.chipText} ${activePalette.chipBg} border-current/25`}>
                  <span className="font-extrabold">{String(activeCat.index).padStart(2, "0")}</span>
                  <span className={`h-1 w-6 rounded-full ${activePalette.bar}`} />
                  {detail.eyebrow}
                </div>

                <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl">
                  {detail.heading}{" "}
                  <span className={`bg-gradient-to-r ${activePalette.grad} bg-clip-text text-transparent`}>
                    {detail.headingAccent}
                  </span>
                </h2>

                <p className="mt-5 text-base leading-relaxed text-brand-navy/65 sm:text-lg">
                  {detail.description}
                </p>

                <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  {detail.bullets.map((b) => {
                    const Icon = b.icon;
                    return (
                      <li key={b.text} className="flex items-center gap-3.5 text-[15px] font-medium text-brand-navy/85">
                        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${activePalette.chipBg} ${activePalette.chipText} shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_2px_8px_-2px_rgba(11,20,55,0.08)] ring-1 ${activePalette.ringSoft}`}>
                          <Icon size={20} strokeWidth={2.5} />
                        </span>
                        <span className="leading-snug">{b.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-9 flex items-center gap-3">
                  <a
                    href="#"
                    className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-float bg-gradient-to-r ${activePalette.grad}`}
                  >
                    Explore more
                    <ArrowRight
                      size={14}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>

              {/* VISUAL */}
              <div>
                <Visual />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      </div>
      {/* end sticky nav + detail wrapper */}
    </>
  );
}
