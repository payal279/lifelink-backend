import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  res.json({
    url: result.secure_url
  });
};