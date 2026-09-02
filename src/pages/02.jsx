import React from 'react';
import { motion } from 'framer-motion';
import {
    Box, Cpu, Sparkles, Briefcase, Rocket, Trophy,
    GraduationCap, MapPin, Bot, Radio, Layers, Music2
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

const SectionLabel = ({ children }) => (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-3">
        <span className="w-4 h-px bg-emerald-400" />
        {children}
        <span className="w-4 h-px bg-emerald-400" />
    </span>
);

const StatCard = ({ icon: Icon, value, label, colorClass, borderClass, glowClass }) => (
    <motion.div
        variants={cardVariant}
        whileHover={{ scale: 1.03, y: -3 }}
        className={`p-4 rounded-2xl bg-slate-900/40 border ${borderClass} flex items-center gap-4 transition-all ${glowClass} cursor-default group`}
    >
        <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 transition-all group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <h4 className="text-2xl font-extrabold text-slate-100 leading-none">{value}</h4>
            <p className="text-xs text-slate-400 mt-1">{label}</p>
        </div>
    </motion.div>
);

const HobbyCard = ({ icon: Icon, label, colorClass, borderClass }) => (
    <motion.div
        variants={cardVariant}
        whileHover={{ scale: 1.04, y: -3 }}
        className={`p-4 rounded-2xl bg-slate-900/40 border ${borderClass} flex items-center gap-3 transition-all cursor-default group`}
    >
        <div className={`p-2.5 rounded-lg ${colorClass} bg-opacity-10 transition-all group-hover:scale-110`}>
            <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{label}</span>
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
            colorClass: 'bg-emerald-500/10 text-emerald-400',
            borderClass: 'border-emerald-500/20 hover:border-emerald-400/50',
            glowClass: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]',
        },
        {
            icon: GraduationCap,
            value: '2nd',
            label: 'Year B.Tech (ECE)',
            colorClass: 'bg-purple-500/10 text-purple-400',
            borderClass: 'border-purple-500/20 hover:border-purple-400/50',
            glowClass: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]',
        },
    ];

    const hobbies = [
        { icon: Box,       label: '3D Designing (Onshape)',    colorClass: 'bg-emerald-500/10 text-emerald-400', borderClass: 'border-emerald-500/20 hover:border-emerald-400/50' },
        { icon: Cpu,       label: 'IoT & Embedded Systems',    colorClass: 'bg-blue-500/10 text-blue-400',       borderClass: 'border-blue-500/20 hover:border-blue-400/50' },
        { icon: Bot,       label: 'Robotics & ROS 2',          colorClass: 'bg-cyan-500/10 text-cyan-400',       borderClass: 'border-cyan-500/20 hover:border-cyan-400/50' },
        { icon: Layers,    label: '3D Printing',               colorClass: 'bg-rose-500/10 text-rose-400',       borderClass: 'border-rose-500/20 hover:border-rose-400/50' },
        
    ];


    return (
        <section id="about" className="min-h-screen bg-transparent text-slate-50 py-24 px-6 relative overflow-hidden">

            {/* ── Background ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0c1322_0%,_#05070d_70%)] -z-10" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* ── Section Header ── */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mb-20 text-center flex flex-col items-center"
                >
                    <SectionLabel>Who I Am</SectionLabel>
                    <h2 className="text-4xl md:text-6xl font-extrabold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 inline-block leading-tight">
                        My Journey &amp; Expertise
                    </h2>
                    <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto">
                        From circuit boards to cloud backends — I build end-to-end.
                    </p>
                </motion.div>

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* ── LEFT: Text + Stats + Hobbies ── */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        {/* Bio */}
                        <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                            <p>
                                Hey, I'm{' '}
                                <span className="text-emerald-400 font-semibold">Aditya Kumar Maurya</span> —
                                a passionate developer and{' '}
                                <span className="text-yellow-400 font-semibold">3x Hackathon Winner</span>{' '}
                                currently pursuing B.Tech in Electronics &amp; Communication Engineering.
                            </p>
                            <p>
                                I specialize in{' '}
                                <span className="text-blue-400 font-medium">Full Stack Web</span>,{' '}
                                <span className="text-blue-400 font-medium">Android App Development</span>, and{' '}
                                <span className="text-emerald-400 font-medium">Hardware &amp; IoT Engineering</span>.
                                I thrive on solving complex problems — from designing custom 3D-printed robotics and
                                ESP32-based smart home systems, to building scalable web backends.
                            </p>
                            <p>
                                I bring deep technical precision from the physical hardware all the way to the cloud,
                                making sure every layer of the stack is solid.
                            </p>
                        </div>

                        {/* Info badges */}
                        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                            <InfoBadge icon={GraduationCap} color="text-purple-400">
                                MAIT Rohini, Delhi
                            </InfoBadge>
                            <InfoBadge icon={MapPin} color="text-rose-400">
                                New Delhi, India
                            </InfoBadge>
                        </div>

                        {/* Stats Grid */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">At a Glance</h4>
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {stats.map((s, i) => <StatCard key={i} {...s} />)}
                            </motion.div>
                        </div>

                        {/* Hobbies */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                Beyond Coding
                            </h4>
                            <motion.div
                                variants={stagger}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {hobbies.map((h, i) => <HobbyCard key={i} {...h} />)}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Profile Image Card ── */}
                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="relative flex flex-col items-center gap-6"
                    >
                        {/* Photo */}
                        <div className="relative w-full max-w-sm mx-auto">
                            {/* Glow ring */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-emerald-500/40 via-blue-500/20 to-purple-500/30 blur-xl opacity-60" />

                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl group">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-70 z-10" />


                                <img
                                    src={profileImage}
                                    alt="Aditya Kumar Maurya"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Caption overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                    <div className="h-px w-16 bg-gradient-to-r from-emerald-400 to-blue-400 mb-3 rounded-full" />
                                    <p className="text-slate-200 text-sm font-medium italic leading-snug">
                                        "Building ideas into scalable digital solutions."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Education Card */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="w-full max-w-sm mx-auto"
                        >
                            <div className="relative p-5 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-md overflow-hidden group hover:border-purple-500/40 transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.1)]">
                                {/* subtle glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Education</p>
                                        <h5 className="text-base font-bold text-slate-100 leading-snug">
                                            Maharaja Agrasen Institute of Technology
                                        </h5>
                                        <p className="text-sm text-slate-400 mt-1">
                                            B.Tech in Electronics &amp; Communication Engineering
                                        </p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full px-3 py-1 font-medium">
                                                3rd Year · 2024–2028
                                            </span>
                                            <span className="text-xs bg-slate-800 text-slate-400 rounded-full px-3 py-1 font-medium">
                                                Rohini, Delhi
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AboutPage;
