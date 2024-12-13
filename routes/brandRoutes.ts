import express from "express";
import mongoose from "mongoose";

import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController";

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

// Post route to create a brand
router.post("/", createBrand);

// Get route to get all brands
router.get("/", getAllBrands);

// Get route to get a single brand by ID
router.get("/:id", validateObjectId, getBrandById);

// Put route to update a brand by ID
router.put("/:id", validateObjectId, updateBrand);

// Delete route to delete a brand by ID
router.delete("/:id", validateObjectId, deleteBrand);

export default router;
