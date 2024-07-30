import mongoose from "mongoose";

const activationSchema = new mongoose.Schema({
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  usage: { type: Number, default: 0 },
  remainingData: { type: Number, required: true },
});

const Activation = mongoose.model("Activation", activationSchema);
export default Activation;
