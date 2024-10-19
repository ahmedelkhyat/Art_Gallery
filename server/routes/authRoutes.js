import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);

export default router;
