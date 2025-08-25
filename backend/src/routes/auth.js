import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db.js";

const router = Router();

export function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

router.get("/ping", (_req, res) => res.json({ auth: "ok" }));

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.json({ success: true, message: "✅ User stored successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "❌ Failed to store user" });
  }
});
export default router;
