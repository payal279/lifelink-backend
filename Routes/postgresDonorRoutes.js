import express from "express";
import { getDonors, createDonor } from "../controllers/postgresDonorController.js";

const router = express.Router();

router.get("/pg-donors", getDonors);
router.post("/pg-donors", createDonor);

export default router;