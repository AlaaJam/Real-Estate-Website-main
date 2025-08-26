import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter, { requireAuth } from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import { ensureUserProfileColumns } from "./db.js";

dotenv.config();

const app = express();

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:3000"; // your React dev server

app.use(cors({
  origin: CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],//Cross-Origin Resource Sharing (CORS).
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Mount routers
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// Simple protected test
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/protected-ping", requireAuth, (req, res) =>
  res.json({ pong: true, user: req.user })
);

const PORT = Number(process.env.PORT) || 7542;

(async () => {
  await ensureUserProfileColumns();
  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT} (CORS ${CLIENT_URL})`)
  );
})();
