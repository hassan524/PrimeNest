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
            tags: formData.tags,
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

        const isAlreadyFav = user.favorites.some((fav) => fav.toString() === id);

        let message = "";

        if (isAlreadyFav) {
            user.favorites = user.favorites.filter((fav) => fav.toString() !== id);
            message = "Removed from favorites successfully";
        } else {
            // Add if not exists
            user.favorites.push(id);
            message = "Added to favorites successfully";
        }

        await user.save();

        res.status(200).json({
            message, 
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



export const GetUserUniqueProp = async (req: Request, res: Response) => {
    try {
        console.log("🚀 Request received at /Uniqueprop with body:", req.body);

        const { propertyID, userID } = req.body;

        if (!propertyID || !userID) {
            console.log("Missing Credentials:", { propertyID, userID });
            return res.status(400).json({ message: "Credentials are required" });
        }

        console.log("🔍 Searching for Property with ID:", propertyID);

        const property = await Property.findById(propertyID);

        if (!property) {
            console.log("❌ Property not found in database for ID:", propertyID);
            return res.status(404).json({ message: "Property not found" });
        }



        const user = await User.findById(userID);

        if (!user) {
            console.log("User not found in database for ID:", userID);
            return res.status(404).json({ message: "User not found" });
        }


        return res.status(200).json({ property, user });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const Info = async (req: Request, res: Response) => {
    try {
        const Users = await User.find();
        if (Users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        const props = await Property.find();
        if (props.length === 0) {
            return res.status(404).json({ message: 'No properties found' });
        }

        res.status(200).json({ message: 'Information', Users, props });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
