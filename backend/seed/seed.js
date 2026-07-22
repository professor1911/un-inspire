import "dotenv/config";
import mongoose from "mongoose";
import Item from "../models/Item.js";
import { seedData } from "./data.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ut-inspire";

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log(`[seed] connected -> ${mongoose.connection.name}`);

  await Item.deleteMany({});
  console.log("[seed] cleared existing items");

  const inserted = await Item.insertMany(seedData);
  console.log(`[seed] inserted ${inserted.length} items`);

  await mongoose.disconnect();
  console.log("[seed] done");
}

run().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
