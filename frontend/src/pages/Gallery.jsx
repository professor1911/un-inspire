import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import VideoCard from "../components/VideoCard.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";
import { VIDEOS } from "../data/media.js";

const pill = (active) =>
  `px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors ${
    active ? "bg-bay text-paper border-bay" : "border-bay/25 text-bay/70 hover:border-bay"
  }`;

export default function Gallery() {
  const { t, i18n } = useTranslation();
  const ja = i18n.language === "ja";
  const [photos, setPhotos] = useState(null);
  const [tab, setTab] = useState("photos");
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null); // index into `visible`

  useEffect(() => {
    fetchItems("galleryPhoto").then((r) => setPhotos(r.items.filter((p) => p.image)));
  }, []);

  const categories = useMemo(
    () => (photos ? [...new Set(photos.map((p) => p.category).filter(Boolean))] : []),
    [photos]
  );
  const visible = useMemo(
    () => (photos ? photos.filter((p) => filter === "all" || p.category === filter) : []),
    [photos, filter]
  );
  const caption = (p) => (ja && p.subtitle ? p.subtitle : p.title);
  const catLabel = (c) => t(`pages.gallery.categories.${c}`, { defaultValue: c });

  const step = useCallback(
    (d) => setLightbox((i) => (i === null ? i : (i + d + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (lightbox === null) return undefined;
    function onKey(e) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  const current = lightbox !== null ? visible[lightbox] : null;

  return (
    <div>
      <PageHero
        eyebrow={t("pages.gallery.eyebrow")}
        title={t("pages.gallery.title")}
        description={t("pages.gallery.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => setTab("photos")} aria-pressed={tab === "photos"} className={pill(tab === "photos")}>
            {t("pages.gallery.tabPhotos")}
          </button>
          <button onClick={() => setTab("videos")} aria-pressed={tab === "videos"} className={pill(tab === "videos")}>
            {t("pages.gallery.tabVideos")}
          </button>
        </div>

        {tab === "photos" && (
          <>
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-10 pt-4 border-t border-bay/10">
                <button
                  onClick={() => { setFilter("all"); setLightbox(null); }}
                  className={pill(filter === "all")}
                >
                  {t("pages.gallery.filterAll")}
                </button>
                {categories.map((c) => (
                  <button key={c} onClick={() => { setFilter(c); setLightbox(null); }} className={pill(filter === c)}>
                    {catLabel(c)}
                  </button>
                ))}
              </div>
            )}

            {photos === null && <Loader label={t("common.loading")} />}
            {photos?.length === 0 && <EmptyState label={t("pages.gallery.empty")} />}

            {visible.length > 0 && (
              <StaggerGroup key={filter} className="columns-2 sm:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
                {visible.map((p, i) => (
                  <StaggerItem key={p._id || p.image} className="break-inside-avoid">
                    <button
                      onClick={() => setLightbox(i)}
                      className="group relative block w-full overflow-hidden border border-bay/10 bg-paperDim"
                    >
                      <motion.img
                        src={p.image}
                        alt={caption(p)}
                        loading="lazy"
                        className="w-full h-auto block"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bayDeep/80 to-transparent px-3 py-2.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                        <span className="text-paper text-xs leading-snug block text-left">{caption(p)}</span>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}
          </>
        )}

        {tab === "videos" && (
          <>
            <p className="text-ink/65 max-w-xl mb-10 pt-4 border-t border-bay/10">{t("pages.gallery.videosIntro")}</p>
            <StaggerGroup className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {VIDEOS.map((v) => (
                <StaggerItem key={v.id}>
                  <VideoCard video={v} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </>
        )}
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-bayDeep/90 backdrop-blur-sm flex items-center justify-center p-5 sm:p-10"
          >
            <motion.div
              key={current.image}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img src={current.image} alt={caption(current)} className="w-full h-auto max-h-[78vh] object-contain" />
              <div className="mt-3 text-paper text-sm text-center leading-snug">{caption(current)}</div>
              <div className="mt-1 text-paper/50 font-mono text-xs text-center">
                {lightbox + 1} / {visible.length}
              </div>
              <button
                onClick={() => setLightbox(null)}
                aria-label={t("pages.gallery.closeLabel")}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-vermillion text-paper flex items-center justify-center"
              >
                <X size={16} />
              </button>
              {visible.length > 1 && (
                <>
                  <button
                    onClick={() => step(-1)}
                    aria-label={t("pages.gallery.prevLabel")}
                    className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper/90 text-bay flex items-center justify-center hover:bg-vermillion hover:text-paper transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => step(1)}
                    aria-label={t("pages.gallery.nextLabel")}
                    className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper/90 text-bay flex items-center justify-center hover:bg-vermillion hover:text-paper transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
