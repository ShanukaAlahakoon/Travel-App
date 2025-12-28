import express from "express";
import {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
} from "../controllers/placeController.js";

const router = express.Router();

router.post("/add", createPlace);
router.get("/", getAllPlaces);
router.get("/:id", getPlaceById);
router.put("/update/:id", updatePlace);
router.delete("/delete/:id", deletePlace);

export default router;
