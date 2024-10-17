import { validationResult } from "express-validator";
import ProductModel from "../models/ProductModel.js";

class ProductController {
  static async getProducts(req, res, next) {
    try {
      const products = await ProductModel.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getProduct(req, res, next) {
    const { id } = req.params;
    try {
      const product = await ProductModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors
          .array()
          .map((error) => error.msg)
          .join(", "),
      });
    }

    const {
      title,
      description,
      price,
      stock = 0,
      image_url,
      category_id,
    } = req.body;

    try {
      const product = await ProductModel.createNewProduct(
        title,
        description,
        price,
        stock,
        image_url,
        category_id
      );
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    const { id } = req.params;

    try {
      const product = await ProductModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors
            .array()
            .map((error) => error.msg)
            .join(", "),
        });
      }

      const { title, description, price, stock, image_url, category_id } =
        req.body;

      const updatedProduct = await ProductModel.updateExistingProduct(
        id,
        title,
        description,
        price,
        stock,
        image_url,
        category_id
      );
      if (!updatedProduct) {
        return res.status(400).json({ message: "No fields to update" });
      }

      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    const { id } = req.params;

    try {
      const product = await ProductModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const result = await ProductModel.deleteExistingProduct(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete product" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
