import mongoose, { Schema, Document } from "mongoose";

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

const brandSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: false
        },
        website: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: false
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
            required: false
        },
        totalProduct: {
            type: Number,
            required: false
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBrand>("Brand", brandSchema);
