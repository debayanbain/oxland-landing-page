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
    slug: "industries-land-of-opportunities",
    category: "Land Management",
    categoryPalette: "bg-brand-indigo/10 text-brand-indigo",
    title: "Industries Want a \"Land of Opportunities,\" But Often Forget to Manage the Land Bank Properly",
    excerpt: "Investment summits, industrial corridors and manufacturing hubs are booming — but many projects still stumble because their land bank is managed on spreadsheets and paper maps. Here's what needs to change.",
    author: "Akash Devnath",
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
    author: "Akash Devnath",
    authorInitials: "AD",
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
    author: "Akash Devnath",
    authorInitials: "AD",
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
    author: "Akash Devnath",
    authorInitials: "AD",
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
    author: "Akash Devnath",
    authorInitials: "AD",
    date: "12 Feb 2026",
    readTime: "6 min read",
    image: "/features-background.webp",
  },
];

const CATEGORIES = ["All", "Land Management", "Land Acquisition", "Company"];
const FEATURED_SLUG = "industries-land-of-opportunities";

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
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
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
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${featured.categoryPalette}`}
                  >
                    {featured.category}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight text-brand-navy sm:text-3xl lg:text-[32px]">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-navy/65">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-brand-navy/55">
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-indigo/10 font-display text-[10px] font-extrabold text-brand-indigo">
                        {featured.authorInitials}
                      </span>
                      <span className="font-semibold text-brand-navy/80">{featured.author}</span>
                    </div>
                    <span className="flex items-center gap-1"><Calendar size={11} />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{featured.readTime}</span>
                  </div>
                  <div className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold bg-gradient-to-r from-brand-indigo to-brand-purple bg-clip-text text-transparent">
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
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                      <div className={`absolute left-3 top-3 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-soft ${post.categoryPalette}`}>
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
