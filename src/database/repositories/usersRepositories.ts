import { db } from "../db";
import { createBaseRepository } from "./baseRepository";

interface User {
    id: string;
    name: string;
    profession: string;
    salary: number;
}

const base = createBaseRepository("users", db);

export const usersRepository = {
    ...base,

    insert: (user: User) => {
        db.runSync(
            `INSERT INTO users (id, name, profession, salary)
       VALUES (?, ?, ?, ?)`,
            [
                user.id,
                user.name,
                user.profession,
                user.salary,
            ]
        );
    },

    update: (user: User) => {
        db.runSync(
            `UPDATE users
       SET name = ?, profession = ?, salary = ?
       WHERE id = ?`,
            [
                user.name,
                user.profession,
                user.salary,
                user.id,
            ]
        );
    },
};