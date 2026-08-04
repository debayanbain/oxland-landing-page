"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar, Search, ArrowUpRight, SearchX } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Post = {
  slug: string;
  category: string;
  categoryPalette: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  image: string;
};

const posts: Post[] = [
  {
    slug: "gis-drone-solar-lifecycle",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "How GIS and Drone Technology Boost Profit Across the Solar Project Lifecycle",
    excerpt:
      "Solar projects keep getting bigger — and harder. GIS site analysis and drone surveys help teams pick better sites, design for maximum yield, cut construction cost and keep every panel producing across the whole lifecycle.",
    author: "Arghya Sharma",
    authorInitials: "AS",
    date: "03 Aug 2026",
    readTime: "7 min read",
    image: "/blog/GIS%20and%20Drone%20Technology%20Boost%20Profit%20Across%20the%20Solar%20Project%20Lifecycle.jpg",
  },
  {
    slug: "advanced-tech-field-surveys",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "How Advanced Technologies are Transforming Field Surveys",
    excerpt:
      "Manual field surveys are slow, costly and error-prone. Drones, AI, GIS, IoT sensors, mobile apps and even blockchain are making data collection faster, more accurate and far more efficient.",
    author: "Smriti Ranjan Ghosh",
    authorInitials: "SG",
    date: "03 Aug 2026",
    readTime: "6 min read",
    image: "/blog/How%20Advanced%20Technologies%20are%20Transforming%20Field%20Surveys.jpg",
  },
  {
    slug: "drones-industrial-plant-inspections",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "How Drones are Revolutionising Inspections and Monitoring in Industrial Plants",
    excerpt:
      "Traditional plant inspections mean shutdowns, scaffolding and people in harm's way. Industrial drones deliver zero-downtime, safer, earlier fault detection across steel, power and mining — and it's only accelerating.",
    author: "Saheli Bhadra",
    authorInitials: "SB",
    date: "02 Aug 2026",
    readTime: "6 min read",
    image: "/blog/Drones%20are%20Revolutionising%20Inspections%20and%20Monitoring%20in%20Industrial%20Plants.jpg",
  },
  {
    slug: "digital-land-bank-gw-projects",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "A Digital Land Bank Built for GW Projects",
    excerpt:
      "Managing land for GW-scale renewable projects takes far more than a parcel list. Here's how OxLand unifies GeoAI, verified records, legal intelligence, valuation and acquisition workflows into one configurable enterprise land bank.",
    author: "Saheli Bhadra",
    authorInitials: "SB",
    date: "27 Jul 2026",
    readTime: "7 min read",
    image: "/blog/A-Digital-Land-Bank-Built-for-GW-Projects.webp",
  },
  {
    slug: "oxland-complete-land-management",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "OxLand — A Complete Land Management System for Industries",
    excerpt:
      "For any industry, land is one of the most valuable assets — yet it's often managed with scattered records, slow surveys and unclear ownership. OxLand brings the entire land lifecycle into one digital platform: faster, more transparent and far easier to handle.",
    author: "Ankita Das",
    authorInitials: "AD",
    date: "01 Aug 2026",
    readTime: "5 min read",
    image: "/blog/OxLand%20%E2%80%93%20A%20Complete%20Land%20Management%20System%20for%20Industries.jpg",
  },
  {
    slug: "geospatial-digital-twins",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "Transforming Industries with Geospatial Digital Twins",
    excerpt:
      "A geospatial digital twin is far more than a fancy 3D map. By fusing real-time sensor data, location intelligence and prediction, it becomes a live decision engine for mining, utilities, agriculture, manufacturing and public-sector planning.",
    author: "Arghya Sharma",
    authorInitials: "AS",
    date: "31 Jul 2026",
    readTime: "8 min read",
    image: "/blog/Transforming%20Industries%20with%20Geospatial%20Digital%20Twins.jpg",
  },
  {
    slug: "gis-watershed-monitoring",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "GIS-Based Watershed Monitoring: A Game-Changer for Industries",
    excerpt:
      "Watershed conditions directly shape industrial operations — especially where water use, discharge and compliance are involved. GIS-based monitoring replaces fragmented, reactive methods with a comprehensive, real-time view of environmental risk.",
    author: "Soumi Das",
    authorInitials: "SD",
    date: "30 Jul 2026",
    readTime: "6 min read",
    image: "/blog/GIS-Based%20Watershed%20Monitoring.jpg",
  },
  {
    slug: "uavs-modern-mining",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "The Role of UAVs in Modern Mining Operations",
    excerpt:
      "Open-cast mining moves earth by the hour — pits widen, benches rise, the ground never stops changing. Drones fly fast, see more and keep people safe across mapping, monitoring, blasting, inspection and compliance.",
    author: "Smriti Ranjan Ghosh",
    authorInitials: "SG",
    date: "29 Jul 2026",
    readTime: "6 min read",
    image: "/blog/The%20Role%20of%20UAVs%20in%20Modern%20Mining%20Operations.jpg",
  },
  {
    slug: "land-acquisition-monitoring-system",
    category: "Land Acquisition",
    categoryPalette: "bg-brand-purple/10 text-brand-purple",
    title: "Why Industries Need a Land Acquisition Monitoring System",
    excerpt:
      "Every factory, mine and warehouse starts with land — yet acquiring and managing it is often the hardest part of a project. A monitoring system isn't about fancy technology; it's about reducing uncertainty across ownership, approvals, disputes and compliance.",
    author: "Saheli Bhadra",
    authorInitials: "SB",
    date: "28 Jul 2026",
    readTime: "5 min read",
    image: "/blog/Why%20Industries%20Need%20a%20Land%20Acquisition%20Monitoring%20System.png",
  },
  {
    slug: "biggest-challenge-in-infrastructure",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "The Biggest Challenge in Infrastructure Isn't Construction. It's Land.",
    excerpt:
      "Engineering, financing and execution get the spotlight — but land acquisition and fragmented land information quietly drive most infrastructure delays in India. The real fix isn't acquiring land faster; it's managing land information better.",
    author: "Smriti Ranjan Ghosh",
    authorInitials: "SG",
    date: "21 Jul 2026",
    readTime: "4 min read",
    image: "/blog/Biggest-Challenge-in-Infrastructure.webp",
  },
  {
    slug: "industries-land-of-opportunities",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "Industries Want a \"Land of Opportunities,\" But Often Forget to Manage the Land Bank Properly",
    excerpt: "Investment summits, industrial corridors and manufacturing hubs are booming — but many projects still stumble because their land bank is managed on spreadsheets and paper maps. Here's what needs to change.",
    author: "Ankita Das",
    authorInitials: "AD",
    date: "10 Mar 2026",
    readTime: "6 min read",
    image: "/blog/Land-of-Opportunities.png",
  },
  {
    slug: "land-acquisition-india-complex",
    category: "Land Acquisition",
    categoryPalette: "bg-brand-purple/10 text-brand-purple",
    title: "Why Land Acquisition in India is Complex — And How OxLand Simplifies It",
    excerpt: "India's land data is scattered across formats, languages, and authorities. Here's why that fragmentation costs infrastructure projects months of delay — and how a unified platform fixes it.",
    author: "Saheli Bhadra",
    authorInitials: "SB",
    date: "05 Mar 2026",
    readTime: "5 min read",
    image: "/blog/Land-Acquisition-in-India.png",
  },
  {
    slug: "one-land-dispute",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "One Land Dispute Can Halt Years of Industrial Growth",
    excerpt: "A missing document, an outdated survey map, an encroachment — a single unresolved land issue can freeze projects worth crores. Why proactive, GIS-enabled Land Management is a business necessity.",
    author: "Soumi Das",
    authorInitials: "SD",
    date: "28 Feb 2026",
    readTime: "7 min read",
    image: "/blog/One-Land-Dispute.png",
  },
  {
    slug: "land-acquisition-row",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "Land Acquisition & ROW for Linear Projects: Start Right with OxLand",
    excerpt: "Roads, highways, railways, pipelines and transmission corridors all begin with one thing — Right of Way. Here are the nine pillars of getting it right, and why continuous monitoring changes everything.",
    author: "Arghya Sharma",
    authorInitials: "AS",
    date: "20 Feb 2026",
    readTime: "6 min read",
    image: "/blog/Land-Acquisition-%26-ROW.png",
  },
  {
    slug: "who-we-are",
    category: "Company",
    categoryPalette: "bg-emerald-50 text-emerald-600",
    title: "Who We Are — And How We're Helping India's Land Ops Teams",
    excerpt: "Land acquisition in India is stuck between a spreadsheet, a court order and a scanned PDF. Here's why we built Oxland — and what it means for the people who actually run these projects.",
    author: "Smriti Ranjan Ghosh",
    authorInitials: "SG",
    date: "12 Feb 2026",
    readTime: "6 min read",
    image: "/features-background.webp",
  },
];

const CATEGORIES = ["All", "Land Management", "Land Acquisition", "Company"];
const FEATURED_SLUG = "digital-land-bank-gw-projects";

export default function BlogArchive() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (q) {
        const hay =
          p.title.toLowerCase() +
          " " +
          p.excerpt.toLowerCase() +
          " " +
          p.author.toLowerCase() +
          " " +
          p.category.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, search]);

  const showFeaturedCard = category === "All" && !search.trim();
  const featured = posts.find((p) => p.slug === FEATURED_SLUG)!;
  const gridPosts = showFeaturedCard
    ? filtered.filter((p) => p.slug !== FEATURED_SLUG)
    : filtered;

  const activePaletteBar =
    category === "All"
      ? "bg-brand-navy text-white"
      : "bg-brand-indigo text-white";

  return (
    <>
      {/* ---------- CATEGORY FILTER (below hero, above featured) ---------- */}
      <section className="relative pb-8 sm:pb-10">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`relative rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                    active
                      ? `${activePaletteBar} shadow-soft`
                      : "border border-brand-navy/10 bg-white text-brand-navy/70 hover:bg-brand-navy/[0.04]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED (only when All + no search) ---------- */}
      <AnimatePresence initial={false}>
        {showFeaturedCard && (
          <motion.section
            key="featured"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative overflow-hidden pb-12 sm:pb-16"
          >
            <div className="container">
              <a
                href={`/blog/${featured.slug}`}
                className="group relative grid overflow-hidden rounded-[32px] border border-brand-navy/10 bg-white shadow-float lg:grid-cols-[1.1fr_1fr]"
              >
                <div className="relative aspect-[16/9] overflow-hidden lg:self-start">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/20 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-indigo shadow-soft backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
                    Featured
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-10">
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${featured.categoryPalette}`}
                  >
                    {featured.category}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-extrabold leading-[1.15] text-brand-navy sm:text-[25px] lg:text-[26px]">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-brand-navy/65 line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-brand-navy/55">
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-indigo/10 font-display text-[10px] font-extrabold text-brand-indigo">
                        {featured.authorInitials}
                      </span>
                      <span className="font-semibold text-brand-navy/80">{featured.author}</span>
                    </div>
                    <span className="flex items-center gap-1"><Calendar size={11} />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{featured.readTime}</span>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">
                    Read the story
                    <ArrowRight size={14} strokeWidth={2.5} className="text-brand-indigo transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ---------- POSTS GRID + SEARCH ---------- */}
      <section className="relative py-8 sm:py-12">
        <div className="container">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">
                {category === "All" && !search.trim()
                  ? "Latest posts"
                  : "Search results"}
              </h2>
              <p className="mt-1 text-[13px] text-brand-navy/55">
                {filtered.length} {filtered.length === 1 ? "post" : "posts"}
                {category !== "All" && ` in ${category}`}
                {search.trim() && ` matching "${search.trim()}"`}
              </p>
            </div>
            <label className="group flex w-full max-w-sm items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-4 py-2 text-sm shadow-soft transition-all focus-within:border-brand-indigo focus-within:ring-4 focus-within:ring-brand-indigo/10 sm:w-72">
              <Search size={14} className="text-brand-navy/50" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles…"
                className="w-full bg-transparent text-[13px] text-brand-navy outline-none placeholder:text-brand-navy/45"
              />
            </label>
          </div>

          {gridPosts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {gridPosts.map((post) => (
                  <motion.a
                    layout
                    key={`${post.slug}-${post.title}`}
                    href={`/blog/${post.slug}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy/10 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-float"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                      <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-indigo shadow-soft backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
                        {post.category}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-extrabold leading-tight text-brand-navy line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-brand-navy/60 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-between text-[11px] text-brand-navy/55">
                        <div className="flex items-center gap-2">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-navy/8 font-display text-[9px] font-extrabold text-brand-navy/70">
                            {post.authorInitials}
                          </span>
                          <span className="font-semibold text-brand-navy/70">{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                      </div>
                    </div>
                    <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-brand-navy/40 opacity-0 shadow-soft transition-all group-hover:opacity-100">
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-3xl border border-dashed border-brand-navy/15 bg-white/60 p-10 text-center"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-indigo/10 text-brand-indigo">
                <SearchX size={20} strokeWidth={2.25} />
              </span>
              <h3 className="font-display text-lg font-extrabold text-brand-navy">
                No matching posts
              </h3>
              <p className="text-[13px] text-brand-navy/60">
                Try a different search term or clear the filters to see everything.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setSearch("");
                }}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-white shadow-soft transition-all hover:shadow-float"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {gridPosts.length >= 6 && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-navy/[0.04]"
              >
                Load more posts
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
