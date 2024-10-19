import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/categoryValidator.js";

const router = express.Router();

router.get("/categories", CategoryController.getCategories);
router.get("/categories/:id", CategoryController.getCategory);
router.post(
  "/categories",
  authenticateToken,
  createCategoryValidation,
  CategoryController.createCategory
);
router.patch(
  "/categories/:id",
  authenticateToken,
  updateCategoryValidation,
  CategoryController.updateCategory
);
router.delete(
  "/categories/:id",
  authenticateToken,
  CategoryController.deleteCategory
);

export default router;
