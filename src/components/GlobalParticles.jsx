import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { particlesOptions } from '../config/particlesConfig';

const GlobalParticles = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) return null;

    return (
        <Particles
            id="tsparticles-global"
            options={particlesOptions}
            className="fixed inset-0 z-0 bg-[#050202] pointer-events-none"
        />
    );
};

export default GlobalParticles;
