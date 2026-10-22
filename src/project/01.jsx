import { useLayoutEffect, useRef, useState } from 'react';
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

// Desktop slots for the asymmetric grid (3 per 100svh row, every other row mirrored).
const SLOTS = [
    [{ left: '0%', top: '4vh', width: '32%', h: '62vh' }, { left: '40%', top: '24vh', width: '25%', h: '48vh' }, { right: '0%', top: '8vh', width: '15%', h: '26vh' }],
    [{ left: '0%', top: '30vh', width: '15%', h: '26vh' }, { left: '22%', top: '6vh', width: '25%', h: '48vh' }, { right: '0%', top: '14vh', width: '32%', h: '62vh' }],
];

// douglus.site: each char cycles random letters before settling.
function scramble(el) {
    const text = el.dataset.text;
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

// Ten stacked copies of a project image that cascade in behind the cursor on title hover.
const ImageTrail = ({ image }) => {
    const rootRef = useRef(null);
    useLayoutEffect(() => {
        if (!image || reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
        const root = rootRef.current;
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
        <div ref={rootRef} className="pointer-events-none fixed left-0 top-0 z-40 h-[150px] w-[200px]" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
                <img key={i} src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-0" />
            ))}
        </div>
    );
};

export const AllProjectsPage = () => {
    const rootRef = useRef(null);
    const barRef = useRef(null);
    const [selected, setSelected] = useState(null);
    const [trail, setTrail] = useState(null);

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

            // Featured: media grows in while the photo settles, title chars drop in, descriptor scrambles.
            gsap.utils.toArray('[data-feature]').forEach((row) => {
                const media = row.querySelector('[data-media]');
                const img = media.querySelector('img');
                const title = SplitText.create(row.querySelector('[data-title]'), { type: 'chars', mask: 'chars' });
                const desc = row.querySelector('[data-scramble]');
                let stopScramble = () => {};
                gsap.timeline({
                    scrollTrigger: {
                        trigger: row, start: 'top 72%', toggleActions: 'play none none reverse',
                        onEnter: () => { stopScramble = scramble(desc); },
                    },
                })
                    .from(media, { scale: 0.6, opacity: 0, duration: 1, ease: 'expo.out' })
                    .from(img, { scale: 1.4, duration: 1.4, ease: 'expo.out' }, 0)
                    .from(title.chars, { yPercent: -100, duration: 0.8, ease: 'expo.out', stagger: 0.05 }, 0.15);
                gsap.fromTo(img, { yPercent: -8 }, {
                    yPercent: 8, ease: 'none',
                    scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
                });
                ScrollTrigger.create({ trigger: row, start: 'top bottom', onLeaveBack: () => stopScramble() });
            });

            // Grid: per-column stagger, second row of each pair runs in reverse.
            gsap.utils.toArray('[data-item]').forEach((item) => {
                const col = Number(item.dataset.col);
                const delay = item.dataset.mirror === '1' ? (2 - col) * 0.18 + 0.25 : col * 0.18;
                const media = item.querySelector('[data-media]');
                gsap.timeline({ delay, scrollTrigger: { trigger: item, start: 'top 85%', once: true } })
                    .from(media, { opacity: 0, y: -24, scale: 0.92, duration: 1, ease: 'expo.out' })
                    .from(media.querySelector('img'), { scale: 1.08, duration: 1, ease: 'expo.out' }, 0)
                    .from(item.querySelectorAll('[data-text]'), { y: 40, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08 }, 0.2);
            });

            gsap.fromTo('[data-apos]', { color: 'rgba(255,106,61,0)' }, {
                color: '#ff6a3d', duration: 1.2, ease: 'back.out(1.2)',
                scrollTrigger: { trigger: '[data-apos]', start: 'top 90%' },
            });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    const hoverProps = (project) => ({
        onMouseEnter: () => setTrail(project.image),
        onMouseLeave: () => setTrail(null),
    });

    return (
        <div ref={rootRef} className="relative bg-ink text-paper">
            <div ref={barRef} className="fixed right-0 top-0 z-50 h-screen w-[2px] origin-top bg-orange" style={{ transform: 'scaleY(0)' }} aria-hidden="true" />

            {/* 01 / featured */}
            <header data-hero className="px-4 pb-16 pt-32 sm:px-8 sm:pt-40">
                <div className="mask"><span data-index className="font-mono text-sm text-muted">01/</span></div>
                <h1 className="mt-4 text-[clamp(3.5rem,12vw,10rem)] font-medium uppercase leading-[0.9] tracking-tight">
                    <span className="mask"><span data-line>Projects</span></span>
                    <span className="mask"><span data-line className="text-paper/25">selected<sup className="ml-2 align-top font-mono text-[0.18em] text-orange">{pad(featured.length)}</sup></span></span>
                </h1>
                <div className="mt-12 grid gap-4 border-t border-paper/15 pt-6 md:grid-cols-[180px_1fr] md:gap-12">
                    <span className="label text-muted">Overview</span>
                    <p data-lines className="max-w-3xl text-lg leading-snug text-paper/80 sm:text-2xl">
                        Autonomous AI pipelines, Chrome extensions, full-stack products and robotics firmware: things I&apos;ve shipped from circuits to the cloud.
                    </p>
                </div>
            </header>

            {featured.map((project, i) => (
                <article key={project.id} data-feature className="flex min-h-[100svh] flex-col gap-8 border-t border-paper/10 px-4 py-16 sm:px-8 md:flex-row md:items-center">
                    <div
                        data-media
                        data-cursor="view"
                        onClick={() => setSelected(project)}
                        className="relative h-[55vh] w-full overflow-hidden md:h-[80vh] md:w-[40vw] cursor-pointer"
                    >
                        <img src={project.image} alt={shortTitle(project.title)} loading="lazy" decoding="async" className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <span className="font-mono text-sm text-muted">{pad(i + 1)} / {pad(featured.length)}</span>
                        <h2
                            data-title
                            {...hoverProps(project)}
                            onClick={() => setSelected(project)}
                            className="mt-4 text-[clamp(3rem,8vw,8rem)] font-medium uppercase leading-[0.9] tracking-tight transition-colors hover:text-orange cursor-pointer"
                        >
                            {shortTitle(project.title)}
                        </h2>
                        <p data-scramble data-text={project.badge} className="mt-6 font-mono text-sm uppercase text-orange after:ml-1 after:inline-block after:h-[1em] after:w-[0.6em] after:translate-y-[2px] after:bg-orange">
                            {project.badge}
                        </p>
                        <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/60">{project.tagline}</p>
                    </div>
                </article>
            ))}

            {/* 02 / all projects */}
            <header data-hero className="border-t border-paper/10 px-4 pb-12 pt-32 sm:px-8">
                <div className="mask"><span data-index className="font-mono text-sm text-muted">02/</span></div>
                <h2 className="mt-4 text-[clamp(3rem,10vw,9rem)] font-medium uppercase leading-[0.9] tracking-tight">
                    <span className="mask"><span data-line>All projects<sup className="ml-2 align-top font-mono text-[0.18em] text-orange">{pad(rest.length)}</sup></span></span>
                </h2>
            </header>

            <div className="grid grid-cols-1 gap-x-6 gap-y-14 px-4 pb-32 min-[561px]:grid-cols-2 sm:px-8 min-[992px]:block">
                {Array.from({ length: Math.ceil(rest.length / 3) }, (_, r) => (
                    <div key={r} className="contents min-[992px]:relative min-[992px]:block min-[992px]:h-[100svh]">
                        {rest.slice(r * 3, r * 3 + 3).map((project, col) => {
                            const slot = SLOTS[r % 2][col];
                            const idx = r * 3 + col + 1;
                            return (
                                <article
                                    key={project.id}
                                    data-item
                                    data-col={col}
                                    data-mirror={r % 2}
                                    className="grid-slot"
                                    style={{ '--l': slot.left ?? 'auto', '--r': slot.right ?? 'auto', '--t': slot.top, '--w': slot.width, '--h': slot.h }}
                                >
                                    <div data-text className="mb-3 flex items-baseline justify-between gap-4 font-mono text-xs text-muted">
                                        <span>{pad(idx)} / {pad(rest.length)}</span>
                                        <span className="truncate text-right uppercase">{project.category}</span>
                                    </div>
                                    <div data-media data-cursor="view" onClick={() => setSelected(project)} className="grid-media overflow-hidden cursor-pointer">
                                        <img src={project.image} alt={shortTitle(project.title)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                    </div>
                                    <h3
                                        data-text
                                        {...hoverProps(project)}
                                        onClick={() => setSelected(project)}
                                        className="mt-4 border-b border-paper/10 pb-3 text-lg font-medium uppercase leading-tight transition-colors hover:text-orange cursor-pointer"
                                    >
                                        {shortTitle(project.title)}
                                    </h3>
                                    <p data-text className="mt-3 line-clamp-2 text-sm text-paper/50">{project.badge}</p>
                                </article>
                            );
                        })}
                    </div>
                ))}
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

            <style>{`
                .grid-media { aspect-ratio: 1 / 1; }
                @media (min-width: 992px) {
                    .grid-slot { position: absolute; left: var(--l); right: var(--r); top: var(--t); width: var(--w); }
                    .grid-media { aspect-ratio: auto; height: var(--h); }
                }
            `}</style>

            <ImageTrail image={trail} />
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </div>
    );
};

export default AllProjectsPage;
