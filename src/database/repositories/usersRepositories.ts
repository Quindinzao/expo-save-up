import { db } from "../db";
import { createBaseRepository } from "./baseRepository";

interface User {
    id: string;
    name: string;
    profession: string;
}

const base = createBaseRepository("users", db);

export const usersRepository = {
    ...base,

    insert: (user: User) => {
        db.runSync(
            `INSERT INTO users (id, name, profession)
       VALUES (?, ?, ?)`,
            [
                user.id,
                user.name,
                user.profession,
            ]
        );
    },

    update: (user: User) => {
        db.runSync(
            `UPDATE users
       SET name = ?, profession = ?
       WHERE id = ?`,
            [
                user.name,
                user.profession,
                user.id,
            ]
        );
    },
};