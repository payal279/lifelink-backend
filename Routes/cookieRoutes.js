import express from "express";
import {
  setCookie,
  getCookie,
  clearCookie
} from "../controllers/cookieController.js";

const router = express.Router();

router.get("/set-cookie", setCookie);
router.get("/get-cookie", getCookie);
router.get("/clear-cookie", clearCookie);

export default router;