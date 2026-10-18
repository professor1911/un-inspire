import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";
import { useLocalized, useDateLocale } from "../hooks/useLocalized.js";

export default function Events() {
  const { t } = useTranslation();
  const loc = useLocalized();
  const dateLoc = useDateLocale();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetchItems("event").then((r) => setEvents(r.items));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow={t("pages.events.eyebrow")}
        title={t("pages.events.title")}
        description={t("pages.events.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        <SectionHeading eyebrow={t("nav.events")} title={t("pages.events.title")} />

        <div className="mt-10 sm:mt-12">
          {events === null && <Loader label={t("common.loading")} />}
          {events?.length === 0 && <EmptyState label={t("common.empty")} />}
          {events && events.length > 0 && (
            <StaggerGroup className="space-y-4">
              {events.map((e) => {
                const d = e.date ? new Date(e.date) : null;
                return (
                  <StaggerItem key={e.title} className="border border-bay/15 p-5 sm:p-6 flex items-start gap-4 sm:gap-5">
                    <div className="shrink-0 w-14 sm:w-16 text-center border-r border-bay/15 pr-3 sm:pr-5">
                      {d && (
                        <>
                          <div className="font-display text-xl sm:text-2xl text-vermillion leading-none">{d.getDate()}</div>
                          <div className="font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wide text-bay/50 mt-1">
                            {d.toLocaleDateString(dateLoc, { month: "short", year: "numeric" })}
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wide text-ochre mb-1.5 flex items-center gap-1.5">
                        <CalendarDays size={12} /> {loc(e, "category") || e.category}
                      </div>
                      <div className="font-display text-lg sm:text-xl text-bay">{loc(e, "title")}</div>
                      {(e.subtitle || e.subtitle_ja) && <div className="text-sm text-ink/60 mt-1">{loc(e, "subtitle")}</div>}
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
