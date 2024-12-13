import { Request, Response } from "express";
import Brand from "../models/brandModel";

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
    const { search, sort, page = 1, limit = 10 } = req.query;

    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Search by name
    }

    const options: any = {};
    if (sort) {
      options.sort = { [sort as string]: 1 }; // Sort dynamically by field
    }

    const brands = await Brand.find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(options.sort || {});

    res.status(200).json({
      success: true,
      data: brands,
      total: await Brand.countDocuments(query),
      page: Number(page),
      limit: Number(limit),
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