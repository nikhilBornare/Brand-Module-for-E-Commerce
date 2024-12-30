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
const validateObjectId = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    const ids = req.params.id ? [req.params.id] : req.body.ids;

    if (ids && !ids.every((id: string) => mongoose.Types.ObjectId.isValid(id))) {
         res.status(400).json({
            success: false,
            message: "One or more IDs are invalid.",
        });
    }
    return;
    next();
};

// Routes

// createBrand
router.post("/", checkUniqueName, validateRequest, createBrand);

// createMultipleBrands
router.post("/bulk", validateRequest, createMultipleBrands);

// getAllBrands
router.get("/", getAllBrands);

// getBrandById
router.get("/:id", validateObjectId, getBrandById);

// updateBrand
router.put("/:id", validateObjectId, checkUniqueName, validateRequest, updateBrand);

// deleteBrand
router.delete("/:id", deleteBrand);

// deleteMultipleBrands
router.delete("/",  deleteMultipleBrands);

export default router;
