import { useTranslation } from "react-i18next";

export default function MarqueeBanner() {
  const { t } = useTranslation();
  const slogan = t("marquee");

  return (
    <div className="marquee-paused overflow-hidden bg-bay text-paper py-3 border-y border-ochre/30">
      <div className="marquee-track font-mono text-sm md:text-base tracking-wide uppercase">
        <span className="pr-4 whitespace-nowrap">{slogan.repeat(4)}</span>
        <span className="pr-4 whitespace-nowrap" aria-hidden="true">
          {slogan.repeat(4)}
        </span>
      </div>
    </div>
  );
}
