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

// (optional) GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  const user = await db.get(
    `SELECT id, name, email, created_at, phone, address1, city, state
     FROM users WHERE id = ?`,
    req.user.id
  );
  res.json(user);
});

// POST /api/auth/signup  (alias /register)
router.post(["/signup", "/register"], async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email, password required" });
    }
    const existing = await db.get(`SELECT id FROM users WHERE email = ?`, email);
    if (existing) return res.status(409).json({ error: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const result = await db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, hash]
    );

    const payload = { id: result.lastID, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // keep false on localhost
      maxAge: 7 * 24 * 3600 * 1000,
    });
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Signup failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await db.get(`SELECT * FROM users WHERE email = ?`, email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 3600 * 1000,
    });
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Login failed" });
  }
});

// POST /api/auth/logout
router.post("/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

export default router;
