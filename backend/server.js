import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { connectDB, isDbHealthy } from "./config/db.js";
import Item from "./models/Item.js";
import ContactMessage from "./models/ContactMessage.js";
import itemsRouter from "./routes/items.js";
import contactRouter from "./routes/contact.js";
import adminRouter from "./routes/admin.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ut-inspire";
const CLIENT_ORIGIN = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// Behind a reverse proxy/load balancer set TRUST_PROXY to the number of proxy hops
// (e.g. 1). Without it every visitor looks like the proxy's IP, so the per-IP contact
// and admin rate limits would be shared by the whole site.
if (process.env.TRUST_PROXY) {
  const hops = Number(process.env.TRUST_PROXY);
  app.set("trust proxy", Number.isInteger(hops) ? hops : process.env.TRUST_PROXY);
}

// Also removes the X-Powered-By header. The frontend lives on another origin, so
// responses must stay embeddable cross-origin.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

// Basic abuse protection on the public write endpoint
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { error: "Too many messages sent. Please try again later." },
});

app.get("/api/health", async (req, res) => {
  const dbUp = await isDbHealthy();
  res.set("Cache-Control", "no-store");
  res.status(dbUp ? 200 : 503).json({
    status: dbUp ? "ok" : "degraded",
    db: dbUp ? "up" : "down",
    service: "ut-inspire-api",
    time: new Date().toISOString(),
  });
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
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body is too large." });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON body." });
  }
  console.error(err);
  res.status(500).json({ error: "Unexpected server error" });
});

connectDB(MONGO_URI).then(async () => {
  // Build indexes (incl. the unique one that de-duplicates contact messages) before serving traffic.
  await Promise.all([Item.init(), ContactMessage.init()]);
  // A bigger accept queue absorbs bursts of new connections instead of dropping them
  // (the default is small; the OS caps it at its own limit).
  const backlog = Number(process.env.LISTEN_BACKLOG) || 2048;
  const server = app.listen(PORT, undefined, backlog, () => {
    console.log(`[server] UT-INSPIRE API listening on http://localhost:${PORT}`);
  });
  // Keep idle connections longer than typical load-balancer idle timeouts (often 60 s),
  // so the proxy never reuses a connection this server has already closed.
  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 66_000;
});
