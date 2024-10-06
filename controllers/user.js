import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
};

export const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("id", user._id.toString()).json({
    success: true,
    message: "User created successfully",
  });
};

export const specialRoute = (req, res) => {
  res.json({
    success: true,
    message: "Just a special route",
  });
};

export const getUserDetails = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json({
    success: true,
    user,
  });
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json({
    success: true,
    message: "Updated",
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  await user.deleteOne();

  res.json({
    success: true,
    message: "Deleted",
  });
};
