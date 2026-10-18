import { ExternalLink, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalized } from "../hooks/useLocalized.js";

const initialsOf = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");

/**
 * One card style for every person: rounded card, ringed circular photo (initials if no photo),
 * role label, name, affiliation line. People with a bio/quote open the full profile on click;
 * an optional external link ("Faculty Profile ↗" or any label set in the admin) sits underneath.
 */
export default function PersonCard({ person, onOpen }) {
  const { t } = useTranslation();
  const loc = useLocalized();
  const hasProfile = Boolean(person.description || person.quote || person.description_ja || person.quote_ja);
  const role = t(`pages.people.categories.${person.category}`, { defaultValue: person.category });

  const body = (
    <>
      <div className="relative w-40 h-40 sm:w-44 sm:h-44 shrink-0 rounded-full overflow-hidden bg-bay ring-[6px] ring-white shadow-[0_10px_30px_-8px_rgba(23,57,77,0.35)]">
        {person.image ? (
          <img
            src={person.image}
            alt={person.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: "50% 25%" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-4xl text-paper/90">
            {initialsOf(person.title)}
          </div>
        )}
      </div>
      <div className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-terrace">{role}</div>
      <h3 className="mt-2 font-display font-bold text-xl text-bay leading-snug">{loc(person, "title")}</h3>
      {(person.subtitle || person.subtitle_ja) && <p className="mt-2 text-sm text-ink/60 leading-relaxed max-w-[18rem]">{loc(person, "subtitle")}</p>}
      {hasProfile && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-terrace group-hover:text-vermillion transition-colors">
          {t("pages.people.readProfile")} <ArrowRight size={14} />
        </span>
      )}
    </>
  );

  return (
    <article className="group w-full flex flex-col items-center text-center rounded-[2rem] border border-bay/10 bg-white px-6 pt-8 pb-7 shadow-[0_12px_40px_-14px_rgba(23,57,77,0.18)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-14px_rgba(23,57,77,0.3)]">
      {hasProfile ? (
        <button
          type="button"
          onClick={onOpen}
          className="flex flex-col items-center text-center w-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-vermillion"
        >
          {body}
        </button>
      ) : (
        <div className="flex flex-col items-center w-full">{body}</div>
      )}
      {person.link && (
        <a
          href={person.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-terrace hover:text-vermillion transition-colors"
        >
          {person.linkLabel || t("pages.people.profileLink")} <ExternalLink size={14} />
        </a>
      )}
    </article>
  );
}
