import { validationResult } from "express-validator";
import UserModel from "../models/UserModel.js";

class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    const id = req.params.id;
    try {
      const user = await UserModel.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      return res.status(400).json({ message: messages });
    }

    const { name, email, password } = req.body;
    try {
      const user = await UserModel.createNewUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");
      return res.status(400).json({ message: messages });
    }

    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
      const user = await UserModel.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await UserModel.updateExistingUser(
        id,
        name,
        email,
        password
      );
      if (!updatedUser) {
        return res.status(400).json({ message: "No fields to update" });
      }
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const id = req.params.id;
    try {
      const user = await UserModel.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const result = await UserModel.deleteExistingUser(id);
      if (!result) {
        return res.status(500).json({ message: "Failed to delete user" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
