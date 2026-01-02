import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Layers, Zap, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
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



const AllProjectsPage = () => {
    // Extended projects list

    const projects = projectData.map(project => ({
        ...project,
        image: imageMap[project.image]
    }));

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

    return (
        <div className="min-h-screen bg-transparent text-slate-50 relative selection:bg-emerald-500/30 selection:text-emerald-400">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#050202] via-transparent to-[#050202] pointer-events-none"></div>

            <main className="container mx-auto px-6 py-12 relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-6 transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 inline-block">
                            All Projects
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            Explore my complete portfolio of coding projects, experiments, and open-source contributions.
                        </p>
                    </motion.div>
                </div>

                {/* Search and Filter */}
                <div className="mb-12 space-y-6">
                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative max-w-lg"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a0404]/50 border border-slate-800 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-500"
                        />
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                    ? 'bg-emerald-500 text-[#050202] shadow-lg shadow-emerald-500/25'
                                    : 'bg-[#0a0404] border border-slate-800 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
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
                                                <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
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
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-slate-400 text-lg">No projects found matching your criteria.</p>
                                <button
                                    onClick={() => { setFilter('All'); setSearchQuery(''); }}
                                    className="mt-4 text-emerald-400 hover:underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>
        </div>
    );
};

export default AllProjectsPage;
