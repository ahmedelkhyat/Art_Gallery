import bcrypt from "bcrypt";
import pool from "../config/db.js";

class UserModel {
  static async emailExists(email) {
    try {
      const [result] = await pool.query("SELECT * FROM Users WHERE email = ?", [
        email,
      ]);
      return result.length > 0;
    } catch (error) {
      throw new Error("Error checking email existence: " + error.message);
    }
  }

  static async getAllUsers() {
    try {
      const [users] = await pool.query("SELECT * FROM Users");
      return users;
    } catch (error) {
      throw new Error("Error retrieving users: " + error.message);
    }
  }

  static async getUserById(id) {
    try {
      const [user] = await pool.query("SELECT * FROM Users WHERE user_id = ?", [
        id,
      ]);
      return user[0];
    } catch (error) {
      throw new Error("Error retrieving user: " + error.message);
    }
  }

  static async createNewUser(name, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await pool.query(
        "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );
      return this.getUserById(result.insertId);
    } catch (error) {
      throw new Error("Error creating new user: " + error.message);
    }
  }

  static async updateExistingUser(id, name, email, password) {
    const updates = [];
    const values = [];

    if (name) {
      updates.push("name = ?");
      values.push(name);
    }
    if (email) {
      updates.push("email = ?");
      values.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);

    try {
      await pool.query(
        `UPDATE Users SET ${updates.join(", ")} WHERE user_id = ?`,
        values
      );
      return this.getUserById(id);
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  static async deleteExistingUser(id) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query("DELETE FROM Customer_Address WHERE user_id = ?", [
        id,
      ]);

      const [orders] = await connection.query(
        "SELECT order_id FROM Orders WHERE user_id = ?",
        [id]
      );
      if (orders.length > 0) {
        const orderIds = orders.map((order) => order.order_id);
        await connection.query(
          "DELETE FROM Order_Items WHERE order_id IN (?)",
          [orderIds]
        );
        await connection.query("DELETE FROM Orders WHERE user_id = ?", [id]);
      }

      await connection.query("DELETE FROM Cart WHERE user_id = ?", [id]);

      const [result] = await connection.query(
        "DELETE FROM Users WHERE user_id = ?",
        [id]
      );

      await connection.commit();

      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw new Error("Error deleting user: " + error.message);
    } finally {
      connection.release();
    }
  }
}

export default UserModel;
