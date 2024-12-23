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
  next(); 
};


router.post("/", brandValidationRules,validateRequest, createBrand);


router.get("/", getAllBrands);


router.get("/:id", validateObjectId, getBrandById);


router.put("/:id", validateObjectId, brandValidationRules, validateRequest, updateBrand);


router.delete("/:id", validateObjectId, deleteBrand);

export default router;
