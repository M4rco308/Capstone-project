import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: { type: [String], default: [] },
  sellerName: { type: String, required: true },
  sellerEmail: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Car", carSchema);