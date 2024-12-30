import Brand from "../models/brandModel";

interface QueryFeatures {
    search?: string;
    rating?: string;
    status?: "Active" | "Inactive"; 
    sort?: "name" | "createdAtAsc" | "updatedAtAsc" | "createdAtDesc" | "updatedAtDesc" | "status" | "statusDesc";
    page?: number;
    limit?: number;
}
    


const getFilteredSortedPaginatedBrands = async (queryFeatures: QueryFeatures) => {
    const { search, rating, sort, page = 1, limit = 10 } = queryFeatures;

    console.log("Query Features:", queryFeatures);

    const query: any = {};

    // Filter by name (search)
    if (search) {
        query.name = { $regex: search, $options: "i" }; 
    }

    // Filter by rating
    if (rating) {
        query.rating = { $gte: parseFloat(rating) }; 
    }

    // Filter by status (Active/Inactive)
    if (queryFeatures.status) {
        query.status = queryFeatures.status; 
    }

    // Sorting 
    let sortOption = {};
    const sortOptionsMap = {
        name: { name: 1 },
        nameDesc: { name: -1 },
        createdAtAsc: { createdAt: 1 },
        updatedAtAsc: { updatedAt: 1 },
        createdAtDesc: { createdAt: -1 },
        updatedAtDesc: { updatedAt: -1 },
        status: { status: 1 }, 
        statusDesc: { status: -1 }, 
    };

    if (sort) {
        sortOption = sortOptionsMap[sort] || {};
    }

    console.log("Sort Option:", sortOption);

    // Fetch filtered, sorted, and paginated brands
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