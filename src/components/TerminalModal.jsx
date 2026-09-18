import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Maximize2, Minimize2, Terminal as TerminalIcon,
  CornerDownLeft, ExternalLink, ArrowRight, Check, Copy
} from 'lucide-react';
import { projectsData } from '../data/projects';

export const TerminalModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  const quickCommands = ['help', 'about', 'projects', 'skills', 'hackathons', 'contact', 'clear'];
  const allCommands = ['help', 'about', 'bio', 'projects', 'skills', 'tech', 'hackathons', 'awards', 'contact', 'email', 'github', 'linkedin', 'whoami', 'clear', 'exit'];

  const renderBanner = () => (
    <div className="pb-3 text-xs sm:text-sm font-mono border-b border-slate-800 space-y-1">
      <div className="text-cyan-400 font-bold">
        Aditya Kumar Maurya — Terminal Portfolio v2.0
      </div>
      <div className="text-slate-400 text-xs">
        Type <span className="text-slate-200 font-semibold">help</span> to view available commands, or click the shortcuts below.
      </div>
    </div>
  );

  // Initialize banner
  useEffect(() => {
    if (isOpen) {
      if (history.length === 0) {
        setHistory([{ type: 'banner', content: renderBanner() }]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Escape key & shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText('adityamaurya1947@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const executeCommand = (cmdText) => {
    const cleanCmd = cmdText.trim();
    if (!cleanCmd) return;

    setCommandHistory(prev => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const mainCmd = cleanCmd.toLowerCase().split(' ')[0];

    if (mainCmd === 'clear' || mainCmd === 'cls') {
      setHistory([{ type: 'banner', content: renderBanner() }]);
      setInput('');
      return;
    }

    if (mainCmd === 'exit' || mainCmd === 'quit' || mainCmd === 'q') {
      onClose();
      return;
    }

    let output = null;

    switch (mainCmd) {
      case 'help':
      case '?':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-cyan-400 font-semibold">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
              <div><span className="text-slate-100 font-bold">about</span> <span className="text-slate-500">— Developer bio &amp; background</span></div>
              <div><span className="text-slate-100 font-bold">projects</span> <span className="text-slate-500">— List projects &amp; live links</span></div>
              <div><span className="text-slate-100 font-bold">skills</span> <span className="text-slate-500">— Tech stack &amp; capabilities</span></div>
              <div><span className="text-slate-100 font-bold">hackathons</span> <span className="text-slate-500">— 3x Hackathon championships</span></div>
              <div><span className="text-slate-100 font-bold">contact</span> <span className="text-slate-500">— Email &amp; social profiles</span></div>
              <div><span className="text-slate-100 font-bold">whoami</span> <span className="text-slate-500">— Current user identity</span></div>
              <div><span className="text-slate-100 font-bold">clear</span> <span className="text-slate-500">— Clear terminal output</span></div>
              <div><span className="text-slate-100 font-bold">exit</span> <span className="text-slate-500">— Close this terminal</span></div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
            <div className="text-white font-bold">Aditya Kumar Maurya</div>
            <p>
              Full-Stack &amp; Android Developer, IoT/Hardware Engineer, and 3x Hackathon Champion currently pursuing B.Tech in Electronics &amp; Communication Engineering at MAIT Delhi.
            </p>
            <div className="text-slate-400 text-xs">
              Specialized in end-to-end engineering: from circuit boards, ESP32 telemetry, and 3D design to scalable Next.js/React web platforms and native mobile apps.
            </div>
          </div>
        );
        break;

      case 'projects':
      case 'ls':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-cyan-400 font-semibold flex items-center justify-between">
              <span>Featured Projects ({projectsData.length}):</span>
              <a href="/project" className="text-xs text-slate-400 hover:text-white underline inline-flex items-center gap-1">
                View Full Catalog <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-2 pt-1">
              {projectsData.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-white font-bold">{p.title}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">[{p.category}]</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{p.tagline}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
                    {p.links?.demo && (
                      <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                        Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {p.links?.github && (
                      <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:underline inline-flex items-center gap-1">
                        Code <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'skills':
      case 'tech':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-cyan-400 font-semibold">Technical Stack:</div>
            <div className="space-y-1.5 pt-1">
              <div><span className="text-slate-100 font-bold">• Web / Mobile:</span> React, Next.js 16, TypeScript, React Native, Expo, Tailwind CSS, Node.js, Express</div>
              <div><span className="text-slate-100 font-bold">• Databases:</span> Supabase (PostgreSQL), MongoDB, Firebase, Prisma ORM</div>
              <div><span className="text-slate-100 font-bold">• Hardware / IoT:</span> C, C++, Python, ESP32, Arduino, ROS 2, Onshape (CAD), 3D Printing, Sensors</div>
              <div><span className="text-slate-100 font-bold">• Tools:</span> Git, Linux, Docker, FFmpeg, Chrome Extension Manifest V3</div>
            </div>
          </div>
        );
        break;

      case 'hackathons':
      case 'awards':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-amber-400 font-semibold">🏆 Hackathon Victories (3x Champion):</div>
            <div className="space-y-2 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-white font-bold">🥇 1st Place — CULMYCA’26 Robotics (Line Follower)</div>
                <div className="text-xs text-slate-400">Autonomous high-speed line tracking robot with fixed-point PID &amp; AVR port control (14.8s record run).</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-white font-bold">🥇 1st Place — CULMYCA’26 Innovation (FireShield)</div>
                <div className="text-xs text-slate-400">Smart home gas/smoke detection system with ESP32, WebSocket telemetry &amp; mobile push alerts.</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-white font-bold">🥈 2nd Place — YMCA Robotics Sprint Trial</div>
                <div className="text-xs text-slate-400">Custom 3D-printed chassis line-follower robot optimized for high-speed turns.</div>
              </div>
            </div>
          </div>
        );
        break;

      case 'contact':
      case 'email':
      case 'socials':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-cyan-400 font-semibold">Connect &amp; Socials:</div>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Email:</span>
                <span className="text-white">adityamaurya1947@gmail.com</span>
                <button onClick={copyEmail} className="text-xs text-cyan-400 hover:underline cursor-pointer">
                  {copiedEmail ? '(Copied!)' : '(Copy)'}
                </button>
              </div>
              <div><span className="text-slate-400">GitHub:</span> <a href="https://github.com/iamadityamaurya" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">github.com/iamadityamaurya</a></div>
              <div><span className="text-slate-400">LinkedIn:</span> <a href="https://www.linkedin.com/in/iamadityamaurya/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">linkedin.com/in/iamadityamaurya</a></div>
              <div><span className="text-slate-400">Twitter/X:</span> <a href="https://x.com/AdityaMaur43164" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@AdityaMaur43164</a></div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        output = <div className="text-slate-300 font-mono text-xs sm:text-sm">guest@portfolio (interactive visitor)</div>;
        break;

      default:
        output = (
          <div className="text-xs sm:text-sm font-mono text-slate-400">
            Command not recognized: <span className="text-rose-400">{cleanCmd}</span>. Type <span className="text-cyan-400">help</span> for command list.
          </div>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        type: 'command',
        command: cleanCmd,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        type: 'output',
        content: output
      }
    ]);

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const match = allCommands.find(c => c.startsWith(input.toLowerCase().trim()));
      if (match) setInput(match);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
      return;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Terminal Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`relative flex flex-col w-full rounded-2xl bg-[#090d16] border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10 ${
            isMaximized ? 'h-[94vh] max-w-[96vw]' : 'w-full max-w-[96vw] sm:max-w-2xl h-[520px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d121f] border-b border-slate-800 select-none">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>terminal — aditya@portfolio</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer hidden sm:block"
                title={isMaximized ? "Restore size" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Terminal (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0b0f1a] border-b border-slate-800/80 overflow-x-auto scrollbar-none text-xs font-mono">
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Output Area */}
          <div
            className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-slate-200 text-xs sm:text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, index) => {
              if (item.type === 'banner') {
                return <div key={index}>{item.content}</div>;
              }
              if (item.type === 'command') {
                return (
                  <div key={index} className="flex items-center gap-2 text-xs sm:text-sm pt-1">
                    <span className="text-cyan-400 font-bold">$</span>
                    <span className="text-slate-100 font-semibold">{item.command}</span>
                    <span className="ml-auto text-[10px] text-slate-600 select-none">{item.time}</span>
                  </div>
                );
              }
              if (item.type === 'output') {
                return (
                  <div key={index} className="pl-3 border-l-2 border-slate-800 my-2">
                    {item.content}
                  </div>
                );
              }
              return null;
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(input);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0d121f] border-t border-slate-800"
          >
            <span className="text-cyan-400 font-mono font-bold text-sm select-none">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command (e.g. 'help', 'projects', 'about')..."
              className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 font-mono text-xs sm:text-sm outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex items-center justify-center p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-bold disabled:opacity-30 transition-all cursor-pointer shrink-0"
              title="Execute command (Enter)"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TerminalModal;
