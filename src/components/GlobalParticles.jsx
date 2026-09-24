import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particlesOptions } from '../config/particlesConfig';

const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const GlobalParticles = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        // Disable heavy particle effects on small screens to improve performance
        if (typeof window !== 'undefined' && window.innerWidth < 640) {
            // Don't initialize the engine on phones
            setInit(false);
            return;
        }

        // Disable particle motion for users who prefer reduced motion
        if (prefersReducedMotion()) {
            setInit(false);
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        }).catch(() => {
            setInit(false);
        });
    }, []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles-global"
            options={particlesOptions}
            className="fixed inset-0 z-0 bg-[#05070d] pointer-events-none"
        />
    );

};

export default GlobalParticles;
