// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/lifelink");

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("Database Error ❌", error.message);
    process.exit(1);
  }
};

export default connectDB;