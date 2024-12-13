import express from "express";
import { createBrand, getAllBrands, getBrandById } from "../controllers/brandController";

const router = express.Router();

// Route to create a brand
router.post("/", createBrand);

// Route to get all brands
router.get("/", getAllBrands);

// Route to get a single brand by ID
router.get("/:id", getBrandById);


export default router;
