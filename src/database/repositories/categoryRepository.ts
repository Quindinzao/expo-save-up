import { db } from "../db";
import { createBaseRepository } from "./baseRepository";

const base = createBaseRepository("categories", db);

interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export const categoriesRepository = {
    ...base,

    getAll: (): Category[] => {
        return db.getAllSync(`SELECT * FROM categories`) as Category[];
    },

    insert: (category: Category) => {
        db.runSync(
            `INSERT INTO categories (id, name, icon, color, created_at)
       VALUES (?, ?, ?, ?, ?)`,
            [
                category.id,
                category.name,
                category.icon,
                category.color,
                new Date().toISOString(),
            ]
        );
    },

    update: (category: Category) => {
        db.runSync(
            `UPDATE categories
       SET name = ?, icon = ?, color = ?
       WHERE id = ?`,
            [
                category.name,
                category.icon,
                category.color,
                category.id,
            ]
        );
    },
};