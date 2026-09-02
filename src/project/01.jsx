import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ArrowUpRight, CircuitBoard, Cpu, ExternalLink,
    Github, Search, Sparkles, Eye, FolderGit2
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
        <div className="min-h-screen overflow-hidden bg-transparent text-slate-50 selection:bg-emerald-400/30 selection:text-emerald-100">
            {/* Background grid */}
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#64748b0b_1px,transparent_1px),linear-gradient(to_bottom,#64748b0b_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(16,185,129,0.08),transparent_24%),radial-gradient(circle_at_12%_78%,rgba(56,189,248,0.08),transparent_32%),linear-gradient(#05070de6,#070b14f2)]" />

            <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-16">
                {/* Back to home */}
                <Link 
                    to="/" 
                    className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 transition-colors hover:text-emerald-400 mb-8"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
                    Back to home
                </Link>

                {/* Header */}
                <header className="border-b border-slate-800/80 pb-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">
                        <FolderGit2 className="w-3.5 h-3.5" />
                        Full Project Catalog ({projectsData.length})
                    </div>
                    <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-slate-100">
                        Engineering Archive &amp; <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">Projects</span>
                    </h1>
                    <p className="mt-4 text-slate-400 text-sm sm:text-lg max-w-3xl leading-relaxed">
                        A comprehensive catalog of autonomous robotics systems, smart home hardware, Chrome extensions, and full-stack web applications.
                    </p>
                </header>

                {/* Filters & Search Toolbar */}
                <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
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
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                                            : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                                    }`}
                                >
                                    <span>{cat}</span>
                                    <span
                                        className={`px-1.5 py-0.5 rounded-md font-mono text-[10px] ${
                                            isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-white/5 text-slate-400'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative w-full sm:w-80">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search projects or tech stacks..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-emerald-500/50"
                        />
                    </div>
                </section>

                {/* Projects List */}
                {filteredProjects.length === 0 ? (
                    <div className="mt-12 py-24 text-center rounded-3xl bg-slate-900/40 border border-slate-800">
                        <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-slate-200">No matching projects found</h3>
                        <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or category filter.</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSearchQuery('');
                            }}
                            className="mt-4 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition-all cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="mt-10 space-y-8">
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
                                        className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-[#090e19]/80 p-6 sm:p-8 shadow-2xl hover:border-emerald-500/40 transition-all"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                            {/* Info Column */}
                                            <div className={`lg:col-span-7 space-y-5 ${!isEven ? 'lg:order-2' : ''}`}>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                                                        {project.category}
                                                    </span>
                                                    {project.stat && (
                                                        <span className="px-2.5 py-1 rounded-xl bg-white/5 text-cyan-300 font-mono text-xs">
                                                            {project.stat}
                                                        </span>
                                                    )}
                                                    <span className="text-xs font-mono text-slate-500 ml-auto">
                                                        PROJECT #{String(index + 1).padStart(2, '0')}
                                                    </span>
                                                </div>

                                                <div>
                                                    <h2
                                                        onClick={() => setSelectedProject(project)}
                                                        className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-400 transition-colors cursor-pointer"
                                                    >
                                                        {project.title}
                                                    </h2>
                                                    <p className="text-sm font-medium text-slate-300 mt-1">
                                                        {project.tagline}
                                                    </p>
                                                </div>

                                                <p className="text-slate-400 text-sm leading-relaxed font-normal">
                                                    {project.description}
                                                </p>

                                                {/* Tech stack */}
                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {project.tech.map((t, tIdx) => (
                                                        <span
                                                            key={tIdx}
                                                            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                                                    <button
                                                        onClick={() => setSelectedProject(project)}
                                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span>Read Case Study</span>
                                                    </button>

                                                    {project.links?.github && (
                                                        <a
                                                            href={project.links.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
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
                                                            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold transition-all border border-cyan-500/30"
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
                                                    className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl cursor-pointer group/img"
                                                >
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                                        <span className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-xl">
                                                            <Eye className="w-3.5 h-3.5" /> View Case Study
                                                        </span>
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
