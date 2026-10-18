import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X } from "lucide-react";

const MAX_BYTES = 700 * 1024; // keep documents small; this isn't a CDN

export default function ImageUploadField({ value, onChange }) {
  const { t } = useTranslation();
  const fileRef = useRef(null);
  const [error, setError] = useState("");

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    if (file.size > MAX_BYTES) {
      setError(t("admin.imageTooLarge"));
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
        {t("admin.imageLabel")}
      </label>
      <div className="flex items-start gap-3">
        {value ? (
          <div className="relative shrink-0">
            <img src={value} alt="" className="w-16 h-16 object-cover rounded border border-bay/15" />
            <button
              type="button"
              onClick={() => {
                onChange("");
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-vermillion text-paper flex items-center justify-center"
              aria-label="Remove image"
            >
              <X size={11} />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 shrink-0 border border-dashed border-bay/25 rounded flex items-center justify-center text-bay/30">
            <Upload size={18} />
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            value={value?.startsWith("data:") ? "" : value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t("admin.imageUrlPlaceholder")}
            className="w-full border border-bay/25 bg-white px-3 py-2 text-sm focus:border-vermillion outline-none"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="block w-full text-xs font-mono text-bay/60 file:mr-3 file:px-3 file:py-1.5 file:border file:border-bay/25 file:bg-white file:text-xs file:font-mono file:uppercase file:cursor-pointer"
          />
          {error && <p className="text-xs text-vermillion font-mono">{error}</p>}
        </div>
      </div>
    </div>
  );
}
