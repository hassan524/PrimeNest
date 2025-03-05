export const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    
    formData.append("file", file);
    formData.append("upload_preset", "my-preset-123");

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data.secure_url || null; 
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};
