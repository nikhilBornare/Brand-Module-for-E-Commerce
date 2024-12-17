import { Request, Response } from "express";
import Brand from "../models/brandModel";

interface QueryFeatures {
    search?: string;
    rating?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

const getFilteredSortedPaginatedBrands = async (queryFeatures: QueryFeatures) => {
    const { search, rating, sort, page = 1, limit = 10 } = queryFeatures;

    console.log('Query Features:', queryFeatures);

    const query: any = {};
    if (search) {
        query.name = { $regex: search, $options: "i" };
    }

    if (rating) {
        query.rating = { $gte: parseFloat(rating) }; // Filter by rating greater than or equal to the provided value
    }

    let sortOption: any = {};
    if (sort) {
        if (sort === "name") {
            sortOption = { name: 1 }; // Sort alphabetically by name (ascending)
        }
    }

    console.log('Sort Option:', sortOption);

    const brands = await Brand.find(query)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .sort(sortOption);

    return {
        brands,
        total: await Brand.countDocuments(query), 
        page: Number(page),
        limit: Number(limit),
    };
};



export default getFilteredSortedPaginatedBrands;