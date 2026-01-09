import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  selectedPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  days: Number,
  vehicle: String,
  peopleCount: Number,
  startDate: String,
  startTime: String,
  startLocation: String,
  aiPlan: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Trip = mongoose.model("Trip", tripSchema);
