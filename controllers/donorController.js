// controllers/donorController.js
import Donor from "../Models/Donor.js";

export const getDonors = async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
};

export const addDonor = async (req, res) => {
  const donor = await Donor.create(req.body);
  res.status(201).json(donor);
};