import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const roleMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized ,please login" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findById(decode.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }
    if (user.role === "admin") {
      return next();
    }
    res.status(401).json({ success: false, message: "unauthorized" });
  } catch (error) {
    next(error);
  }
};
