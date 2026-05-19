import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hospital API working");
});

export default router;