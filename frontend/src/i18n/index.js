import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ja } from "./locales.js";

const stored = typeof window !== "undefined" ? window.localStorage.getItem("ut-inspire-lang") : null;

i18n.use(initReactI18next).init({
  resources: { en, ja },
  lng: stored || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

i18n.on("languageChanged", (lng) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("ut-inspire-lang", lng);
  document.documentElement.lang = lng;
  document.documentElement.classList.toggle("lang-ja", lng === "ja");
});

// set initial <html lang> / font-class on load
if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
  document.documentElement.classList.toggle("lang-ja", i18n.language === "ja");
}

export default i18n;
