import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, CheckCircle2, 
  Sparkles, ArrowUpRight, Github 
} from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#090e19] border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 text-slate-100"
        >
          {/* Header Image / Banner */}
          <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden border-b border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e19] via-[#090e19]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/60 border border-white/15 text-slate-300 hover:text-white hover:bg-black/90 transition-all cursor-pointer backdrop-blur-md"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Badge on Banner */}
            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 font-mono text-[10px] sm:text-xs font-semibold backdrop-blur-md">
                {project.category}
              </span>
              {project.stat && (
                <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 font-mono text-[10px] sm:text-xs font-semibold backdrop-blur-md">
                  {project.stat}
                </span>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-7 md:p-8 space-y-5 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {project.title}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Full description */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Project Overview &amp; Architecture
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Engineering Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-2.5 sm:space-y-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/70 border border-slate-800">
                <h3 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  Key Engineering Highlights
                </h3>
                <ul className="space-y-2 sm:space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2.5 sm:space-y-3">
              <h3 className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Technologies Employed
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-800/90 border border-slate-700 text-[11px] sm:text-xs font-mono text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-4 border-t border-white/10">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs sm:text-sm font-semibold transition-all hover:border-slate-500 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview / Demo
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
