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
      type TEXT NOT NULL DEFAULT 'outgoing',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      category_id TEXT NOT NULL,
      date TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      amount REAL NOT NULL CHECK(amount >= 0),
      type TEXT NOT NULL DEFAULT 'outgoing',
      repeat TEXT, -- 'monthly', 'yearly', 'daily' or null
      repeat_until TEXT, -- date to stop repeating
      created_at TEXT NOT NULL,
      edited_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);

  db.execSync(`
    CREATE INDEX IF NOT EXISTS idx_records_date ON records(date);
    CREATE INDEX IF NOT EXISTS idx_records_category ON records(category_id);

    INSERT OR IGNORE INTO users (id, name, profession)
    VALUES ('1', '', '');

    INSERT OR IGNORE INTO categories (id, name, icon, color, type, created_at)
    VALUES ('1', 'Geral', 'cash', '#FFB700', 'outgoing', datetime('now'));

    INSERT OR IGNORE INTO categories (id, name, icon, color, type, created_at)
    VALUES ('2', 'Salário', 'currency-usd', '#4CAF50', 'incoming', datetime('now'));
  `);
}