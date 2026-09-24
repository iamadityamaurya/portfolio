import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, Code, Terminal, ExternalLink, MapPin } from 'lucide-react';

const ExperiencePage = () => {
    const experiences = [
        {
            role: "Software Intern",
            company: "Iotfy",
            period: "June 2026 – August 2026",
            location: "On-site",
            icon: Code,
            bullets: [
                "Built a cross-platform mobile application for a client using React Native and Expo, delivering a production-ready MVP within the internship timeline.",
                "Designed and implemented RESTful APIs and backend services to power mobile and web client features.",
                "Created modern, responsive UI/UX designs and translated Figma-style wireframes into functional React + Tailwind CSS interfaces."
            ],
            tech: ["React", "React Native", "Expo", "Node.js", "REST APIs", "UI/UX", "Tailwind CSS", "JavaScript"]
        },
        {
            role: "Lead Software Engineer",
            company: "Stealth Cab Startup",
            period: "Dec 2025 – May 2026",
            location: "Remote",
            icon: MapPin,
            bullets: [
                "Built a full-stack cab booking platform with separate apps for passengers and drivers using React Native, NestJS, and Supabase.",
                "Applied system design principles and DevOps practices including CI/CD pipelines, Docker, and caching to ensure performance and scalability.",
                "Developed a responsive landing page using Next.js integrated with the NestJS backend."
            ],
            tech: ["React Native", "Nest.js", "Supabase", "TypeScript", "Next.js", "Docker", "CI/CD"]
        }
    ];

    return (
        <section id="experience" className="min-h-screen bg-[#05070d] text-slate-50 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center font-mono">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 sm:mb-14"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold">~/experience</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
                        Work.
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 max-w-md">
                        Where I've shipped real code, real products, and real value.
                    </p>
                </motion.div>

                {/* Experience Entries */}
                <div className="space-y-16 sm:space-y-24">
                    {experiences.map((exp, expIdx) => {
                        const Icon = exp.icon;
                        const year = exp.period.split(' ')[1] || '2026';

                        return (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: expIdx * 0.1 }}
                                className="group"
                            >
                                {/* Year marker */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-4xl sm:text-5xl font-black text-slate-800 select-none">
                                        {year}
                                    </span>
                                    <div className="flex-1 h-px bg-slate-800" />
                                </div>

                                {/* Main card — raw terminal/editor style */}
                                <div className="relative border border-slate-800 bg-[#090d16]/80 backdrop-blur-sm overflow-hidden">
                                    {/* Top bar */}
                                    <div className="flex items-center justify-between px-3 py-2 bg-[#0d121f] border-b border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-slate-600">
                                            {exp.company.toLowerCase().replace(/\s+/g, '-')}.md
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-8 md:p-10">
                                        {/* Title row */}
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                                            <div>
                                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                                                    {exp.role}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                                                    <span className="inline-flex items-center gap-1.5 text-slate-300 font-semibold">
                                                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                                                        {exp.company}
                                                    </span>
                                                    <span className="text-slate-600">/</span>
                                                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs sm:text-sm font-mono">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {exp.period}
                                                    </span>
                                                    <span className="text-slate-600">/</span>
                                                    <span className="text-xs sm:text-sm text-slate-500 font-mono px-2 py-0.5 rounded border border-slate-800">
                                                        {exp.location}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="shrink-0">
                                                <div className="w-12 h-12 sm:w-14 sm:h-14 border border-slate-700 bg-slate-900 flex items-center justify-center text-emerald-400">
                                                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bullet list */}
                                        <div className="space-y-4 mb-8">
                                            {exp.bullets.map((bullet, idx) => (
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

                                        {/* Tech tags */}
                                        <div className="border-t border-slate-800 pt-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[10px] sm:text-xs text-slate-600 uppercase tracking-widest font-bold">
                                                    $ tech-stack
                                                </span>
                                                <div className="flex-1 h-px bg-slate-800" />
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {exp.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-xs sm:text-sm font-mono px-3 py-1.5 border border-slate-700 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors cursor-default"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative line numbers */}
                                    <div className="hidden sm:flex absolute top-16 -left-8 flex-col gap-1 text-[10px] text-slate-700 font-mono select-none">
                                        {Array.from({ length: 15 }, (_, n) => n + 1).map((n) => (
                                            <span key={n}>{n.toString().padStart(2, '0')}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Status footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] sm:text-xs text-slate-600 font-mono"
                >
                    <span>STATUS: OPEN_TO_OPPORTUNITIES</span>
                    <a
                        href="mailto:adityamaurya1947@gmail.com"
                        className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-400 transition-colors"
                    >
                        GET IN TOUCH
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default ExperiencePage;
