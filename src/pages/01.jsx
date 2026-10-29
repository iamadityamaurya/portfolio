import { useLayoutEffect, useRef } from 'react';
import Donut from '../components/Donut';
import { gsap, reducedMotion, scrollToTarget } from '../lib/scroll';
import { sfx } from '../lib/audio';

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
        <section ref={rootRef} id="home" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink">
            <div className="absolute inset-0 z-0">
                <Donut />
            </div>
            <div
                className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12] mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }}
                aria-hidden="true"
            />

            <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-24 sm:px-8 sm:pb-28">
                {/* Live Availability Status Badge */}
                <div data-fade className="mb-4 sm:mb-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 font-mono text-[11px] text-emerald-400 backdrop-blur-sm shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Open to full-stack, mobile &amp; IoT opportunities
                    </span>
                </div>

                <h1 className="display text-[clamp(3.4rem,15vw,14rem)]" aria-label="Aditya Kumar Maurya">
                    {lines.map((line) => (
                        <span key={line.text} className="mask pb-[0.04em]">
                            <span data-rise className={line.className}>{line.text}</span>
                        </span>
                    ))}
                </h1>
                <p data-fade className="label mt-6 text-paper/80 sm:mt-8">
                    Full Stack &amp; Android Developer
                </p>
            </div>

            {/* Bottom scroll down indicator */}
            <div data-fade className="absolute bottom-6 left-4 z-10 hidden sm:flex items-center gap-2.5 text-paper/40 font-mono text-[10px] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2b4bff] shadow-[0_0_6px_#2b4bff] animate-bounce" />
                Scroll to explore
            </div>

            {/* Magnetic CTA button */}
            <button
                data-fade
                onClick={() => {
                    sfx();
                    scrollToTarget('#projects');
                }}
                className="group label absolute bottom-6 right-4 z-10 flex items-center gap-3 rounded-full border border-paper/15 bg-paper/5 px-5 py-2.5 backdrop-blur-sm text-paper transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent hover:scale-[1.03] active:scale-[0.98] sm:bottom-8 sm:right-8 cursor-pointer shadow-lg"
            >
                View work <span aria-hidden="true" className="tracking-[-0.1em] transition-transform duration-300 group-hover:translate-x-1.5">——→</span>
            </button>
        </section>
    );
};

export default HomePage;
