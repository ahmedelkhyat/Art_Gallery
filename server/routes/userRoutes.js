import express from "express";
import UserController from "../controllers/UserController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../middlewares/userValidator.js";

const router = express.Router();

router.get("/users", authenticateToken, UserController.getUsers);
router.get("/users/:id", authenticateToken, UserController.getUser);
router.post("/users", createUserValidation, UserController.createUser);
router.patch(
  "/users/:id",
  authenticateToken,
  updateUserValidation,
  UserController.updateUser
);
router.delete("/users/:id", authenticateToken, UserController.deleteUser);

export default router;
