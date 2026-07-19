import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowUpRight, CircuitBoard, Cpu, ExternalLink,
    Github, Search, Sparkles
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
    IoT: { icon: CircuitBoard, label: 'Hardware + IoT', badge: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300', active: 'border-cyan-400/50 bg-cyan-400/10 text-cyan-100' },
    Extension: { icon: Sparkles, label: 'Extension', badge: 'border-violet-400/25 bg-violet-400/10 text-violet-300', active: 'border-violet-400/50 bg-violet-400/10 text-violet-100' },
    'Full Stack': { icon: Cpu, label: 'Full Stack', badge: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300', active: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-100' },
};

const ProjectActions = ({ links = {} }) => (
    (links.code || links.demo) && (
        <div className="mt-6 flex flex-wrap gap-3">
            {links.code && (
                <a href={links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-700 px-4 py-2.5 text-xs font-bold text-slate-100 transition-colors hover:bg-slate-600">
                    <Github className="h-4 w-4" /> Source code <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
            )}
            {links.demo && (
                <a href={links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition-all hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-400/20">
                    <ExternalLink className="h-4 w-4" /> View live <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
            )}
        </div>
    )
);

const ProjectRow = ({ project, index }) => {
    const reversed = index % 2 !== 0;
    const style = categoryStyles[project.category] ?? categoryStyles['Full Stack'];
    const Icon = style.icon;

    return (
        <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="group relative overflow-hidden rounded-[28px] border border-slate-700/80 bg-slate-800/80 p-5 shadow-2xl shadow-black/20 md:p-8"
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] to-transparent" />
            <div className={`relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold ${style.badge}`}><Icon className="h-3.5 w-3.5" /> {style.label}</span>
                        <span className="font-mono text-[10px] text-slate-600">PROJECT / {String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl">{project.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-400 md:text-base">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {project.tech.map((technology) => (
                            <span key={technology} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-700/70 px-2.5 py-1.5 font-mono text-[10px] font-medium text-slate-200">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{technology}
                            </span>
                        ))}
                    </div>
                    <ProjectActions links={project.links} />
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-700/70 shadow-xl shadow-black/25">
                    <div className="aspect-[16/10] overflow-hidden">
                        <img
                            src={project.image}
                            alt={`${project.title} project preview`}
                            loading="lazy"
                            className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.025] ${project.category === 'IoT' ? 'object-contain bg-slate-700 p-2' : 'object-cover'}`}
                        />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.02]" />
                </div>
            </div>
        </motion.article>
    );
};

const AllProjectsPage = () => {
    const projects = useMemo(() => projectData
        .map((project) => ({ ...project, image: imageMap[project.image] }))
        .sort((a, b) => a.id - b.id), []);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
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

    return (
        <div className="min-h-screen overflow-hidden bg-transparent text-slate-50 selection:bg-emerald-400/30 selection:text-emerald-100">
            <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#64748b0b_1px,transparent_1px),linear-gradient(to_bottom,#64748b0b_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(16,185,129,0.10),transparent_24%),radial-gradient(circle_at_12%_78%,rgba(56,189,248,0.10),transparent_32%),linear-gradient(#111827d9,#0f172af2)]" />

            <main className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-14">
                <Link to="/" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"><ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to home</Link>

                <header className="mt-12 border-b border-slate-800/80 pb-10 text-center">
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-100 md:text-6xl">Projects I’ve <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">built.</span></h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400">A collection of full-stack products, browser tools, connected hardware, and experiments built to solve real problems.</p>
                </header>

                <section className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => {
                            const Icon = category === 'All' ? Sparkles : categoryStyles[category].icon;
                            const count = category === 'All' ? projects.length : projects.filter((project) => project.category === category).length;
                            const selected = filter === category;
                            return <button key={category} onClick={() => setFilter(category)} className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${selected ? category === 'All' ? 'border-emerald-400 bg-emerald-400 text-slate-950' : categoryStyles[category].active : 'border-slate-700 bg-slate-800/90 text-slate-300 hover:border-slate-600 hover:text-slate-100'}`}><Icon className="h-3.5 w-3.5" />{category === 'All' ? 'All projects' : categoryStyles[category].label}<span className="rounded bg-black/15 px-1.5 py-0.5 font-mono text-[10px]">{count}</span></button>;
                        })}
                    </div>
                    <label className="group relative w-full md:w-72"><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search projects..." className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 pl-10 pr-4 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-500 focus:border-emerald-400/50 focus:ring-4 focus:ring-emerald-500/10" /></label>
                </section>

                {filteredProjects.length > 0 ? <section className="mt-8 space-y-7">{filteredProjects.map((project, index) => <ProjectRow key={project.id} project={project} index={index} />)}</section> : <section className="py-28 text-center"><Search className="mx-auto h-8 w-8 text-slate-700" /><h2 className="mt-4 text-xl font-bold text-slate-200">No projects found</h2><button onClick={() => { setFilter('All'); setSearchQuery(''); }} className="mt-3 text-sm font-medium text-emerald-400 hover:text-emerald-300">Clear filters</button></section>}
            </main>
        </div>
    );
};

export default AllProjectsPage;
