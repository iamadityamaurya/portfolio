import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Sparkles, Award, Code2, Cpu, GraduationCap } from 'lucide-react';
import profileImage from '../assets/755b323b46fad9c3f86784c55c858b74.jpg';
import { scrollToTarget } from '../lib/scroll';

const EMAIL = 'adityamaurya1947@gmail.com';

// ─── Animation Variants ──────────────────────────────────────────────────────

const riseVariant = {
    hidden: { y: '100%', opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

// ─── Metric Data (Alejandro HA Minimalist Strip) ──────────────────────────────

const metrics = [
    {
        num: '01',
        tag: 'AWARDS',
        value: '3× Won',
        label: 'Hackathon Winner',
        icon: Award,
    },
    {
        num: '02',
        tag: 'BUILDS',
        value: '10+',
        label: 'Shipped Projects',
        icon: Code2,
    },
    {
        num: '03',
        tag: 'EXPERIENCE',
        value: '1.5+ Yrs',
        label: 'Hardware & Web',
        icon: Cpu,
    },
    {
        num: '04',
        tag: 'EDUCATION',
        value: 'B.Tech',
        label: 'ECE @ MAIT Delhi',
        icon: GraduationCap,
    },
];

// ─── Component ───────────────────────────────────────────────────────────────

const AboutPage = () => {
    return (
        <section
            id="about"
            className="relative min-h-screen bg-ink text-paper py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-16 overflow-hidden border-t border-paper/10"
        >
            {/* Ambient Background Grid Texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ece9e2 1px, transparent 1px), linear-gradient(to bottom, #ece9e2 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem',
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl">

                {/* ── Top Header Track (Category indicator) ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-40px' }}
                    className="mb-8 sm:mb-12 flex items-center justify-between border-b border-paper/10 pb-4"
                >
                    <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted">
                        ( 02 / ABOUT )
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        AVAILABLE FOR CONTRACTS &amp; ROLES
                    </span>
                </motion.div>

                {/* ── Main 2-Column Split Composition (alejandroha.com inspired) ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">

                    {/* ── Left Column: Display Headline, Tagline, Tags & Portrait ── */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8"
                    >
                        <div>
                            {/* Massive Display Headline */}
                            <h2 className="font-sans font-black uppercase text-[clamp(2.3rem,4.4vw,5rem)] leading-[0.92] tracking-tight text-paper">
                                <span className="block overflow-hidden pb-1">
                                    <motion.span variants={riseVariant} className="block whitespace-nowrap">
                                        FULL-STACK &amp; IOT
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden pb-1">
                                    <motion.span variants={riseVariant} className="block text-accent whitespace-nowrap">
                                        ENGINEERING
                                    </motion.span>
                                </span>
                            </h2>

                            {/* Sub-sentence */}
                            <motion.p
                                variants={fadeUp}
                                className="mt-5 sm:mt-6 text-base sm:text-lg text-paper/75 font-normal leading-relaxed max-w-lg"
                            >
                                Modern, custom-built software and connected hardware engineered from circuits to the cloud.
                            </motion.p>

                            {/* Alejandro-style Tag Pills */}
                            <motion.div
                                variants={fadeUp}
                                className="mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-paper/15 bg-paper/[0.02] text-xs font-mono text-paper/80">
                                    <Globe className="w-3.5 h-3.5 text-accent" />
                                    BASED IN DELHI, NCR • WORKING GLOBALLY
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-paper/15 bg-paper/[0.02] text-xs font-mono text-paper/80">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                    3× HACKATHON WINNER
                                </div>
                            </motion.div>
                        </div>

                        {/* Editorial Portrait Presentation */}
                        <motion.div
                            variants={fadeUp}
                            className="relative group w-full max-w-md pt-1"
                        >
                            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-paper/15 via-paper/5 to-transparent border border-paper/15 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:border-accent/40">
                                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-ink">
                                    {/* Gradient Vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent z-10 pointer-events-none" />

                                    <img
                                        src={profileImage}
                                        alt="Aditya Kumar Maurya"
                                        className="w-full h-full object-cover object-center grayscale contrast-110 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                                    />

                                    {/* Bottom Info Ribbon */}
                                    <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 z-20 flex items-center justify-between text-xs font-mono text-paper/80 pointer-events-none">
                                        <span className="flex items-center gap-1.5 bg-ink/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-paper/10 text-[11px]">
                                            [ ADITYA MAURYA ]
                                        </span>
                                        <span className="hidden sm:inline-block bg-ink/80 backdrop-blur-md px-2 py-1 rounded-md border border-paper/10 text-[10px] text-muted">
                                            28.7041° N, 77.1025° E
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right Column: [ About me ], Narrative, Action Buttons & Metrics ── */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        className="lg:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8"
                    >
                        <div>
                            {/* Distinctive Alejandro-style [ About me ] Marker */}
                            <motion.h3
                                variants={fadeUp}
                                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-paper mb-6 sm:mb-8"
                            >
                                <span className="text-accent">[</span> About me <span className="text-accent">]</span>
                            </motion.h3>

                            {/* Editorial Narrative */}
                            <motion.div
                                variants={fadeUp}
                                className="space-y-4 sm:space-y-5 text-paper/80 text-sm sm:text-base lg:text-lg leading-relaxed font-normal"
                            >
                                <p>
                                    I&apos;m Aditya, a full-stack engineer and hardware developer specializing in systems that not only look exceptional but feel intuitive and perform under heavy load. I bridge modern web frameworks, AI agent pipelines, and low-level IoT firmware to build end-to-end digital experiences.
                                </p>
                                <p>
                                    Every system I build is custom-engineered from first principles—never reliant on generic templates or superficial quick-fixes. Whether it&apos;s architecting real-time video processing pipelines, writing ESP32 robotics firmware, or competing under 36-hour hackathon clocks, I approach every build with the same commitment to craftsmanship, precision, and attention to detail.
                                </p>
                            </motion.div>

                            {/* Action Buttons (Alejandro HA pill buttons) */}
                            <motion.div
                                variants={fadeUp}
                                className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
                            >
                                {/* Primary CTA Button (Royal Blue Pill like Alejandro's GET A QUOTE) */}
                                <button
                                    onClick={() => scrollToTarget('#contact')}
                                    className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_10px_25px_-5px_rgba(43,75,255,0.4)] cursor-pointer"
                                >
                                    GET IN TOUCH
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>

                                {/* Secondary Pill Button */}
                                <Link
                                    to="/hackathon-winning"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-paper/20 hover:border-paper hover:bg-paper/5 text-paper font-mono text-xs font-medium uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                                >
                                    3× HACKATHON WINNER ↗
                                </Link>

                                {/* Direct Mail Pill */}
                                <a
                                    href={`mailto:${EMAIL}`}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-paper/20 hover:border-paper hover:bg-paper/5 text-muted hover:text-paper font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
                                >
                                    EMAIL ↗
                                </a>
                            </motion.div>
                        </div>

                        {/* ── Alejandro HA Minimalist Metrics Strip ── */}
                        <motion.div
                            variants={fadeUp}
                            className="pt-6 sm:pt-8 border-t border-paper/10 mt-4"
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-4">
                                {metrics.map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <span className="font-mono text-[10px] sm:text-[11px] text-muted tracking-widest block uppercase">
                                            {item.num} / {item.tag}
                                        </span>
                                        <div className="text-xl sm:text-2xl lg:text-3xl font-black text-paper tracking-tight">
                                            {item.value}
                                        </div>
                                        <p className="text-xs text-paper/60 truncate">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AboutPage;
