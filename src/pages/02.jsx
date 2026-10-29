import { useLayoutEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, reducedMotion, scrollToTarget } from '../lib/scroll';

const LINE_1 = 'FULL-STACK & IOT';
const LINE_2 = 'DEVELOPMENT';

const P1_TEXT =
    "I'm Aditya, a full-stack developer and hardware engineer specializing in software and connected systems that not only look exceptional but feel intuitive. I bridge modern web frameworks, AI agent workflows, and low-level firmware to build digital experiences that reflect real craftsmanship.";

const P2_TEXT =
    "Every project I build is fully custom, never based on generic templates or one size fits all solutions. Whether it's an emerging startup, high-speed robotics, or an intense 36-hour hackathon, I approach every build with the same commitment to craftsmanship, precision, and attention to detail.";

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
            const chars = pin.querySelectorAll('[data-char]');
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

            // 1. Entrance: Bracket Clamping & 3D Character Rolling
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

            if (chars.length) {
                tl.fromTo(chars,
                    { transformOrigin: '50% 50%', rotateX: -90, y: 35, z: -50, opacity: 0 },
                    { rotateX: 0, y: 0, z: 0, opacity: 1, duration: 0.45, stagger: 0.015 },
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
                className="relative flex h-[100svh] min-h-[620px] w-full flex-col justify-center px-6 sm:px-12 lg:px-20 pt-20 pb-10 overflow-hidden"
            >
                <div className="relative z-10 mx-auto w-full max-w-7xl">
                    {/* ── Main 2-Column Split Composition ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

                        {/* ── Left Column: Clean Headline & Subtitle ── */}
                        <div className="lg:col-span-6 space-y-5 sm:space-y-7">
                            <div>
                                {/* Section kicker */}
                                <div className="overflow-hidden">
                                    <p
                                        data-rise-line
                                        className="label mb-4 sm:mb-6 text-paper/50"
                                    >
                                        01 — About
                                    </p>
                                </div>

                                {/* Massive Display Headline */}
                                <h2
                                    data-headline
                                    className="font-sans font-black uppercase text-[clamp(2.2rem,3.8vw,4.5rem)] leading-[0.92] tracking-tight text-paper select-none"
                                >
                                    <div className="pb-1" style={{ perspective: '600px' }}>
                                        <span className="inline-block whitespace-nowrap">
                                            {LINE_1.split('').map((ch, idx) => (
                                                <span
                                                    key={idx}
                                                    data-char
                                                    className="inline-block"
                                                    style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
                                                >
                                                    {ch === ' ' ? '\u00A0' : ch}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                    <div className="pb-1" style={{ perspective: '600px' }}>
                                        <span className="inline-block whitespace-nowrap">
                                            {LINE_2.split('').map((ch, idx) => (
                                                <span
                                                    key={idx}
                                                    data-char
                                                    className="inline-block"
                                                    style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
                                                >
                                                    {ch === ' ' ? '\u00A0' : ch}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                </h2>

                                {/* Subtitle with Masked Line Rise */}
                                <div className="overflow-hidden mt-5 sm:mt-7">
                                    <p
                                        data-rise-line
                                        className="text-sm sm:text-base lg:text-lg text-paper/70 font-normal leading-relaxed max-w-md"
                                    >
                                        Modern, custom-built software and connected hardware engineered from circuits to the cloud.
                                    </p>
                                </div>

                                {/* Context strip */}
                                <div className="overflow-hidden mt-8 sm:mt-12 hidden lg:block">
                                    <p data-rise-line className="label text-paper/40">
                                        Based in India · Building worldwide
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── Right Column: [ About me ], 2 Paragraphs & Single CTA Button ── */}
                        <div className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8 lg:pl-6">
                            <div>
                                {/* Distinctive [ About me ] Marker */}
                                <h3
                                    data-bracket-heading
                                    className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-paper mb-6 sm:mb-8 overflow-visible flex items-baseline"
                                >
                                    <span
                                        data-bracket-left
                                        aria-hidden="true"
                                        className="inline-block text-paper/40 mr-2 sm:mr-3 select-none"
                                    >
                                        [
                                    </span>
                                    <span>About me</span>
                                    <span
                                        data-bracket-right
                                        aria-hidden="true"
                                        className="inline-block text-paper/40 ml-2 sm:mr-3 select-none"
                                    >
                                        ]
                                    </span>
                                </h3>

                                {/* Editorial narrative: mono index + scroll-scrubbed word illumination */}
                                <div
                                    data-narrative
                                    className="space-y-6 sm:space-y-7 text-sm sm:text-base lg:text-lg leading-relaxed font-normal"
                                >
                                    <div className="flex gap-4 sm:gap-5">
                                        <span
                                            aria-hidden="true"
                                            data-p1-num
                                            className="label pt-1.5 shrink-0 select-none text-[#71717a] transition-colors"
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
                                    <div className="flex gap-4 sm:gap-5">
                                        <span
                                            aria-hidden="true"
                                            data-p2-num
                                            className="label pt-1.5 shrink-0 select-none text-[#71717a] transition-colors"
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

                                {/* Clean Monochrome CTA Button */}
                                {/* Mini Stats Strip */}
                                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-6">
                                    <div className="p-3 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
                                        <span className="block font-bold text-lg sm:text-xl text-white">16+</span>
                                        <span className="font-mono text-[10px] text-paper/40 uppercase tracking-wider">Builds</span>
                                    </div>
                                    <div className="p-3 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
                                        <span className="block font-bold text-lg sm:text-xl text-[#2b4bff]">1st</span>
                                        <span className="font-mono text-[10px] text-paper/40 uppercase tracking-wider">Robotics Wins</span>
                                    </div>
                                    <div className="p-3 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all">
                                        <span className="block font-bold text-lg sm:text-xl text-white">IoT</span>
                                        <span className="font-mono text-[10px] text-paper/40 uppercase tracking-wider">&amp; Firmware</span>
                                    </div>
                                </div>

                                <div className="mt-6 sm:mt-8">
                                    <button
                                        data-action-btn
                                        onClick={() => scrollToTarget('#contact')}
                                        className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3.5 rounded-full bg-paper hover:bg-paper/90 text-ink font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg cursor-pointer"
                                    >
                                        Get in touch
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutPage;
