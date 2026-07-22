import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Extra searchable terms beyond the 12 nav pages, so "find anything" is genuinely true.
const EXTRA_TERMS = [
  { label: "ReACT flagship program", to: "/research", keywords: "react agro-coastal flagship" },
  { label: "IIT Kharagpur partnership", to: "/partnerships", keywords: "iit kharagpur india featured partner" },
  { label: "5 Strategic Pillars", to: "/about", keywords: "pillars framework wheel" },
  { label: "Sustainability Integration Studio", to: "/education", keywords: "sis studio curriculum" },
  { label: "Contact form", to: "/contact", keywords: "email reach us message" },
  { label: "GRASS Research Centre", to: "/about", keywords: "grass centre gofuku" },
];

export default function SearchOverlay({ open, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const index = useMemo(() => {
    const navItems = [
      { label: t("nav.home"), to: "/" },
      { label: t("nav.about"), to: "/about" },
      { label: t("nav.research"), to: "/research" },
      { label: t("nav.education"), to: "/education" },
      { label: t("nav.livingLabs"), to: "/living-labs" },
      { label: t("nav.partnerships"), to: "/partnerships" },
      { label: t("nav.people"), to: "/people" },
      { label: t("nav.publications"), to: "/publications" },
      { label: t("nav.events"), to: "/events" },
      { label: t("nav.news"), to: "/news-media" },
      { label: t("nav.resources"), to: "/resources" },
      { label: t("nav.contact"), to: "/contact" },
    ];
    return [...navItems, ...EXTRA_TERMS];
  }, [t]);

  const results = query.trim()
    ? index.filter((item) =>
        `${item.label} ${item.keywords || ""}`.toLowerCase().includes(query.trim().toLowerCase())
      )
    : index.slice(0, 6);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function go(to) {
    navigate(to);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-bayDeep/70 backdrop-blur-sm flex items-start justify-center px-5 pt-24 sm:pt-32"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-paper border border-bay/15 shadow-2xl"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-bay/10">
              <Search size={18} className="text-bay/50 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results[0]) go(results[0].to);
                }}
                placeholder={t("search.placeholder")}
                className="flex-1 bg-transparent outline-none font-body text-base text-ink placeholder:text-ink/40"
              />
              <button onClick={onClose} aria-label="Close search" className="text-bay/50 hover:text-vermillion">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 ? (
                <div className="px-5 py-6 text-sm text-ink/50 font-mono">{t("search.noResults")}</div>
              ) : (
                results.map((r) => (
                  <button
                    key={r.label + r.to}
                    onClick={() => go(r.to)}
                    className="w-full text-left px-5 py-3 hover:bg-bay/5 transition-colors flex items-center justify-between group"
                  >
                    <span className="font-display text-lg text-bay">{r.label}</span>
                    <span className="font-mono text-[0.65rem] text-bay/30 group-hover:text-vermillion uppercase">
                      {r.to}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
