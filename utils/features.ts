import { Request, Response } from "express";
import Brand from "../models/brandModel";

interface QueryFeatures {
    search?: string;
    rating?: string; // New field for filtering by rating
    sort?: string;
    page?: number;
    limit?: number;
}

const getFilteredSortedPaginatedBrands = async (queryFeatures: QueryFeatures) => {
    const { search, rating, sort, page = 1, limit = 10 } = queryFeatures;

    const query: any = {};
    if (search) {
        query.name = { $regex: search, $options: "i" }; // Search by name
    }

    if (rating) {
        query.rating = { $gte: parseFloat(rating) }; // Filter by rating greater than or equal to the provided value
    }

    const options: any = {};
    if (sort) {
        if (sort === "name") {
            options.sort = { name: 1 }; // Sort alphabetically by name
        } else {
            options.sort = { [sort as string]: 1 }; // Sort dynamically by other fields
        }
    }

    const brands = await Brand.find(query)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .sort(options.sort || {});

    return {
        brands,
        total: await Brand.countDocuments(query),
        page: Number(page),
        limit: Number(limit),
    };
};

export default getFilteredSortedPaginatedBrands;
