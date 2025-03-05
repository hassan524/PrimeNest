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

const SellPropertyDialog = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const { IsPropertyOpen, SetIsPropertyOpen } = useAppContext();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setLoading(true);
    try {
      const imageURL = await uploadImage(file);
      if (imageURL) setPreviewImages((prev) => [...prev, imageURL]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) return;
    if (tags.length < 3) return alert("Minimum 3 tags are required!");
    console.log("✅ Form submitted:", { tags, title, description, location });
  };

  return (
    <Dialog open={IsPropertyOpen} onOpenChange={SetIsPropertyOpen}>
      <DialogContent className="sm:max-w-4xl w-[90vw] max-h-[80vh] overflow-y-auto rounded-lg text-gray-900 flex flex-col gap-6">
        <DialogHeader className="flex flex-col gap-1">
          <DialogTitle className="text-2xl">Sell Your Property</DialogTitle>
          <DialogDescription>Fill out the details below to list your property.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-start gap-4 flex-wrap">
            {previewImages.map((src, index) => (
              <div key={index} className="relative sm:w-28 sm:h-20 h-16 w-24 bg-slate-500 overflow-hidden rounded">
                <img className="w-full h-full object-cover" src={src} alt={`Property ${index + 1}`} />
                <i className="bi bi-x absolute top-1 right-1 cursor-pointer bg-white rounded-full p-1 text-sm" onClick={() => removeImage(index)}></i>
              </div>
            ))}
            {loading && <Skeleton className="sm:w-28 sm:h-20 h-16 w-24" />}
            {previewImages.length < 5 && (
              <label className="sm:w-28 sm:h-20 h-16 w-24 bg-slate-100 rounded-md flex items-center justify-center cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <span className="text-gray-600 text-[1rem]">+</span>
              </label>
            )}
          </div>
          <input type="text" placeholder="Enter your property title" className="mt-1 block w-full border rounded-md p-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Enter your property location" className="mt-1 block w-full border rounded-md p-2" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <div className="flex gap-4">
            <input placeholder="Bedrooms" className="w-1/2 border rounded-md p-2" type="number" />
            <input placeholder="Bathrooms" className="w-1/2 border rounded-md p-2" type="number" />
          </div>
          <div className="border rounded-md p-2 flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                {tag} <i className="bi bi-x cursor-pointer" onClick={() => removeTag(tag)}></i>
              </span>
            ))}
            <input type="text" className="outline-none flex-grow" placeholder="Enter your tags" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleTagKeyDown} required />
          </div>
          <textarea rows={4} className="mt-1 block w-full border rounded-md p-2" placeholder="Describe your property..." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          <div className="flex items-center border rounded-md p-2">
            <i className="bi bi-currency-dollar"></i>
            <input type="number" min={1000} placeholder="Enter your price" className="w-full outline-none" required />
          </div>
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
