import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: String,
  blood: String,
  city: String
});

export default mongoose.model("Donor", donorSchema);