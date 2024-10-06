import express from "express";
import {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUserDetails,
  specialRoute,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/new", createNewUser);

router.get("/all", getAllUsers);

router.get("/user/special", specialRoute);

router
  .route("/user/:id")
  .get(getUserDetails)
  .put(updateUser)
  .delete(deleteUser);

// router.get("/user/:id", getUserDetails);

// router.put("/user/:id", updateUser);

// router.delete("/user/:id", deleteUser);

export default router;
