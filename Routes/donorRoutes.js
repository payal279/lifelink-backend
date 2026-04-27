import express from "express";
import Donor from "../models/Donor.js";

const router = express.Router();

/*ROUTER MIDDLEWARE*/
router.use((req, res, next) => {
  console.log("Donor Route Hit:", req.method, req.url);
  next();
});

/*GET ALL DONORS*/
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching donors",
      error: error.message
    });
  }
});

/*GET SINGLE DONOR BY ID*/
router.get("/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found"
      });
    }

    res.json(donor);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching donor",
      error: error.message
    });
  }
});

/* POST NEW DONOR */
router.post("/", async (req, res) => {
  try {
    const { name, blood, city } = req.body;

    if (!name || !blood || !city) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const newDonor = new Donor({
      name,
      blood,
      city
    });

    await newDonor.save();

    res.status(201).json({
      message: "Donor Registered Successfully",
      donor: newDonor
    });

  } catch (error) {
    res.status(500).json({
      message: "Error saving donor",
      error: error.message
    });
  }
});

/*UPDATE DONOR*/
router.put("/:id", async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDonor) {
      return res.status(404).json({
        message: "Donor not found"
      });
    }

    res.json({
      message: "Donor Updated Successfully",
      donor: updatedDonor
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating donor",
      error: error.message
    });
  }
});

/*DELETE DONOR */
router.delete("/:id", async (req, res) => {
  try {
    const deletedDonor = await Donor.findByIdAndDelete(req.params.id);

    if (!deletedDonor) {
      return res.status(404).json({
        message: "Donor not found"
      });
    }

    res.json({
      message: "Donor Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting donor",
      error: error.message
    });
  }
});

export default router;