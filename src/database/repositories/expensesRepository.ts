import { db } from "../db";
import { createBaseRepository } from "./baseRepository";

const base = createBaseRepository("expenses", db);

interface Expense {
    id: string;
    user_id: string;
    category_id: string;
    date: string;
    name: string;
    description: string;
    amount: number;
    created_at: string;
    edited_at: string;
}

export const expensesRepository = {
    ...base,

    insert: (expense: Expense) => {
        db.runSync(
            `INSERT INTO expenses (
        id,
        user_id,
        category_id,
        date,
        name,
        description,
        amount,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                expense.id,
                expense.user_id,
                expense.category_id,
                expense.date,
                expense.name,
                expense.description,
                expense.amount,
                new Date().toISOString(),
            ]
        );
    },

    update: (expense: Expense) => {
        db.runSync(
            `UPDATE expenses SET
        category_id = ?,
        date = ?,
        name = ?,
        description = ?,
        amount = ?,
        edited_at = ?
       WHERE id = ?`,
            [
                expense.category_id,
                expense.date,
                expense.name,
                expense.description,
                expense.amount,
                new Date().toISOString(),
                expense.id,
            ]
        );
    },

    getByDate: (date: string) => {
        return db.getAllSync(
            `SELECT e.*, c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM expenses e
       LEFT JOIN categories c ON e.category_id = c.id
       WHERE e.date = ?
       ORDER BY e.created_at DESC`,
            [date]
        );
    },

    getByUser: (userId: string) => {
        return db.getAllSync(
            `SELECT * FROM expenses
       WHERE user_id = ?
       ORDER BY date DESC`,
            [userId]
        );
    },

    getTotalByDate: (date: string) => {
        const result = db.getFirstSync<{ total: number }>(
            `SELECT SUM(amount) as total
       FROM expenses
       WHERE date = ?`,
            [date]
        );

        return result?.total ?? 0;
    },

    getTotalByMonth: (month: string) => {
        // formato: "2026-04"
        const result = db.getFirstSync<{ total: number }>(
            `SELECT SUM(amount) as total
       FROM expenses
       WHERE substr(date, 1, 7) = ?`,
            [month]
        );

        return result?.total ?? 0;
    },

    getDaysByMonth: (month: string): { date: string; total: number }[] => {
        // formato: "2026-04"
        return db.getAllSync<{ date: string; total: number }>(
            `SELECT date, SUM(amount) as total
       FROM expenses
       WHERE substr(date, 1, 7) = ?
       GROUP BY date
       ORDER BY date DESC`,
            [month]
        );
    },

    getTotalByYear: (year: string): number => {
        // formato: "2026"
        const result = db.getFirstSync<{ total: number }>(
            `SELECT SUM(amount) as total
       FROM expenses
       WHERE substr(date, 1, 4) = ?`,
            [year]
        );

        return result?.total ?? 0;
    },

    getYearlyTotalsGroupedByMonth: (year: string): { month: string; total: number }[] => {
        // formato: "2026"
        return db.getAllSync<{ month: string; total: number }>(
            `SELECT substr(date, 1, 7) as month, SUM(amount) as total
       FROM expenses
       WHERE substr(date, 1, 4) = ?
       GROUP BY month
       ORDER BY month ASC`,
            [year]
        );
    },

    getFirstExpenseDate: (): string | null => {
        const result = db.getFirstSync<{ date: string }>(
            `SELECT MIN(date) as date FROM expenses`
        );
        return result?.date ?? null;
    },
};