import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController";

const router = express.Router();

// Route to create a brand
router.post("/", createBrand);

// Route to get all brands
router.get("/", getAllBrands);

// Route to get a single brand by ID
router.get("/:id", getBrandById);

// Route to update a brand by ID
router.put("/:id", updateBrand);

// Route to delete a brand by ID
router.delete("/:id", deleteBrand);

export default router;