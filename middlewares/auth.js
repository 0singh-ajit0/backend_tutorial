import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login first",
    });
  }

  const decodedData = jwt.decode(token, process.env.JWT_SECRET);
  const id = decodedData._id;
  req.user = await User.findById(id);

  next();
};
