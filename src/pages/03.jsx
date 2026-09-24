import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Eye, Terminal } from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectModal from '../components/ProjectModal';

export const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Show top 6 projects designated for main page (excluding hardware/IoT), 2 rows of 3
    const projects = projectsData.filter(p => p.mainPageShow && p.categorySlug !== 'iot').slice(0, 6);

    return (
        <section id="projects" className="min-h-screen bg-transparent text-slate-50 py-16 sm:py-24 px-4 sm:px-6 relative">
            {/* Background Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end md:justify-between items-center text-center md:text-left gap-4 relative"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Terminal className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold font-mono">~/projects</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
                            Builds.
                        </h2>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 max-w-md">
                            Selected shipped projects, from AI pipelines to full-stack products.
                        </p>
                    </div>
                    <div className="shrink-0 mt-2 md:mt-0">
                        <Link
                            to="/project"
                            className="group inline-flex items-center gap-2 border border-slate-700 bg-slate-900/80 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-mono font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition-all backdrop-blur-md active:scale-95"
                        >
                            View All Projects
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                >
                    <AnimatePresence>
                        {projects.map((project, idx) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="group relative border border-slate-800 bg-[#090d16]/80 backdrop-blur-sm overflow-hidden hover:border-slate-600 transition-colors duration-300 flex flex-col"
                            >
                                {/* Top window bar */}
                                <div className="flex items-center justify-between px-3 py-2 bg-[#0d121f] border-b border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500/70" />
                                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/70" />
                                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500/70" />
                                    </div>
                                    <span className="text-[10px] sm:text-xs text-slate-600 font-mono truncate max-w-[60%]">
                                        {project.id}.md
                                    </span>
                                </div>

                                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                    {/* Meta header */}
                                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                                        {project.category && (
                                            <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 px-1.5 py-0.5 uppercase tracking-wider">
                                                {project.category}
                                            </span>
                                        )}
                                        {project.stat && (
                                            <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                                                {project.stat}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title + description */}
                                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                        <div className="flex-1 min-w-0">
                                            <h3
                                                onClick={() => setSelectedProject(project)}
                                                className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer mb-1.5 tracking-tight leading-tight"
                                            >
                                                {project.title}
                                            </h3>
                                            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Image thumbnail */}
                                        {project.image && (
                                            <div
                                                onClick={() => setSelectedProject(project)}
                                                className="sm:w-28 sm:h-20 md:w-24 md:h-16 lg:w-28 lg:h-20 shrink-0 bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer group/img"
                                            >
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                                                    loading="lazy"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tech.slice(0, 5).map((t, i) => (
                                            <span key={i} className="text-[10px] font-mono text-slate-400 border border-slate-700 px-1.5 py-0.5 hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-emerald-500/5 transition-colors cursor-default">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action row */}
                                    <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3 h-3" />
                                            <span>Case Study</span>
                                        </button>

                                        <div className="flex items-center gap-2.5">
                                            {project.links?.github && (
                                                <a
                                                    href={project.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-500 hover:text-white transition-colors"
                                                    title="GitHub Source Code"
                                                >
                                                    <Github className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {project.links?.demo && (
                                                <a
                                                    href={project.links.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-500 hover:text-cyan-400 transition-colors"
                                                    title="Live Preview"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Case Study Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default ProjectsPage;
