import { useEffect, useState } from "react";
import { FileText, Database, GraduationCap, Presentation, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";
import { useLocalized } from "../hooks/useLocalized.js";

const ICONS = {
  Datasets: Database,
  Reports: FileText,
  "Educational Materials": GraduationCap,
  Presentations: Presentation,
};

export default function Resources() {
  const { t } = useTranslation();
  const loc = useLocalized();
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetchItems("resource").then((r) => setItems(r.items));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow={t("pages.resources.eyebrow")}
        title={t("pages.resources.title")}
        description={t("pages.resources.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow={t("nav.resources")} title={t("pages.resources.title")} />

        <div className="mt-10 sm:mt-12">
          {items === null && <Loader label={t("common.loading")} />}
          {items?.length === 0 && <EmptyState label={t("common.empty")} />}
          {items && items.length > 0 && (
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {items.map((r) => {
                const Icon = ICONS[r.category] || FileText;
                return (
                  <StaggerItem key={r.title} className="border border-bay/15 p-5 sm:p-6 flex items-start gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-terrace/10 flex items-center justify-center text-terrace">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wide text-ochre mb-1.5">{loc(r, "category") || r.category}</div>
                      <div className="font-display text-lg text-bay leading-snug">{loc(r, "title")}</div>
                      {r.link && (
                        <a
                          href={r.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 font-mono text-xs uppercase tracking-wide text-vermillion hover:text-ochre transition-colors"
                        >
                          {t("common.viewLink")} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          )}
        </div>
      </section>
    </div>
  );
}
