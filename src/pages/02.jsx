import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap, reducedMotion, scrollToTarget } from '../lib/scroll';
import asciiCatImg from '../assets/ascii-cat-transparent.png';

const P1_TEXT =
    "I'm Aditya, a full-stack and AI software developer specializing in high-performance digital systems that not only look exceptional but feel intuitive. I bridge modern web frameworks, autonomous AI agent pipelines, and low-latency architectures to build digital products that reflect real craftsmanship.";

const P2_TEXT =
    "Every project I build is fully custom, engineered with clean abstractions rather than one size fits all templates. Whether it's an end-to-end AI automation studio, an offline-first native mobile application, or a competitive hackathon build, I approach each layer with relentless attention to precision and detail.";

const P1_WORDS = P1_TEXT.split(' ');
const P2_WORDS = P2_TEXT.split(' ');

const AboutPage = () => {
    const rootRef = useRef(null);
    const pinRef = useRef(null);

    useLayoutEffect(() => {
        if (!pinRef.current) return;

        if (reducedMotion()) {
            if (rootRef.current) {
                rootRef.current.querySelectorAll('[data-p1-word], [data-p2-word]').forEach((el) => {
                    el.style.color = '#ece9e2';
                    el.style.opacity = '1';
                });
                const p1Num = rootRef.current.querySelector('[data-p1-num]');
                const p2Num = rootRef.current.querySelector('[data-p2-num]');
                if (p1Num) { p1Num.style.color = '#ece9e2'; p1Num.style.opacity = '1'; }
                if (p2Num) { p2Num.style.color = '#ece9e2'; p2Num.style.opacity = '1'; }
                const bLeft = rootRef.current.querySelector('[data-bracket-left]');
                const bRight = rootRef.current.querySelector('[data-bracket-right]');
                if (bLeft) { bLeft.style.opacity = '1'; bLeft.style.transform = 'none'; }
                if (bRight) { bRight.style.opacity = '1'; bRight.style.transform = 'none'; }
                const catFrame = rootRef.current.querySelector('[data-cat-frame]');
                if (catFrame) { catFrame.style.opacity = '1'; catFrame.style.transform = 'none'; }
                const actionBtn = rootRef.current.querySelector('[data-action-btn]');
                if (actionBtn) { actionBtn.style.opacity = '1'; actionBtn.style.transform = 'none'; }
            }
            return;
        }

        const mm = gsap.matchMedia();
        mm.add('(min-height: 480px) and (prefers-reduced-motion: no-preference)', () => {
            const pin = pinRef.current;
            const bLeft = pin.querySelector('[data-bracket-left]');
            const bRight = pin.querySelector('[data-bracket-right]');
            const catFrame = pin.querySelector('[data-cat-frame]');
            const riseLines = pin.querySelectorAll('[data-rise-line]');
            const p1Words = pin.querySelectorAll('[data-p1-word]');
            const p2Words = pin.querySelectorAll('[data-p2-word]');
            const p1Num = pin.querySelector('[data-p1-num]');
            const p2Num = pin.querySelector('[data-p2-num]');
            const actionBtn = pin.querySelector('[data-action-btn]');

            // Pinned scroll timeline
            const tl = gsap.timeline({
                defaults: { ease: 'power1.inOut' },
                scrollTrigger: {
                    trigger: pin,
                    pin: true,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 2.2}`,
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

            // 2. Paragraph 01 Word Illumination (gray to bright white)
            const p1Start = 0.35;
            if (p1Num) {
                tl.fromTo(p1Num,
                    { color: '#71717a', opacity: 0.4 },
                    { color: '#ffffff', opacity: 1, duration: 0.15 },
                    p1Start
                );
            }

            if (p1Words.length) {
                tl.fromTo(p1Words,
                    { color: '#71717a', opacity: 0.35 },
                    {
                        color: '#ffffff',
                        opacity: 1,
                        stagger: 0.02,
                        duration: 0.12,
                        ease: 'none',
                    },
                    p1Start
                );
            }

            const p1Duration = 0.12 + (p1Words.length - 1) * 0.02;
            const p1End = p1Start + p1Duration;

            // 3. Paragraph 02 Word Illumination (gray to bright white)
            const p2Start = p1End + 0.18;
            if (p2Num) {
                tl.fromTo(p2Num,
                    { color: '#71717a', opacity: 0.4 },
                    { color: '#ffffff', opacity: 1, duration: 0.15 },
                    p2Start
                );
            }

            if (p2Words.length) {
                tl.fromTo(p2Words,
                    { color: '#71717a', opacity: 0.35 },
                    {
                        color: '#ffffff',
                        opacity: 1,
                        stagger: 0.02,
                        duration: 0.12,
                        ease: 'none',
                    },
                    p2Start
                );
            }

            const p2Duration = 0.12 + (p2Words.length - 1) * 0.02;
            const p2End = p2Start + p2Duration;

            // 4. Action button reveal
            const btnStart = p2End + 0.12;
            if (actionBtn) {
                tl.fromTo(actionBtn,
                    { y: 18, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
                    btnStart
                );
            }

            // 5. Comfortable settle hold before unpinning to the next section
            tl.to({}, { duration: 0.4 });

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
                className="relative flex min-h-[100svh] w-full flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 sm:py-20 overflow-hidden"
            >
                <div className="relative z-10 mx-auto w-full max-w-7xl">
                    {/* ── Main 2-Column Split Composition: Text on Left, Cat on Right ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

                        {/* ── Left Column: [ About me ], 2 Paragraphs & Stats ── */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6">
                            <div>
                                {/* Micro Header Tag */}
                                <div className="overflow-hidden mb-2.5">
                                    <span data-rise-line className="label text-cyan-400/90 text-xs font-mono tracking-widest uppercase flex items-center gap-2">
                                        <span className="w-2.5 h-0.5 bg-cyan-400" />
                                        Engineering &amp; Philosophy
                                    </span>
                                </div>

                                {/* Distinctive [ About me ] Marker */}
                                <h2
                                    data-bracket-heading
                                    className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-paper mb-5 sm:mb-6 overflow-visible flex items-baseline font-sans uppercase"
                                >
                                    <span
                                        data-bracket-left
                                        aria-hidden="true"
                                        className="inline-block text-[#2b4bff] mr-2 sm:mr-3 select-none"
                                    >
                                        [
                                    </span>
                                    <span>About me</span>
                                    <span
                                        data-bracket-right
                                        aria-hidden="true"
                                        className="inline-block text-[#2b4bff] ml-2 sm:mr-3 select-none"
                                    >
                                        ]
                                    </span>
                                </h2>

                                {/* Editorial narrative: mono index + scroll-scrubbed word illumination */}
                                <div
                                    data-narrative
                                    className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed font-normal"
                                >
                                    <div className="flex gap-3.5 sm:gap-4">
                                        <span
                                            aria-hidden="true"
                                            data-p1-num
                                            className="label pt-1 shrink-0 select-none text-[#71717a] transition-colors font-mono"
                                            style={{ color: '#71717a', opacity: 0.4 }}
                                        >
                                            01
                                        </span>
                                        <p className="leading-relaxed">
                                            {P1_WORDS.map((word, idx) => (
                                                <span
                                                    key={idx}
                                                    data-p1-word
                                                    className="inline-block mr-[0.28em] text-[#71717a] transition-colors duration-150 select-text"
                                                    style={{ color: '#71717a', opacity: 0.35 }}
                                                >
                                                    {word}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                    <div className="flex gap-3.5 sm:gap-4">
                                        <span
                                            aria-hidden="true"
                                            data-p2-num
                                            className="label pt-1 shrink-0 select-none text-[#71717a] transition-colors font-mono"
                                            style={{ color: '#71717a', opacity: 0.4 }}
                                        >
                                            02
                                        </span>
                                        <p className="leading-relaxed">
                                            {P2_WORDS.map((word, idx) => (
                                                <span
                                                    key={idx}
                                                    data-p2-word
                                                    className="inline-block mr-[0.28em] text-[#71717a] transition-colors duration-150 select-text"
                                                    style={{ color: '#71717a', opacity: 0.35 }}
                                                >
                                                    {word}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>

                                {/* Mini Stats Strip */}
                                <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3 border-t border-white/[0.08] pt-4 sm:pt-5">
                                    <div className="p-2.5 sm:p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                                        <span className="block font-bold text-lg sm:text-xl text-white">17+</span>
                                        <span className="font-mono text-[10px] text-paper/50 uppercase tracking-wider">Shipped Builds</span>
                                    </div>
                                    <Link
                                        to="/hackathon-winning"
                                        className="p-2.5 sm:p-3 rounded-xl border border-[#2b4bff]/30 bg-[#2b4bff]/5 hover:bg-[#2b4bff]/10 transition-all block cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="block font-bold text-lg sm:text-xl text-cyan-400">3x</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60 group-hover:text-cyan-300 transition-colors" />
                                        </div>
                                        <span className="font-mono text-[10px] text-cyan-300/70 uppercase tracking-wider group-hover:text-cyan-200 transition-colors">Hackathon Wins</span>
                                    </Link>
                                    <div className="p-2.5 sm:p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                                        <span className="block font-bold text-lg sm:text-xl text-white">&lt;0.4s</span>
                                        <span className="font-mono text-[10px] text-paper/50 uppercase tracking-wider">Voice AI Latency</span>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div data-action-btn className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={() => scrollToTarget('#contact')}
                                        className="group inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-paper hover:bg-paper/90 text-ink font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg cursor-pointer"
                                    >
                                        Get in touch
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>

                                    <Link
                                        to="/projects"
                                        className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-paper/20 hover:border-cyan-400 bg-transparent hover:bg-cyan-500/10 hover:text-cyan-300 text-paper font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg cursor-pointer"
                                    >
                                        View Projects
                                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ── Right Column: Pure Floating ASCII Cat Visual (No Box) ── */}
                        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
                            <div
                                data-cat-frame
                                className="relative flex items-center justify-center select-none"
                            >
                                <img
                                    src={asciiCatImg}
                                    alt="Aditya Kumar Maurya"
                                    className="w-[280px] sm:w-[350px] lg:w-[420px] max-w-full h-auto object-contain transition-transform duration-500 hover:scale-105 drop-shadow-[0_0_35px_rgba(43,75,255,0.45)]"
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
