import bcrypt from "bcrypt";
import { Request, Response } from "express";
import db from "../db/connection"; 

export const signup = async (req: Request, res: Response) => {
  const { username, password, email, role } = req.body;

  // Validate input
  if (!username || !password || !email || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (!['user', 'staff'].includes(role)) {
    return res.status(400).json({ message: "Invalid role." });
  }

  try {
    // Check for existing user
    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const result = await db.query(
      "INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, hashedPassword, email, role]
    );

    res.status(201).json({ message: "User created successfully!", user: result.rows[0] });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Server error." });
  }
};
