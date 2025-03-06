import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const PropertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  images: z.array(z.string()).nonempty("At least one image is required"),
  bedrooms: z.number().min(0, "Bedrooms cannot be negative").optional(),
  bathrooms: z.number().min(0, "Bathrooms cannot be negative").optional(),
});