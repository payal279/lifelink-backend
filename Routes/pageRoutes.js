import express from "express";
import {
  home,
  fileData,
  about,
  stream,
  errorRoute
} from "../controllers/pageController.js";

const router = express.Router();

router.get("/", home);
router.get("/file-data", fileData);
router.get("/about", about);
router.get("/stream", stream);
router.get("/error", errorRoute);

export default router;