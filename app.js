import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

export const app = express();

config({
  path: "./data/config.env",
});

// Using middleware json
app.use(express.json());
app.use("/users", userRouter);
