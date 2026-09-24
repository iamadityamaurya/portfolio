import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ArrowUpRight, ExternalLink,
    Github, Search, Eye, Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import ProjectModal from '../components/ProjectModal';

const categories = ['All', 'IoT & Robotics', 'Full Stack', 'Extensions & AI'];

export const AllProjectsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = useMemo(() => {
        return projectsData.filter((project) => {
            const matchesCategory =
                selectedCategory === 'All' || project.category === selectedCategory;

            const q = searchQuery.trim().toLowerCase();
            const matchesSearch =
                !q ||
                project.title.toLowerCase().includes(q) ||
                project.description.toLowerCase().includes(q) ||
                project.tech.some((t) => t.toLowerCase().includes(q));

            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen overflow-hidden bg-transparent text-slate-50 selection:bg-slate-700 selection:text-white">
            {/* Background grid */}
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#64748b0b_1px,transparent_1px),linear-gradient(to_bottom,#64748b0b_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(56,189,248,0.06),transparent_24%),radial-gradient(circle_at_12%_78%,rgba(99,102,241,0.06),transparent_32%),linear-gradient(#05070de6,#070b14f2)]" />

            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 md:py-16">
                {/* Back to home */}
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-slate-400 transition-colors hover:text-white mb-6 sm:mb-8"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    cd ..
                </Link>

                {/* Header */}
                <header className="border-b border-slate-800/80 pb-8 sm:pb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold font-mono">~/projects/archive</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        Engineering Archive.
                    </h1>
                    <p className="mt-3 sm:mt-4 text-slate-500 text-xs sm:text-base md:text-lg max-w-3xl leading-relaxed">
                        A comprehensive catalog of autonomous robotics systems, smart home hardware, Chrome extensions, and full-stack web applications.
                    </p>
                </header>

                {/* Filters & Search Toolbar */}
                <section className="mt-8 sm:mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {categories.map((cat) => {
                            const isSelected = selectedCategory === cat;
                            const count =
                                cat === 'All'
                                    ? projectsData.length
                                    : projectsData.filter((p) => p.category === cat).length;

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-mono font-semibold transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-cyan-500/10 border border-cyan-500/40 text-cyan-400'
                                            : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                                    }`}
                                >
                                    <span>{cat}</span>
                                    <span
                                        className={`px-1.5 py-0.5 font-mono text-[10px] ${
                                            isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative w-full sm:w-72 md:w-80">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">$</span>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="grep projects or tech..."
                            className="w-full pl-8 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 text-xs sm:text-sm font-mono text-slate-100 placeholder:text-slate-500 outline-none focus:border-slate-500"
                        />
                    </div>
                </section>

                {/* Projects List */}
                {filteredProjects.length === 0 ? (
                    <div className="mt-12 py-16 sm:py-24 text-center border border-slate-800 bg-[#090d16]/60 px-4">
                        <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-base sm:text-lg font-bold text-slate-200 font-mono">No matching projects found</h3>
                        <p className="text-xs text-slate-500 mt-1 font-mono">Try adjusting your search query or category filter.</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSearchQuery('');
                            }}
                            className="mt-4 px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-semibold hover:bg-slate-700 transition-all cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => {
                                const isEven = index % 2 === 0;

                                return (
                                    <motion.article
                                        layout
                                        key={project.id}
                                        initial={{ opacity: 0, y: 22 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.15 }}
                                        transition={{ duration: 0.4 }}
                                        className="group relative overflow-hidden border border-slate-800 bg-[#090d16]/80 hover:border-slate-600 transition-all"
                                    >
                                        {/* Window chrome */}
                                        <div className="flex items-center justify-between px-3 py-2 bg-[#0d121f] border-b border-slate-800">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                                            </div>
                                            <span className="text-[10px] sm:text-xs text-slate-600 font-mono truncate max-w-[60%]">
                                                {project.id}.md
                                            </span>
                                        </div>

                                        <div className="p-5 sm:p-7 md:p-8">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                                                {/* Info Column */}
                                                <div className={`lg:col-span-7 space-y-4 sm:space-y-5 ${!isEven ? 'lg:order-2' : ''}`}>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="px-2.5 sm:px-3 py-1 border border-slate-700 text-slate-300 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                                                            {project.category}
                                                        </span>
                                                        {project.stat && (
                                                            <span className="px-2.5 py-1 border border-cyan-500/20 text-cyan-400 font-mono text-[11px] sm:text-xs">
                                                                {project.stat}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h2
                                                            onClick={() => setSelectedProject(project)}
                                                            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-cyan-400 transition-colors cursor-pointer leading-tight"
                                                        >
                                                            {project.title}
                                                        </h2>
                                                        <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                                                            {project.tagline}
                                                        </p>
                                                    </div>

                                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                                                        {project.description}
                                                    </p>

                                                    {/* Tech stack */}
                                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                                        {project.tech.map((t, tIdx) => (
                                                            <span
                                                                key={tIdx}
                                                                className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-slate-900 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors cursor-default"
                                                            >
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-800">
                                                        <button
                                                            onClick={() => setSelectedProject(project)}
                                                            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs transition-all cursor-pointer"
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                            <span>Read Case Study</span>
                                                        </button>

                                                        {project.links?.github && (
                                                            <a
                                                                href={project.links.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold transition-all border border-slate-700"
                                                            >
                                                                <Github className="w-3.5 h-3.5" />
                                                                <span>Source Code</span>
                                                                <ArrowUpRight className="w-3 h-3 text-slate-400" />
                                                            </a>
                                                        )}

                                                        {project.links?.demo && (
                                                            <a
                                                                href={project.links.demo}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold transition-all border border-cyan-500/30"
                                                            >
                                                                <ExternalLink className="w-3.5 h-3.5" />
                                                                <span>Live Preview</span>
                                                                <ArrowUpRight className="w-3 h-3" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Image Preview Column */}
                                                <div className={`lg:col-span-5 ${!isEven ? 'lg:order-1' : ''}`}>
                                                    <div
                                                        onClick={() => setSelectedProject(project)}
                                                        className="relative aspect-[16/10] overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl cursor-pointer group/img"
                                                    >
                                                        <img
                                                            src={project.image}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                                                            loading="lazy"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                                            <span className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xl">
                                                                <Eye className="w-3.5 h-3.5" /> View Case Study
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </main>

            {/* Case Study Modal */}
            <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </div>
    );
};

export default AllProjectsPage;
