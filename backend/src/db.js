import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./data/db.db",
  driver: sqlite3.Database,
});

export { db };  // ✅ named export
