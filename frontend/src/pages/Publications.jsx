import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";

export default function Publications() {
  const { t } = useTranslation();
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchItems("publication").then((r) => setItems(r.items));
  }, []);

  const categories = useMemo(() => {
    if (!items) return [];
    return ["All", ...new Set(items.map((i) => i.category))];
  }, [items]);

  const visible = items ? (filter === "All" ? items : items.filter((i) => i.category === filter)) : [];

  return (
    <div>
      <PageHero
        eyebrow={t("pages.publications.eyebrow")}
        title={t("pages.publications.title")}
        description={t("pages.publications.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow={t("nav.publications")} title={t("pages.publications.title")} />

        {items === null && <Loader label={t("common.loading")} />}

        {items && (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                    filter === c ? "bg-bay text-paper border-bay" : "border-bay/25 text-bay/70 hover:border-bay"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              {visible.length === 0 ? (
                <EmptyState label={t("common.empty")} />
              ) : (
                <StaggerGroup className="divide-y divide-bay/15 border-t border-b border-bay/15">
                  {visible.map((pub) => (
                    <StaggerItem key={pub.title} className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                      <div>
                        <div className="font-mono text-xs uppercase tracking-wide text-ochre mb-1.5">{pub.category}</div>
                        <div className="font-display text-lg sm:text-xl text-bay leading-snug">{pub.title}</div>
                        {pub.subtitle && <div className="text-sm text-ink/60 mt-1">{pub.subtitle}</div>}
                      </div>
                      {pub.date && (
                        <div className="font-mono text-xs text-bay/50 whitespace-nowrap shrink-0 sm:pt-1">
                          {new Date(pub.date).toLocaleDateString(undefined, { year: "numeric", month: "short" })}
                        </div>
                      )}
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
