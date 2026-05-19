// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lifelink";
    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("Database Error ❌", error.message);
    process.exit(1);
  }
};

export default connectDB;