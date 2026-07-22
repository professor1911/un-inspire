import mongoose from "mongoose";

export async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log(`[db] connected -> ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error("[db] connection failed:", err.message);
    console.error("      Is MongoDB running? Check your MONGO_URI in backend/.env");
    process.exit(1);
  }
}
