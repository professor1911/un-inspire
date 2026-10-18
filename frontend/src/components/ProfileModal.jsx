import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialsOf = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");

/** Full profile (photo, bio, quote) for one person; arrows / ← → keys step through everyone who has a profile. */
export default function ProfileModal({ people, index, onClose, onNavigate }) {
  const { t } = useTranslation();
  const closeRef = useRef(null);
  const person = index !== null ? people[index] : null;
  const open = Boolean(person);

  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="profile-overlay"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] bg-bayDeep/80 backdrop-blur-sm overflow-y-auto p-3 sm:p-6 flex"
        >
          <motion.div
            key={person.title}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-name"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative m-auto w-full max-w-4xl bg-paper border border-bay/15 shadow-2xl grid md:grid-cols-5"
          >
            <div className="md:col-span-2 bg-bay aspect-[4/5] md:aspect-auto md:min-h-[28rem] overflow-hidden">
              {person.image ? (
                <img
                  src={person.image}
                  alt={person.title}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 25%" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-display text-6xl text-paper/80">
                  {initialsOf(person.title)}
                </div>
              )}
            </div>

            <div className="md:col-span-3 p-6 sm:p-8 md:p-10 flex flex-col">
              <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-2">
                {t(`pages.people.categories.${person.category}`, { defaultValue: person.category })}
              </div>
              <h3 id="profile-name" className="font-display text-3xl sm:text-4xl text-bay leading-tight pr-8">
                {person.title}
              </h3>
              {person.subtitle && <div className="mt-1 text-sm text-ink/60">{person.subtitle}</div>}
              {person.description && (
                <p className="mt-5 text-ink/75 leading-relaxed text-[0.95rem]">{person.description}</p>
              )}
              {person.quote && (
                <blockquote className="mt-6 border-l-2 border-vermillion pl-4">
                  <div className="font-mono text-[0.65rem] uppercase tracking-wider text-vermillion mb-1.5">
                    {t("pages.people.quoteLabel")}
                  </div>
                  <p className="font-display italic text-lg text-bay leading-snug">“{person.quote}”</p>
                </blockquote>
              )}
              {person.link && (
                <a
                  href={person.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-terrace hover:text-vermillion transition-colors"
                >
                  {person.linkLabel || t("pages.people.profileLink")} <ExternalLink size={14} />
                </a>
              )}
              {people.length > 1 && (
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="font-mono text-xs text-bay/40">
                    {index + 1} / {people.length}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate(-1)}
                      aria-label={t("pages.people.prevLabel")}
                      className="w-9 h-9 border border-bay/25 flex items-center justify-center text-bay hover:border-vermillion hover:text-vermillion transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => onNavigate(1)}
                      aria-label={t("pages.people.nextLabel")}
                      className="w-9 h-9 border border-bay/25 flex items-center justify-center text-bay hover:border-vermillion hover:text-vermillion transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t("pages.people.closeLabel")}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-paper/90 text-bay flex items-center justify-center hover:bg-vermillion hover:text-paper transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
