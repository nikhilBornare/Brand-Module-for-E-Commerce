import express from "express";
import mongoose from "mongoose";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  deleteMultipleBrands,
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
router.post("/", checkUniqueName, validateRequest, createBrand); 

router.get("/", getAllBrands);

router.get("/:id", validateObjectId, getBrandById);

router.put("/:id", validateObjectId, checkUniqueName, validateRequest, updateBrand); 

router.delete("/:id", validateObjectId, deleteBrand);

router.delete("/",validateObjectId,deleteMultipleBrands);

export default router;
