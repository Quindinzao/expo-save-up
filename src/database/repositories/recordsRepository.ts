import { db } from "../db";
import { createBaseRepository } from "./baseRepository";

const base = createBaseRepository("records", db);

export interface TransactionRecord {
    id: string;
    user_id: string;
    category_id: string;
    date: string;
    name: string;
    description: string;
    amount: number;
    type: "incoming" | "outgoing";
    repeat?: "monthly" | "yearly" | "daily" | null;
    repeat_until?: string | null;
    created_at: string;
    edited_at: string;
}

export const recordsRepository = {
    ...base,

    insert: (record: TransactionRecord) => {
        db.runSync(
            `INSERT INTO records (
        id,
        user_id,
        category_id,
        date,
        name,
        description,
        amount,
        type,
        repeat,
        repeat_until,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                record.id,
                record.user_id,
                record.category_id,
                record.date,
                record.name,
                record.description,
                record.amount,
                record.type,
                record.repeat || null,
                record.repeat_until || null,
                new Date().toISOString(),
            ]
        );
    },

    update: (record: TransactionRecord) => {
        db.runSync(
            `UPDATE records SET
        category_id = ?,
        date = ?,
        name = ?,
        description = ?,
        amount = ?,
        type = ?,
        repeat = ?,
        repeat_until = ?,
        edited_at = ?
       WHERE id = ?`,
            [
                record.category_id,
                record.date,
                record.name,
                record.description,
                record.amount,
                record.type,
                record.repeat || null,
                record.repeat_until || null,
                new Date().toISOString(),
                record.id,
            ]
        );
    },

    getByDate: (date: string) => {
        return db.getAllSync(
            `SELECT r.*, c.name as category_name, c.icon as category_icon, c.color as category_color
       FROM records r
       LEFT JOIN categories c ON r.category_id = c.id
       WHERE r.date = ?
          OR (r.repeat = 'daily' AND r.date <= ? AND (r.repeat_until IS NULL OR r.repeat_until >= ?))
          OR (r.repeat = 'monthly' AND strftime('%d', r.date) = strftime('%d', ?) AND r.date <= ? AND (r.repeat_until IS NULL OR r.repeat_until >= ?))
          OR (r.repeat = 'yearly' AND strftime('%m-%d', r.date) = strftime('%m-%d', ?) AND r.date <= ? AND (r.repeat_until IS NULL OR r.repeat_until >= ?))
       ORDER BY r.created_at DESC`,
            [date, date, date, date, date, date, date, date, date]
        );
    },

    getByUser: (userId: string) => {
        return db.getAllSync(
            `SELECT * FROM records
       WHERE user_id = ?
       ORDER BY date DESC`,
            [userId]
        );
    },

    getTotalByDate: (date: string, type?: "incoming" | "outgoing") => {
        let query = `SELECT SUM(amount) as total FROM records WHERE (date = ?
          OR (repeat = 'daily' AND date <= ? AND (repeat_until IS NULL OR repeat_until >= ?))
          OR (repeat = 'monthly' AND strftime('%d', date) = strftime('%d', ?) AND date <= ? AND (repeat_until IS NULL OR repeat_until >= ?))
          OR (repeat = 'yearly' AND strftime('%m-%d', date) = strftime('%m-%d', ?) AND date <= ? AND (repeat_until IS NULL OR repeat_until >= ?)))`;

        const params: any[] = [date, date, date, date, date, date, date, date, date];

        if (type) {
            query += " AND type = ?";
            params.push(type);
        }

        const result = db.getFirstSync<{ total: number }>(query, params);
        return result?.total ?? 0;
    },

    getTotalsByMonth: (month: string): { income: number; outcome: number } => {
        // month format: "2026-04"
        const records = db.getAllSync<TransactionRecord>(
            `SELECT * FROM records WHERE date <= ? || '-31'`,
            [month]
        );

        let income = 0;
        let outcome = 0;
        const [targetYear, targetMonth] = month.split("-").map(Number);
        const lastDay = new Date(targetYear, targetMonth, 0).getDate();
        const endOfMonth = `${month}-${String(lastDay).padStart(2, "0")}`;

        for (const r of records) {
            const [rYear, rMonth, rDay] = r.date.split("-").map(Number);
            let occurrences = 0;

            if (!r.repeat) {
                if (r.date.startsWith(month)) occurrences = 1;
            } else if (r.repeat === "monthly") {
                const occurrence = `${month}-${String(rDay).padStart(2, "0")}`;
                if (r.date <= occurrence && occurrence <= endOfMonth && (!r.repeat_until || r.repeat_until >= occurrence)) {
                    occurrences = 1;
                }
            } else if (r.repeat === "yearly") {
                const occurrence = `${month}-${String(rDay).padStart(2, "0")}`;
                if (r.date <= occurrence && rMonth === targetMonth && occurrence <= endOfMonth && (!r.repeat_until || r.repeat_until >= occurrence)) {
                    occurrences = 1;
                }
            } else if (r.repeat === "daily") {
                if (r.date <= endOfMonth && (!r.repeat_until || r.repeat_until >= `${month}-01`)) {
                    const startDay = r.date.startsWith(month) ? rDay : 1;
                    const endDay = r.repeat_until && r.repeat_until.startsWith(month) ? Number(r.repeat_until.split('-')[2]) : lastDay;
                    occurrences = Math.max(0, Math.min(lastDay, endDay) - startDay + 1);
                }
            }

            if (r.type === "incoming") {
                income += r.amount * occurrences;
            } else {
                outcome += r.amount * occurrences;
            }
        }

        return { income, outcome };
    },

    getDaysByMonth: (month: string): { date: string; totalIncome: number; totalOutcome: number }[] => {
        const records = db.getAllSync<TransactionRecord>(
            `SELECT * FROM records WHERE date <= ? || '-31'`,
            [month]
        );

        const [targetYear, targetMonth] = month.split("-").map(Number);
        const lastDay = new Date(targetYear, targetMonth, 0).getDate();
        const dayTotals: { [key: string]: { income: number; outcome: number } } = {};

        for (let d = 1; d <= lastDay; d++) {
            const dateStr = `${month}-${String(d).padStart(2, "0")}`;

            for (const r of records) {
                const [rYear, rMonth, rDay] = r.date.split("-").map(Number);
                let isMatch = false;

                if (!r.repeat) {
                    if (r.date === dateStr) isMatch = true;
                } else if (r.repeat === "monthly") {
                    if (r.date <= dateStr && rDay === d && (!r.repeat_until || r.repeat_until >= dateStr)) isMatch = true;
                } else if (r.repeat === "yearly") {
                    if (r.date <= dateStr && rMonth === targetMonth && rDay === d && (!r.repeat_until || r.repeat_until >= dateStr)) isMatch = true;
                } else if (r.repeat === "daily") {
                    if (r.date <= dateStr && (!r.repeat_until || r.repeat_until >= dateStr)) isMatch = true;
                }

                if (isMatch) {
                    if (!dayTotals[dateStr]) dayTotals[dateStr] = { income: 0, outcome: 0 };
                    if (r.type === "incoming") {
                        dayTotals[dateStr].income += r.amount;
                    } else {
                        dayTotals[dateStr].outcome += r.amount;
                    }
                }
            }
        }

        return Object.entries(dayTotals)
            .map(([date, totals]) => ({ date, totalIncome: totals.income, totalOutcome: totals.outcome }))
            .sort((a, b) => b.date.localeCompare(a.date));
    },

    getYearlyTotalsGroupedByMonth: (year: string): { month: string; income: number; outcome: number }[] => {
        const results: { month: string; income: number; outcome: number }[] = [];
        for (let m = 1; m <= 12; m++) {
            const monthStr = `${year}-${String(m).padStart(2, "0")}`;
            const totals = recordsRepository.getTotalsByMonth(monthStr);
            results.push({
                month: monthStr,
                income: totals.income,
                outcome: totals.outcome,
            });
        }
        return results;
    },

    getFirstRecordDate: (): string | null => {
        const result = db.getFirstSync<{ date: string }>(
            `SELECT MIN(date) as date FROM records`
        );
        return result?.date ?? null;
    },

    getRecordsByMonthWithCategories: (month: string) => {
        const records = db.getAllSync<any>(
            `SELECT r.*, c.name as category_name, c.icon as category_icon, c.color as category_color
             FROM records r
             LEFT JOIN categories c ON r.category_id = c.id
             WHERE r.date <= ? || '-31'`,
            [month]
        );

        const [targetYear, targetMonth] = month.split("-").map(Number);
        const lastDay = new Date(targetYear, targetMonth, 0).getDate();
        const endOfMonth = `${month}-${String(lastDay).padStart(2, "0")}`;

        const monthRecords: any[] = [];

        for (const r of records) {
            const [rYear, rMonth, rDay] = r.date.split("-").map(Number);
            let occurrences = 0;

            if (!r.repeat) {
                if (r.date.startsWith(month)) occurrences = 1;
            } else if (r.repeat === "monthly") {
                const occurrence = `${month}-${String(rDay).padStart(2, "0")}`;
                if (r.date <= occurrence && occurrence <= endOfMonth && (!r.repeat_until || r.repeat_until >= occurrence)) {
                    occurrences = 1;
                }
            } else if (r.repeat === "yearly") {
                const occurrence = `${month}-${String(rDay).padStart(2, "0")}`;
                if (r.date <= occurrence && rMonth === targetMonth && occurrence <= endOfMonth && (!r.repeat_until || r.repeat_until >= occurrence)) {
                    occurrences = 1;
                }
            } else if (r.repeat === "daily") {
                if (r.date <= endOfMonth && (!r.repeat_until || r.repeat_until >= `${month}-01`)) {
                    const startDay = r.date.startsWith(month) ? rDay : 1;
                    const endDay = r.repeat_until && r.repeat_until.startsWith(month) ? Number(r.repeat_until.split('-')[2]) : lastDay;
                    occurrences = Math.max(0, Math.min(lastDay, endDay) - startDay + 1);
                }
            }

            if (occurrences > 0) {
                monthRecords.push({
                    ...r,
                    total_amount: r.amount * occurrences,
                    occurrences
                });
            }
        }

        return monthRecords;
    }
};
