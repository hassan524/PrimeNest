import { Request, Response } from 'express';
import Property from '../models/Propertys.model';

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