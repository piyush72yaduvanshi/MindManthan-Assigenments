import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { validateUser } from "../validator/validation.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post(
  "/create",
  validateUser,
  createUser
);

router.put(
  "/update/:id",
  validateUser,
  updateUser
);

router.delete("/delete/:id", deleteUser);

export default router;