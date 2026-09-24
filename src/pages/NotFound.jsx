import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const [typedLines, setTypedLines] = useState([]);

  const lines = [
    { prefix: '$', text: 'find /path/you/requested', color: 'text-cyan-400' },
    { prefix: '>', text: 'Error: Route not found in filesystem', color: 'text-rose-400' },
    { prefix: '>', text: 'Status: 404_NOT_FOUND', color: 'text-rose-400' },
    { prefix: '>', text: 'Suggestion: navigate back to root directory', color: 'text-amber-400' },
    { prefix: '$', text: 'cd /', color: 'text-cyan-400' },
  ];

  useEffect(() => {
    setTypedLines([]);
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine >= lines.length) {
        clearInterval(interval);
        return;
      }
      const nextLine = lines[currentLine];
      if (nextLine) {
        setTypedLines((prev) => [...prev, nextLine]);
      }
      currentLine += 1;
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Terminal Window */}
        <div className="rounded-2xl overflow-hidden bg-[#090d16] border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d121f] border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>terminal — error@404</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 font-mono text-sm sm:text-base space-y-3">
            <div className="flex items-start gap-3 pb-4 border-b border-slate-800/60">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-100">Page Not Found</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  The requested route could not be resolved.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 min-h-[180px]">
              {typedLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-2"
                >
                  <span className={`${line.color} font-bold select-none shrink-0`}>
                    {line.prefix}
                  </span>
                  <span className="text-slate-300 break-all">{line.text}</span>
                </motion.div>
              ))}
              {typedLines.length === lines.length && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-7"
                />
              )}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={typedLines.length === lines.length ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2 }}
              className="pt-6 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
              >
                <Home className="w-4 h-4" />
                <span>cd /</span>
                <span className="text-xs text-cyan-400/70 font-mono">return home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-sm transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span>cd ..</span>
                <span className="text-xs text-slate-500 font-mono">go back</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-xs text-slate-600 font-mono mt-6"
        >
          Tip: Try the terminal with ` (backtick) for quick navigation.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
