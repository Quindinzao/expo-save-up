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
            `SELECT * FROM expenses
       WHERE date = ?
       ORDER BY created_at DESC`,
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
};