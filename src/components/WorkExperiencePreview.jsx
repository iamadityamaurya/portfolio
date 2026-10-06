import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2 } from 'lucide-react';

const latestExperience = {
    role: "Software Intern",
    company: "Iotfy",
    period: "June 2026 – August 2026",
    location: "On-site",
    bullets: [
        "Built a client-facing cross-platform mobile app with React Native + Expo.",
        "Designed REST APIs and backend services to power mobile and web client features.",
        "Implemented modern responsive UI/UX with React and Tailwind CSS."
    ]
};

const WorkExperiencePreview = () => {
    return (
        <section id="work-experience" className="min-h-[60vh] bg-transparent text-slate-50 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center font-mono">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between items-start gap-4"
                >
                    <div>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
                            Experience.
                        </h2>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 max-w-md">
                            Where I've shipped real code and grown as an engineer.
                        </p>
                    </div>

                </motion.div>

                {/* Latest Experience Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="group"
                >
                    <div className="relative border border-slate-800 bg-[#090d16]/80 backdrop-blur-sm overflow-hidden hover:border-slate-600 transition-colors duration-300">
                        {/* Top window bar */}
                        <div className="flex items-center justify-between px-3 py-2 bg-[#0d121f] border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                            </div>
                        </div>

                        <div className="p-5 sm:p-8 md:p-10">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-7">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        
                                        <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider">
                                            {latestExperience.location}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-2">
                                        {latestExperience.role}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                                        <span className="inline-flex items-center gap-1.5 text-slate-300 font-semibold">
                                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                                            {latestExperience.company}
                                        </span>
                                        <span className="text-slate-600">/</span>
                                        <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs sm:text-sm font-mono">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {latestExperience.period}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Bullets */}
                            <div className="space-y-3 sm:space-y-4 mb-8">
                                {latestExperience.bullets.map((bullet, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                                        className="flex items-start gap-3 text-sm sm:text-base text-slate-300 leading-relaxed group/item"
                                    >
                                        <span className="text-emerald-500/60 font-mono select-none mt-0.5">
                                            {`[${(idx + 1).toString().padStart(2, '0')}]`}
                                        </span>
                                        <span className="group-hover/item:text-slate-200 transition-colors">
                                            {bullet}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            
                        </div>

                        {/* Decorative line numbers */}
                        <div className="hidden sm:flex absolute top-20 -left-8 flex-col gap-1 text-[10px] text-slate-700 font-mono select-none">
                            {Array.from({ length: 12 }, (_, n) => n + 1).map((n) => (
                                <span key={n}>{n.toString().padStart(2, '0')}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WorkExperiencePreview;
