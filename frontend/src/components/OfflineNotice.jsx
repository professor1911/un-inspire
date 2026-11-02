import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WifiOff } from "lucide-react";

/** Slim banner shown while pages are rendering the bundled fallback copy because the API is unreachable. */
export default function OfflineNotice() {
  const { t } = useTranslation();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const down = () => setOffline(true);
    const up = () => setOffline(false);
    window.addEventListener("ut:api-offline", down);
    window.addEventListener("ut:api-online", up);
    return () => {
      window.removeEventListener("ut:api-offline", down);
      window.removeEventListener("ut:api-online", up);
    };
  }, []);

  if (!offline) return null;
  return (
    <div role="status" className="bg-ochreText text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8 py-2 flex items-start gap-2 text-xs sm:text-sm font-body">
        <WifiOff size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>{t("common.offlineNotice")}</span>
      </div>
    </div>
  );
}
