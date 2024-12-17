import express from "express";
import mongoose from "mongoose";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController";
import { brandValidationRules } from "../validators/brandValidator";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

// Middleware to check for valid ObjectId
const validateObjectId = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const id = req.params.id;
  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid ID format.",
    });
  }
  next(); // Continue to the next middleware or route handler
};

// Post route to create a brand with validation
router.post("/", brandValidationRules, validateRequest, createBrand);

// Get route to get all brands
router.get("/", getAllBrands);

// Get route to get a single brand by ID
router.get("/:id", validateObjectId, getBrandById);

// Put route to update a brand by ID with validation
router.put("/:id", validateObjectId, brandValidationRules, validateRequest, updateBrand);

// Delete route to delete a brand by ID
router.delete("/:id", validateObjectId, deleteBrand);

export default router;
