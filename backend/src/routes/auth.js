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

    // ✅ hash password before saving
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );

    res.json({ success: true, message: "✅ User stored successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "❌ Failed to store user" });
  }
});



// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.status(400).json({ success: false, message: "❌ User not found" });
    }

    // compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ success: false, message: "❌ Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "1h" }
    );

    // set cookie
    res.cookie("token", token, { httpOnly: true });

    res.json({ success: true, message: "✅ Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "❌ Login failed" });
  }
});


export default router;







