import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    res.json({
      message: "Image uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      message: error.message || "Upload failed",
    });
  }
};