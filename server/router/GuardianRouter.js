import express from "express";
import { GuardianModel } from "../models/GuardianModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const newGuardian = new GuardianModel({
      name,
      email,
      phone,
    });

    await newGuardian.save();

    res.status(201).json({ message: "Guardian added successfully" });
  } catch (error) {
    console.error("Error adding guardian:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as GuardianRouter };
