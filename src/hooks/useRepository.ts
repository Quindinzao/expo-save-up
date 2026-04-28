import { useEffect, useState } from "react";

type Filters = {
    where?: Record<string, any>;
    orderBy?: string;
    limit?: number;
};

type Repository<T> = {
    table: string;
    db: any;
    getAll: () => T[];
    getById: (id: string) => T | null;
    insert?: (item: T) => void;
    update?: (item: T) => void;
    delete: (id: string) => void;
};

export function useRepository<T>(
    repository: Repository<T>,
    filters?: Filters
) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);

    function buildQuery() {
        let query = `SELECT * FROM ${repository.table}`;
        const params: any[] = [];

        // WHERE dinâmico
        if (filters?.where) {
            const conditions = Object.keys(filters.where).map((key) => {
                params.push(filters.where![key]);
                return `${key} = ?`;
            });

            query += ` WHERE ${conditions.join(" AND ")}`;
        }

        // ORDER BY
        if (filters?.orderBy) {
            query += ` ORDER BY ${filters.orderBy}`;
        }

        // LIMIT
        if (filters?.limit) {
            query += ` LIMIT ${filters.limit}`;
        }

        return { query, params };
    }

    function load() {
        setLoading(true);

        if (filters) {
            const { query, params } = buildQuery();
            const result = repository.db.getAllSync(query, params);
            setData(result);
        } else {
            const result = repository.getAll();
            setData(result);
        }

        setLoading(false);
    }

    useEffect(() => {
        load();
    }, [JSON.stringify(filters)]);

    function add(item: T) {
        repository.insert?.(item);
        load();
    }

    function update(item: T) {
        repository.update?.(item);
        load();
    }

    function remove(id: string) {
        repository.delete(id);
        load();
    }

    return {
        data,
        loading,
        add,
        update,
        remove,
        reload: load,
    };
}