import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: {
    type: String,
    default: "My Awesome Trip",
  },
  selectedPlaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],

  aiPlan: { type: Object },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Trip = mongoose.model("Trip", tripSchema);
