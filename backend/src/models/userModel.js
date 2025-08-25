import db from "../db.js";

export function findUserByEmail(email) {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(email);
}

export function findUserById(id) {
  const stmt = db.prepare("SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?");
  return stmt.get(id);
}

export function createUser({ name, email, password_hash }) {
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash)
    VALUES (?, ?, ?)
  `);
  const info = stmt.run(name, email, password_hash);
  return findUserById(info.lastInsertRowid);
}
