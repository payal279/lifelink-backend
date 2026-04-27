import express from "express";
import {
  visit,
  loginSession,
  profileSession,
  logoutSession
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/visit", visit);
router.get("/login-session", loginSession);
router.get("/profile-session", profileSession);
router.get("/logout-session", logoutSession);

export default router;