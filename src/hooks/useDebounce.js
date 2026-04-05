import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer); // очистка таймера при каждом изменении value
    }, [value, delay]);

    return debounced;
}
