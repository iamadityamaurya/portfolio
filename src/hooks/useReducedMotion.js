import { useEffect, useState } from 'react';

export const useReducedMotion = () => {
    const [reduced, setReduced] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = (e) => setReduced(e.matches);

        // Modern API
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Legacy fallback
            mediaQuery.addListener(handleChange);
        }

        setReduced(mediaQuery.matches);

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return reduced;
};
