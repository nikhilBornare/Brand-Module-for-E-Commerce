import { Request, Response } from "express";
import Brand from "../models/brandModel";
import getFilteredSortedPaginatedBrands from "../utils/features"; // Import the utility

// Create a new brand
export const createBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({
      success: true,
      data: brand,
      message: "Brand created successfully.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "An unknown error occurred." });
    }
  }
};

// Get all brands with filtering, sorting, pagination
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const queryFeatures = {
      search: req.query.search as string,
      sort: req.query.sort as string,
      page: parseInt(req.query.page as string, 10),
      limit: parseInt(req.query.limit as string, 10),
    };

    const { brands, total, page, limit } = await getFilteredSortedPaginatedBrands(queryFeatures);

    res.status(200).json({
      success: true,
      data: brands,
      total,
      page,
      limit,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "An unknown error occurred." });
    }
  }
};

// Get a brand by ID
export const getBrandById = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      res
        .status(404)
        .json({ success: false, message: "Brand not found." });
    }
    res.status(200).json({ success: true, data: brand });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "An unknown error occurred." });
    }
  }
};

// Update a brand by ID
export const updateBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!brand) {
      res
        .status(404)
        .json({ success: false, message: "Brand not found." });
    }
    res.status(200).json({
      success: true,
      data: brand,
      message: "Brand updated successfully.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "An unknown error occurred." });
    }
  }
};

// Delete a brand by ID
export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      res
        .status(404)
        .json({ success: false, message: "Brand not found." });
    }
    res.status(200).json({
      success: true,
      message: "Brand deleted successfully.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "An unknown error occurred." });
    }
  }
};
