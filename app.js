import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { config } from "dotenv";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

config({
  path: "./data/config.env",
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(errorMiddleware);
