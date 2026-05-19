import prisma from "../config/prisma.js";

// GET ALL DONORS
export const getAllDonors = async (req, res) => {
  try {
    const donors = await prisma.donor.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(donors);
  } catch (error) {
    console.error("Get Donors Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE DONOR
export const createDonor = async (req, res) => {
  try {
    const { name, age, bloodGroup, phone, city } = req.body;

    if (!name || !age || !bloodGroup || !phone || !city) {
      return res.status(400).json({
        message: "All fields are required (name, age, bloodGroup, phone, city)",
      });
    }

    const donor = await prisma.donor.create({
      data: {
        name,
        age: parseInt(age),
        bloodGroup,
        phone,
        city,
      },
    });

    // Get updated donor count
    const totalDonors = await prisma.donor.count();

    // Socket.IO real-time updates
    const io = req.app.get("io");

    if (io) {
      io.emit("message", `New Donor Registered: ${name} ❤️`);
      io.emit("donorCountUpdated", totalDonors);
    }

    res.status(201).json({
      message: "Donor Registered Successfully ✅",
      donor,
    });
  } catch (error) {
    console.error("Create Donor Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};