import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft, ArrowUpRight, ChevronRight, CircuitBoard,
    Cpu, ExternalLink, Github, Radio, Search, Sparkles
} from 'lucide-react';
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
import lineFollowerBanner from '../assets/project_png/line-follower-alpha.png';
import projectData from '../assets/project_data/data.json';

const imageMap = {
    aiFillerBanner,
    medScrapperBanner,
    restockerBanner,
    addyBitesBanner,
    portfolioBanner,
    motiaBanner,
    fireshieldBanner,
    nexgenqueryBanner,
    dsdBanner,
    lineFollowerBanner,
};

const categoryStyles = {
    IoT: {
        icon: CircuitBoard,
        label: 'Hardware + IoT',
        active: 'border-cyan-400/50 bg-cyan-400/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.10)]',
        badge: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300',
        glow: 'from-cyan-400/20 via-emerald-400/5 to-transparent',
    },
    Extension: {
        icon: Sparkles,
        label: 'Extension',
        active: 'border-violet-400/50 bg-violet-400/10 text-violet-200 shadow-[0_0_28px_rgba(167,139,250,0.10)]',
        badge: 'border-violet-400/25 bg-violet-400/10 text-violet-300',
        glow: 'from-violet-400/20 via-blue-400/5 to-transparent',
    },
    'Full Stack': {
        icon: Cpu,
        label: 'Full Stack',
        active: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-200 shadow-[0_0_28px_rgba(52,211,153,0.10)]',
        badge: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
        glow: 'from-emerald-400/20 via-teal-400/5 to-transparent',
    },
};

const SectionLabel = ({ children }) => (
    <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] text-emerald-400 uppercase font-mono">
        <span className="h-px w-5 bg-emerald-400" />
        {children}
    </span>
);

const TelemetryStrip = () => (
    <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-xl border border-cyan-400/15 bg-[#030708]/70 font-mono text-[9px]">
        {[
            ['NODE', 'ESP32', 'text-cyan-300'],
            ['STREAM', 'LIVE', 'text-emerald-300'],
            ['STATUS', 'ONLINE', 'text-slate-200'],
        ].map(([label, value, color], index) => (
            <div key={label} className={`px-3 py-3 ${index < 2 ? 'border-r border-cyan-400/10' : ''}`}>
                <p className="text-slate-600">{label}</p>
                <p className={`mt-1 flex items-center gap-1 font-bold ${color}`}>
                    {index === 1 && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />}
                    {value}
                </p>
            </div>
        ))}
    </div>
);

const AllProjectsPage = () => {
    const projects = useMemo(() => projectData
        .map((project) => ({ ...project, image: imageMap[project.image] }))
        .sort((a, b) => a.id - b.id), []);

    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeId, setActiveId] = useState(null);
    const categories = ['All', 'IoT', 'Full Stack', 'Extension'];

    const filteredProjects = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return projects.filter((project) => {
            const matchesCategory = filter === 'All' || project.category === filter;
            const matchesSearch = !query || [project.title, project.description, ...project.tech]
                .some((value) => value.toLowerCase().includes(query));
            return matchesCategory && matchesSearch;
        });
    }, [filter, projects, searchQuery]);

    useEffect(() => {
        if (!filteredProjects.some((project) => project.id === activeId)) {
            setActiveId(filteredProjects[0]?.id ?? null);
        }
    }, [activeId, filteredProjects]);

    const activeProject = filteredProjects.find((project) => project.id === activeId);
    const activeStyle = activeProject ? categoryStyles[activeProject.category] : categoryStyles['Full Stack'];

    return (
        <div className="min-h-screen overflow-hidden bg-transparent text-slate-50 selection:bg-emerald-400/30 selection:text-emerald-100">
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#64748b0d_1px,transparent_1px),linear-gradient(to_bottom,#64748b0d_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_83%_12%,rgba(16,185,129,0.12),transparent_25%),radial-gradient(circle_at_8%_78%,rgba(34,211,238,0.09),transparent_30%),linear-gradient(#050202cc,#050202f2)]" />

            <main className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-14">
                <Link to="/" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to home
                </Link>

                <header className="mt-12 grid gap-8 border-b border-slate-800/80 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                        <SectionLabel>Selected work · system archive</SectionLabel>
                        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-100 md:text-6xl">
                            Projects built for the{' '}
                            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">real world.</span>
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                            Software, automation, and connected hardware—presented as the systems behind the interface.
                        </p>
                    </motion.div>
                    <div className="flex gap-6 rounded-2xl border border-slate-800 bg-[#0a0404]/70 px-5 py-4 font-mono text-xs backdrop-blur-sm">
                        <div><p className="text-slate-600">PROJECTS</p><p className="mt-1 text-xl font-bold text-slate-100">{projects.length}</p></div>
                        <div className="border-l border-slate-800 pl-6"><p className="text-slate-600">SYSTEMS</p><p className="mt-1 text-xl font-bold text-emerald-400">{new Set(projects.map((p) => p.category)).size}</p></div>
                    </div>
                </header>

                <section className="mt-8 flex flex-col gap-4 border-b border-slate-900 pb-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => {
                            const Icon = category === 'All' ? Sparkles : categoryStyles[category].icon;
                            const count = category === 'All' ? projects.length : projects.filter((p) => p.category === category).length;
                            const selected = filter === category;
                            return (
                                <button key={category} onClick={() => setFilter(category)} className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${selected ? category === 'All' ? 'border-emerald-400/50 bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/15' : categoryStyles[category].active : 'border-slate-800 bg-[#0a0404]/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}>
                                    <Icon className="h-3.5 w-3.5" /> {category === 'All' ? 'All work' : categoryStyles[category].label}
                                    <span className="rounded-md bg-black/15 px-1.5 py-0.5 font-mono text-[10px]">{count}</span>
                                </button>
                            );
                        })}
                    </div>
                    <label className="group relative w-full md:w-72">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 transition-colors group-focus-within:text-emerald-400" />
                        <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search systems..." className="w-full rounded-xl border border-slate-800 bg-[#0a0404]/60 py-2.5 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-500/10" />
                    </label>
                </section>

                {activeProject ? (
                    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
                        <aside className="space-y-3 lg:max-h-[710px] lg:overflow-y-auto lg:pr-2">
                            {filteredProjects.map((project, index) => {
                                const style = categoryStyles[project.category];
                                const Icon = style.icon;
                                const isActive = project.id === activeId;
                                return (
                                    <button key={project.id} onClick={() => setActiveId(project.id)} className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all ${isActive ? 'border-slate-700 bg-slate-900/70 shadow-xl shadow-black/20' : 'border-slate-900 bg-[#080303]/45 hover:border-slate-800 hover:bg-slate-900/40'}`}>
                                        <div className={`absolute inset-0 bg-gradient-to-r ${style.glow} opacity-0 transition-opacity ${isActive ? 'opacity-100' : 'group-hover:opacity-60'}`} />
                                        <div className="relative flex gap-4">
                                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${style.badge}`}><Icon className="h-5 w-5" /></div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-3"><h2 className="truncate text-sm font-bold text-slate-100">{project.title}</h2><ChevronRight className={`h-4 w-4 shrink-0 text-slate-600 transition-transform ${isActive ? 'translate-x-1 text-emerald-400' : ''}`} /></div>
                                                <div className="mt-2 flex items-center gap-2"><span className={`rounded-md border px-1.5 py-0.5 font-mono text-[9px] ${style.badge}`}>{project.category.toUpperCase()}</span><span className="font-mono text-[10px] text-slate-600">/{String(index + 1).padStart(2, '0')}</span></div>
                                                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{project.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </aside>

                        <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#090404]/75 p-5 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-7">
                            <div className={`pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-br ${activeStyle.glow} opacity-80`} />
                            <AnimatePresence mode="wait">
                                <motion.article key={activeProject.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }} className="relative">
                                    <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                                        <img src={activeProject.image} alt={`${activeProject.title} project preview`} className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050202]/85 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 flex items-center gap-2"><span className={`rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold ${activeStyle.badge}`}>{activeProject.category.toUpperCase()}</span>{activeProject.category === 'IoT' && <span className="flex items-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-300"><Radio className="h-3 w-3" /> LIVE TELEMETRY</span>}</div>
                                    </div>

                                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Project dossier</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-100 md:text-4xl">{activeProject.title}</h2></div>
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${activeStyle.badge}`}><activeStyle.icon className="h-6 w-6" /></div>
                                    </div>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{activeProject.description}</p>
                                    {activeProject.category === 'IoT' && <TelemetryStrip />}

                                    <div className="mt-7 border-t border-slate-800 pt-6"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Technology stack</p><div className="mt-3 flex flex-wrap gap-2">{activeProject.tech.map((technology) => <span key={technology} className={`rounded-lg border px-2.5 py-1.5 font-mono text-[10px] ${activeStyle.badge}`}>{technology}</span>)}</div></div>
                                    <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-800 pt-6">
                                        {activeProject.links?.code && <a href={activeProject.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 transition-colors hover:border-slate-600 hover:text-white"><Github className="h-4 w-4" /> Source code</a>}
                                        {activeProject.links?.demo && <a href={activeProject.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition-all hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/20"><ExternalLink className="h-4 w-4" /> View live project <ArrowUpRight className="h-3.5 w-3.5" /></a>}
                                    </div>
                                </motion.article>
                            </AnimatePresence>
                        </section>
                    </div>
                ) : (
                    <div className="py-28 text-center"><CircuitBoard className="mx-auto h-9 w-9 text-slate-700" /><h2 className="mt-4 text-xl font-bold text-slate-200">No systems found</h2><button onClick={() => { setFilter('All'); setSearchQuery(''); }} className="mt-3 text-sm font-medium text-emerald-400 hover:text-emerald-300">Clear filters</button></div>
                )}
            </main>
        </div>
    );
};

export default AllProjectsPage;
