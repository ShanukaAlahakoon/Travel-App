import Place from "../models/Place.js";
import { isAdmin } from "./userController.js";

export function createPlace(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as Administrator to add places",
    });
    return;
  }

  const newPlace = new Place(req.body);

  newPlace
    .save()
    .then(() => {
      res.json({ message: "Place added successfully" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error adding place",
        error: error.message,
      });
    });
}

export function getAllPlaces(req, res) {
  Place.find()
    .then((places) => {
      res.json(places);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error fetching places",
        error: error.message,
      });
    });
}

export function getPlaceById(req, res) {
  const placeId = req.params.id;

  Place.findById(placeId)
    .then((place) => {
      if (!place) {
        res.status(404).json({
          message: "Place not found",
        });
        return;
      }
      res.json(place);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error fetching place",
        error: error.message,
      });
    });
}

//update place
export function updatePlace(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as Administrator to update places",
    });
    return;
  }

  const placeId = req.params.id;
  const data = req.body;

  Place.findByIdAndUpdate(placeId, data, { new: true })
    .then((updatedPlace) => {
      if (!updatedPlace) {
        return res.status(404).json({ message: "Place not found" });
      }
      res.json({ message: "Place updated successfully", place: updatedPlace });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error updating place",
        error: error.message,
      });
    });
}

//delete place
export function deletePlace(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as Administrator to delete places",
    });
    return;
  }

  const placeId = req.params.id;

  Place.findByIdAndDelete(placeId)
    .then((deletedPlace) => {
      if (!deletedPlace) {
        return res.status(404).json({ message: "Place not found" });
      }
      res.json({ message: "Place deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error deleting place",
        error: error.message,
      });
    });
}
