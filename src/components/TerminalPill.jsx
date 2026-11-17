import React from 'react';

export const TerminalPill = ({ isOpen, onToggle }) => {
  if (isOpen) return null;

  return (
    <button
      onClick={onToggle}
      className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#0d0e12]/90 hover:bg-[#151720] backdrop-blur-md border border-white/15 hover:border-[#2b4bff]/60 text-paper font-mono text-xs shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group select-none"
      title="Open interactive developer CLI (shortcut: ` or Ctrl+`)"
      aria-label="Open interactive terminal"
    >
      <span className="text-[#2b4bff] font-bold group-hover:text-white transition-colors">&gt;_</span>
      <span className="font-medium text-paper/90">Terminal</span>
      <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-paper/60 font-mono group-hover:bg-[#2b4bff] group-hover:text-white transition-colors">`</kbd>
    </button>
  );
};

export default TerminalPill;
