import mongoose from "mongoose";

const ShripTypeSchema = new mongoose.Schema({
  shrimptype: {
    type: String,
    required: [true, "Shrimp Type is required"],
  },
  price_per_kg: {
    type: Number,
    required: [true, "Please add a amount per kg"],
  },
});

export default mongoose.model.ShripType ||
  mongoose.model("ShripTypeModel", ShripTypeSchema);
