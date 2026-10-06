import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Briefcase, Rocket, Trophy,
    GraduationCap, MapPin,
    ArrowRight
} from 'lucide-react';
import profileImage from '../assets/755b323b46fad9c3f86784c55c858b74.jpg';

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────



const StatCard = ({ icon: Icon, value, label, colorClass, borderClass, glowClass }) => (
    <motion.div
        variants={cardVariant}
        whileHover={{ scale: 1.03, y: -3 }}
        className={`p-3 sm:p-4 rounded-2xl bg-slate-900/40 border ${borderClass} flex items-center gap-2.5 sm:gap-4 transition-all ${glowClass} cursor-default group min-w-0`}
    >
        <div className={`p-2.5 sm:p-3 rounded-xl ${colorClass} bg-opacity-10 transition-all group-hover:scale-110 shrink-0`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="min-w-0">
            <h4 className="text-lg sm:text-2xl font-extrabold text-slate-100 leading-none">{value}</h4>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1 truncate">{label}</p>
        </div>
    </motion.div>
);

const InfoBadge = ({ icon: Icon, children, color = 'text-slate-400' }) => (
    <div className={`flex items-center gap-2 text-sm ${color}`}>
        <Icon className="w-4 h-4 shrink-0" />
        <span>{children}</span>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const AboutPage = () => {
    const stats = [
        {
            icon: Trophy,
            value: '3x',
            label: 'Hackathon Winner',
            colorClass: 'bg-yellow-500/10 text-yellow-400',
            borderClass: 'border-yellow-500/20 hover:border-yellow-400/50',
            glowClass: 'hover:shadow-[0_0_20px_rgba(234,179,8,0.12)]',
        },
        {
            icon: Rocket,
            value: '10+',
            label: 'Projects Built',
            colorClass: 'bg-blue-500/10 text-blue-400',
            borderClass: 'border-blue-500/20 hover:border-blue-400/50',
            glowClass: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]',
        },
        {
            icon: Briefcase,
            value: '1.5+',
            label: 'Years of Coding',
            colorClass: 'bg-cyan-500/10 text-cyan-400',
            borderClass: 'border-cyan-500/20 hover:border-cyan-400/50',
            glowClass: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]',
        },
        {
            icon: GraduationCap,
            value: '3rd',
            label: 'Year B.Tech (ECE)',
            colorClass: 'bg-purple-500/10 text-purple-400',
            borderClass: 'border-purple-500/20 hover:border-purple-400/50',
            glowClass: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]',
        },
    ];

    return (
        <section id="about" className="min-h-screen bg-transparent text-slate-50 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">

            {/* ── Background ── */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* ── Section Header ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-12 sm:mb-20 text-center flex flex-col items-center"
                >
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mt-2 text-white tracking-tight leading-tight">
                        My Journey &amp; Expertise
                    </h2>
                    <p className="text-slate-400 mt-3 sm:mt-4 text-sm sm:text-lg max-w-xl mx-auto">
                        From circuit boards to cloud backends - I build end-to-end.
                    </p>
                </motion.div>

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* ── LEFT: Text + Stats + Hobbies ── */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-8 sm:space-y-10"
                    >
                        {/* Bio */}
                        <div className="space-y-4 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
                            <p>
                                Hey, I'm{' '}
                                <span className="text-white font-bold">Aditya Kumar Maurya</span> —
                                a passionate developer and{' '}
                                <span className="text-amber-300 font-bold">3x Hackathon Winner</span>{' '}
                                currently pursuing B.Tech in Electronics &amp; Communication Engineering.
                            </p>
                            <p>
                                I specialize in{' '}
                                <span className="text-blue-400 font-medium">Full Stack Web</span>,{' '}
                                <span className="text-sky-400 font-medium">Android App Development</span>, and{' '}
                                <span className="text-cyan-400 font-medium">Hardware &amp; IoT Engineering</span>.
                                I thrive on solving complex problems - from designing custom 3D-printed robotics and
                                ESP32-based smart home systems, to building scalable web backends.
                            </p>
                            <p>
                                I bring deep technical precision from the physical hardware all the way to the cloud,
                                making sure every layer of the stack is solid.
                            </p>
                        </div>

                        {/* Info badges */}
                        <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-2.5 pt-2">
                            <InfoBadge icon={GraduationCap} color="text-purple-400">
                                MAIT Rohini, Delhi
                            </InfoBadge>
                            
                        </div>

                        {/* Stats Grid */}
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-3.5 sm:mb-5">At a Glance</h4>
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="grid grid-cols-2 gap-2.5 sm:gap-4"
                            >
                                {stats.map((s, i) => <StatCard key={i} {...s} />)}
                            </motion.div>
                        </div>

                    </motion.div>

                    {/* ── RIGHT: Profile Image Card ── */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="relative flex flex-col items-center gap-6 w-full max-w-sm mx-auto lg:max-w-none"
                    >
                        {/* Photo */}
                        <div className="relative w-full max-w-sm sm:max-w-lg mx-auto">
                            {/* Glow ring */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/30 blur-xl opacity-60" />

                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl group">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-70 z-10" />

                                <img
                                    src={profileImage}
                                    alt="Aditya Kumar Maurya"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Caption overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20">
                                    <div className="h-px w-16 bg-gradient-to-r from-cyan-400 to-blue-400 mb-2.5 sm:mb-3 rounded-full" />
                                    <p className="text-slate-200 text-xs sm:text-sm font-medium italic leading-snug">
                                        "Building ideas into scalable digital solutions."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AboutPage;
