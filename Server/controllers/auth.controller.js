import bcryptjs from "bcryptjs";

import { User } from "../models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";

export const signup = async (req, res) => {
    
  console.log("Sing up successfully");

  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new error("Please fill in all fields");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();

    //JWT
    generateTokenAndSetCookie(res, user._id);
    
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user:{
            ...user._doc,
            password: undefined,
        },
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("Login route");
};

export const logout = async (req, res) => {
  res.send("Logout route");
};
