import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, ArrowUpRight, Github, 
  Check, Copy, Terminal, Layers, CheckCircle2,
  Lock, Globe, Sparkles
} from 'lucide-react';
import { lenis } from '../lib/scroll';

export const ProjectModal = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Stop Lenis and lock body scroll when modal is open
    lenis?.stop();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      lenis?.start();
    };
  }, [project, onClose]);

  if (!project) return null;

  const copyUrl = () => {
    const url = project.links?.demo || project.links?.github || window.location.href;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const domainSlug = project.links?.demo 
    ? new URL(project.links.demo).hostname 
    : `${project.id}.iamadityamaurya.dev`;

  return (
    <AnimatePresence>
      <div 
        data-lenis-prevent="true"
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090b10] border border-paper/15 shadow-[0_30px_100px_rgba(0,0,0,0.95)] z-10 text-paper flex flex-col overscroll-contain"
        >
          {/* 1. Sticky Control Deck */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-4 bg-[#090b10]/95 backdrop-blur-2xl border-b border-paper/10">
            {/* Left: Case Study Tag & Status */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-orange uppercase tracking-wider">
                [ CASE STUDY ]
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                {project.badge || 'PRODUCTION READY'}
              </span>
            </div>

            {/* Middle: Domain Breadcrumb */}
            <button
              onClick={copyUrl}
              className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-paper/10 bg-paper/5 hover:border-paper/20 font-mono text-xs text-muted hover:text-paper transition-all cursor-pointer"
              title="Click to copy link"
            >
              <Globe className="w-3.5 h-3.5 text-orange" />
              <span className="truncate max-w-[240px]">{domainSlug}</span>
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-muted" />}
            </button>

            {/* Right: ESC Hint & Close Button */}
            <div className="flex items-center gap-3">
              <kbd className="hidden sm:inline-block font-mono text-[10px] text-muted border border-paper/20 rounded px-2 py-0.5 uppercase tracking-widest">
                ESC
              </kbd>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-paper/20 text-paper/70 hover:text-white hover:border-orange hover:bg-orange transition-all duration-200 cursor-pointer shadow-md"
                aria-label="Close case study"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Hero Header Area */}
          <div className="p-6 sm:p-10 lg:p-12 pb-0 sm:pb-0 lg:pb-0">
            <div className="max-w-4xl">
              <span className="font-mono text-xs uppercase tracking-widest text-orange font-semibold">
                ( {project.category} )
              </span>
              <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-medium uppercase tracking-tight text-paper leading-[1.0]">
                {project.title}
              </h1>
              <p className="mt-4 text-base sm:text-xl text-paper/75 leading-relaxed font-normal max-w-3xl">
                {project.tagline}
              </p>
            </div>

            {/* 3. Widescreen Interactive Media Showcase */}
            <div className="mt-8 relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#0e121d] border border-paper/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
              {/* Browser Chrome Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-paper/[0.04] border-b border-paper/10">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/25 group-hover:bg-red-400/80 transition-colors" />
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/25 group-hover:bg-amber-400/80 transition-colors" />
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/25 group-hover:bg-emerald-400/80 transition-colors" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/40 border border-paper/10 text-[11px] font-mono text-muted">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span className="truncate max-w-[280px]">{domainSlug}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-orange">
                  {project.category}
                </span>
              </div>

              {/* High-res Image Preview */}
              <div className="relative h-[calc(100%-37px)] w-full overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Floating Action Launchpad */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-paper/10 bg-paper/[0.02]">
              <div className="flex items-center gap-3">
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange hover:bg-orange/90 text-ink font-mono text-xs font-bold transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Launch Live App</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
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
                Status: <span className="text-paper/90 font-medium">Shipped &amp; Active</span>
              </div>
            </div>
          </div>

          {/* 4. Deep-Dive Content Body */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-12">
            {/* Bento Architecture Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl border border-paper/10 bg-paper/[0.02]">
                <div className="flex items-center gap-2 text-orange font-mono text-xs uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  Domain
                </div>
                <div className="font-medium text-sm sm:text-base text-paper truncate">
                  {project.category}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-paper/10 bg-paper/[0.02]">
                <div className="flex items-center gap-2 text-orange font-mono text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Architecture
                </div>
                <div className="font-medium text-sm sm:text-base text-paper truncate">
                  {project.badge || 'End-to-End'}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-paper/10 bg-paper/[0.02]">
                <div className="flex items-center gap-2 text-orange font-mono text-xs uppercase tracking-wider mb-2">
                  <Terminal className="w-3.5 h-3.5" />
                  Primary Engine
                </div>
                <div className="font-medium text-sm sm:text-base text-paper truncate">
                  {project.tech?.[0] || 'Modern Stack'}
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

            {/* Architecture Overview & Narrative */}
            <div className="space-y-4 border-t border-paper/10 pt-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold">
                  // 01. ARCHITECTURAL OVERVIEW
                </span>
                <span className="font-mono text-xs text-muted">System Design</span>
              </div>
              <p className="text-base sm:text-lg text-paper/85 leading-relaxed font-normal">
                {project.fullDescription || project.description || project.tagline}
              </p>
            </div>

            {/* Engineering Highlights / Blueprint Cards */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-6 border-t border-paper/10 pt-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold">
                    // 02. KEY ENGINEERING BREAKTHROUGHS
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {project.highlights.length} Core Modules
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.highlights.map((h, i) => (
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

            {/* Technology Stack Matrix */}
            <div className="space-y-6 border-t border-paper/10 pt-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-orange uppercase tracking-widest font-semibold">
                  // 03. TECHNOLOGIES &amp; LIBRARIES
                </span>
                <span className="font-mono text-xs text-muted">
                  {project.tech?.length || 0} Technologies
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {project.tech?.map((t) => (
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

            {/* Bottom Closing Action Deck */}
            <div className="p-8 sm:p-10 rounded-3xl border border-paper/15 bg-gradient-to-b from-paper/[0.03] to-paper/[0.01] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-orange">Explore Deeper</span>
                <h3 className="mt-1 text-xl sm:text-2xl font-medium uppercase text-paper">
                  Interested in this build?
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-paper hover:bg-orange hover:text-white text-ink font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    <span>Live App ↗</span>
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-paper/20 hover:border-paper/40 font-mono text-xs text-paper transition-all cursor-pointer"
                  >
                    <span>GitHub ↗</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-paper/10 hover:border-paper/20 font-mono text-xs text-muted hover:text-paper transition-all cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
