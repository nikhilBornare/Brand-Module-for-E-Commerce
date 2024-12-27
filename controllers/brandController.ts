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

// createMultipleBrands
export const createMultipleBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brands = req.body; 
    if (!Array.isArray(brands) || brands.length === 0) {
      return next(new ApplicationError("Invalid or empty array of brands provided.", 400));
    }

    const success = [];
    const failed = [];

    for (const brand of brands) {
      try {
        const newBrand = await Brand.create(brand);
        success.push({ id: newBrand._id, name: newBrand.name, message: "Created successfully" });
      } catch (err) {
        failed.push({ brand, message: (err as Error).message });
      }
    }

    res.status(201).json({
      success: true,
      results: {
        created: success.length,
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

// updateMultipleBrands
export const updateMultipleBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updates = req.body; 
    if (!Array.isArray(updates) || updates.length === 0) {
      return next(new ApplicationError("Invalid or empty array of updates provided.", 400));
    }

    const success = [];
    const failed = [];

    for (const { id, updateData } of updates) {
      try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        });
        if (updatedBrand) {
          success.push({ id, name: updatedBrand.name, message: "Updated successfully" });
        } else {
          failed.push({ id, message: "Brand not found" });
        }
      } catch (err) {
        failed.push({ id, message: (err as Error).message });
      }
    }

    res.status(200).json({
      success: true,
      results: {
        updated: success.length,
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
export const deleteMultipleBrands = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body; 

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
