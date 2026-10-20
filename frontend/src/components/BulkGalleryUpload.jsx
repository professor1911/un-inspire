import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Upload, X, ImagePlus, Loader2 } from "lucide-react";
import { createItemAdmin } from "../api/client.js";

const MAX_BYTES = 700 * 1024;

const inputCls = "w-full border border-bay/25 bg-white px-4 py-2.5 focus:border-vermillion outline-none";

export default function BulkGalleryUpload({ token, categories, onDone }) {
  const { t } = useTranslation();
  const fileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [errors, setErrors] = useState([]);

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const tooLarge = [];
    const valid = [];

    files.forEach((file) => {
      if (file.size > MAX_BYTES) {
        tooLarge.push(file.name);
      } else {
        valid.push(file);
      }
    });

    if (tooLarge.length) {
      setErrors((prev) => [...prev, ...tooLarge.map((n) => `${n}: exceeds 700 KB`)]);
    }

    valid.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, { name: file.name, data: reader.result, caption: "" }]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  }

  function removeImage(idx) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateCaption(idx, val) {
    setImages((prev) => prev.map((img, i) => (i === idx ? { ...img, caption: val } : img)));
  }

  async function handleUpload() {
    if (!category) {
      setErrors(["Please select a category"]);
      return;
    }
    if (!images.length) return;

    setUploading(true);
    setErrors([]);
    setProgress({ done: 0, total: images.length });

    const failed = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      try {
        await createItemAdmin(
          {
            type: "galleryPhoto",
            title: img.caption || img.name.replace(/\.[^.]+$/, ""),
            category,
            image: img.data,
            order: 0,
          },
          token
        );
      } catch {
        failed.push(img.name);
      }
      setProgress({ done: i + 1, total: images.length });
    }

    setUploading(false);
    if (failed.length) {
      setErrors(failed.map((n) => `Failed to upload: ${n}`));
      setImages((prev) => prev.filter((img) => failed.includes(img.name)));
    } else {
      setImages([]);
      setCategory("");
    }
    onDone();
  }

  return (
    <div className="border border-dashed border-bay/25 p-6 mb-12 bg-white/40">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ochre mb-4">
        <ImagePlus size={16} />
        Bulk Upload — Gallery Photos
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
            {t("admin.categoryLabel")}
          </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            <option value="" disabled>Select category for all photos</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wide text-bay/60 mb-1.5">
            Select Images
          </label>
          <label className="flex items-center gap-3 border border-bay/25 bg-white px-4 py-3 cursor-pointer hover:border-vermillion transition-colors">
            <Upload size={18} className="text-bay/50" />
            <span className="font-mono text-sm text-bay/60">
              {images.length ? `${images.length} image(s) selected — click to add more` : "Click to select images…"}
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="hidden"
            />
          </label>
          <p className="text-xs text-bay/40 font-mono mt-1">Max 700 KB per image · JPG, PNG, WebP</p>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative group border border-bay/10 bg-paperDim">
                <img src={img.data} alt="" className="w-full aspect-square object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-vermillion text-paper flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                <input
                  type="text"
                  value={img.caption}
                  onChange={(e) => updateCaption(idx, e.target.value)}
                  placeholder="Caption (optional)"
                  className="w-full border-t border-bay/10 bg-white px-2 py-1.5 text-xs focus:border-vermillion outline-none"
                />
              </div>
            ))}
          </div>
        )}

        {errors.length > 0 && (
          <div className="space-y-1">
            {errors.map((err, i) => (
              <p key={i} className="text-xs text-vermillion font-mono">{err}</p>
            ))}
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-mono text-bay/70">
              <Loader2 size={14} className="animate-spin" />
              Uploading {progress.done} / {progress.total}…
            </div>
            <div className="w-full h-2 bg-bay/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-vermillion transition-all duration-300"
                style={{ width: `${(progress.done / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || !images.length}
          className="inline-flex items-center gap-2 bg-vermillion text-paper px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-ochre transition-colors disabled:opacity-60"
        >
          {uploading ? `Uploading…` : `Upload ${images.length} Photo${images.length !== 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
}
