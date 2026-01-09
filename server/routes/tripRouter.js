import express from "express";
import {
  generateAIPlan,
  saveFinalTrip,
  getMySavedTrips,
} from "../controllers/tripController.js";

const tripRouter = express.Router();

tripRouter.post("/generate", generateAIPlan);

tripRouter.post("/save-final", saveFinalTrip);

tripRouter.get("/my-saved-trips", getMySavedTrips);

export default tripRouter;
