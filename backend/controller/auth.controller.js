import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// signup controller
export const signup = async (req, res, next) => {
  const { name, email, password ,role} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword,role });
    if (newAdmin) {
      newAdmin.save();
      const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      });
    }
    res.status(201).json({
      success: true,
      message: "Admin signed successfully ",
      data: {
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
// login controller
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        name: admin.name,
        email: admin.email,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// logout controller
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful done" });
  } catch (error) {
    next(error);
  }
};

// profile
export const me = async (req, res, next) => {
  const id = req.userId;

  try {
    const admin = await Admin.findById(id).select("-password");
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};
