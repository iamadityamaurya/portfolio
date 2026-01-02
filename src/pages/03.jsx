import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Layers, Zap, ArrowRight } from 'lucide-react';
import aiFillerBanner from '../assets/project_png/ai-filler-showcase.png';
import medScrapperBanner from '../assets/project_png/medscrapper-showcase.png';
import restockerBanner from '../assets/project_png/restocker-showcase.png';
import addyBitesBanner from '../assets/project_png/addybites-showcase-wide.png';
import portfolioBanner from '../assets/project_png/image.png';
import motiaBanner from '../assets/project_png/motia-showcase.png';
import projectData from '../assets/project_data/data.json';

const imageMap = {
    "aiFillerBanner": aiFillerBanner,
    "medScrapperBanner": medScrapperBanner,
    "restockerBanner": restockerBanner,
    "addyBitesBanner": addyBitesBanner,
    "portfolioBanner": portfolioBanner,
    "motiaBanner": motiaBanner
};



const ProjectsPage = () => {
    const projects = projectData
        .filter(p => p.main_page_show === true)
        .map(project => ({
            ...project,
            image: imageMap[project.image]
        }));



    return (
        <section id="projects" className="min-h-screen bg-transparent text-slate-50 py-20 px-6 relative">
            {/* Background Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 inline-block">
                        Featured Projects
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A showcase of my recent work, ranging from web applications to embedded systems.
                    </p>
                </motion.div>



                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {projects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative bg-[#0a0404]/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors flex flex-col"
                            >
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {project.image && (
                                    <div className="w-full aspect-video bg-slate-800/50 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0404] to-transparent z-10 opacity-60" />
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                <div className="p-6 relative z-10 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        {!project.image && (
                                            <div className="p-2 rounded-lg bg-slate-800/50 text-emerald-400">
                                                {project.category.includes("Android") ? <Zap className="w-6 h-6" /> :
                                                    project.category.includes("Web") ? <Layers className="w-6 h-6" /> :
                                                        <Code className="w-6 h-6" />}
                                            </div>
                                        )}
                                        <div className={`flex gap-3 ${project.image ? 'w-full justify-end' : ''}`}>
                                            <a href={project.links.code} className="text-slate-400 hover:text-emerald-400 transition-colors">
                                                <Github className="w-5 h-5" />
                                            </a>
                                            <a href={project.links.demo} className="text-slate-400 hover:text-emerald-400 transition-colors">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm mb-6 flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center min-h-[400px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <Link to="/project" className="relative z-10 flex flex-col items-center gap-4 group-hover:scale-110 transition-transform duration-300">
                                <div className="p-5 rounded-full bg-slate-800 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors shadow-lg shadow-black/20">
                                    <ArrowRight className="w-8 h-8" />
                                </div>
                                <span className="font-bold text-xl text-slate-300 group-hover:text-emerald-400 transition-colors">Show All Projects</span>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsPage;
