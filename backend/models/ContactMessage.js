import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    subject: { type: String, default: "General Inquiry", trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    read: { type: Boolean, default: false },
    // Same sender + same text inside one minute collapses to a single stored message
    // (double-clicks, retries). Enforced by the unique sparse index below.
    dedupeKey: { type: String, select: false },
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ dedupeKey: 1 }, { unique: true, sparse: true });

export default mongoose.model("ContactMessage", contactMessageSchema);
