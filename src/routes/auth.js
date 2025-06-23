const express = require("express");
const User = require("../model/User");
const validateSignUpData = require("../utils/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("hello");
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ emailId: email });
    if (!userExist) {
      throw new Error("User does not exist");
    }

    const comparePassword = await userExist.isPassword(password);

    if (!comparePassword) {
      throw new Error("Invalid Credentials");
    }

    const token = await userExist.getJwt();

    console.log("token ", token);
    res.cookie("token", token, { httpOnly: true });

    if (!token) {
      throw new Error("token not found");
    }
    res.status(201).json({
      message: userExist,
      token,
    });
  } catch (error) {
      console.error("Login error:", error.message); 
    res.status(400).json({
      message: "Something Went Wrong",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req.body);

    const { emailId, firstName, lastName, password } = req.body;
    console.log("req", req.body);

    const userExist = await User.findOne({ emailId: emailId });
    if (userExist) {
      throw new Error("User Already Exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    const user = new User({
      emailId,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({
      message: "user saved successfully",
    });
  } catch (error) {
    console.log("Error saving user:", error.message);
    res.status(500).json({
      message: "Failed to save user",
      error: error.message,
    });
  }
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.find({ _id: id });
  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }
  const userFound = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(201).json({
    message: "user updated successfully",
    userFound,
  });
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
});
router.get("/all-users", async (req, res) => {
  console.log("triggering");
  try {
    const user = await User.find();
    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "something went wrong",
    });
  }
});

module.exports = router;
