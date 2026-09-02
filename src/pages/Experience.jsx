import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Cpu, Rocket, ChevronRight, Calendar, Building2, ArrowUpRight } from 'lucide-react';

const ExperiencePage = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    const experiences = [
        {
            role: "Hardware Engineer",
            company: "Iotfy",
            period: "Aug 2026 - Present",
            icon: Cpu,
            accent: "blue",
            description: "",
            bullets: [
                "Programmed microcontrollers (ESP32, Arduino) with custom communication protocols to implement wireless telemetry systems.",
                "Developed robotic system modules integrated with ROS 2 framework to execute precise navigation tasks.",
                "Modelled complex 3D hardware structures, enclosures, and motor brackets in Onshape, ready for functional 3D printing."
            ],
            tech: ["C++", "C", "Python", "ROS 2", "Arduino", "ESP32", "Onshape (3D Design)", "3D Printing"]
        },
        {
            role: "IoT & Embedded Systems Engineer",
            company: "Open Source / Robotics Prototype Lab",
            period: "Jan 2023 – Present",
            icon: Cpu,
            accent: "blue",
            description: "Designing custom physical hardware, automated robotics, and smart home IoT systems from the circuit board to user interface layers.",
            bullets: [
                "Programmed microcontrollers (ESP32, Arduino) with custom communication protocols to implement wireless telemetry systems.",
                "Developed robotic system modules integrated with ROS 2 framework to execute precise navigation tasks.",
                "Modelled complex 3D hardware structures, enclosures, and motor brackets in Onshape, ready for functional 3D printing."
            ],
            tech: ["C++", "C", "Python", "ROS 2", "Arduino", "ESP32", "Onshape (3D Design)", "3D Printing"]
        },
        {
            role: "Hackathon Builder & Lead Engineer",
            company: "Competitive Prototyping",
            period: "Oct 2023 – Present",
            icon: Rocket,
            accent: "purple",
            description: "Collaborating with rapid-prototyping teams to conceptualize and develop functional solutions for national and collegiate hackathons under 36-hour timelines.",
            bullets: [
                "Achieved 3x Hackathon Winner distinctions by delivering production-ready software integrated with active hardware systems.",
                "Spearheaded multi-layer software-hardware integrations, coordinating REST APIs, serial communication, and mobile interfaces.",
                "Designed clean database schemas and responsive frontend interfaces to deliver visual impact during live presentations."
            ],
            tech: ["React", "Express", "Node.js", "Tailwind CSS", "Arduino", "API Integration", "Framer Motion"]
        }
    ];

    const accentColors = {
        emerald: {
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/30',
            borderActive: 'border-emerald-400',
            text: 'text-emerald-400',
            glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
            glowStrong: 'shadow-[0_0_40px_rgba(16,185,129,0.25)]',
            dot: 'bg-emerald-400',
            gradient: 'from-emerald-500/20 to-transparent',
            tabBg: 'bg-emerald-500/5',
            tabBorder: 'border-emerald-500/40',
            ring: 'ring-emerald-500/30',
        },
        blue: {
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/30',
            borderActive: 'border-blue-400',
            text: 'text-blue-400',
            glow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]',
            glowStrong: 'shadow-[0_0_40px_rgba(59,130,246,0.25)]',
            dot: 'bg-blue-400',
            gradient: 'from-blue-500/20 to-transparent',
            tabBg: 'bg-blue-500/5',
            tabBorder: 'border-blue-500/40',
            ring: 'ring-blue-500/30',
        },
        purple: {
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/30',
            borderActive: 'border-purple-400',
            text: 'text-purple-400',
            glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
            glowStrong: 'shadow-[0_0_40px_rgba(168,85,247,0.25)]',
            dot: 'bg-purple-400',
            gradient: 'from-purple-500/20 to-transparent',
            tabBg: 'bg-purple-500/5',
            tabBorder: 'border-purple-500/40',
            ring: 'ring-purple-500/30',
        },
    };

    const active = experiences[activeIdx];
    const colors = accentColors[active.accent];
    const Icon = active.icon;

    return (
        <section id="experience" className="bg-transparent text-slate-50 py-24 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center flex flex-col items-center"
                >
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-3">
                        <span className="w-4 h-px bg-emerald-400" />
                        Professional History
                        <span className="w-4 h-px bg-emerald-400" />
                    </span>
                    <h3 className="text-3xl md:text-5xl font-extrabold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 inline-block leading-tight">
                        Work Experience
                    </h3>
                    <p className="text-slate-400 mt-4 text-base max-w-lg mx-auto">
                        My journey across software development, physical hardware prototyping, and competitive engineering.
                    </p>
                </motion.div>

                {/* Tab-panel Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="flex flex-col lg:flex-row gap-6 lg:gap-0 max-w-5xl mx-auto"
                >
                    {/* Left Tabs */}
                    <div className="lg:w-72 shrink-0 flex flex-row lg:flex-col gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:border-l-2 border-slate-800">
                        {experiences.map((exp, idx) => {
                            const tabColors = accentColors[exp.accent];
                            const isActive = idx === activeIdx;
                            const TabIcon = exp.icon;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveIdx(idx)}
                                    className={`relative flex items-center gap-3 px-5 py-4 text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal rounded-xl lg:rounded-none lg:rounded-r-xl cursor-pointer min-w-[200px] lg:min-w-0 group
                                        ${isActive
                                            ? `${tabColors.tabBg} border ${tabColors.tabBorder} lg:border-l-2 lg:border-r-0 lg:border-t-0 lg:border-b-0 ${tabColors.borderActive} lg:-ml-[2px] ${tabColors.text}`
                                            : 'border border-transparent lg:border-none text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                                        }
                                    `}
                                >
                                    <div className={`p-2 rounded-lg transition-all duration-300 ${isActive ? `${tabColors.bg} ${tabColors.text}` : 'bg-slate-800/60 text-slate-500 group-hover:text-slate-300'}`}>
                                        <TabIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className={`block text-sm font-semibold transition-colors duration-300 ${isActive ? tabColors.text : ''}`}>
                                            {exp.company.length > 25 ? exp.company.substring(0, 22) + '…' : exp.company}
                                        </span>
                                        <span className="block text-[11px] text-slate-500 font-medium mt-0.5">
                                            {exp.period}
                                        </span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="tab-arrow"
                                            className={`hidden lg:block ml-auto ${tabColors.text}`}
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </motion.div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Content Panel */}
                    <div className="flex-1 lg:pl-8 min-h-[420px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className={`relative rounded-2xl bg-slate-900/50 border ${colors.border} backdrop-blur-xl overflow-hidden ${colors.glow} transition-shadow duration-500`}
                            >
                                {/* Top gradient accent bar */}
                                <div className={`h-1 bg-gradient-to-r ${colors.gradient}`} />

                                {/* Ambient glow blob */}
                                <div className={`absolute -top-20 -right-20 w-60 h-60 ${colors.bg} rounded-full blur-[80px] pointer-events-none opacity-60`} />

                                <div className="relative p-7 md:p-9">
                                    {/* Header Row */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className={`p-3 rounded-xl ${colors.bg} ${colors.text} ring-1 ${colors.ring} shrink-0`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xl md:text-2xl font-bold text-slate-100 leading-snug">
                                                {active.role}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                                                <span className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                                                    <Building2 className="w-3.5 h-3.5" />
                                                    {active.company}
                                                </span>
                                                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${colors.text}`}>
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {active.period}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-400 text-[15px] leading-relaxed mb-6">
                                        {active.description}
                                    </p>

                                    {/* Bullets */}
                                    <ul className="space-y-3 mb-7">
                                        {active.bullets.map((bullet, bIdx) => (
                                            <motion.li
                                                key={bIdx}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: bIdx * 0.1 }}
                                                className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed group/bullet"
                                            >
                                                <span className="relative mt-1.5 shrink-0">
                                                    <span className={`block w-2 h-2 rounded-full ${colors.dot} opacity-70 group-hover/bullet:opacity-100 transition-opacity`} />
                                                    <span className={`absolute inset-0 w-2 h-2 rounded-full ${colors.dot} opacity-30 animate-ping`} style={{ animationDuration: `${3 + bIdx}s` }} />
                                                </span>
                                                <span className="group-hover/bullet:text-slate-200 transition-colors">
                                                    {bullet}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Divider */}
                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent mb-6" />

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {active.tech.map((t, tIdx) => (
                                            <motion.span
                                                key={tIdx}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.2, delay: 0.15 + tIdx * 0.04 }}
                                                className={`text-xs font-mono px-3 py-1.5 rounded-lg ${colors.bg} ${colors.text} border ${colors.border} hover:border-opacity-60 transition-all cursor-default`}
                                            >
                                                {t}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ExperiencePage;
