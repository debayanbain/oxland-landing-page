import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, X, HelpCircle } from "lucide-react";
import { getFaqs, TOP_FAQS, type FaqItem } from "@/data/faqData";

export default function Faq() {
  const [search, setSearch] = useState("");
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  
  const faqs = useRef<FaqItem[]>([]);
  
  // Load FAQs once on mount
  useEffect(() => {
    faqs.current = getFaqs();
  }, []);

  // Search logic for FAQ accordion list
  const getFilteredFaqs = () => {
    if (search.trim() === "") return TOP_FAQS;
    
    const queryLower = search.toLowerCase();
    const tokens = queryLower.split(/\s+/).filter(t => t.length > 1);
    
    return faqs.current
      .map(faq => {
        let score = 0;
        const qLower = faq.q.toLowerCase();
        const aLower = faq.a.toLowerCase();
        
        if (qLower.includes(queryLower)) score += 12;
        
        for (const token of tokens) {
          if (qLower.includes(token)) {
            score += qLower.startsWith(token) ? 8 : 4;
          }
          if (aLower.includes(token)) score += 1;
        }
        return { faq, score };
      })
      .filter(x => x.score > 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(x => x.faq);
  };

  const filteredFaqs = getFilteredFaqs();

  // Reset opened accordion to first item when search query changes
  useEffect(() => {
    setOpenAccordion(filteredFaqs.length > 0 ? 0 : null);
  }, [search]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      {/* Dynamic Search Bar Section */}
      <div className="mx-auto max-w-2xl mb-10">
        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-soft focus-within:border-brand-indigo focus-within:ring-4 focus-within:ring-brand-indigo/5 transition-all duration-300">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search frequently asked questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full border-0 bg-transparent py-4 pl-11 pr-12 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 text-sm sm:text-base rounded-2xl"
          />
          {search.trim() && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-xs font-bold text-brand-navy/50 uppercase tracking-wider">
            {search.trim() ? `Search Results (${filteredFaqs.length})` : "Top Questions"}
          </h3>
        </div>
        
        <div className="divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white/80 shadow-soft backdrop-blur-sm overflow-hidden">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((f, i) => {
              const isOpen = openAccordion === i;
              return (
                <div key={f.q} className="px-6 transition-colors duration-300 hover:bg-slate-50/40">
                  <button
                    onClick={() => setOpenAccordion(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-[15px] sm:text-base font-bold text-brand-navy pr-4">
                      {f.q}
                    </span>
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-brand-indigo transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      <Plus size={14} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-[14px] leading-relaxed text-brand-navy/65">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center">
              <HelpCircle className="mx-auto h-10 w-10 text-slate-300 mb-3" />
              <p className="font-semibold text-slate-800 text-sm">No matching questions found</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for different keywords, such as "GIS", "pricing", "payment", or "onboarding".
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
