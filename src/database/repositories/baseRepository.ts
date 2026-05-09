export function createBaseRepository(table: string, db: any) {
    return {
        table,
        db,
        getAll: () => {
            return db.getAllSync(`SELECT * FROM ${table}`);
        },

        getById: (id: string) => {
            return db.getFirstSync(
                `SELECT * FROM ${table} WHERE id = ?`,
                [id]
            );
        },

        delete: (id: string) => {
            db.runSync(
                `DELETE FROM ${table} WHERE id = ?`,
                [id]
            );
        },
    };
}