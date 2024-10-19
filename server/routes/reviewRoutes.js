import express from "express";
import ReviewController from "../controllers/ReviewController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import {
  createReviewValidation,
  updateReviewValidation,
} from "../middlewares/reviewValidator.js";

const router = express.Router();

router.get("/reviews", ReviewController.getReviews);
router.get("/reviews/:id", ReviewController.getReview);
router.post(
  "/reviews",
  authenticateToken,
  createReviewValidation,
  ReviewController.createReview
);
router.patch(
  "/reviews/:id",
  authenticateToken,
  updateReviewValidation,
  ReviewController.updateReview
);
router.delete("/reviews/:id", authenticateToken, ReviewController.deleteReview);

export default router;
