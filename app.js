import express from "express";
import mongoose from "mongoose";

const app = express();

// Using middleware json
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/", {
    dbName: "apitutorial",
  })
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Nice working");
});

app.post("/users/new", async (req, res) => {
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
});

app.get("/users/all", async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users,
  });
});

app.get("/user/special", (req, res) => {
  res.json({
    success: true,
    message: "Just a special route",
  });
});

app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json({
    success: true,
    user,
  });
});

app.listen(5500, () => {
  console.log("Server is running at http://127.0.0.1:5500");
});
