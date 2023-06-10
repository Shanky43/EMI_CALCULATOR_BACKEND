const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  try {
    const { email, password, lastname, firstname } = req.body;
  
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new userModel({
        email,
        password: hash,
        lastname,
        firstname,
      });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, userName: user.name },
            "shhhhh"
          );
          res.status(200).json({ message: "Login Sucessful", token });
        } else {
          res.status(401).json({ message: "Wrong Credentials" });
        }
      });
    } else {
      res.status(401).json({ message: "Wrong Credentials" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = { userRouter };
