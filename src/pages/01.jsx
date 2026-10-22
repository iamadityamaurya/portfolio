import { useLayoutEffect, useRef } from 'react';
import Donut from '../components/Donut';
import { gsap, reducedMotion, scrollToTarget } from '../lib/scroll';

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
            gsap.set('[data-fade]', { opacity: 0, y: 12 });
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

            <button
                data-fade
                onClick={() => scrollToTarget('#projects')}
                className="label absolute bottom-6 right-4 z-10 flex items-center gap-3 text-paper transition-colors hover:text-accent sm:bottom-8 sm:right-8 cursor-pointer"
            >
                View work <span aria-hidden="true" className="tracking-[-0.1em]">——→</span>
            </button>
        </section>
    );
};

export default HomePage;
