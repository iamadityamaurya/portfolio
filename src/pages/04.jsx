import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger, lenis, reducedMotion } from '../lib/scroll';
import { sfx } from '../lib/audio';

import motiaLogo from '../assets/motia-logo.svg';
import onshapeLogo from '../assets/onshape.svg';

const rawCategories = [
    {
        number: '01',
        name: 'Frameworks',
        description: 'Frontend architectures, modern view libraries & mobile runtimes',
        technologies: [
            { name: 'React', role: 'Library', summary: 'Component-driven UI & hooks', level: 'Expert', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
            { name: 'Next.js', role: 'Framework', summary: 'App router, SSR & server actions', level: 'Advanced', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
            { name: 'TypeScript', role: 'Language', summary: 'Type-safe interfaces & strict types', level: 'Advanced', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
            { name: 'JavaScript', role: 'Core', summary: 'Modern ES2024+ asynchronous runtime', level: 'Expert', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
            { name: 'Tailwind CSS', role: 'Styling', summary: 'Utility design tokens & fluid layouts', level: 'Advanced', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
            { name: 'Expo', role: 'Mobile', summary: 'Universal iOS & Android builds', level: 'Proficient', icon: 'https://cdn.simpleicons.org/expo/white' },
        ],
    },
    {
        number: '02',
        name: 'Backend',
        description: 'Distributed services, micro-APIs, serverless & extensions',
        technologies: [
            { name: 'Node.js', role: 'Runtime', summary: 'Event-driven backend architecture', level: 'Advanced', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
            { name: 'Express', role: 'Framework', summary: 'REST endpoints, routing & middleware', level: 'Advanced', icon: 'https://cdn.simpleicons.org/express/white' },
            { name: 'Motia Framework', role: 'Tooling', summary: 'Workflow pipelines & event handlers', level: 'Proficient', icon: motiaLogo },
            { name: 'Vercel Serverless', role: 'Cloud', summary: 'Edge compute & globally cached APIs', level: 'Advanced', icon: 'https://cdn.simpleicons.org/vercel/white' },
            { name: 'Chrome Extensions', role: 'Browser', summary: 'Content scripts, popups & background', level: 'Advanced', icon: 'https://cdn.simpleicons.org/googlechrome/4285F4' },
            { name: 'Manifest V3', role: 'Standard', summary: 'Declarative net rules & workers', level: 'Advanced', icon: 'https://cdn.simpleicons.org/chromewebstore/white' },
        ],
    },
    {
        number: '03',
        name: 'Databases',
        description: 'Relational schemas, document storage & realtime platforms',
        technologies: [
            { name: 'MongoDB', role: 'NoSQL', summary: 'Schema-free document clustering', level: 'Advanced', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
            { name: 'PostgreSQL', role: 'SQL', summary: 'ACID transactions, views & indexing', level: 'Advanced', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
            { name: 'Supabase', role: 'BaaS', summary: 'Postgres auth, storage & RPC functions', level: 'Proficient', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
            { name: 'Firebase', role: 'Cloud', summary: 'Realtime store & cloud sync', level: 'Proficient', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
        ],
    },
    {
        number: '04',
        name: 'Cloud & DevOps',
        description: 'Containerization, CI/CD pipelines & production infrastructure',
        technologies: [
            { name: 'Docker', role: 'Containers', summary: 'Multi-stage builds & containerization', level: 'Proficient', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
            { name: 'Git', role: 'VCS', summary: 'Trunk development & rebase workflows', level: 'Advanced', icon: 'https://cdn.simpleicons.org/git/F05032' },
            { name: 'Vercel', role: 'Deployment', summary: 'Automated CI/CD & preview branches', level: 'Advanced', icon: 'https://cdn.simpleicons.org/vercel/white' },
            { name: 'Linux', role: 'OS', summary: 'Bash scripting, systemd & SSH admin', level: 'Advanced', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
        ],
    },
    {
        number: '05',
        name: 'Embedded & Robotics',
        description: 'Microcontroller firmware, robotics middleware & parametric CAD',
        technologies: [
            { name: 'Python', role: 'Language', summary: 'Data processing, CV & automation', level: 'Advanced', icon: 'https://cdn.simpleicons.org/python/3776AB' },
            { name: 'C++', role: 'Systems', summary: 'Low-latency code & hardware interfaces', level: 'Advanced', icon: 'https://cdn.simpleicons.org/cplusplus/00599C' },
            { name: 'C', role: 'Firmware', summary: 'Bare-metal embedded registers & memory', level: 'Proficient', icon: 'https://cdn.simpleicons.org/c/A8B9CC' },
            { name: 'ROS 2', role: 'Robotics', summary: 'Pub-sub nodes, navigation & TF2 tree', level: 'Proficient', icon: 'https://cdn.simpleicons.org/ros/white' },
            { name: 'Arduino', role: 'Hardware', summary: 'Sensor telemetry & motor driver control', level: 'Advanced', icon: 'https://cdn.simpleicons.org/arduino/00979D' },
            { name: 'Onshape', role: 'CAD', summary: 'Parametric modeling & mechanical parts', level: 'Proficient', icon: onshapeLogo },
        ],
    },
    {
        number: '06',
        name: 'Beyond Coding',
        description: 'Physical fabrication, hardware prototyping & systems design',
        technologies: [
            { name: '3D Designing', role: 'CAD', summary: 'Functional enclosures & tolerance fits', level: 'Proficient', icon: onshapeLogo },
            { name: 'IoT Systems', role: 'Hardware', summary: 'ESP32, WiFi/BLE telemetry & MQTT', level: 'Advanced', icon: 'https://cdn.simpleicons.org/espressif/E7352C' },
            { name: 'Robotics & ROS 2', role: 'Robotics', summary: 'Autonomous rovers & sensor pipelines', level: 'Proficient', icon: 'https://cdn.simpleicons.org/ros/white' },
            { name: '3D Printing', role: 'Fabrication', summary: 'Rapid prototyping, slicing & testing', level: 'Proficient', icon: 'https://cdn.simpleicons.org/thingiverse/248BFB' },
        ],
    },
];

const categories = rawCategories;

const SkillsPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const rootRef = useRef(null);
    const pinStageRef = useRef(null);
    const isProgrammaticRef = useRef(false);
    const programmaticTimerRef = useRef(null);
    const activeIndexRef = useRef(0);
    const scrollTriggerRef = useRef(null);
    const inViewRef = useRef(false);

    // Keep activeIndexRef in sync
    useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    // Go to category by index, optionally scrolling the page to sync scroll
    const goToCategory = (targetIndex, shouldScroll = true) => {
        const clamped = Math.max(0, Math.min(categories.length - 1, targetIndex));
        setActiveIndex(clamped);
        activeIndexRef.current = clamped;
        sfx();

        if (shouldScroll && scrollTriggerRef.current) {
            const st = scrollTriggerRef.current;
            const totalScroll = st.end - st.start;
            const targetPos = st.start + ((clamped + 0.5) / categories.length) * totalScroll;

            isProgrammaticRef.current = true;
            if (programmaticTimerRef.current) clearTimeout(programmaticTimerRef.current);
            programmaticTimerRef.current = setTimeout(() => {
                isProgrammaticRef.current = false;
            }, 700);

            if (lenis) {
                lenis.scrollTo(targetPos, { duration: 0.7, lock: false });
            } else {
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        }
    };

    const nextCategory = () => goToCategory((activeIndexRef.current + 1) % categories.length);
    const prevCategory = () => goToCategory((activeIndexRef.current - 1 + categories.length) % categories.length);
    const togglePlay = () => setIsPlaying((prev) => !prev);

    // Hover handler: instant preview of the category
    const handleCategoryHover = (index) => {
        if (index !== activeIndexRef.current) {
            setActiveIndex(index);
            activeIndexRef.current = index;
            sfx();
        }
    };

    // Keyboard navigation (Arrow keys & Space)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!inViewRef.current) return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                nextCategory();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                prevCategory();
            } else if (e.key === ' ' && inViewRef.current) {
                e.preventDefault();
                togglePlay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Autoplay interval
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            goToCategory((activeIndexRef.current + 1) % categories.length);
        }, 3400);
        return () => clearInterval(interval);
    }, [isPlaying]);

    // GSAP ScrollTrigger & Pinning
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header lines reveal
            if (!reducedMotion()) {
                gsap.utils.toArray('[data-rise]', rootRef.current).forEach((el) => {
                    gsap.fromTo(
                        el,
                        { yPercent: 115, opacity: 0 },
                        {
                            yPercent: 0,
                            opacity: 1,
                            duration: 1,
                            ease: 'expo.out',
                            scrollTrigger: {
                                trigger: el.parentElement,
                                start: 'top 88%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                });
            }

            // Track viewport visibility
            ScrollTrigger.create({
                trigger: rootRef.current,
                start: 'top 70%',
                end: 'bottom 20%',
                onEnter: () => { inViewRef.current = true; },
                onEnterBack: () => { inViewRef.current = true; },
                onLeave: () => { inViewRef.current = false; },
                onLeaveBack: () => { inViewRef.current = false; },
            });

            // Pinned scroll-jack scrub for desktop screens
            const mm = gsap.matchMedia();
            mm.add('(min-width: 992px) and (prefers-reduced-motion: no-preference)', () => {
                const stage = pinStageRef.current;
                if (!stage) return;

                const st = ScrollTrigger.create({
                    trigger: stage,
                    pin: true,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * (categories.length - 1) * 0.75}`,
                    scrub: 0.3,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (isProgrammaticRef.current) return;
                        const progress = self.progress;
                        const targetIdx = Math.min(
                            categories.length - 1,
                            Math.max(0, Math.floor(progress * categories.length))
                        );
                        if (targetIdx !== activeIndexRef.current) {
                            activeIndexRef.current = targetIdx;
                            setActiveIndex(targetIdx);
                            sfx();
                        }
                    },
                });

                scrollTriggerRef.current = st;
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    const activeCategory = categories[activeIndex] || categories[0];

    return (
        <section
            ref={rootRef}
            id="skills"
            className="relative bg-ink text-paper"
        >
            <div
                ref={pinStageRef}
                className="min-h-screen flex flex-col justify-center px-4 py-16 sm:px-8 sm:py-20 lg:py-24"
            >
                <div className="mx-auto w-full max-w-6xl">
                    {/* ── Main Section Header ── */}
                    <header className="mb-6 flex items-end justify-between gap-6 sm:mb-8">
                        <div>
                            <div className="mask">
                                <p data-rise className="label text-paper/50">( Skills )</p>
                            </div>
                            <h2 className="display mt-2 text-[clamp(2.5rem,7vw,5.5rem)]">
                                <div className="mask pb-[0.05em]">
                                    <span data-rise className="block">Toolkit</span>
                                </div>
                            </h2>
                        </div>
                    </header>

                    {/* ── Index / Explorer Sub-header ── */}
                    <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-white/40 tracking-wider">
                        <span>( INDEX )</span>
                        <span className="hidden sm:inline">HOVER, CLICK OR USE ↑ ↓ TO EXPLORE</span>
                    </div>

                    {/* ── 2-Column Layout: Left List & Right Bento Card ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                        
                        {/* ── Left Column: Categories List ── */}
                        <div className="lg:col-span-5 flex flex-col justify-center divide-y divide-white/10 border-t border-b border-white/10">
                            {categories.map((cat, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <div
                                        key={cat.number}
                                        onMouseEnter={() => handleCategoryHover(idx)}
                                        onClick={() => goToCategory(idx)}
                                        className="group relative flex items-center justify-between py-4 sm:py-5 cursor-pointer select-none transition-colors"
                                    >
                                        {/* Number */}
                                        <span
                                            className={`font-mono text-sm sm:text-base font-medium transition-colors duration-200 ${
                                                isActive ? 'text-[#2b4bff]' : 'text-white/30 group-hover:text-white/60'
                                            }`}
                                        >
                                            {cat.number}
                                        </span>

                                        {/* Title + Blue Dot indicator */}
                                        <div className="flex items-center gap-3 flex-1 ml-5 sm:ml-7">
                                            {isActive ? (
                                                <span className="w-2.5 h-2.5 rounded-full bg-[#2b4bff] shadow-[0_0_10px_#2b4bff] shrink-0" />
                                            ) : (
                                                <span className="w-2.5 h-2.5 rounded-full bg-transparent shrink-0" />
                                            )}
                                            <h3
                                                className={`text-xl sm:text-2xl lg:text-[1.75rem] font-bold tracking-tight transition-all duration-200 ${
                                                    isActive
                                                        ? 'text-white translate-x-0'
                                                        : 'text-white/35 group-hover:text-white/70 group-hover:translate-x-1'
                                                }`}
                                            >
                                                {cat.name}
                                            </h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── Right Column: Clean Modern Bento Showcase ── */}
                        <div className="lg:col-span-7">
                            <div className="relative rounded-[26px] border border-white/[0.12] bg-[#0d0d10] p-6 sm:p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[500px] h-[500px]">
                                
                                {/* Crisp blueprint grid pattern */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                                    style={{
                                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)',
                                        backgroundSize: '20px 20px',
                                    }}
                                />

                                {/* Minimalist corner crosshair accents */}
                                <div className="absolute top-3.5 left-4 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</div>
                                <div className="absolute top-3.5 right-4 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</div>
                                <div className="absolute bottom-3.5 left-4 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</div>
                                <div className="absolute bottom-3.5 right-4 text-white/20 font-mono text-[10px] select-none pointer-events-none">+</div>

                                {/* Subtle architectural top-light sheen */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                                {/* ── Card Top Header ── */}
                                <div className="relative z-10">
                                    <h3 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-white leading-tight">
                                        {activeCategory.name}
                                    </h3>
                                    <p className="mt-1 text-xs sm:text-sm text-white/55 font-sans max-w-xl">
                                        {activeCategory.description}
                                    </p>
                                </div>

                                {/* ── Animated 2-Column List of Technologies ── */}
                                <div className="relative z-10 my-6 sm:my-8 flex-1 flex flex-col justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeCategory.number}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                                            className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-6 sm:gap-y-7 py-2 sm:py-4"
                                        >
                                            {activeCategory.technologies.map((tech) => (
                                                <div
                                                    key={tech.name}
                                                    className="group flex items-center gap-3.5 sm:gap-4 select-none cursor-default"
                                                >
                                                    <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0">
                                                        <img
                                                            src={tech.icon}
                                                            alt={tech.name}
                                                            className="w-5 h-5 sm:w-6 sm:h-6 object-contain group-hover:scale-110 transition-transform duration-200"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <span className="text-sm sm:text-base font-medium text-white/90 group-hover:text-white transition-colors">
                                                        {tech.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* ── Card Bottom Footer Bar ── */}
                                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.06]">
                                    {/* Pagination pill segments */}
                                    <div className="flex items-center gap-1.5">
                                        {categories.map((c, i) => (
                                            <button
                                                key={c.number}
                                                onClick={() => goToCategory(i)}
                                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                                    i === activeIndex
                                                        ? 'w-7 sm:w-8 bg-[#2b4bff] shadow-[0_0_8px_rgba(43,75,255,0.6)]'
                                                        : 'w-2 bg-white/20 hover:bg-white/40'
                                                }`}
                                                aria-label={`Switch to ${c.name}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Controls: status + play/pause + prev/next */}
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[11px] tracking-widest text-white/40 uppercase select-none">
                                            {isPlaying ? 'AUTOPLAY' : 'PAUSED'}
                                        </span>
                                        <button
                                            onClick={togglePlay}
                                            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                                            aria-label={isPlaying ? 'Pause auto-cycle' : 'Start auto-cycle'}
                                        >
                                            {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
                                        </button>
                                        <button
                                            onClick={prevCategory}
                                            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                                            aria-label="Previous category"
                                        >
                                            <ArrowLeft size={13} />
                                        </button>
                                        <button
                                            onClick={nextCategory}
                                            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                                            aria-label="Next category"
                                        >
                                            <ArrowRight size={13} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsPage;

