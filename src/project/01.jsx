import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, X, ExternalLink, ArrowUpRight, Github, 
  Download, Check, Copy, Sparkles, Layers, Terminal, 
  CheckCircle2, Globe, Lock, ChevronRight, SlidersHorizontal, Grid
} from 'lucide-react';
import { projectsData, shortTitle } from '../data/projects';
import { gsap, ScrollTrigger, SplitText, reducedMotion, lenis } from '../lib/scroll';

const ORDER = [
  'openwhispr',
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

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'android', label: 'Android & AI' },
  { id: 'extension', label: 'Extensions & AI' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'iot', label: 'IoT & Robotics' },
];

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
  const activeRailCardRef = useRef(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selected, setSelected] = useState(() => {
    const viewParam = searchParams.get('view');
    if (viewParam) return projects.find((p) => p.id === viewParam) || null;
    if (location.state?.projectId) return projects.find((p) => p.id === location.state.projectId) || null;
    return null;
  });

  const [copied, setCopied] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sync selection with URL search parameters
  const selectProject = (project) => {
    setSelected(project);
    if (project) {
      setSearchParams({ view: project.id }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  // Handle location.state passing a projectId (e.g. from Home page or Navbar)
  useEffect(() => {
    if (location.state?.projectId) {
      const found = projects.find((p) => p.id === location.state.projectId);
      if (found) selectProject(found);
    }
  }, [location.state]);

  // Lock body scroll and pause Lenis when in split view
  useEffect(() => {
    if (selected) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [selected]);

  // Keyboard navigation: Escape to close, Left/Right or Up/Down arrows to cycle
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selected) return;
      if (e.key === 'Escape') {
        selectProject(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const idx = projects.findIndex((p) => p.id === selected.id);
        if (idx !== -1 && idx < projects.length - 1) {
          selectProject(projects[idx + 1]);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const idx = projects.findIndex((p) => p.id === selected.id);
        if (idx > 0) {
          selectProject(projects[idx - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  // Auto-scroll the active card in the left rail into view
  useEffect(() => {
    if (selected && activeRailCardRef.current) {
      activeRailCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selected?.id]);

  // GSAP animations for the full catalog view
  useLayoutEffect(() => {
    if (selected) return; // Don't run catalog GSAP when in split view

    const ctx = gsap.context(() => {
      if (barRef.current && rootRef.current) {
        gsap.to(barRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
        });
      }
      if (reducedMotion()) return;

      // Hero animation
      gsap.utils.toArray('[data-hero]').forEach((hero) => {
        const lines = [...hero.querySelectorAll('[data-line]')];
        const para = hero.querySelector('[data-lines]');
        if (para) lines.push(...SplitText.create(para, { type: 'lines', mask: 'lines' }).lines);
        gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top 80%' } })
          .from(hero.querySelectorAll('[data-index]'), { yPercent: 120, duration: 0.7, ease: 'power3.out' })
          .from(lines, { yPercent: 110, scaleY: 1.1, duration: 1.1, ease: 'expo.out', stagger: 0.06 }, 0.05);
      });

      // Featured projects scroll reveals
      gsap.utils.toArray('[data-feature]').forEach((row) => {
        const media = row.querySelector('[data-media]');
        const titleEl = row.querySelector('[data-title]');
        const title = titleEl ? SplitText.create(titleEl, { type: 'chars', mask: 'chars' }) : null;
        const desc = row.querySelector('[data-scramble]');
        let stopScramble = () => {};
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
            onEnter: () => { stopScramble = scramble(desc); },
          },
        }).from(media, { opacity: 0, y: 30, scale: 0.96, duration: 0.9, ease: 'expo.out' });

        if (title && title.chars) {
          tl.from(title.chars, { yPercent: -100, duration: 0.8, ease: 'expo.out', stagger: 0.04 }, 0.1);
        }

        ScrollTrigger.create({ trigger: row, start: 'top bottom', onLeaveBack: () => stopScramble() });
      });

      gsap.fromTo('[data-apos]', { color: 'rgba(255,106,61,0)' }, {
        color: '#ff6a3d',
        duration: 1.2,
        ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '[data-apos]', start: 'top 90%' },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [selected]);

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredProjects = categoryFilter === 'all'
    ? projects
    : projects.filter((p) => p.categorySlug === categoryFilter);

  const selectedIndex = selected ? projects.findIndex((p) => p.id === selected.id) : -1;
  const prevProject = selectedIndex > 0 ? projects[selectedIndex - 1] : null;
  const nextProject = selectedIndex !== -1 && selectedIndex < projects.length - 1 ? projects[selectedIndex + 1] : null;

  return (
    <div ref={rootRef} className="relative min-h-screen bg-ink text-paper">
      {/* Scroll indicator bar */}
      <div
        ref={barRef}
        className="fixed right-0 top-0 z-50 h-screen w-[2px] origin-top bg-orange"
        style={{ transform: 'scaleY(0)' }}
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {!selected ? (
          /* ========================================================= */
          /* 1. FULL CATALOG SHOWCASE VIEW                             */
          /* ========================================================= */
          <motion.div
            key="catalog-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero */}
            <header data-hero className="px-4 pb-16 pt-32 sm:px-8 sm:pt-40">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-orange font-semibold">
                  ( Portolio Directory // {projects.length} Works )
                </span>
                <span className="font-mono text-xs text-muted">
                  Click any project to enter split-screen case study
                </span>
              </div>
              <h1 className="mt-4 text-[clamp(3.5rem,12vw,10rem)] font-medium uppercase leading-[0.9] tracking-tight">
                <span className="mask"><span data-line>All Projects</span></span>
              </h1>
              <div className="mt-12 grid gap-4 border-t border-paper/15 pt-6 md:grid-cols-[180px_1fr] md:gap-12">
                <span className="label text-muted">Overview</span>
                <p data-lines className="max-w-3xl text-lg leading-snug text-paper/80 sm:text-2xl">
                  Native Android voice companions, autonomous AI video studios, Chrome extensions, full-stack architectures, and hardware firmware.
                </p>
              </div>

              {/* Category Filter Bar */}
              <div className="mt-10 flex flex-wrap items-center gap-2 pt-2">
                <span className="font-mono text-xs text-muted mr-2 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filter:
                </span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-orange text-ink font-bold shadow-md shadow-orange/20'
                        : 'border border-paper/15 bg-paper/5 text-paper/70 hover:text-paper hover:border-paper/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </header>

            {/* Alternating Widescreen Layout */}
            <div className="border-b border-paper/10">
              {filteredProjects.map((project, i) => {
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
                        onClick={() => selectProject(project)}
                        className="relative w-full lg:w-[58%] group cursor-pointer"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#090e19] border border-paper/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-orange/60 transition-all duration-500">
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                              <span className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-1.5 font-mono text-xs font-semibold text-ink shadow-lg">
                                Open Split Case Study →
                              </span>
                              <span className="font-mono text-xs text-paper/80 hidden sm:inline">
                                {project.stat || 'Production Ready'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Text & Details Column */}
                      <div className="flex-1 max-w-xl">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-orange uppercase tracking-wider font-semibold">
                            [ 0{i + 1} // {project.category} ]
                          </span>
                          {project.stat && (
                            <span className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[10px] text-emerald-400">
                              {project.stat}
                            </span>
                          )}
                        </div>
                        <h2
                          data-title
                          onClick={() => selectProject(project)}
                          className="mt-3 text-[clamp(2.5rem,6vw,5.5rem)] font-medium uppercase leading-[0.95] tracking-tight transition-colors hover:text-orange cursor-pointer"
                        >
                          {shortTitle(project.title)}
                        </h2>
                        <p
                          data-scramble
                          data-text={project.badge}
                          className="mt-4 font-mono text-sm uppercase text-orange after:ml-1 after:inline-block after:h-[1em] after:w-[0.6em] after:translate-y-[2px] after:bg-orange"
                        >
                          {project.badge}
                        </p>
                        <p className="mt-4 text-base sm:text-lg leading-relaxed text-paper/70">
                          {project.tagline}
                        </p>

                        {project.tech && (
                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.tech.slice(0, 6).map((t) => (
                              <span key={t} className="rounded-full border border-paper/15 bg-paper/5 px-3 py-1 font-mono text-xs text-paper/80">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                          <button
                            onClick={() => selectProject(project)}
                            className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-2.5 font-mono text-xs font-bold text-ink transition-all hover:bg-orange hover:text-white cursor-pointer shadow-md hover:scale-[1.02]"
                          >
                            <span>Open Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          {project.links?.apk && (
                            <a
                              href={project.links.apk}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold transition-all"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download APK</span>
                            </a>
                          )}
                          {project.links?.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-paper"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>GitHub</span>
                            </a>
                          )}
                          {project.links?.demo && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-paper"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live App</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Footer */}
            <footer className="border-t border-paper/10 px-4 pb-10 pt-20 sm:px-8">
              <Link to="/" state={{ scrollTo: 'contact' }} className="block text-[clamp(3.5rem,14vw,14rem)] font-medium uppercase leading-[0.85] tracking-tight transition-colors hover:text-orange">
                Let<span data-apos>&apos;</span>s talk →
              </Link>
              <div className="mt-10 flex justify-between font-mono text-xs text-muted">
                <Link to="/" className="hover:text-paper">← Home</Link>
                <a href="https://github.com/iamadityamaurya" target="_blank" rel="noopener noreferrer" className="hover:text-paper">GitHub ↗</a>
              </div>
            </footer>
          </motion.div>
        ) : (
          /* ========================================================= */
          /* 2. SPLIT-SCREEN MASTER/DETAIL IN-PAGE WORKSPACE          */
          /* ========================================================= */
          <motion.div
            key="split-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] sm:top-[80px] z-40 flex flex-col lg:flex-row bg-[#08090d] text-paper overflow-hidden"
          >
            {/* ---------------------------------------------------- */}
            {/* LEFT COLUMN: PROJECTS RAIL (Goes to the side)        */}
            {/* ---------------------------------------------------- */}
            <motion.aside
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[380px] xl:w-[440px] h-[38vh] lg:h-full border-b lg:border-b-0 lg:border-r border-paper/10 flex flex-col bg-[#06080c] shrink-0 z-10"
            >
              {/* Top Rail Control Bar */}
              <div className="p-4 sm:p-5 border-b border-paper/10 flex items-center justify-between bg-[#06080c]/95 backdrop-blur-md shrink-0">
                <button
                  onClick={() => selectProject(null)}
                  className="group inline-flex items-center gap-2 font-mono text-xs font-semibold text-paper/80 hover:text-orange transition-colors cursor-pointer"
                  title="Close split view and return to full catalog (ESC)"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>All Projects</span>
                  <kbd className="hidden sm:inline-block ml-1 font-mono text-[10px] text-muted border border-paper/15 rounded px-1.5 py-0.2 uppercase">
                    ESC
                  </kbd>
                </button>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-orange font-semibold">
                    {String(selectedIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => selectProject(null)}
                    className="p-1.5 rounded-full border border-paper/15 text-muted hover:text-paper hover:border-orange transition-all cursor-pointer"
                    aria-label="Close detail pane"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Category Quick Filter */}
              <div className="px-3 py-2 border-b border-paper/5 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar shrink-0 bg-black/20">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      categoryFilter === cat.id
                        ? 'bg-orange/20 text-orange font-semibold border border-orange/40'
                        : 'text-muted hover:text-paper border border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Project Cards Rail */}
              <div
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto p-3 space-y-2.5 overscroll-contain"
              >
                {filteredProjects.map((p, idx) => {
                  const isActive = p.id === selected.id;
                  return (
                    <div
                      key={p.id}
                      ref={isActive ? activeRailCardRef : null}
                      onClick={() => selectProject(p)}
                      className={`group relative p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? 'border-orange bg-orange/[0.08] shadow-[0_4px_24px_rgba(255,106,61,0.18)]'
                          : 'border-paper/10 bg-paper/[0.02] hover:border-paper/25 hover:bg-paper/[0.05]'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0 bg-black/60 border border-paper/10">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-orange/20 mix-blend-overlay" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] text-muted">
                            [{String(idx + 1).padStart(2, '0')}]
                          </span>
                          <span className={`font-mono text-[10px] uppercase tracking-wider truncate max-w-[120px] ${
                            isActive ? 'text-orange font-semibold' : 'text-muted'
                          }`}>
                            {p.category}
                          </span>
                        </div>
                        <h4 className={`text-sm font-medium tracking-tight truncate mt-0.5 ${
                          isActive ? 'text-white font-bold' : 'text-paper/85 group-hover:text-white'
                        }`}>
                          {shortTitle(p.title)}
                        </h4>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <span className="font-mono text-[10px] text-paper/50 truncate">
                            {p.badge}
                          </span>
                          {isActive && (
                            <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-orange font-bold shrink-0">
                              <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                              Active
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Arrow Chevron */}
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-orange translate-x-0.5' : 'text-muted/40 group-hover:text-muted group-hover:translate-x-0.5'
                      }`} />
                    </div>
                  );
                })}
              </div>
            </motion.aside>

            {/* ---------------------------------------------------- */}
            {/* RIGHT COLUMN: PROJECT DETAIL CANVAS                  */}
            {/* ---------------------------------------------------- */}
            <motion.main
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              data-lenis-prevent="true"
              className="flex-1 h-[62vh] lg:h-full overflow-y-auto bg-[#090b10] flex flex-col overscroll-contain"
            >
              {/* Sticky Detail Top Control Bar */}
              <div className="sticky top-0 z-30 px-5 sm:px-8 py-3.5 bg-[#090b10]/95 backdrop-blur-xl border-b border-paper/10 flex items-center justify-between shrink-0">
                {/* Left: Category & Badge */}
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-orange uppercase tracking-wider">
                    [ {selected.category} ]
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    {selected.badge}
                  </span>
                </div>

                {/* Middle: Live URL pill */}
                {selected.links?.demo && (
                  <button
                    onClick={() => copyUrl(selected.links.demo)}
                    className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-paper/10 bg-paper/5 hover:border-paper/20 font-mono text-xs text-muted hover:text-paper transition-all cursor-pointer"
                    title="Click to copy link"
                  >
                    <Globe className="w-3.5 h-3.5 text-orange" />
                    <span className="truncate max-w-[220px]">
                      {new URL(selected.links.demo).hostname}
                    </span>
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-muted" />}
                  </button>
                )}

                {/* Right: Next / Prev arrows & Close */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center rounded-full border border-paper/15 p-0.5 bg-paper/[0.02]">
                    <button
                      onClick={() => prevProject && selectProject(prevProject)}
                      disabled={!prevProject}
                      className="p-1.5 rounded-full text-muted hover:text-paper disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Previous project (←)"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-[1px] h-3 bg-paper/15" />
                    <button
                      onClick={() => nextProject && selectProject(nextProject)}
                      disabled={!nextProject}
                      className="p-1.5 rounded-full text-muted hover:text-paper disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Next project (→)"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => selectProject(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-paper/20 bg-paper/5 text-paper hover:bg-orange hover:text-ink hover:border-orange font-mono text-xs font-semibold transition-all cursor-pointer"
                    title="Close case study (ESC)"
                  >
                    <span>Close</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Main Detail Body Content */}
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="p-6 sm:p-10 lg:p-12 max-w-5xl mx-auto w-full space-y-12"
              >
                {/* 1. Header Area */}
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-orange font-semibold">
                    // CASE STUDY SPECIFICATION
                  </span>
                  <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-medium uppercase tracking-tight text-paper leading-[1.0]">
                    {selected.title}
                  </h1>
                  <p className="mt-4 text-base sm:text-xl text-paper/75 leading-relaxed font-normal max-w-3xl">
                    {selected.tagline}
                  </p>
                </div>

                {/* 2. Widescreen Media Showcase */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0e121d] border border-paper/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-paper/[0.04] border-b border-paper/10">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-paper/25 group-hover:bg-red-400/80 transition-colors" />
                      <span className="h-2.5 w-2.5 rounded-full bg-paper/25 group-hover:bg-amber-400/80 transition-colors" />
                      <span className="h-2.5 w-2.5 rounded-full bg-paper/25 group-hover:bg-emerald-400/80 transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/40 border border-paper/10 text-[11px] font-mono text-muted">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span className="truncate max-w-[280px]">
                        {selected.links?.demo ? new URL(selected.links.demo).hostname : `${selected.id}.dev`}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-orange">
                      {selected.category}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-[calc(100%-37px)] w-full overflow-hidden bg-black/40">
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* 3. Action Launchpad */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-paper/10 bg-paper/[0.02]">
                  <div className="flex flex-wrap items-center gap-3">
                    {selected.links?.demo && (
                      <a
                        href={selected.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange hover:bg-orange/90 text-ink font-mono text-xs font-bold transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                      >
                        <span>Launch Live App</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {selected.links?.apk && (
                      <a
                        href={selected.links.apk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download APK (v1.0.0)</span>
                      </a>
                    )}
                    {selected.links?.github && (
                      <a
                        href={selected.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper/10 hover:bg-paper/20 border border-paper/15 text-paper font-mono text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Repository</span>
                        <ExternalLink className="w-3 h-3 text-muted" />
                      </a>
                    )}
                  </div>

                  <div className="font-mono text-xs text-muted">
                    Status: <span className="text-paper/90 font-medium">{selected.stat || 'Shipped & Active'}</span>
                  </div>
                </div>

                {/* 4. Bento Architecture Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl border border-paper/10 bg-paper/[0.02]">
                    <div className="flex items-center gap-2 text-orange font-mono text-xs uppercase tracking-wider mb-2">
                      <Layers className="w-3.5 h-3.5" />
                      Domain
                    </div>
                    <div className="font-medium text-sm sm:text-base text-paper truncate">
                      {selected.category}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-paper/10 bg-paper/[0.02]">
                    <div className="flex items-center gap-2 text-orange font-mono text-xs uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      Architecture
                    </div>
                    <div className="font-medium text-sm sm:text-base text-paper truncate">
                      {selected.badge || 'End-to-End'}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-paper/10 bg-paper/[0.02]">
                    <div className="flex items-center gap-2 text-orange font-mono text-xs uppercase tracking-wider mb-2">
                      <Terminal className="w-3.5 h-3.5" />
                      Primary Engine
                    </div>
                    <div className="font-medium text-sm sm:text-base text-paper truncate">
                      {selected.tech?.[0] || 'Modern Stack'}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-paper/10 bg-paper/[0.02]">
                    <div className="flex items-center gap-2 text-orange font-mono text-xs uppercase tracking-wider mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Testing &amp; Status
                    </div>
                    <div className="font-medium text-sm sm:text-base text-emerald-400 truncate">
                      Production Verified
                    </div>
                  </div>
                </div>

                {/* 5. Architectural Overview */}
                <div className="space-y-4 border-t border-paper/10 pt-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold">
                      // 01. ARCHITECTURAL OVERVIEW
                    </span>
                    <span className="font-mono text-xs text-muted">System Design</span>
                  </div>
                  <p className="text-base sm:text-lg text-paper/85 leading-relaxed font-normal">
                    {selected.fullDescription || selected.tagline}
                  </p>
                </div>

                {/* 6. Key Engineering Breakthroughs */}
                {selected.highlights && selected.highlights.length > 0 && (
                  <div className="space-y-6 border-t border-paper/10 pt-8">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold">
                        // 02. KEY ENGINEERING BREAKTHROUGHS
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {selected.highlights.length} Core Modules
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selected.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-2xl border border-paper/10 bg-paper/[0.02] hover:border-paper/25 hover:bg-paper/[0.04] transition-all flex flex-col justify-between gap-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-orange">
                              [ MODULE 0{i + 1} ]
                            </span>
                            <div className="h-1.5 w-1.5 rounded-full bg-orange/60" />
                          </div>
                          <p className="text-sm sm:text-base text-paper/80 leading-relaxed font-normal">
                            {h}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Technologies Matrix */}
                <div className="space-y-6 border-t border-paper/10 pt-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold">
                      // 03. TECHNOLOGIES &amp; LIBRARIES
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {selected.tech?.length || 0} Technologies
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {selected.tech?.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-paper/15 bg-paper/[0.03] hover:border-orange/50 hover:bg-paper/[0.06] font-mono text-xs text-paper/90 transition-all"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 8. Bottom Navigation Footer */}
                <div className="p-6 sm:p-8 rounded-3xl border border-paper/15 bg-gradient-to-b from-paper/[0.03] to-paper/[0.01] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-orange">Continue Browsing</span>
                    <h3 className="mt-1 text-xl sm:text-2xl font-medium uppercase text-paper">
                      Ready for the next build?
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {prevProject && (
                      <button
                        onClick={() => selectProject(prevProject)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-paper/20 hover:border-paper/40 font-mono text-xs text-paper transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Prev: {shortTitle(prevProject.title)}</span>
                      </button>
                    )}
                    {nextProject && (
                      <button
                        onClick={() => selectProject(nextProject)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-paper hover:bg-orange hover:text-white text-ink font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        <span>Next: {shortTitle(nextProject.title)}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => selectProject(null)}
                      className="px-5 py-2.5 rounded-full border border-paper/10 hover:border-paper/20 font-mono text-xs text-muted hover:text-paper transition-all cursor-pointer"
                    >
                      Back to All Projects
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProjectsPage;
