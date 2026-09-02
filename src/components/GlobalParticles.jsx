import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { particlesOptions } from '../config/particlesConfig';

const GlobalParticles = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        // Disable heavy particle effects on small screens to improve performance
        if (typeof window !== 'undefined' && window.innerWidth < 640) {
            // Don't initialize the engine on phones
            setInit(false);
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadFull(engine);
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
