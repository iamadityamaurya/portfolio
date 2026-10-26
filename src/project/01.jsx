import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData, shortTitle } from '../data/projects';
import ProjectModal from '../components/ProjectModal';
import { gsap, ScrollTrigger, SplitText, reducedMotion } from '../lib/scroll';

const ORDER = [
    'bunkmait',
    'reelflow-pipeline',
    'deepquery-agent',
    'opencodebot',
    'nexgenquery',
    'nexgenstorage',
    'medscrapper',
    'ai-filler-google-form',
    'live-text-ocr',
    'alpha-line-follower',
    'fireshield',
    'drive-stream-downloader',
    'restocker',
    'addybites',
    'motia-onboarding',
    'portfolio-v1',
];

const projects = ORDER.map((id) => projectsData.find((p) => p.id === id)).filter(Boolean);

// Text scramble effect for project badges
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

export const AllProjectsPage = () => {
    const rootRef = useRef(null);
    const barRef = useRef(null);
    const [selected, setSelected] = useState(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(barRef.current, {
                scaleY: 1, ease: 'none',
                scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
            });
            if (reducedMotion()) return;

            // Hero: masked lines rise in
            gsap.utils.toArray('[data-hero]').forEach((hero) => {
                const lines = [...hero.querySelectorAll('[data-line]')];
                const para = hero.querySelector('[data-lines]');
                if (para) lines.push(...SplitText.create(para, { type: 'lines', mask: 'lines' }).lines);
                gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top 80%' } })
                    .from(hero.querySelectorAll('[data-index]'), { yPercent: 120, duration: 0.7, ease: 'power3.out' })
                    .from(lines, { yPercent: 110, scaleY: 1.1, duration: 1.1, ease: 'expo.out', stagger: 0.06 }, 0.05);
            });

            // Featured projects: reveal media container and split text for all cards
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

            gsap.fromTo('[data-apos]', { color: 'rgba(255,106,61,0)' }, {
                color: '#ff6a3d', duration: 1.2, ease: 'back.out(1.2)',
                scrollTrigger: { trigger: '[data-apos]', start: 'top 90%' },
            });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={rootRef} className="relative bg-ink text-paper">
            <div ref={barRef} className="fixed right-0 top-0 z-50 h-screen w-[2px] origin-top bg-orange" style={{ transform: 'scaleY(0)' }} aria-hidden="true" />

            {/* Hero */}
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

            {/* All Projects Showcase (Alternating Widescreen Layout) */}
            <div className="border-b border-paper/10">
                {projects.map((project, i) => {
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
                                    <h2
                                        data-title
                                        onClick={() => setSelected(project)}
                                        className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium uppercase leading-[0.95] tracking-tight transition-colors hover:text-orange cursor-pointer"
                                    >
                                        {shortTitle(project.title)}
                                    </h2>
                                    <p data-scramble data-text={project.badge} className="mt-5 font-mono text-sm uppercase text-orange after:ml-1 after:inline-block after:h-[1em] after:w-[0.6em] after:translate-y-[2px] after:bg-orange">
                                        {project.badge}
                                    </p>
                                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-paper/70">{project.tagline}</p>

                                    {project.tech && (
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {project.tech.slice(0, 5).map((t) => (
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
            </div>

            <footer className="border-t border-paper/10 px-4 pb-10 pt-20 sm:px-8">
                <Link to="/" state={{ scrollTo: 'contact' }} className="block text-[clamp(3.5rem,14vw,14rem)] font-medium uppercase leading-[0.85] tracking-tight transition-colors hover:text-orange">
                    Let<span data-apos>&apos;</span>s talk →
                </Link>
                <div className="mt-10 flex justify-between font-mono text-xs text-muted">
                    <Link to="/" className="hover:text-paper">← Home</Link>
                    <a href="https://github.com/iamadityamaurya" target="_blank" rel="noopener noreferrer" className="hover:text-paper">GitHub ↗</a>
                </div>
            </footer>

            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </div>
    );
};

export default AllProjectsPage;
