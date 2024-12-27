import express from "express";
import mongoose from "mongoose";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  deleteMultipleBrands,
  createMultipleBrands,
} from "../controllers/brandController";
import { validateRequest, checkUniqueName } from "../middleware/validateRequest";

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

// Routes

// createBrand
router.post("/", checkUniqueName, validateRequest, createBrand); 

// createMultipleBrands
router.post("/bulk",validateRequest, createMultipleBrands);

// getAllBrands
router.get("/", getAllBrands);

// getBrandById
router.get("/:id", validateObjectId, getBrandById);

// updateBrand
router.put("/:id", validateObjectId, checkUniqueName, validateRequest, updateBrand);

// deleteBrand
router.delete("/:id", validateObjectId, deleteBrand);

// deleteMultipleBrands
router.delete("/",validateObjectId,deleteMultipleBrands);

export default router;
