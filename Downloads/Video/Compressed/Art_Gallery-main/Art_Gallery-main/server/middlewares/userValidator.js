import { check } from "express-validator";
import UserModel from "../models/UserModel.js";

export const createUserValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .custom(async (email) => {
      const emailExists = await UserModel.emailExists(email);
      if (emailExists) {
        throw new Error("Email already exists");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const updateUserValidation = [
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .custom(async (email, { req }) => {
      const user = await UserModel.getUserById(req.params.id);
      if (user.email !== email) {
        const emailExists = await UserModel.emailExists(email);
        if (emailExists) {
          throw new Error("Email already exists");
        }
      }
    }),

  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
