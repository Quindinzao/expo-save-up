import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('saveup.db');

export function initDatabase() {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      profession TEXT
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT,
      color TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      category_id TEXT NOT NULL,
      date TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      amount REAL NOT NULL CHECK(amount >= 0),
      repeat TEXT, -- 'monthly', 'yearly', 'daily' or null
      repeat_until TEXT, -- date to stop repeating
      created_at TEXT NOT NULL,
      edited_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    -- Migration to add 'repeat_until' column
  `);

  try {
    db.execSync('ALTER TABLE expenses ADD COLUMN repeat_until TEXT;');
  } catch (e) {
    // Column already exists
  }

  db.execSync(`
    CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);

    CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category_id);

    INSERT OR IGNORE INTO users (id, name, profession)
    VALUES ('1', 'Usuário', '');

    INSERT OR IGNORE INTO categories (id, name, icon, color, created_at)
    VALUES ('1', 'Geral', 'cash', '#FFB700', datetime('now'));
  `);
}