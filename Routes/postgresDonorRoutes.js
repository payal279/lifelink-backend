import express from "express";
import {
  getAllDonors,
  createDonor,
} from "../controllers/postgresDonorController.js";

const router = express.Router();

router.get("/", getAllDonors);
router.post("/", createDonor);

export default router;