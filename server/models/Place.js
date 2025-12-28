import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    ticketPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
