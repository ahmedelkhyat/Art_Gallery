import express from "express";
import CartController from "../controllers/CartController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import {
  createCartValidation,
  updateCartValidation,
} from "../middlewares/cartValidator.js";

const router = express.Router();

router.get("/carts", CartController.getCarts);
router.get("/carts/:id", CartController.getCart);
router.post(
  "/carts",
  authenticateToken,
  createCartValidation,
  CartController.createCart
);
router.patch(
  "/carts/:id",
  authenticateToken,
  updateCartValidation,
  CartController.updateCart
);
router.delete("/carts/:id", authenticateToken, CartController.deleteCart);

export default router;
