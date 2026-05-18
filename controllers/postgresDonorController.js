export const createDonor = async (req, res) => {
  try {
    const { name, bloodGroup, city } = req.body;

    const donor = await prisma.donor.create({
      data: {
        name,
        bloodGroup,
        city,
      },
    });

    // Get latest donor count
    const totalDonors = await prisma.donor.count();

    // Emit real-time update
    const io = req.app.get("io");
    io.emit("donorCountUpdated", totalDonors);

    res.status(201).json({
      message: "Donor Registered Successfully",
      donor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};