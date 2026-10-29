import { sfx } from '../lib/audio';
import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData, shortTitle } from '../data/projects';
import ProjectModal from '../components/ProjectModal';
import { gsap } from '../lib/scroll';

const HOME_PROJECTS = ['bunkmait', 'reelflow-pipeline', 'deepquery-agent', 'opencodebot'];

// Pinned list (alejandroha.com "services" technique): each scroll step collapses the current
// panel, slides its image out to the right, wipes the next image in and moves the list up a row.
const NAV_H = 80; // pinned stage starts below the fixed nav

export const ProjectsPage = () => {
    const [selected, setSelected] = useState(null);
    const pinRef = useRef(null);
    const projects = HOME_PROJECTS.map((id) => projectsData.find((p) => p.id === id)).filter(Boolean);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 992px) and (prefers-reduced-motion: no-preference)', () => {
            const pin = pinRef.current;
            const rows = gsap.utils.toArray('[data-row]', pin);
            const panels = gsap.utils.toArray('[data-panel]', pin);
            const wraps = gsap.utils.toArray('[data-wrap]', pin);
            const descs = gsap.utils.toArray('[data-desc]', pin);
            const list = pin.querySelector('[data-list]');
            const n = panels.length;
            const rowH = () => rows[0].offsetHeight;
            const panelH = () => window.innerHeight - NAV_H - rowH() * 2;

            gsap.set(panels, { height: (i) => (i === 0 ? panelH() : 0) });
            gsap.set(wraps, { left: (i) => (i === 0 ? '29%' : '0%'), width: (i) => (i === 0 ? '71%' : '0%') });
            gsap.set(descs, { opacity: (i) => (i === 0 ? 1 : 0) });

            const tl = gsap.timeline({
                defaults: { ease: 'none', duration: 1 },
                scrollTrigger: {
                    trigger: pin,
                    pin: true,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * (n - 1)}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
            for (let i = 0; i < n - 1; i++) {
                tl.to(panels[i], { height: 0 }, i)
                    .to(panels[i + 1], { height: panelH }, i)
                    .to(wraps[i], { left: '100%', width: '0%' }, i)
                    .fromTo(wraps[i + 1], { left: '0%', width: '0%' }, { left: '29%', width: '71%' }, i)
                    .to(descs[i], { opacity: 0, duration: 0.4 }, i)
                    .to(descs[i + 1], { opacity: 1, duration: 0.4 }, i + 0.6)
                    .to(list, { y: () => -rowH() * i }, i);
            }
        });
        return () => mm.revert();
    }, []);

    return (
        <section id="projects" className="relative bg-ink text-paper">
            <div className="flex items-end justify-between px-4 pb-8 pt-24 sm:px-8 sm:pt-32">
                <div>
                    <p className="label text-muted">( Selected work )</p>
                    <h2 className="display mt-4 text-[clamp(2.5rem,8vw,7rem)]">Builds</h2>
                </div>
                <Link to="/projects" className="label pb-2 text-paper/80 transition-colors hover:text-accent">
                    All projects ({projectsData.length}) →
                </Link>
            </div>

            <div ref={pinRef} className="relative pin:h-screen pin:pt-20">
                <div className="h-full overflow-hidden">
                <div data-list>
                    {projects.map((project, i) => (
                        <article key={project.id}>
                            <button
                                data-row
                                onClick={() => {
                                    sfx();
                                    setSelected(project);
                                }}
                                onMouseEnter={() => sfx()}
                                className="flex w-full items-center justify-between gap-6 border-t border-paper/20 px-4 py-5 text-left sm:px-8 cursor-pointer group hover:bg-white/[0.015] transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-sm text-muted sm:text-base">[{String(i + 1).padStart(2, '0')}]</span>
                                    <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        View case study →
                                    </span>
                                </div>
                                <span className="display truncate text-right text-[clamp(1.6rem,4.4vw,4rem)] transition-colors group-hover:text-accent">
                                    {shortTitle(project.title)}
                                </span>
                            </button>
                            <div data-panel className="relative overflow-hidden nopin:px-4 nopin:pb-10">
                                <p data-desc className="max-w-md text-sm leading-relaxed text-paper/70 pin:absolute pin:bottom-8 pin:left-8 pin:w-[25%] nopin:mb-5">
                                    <span className="label mb-3 block text-accent">{project.category}</span>
                                    {project.tagline}
                                </p>
                                <div
                                    data-wrap
                                    data-cursor="view"
                                    onClick={() => setSelected(project)}
                                    className="overflow-hidden pin:absolute pin:top-0 pin:h-full nopin:aspect-video cursor-pointer"
                                >
                                    <img
                                        src={project.image}
                                        alt={shortTitle(project.title)}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover pin:absolute pin:right-0 pin:top-0 pin:w-[71vw] transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                </div>
            </div>

            <ProjectModal project={selected} onClose={() => setSelected(null)} />
        </section>
    );
};

export default ProjectsPage;
