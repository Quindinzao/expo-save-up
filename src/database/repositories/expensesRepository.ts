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
    repeat?: "monthly" | "yearly" | "daily" | null;
    repeat_until?: string | null;
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
        repeat,
        repeat_until,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                expense.id,
                expense.user_id,
                expense.category_id,
                expense.date,
                expense.name,
                expense.description,
                expense.amount,
                expense.repeat || null,
                expense.repeat_until || null,
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
        repeat = ?,
        repeat_until = ?,
        edited_at = ?
       WHERE id = ?`,
            [
                expense.category_id,
                expense.date,
                expense.name,
                expense.description,
                expense.amount,
                expense.repeat || null,
                expense.repeat_until || null,
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
          OR (e.repeat = 'daily' AND e.date <= ? AND (e.repeat_until IS NULL OR e.repeat_until >= ?))
          OR (e.repeat = 'monthly' AND strftime('%d', e.date) = strftime('%d', ?) AND e.date <= ? AND (e.repeat_until IS NULL OR e.repeat_until >= ?))
          OR (e.repeat = 'yearly' AND strftime('%m-%d', e.date) = strftime('%m-%d', ?) AND e.date <= ? AND (e.repeat_until IS NULL OR e.repeat_until >= ?))
       ORDER BY e.created_at DESC`,
            [date, date, date, date, date, date, date, date, date]
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
       WHERE date = ?
          OR (repeat = 'daily' AND date <= ? AND (repeat_until IS NULL OR repeat_until >= ?))
          OR (repeat = 'monthly' AND strftime('%d', date) = strftime('%d', ?) AND date <= ? AND (repeat_until IS NULL OR repeat_until >= ?))
          OR (repeat = 'yearly' AND strftime('%m-%d', date) = strftime('%m-%d', ?) AND date <= ? AND (repeat_until IS NULL OR repeat_until >= ?))`,
            [date, date, date, date, date, date, date, date, date]
        );

        return result?.total ?? 0;
    },

    getTotalByMonth: (month: string) => {
        // month format: "2026-04"
        const expenses = db.getAllSync<Expense>(
            `SELECT * FROM expenses WHERE date <= ? || '-31'`,
            [month]
        );

        let total = 0;
        const [targetYear, targetMonth] = month.split("-").map(Number);
        const lastDay = new Date(targetYear, targetMonth, 0).getDate();
        const endOfMonth = `${month}-${String(lastDay).padStart(2, "0")}`;

        for (const e of expenses) {
            const [eYear, eMonth, eDay] = e.date.split("-").map(Number);

            if (!e.repeat) {
                if (e.date.startsWith(month)) total += e.amount;
            } else if (e.repeat === "monthly") {
                const occurrence = `${month}-${String(eDay).padStart(2, "0")}`;
                if (e.date <= occurrence && occurrence <= endOfMonth && (!e.repeat_until || e.repeat_until >= occurrence)) {
                    total += e.amount;
                }
            } else if (e.repeat === "yearly") {
                const occurrence = `${month}-${String(eDay).padStart(2, "0")}`;
                if (e.date <= occurrence && eMonth === targetMonth && occurrence <= endOfMonth && (!e.repeat_until || e.repeat_until >= occurrence)) {
                    total += e.amount;
                }
            } else if (e.repeat === "daily") {
                if (e.date <= endOfMonth && (!e.repeat_until || e.repeat_until >= `${month}-01`)) {
                    const startDay = e.date.startsWith(month) ? eDay : 1;
                    const endDay = e.repeat_until && e.repeat_until.startsWith(month) ? Number(e.repeat_until.split('-')[2]) : lastDay;
                    const daysCount = Math.max(0, Math.min(lastDay, endDay) - startDay + 1);
                    total += e.amount * daysCount;
                }
            }
        }

        return total;
    },

    getDaysByMonth: (month: string): { date: string; total: number }[] => {
        // month format: "2026-04"
        const expenses = db.getAllSync<Expense>(
            `SELECT * FROM expenses WHERE date <= ? || '-31'`,
            [month]
        );

        const [targetYear, targetMonth] = month.split("-").map(Number);
        const lastDay = new Date(targetYear, targetMonth, 0).getDate();
        const dayTotals: Record<string, number> = {};

        for (let d = 1; d <= lastDay; d++) {
            const dateStr = `${month}-${String(d).padStart(2, "0")}`;

            for (const e of expenses) {
                const [eYear, eMonth, eDay] = e.date.split("-").map(Number);

                if (!e.repeat) {
                    if (e.date === dateStr) {
                        dayTotals[dateStr] = (dayTotals[dateStr] || 0) + e.amount;
                    }
                } else if (e.repeat === "monthly") {
                    if (e.date <= dateStr && eDay === d && (!e.repeat_until || e.repeat_until >= dateStr)) {
                        dayTotals[dateStr] = (dayTotals[dateStr] || 0) + e.amount;
                    }
                } else if (e.repeat === "yearly") {
                    if (e.date <= dateStr && eMonth === targetMonth && eDay === d && (!e.repeat_until || e.repeat_until >= dateStr)) {
                        dayTotals[dateStr] = (dayTotals[dateStr] || 0) + e.amount;
                    }
                } else if (e.repeat === "daily") {
                    if (e.date <= dateStr && (!e.repeat_until || e.repeat_until >= dateStr)) {
                        dayTotals[dateStr] = (dayTotals[dateStr] || 0) + e.amount;
                    }
                }
            }
        }

        return Object.entries(dayTotals)
            .map(([date, total]) => ({ date, total }))
            .sort((a, b) => b.date.localeCompare(a.date));
    },

    getTotalByYear: (year: string): number => {
        // year format: "2026"
        let total = 0;
        for (let m = 1; m <= 12; m++) {
            total += expensesRepository.getTotalByMonth(`${year}-${String(m).padStart(2, "0")}`);
        }
        return total;
    },

    getYearlyTotalsGroupedByMonth: (year: string): { month: string; total: number }[] => {
        const results: { month: string; total: number }[] = [];
        for (let m = 1; m <= 12; m++) {
            const monthStr = `${year}-${String(m).padStart(2, "0")}`;
            results.push({
                month: monthStr,
                total: expensesRepository.getTotalByMonth(monthStr),
            });
        }
        return results;
    },

    getFirstExpenseDate: (): string | null => {
        const result = db.getFirstSync<{ date: string }>(
            `SELECT MIN(date) as date FROM expenses`
        );
        return result?.date ?? null;
    },
};