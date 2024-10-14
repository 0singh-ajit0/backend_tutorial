import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setToken } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    setToken(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");

    if (user) return next(new ErrorHandler("Invalid email or password", 400));

    if (!bcrypt.compareSync(password, user.password))
      return next(new ErrorHandler("Invalid email or password", 400));

    setToken(user, res, "Welcome back");
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out",
    });
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
