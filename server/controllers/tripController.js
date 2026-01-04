import { Trip } from "../models/Trip.js";

export const addToTrip = async (req, res) => {
  try {
    const { placeId } = req.body;
    const userId = req.user.id;

    let trip = await Trip.findOne({ userId: userId }).sort({ createdAt: -1 });

    if (!trip) {
      trip = new Trip({ userId, selectedPlaces: [placeId] });
    } else {
      if (!trip.selectedPlaces.includes(placeId)) {
        trip.selectedPlaces.push(placeId);
      }
    }

    await trip.save();
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to add to trip" });
  }
};

// 2. යූසර්ගේ ප්ලෑන් එක ලබා ගැනීම
export const getMyPlan = async (req, res) => {
  try {
    const trip = await Trip.findOne({ userId: req.user.id })
      .populate("selectedPlaces")
      .sort({ createdAt: -1 });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plan" });
  }
};
