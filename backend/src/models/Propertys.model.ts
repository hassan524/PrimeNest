import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
    title: string;
    description: string;
    price: number;
    location: string;

    images: string[];
    bedrooms?: number;
    bathrooms?: number;
    userId: mongoose.Schema.Types.ObjectId; 
    propertyType: string;
}

const PropertySchema = new Schema<IProperty>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        images: { type: [String], required: true }, 
        bedrooms: { type: Number, default: 0 },
        bathrooms: { type: Number, default: 0 },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
        propertyType: {type: String, required: true}
    },
    { timestamps: true }
);

const Property = mongoose.model<IProperty>('Property', PropertySchema);

export default Property;
