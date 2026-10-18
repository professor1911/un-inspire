import mongoose from "mongoose";

/**
 * Generic content item.
 *
 * UT-INSPIRE's site is content-heavy but structurally simple: people,
 * publications, events, news, partners, pillars, living-lab entries and
 * resources all share the same shape (title/name, category, description,
 * a few optional fields, a display order). Rather than maintaining nine
 * near-identical collections, everything lives in one `items` collection
 * distinguished by `type`. This keeps the schema easy to extend from the
 * admin side (Compass, Mongo shell, or a future CMS UI) without a migration.
 */
const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "pillar",
        "researchTheme",
        "flagshipFocus",
        "educationComponent",
        "livingLab",
        "partnerCategory",
        "person",
        "publication",
        "event",
        "news",
        "resource",
        "galleryPhoto",
      ],
      index: true,
    },
    category: { type: String, default: "" }, // e.g. "Graduate Student", "Journal Article"
    title: { type: String, required: true }, // name (people) or headline
    subtitle: { type: String, default: "" }, // role, affiliation, authors, venue
    description: { type: String, default: "" },
    quote: { type: String, default: "", maxlength: 600 }, // e.g. "what sustainability means to me" on a person profile
    tags: [{ type: String }],
    date: { type: Date },
    link: { type: String, default: "" },
    linkLabel: { type: String, default: "", maxlength: 60 }, // optional text for the link, e.g. "Faculty Profile"
    image: { type: String, default: "", maxlength: 2_000_000 }, // URL or a small base64 data URL (admin photo upload)
    title_ja: { type: String, default: "" },
    subtitle_ja: { type: String, default: "" },
    description_ja: { type: String, default: "" },
    quote_ja: { type: String, default: "" },
    category_ja: { type: String, default: "" },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

itemSchema.index({ type: 1, order: 1 });

export default mongoose.model("Item", itemSchema);
