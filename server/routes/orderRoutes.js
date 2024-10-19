import express from "express";
import OrderController from "../controllers/OrderController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import {
  createOrderValidation,
  updateOrderValidation,
} from "../middlewares/orderValidator.js";

const router = express.Router();

router.get("/orders", OrderController.getOrders);
router.get("/orders/:id", OrderController.getOrder);
router.post(
  "/orders",
  authenticateToken,
  createOrderValidation,
  OrderController.createOrder
);
router.patch(
  "/orders/:id",
  authenticateToken,
  updateOrderValidation,
  OrderController.updateOrder
);
router.delete("/orders/:id", authenticateToken, OrderController.deleteOrder);

export default router;
