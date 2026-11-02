import mongoose from "mongoose";

// Fail fast when MongoDB is unreachable: without these, every request would hang for the
// driver's 30 s default and a short outage would exhaust the server's connections.
const CONNECT_OPTIONS = {
  serverSelectionTimeoutMS: 3000,
  bufferTimeoutMS: 3000,
  socketTimeoutMS: 20000,
};

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri, CONNECT_OPTIONS);
    console.log(`[db] connected -> ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error("[db] connection failed:", err.message);
    console.error("      Is MongoDB running? Check your MONGO_URI in backend/.env");
    process.exit(1);
  }
}

/** True when MongoDB answers a ping within `timeoutMs`. Used by /api/health. */
export async function isDbHealthy(timeoutMs = 1500) {
  if (mongoose.connection.readyState !== 1) return false;
  try {
    await Promise.race([
      mongoose.connection.db.admin().ping(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("ping timeout")), timeoutMs)),
    ]);
    return true;
  } catch {
    return false;
  }
}
