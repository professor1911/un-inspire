import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "../components/PageHero.jsx";
import { Reveal } from "../components/Reveal.jsx";
import PageIllustration from "../components/PageIllustration.jsx";
import groupChatSvg from "../assets/illustrations/group-chat.svg";
import { submitContact } from "../api/client.js";

const SUBJECT_KEYS = [
  "generalInquiry",
  "researchCollaboration",
  "educationPrograms",
  "mediaPress",
  "livingLabPartnership",
];

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: t("contactSubjects.generalInquiry"), message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitContact(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: t("contactSubjects.generalInquiry"), message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err?.response?.data?.error || t("contactErrors.serverDown")
      );
    }
  }

  return (
    <div>
      <PageHero
        eyebrow={t("pages.contact.eyebrow")}
        title={t("pages.contact.title")}
        description={t("pages.contact.description")}
      />

      <section className="mx-auto max-w-7xl px-5 md:px-8 py-16 sm:py-20 grid lg:grid-cols-2 gap-12 sm:gap-16">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-wider text-ochre mb-3">
            {t("pages.contact.visitOrWrite")}
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="shrink-0 text-vermillion mt-1" size={20} />
              <div>
                <div className="font-display text-lg text-bay">{t("footer.campus")}</div>
                <p className="text-sm text-ink/65 leading-relaxed mt-1">
                  {t("footer.centre")}
                  <br />
                  {t("footer.campus")}
                  <br />
                  <span className="font-bodyJp">{t("footer.address")}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="shrink-0 text-vermillion mt-1" size={20} />
              <div>
                <div className="font-display text-lg text-bay">{t("pages.contact.generalInquiries")}</div>
                <p className="text-sm text-ink/65 leading-relaxed mt-1">{t("pages.contact.generalInquiriesBody")}</p>
              </div>
            </div>
          </div>
          <PageIllustration
            src={groupChatSvg}
            alt="Illustration of people communicating and exchanging messages"
            className="max-w-[220px] mt-10 hidden lg:block"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
                {t("pages.contact.formName")}
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={update("name")}
                className="w-full border border-bay/25 bg-white/50 px-4 py-3 focus:border-vermillion outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
                {t("pages.contact.formEmail")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                className="w-full border border-bay/25 bg-white/50 px-4 py-3 focus:border-vermillion outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
                {t("pages.contact.formSubject")}
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={update("subject")}
                className="w-full border border-bay/25 bg-white/50 px-4 py-3 focus:border-vermillion outline-none transition-colors"
              >
                {SUBJECT_KEYS.map((key) => (
                  <option key={key} value={t(`contactSubjects.${key}`)}>{t(`contactSubjects.${key}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
                {t("pages.contact.formMessage")}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                className="w-full border border-bay/25 bg-white/50 px-4 py-3 focus:border-vermillion outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 bg-vermillion text-paper px-6 py-3.5 font-mono text-sm uppercase tracking-wide hover:bg-ochre transition-colors disabled:opacity-60 w-full sm:w-auto justify-center"
            >
              {status === "sending" ? t("pages.contact.sending") : t("pages.contact.send")} <Send size={15} />
            </button>

            {status === "sent" && (
              <p className="text-sm text-terrace font-mono" role="status">
                {t("pages.contact.sent")}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-vermillion font-mono" role="alert">
                {errorMsg}
              </p>
            )}
          </form>
        </Reveal>
      </section>
    </div>
  );
}
