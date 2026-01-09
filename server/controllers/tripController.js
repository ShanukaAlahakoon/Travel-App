import { Trip } from "../models/Trip.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const generateAIPlan = async (req, res) => {
  try {
    const {
      selectedPlaces,
      days,
      vehicle,
      peopleCount,
      startDate,
      startTime,
      startLocation,
    } = req.body;

    const placeNames = selectedPlaces.map((p) => p.name).join(", ");

    const prompt = `
      As a local Sri Lankan travel expert, create a detailed ${days}-day professional trip itinerary.
      
      CONTEXT:
      - Starting Point: ${startLocation}.
      - Start Time: ${startTime}.
      - Destinations to visit: ${placeNames}.
      - Travel Mode: ${vehicle}.
      - Group Size: ${peopleCount} people.
      - Start Date: ${startDate}.

      INSTRUCTIONS:
      1. ROUTE: Plan the route logically starting EXACTLY from "${startLocation}" at "${startTime}".
      2. ENDING: Conclude the trip naturally with a farewell activity.
      3. TIME SLOTS: The first activity of Day 1 must start at ${startTime}.
      4. DINING: Suggest local restaurants or food types for Breakfast, Lunch, and Dinner.
      5. FORMAT: Return result ONLY as a valid JSON array.
      
      JSON STRUCTURE SCHEMA:
      [
        {
          "day": 1,
          "title": "Title of the day",
          "activities": [
            "${startTime} - Start journey from ${startLocation}",
            "09:30 AM - Activity name",
            "01:00 PM - Lunch at specific place"
          ],
          "description": "Short summary and local tips"
        }
      ]
      
      CRITICAL: "activities" MUST be an array of strings. Each string MUST follow the format "Time - Activity".
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const aiPlanJSON = JSON.parse(
      response.text.replace(/```json|```/g, "").trim()
    );
    res.status(200).json({ aiPlan: aiPlanJSON });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ message: "Failed to generate timed itinerary" });
  }
};
export const saveFinalTrip = async (req, res) => {
  try {
    const {
      userId,
      selectedPlaces,
      days,
      vehicle,
      peopleCount,
      startDate,
      startTime,
      startLocation,
      aiPlan,
    } = req.body;

    const newTrip = new Trip({
      userId,
      title: `Trip from ${startLocation} to ${
        selectedPlaces[0]?.name || "Sri Lanka"
      }`,
      selectedPlaces: selectedPlaces.map((p) => p._id),
      days,
      vehicle,
      peopleCount,
      startDate,
      startTime,
      startLocation,
      aiPlan,
    });

    await newTrip.save();
    res
      .status(201)
      .json({ message: "Trip saved successfully!", trip: newTrip });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: "Saving failed" });
  }
};

export const getMySavedTrips = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const trips = await Trip.find({ userId: userId })
      .populate("selectedPlaces")
      .sort({ createdAt: -1 });

    res.status(200).json(trips);
  } catch (error) {
    console.error("Fetch Trips Error:", error);
    res.status(500).json({ message: "Failed to fetch saved trips" });
  }
};
