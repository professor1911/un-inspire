import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import itemsRouter from "./routes/items.js";
import contactRouter from "./routes/contact.js";
import adminRouter from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ut-inspire";
const CLIENT_ORIGIN = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",");

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

// Basic abuse protection on the public write endpoint
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Too many messages sent. Please try again later." },
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ut-inspire-api", time: new Date().toISOString() });
});

app.use("/api/items", itemsRouter);
app.use("/api/contact", contactLimiter, contactRouter);
app.use("/api/admin", adminRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: `No route for ${req.method} ${req.originalUrl}` });
});

// Error fallback
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Unexpected server error" });
});

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`[server] UT-INSPIRE API listening on http://localhost:${PORT}`);
  });
});
