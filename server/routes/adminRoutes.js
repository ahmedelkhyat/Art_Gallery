import express from "express";
import AdminController from "../controllers/AdminController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../middlewares/userValidator.js";

const router = express.Router();

router.get("/admins", authenticateToken, AdminController.getAdmins);
router.get("/admins/:id", authenticateToken, AdminController.getAdmin);
router.post("/admins", createUserValidation, AdminController.createAdmin);
router.patch(
  "/admins/:id",
  authenticateToken,
  updateUserValidation,
  AdminController.updateAdmin
);
router.delete("/admins/:id", authenticateToken, AdminController.deleteAdmin);

export default router;
