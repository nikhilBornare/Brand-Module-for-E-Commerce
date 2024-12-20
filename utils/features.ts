import { Request, Response } from "express";
import Brand from "../models/brandModel";

interface QueryFeatures {
    search?: string;
    rating?: string;
    sort?: "name" | "createdAtAsc" | "updatedAtAsc" | "createdAtDesc" | "updatedAtDesc";
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
    // rating
    if (rating) {
        query.rating = { $gte: parseFloat(rating) };
    }
    // sort
    let sortOption = {};

    // Map the sort options to their corresponding sorting criteria
    const sortOptionsMap = {
        name: { name: 1 },              
        createdAtAsc: { createdAt: 1 }, 
        updatedAtAsc: { updatedAt: 1 }, 
        createdAtDesc: { createdAt: -1 }, 
        updatedAtDesc: { updatedAt: -1 }
    };

    // Check if the 'sort' value matches any key in the map and set the sortOption
    if (sort) {
        sortOption = sortOptionsMap[sort];
    }

    console.log(sortOption);  


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