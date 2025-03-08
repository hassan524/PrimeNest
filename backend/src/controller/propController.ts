import { Request, Response } from 'express';
import Property from '../models/Propertys.model';
import User from '../models/User.model';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
    user?: { id: string };
}


export const HandleAddProperty = async (req: AuthRequest, res: Response) => {
    const formData = req.body;

    console.log("Request Body:", formData);

    try {
        const NewProperty = new Property({
            title: formData.title,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            images: formData.images,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            userId: req.user?.id,
            propertyType: formData.propertyType
        });

        await NewProperty.save();

        res.status(201).json({ message: "Property added successfully", property: NewProperty });
    } catch (error: any) {
        console.error("Error adding property:", error);
        res.status(500).json({ message: "Failed to add property", error: error.message });
    }
};


export const HandleGetPropertys = async (req: Request, res: Response) => {
    try {
        const properties = await Property.find();
        res.status(200).json({ success: true, properties });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const HandleAddToFav = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        const { id } = req.body;
        const userId = req.user.id;

        if (!id) return res.status(400).json({ message: "Property ID is required" });

        const user = await User.findById(userId);
        const property = await Property.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });
        if (!property) return res.status(404).json({ message: "Property not found" });

        const index = user.favorites.findIndex((fav) => fav === id);
        index > -1 ? user.favorites.splice(index, 1) : user.favorites.push(id);

        await user.save();

        res.status(200).json({
            message: 'Success',
            favorites: user.favorites,
        });
    } catch (error) {
        console.error("Error in HandleAddToFav:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const HandleGetFav = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const favoriteProperties = await Property.find({ _id: { $in: user.favorites } });

        return res.json({ message: "Success", favorites: favoriteProperties });
    } catch (error) {
        console.error("Error fetching favorite properties:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserProperties = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        const userId = req.user.id; // Get user ID from middleware
        const properties = await Property.find({ userId });

        res.json({ message: "Success", properties });
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};