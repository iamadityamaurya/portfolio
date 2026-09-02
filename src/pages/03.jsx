import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectModal from '../components/ProjectModal';

export const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Show projects designated for main page or top 3-6 featured
    const projects = projectsData.filter(p => p.mainPageShow || p.featured).slice(0, 6);

    return (
        <section id="projects" className="min-h-screen bg-transparent text-slate-50 py-24 px-6 relative">
            {/* Background Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14 flex flex-col items-center justify-center gap-4 relative"
                >
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            Featured Showcase
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Featured Projects
                        </h2>
                    </div>
                    <div className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 shrink-0 mt-4 md:mt-0">
                        <Link 
                            to="/project" 
                            className="group inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all backdrop-blur-md shadow-lg"
                        >
                            View All Projects
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {projects.map((project, idx) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: idx * 0.08 }}
                                className="group relative bg-[#090e19]/80 border border-slate-800 hover:border-emerald-500/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {project.image && (
                                    <div 
                                        onClick={() => setSelectedProject(project)}
                                        className="w-full aspect-[16/10] bg-slate-900 relative overflow-hidden cursor-pointer group/img"
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#090e19] via-transparent to-transparent opacity-60" />
                                        
                                        {/* Hover Overlay Badge */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xl">
                                                <Eye className="w-3.5 h-3.5" /> View Case Study
                                            </span>
                                        </div>

                                        {project.category && (
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-300 font-semibold">
                                                    {project.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="p-6 relative z-10 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 
                                            onClick={() => setSelectedProject(project)}
                                            className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors cursor-pointer"
                                        >
                                            {project.title}
                                        </h3>
                                    </div>

                                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 mb-5 flex-grow leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                                        {project.tech.slice(0, 4).map((t, i) => (
                                            <span key={i} className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action row */}
                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>Case Study</span>
                                        </button>

                                        <div className="flex items-center gap-3">
                                            {project.links?.github && (
                                                <a 
                                                    href={project.links.github} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-slate-400 hover:text-white transition-colors"
                                                    title="GitHub Source Code"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            )}
                                            {project.links?.demo && (
                                                <a 
                                                    href={project.links.demo} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                                                    title="Live Preview"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
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
