import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";            // <-- add
import dotenv from "dotenv";
import authRouter, { requireAuth } from "./routes/auth.js"; // <-- add



dotenv.config();
const app = express();
// ✅ Allow frontend (React) to call backend
app.use(cors({
  origin: "http://localhost:3000",   // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));backend

app.use(express.json());
app.use(cookieParser());           // <-- add


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.use("/api/auth", authRouter);  // <-- mount

// Example protected endpoint
app.get("/api/profile", requireAuth, (req, res) => {
  res.json({ hello: `user ${req.user.id}` });
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
