import express from "express";
import ProductController from "../controllers/ProductController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../middlewares/productValidator.js";

const router = express.Router();

router.get("/products", ProductController.getProducts);
router.get("/products/:id", ProductController.getProduct);
router.post(
  "/products",
  authenticateToken,
  createProductValidation,
  ProductController.createProduct
);
router.patch(
  "/products/:id",
  authenticateToken,
  updateProductValidation,
  ProductController.updateProduct
);
router.delete(
  "/products/:id",
  authenticateToken,
  ProductController.deleteProduct
);

export default router;
