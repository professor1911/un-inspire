import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NAV_ITEMS } from "./Header.jsx";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-bayDeep text-paper/90 overflow-hidden">
      {/* seigaiha wave band - a traditional Japanese pattern symbolizing good fortune
          and calm seas, echoing UT-INSPIRE's coastal research focus */}
      <div className="h-6 bg-repeat-x bg-seigaiha opacity-70" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="font-display text-2xl mb-1">
            UT<span className="text-vermillion">·</span>INSPIRE
          </div>
          <div className="font-bodyJp text-xs text-paper/40 mb-4 tracking-wide">富山大学</div>
          <p className="text-sm text-paper/60 max-w-sm leading-relaxed">{t("footer.description")}</p>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-4">
            {t("footer.quickLinks")}
          </div>
          <ul className="space-y-2 text-sm">
            {NAV_ITEMS.slice(0, 7).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-paper/70 hover:text-paper transition-colors">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-4">
            {t("footer.reachUs")}
          </div>
          <address className="not-italic text-sm text-paper/70 leading-relaxed space-y-1">
            <div>{t("footer.centre")}</div>
            <div>{t("footer.campus")}</div>
            <div className="font-bodyJp">{t("footer.address")}</div>
          </address>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/50 font-mono text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} UT-INSPIRE, University of Toyama. {t("footer.rights")}</span>
          <span>{t("footer.slogan")}</span>
        </div>
      </div>
    </footer>
  );
}
