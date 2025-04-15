import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/usercontroller.js";

const userRouter = Router();

// Define routes

// Register/ Signup
userRouter.post("/users/signup", registerUser);

// Login
userRouter.post("/users/login", loginUser);

// Update user
userRouter.patch("/users/:id", updateUser);

// Get all users
userRouter.get("/users", getAllUsers);
