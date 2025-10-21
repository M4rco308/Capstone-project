import express from "express";
import {
  createCar,
  getCars,
  getCarById,
  deleteCar,
  updateCar, 
} from "../controllers/car.js";

const router = express.Router();


router.post("/", createCar);

router.get("/", getCars);

router.get("/:id", getCarById);

router.put("/:id", updateCar);

router.delete("/:id", deleteCar);

export default router;