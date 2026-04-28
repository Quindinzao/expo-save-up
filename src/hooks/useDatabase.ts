import { useEffect, useState } from "react";

export function useDatabase<T>(fetcher: () => T[]) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);

    function load() {
        setLoading(true);
        const result = fetcher();
        setData(result);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    return {
        data,
        loading,
        reload: load,
    };
}