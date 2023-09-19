import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

//Register route
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;
    const userEmail = await UserModel.findOne({ email });

    if (userEmail) return res.json({ message: "Email has already been used!" });

    if (password.length < 8)
      return res.json({ message: "Password must be at least 8 characters!" });

    const hashUserPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      password: hashUserPassword,
    });

    await newUser.save();

    res.json({ message: "User has been successfully registered!" });
  } catch (err) {
    console.log(err);
    res.json({ message: "An error has occured. Please try again!" });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await UserModel.findOne({ email });

    if (!userEmail)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect!" });

    const validPassword = await bcrypt.compare(password, userEmail.password);

    if (!validPassword)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect!" });

    if (userEmail && validPassword)
      return res
        .status(200)
        .json({
          message: "You have been successfully logged into the system!",
        });

  } catch (err) {
    console.log(err);
  }
});

export { router as UserRouter };