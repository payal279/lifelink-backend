import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hospital Route Working");
});

export default router;