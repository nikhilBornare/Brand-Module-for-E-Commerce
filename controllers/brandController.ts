import { Request, Response, NextFunction } from "express";
import Brand from "../models/brandModel";
import getFilteredSortedPaginatedBrands from "../utils/features";
import { ApplicationError } from "../error-handler/applicationError";

// createBrand
export const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({
      success: true,
      data: brand,
      message: "Brand created successfully.",
    });
  } catch (error: any) {
    next(new ApplicationError((error as Error).message, 400));
  }
};  
// getAllBrands
export const getAllBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryFeatures = {
      search: req.query.search as string,
      rating: req.query.rating as string,
      status: req.query.status as "Active" | "Inactive",
      sort: req.query.sort as "name" | "createdAtAsc" | "updatedAtAsc" | "createdAtDesc" | "updatedAtDesc" | "status" | "statusDesc",
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

// getBrandById
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

// updateBrand
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

// deleteBrand
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

// deleteMultipleBrands
// deleteMultipleBrands
export const deleteMultipleBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body; // Assuming an array of IDs is sent in the request body

    if (!Array.isArray(ids) || ids.length === 0) {
      return next(new ApplicationError("Invalid IDs provided.", 400));
    }

    const success = [];
    const failed = [];

    for (const id of ids) {
      try {
        const brand = await Brand.findByIdAndDelete(id);
        if (brand) {
          success.push({ id, message: "Deleted successfully" });
        } else {
          failed.push({ id, message: "Brand not found" });
        }
      } catch (err) {
        failed.push({ id, message: "Invalid ID format or error during deletion" });
      }
    }

    res.status(200).json({
      success: true,
      results: {
        deleted: success.length,
        failed: failed.length,
        details: {
          success,
          failed,
        },
      },
    });
  } catch (error) {
    next(new ApplicationError((error as Error).message, 500));
  }
};
