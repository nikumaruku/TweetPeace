import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/UserModel.js";

const router = express.Router();

function createToken(username) {
  const token = jwt.sign({ username }, "bully123", { expiresIn: "1h" });
  return token;
}

//Register route
router.post("/register", async (req, res) => {
  try {
    // const { firstName, lastName, age, email, password } = req.body;
    const { username, age, email, password } = req.body;

    const user = await UserModel.findOne({ username });
    const userEmail = await UserModel.findOne({ email });

    if (userEmail) return res.json({ message: "Email has already been used!" });

    if (user)
      return res.json({
        message: "Username has been taken! Try using another name.",
      });

    if (password.length < 8)
      return res.json({ message: "Password must be at least 8 characters!" });

    const hashUserPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      // firstName: firstName,
      // lastName: lastName,
      username: username,
      email: email,
      age: age,
      password: hashUserPassword,
    });

    await newUser.save();

    res.json({ message: "User has been successfully registered!" });
    createToken(username);
  } catch (err) {
    console.log(err);
    res.json({ message: "An error has occured. Please try again!" });
  }
});

//Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect!" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res
        .status(401)
        .json({ message: "Email or password is incorrect!" });

    if (user && validPassword)
      return res.status(200).json({
        message: "You have been successfully logged into the system!",
      });
  } catch (err) {
    console.log(err);
  }
});

//Fetch users
router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export { router as UserRouter };
