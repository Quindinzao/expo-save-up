import { db } from "../db";
import { createBaseRepository } from "./baseRepository";

const base = createBaseRepository("categories", db);

export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    type: "incoming" | "outgoing";
}

export const categoriesRepository = {
    ...base,

    getAll: (): Category[] => {
        return db.getAllSync(`SELECT * FROM categories`) as Category[];
    },

    getByType: (type: "incoming" | "outgoing"): Category[] => {
        return db.getAllSync(`SELECT * FROM categories WHERE type = ?`, [type]) as Category[];
    },

    insert: (category: Category) => {
        db.runSync(
            `INSERT INTO categories (id, name, icon, color, type, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [
                category.id,
                category.name,
                category.icon,
                category.color,
                category.type,
                new Date().toISOString(),
            ]
        );
    },

    update: (category: Category) => {
        db.runSync(
            `UPDATE categories
       SET name = ?, icon = ?, color = ?, type = ?
       WHERE id = ?`,
            [
                category.name,
                category.icon,
                category.color,
                category.type,
                category.id,
            ]
        );
    },
};