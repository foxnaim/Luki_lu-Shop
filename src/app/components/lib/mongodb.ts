import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ Укажите MONGODB_URI в .env.local");
}

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Подключено к MongoDB");
  } catch (error) {
    console.error("❌ Ошибка подключения к MongoDB:", error);
  }
};
