import jwt from "jsonwebtoken";

export const setToken = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: message,
    });
};
