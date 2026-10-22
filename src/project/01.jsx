import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData, shortTitle } from '../data/projects';
import ProjectModal from '../components/ProjectModal';
import { gsap, ScrollTrigger, SplitText, reducedMotion } from '../lib/scroll';

const ORDER = [
    'bunkmait', 'reelflow-pipeline', 'deepquery-agent', 'opencodebot', 'nexgenquery', 'nexgenstorage',
    'medscrapper', 'ai-filler-google-form', 'live-text-ocr', 'alpha-line-follower', 'fireshield',
];
const projects = ORDER.map((id) => projectsData.find((p) => p.id === id)).filter(Boolean);
const featured = projects.slice(0, 3);
const rest = projects.slice(3);
const pad = (n) => String(n).padStart(2, '0');

// douglus.site: each char cycles random letters before settling.
function scramble(el) {
    if (!el) return () => {};
    const text = el.dataset.text || '';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let frame = 0;
    const total = text.length + 3;
    const id = setInterval(() => {
        frame++;
        el.textContent = [...text].map((c, i) => (i < frame - 3 || c === ' ' ? c : i < frame ? letters[(Math.random() * 26) | 0] : '')).join('');
        if (frame >= total) {
            clearInterval(id);
            el.textContent = text;
        }
    }, 40);
    return () => clearInterval(id);
}

const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

// Stacked copies of project image cascading behind cursor on hover.
const ImageTrail = ({ image }) => {
    const rootRef = useRef(null);
    useLayoutEffect(() => {
        if (!image || reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
        const root = rootRef.current;
        if (!root) return;
        const copies = [...root.children];
        gsap.set(root, { x: mouse.x + 20, y: mouse.y + 20 });
        const xTo = gsap.quickTo(root, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(root, 'y', { duration: 0.5, ease: 'power3' });
        const move = (e) => { xTo(e.clientX + 20); yTo(e.clientY + 20); };
        window.addEventListener('mousemove', move);
        const tl = gsap.timeline();
        copies.forEach((c, i) => {
            const top = i === copies.length - 1;
            tl.fromTo(c,
                { opacity: 0, scale: gsap.utils.random(0.2, 1), xPercent: 15 * i, yPercent: -10 * i, rotation: gsap.utils.random(-7, 7) },
                { opacity: 1, scale: 1, xPercent: 0, yPercent: 0, rotation: 0, duration: top ? 0.8 : 0.55, ease: 'power4.out' }, i * 0.06);
            if (!top) tl.to(c, { opacity: 0, duration: 0.2 }, i * 0.06 + 0.45);
        });
        return () => {
            window.removeEventListener('mousemove', move);
            tl.kill();
        };
    }, [image]);

    if (!image) return null;
    return (
        <div ref={rootRef} className="pointer-events-none fixed left-0 top-0 z-40 h-[150px] w-[240px]" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
                <img key={i} src={image} alt="" className="absolute inset-0 h-full w-full object-cover rounded-lg shadow-2xl border border-white/20 opacity-0" />
            ))}
        </div>
    );
};

export const AllProjectsPage = () => {
    const rootRef = useRef(null);
    const barRef = useRef(null);
    const listRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const [trail, setTrail] = useState(null);
    const [activeId, setActiveId] = useState(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(barRef.current, {
                scaleY: 1, ease: 'none',
                scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
            });
            if (reducedMotion()) return;

            // Hero: masked lines rise in.
            gsap.utils.toArray('[data-hero]').forEach((hero) => {
                const lines = [...hero.querySelectorAll('[data-line]')];
                const para = hero.querySelector('[data-lines]');
                if (para) lines.push(...SplitText.create(para, { type: 'lines', mask: 'lines' }).lines);
                gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top 80%' } })
                    .from(hero.querySelectorAll('[data-index]'), { yPercent: 120, duration: 0.7, ease: 'power3.out' })
                    .from(lines, { yPercent: 110, scaleY: 1.1, duration: 1.1, ease: 'expo.out', stagger: 0.06 }, 0.05);
            });

            // Featured: reveal media container and split text
            gsap.utils.toArray('[data-feature]').forEach((row) => {
                const media = row.querySelector('[data-media]');
                const titleEl = row.querySelector('[data-title]');
                const title = titleEl ? SplitText.create(titleEl, { type: 'chars', mask: 'chars' }) : null;
                const desc = row.querySelector('[data-scramble]');
                let stopScramble = () => {};
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row, start: 'top 75%', toggleActions: 'play none none reverse',
                        onEnter: () => { stopScramble = scramble(desc); },
                    },
                })
                    .from(media, { opacity: 0, y: 30, scale: 0.96, duration: 0.9, ease: 'expo.out' });

                if (title && title.chars) {
                    tl.from(title.chars, { yPercent: -100, duration: 0.8, ease: 'expo.out', stagger: 0.04 }, 0.1);
                }

                ScrollTrigger.create({ trigger: row, start: 'top bottom', onLeaveBack: () => stopScramble() });
            });

            // Accordion rows reveal
            gsap.utils.toArray('[data-accordion-item]').forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: { trigger: item, start: 'top 95%', once: true },
                    opacity: 0,
                    y: 15,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            });

            gsap.fromTo('[data-apos]', { color: 'rgba(255,106,61,0)' }, {
                color: '#ff6a3d', duration: 1.2, ease: 'back.out(1.2)',
                scrollTrigger: { trigger: '[data-apos]', start: 'top 90%' },
            });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    // Scroll-driven active item detection: smoothly activates the project in view
    useEffect(() => {
        if (reducedMotion()) return;
        const rows = listRef.current?.querySelectorAll('[data-accordion-item]');
        if (!rows || rows.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.dataset.id;
                    if (id) {
                        setActiveId(id);
                    }
                }
            });
        }, {
            rootMargin: '-25% 0px -40% 0px',
            threshold: 0.1
        });

        rows.forEach((row) => observer.observe(row));
        return () => observer.disconnect();
    }, []);

    const toggleProject = (id) => {
        setActiveId((prev) => (prev === id ? null : id));
    };

    const hoverProps = (project) => ({
        onMouseEnter: () => setTrail(project.image),
        onMouseLeave: () => setTrail(null),
    });

    return (
        <div ref={rootRef} className="relative bg-ink text-paper">
            <div ref={barRef} className="fixed right-0 top-0 z-50 h-screen w-[2px] origin-top bg-orange" style={{ transform: 'scaleY(0)' }} aria-hidden="true" />

            {/* hero */}
            <header data-hero className="px-4 pb-16 pt-32 sm:px-8 sm:pt-40">
                <h1 className="mt-4 text-[clamp(3.5rem,12vw,10rem)] font-medium uppercase leading-[0.9] tracking-tight">
                    <span className="mask"><span data-line>All Projects</span></span>
                </h1>
                <div className="mt-12 grid gap-4 border-t border-paper/15 pt-6 md:grid-cols-[180px_1fr] md:gap-12">
                    <span className="label text-muted">Overview</span>
                    <p data-lines className="max-w-3xl text-lg leading-snug text-paper/80 sm:text-2xl">
                        Autonomous AI pipelines, Chrome extensions, full-stack products and robotics firmware: things I&apos;ve shipped from circuits to the cloud.
                    </p>
                </div>
            </header>

            {/* Top 3 Featured Projects (Untouched) */}
            {featured.map((project, i) => {
                const isEven = i % 2 === 0;
                return (
                    <article
                        key={project.id}
                        data-feature
                        className="border-t border-paper/10 px-4 py-16 sm:px-8 lg:py-24"
                    >
                        <div className={`mx-auto flex max-w-7xl flex-col gap-10 lg:gap-16 lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                            {/* Widescreen Interactive Media Preview */}
                            <div
                                data-media
                                data-cursor="view"
                                onClick={() => setSelected(project)}
                                className="relative w-full lg:w-[58%] group cursor-pointer"
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#090e19] border border-paper/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-orange/50 transition-all duration-500">
                                    {/* App / Browser Header Bar */}
                                    <div className="flex items-center justify-between px-4 py-2.5 bg-paper/[0.04] border-b border-paper/10">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2.5 w-2.5 rounded-full bg-paper/20 group-hover:bg-red-400/70 transition-colors" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-paper/20 group-hover:bg-amber-400/70 transition-colors" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-paper/20 group-hover:bg-emerald-400/70 transition-colors" />
                                        </div>
                                        <span className="font-mono text-[11px] text-muted tracking-wider truncate max-w-[220px]">
                                            {project.links?.demo ? new URL(project.links.demo).hostname : `${project.id}.dev`}
                                        </span>
                                        <span className="font-mono text-[10px] text-orange uppercase tracking-wider">{project.category}</span>
                                    </div>

                                    {/* Image Container with Full Visibility */}
                                    <div className="relative h-[calc(100%-37px)] w-full overflow-hidden bg-black/40">
                                        <img
                                            src={project.image}
                                            alt={shortTitle(project.title)}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-1.5 font-mono text-xs font-semibold text-ink shadow-lg">
                                                View Case Study →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text & Details Column */}
                            <div className="flex-1 max-w-xl">
                                <span className="font-mono text-sm text-muted">{pad(i + 1)} / {pad(featured.length)}</span>
                                <h2
                                    data-title
                                    {...hoverProps(project)}
                                    onClick={() => setSelected(project)}
                                    className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-medium uppercase leading-[0.95] tracking-tight transition-colors hover:text-orange cursor-pointer"
                                >
                                    {shortTitle(project.title)}
                                </h2>
                                <p data-scramble data-text={project.badge} className="mt-5 font-mono text-sm uppercase text-orange after:ml-1 after:inline-block after:h-[1em] after:w-[0.6em] after:translate-y-[2px] after:bg-orange">
                                    {project.badge}
                                </p>
                                <p className="mt-4 text-base sm:text-lg leading-relaxed text-paper/70">{project.tagline}</p>

                                {project.tech && (
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.tech.slice(0, 4).map((t) => (
                                            <span key={t} className="rounded-full border border-paper/15 bg-paper/5 px-3 py-1 font-mono text-xs text-paper/80">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <button
                                        onClick={() => setSelected(project)}
                                        className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 font-mono text-xs font-bold text-ink transition-all hover:bg-orange hover:text-white cursor-pointer shadow-md"
                                    >
                                        Case Study ↗
                                    </button>
                                    {project.links?.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-paper"
                                        >
                                            GitHub ↗
                                        </a>
                                    )}
                                    {project.links?.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-paper"
                                        >
                                            Live Demo ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}

            {/* Interactive Scroll-Reveal Accordion for Below Projects */}
            <section ref={listRef} className="border-t border-paper/15 px-4 pt-20 pb-36 sm:px-8 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-paper/15">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-orange">( Index &amp; Builds )</span>
                        <h2 className="mt-2 text-2xl sm:text-4xl font-medium uppercase tracking-tight text-paper">
                            More Projects
                        </h2>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono text-xs text-muted">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange"></span>
                        </span>
                        <span>Scroll or click to reveal · {rest.length} projects</span>
                    </div>
                </div>

                {/* The Interactive Accordion List */}
                <div className="divide-y divide-paper/10">
                    {rest.map((project, idx) => {
                        const isOpen = activeId === project.id;
                        return (
                            <div
                                key={project.id}
                                data-accordion-item
                                data-id={project.id}
                                className={`transition-colors duration-300 ${isOpen ? 'bg-paper/[0.02]' : 'hover:bg-paper/[0.01]'}`}
                            >
                                {/* Header / Name Bar */}
                                <button
                                    onClick={() => toggleProject(project.id)}
                                    className="flex w-full items-center justify-between gap-4 py-7 sm:py-9 text-left cursor-pointer group"
                                >
                                    <div className="flex items-baseline gap-4 sm:gap-8 min-w-0">
                                        <span className={`font-mono text-xs sm:text-sm transition-colors duration-300 ${isOpen ? 'text-orange font-bold' : 'text-muted'}`}>
                                            [{pad(idx + 4)}]
                                        </span>
                                        <h3
                                            {...hoverProps(project)}
                                            className={`text-[clamp(1.5rem,3.2vw,3rem)] font-medium uppercase leading-none tracking-tight transition-all duration-300 ${
                                                isOpen
                                                    ? 'text-orange translate-x-1 sm:translate-x-3'
                                                    : 'text-paper group-hover:text-orange group-hover:translate-x-1'
                                            }`}
                                        >
                                            {shortTitle(project.title)}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                                        <span className="hidden md:inline font-mono text-xs text-muted uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <span
                                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-sm font-mono transition-all duration-300 ${
                                                isOpen
                                                    ? 'rotate-45 bg-orange border-orange text-ink font-bold scale-110 shadow-lg'
                                                    : 'border-paper/20 text-paper/60 group-hover:border-orange group-hover:text-orange'
                                            }`}
                                        >
                                            +
                                        </span>
                                    </div>
                                </button>

                                {/* Expanding Drawer (when scroll on it then only show it) */}
                                <div
                                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100 pb-10 sm:pb-14' : 'grid-rows-[0fr] opacity-0 pb-0 pointer-events-none'
                                    }`}
                                >
                                    <div className="overflow-hidden min-h-0">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-paper/10 pt-8">
                                            {/* Left: 16:10 Project Showcase Media (7 cols) */}
                                            <div
                                                data-cursor="view"
                                                onClick={() => setSelected(project)}
                                                className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#090e19] border border-paper/15 shadow-[0_15px_40px_rgba(0,0,0,0.7)] group/img cursor-pointer transition-all duration-500 hover:border-orange/50"
                                            >
                                                {/* Browser Bezel */}
                                                <div className="flex items-center justify-between px-4 py-2.5 bg-paper/[0.04] border-b border-paper/10">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="h-2 w-2 rounded-full bg-paper/20 group-hover/img:bg-red-400/80 transition-colors" />
                                                        <span className="h-2 w-2 rounded-full bg-paper/20 group-hover/img:bg-amber-400/80 transition-colors" />
                                                        <span className="h-2 w-2 rounded-full bg-paper/20 group-hover/img:bg-emerald-400/80 transition-colors" />
                                                    </div>
                                                    <span className="font-mono text-[10px] text-muted tracking-wider truncate max-w-[200px]">
                                                        {project.links?.demo ? new URL(project.links.demo).hostname : `${project.id}.dev`}
                                                    </span>
                                                    <span className="font-mono text-[10px] text-orange uppercase tracking-wider">{project.category}</span>
                                                </div>

                                                {/* Image */}
                                                <div className="relative h-[calc(100%-35px)] w-full overflow-hidden bg-black/40">
                                                    <img
                                                        src={project.image}
                                                        alt={shortTitle(project.title)}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                                        <span className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-1.5 font-mono text-xs font-semibold text-ink shadow-lg">
                                                            View Case Study →
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Info, Highlights, Actions (5 cols) */}
                                            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                                                <div>
                                                    <span className="font-mono text-xs uppercase tracking-wider text-orange">
                                                        {project.badge}
                                                    </span>
                                                    <p className="mt-3 text-base sm:text-lg leading-relaxed text-paper/80 font-normal">
                                                        {project.tagline}
                                                    </p>

                                                    {project.tech && (
                                                        <div className="mt-6 flex flex-wrap gap-2">
                                                            {project.tech.slice(0, 5).map((t) => (
                                                                <span key={t} className="rounded-full border border-paper/15 bg-paper/5 px-3 py-1 font-mono text-xs text-paper/70">
                                                                    {t}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-paper/10">
                                                    <button
                                                        onClick={() => setSelected(project)}
                                                        className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 font-mono text-xs font-bold text-ink transition-all hover:bg-orange hover:text-white cursor-pointer shadow-md"
                                                    >
                                                        Case Study ↗
                                                    </button>
                                                    {project.links?.github && (
                                                        <a
                                                            href={project.links.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-paper"
                                                        >
                                                            GitHub ↗
                                                        </a>
                                                    )}
                                                    {project.links?.demo && (
                                                        <a
                                                            href={project.links.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-paper"
                                                        >
                                                            Live Demo ↗
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <footer className="border-t border-paper/10 px-4 pb-10 pt-20 sm:px-8">
                <Link to="/" state={{ scrollTo: 'contact' }} className="block text-[clamp(3.5rem,14vw,14rem)] font-medium uppercase leading-[0.85] tracking-tight transition-colors hover:text-orange">
                    Let<span data-apos>&apos;</span>s talk →
                </Link>
                <div className="mt-10 flex justify-between font-mono text-xs text-muted">
                    <Link to="/" className="hover:text-paper">← Home</Link>
                    <a href="https://github.com/iamadityamaurya" target="_blank" rel="noopener noreferrer" className="hover:text-paper">GitHub ↗</a>
                </div>
            </footer>

            <ImageTrail image={trail} />
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </div>
    );
};

export default AllProjectsPage;
