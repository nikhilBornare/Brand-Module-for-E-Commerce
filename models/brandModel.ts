import mongoose, { Schema, Document } from "mongoose";

// Define the Brand interface
export interface IBrand extends Document {
    name: string;
    description: string;
    website: string;
    email: string;
    country: string;
    foundedYear: number;
    status: string;
    availableLocation: string;
    totalProduct: number; 
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Brand schema
const brandSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        website: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        foundedYear: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true, enum: ["Active", "Inactive"]
        },
        availableLocation: {
            type: String,
            required: true
        },
        totalProduct: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

export default mongoose.model<IBrand>("Brand", brandSchema);
