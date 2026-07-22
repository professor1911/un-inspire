import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = Router();

/** POST /api/contact - public, called from the Contact page form */
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address." });
    }

    const saved = await ContactMessage.create({ name, email, subject, message });
    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message", detail: err.message });
  }
});

/** GET /api/contact - admin: list submitted messages, newest first */
router.get("/", requireAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ count: messages.length, messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages", detail: err.message });
  }
});

export default router;
