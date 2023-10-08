import express from "express";
import mongoose from "mongoose";
import { GuardianModel } from "../models/GuardianModel.js";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

const MAX_GUARDIAN_COUNT = 1;

router.post("/create/:username", async (req, res) => {
  try {
    const currentGuardianCount = await GuardianModel.countDocuments();

    if (currentGuardianCount > MAX_GUARDIAN_COUNT) {
      return res.status(400).json({
        message: `Maximum guardian limit reached (${MAX_GUARDIAN_COUNT}). Cannot add more guardians.`,
      });
    }

    const { name, email, phone } = req.body;
    const username = req.params.username;
    const user = await UserModel.findOne({ username });

    const newGuardian = new GuardianModel({
      name,
      email,
      phone,
      user: user._id,
    });

    await newGuardian.save();

    // const newGuardian = new GuardianModel(req.body);
    // const savedGuardian = await newGuardian.save();
    // res.status(201).json({ message: "Guardian created successfully", guardian: savedGuardian });

    res.status(201).json({ message: "Guardian added successfully" });
  } catch (error) {
    console.error("Error adding guardian:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/obtain/:username", async (req, res) => {
  try {

    const username = req.params.username;
    const user = await UserModel.findOne({ username });

    const guardians = await GuardianModel.find({ user });

    if (!guardians || guardians.length === 0) {
      return res.status(404).json({ message: "No guardians found." });
    }

    res.status(200).json(guardians);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error obtaining guardian information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const guardianId = req.params.id;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(guardianId)) {
      return res.status(400).json({ error: "Invalid guardian ID" });
    }

    const updatedGuardian = await GuardianModel.findByIdAndUpdate(
      guardianId,
      updatedData,
      { new: true }
    );

    if (!updatedGuardian) {
      return res.status(404).json({ error: "Guardian not found" });
    }

    res.status(200).json(updatedGuardian);
  } catch (error) {
    console.error("Error updating guardian:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as GuardianRouter };
