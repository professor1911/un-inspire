import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";

export default function NewsMedia() {
  const { t } = useTranslation();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetchItems("news").then((r) => setNews(r.items));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow={t("pages.newsMedia.eyebrow")}
        title={t("pages.newsMedia.title")}
        description={t("pages.newsMedia.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow={t("nav.news")} title={t("pages.newsMedia.title")} />

        <div className="mt-10 sm:mt-12">
          {news === null && <Loader label={t("common.loading")} />}
          {news?.length === 0 && <EmptyState label={t("common.empty")} />}
          {news && news.length > 0 && (
            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {news.map((n) => (
                <StaggerItem key={n.title}>
                  <TiltCard className="border border-bay/15 p-6 bg-white/40 flex flex-col h-full">
                    <div className="font-mono text-xs uppercase tracking-wide text-ochre mb-3">
                      {n.category}
                      {n.date && ` · ${new Date(n.date).toLocaleDateString(undefined, { month: "short", year: "numeric" })}`}
                    </div>
                    <div className="font-display text-xl text-bay leading-snug mb-2">{n.title}</div>
                    <p className="text-sm text-ink/65 leading-relaxed">{n.description}</p>
                    {n.link && (
                      <a
                        href={n.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 font-mono text-xs uppercase tracking-wide text-vermillion hover:text-ochre transition-colors"
                      >
                        {t("common.viewLink")} <ExternalLink size={12} />
                      </a>
                    )}
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </div>
  );
}
