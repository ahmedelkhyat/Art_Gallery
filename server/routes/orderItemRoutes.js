import express from "express";
import OrderItemController from "../controllers/OrderItemController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import {
  createOrderItemValidation,
  updateOrderItemValidation,
} from "../middlewares/orderItemValidator.js";

const router = express.Router();

router.get("/order-items", OrderItemController.getOrderItems);
router.get("/order-items/:id", OrderItemController.getOrderItem);
router.post(
  "/order-items",
  authenticateToken,
  createOrderItemValidation,
  OrderItemController.createOrderItem
);
router.patch(
  "/order-items/:id",
  authenticateToken,
  updateOrderItemValidation,
  OrderItemController.updateOrderItem
);
router.delete(
  "/order-items/:id",
  authenticateToken,
  OrderItemController.deleteOrderItem
);

export default router;
