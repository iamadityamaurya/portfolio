import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, reducedMotion, scrollToTarget } from '../lib/scroll';
import { BackgroundCubesGrid } from '../components/ui/background-cubes-grid';

const lines = [
    { text: 'Aditya', className: 'text-paper' },
    { text: 'Kumar', className: 'text-paper' },
    { text: 'Maurya', className: 'text-accent' },
];

const HomePage = ({ ready }) => {
    const rootRef = useRef(null);

    // Name lines rise out of their masks once the preloader has lifted.
    useLayoutEffect(() => {
        if (reducedMotion()) return;
        const ctx = gsap.context(() => {
            gsap.set('[data-rise]', { yPercent: 110 });
            gsap.set('[data-fade]', { opacity: 0, y: 14 });
            if (!ready) return;
            gsap.timeline()
                .to('[data-rise]', { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 })
                .to('[data-fade]', { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1 }, '-=0.6');
        }, rootRef);
        return () => ctx.revert();
    }, [ready]);

    return (
        <section ref={rootRef} id="home" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#0a0a0c]">
            {/* 3D Perspective Cubes Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
                <BackgroundCubesGrid
                    variant="perspective"
                    baseColor="#161822"
                    waveColor="#2b4bff"
                    backgroundColor="#0a0a0c"
                    glow={1.1}
                    amplitude={0.65}
                    tilt={0.6}
                    gridSize={48}
                    gap={0.07}
                />
            </div>

            {/* Radial vignette overlay to keep text ultra-readable */}
            <div
                className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,12,0.4)_50%,rgba(10,10,12,0.92)_100%)]"
                aria-hidden="true"
            />

            {/* Subtle grain texture overlay */}
            <div
                className="pointer-events-none absolute inset-0 z-[3] opacity-[0.08] mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }}
                aria-hidden="true"
            />

            <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-20 sm:px-8 sm:pb-28">
                {/* Live Availability Status Badge */}
                

                <h1 className="display text-[clamp(2.7rem,13vw,14rem)] drop-shadow-2xl" aria-label="Aditya Kumar Maurya">
                    {lines.map((line) => (
                        <span key={line.text} className="mask pb-[0.04em]">
                            <span data-rise className={line.className}>{line.text}</span>
                        </span>
                    ))}
                </h1>
                <p data-fade className="label mt-4 sm:mt-8 text-paper/90 text-xs sm:text-sm tracking-widest drop-shadow-md">
                    Full Stack &amp; Android Developer
                </p>
            </div>

           

            {/* Magnetic CTA button - visible on all viewports */}
            <button
                data-fade
                onClick={() => {
                    scrollToTarget('#projects');
                }}
                className="group label absolute bottom-5 right-4 sm:bottom-8 sm:right-28 lg:right-48 z-10 flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-sm text-paper transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-lg text-[11px] sm:text-xs"
            >
                <span>View work</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </section>
    );
};

export default HomePage;
