import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import PageIllustration from "../components/PageIllustration.jsx";
import PersonCard from "../components/PersonCard.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import meetTheTeamSvg from "../assets/illustrations/meet-the-team.svg";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal.jsx";
import { Loader, EmptyState } from "../components/Loader.jsx";
import { fetchItems } from "../api/client.js";
import { useLocalized } from "../hooks/useLocalized.js";

const CATEGORY_ORDER = [
  "Principal Investigator",
  "Project Member",
  "India Team",
  "Postdoctoral Researcher",
  "Graduate Student",
  "Support Staff",
  "Advisor",
];

const hasProfile = (p) => Boolean(p.description || p.quote);

export default function People() {
  const { t } = useTranslation();
  const [people, setPeople] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchItems("person").then((r) => setPeople(r.items));
  }, []);

  const grouped = people
    ? CATEGORY_ORDER.map((cat) => ({ category: cat, members: people.filter((p) => p.category === cat) })).filter(
        (g) => g.members.length > 0
      )
    : [];

  const profiled = grouped.flatMap((g) => g.members.filter(hasProfile));
  const closeProfile = useCallback(() => setOpenIndex(null), []);
  const stepProfile = useCallback(
    (d) => setOpenIndex((i) => (i === null ? i : (i + d + profiled.length) % profiled.length)),
    [profiled.length]
  );
  const catLabel = (c) => t(`pages.people.categories.${c}`, { defaultValue: c });

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
            <SectionHeading eyebrow={`${group.members.length}`} title={catLabel(group.category)} />
            {/* flex + justify-center so a short last row (or a group of 1–2) sits centred, like the reference design */}
            <StaggerGroup className="mt-8 flex flex-wrap justify-center gap-5">
              {group.members.map((p) => (
                <StaggerItem
                  key={p._id || p.title}
                  className="flex w-full xs:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
                >
                  <PersonCard person={p} onOpen={() => setOpenIndex(profiled.indexOf(p))} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ))}
      </section>

      <section className="relative overflow-hidden bg-bay text-paper bg-contours">
        <Reveal className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-ochre mb-4">UT-INSPIRE</div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight">{t("slogan")}</h2>
        </Reveal>
      </section>

      <ProfileModal people={profiled} index={openIndex} onClose={closeProfile} onNavigate={stepProfile} />
    </div>
  );
}
