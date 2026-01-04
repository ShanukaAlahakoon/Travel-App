import express from "express";
import { addToTrip, getMyPlan } from "../controllers/tripController.js";

const tripRouter = express.Router();

tripRouter.post("/add", addToTrip);

tripRouter.get("/my-plan", getMyPlan);

export default tripRouter;
