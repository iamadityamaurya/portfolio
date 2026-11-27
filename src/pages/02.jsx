import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap, reducedMotion, scrollToTarget } from '../lib/scroll';
import asciiCatImg from '../assets/ascii-cat-transparent.png';

const BIO_TEXT =
    "I'm Aditya, a full-stack and AI software developer building autonomous agent pipelines, modern web frameworks, and low-latency systems. Every product is custom-engineered with relentless precision, high performance, and real craftsmanship.";

const BIO_WORDS = BIO_TEXT.split(' ');

const AboutPage = () => {
    const rootRef = useRef(null);
    const pinRef = useRef(null);

    useLayoutEffect(() => {
        if (!pinRef.current) return;

        const revealStaticContent = () => {
            if (rootRef.current) {
                rootRef.current.querySelectorAll('[data-bio-word]').forEach((el) => {
                    el.style.color = '#ece9e2';
                    el.style.opacity = '1';
                });
                rootRef.current.querySelectorAll('[data-rise-line]').forEach((el) => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
                const catFrame = rootRef.current.querySelector('[data-cat-frame]');
                if (catFrame) { catFrame.style.opacity = '1'; catFrame.style.transform = 'none'; }
                const actionBtn = rootRef.current.querySelector('[data-action-btn]');
                if (actionBtn) { actionBtn.style.opacity = '1'; actionBtn.style.transform = 'none'; }
            }
        };

        if (reducedMotion() || window.innerWidth < 992) {
            revealStaticContent();
            if (reducedMotion()) return;
        }

        const mm = gsap.matchMedia();
        mm.add('(min-width: 992px) and (min-height: 480px) and (prefers-reduced-motion: no-preference)', () => {
            const pin = pinRef.current;
            const bLeft = pin.querySelector('[data-bracket-left]');
            const bRight = pin.querySelector('[data-bracket-right]');
            const catFrame = pin.querySelector('[data-cat-frame]');
            const riseLines = pin.querySelectorAll('[data-rise-line]');
            const bioWords = pin.querySelectorAll('[data-bio-word]');
            const actionBtn = pin.querySelector('[data-action-btn]');

            // Pinned scroll timeline for desktop
            const tl = gsap.timeline({
                defaults: { ease: 'power1.inOut' },
                scrollTrigger: {
                    trigger: pin,
                    pin: true,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 1.5}`,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            });

            // 1. Entrance: Bracket Clamping & Cat Frame reveal
            if (bLeft && bRight) {
                tl.fromTo(bLeft,
                    { xPercent: -150, opacity: 0 },
                    { xPercent: 0, opacity: 1, duration: 0.35 },
                    0
                );
                tl.fromTo(bRight,
                    { xPercent: 150, opacity: 0 },
                    { xPercent: 0, opacity: 1, duration: 0.35 },
                    0
                );
            }

            if (catFrame) {
                tl.fromTo(catFrame,
                    { scale: 0.92, y: 20, opacity: 0 },
                    { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                    0
                );
            }

            if (riseLines.length) {
                tl.fromTo(riseLines,
                    { yPercent: 110, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
                    0.05
                );
            }

            // 2. Word Illumination (gray to bright white) in one seamless go
            const pStart = 0.35;
            if (bioWords.length) {
                tl.fromTo(bioWords,
                    { color: '#71717a', opacity: 0.35 },
                    {
                        color: '#ffffff',
                        opacity: 1,
                        stagger: 0.02,
                        duration: 0.14,
                        ease: 'none',
                    },
                    pStart
                );
            }

            const pDuration = 0.14 + (bioWords.length - 1) * 0.02;
            const pEnd = pStart + pDuration;

            // 3. Action button reveal
            const btnStart = pEnd + 0.12;
            if (actionBtn) {
                tl.fromTo(actionBtn,
                    { y: 18, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
                    btnStart
                );
            }

            // 4. Comfortable settle hold before unpinning to the next section
            tl.to({}, { duration: 0.3 });

            return () => tl.kill();
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={rootRef}
            id="about"
            className="relative bg-ink text-paper"
        >
            <div
                ref={pinRef}
                className="relative flex min-h-[100svh] w-full flex-col justify-center px-4 sm:px-12 lg:px-20 py-12 sm:py-20 overflow-hidden"
            >
                <div className="relative z-10 mx-auto w-full max-w-7xl">
                    {/* ── Main 2-Column Split Composition: Text on Left, Cat on Right ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

                        {/* ── Left Column: [ About me ], Bio narrative & Stats ── */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-6">
                            <div>
                                {/* Micro Header Tag */}
                                <div className="mask mb-2 sm:mb-3">
                                    <p data-rise-line className="label text-muted text-[11px] sm:text-xs">
                                        ( Engineering &amp; Philosophy )
                                    </p>
                                </div>

                                {/* Section Display Heading */}
                                <h2
                                    className="display mb-4 sm:mb-6 text-[clamp(2.5rem,7vw,5.5rem)] tracking-tight text-paper"
                                >
                                    <div className="mask pb-[0.05em]">
                                        <span data-rise-line className="block">About</span>
                                    </div>
                                </h2>

                                {/* Editorial narrative: single concise block in one go */}
                                <div
                                    data-narrative
                                    className="text-sm sm:text-lg lg:text-[1.18rem] leading-relaxed font-normal"
                                >
                                    <p className="leading-relaxed">
                                        {BIO_WORDS.map((word, idx) => (
                                            <span
                                                key={idx}
                                                data-bio-word
                                                className="inline-block mr-[0.28em] text-[#71717a] transition-colors duration-150 select-text"
                                                style={{ color: '#71717a', opacity: 0.35 }}
                                            >
                                                {word}
                                            </span>
                                        ))}
                                    </p>
                                </div>

                                {/* Mini Stats Strip */}
                                <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3 border-t border-white/[0.08] pt-3.5 sm:pt-5">
                                    <div className="p-2 sm:p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                                        <span className="block font-bold text-base sm:text-xl text-white">15+</span>
                                        <span className="font-mono text-[9px] sm:text-[10px] text-paper/50 uppercase tracking-wider">Shipped Builds</span>
                                    </div>
                                    <Link
                                        to="/hackathon-winning"
                                        className="p-2 sm:p-3 rounded-xl border border-[#2b4bff]/30 bg-[#2b4bff]/5 hover:bg-[#2b4bff]/10 transition-all block cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="block font-bold text-base sm:text-xl text-cyan-400">3x</span>
                                            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400/60 group-hover:text-cyan-300 transition-colors" />
                                        </div>
                                        <span className="font-mono text-[9px] sm:text-[10px] text-cyan-300/70 uppercase tracking-wider group-hover:text-cyan-200 transition-colors">Hackathon Wins</span>
                                    </Link>
                                    <Link
                                        to="/projects"
                                        state={{ projectId: 'bunkmait' }}
                                        title="1K+ Active Users on BunkMAIT"
                                        className="p-2 sm:p-3 rounded-xl border border-white/[0.06] hover:border-emerald-400/40 bg-white/[0.02] hover:bg-emerald-500/5 transition-all block cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="block font-bold text-base sm:text-xl text-white group-hover:text-emerald-400 transition-colors">1k+</span>
                                            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-paper/40 group-hover:text-emerald-400 transition-colors" />
                                        </div>
                                        <span className="font-mono text-[9px] sm:text-[10px] text-paper/50 group-hover:text-emerald-300/80 uppercase tracking-wider transition-colors">BunkMAIT Users</span>
                                    </Link>
                                </div>

                                {/* Action buttons */}
                                <div data-action-btn className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                                    <button
                                        onClick={() => scrollToTarget('#contact')}
                                        className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-paper hover:bg-paper/90 text-ink font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg cursor-pointer"
                                    >
                                        Get in touch
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>

                                    <Link
                                        to="/projects"
                                        className="group inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-paper/20 hover:border-cyan-400 bg-transparent hover:bg-cyan-500/10 hover:text-cyan-300 text-paper font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg cursor-pointer"
                                    >
                                        View Projects
                                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ── Right Column: Pure Floating ASCII Cat Visual ── */}
                        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0">
                            <div
                                data-cat-frame
                                className="relative flex items-center justify-center select-none"
                            >
                                <img
                                    src={asciiCatImg}
                                    alt="Aditya Kumar Maurya"
                                    className="w-[200px] sm:w-[300px] lg:w-[420px] max-w-full h-auto object-contain transition-transform duration-500 hover:scale-105 drop-shadow-[0_0_35px_rgba(43,75,255,0.45)]"
                                />
                            </div>

                            {/* Subtitle / context note below the cat */}
                            <div className="overflow-hidden mt-6 hidden sm:block">
                                <p data-rise-line className="label text-paper/40 text-[10px] tracking-widest uppercase">
                                    Based in India · Building worldwide
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutPage;
