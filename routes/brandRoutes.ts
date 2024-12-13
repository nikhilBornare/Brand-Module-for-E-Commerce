import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController";

const router = express.Router();

// Post route to create a brand
router.post("/", createBrand);

// Get route to get all brands
router.get("/", getAllBrands);

// Get route to get a single brand by ID
router.get("/:id", getBrandById);

// Put route to update a brand by ID
router.put("/:id", updateBrand);

// Delete route to delete a brand by ID
router.delete("/:id", deleteBrand);

export default router;