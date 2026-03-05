const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Patient API working");
});

module.exports = router;