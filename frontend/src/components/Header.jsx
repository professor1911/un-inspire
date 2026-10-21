import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Mail, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle.jsx";
import SearchOverlay from "./SearchOverlay.jsx";
import utInspireLogo from "../assets/ut-inspire-logo.png";

// Flat list kept for the footer + mobile drawer + search index.
export const NAV_ITEMS = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/research", key: "research" },
  { to: "/education", key: "education" },
  { to: "/living-labs", key: "livingLabs" },
  { to: "/partnerships", key: "partnerships" },
  { to: "/people", key: "people" },
  { to: "/sdgs", key: "sdgs" },
  { to: "/publications", key: "publications" },
  { to: "/events", key: "events" },
  { to: "/news-media", key: "news" },
  { to: "/resources", key: "resources" },
  { to: "/gallery", key: "gallery" },
  { to: "/blog", key: "blog" },
  { to: "/contact", key: "contact" },
];

// Grouped for the desktop dropdown nav - keeps the bar to About / Research / Insights / Contact
// instead of 14 crowded links, while every page still lives exactly one click away.
const NAV_GROUPS = [
  { groupKey: "about", items: [{ to: "/about", key: "about" }, { to: "/people", key: "people" }, { to: "/partnerships", key: "partnerships" }, { to: "/sdgs", key: "sdgs" }] },
  { groupKey: "research", items: [{ to: "/research", key: "research" }, { to: "/education", key: "education" }, { to: "/living-labs", key: "livingLabs" }] },
  { groupKey: "insights", items: [{ to: "/publications", key: "publications" }, { to: "/events", key: "events" }, { to: "/news-media", key: "news" }, { to: "/resources", key: "resources" }, { to: "/gallery", key: "gallery" }, { to: "/blog", key: "blog" }] },
];

function NavDropdown({ group }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  function openNow() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1 px-3 py-2 font-mono text-[0.7rem] uppercase tracking-wider text-bay/80 hover:text-bay transition-colors"
      >
        {t(`navGroups.${group.groupKey}`)}
        <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full pt-2 w-56"
          >
            <div className="bg-paper border border-bay/15 shadow-xl py-1.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 font-display text-base transition-colors ${
                      isActive ? "text-vermillion" : "text-bay hover:bg-bay/5"
                    }`
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip - the ONLY place the language toggle lives, site-wide. Always visible
          (never hidden on scroll or on small screens) so it's reachable from anywhere. */}
      <div className="bg-bayDeep text-paper/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8 h-8 sm:h-9 flex items-center justify-between text-[0.65rem] sm:text-[0.7rem] font-mono tracking-wide">
          <span className="truncate">
            {t("topbar.institution")}
            <span className="hidden sm:inline"> · <span className="font-bodyJp">{t("topbar.center")}</span></span>
          </span>
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <a
              href="mailto:info@ut-inspire.u-toyama.ac.jp"
              className="hidden md:flex items-center gap-1.5 hover:text-paper transition-colors"
            >
              <Mail size={12} /> info@ut-inspire.u-toyama.ac.jp
            </a>
            <LanguageToggle className="!border-paper/25 !text-paper" />
          </div>
        </div>
      </div>

      {/* Main row */}
      <div
        className={`transition-colors duration-300 ${
          scrolled ? "bg-paper/95 backdrop-blur shadow-sm" : "bg-paper/90 backdrop-blur"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between h-[68px] sm:h-[72px]">
          <NavLink to="/" className="flex items-center gap-3 group shrink-0">
            <img src={utInspireLogo} alt="UT-INSPIRE" className="h-10 sm:h-12 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl sm:text-2xl tracking-tight text-bay font-semibold">
                UT<span className="text-vermillion">·</span>INSPIRE
              </span>
              <span className="font-bodyJp text-[0.6rem] sm:text-[0.65rem] tracking-[0.15em] text-bay/45 mt-1">
                富山大学 &nbsp;University of Toyama
              </span>
            </div>
          </NavLink>

          {/* Desktop nav: grouped dropdowns + Contact + Search, on the right */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_GROUPS.map((g) => (
              <NavDropdown key={g.groupKey} group={g} />
            ))}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `ml-2 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider border transition-colors ${
                  isActive
                    ? "bg-vermillion text-paper border-vermillion"
                    : "border-bay/25 text-bay hover:border-vermillion hover:text-vermillion"
                }`
              }
            >
              {t("nav.contact")}
            </NavLink>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t("search.openLabel")}
              className="ml-1 w-9 h-9 flex items-center justify-center text-bay/70 hover:text-vermillion transition-colors"
            >
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t("search.openLabel")}
              className="w-11 h-11 flex items-center justify-center text-bay/70 hover:text-vermillion transition-colors"
            >
              <Search size={19} />
            </button>
            <button
              aria-label={open ? t("common.closeMenu") : t("common.openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex items-center justify-center w-11 h-11 rounded-sm border border-bay/20 text-bay hover:border-vermillion hover:text-vermillion transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="lg:hidden fixed inset-y-0 right-0 w-full sm:w-[420px] bg-bay text-paper z-50 flex flex-col"
            >
              <div className="flex items-center justify-between h-20 px-6 border-b border-paper/15">
                <span className="font-display text-xl">{t("common.menu")}</span>
                <button
                  aria-label={t("common.closeMenu")}
                  onClick={() => setOpen(false)}
                  className="w-11 h-11 flex items-center justify-center border border-paper/25 rounded-sm hover:border-vermillion hover:text-vermillion"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 border-b border-paper/10 font-display text-2xl mb-2 ${
                      isActive ? "text-vermillion" : "text-paper hover:text-ochre"
                    }`
                  }
                >
                  {t("nav.home")}
                </NavLink>

                {NAV_GROUPS.map((group, gi) => (
                  <div key={group.groupKey} className="mb-2">
                    <div className="font-mono text-[0.65rem] uppercase tracking-widest text-ochre pt-5 pb-1">
                      {t(`navGroups.${group.groupKey}`)}
                    </div>
                    {group.items.map((item, i) => (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + (gi * group.items.length + i) * 0.03 }}
                      >
                        <NavLink
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `block py-2.5 border-b border-paper/10 font-display text-xl ${
                              isActive ? "text-vermillion" : "text-paper hover:text-ochre"
                            }`
                          }
                        >
                          {t(`nav.${item.key}`)}
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>
                ))}

                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-6 block text-center bg-vermillion text-paper py-3 font-mono text-sm uppercase tracking-wide"
                >
                  {t("nav.contact")}
                </NavLink>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
