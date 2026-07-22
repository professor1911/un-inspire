import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";

const CATEGORY_ORDER = [
  "Principal Investigator",
  "Project Member",
  "India Team",
  "Postdoctoral Researcher",
  "Graduate Student",
  "Support Staff",
  "Advisor",
];

function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

export default function People() {
  const { t } = useTranslation();
  const [people, setPeople] = useState(null);

  useEffect(() => {
    fetchItems("person").then((r) => setPeople(r.items));
  }, []);

  const grouped = people
    ? CATEGORY_ORDER.map((cat) => ({ category: cat, members: people.filter((p) => p.category === cat) })).filter(
        (g) => g.members.length > 0
      )
    : [];

  return (
    <div>
      <PageHero
        eyebrow={t("pages.people.eyebrow")}
        title={t("pages.people.title")}
        description={t("pages.people.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20">
        {people === null && <Loader label={t("common.loading")} />}
        {people?.length === 0 && <EmptyState label={t("common.empty")} />}

        {grouped.map((group) => (
          <div key={group.category} className="mb-14 sm:mb-16 last:mb-0">
            <SectionHeading eyebrow={`${group.members.length}`} title={group.category} />
            <StaggerGroup className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {group.members.map((p) => (
                <StaggerItem key={p.title}>
                  <TiltCard className="border border-bay/15 p-4 sm:p-5 bg-white/40 h-full">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bay text-paper flex items-center justify-center font-mono text-xs mb-3 sm:mb-4">
                      {initials(p.title)}
                    </div>
                    <div className="font-display text-base sm:text-lg text-bay leading-snug">{p.title}</div>
                    <div className="text-xs font-mono text-ochre mt-1 uppercase tracking-wide">{p.category}</div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ))}
      </section>
    </div>
  );
}
