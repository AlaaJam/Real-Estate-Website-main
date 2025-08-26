import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use .env if present, else default
const DB_FILE = process.env.SQLITE_DB || path.join(__dirname, "../data/db.db");

export const db = await open({
  filename: DB_FILE,
  driver: sqlite3.Database,
});

await db.exec("PRAGMA busy_timeout = 5000");

// Ensure users table exists (base columns)
await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

//  Safely add profile columns if they don't exist
export async function ensureUserProfileColumns() {
  const cols = await db.all(`PRAGMA table_info(users);`);
  const have = new Set(cols.map(c => c.name));

  const addIfMissing = async (name, type) => {
    if (!have.has(name)) {
      await db.exec(`ALTER TABLE users ADD COLUMN ${name} ${type};`);
    }
  };

  await addIfMissing("phone", "TEXT");
  await addIfMissing("address1", "TEXT");
  await addIfMissing("city", "TEXT");
  await addIfMissing("state", "TEXT");
}
