import { Request, Response, NextFunction } from "express";
import Brand from "../models/brandModel";
import getFilteredSortedPaginatedBrands from "../utils/features";
import { ApplicationError } from "../error-handler/applicationError";

// Create a new brand
export const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({
      success: true,
      data: brand,
      message: "Brand created successfully.",
    });
  } catch (error: any) {
    // Handle MongoDB Duplicate Key Error (E11000)
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateKey];
      return next(
        new ApplicationError(
          `The ${duplicateKey} "${duplicateValue}" already exists. Please use a different name.`,
          400
        )
      );
    }

    // Pass other errors to the global error handler
    next(new ApplicationError((error as Error).message, 400));
  }
};

// Get all brands with filtering, sorting, pagination
export const getAllBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryFeatures = {
      search: req.query.search as string,
      rating: req.query.rating as string,
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
  } catch (error) {
    next(new ApplicationError((error as Error).message, 500));
  }
};

// Get a brand by ID
export const getBrandById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return next(new ApplicationError("Brand not found.", 404));
    }
    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    next(new ApplicationError((error as Error).message, 500));
  }
};

// Update a brand by ID
export const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!brand) {
      return next(new ApplicationError("Brand not found.", 404));
    }
    res.status(200).json({
      success: true,
      data: brand,
      message: "Brand updated successfully.",
    });
  } catch (error) {
    next(new ApplicationError((error as Error).message, 400));
  }
};

// Delete a brand by ID
export const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return next(new ApplicationError("Brand not found.", 404));
    }
    res.status(200).json({
      success: true,
      message: "Brand deleted successfully.",
    });
  } catch (error) {
    next(new ApplicationError((error as Error).message, 500));
  }
};
