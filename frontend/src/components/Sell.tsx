"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/context";
import { uploadImage } from "../../utils/claudinary";
import { Skeleton } from "./ui/skeleton";
import axios from 'axios'
import { toast } from 'sonner'
import { PropertySchema } from "../../utils/Schema";
import { apiRoute } from "../../utils/apiRoutes";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SellPropertyDialog = () => {
  const { IsPropertyOpen, SetIsPropertyOpen } = useAppContext();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    images: string[];
    previewImages: string[];
    tags: string[];
    inputValue: string;
    title: string;
    description: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    price: number;
    propertyType: string;
  }>({
    images: [],
    previewImages: [],
    tags: [],
    inputValue: "",
    title: "",
    description: "",
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    propertyType: "",
  });
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    setLoading(true);

    try {
      const imageURL = await uploadImage(file);

      if (imageURL) {
        setFormData((prev) => ({
          ...prev,
          previewImages: [...prev.previewImages, imageURL],
          images: [...prev.images, imageURL],
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      previewImages: prev.previewImages.filter((_, i) => i !== index),
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.inputValue.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(formData.inputValue.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, formData.inputValue.trim()],
          inputValue: "",
        }));
      }
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sanitizedFormData = {
      ...formData,
      price: Number(formData.price) || 0,
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
    };

    const result = PropertySchema.safeParse(sanitizedFormData);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      toast.error(firstError);
      return;
    }

    try {
      await axios.post(apiRoute.AddProperty, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: session?.user?.token,
        },
      });

      toast.success("Property Added Successfully");

      setFormData({
        images: [],
        previewImages: [],
        tags: [],
        inputValue: "",
        title: "",
        description: "",
        location: "",
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        propertyType: ""
      });


      SetIsPropertyOpen(false);
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message || "Something went wrong!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Dialog open={IsPropertyOpen} onOpenChange={SetIsPropertyOpen}>
      <DialogContent className="sm:max-w-4xl w-[90vw] max-h-[80vh] overflow-y-auto rounded-lg text-gray-900 flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sell Your Property</DialogTitle>
          <DialogDescription>Fill out the details below to list your property.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-4 flex-wrap">
            {formData.previewImages.map((src, index) => (
              <div key={index} className="relative sm:w-28 sm:h-20 h-16 w-24 bg-slate-500 rounded overflow-hidden">
                <img className="w-full h-full object-cover" src={src} alt={`Property ${index + 1}`} />
                <i className="bi bi-x absolute top-1 right-1 cursor-pointer bg-white rounded-full p-1 text-sm" onClick={() => removeImage(index)}></i>
              </div>
            ))}
            {loading && <Skeleton className="sm:w-28 sm:h-20 h-16 w-24" />}
            {formData.previewImages.length < 5 && (
              <label className="sm:w-28 sm:h-20 h-16 w-24 bg-slate-100 rounded-md flex items-center justify-center cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <span className="text-gray-600 text-[1rem]">+</span>
              </label>
            )}
          </div>
          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Whats Your Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="For Rent">For Rent</SelectItem>
              <SelectItem value="For Sale">For Sale</SelectItem>
            </SelectContent>
          </Select>
          <input type="text" name="title" placeholder="Property Title" className="border rounded-md p-2" value={formData.title} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" className="border rounded-md p-2" value={formData.location} onChange={handleChange} required />
          <div className="flex gap-4">
            <input type="number" name="bedrooms" placeholder="Bedrooms" className="w-1/2 border rounded-md p-2" value={formData.bedrooms} onChange={handleChange} />
            <input type="number" name="bathrooms" placeholder="Bathrooms" className="w-1/2 border rounded-md p-2" value={formData.bathrooms} onChange={handleChange} />
          </div>
          <div className="border rounded-md p-2 flex flex-wrap gap-3">
            {formData.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                {tag} <i className="bi bi-x cursor-pointer" onClick={() => removeTag(tag)}></i>
              </span>
            ))}
            <input type="text" className="outline-none flex-grow" placeholder="Enter tags" name="inputValue" value={formData.inputValue} onChange={handleChange} onKeyDown={handleTagKeyDown} />
          </div>
          <textarea name="description" rows={4} className="border rounded-md p-2" placeholder="Describe your property..." value={formData.description} onChange={handleChange} required></textarea>
          <input type="number" name="price" min={1000} placeholder="Price" className="border rounded-md p-2" value={formData.price} onChange={handleChange} required />
          <div className="mt-6 flex justify-end space-x-4">
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Submit Property</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SellPropertyDialog;
