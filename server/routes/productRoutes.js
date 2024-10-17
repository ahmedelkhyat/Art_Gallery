import express from "express";
import ProductController from "../controllers/ProductController.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../middlewares/productValidator.js";

const router = express.Router();

router.get("/products", ProductController.getProducts);
router.get("/products/:id", ProductController.getProduct);
router.post(
  "/products",
  createProductValidation,
  ProductController.createProduct
);
router.patch(
  "/products/:id",
  updateProductValidation,
  ProductController.updateProduct
);
router.delete("/products/:id", ProductController.deleteProduct);

export default router;
