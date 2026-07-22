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
      ],
      index: true,
    },
    category: { type: String, default: "" }, // e.g. "Graduate Student", "Journal Article"
    title: { type: String, required: true }, // name (people) or headline
    subtitle: { type: String, default: "" }, // role, affiliation, authors, venue
    description: { type: String, default: "" },
    tags: [{ type: String }],
    date: { type: Date },
    link: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

itemSchema.index({ type: 1, order: 1 });

export default mongoose.model("Item", itemSchema);
