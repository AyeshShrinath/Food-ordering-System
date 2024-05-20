import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Shrimp Type is required"],
  },
  address: {
    type: String,
  },
  mobile: {
    type: String,
    required: [true, "Please add a amount per kg"],
  },
  email: {
    type: String,
  },
  totalprice: {
    type: Number,
    required: [true, "Please add a amount per kg"],
  },
  deliveredtohome: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model.OrderModel ||
  mongoose.model("OrderModel", OrderSchema);
