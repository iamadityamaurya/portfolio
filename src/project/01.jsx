import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Layers, Zap, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import aiFillerBanner from '../assets/project_png/ai-filler-showcase.png';
import medScrapperBanner from '../assets/project_png/medscrapper-showcase.png';
import restockerBanner from '../assets/project_png/restocker-showcase.png';
import addyBitesBanner from '../assets/project_png/addybites-showcase-wide.png';
import portfolioBanner from '../assets/project_png/image.png';
import motiaBanner from '../assets/project_png/motia-showcase.png';
import fireshieldBanner from '../assets/project_png/fireshield-showcase.png';
import nexgenqueryBanner from '../assets/project_png/nexgenquery-showcase.png';
import dsdBanner from '../assets/project_png/dsd-showcase.png';
import projectData from '../assets/project_data/data.json';

const imageMap = {
    "aiFillerBanner": aiFillerBanner,
    "medScrapperBanner": medScrapperBanner,
    "restockerBanner": restockerBanner,
    "addyBitesBanner": addyBitesBanner,
    "portfolioBanner": portfolioBanner,
    "motiaBanner": motiaBanner,
    "fireshieldBanner": fireshieldBanner,
    "nexgenqueryBanner": nexgenqueryBanner,
    "dsdBanner": dsdBanner
};

const SectionLabel = ({ children }) => (
    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-3 select-none">
        <span className="w-4 h-px bg-emerald-400" />
        {children}
        <span className="w-4 h-px bg-emerald-400" />
    </span>
);

const AllProjectsPage = () => {
    const projects = projectData
        .map(project => ({
            ...project,
            image: imageMap[project.image]
        }))
        .sort((a, b) => a.id - b.id);

    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ['All', 'Extension', 'Full Stack'];

    // Filter logic
    const filteredProjects = projects.filter(project => {
        const matchesCategory = filter === 'All' || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const [activeId, setActiveId] = useState(null);

    // Automatically select the first project when filtered list changes
    useEffect(() => {
        if (filteredProjects.length > 0) {
            const hasActive = filteredProjects.some(p => p.id === activeId);
            if (!hasActive) {
                setActiveId(filteredProjects[0].id);
            }
        } else {
            setActiveId(null);
        }
    }, [filteredProjects, activeId]);

    const activeProject = filteredProjects.find(p => p.id === activeId);

    return (
        <div className="min-h-screen bg-transparent text-slate-50 relative selection:bg-emerald-500/30 selection:text-emerald-400 antialiased font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#050202] via-[#050202]/95 to-[#050202] pointer-events-none"></div>
            <div className="fixed top-0 right-0 w-[560px] h-[560px] bg-emerald-500/[0.06] blur-[140px] rounded-full pointer-events-none"></div>

            <main className="container mx-auto px-6 py-14 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="mb-14">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-8 transition-colors font-medium text-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-start"
                    >
                        <SectionLabel>Showcase</SectionLabel>
                        <h1 className="text-5xl md:text-6xl font-bold mb-5 tracking-tight font-heading bg-gradient-to-b from-slate-50 to-slate-300 bg-clip-text text-transparent">
                            All Projects
                        </h1>
                        <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
                            Explore my complete portfolio of coding projects, experiments, and open-source contributions.
                        </p>
                    </motion.div>
                </div>

                {/* Search and Filter */}
                <div className="mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-slate-900 pb-6">
                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap gap-2 order-2 md:order-1"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer border ${filter === cat
                                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 border-emerald-500'
                                    : 'bg-[#060303]/40 border-slate-900 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-slate-950/60'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full max-w-xs order-1 md:order-2 group"
                    >
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search directory..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#060303]/40 border border-slate-900 text-slate-200 text-sm focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/[0.08] outline-none transition-all placeholder:text-slate-600"
                        />
                    </motion.div>
                </div>

                {/* Interactive Split View */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Directory List (Left Column, 5 cols on lg) */}
                        <div className="lg:col-span-5 space-y-3 max-h-[700px] overflow-y-auto pr-2 scrollbar-none">
                            {filteredProjects.map((project) => {
                                const isActive = project.id === activeId;
                                return (
                                    <button
                                        key={project.id}
                                        onClick={() => setActiveId(project.id)}
                                        className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer group overflow-hidden ${isActive
                                            ? 'bg-slate-900/60 border-emerald-500/20 text-slate-100 shadow-lg shadow-emerald-500/[0.04]'
                                            : 'bg-[#060303]/40 border-slate-950 hover:bg-slate-950/60 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        {/* Active accent bar */}
                                        <span
                                            className={`absolute left-0 top-0 h-full w-[3px] bg-emerald-400 transition-transform duration-300 origin-top ${isActive ? 'scale-y-100' : 'scale-y-0'
                                                }`}
                                        />

                                        {/* Monospace index number */}
                                        <span className={`font-mono text-xs font-semibold select-none mt-0.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                                            {String(project.id).padStart(2, '0')}
                                        </span>

                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className={`font-bold text-sm truncate transition-colors ${isActive ? 'text-slate-100 font-extrabold' : 'text-slate-300 group-hover:text-slate-200'}`}>
                                                    {project.title}
                                                </h3>
                                                <span className={`text-[8px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded uppercase shrink-0 select-none ${project.category === 'Extension'
                                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    }`}>
                                                    {project.category}
                                                </span>
                                            </div>

                                            <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {project.tech.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-slate-500 select-none">
                                                        {t}
                                                    </span>
                                                ))}
                                                {project.tech.length > 3 && (
                                                    <span className="text-[9px] font-mono text-slate-600 px-1 py-0.5 select-none">
                                                        +{project.tech.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Widescreen Spotlight Showcase (Right Column, 7 cols on lg) */}
                        <div className="lg:col-span-7 lg:sticky lg:top-8 bg-slate-950/50 border border-slate-900 rounded-3xl p-6 md:p-9 min-h-[580px] flex flex-col justify-between overflow-hidden relative shadow-2xl shadow-black/40">
                            {/* Ambient glow */}
                            <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/[0.07] blur-[100px] rounded-full pointer-events-none" />

                            {activeProject && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeProject.id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.25 }}
                                        className="space-y-6 flex-grow flex flex-col justify-between relative"
                                    >
                                        <div>
                                            {/* Spotlight Banner with absolute container */}
                                            {activeProject.image ? (
                                                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/85 relative group shadow-xl shadow-black/50">
                                                    <img
                                                        src={activeProject.image}
                                                        alt={activeProject.title}
                                                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04] pointer-events-none rounded-2xl" />
                                                </div>
                                            ) : (
                                                <div className="w-full aspect-[16/10] rounded-2xl border border-slate-800/80 bg-slate-950/85 flex items-center justify-center relative shadow-xl shadow-black/50">
                                                    <div className="p-6 rounded-full bg-slate-900/60 border border-slate-800 text-emerald-400">
                                                        {activeProject.category.includes("Android") ? <Zap className="w-10 h-10" /> :
                                                            activeProject.category.includes("Web") ? <Layers className="w-10 h-10" /> :
                                                                <Code className="w-10 h-10" />}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Spotlight Header info */}
                                            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                                                <h2 className="text-2xl font-extrabold tracking-tight text-slate-100">
                                                    {activeProject.title}
                                                </h2>

                                                <span className="text-[10px] font-bold font-mono tracking-wider px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400/90 select-none">
                                                    SYSTEM: {activeProject.category}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm text-slate-400 leading-relaxed font-sans mt-4">
                                                {activeProject.description}
                                            </p>
                                        </div>

                                        {/* Technical Stack Specifications */}
                                        <div className="mt-8 border-t border-slate-900 pt-6 space-y-6">
                                            <div>
                                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
                                                    Technologies Employed
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {activeProject.tech.map((t, i) => (
                                                        <span key={i} className="text-[10px] font-mono font-medium px-2.5 py-1 rounded bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/80 select-none">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Spotlight Actions */}
                                            <div className="flex justify-end gap-3 pt-5 border-t border-slate-900">
                                                {activeProject.links.code && (
                                                    <a
                                                        href={activeProject.links.code}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
                                                    >
                                                        <Github className="w-4 h-4" /> Source Repository
                                                    </a>
                                                )}
                                                {activeProject.links.demo && (
                                                    <a
                                                        href={activeProject.links.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/20 cursor-pointer"
                                                    >
                                                        <ExternalLink className="w-4 h-4" /> Live System
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-slate-400 text-lg">No projects match the selected criteria.</p>
                        <button
                            onClick={() => { setFilter('All'); setSearchQuery(''); }}
                            className="mt-4 text-emerald-400 hover:underline cursor-pointer"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllProjectsPage;