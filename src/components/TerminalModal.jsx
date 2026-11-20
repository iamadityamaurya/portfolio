import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Maximize2, Minimize2, Terminal as TerminalIcon,
  ExternalLink, ArrowRight, Check, Copy, Folder, FileText, Trophy
} from 'lucide-react';
import { projectsData } from '../data/loadProjects';
import { lenis } from '../lib/scroll';

const THEMES = {
  default: {
    id: 'default',
    name: 'Obsidian Dark',
    bg: 'bg-[#090c13]',
    headerBg: 'bg-[#0e131f]',
    statusBarBg: 'bg-[#0b0f19]',
    border: 'border-white/[0.08]',
    textColor: 'text-slate-200',
    promptUser: 'text-emerald-400',
    promptPath: 'text-sky-400',
    accentColor: 'text-cyan-400',
    bannerTitle: 'text-cyan-400',
    caretColor: 'caret-emerald-400',
    glow: 'rgba(56, 189, 248, 0.04)',
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix Phosphor',
    bg: 'bg-[#040a06]',
    headerBg: 'bg-[#07130a]',
    statusBarBg: 'bg-[#050e07]',
    border: 'border-emerald-500/20',
    textColor: 'text-emerald-400',
    promptUser: 'text-emerald-300 font-bold',
    promptPath: 'text-green-400',
    accentColor: 'text-emerald-300',
    bannerTitle: 'text-emerald-400',
    caretColor: 'caret-emerald-400',
    glow: 'rgba(52, 211, 153, 0.08)',
  },
  amber: {
    id: 'amber',
    name: 'Amber CRT',
    bg: 'bg-[#0c0903]',
    headerBg: 'bg-[#150f05]',
    statusBarBg: 'bg-[#100c04]',
    border: 'border-amber-500/20',
    textColor: 'text-amber-300',
    promptUser: 'text-amber-400 font-bold',
    promptPath: 'text-yellow-400',
    accentColor: 'text-amber-300',
    bannerTitle: 'text-amber-400',
    caretColor: 'caret-amber-400',
    glow: 'rgba(251, 191, 36, 0.08)',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    bg: 'bg-[#0c0614]',
    headerBg: 'bg-[#140b22]',
    statusBarBg: 'bg-[#0f081a]',
    border: 'border-pink-500/25',
    textColor: 'text-fuchsia-200',
    promptUser: 'text-cyan-400 font-bold',
    promptPath: 'text-pink-400',
    accentColor: 'text-cyan-300',
    bannerTitle: 'text-pink-400',
    caretColor: 'caret-cyan-400',
    glow: 'rgba(244, 114, 182, 0.08)',
  },
};

export const TerminalModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [currentDir, setCurrentDir] = useState('~');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const terminalEndRef = useRef(null);

  const theme = THEMES[currentTheme] || THEMES.default;

  const quickCommands = ['help', 'about', 'projects', 'skills', 'hackathons', 'contact', 'clear'];
  const allCommands = [
    'help', 'man', 'about', 'bio', 'projects', 'skills', 'tech',
    'hackathons', 'awards', 'contact', 'email', 'socials', 'resume',
    'neofetch', 'whoami', 'date', 'uname', 'ls', 'dir', 'cat', 'cd', 'pwd',
    'echo', 'sudo', 'theme', 'clear', 'cls', 'exit', 'quit'
  ];
  const virtualFiles = ['about.txt', 'contact.sh', 'resume.pdf', 'README.md'];
  const virtualDirs = ['projects', 'skills', 'hackathons'];

  const renderBanner = () => (
    <div className="space-y-2 select-text font-mono text-xs sm:text-[13px] leading-relaxed pb-2 border-b border-white/[0.08]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="font-bold flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className={theme.bannerTitle}>AdityaOS v2.4 (x86_64-pc-linux-gnu)</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          Last login: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} on ttys001
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 py-2 text-slate-300">
        {/* Neofetch ASCII art */}
        <pre className="text-emerald-400/90 font-mono text-[11px] leading-[1.15] select-none hidden sm:block">
{`   /\\_/\\
  ( o.o )
   > ^ <
  /|   |\\
 (_|   |_)`}
        </pre>

        {/* System info */}
        <div className="space-y-1 text-xs text-slate-300">
          <div><span className="text-slate-500">HOST:</span> <span className="text-white font-semibold">Aditya Kumar Maurya</span> <span className="text-slate-500">(B.Tech ECE, MAIT Delhi)</span></div>
          <div><span className="text-slate-500">ROLE:</span> Full-Stack Developer &amp; Hardware/IoT Engineer</div>
          <div><span className="text-slate-500">AWARDS:</span> <span className="text-amber-400 font-semibold">3x Hackathon Champion</span> 🏆 (CULMYCA'26 Robotics)</div>
          <div><span className="text-slate-500">SHELL:</span> zsh 5.9 <span className="text-slate-500">•</span> <span className="text-slate-500">THEME:</span> {theme.name}</div>
          <div className="flex items-center gap-1.5 pt-1 text-[11px]">
            <span className="text-slate-500">PALETTE:</span>
            <span className="text-[#ff5f56]">●</span>
            <span className="text-[#ffbd2e]">●</span>
            <span className="text-[#27c93f]">●</span>
            <span className="text-[#38bdf8]">●</span>
            <span className="text-[#a855f7]">●</span>
            <span className="text-[#ec4899]">●</span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 pt-1">
        Type <span className="text-emerald-400 font-semibold">help</span> for commands, <span className="text-sky-400 font-semibold">ls</span> to view files, or click any chip above.
      </div>
    </div>
  );

  // Initialize terminal on open & stop page scroll
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      if (history.length === 0) {
        setHistory([{ type: 'banner', content: renderBanner() }]);
      }
      setTimeout(() => inputRef.current?.focus(), 80);
      return () => {
        lenis?.start();
      };
    }
  }, [isOpen]);

  // Auto-scroll on content updates
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [history, isOpen, input]);

  // Global keyboard shortcuts (Esc, Ctrl+L, Ctrl+C)
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setHistory([]);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setHistory(prev => [
          ...prev,
          {
            type: 'command',
            command: input + ' ^C',
            dir: currentDir,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }
        ]);
        setInput('');
        return;
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, input, currentDir, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText('adityamaurya1947@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const executeCommand = (cmdText) => {
    const rawCmd = cmdText.trim();
    if (!rawCmd) return;

    setCommandHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const parts = rawCmd.split(' ').filter(Boolean);
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Direct clear
    if (mainCmd === 'clear' || mainCmd === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    // Direct exit
    if (mainCmd === 'exit' || mainCmd === 'quit' || mainCmd === 'q') {
      onClose();
      return;
    }

    let output = null;

    switch (mainCmd) {
      case 'help':
      case 'man':
      case '?':
        output = (
          <div className="space-y-3 text-xs sm:text-[13px] font-mono leading-relaxed">
            <div className="text-emerald-400 font-bold border-b border-white/[0.08] pb-1">
              ADITYA OS (v2.4) — AVAILABLE COMMANDS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div>
                <span className="text-white font-bold w-24 inline-block">about</span>
                <span className="text-slate-400">— Developer biography &amp; education</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">projects</span>
                <span className="text-slate-400">— List 17+ projects &amp; live links</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">skills</span>
                <span className="text-slate-400">— Full tech stack (Web, Mobile, IoT)</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">hackathons</span>
                <span className="text-slate-400">— 3x Championship wins &amp; awards</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">contact</span>
                <span className="text-slate-400">— Email, GitHub, LinkedIn &amp; socials</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">resume</span>
                <span className="text-slate-400">— View &amp; download official resume</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">neofetch</span>
                <span className="text-slate-400">— Display system info &amp; developer stats</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">ls</span>
                <span className="text-slate-400">— List virtual files and directories</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">cat &lt;file&gt;</span>
                <span className="text-slate-400">— Read file (e.g. cat about.txt)</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">cd &lt;dir&gt;</span>
                <span className="text-slate-400">— Change directory (e.g. cd projects)</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">whoami</span>
                <span className="text-slate-400">— Print current user identity</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">theme</span>
                <span className="text-slate-400">— Switch theme (default|matrix|amber|cyberpunk)</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">clear</span>
                <span className="text-slate-400">— Clear terminal buffer (Ctrl+L)</span>
              </div>
              <div>
                <span className="text-white font-bold w-24 inline-block">exit</span>
                <span className="text-slate-400">— Close interactive terminal (Esc)</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        output = (
          <div className="space-y-2.5 text-xs sm:text-[13px] font-mono leading-relaxed text-slate-300">
            <div className="text-white font-bold text-sm">Aditya Kumar Maurya</div>
            <div className="text-sky-400 text-xs">
              B.Tech in Electronics &amp; Communication Engineering (ECE) • Maharaja Agrasen Institute of Technology (MAIT), Delhi
            </div>
            <p className="text-slate-300 pt-1">
              A multidisciplinary engineer bridging hardware &amp; software. From designing custom ESP32 IoT nodes, sensor telemetry, and 3D printing to production Next.js/React web platforms and native mobile apps.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/[0.08] text-xs">
              <div><span className="text-emerald-400 font-semibold">• Hardware:</span> Embedded C/C++, Arduino, FreeRTOS, ROS 2, PID</div>
              <div><span className="text-cyan-400 font-semibold">• Full-Stack:</span> React, Next.js 16, TypeScript, Tailwind, Node.js</div>
              <div><span className="text-amber-400 font-semibold">• Mobile:</span> React Native, Expo, Android Kotlin Native Overlay</div>
              <div><span className="text-purple-400 font-semibold">• Databases:</span> Supabase (PostgreSQL), MongoDB, Firebase</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        const filterKeyword = args[0]?.toLowerCase();
        const filteredProjects = filterKeyword
          ? projectsData.filter(p =>
              p.title.toLowerCase().includes(filterKeyword) ||
              p.category.toLowerCase().includes(filterKeyword) ||
              p.tech?.some(t => t.toLowerCase().includes(filterKeyword))
            )
          : projectsData;

        output = (
          <div className="space-y-3 text-xs sm:text-[13px] font-mono">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
              <span className="text-cyan-400 font-bold">
                Catalog: {filteredProjects.length} Projects {filterKeyword && `(filtered by "${filterKeyword}")`}
              </span>
              <a href="/projects" className="text-xs text-slate-400 hover:text-white underline inline-flex items-center gap-1">
                View Gallery <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {filteredProjects.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-white font-bold">{p.title}</span>
                    <span className="text-[11px] text-cyan-400 font-mono">[{p.category}]</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{p.tagline}</p>
                  {p.tech && (
                    <div className="flex flex-wrap gap-1 mt-1.5 text-[10px] text-slate-500">
                      {p.tech.map((t, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                    {p.links?.demo && (
                      <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {p.links?.apk && (
                      <a href={p.links.apk} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">
                        Download APK <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {p.links?.github && (
                      <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:underline inline-flex items-center gap-1">
                        Source Code <ExternalLink className="w-3 h-3" />
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
          <div className="space-y-3 text-xs sm:text-[13px] font-mono leading-relaxed">
            <div className="text-emerald-400 font-bold border-b border-white/[0.08] pb-1">
              TECHNICAL ARCHITECTURE &amp; SKILLS TREE
            </div>
            <pre className="text-slate-300 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre">
{`├── 🌐 Web & Full-Stack
│   ├── Frontend: React 19, Next.js 16, TypeScript, Tailwind CSS, GSAP, Framer Motion
│   └── Backend:  Node.js, Express, Supabase (PostgreSQL), MongoDB, Firebase, REST APIs
├── 📱 Native Mobile
│   └── Android:  React Native, Expo, Kotlin Native Overlay, AccessibilityService
├── ⚡ Hardware & Embedded IoT
│   ├── Firmware: ESP32, Arduino, FreeRTOS, Embedded C/C++, AVR Port Manipulation
│   └── Robotics: ROS 2, Fixed-Point PID, Onshape CAD, 3D Printing, Sensor Telemetry
└── 🛠️ Tools & DevOps
    └── Workflow: Git, GitHub Actions, Docker, Linux (Ubuntu/Arch), Vite, Manifest V3`}
            </pre>
          </div>
        );
        break;

      case 'hackathons':
      case 'awards':
        output = (
          <div className="space-y-3 text-xs sm:text-[13px] font-mono leading-relaxed">
            <div className="text-amber-400 font-bold flex items-center gap-2 border-b border-white/[0.08] pb-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>HACKATHON CHAMPIONSHIPS (3x WINNER):</span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-lg bg-amber-500/[0.05] border border-amber-500/20">
                <div className="text-white font-bold flex items-center justify-between">
                  <span>🥇 1st Place — CULMYCA’26 Robotics (Line Follower)</span>
                  <span className="text-[11px] text-amber-400 font-mono">14.8s Record</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Autonomous high-speed line tracking robot with fixed-point PID, AVR port control &amp; custom 3D-printed lightweight chassis. Set all-time track record.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/[0.05] border border-amber-500/20">
                <div className="text-white font-bold flex items-center justify-between">
                  <span>🥇 1st Place — CULMYCA’26 Innovation (FireShield IoT)</span>
                  <span className="text-[11px] text-emerald-400 font-mono">IoT Winner</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Smart industrial gas/smoke detection system with ESP32, real-time WebSocket telemetry, buzzer alarms, and emergency mobile push notifications.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <div className="text-white font-bold flex items-center justify-between">
                  <span>🥈 2nd Place — YMCA Robotics Sprint Trial</span>
                  <span className="text-[11px] text-slate-400 font-mono">Sprint Runner-up</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Custom high-traction line-following robot optimized for sharp angle cornering and rapid inertia recovery.
                </p>
              </div>
            </div>
          </div>
        );
        break;

      case 'contact':
      case 'email':
      case 'socials':
        output = (
          <div className="space-y-3 text-xs sm:text-[13px] font-mono leading-relaxed">
            <div className="text-cyan-400 font-bold border-b border-white/[0.08] pb-1">
              COMMUNICATION CHANNELS &amp; SOCIALS:
            </div>
            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-500 w-20">Email:</span>
                <span className="text-white font-semibold">adityamaurya1947@gmail.com</span>
                <button
                  onClick={copyEmail}
                  className="px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/30 transition-all cursor-pointer flex items-center gap-1"
                >
                  {copiedEmail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied to clipboard!' : 'Copy'}</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-20">GitHub:</span>
                <a href="https://github.com/iamadityamaurya" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                  github.com/iamadityamaurya <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-20">LinkedIn:</span>
                <a href="https://www.linkedin.com/in/iamadityamaurya/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                  linkedin.com/in/iamadityamaurya <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-20">Twitter/X:</span>
                <a href="https://x.com/aditya_maurya0" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1">
                  x.com/aditya_maurya0 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        output = (
          <div className="space-y-2 text-xs sm:text-[13px] font-mono leading-relaxed">
            <div className="text-white font-bold">📄 Aditya_Kumar_Maurya_Resume.pdf</div>
            <p className="text-slate-400 text-xs">
              Includes comprehensive experience, 17+ projects, hackathon records, and technical proficiencies.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <a
                href="#contact"
                onClick={() => {
                  executeCommand('contact');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white text-black font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                <span>Request Resume / Contact</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        );
        break;

      case 'neofetch':
      case 'fastfetch':
        output = renderBanner();
        break;

      case 'ls':
      case 'dir':
        output = (
          <div className="space-y-2 text-xs sm:text-[13px] font-mono">
            <div className="text-slate-500 text-[11px]">total 24 (directory: {currentDir})</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <span className="text-sky-400 font-bold flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5" /> projects/
              </span>
              <span className="text-sky-400 font-bold flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5" /> skills/
              </span>
              <span className="text-sky-400 font-bold flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5" /> hackathons/
              </span>
              <span className="text-slate-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" /> about.txt
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" /> contact.sh
              </span>
              <span className="text-amber-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" /> resume.pdf
              </span>
              <span className="text-purple-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-400" /> README.md
              </span>
            </div>
          </div>
        );
        break;

      case 'cat':
        const targetFile = args[0]?.toLowerCase();
        if (!targetFile) {
          output = <span className="text-rose-400 text-xs">usage: cat &lt;filename&gt; (try: cat about.txt or cat README.md)</span>;
        } else if (targetFile === 'about.txt' || targetFile === 'about') {
          output = (
            <div className="text-xs sm:text-[13px] font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
              {`Aditya Kumar Maurya — Full-Stack & IoT Hardware Engineer
Currently studying Electronics & Communication at MAIT Delhi.
Passionate about low-latency systems, robotics, and delightful UI engineering.`}
            </div>
          );
        } else if (targetFile === 'readme.md' || targetFile === 'readme') {
          output = (
            <div className="text-xs sm:text-[13px] font-mono text-slate-300 leading-relaxed space-y-2">
              <div className="text-white font-bold"># Aditya Kumar Maurya — Developer Portfolio</div>
              <p className="text-slate-400">
                Welcome to my interactive terminal environment. You can explore projects, inspect code repos, or view competition achievements.
              </p>
              <div className="text-emerald-400 text-xs">• Run `projects` to inspect all 17 live builds.</div>
              <div className="text-amber-400 text-xs">• Run `hackathons` for robotics trophies.</div>
              <div className="text-cyan-400 text-xs">• Run `contact` for direct communication.</div>
            </div>
          );
        } else if (targetFile === 'contact.sh' || targetFile === 'contact') {
          output = (
            <pre className="text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto">
{`#!/bin/bash
EMAIL="adityamaurya1947@gmail.com"
GITHUB="https://github.com/iamadityamaurya"
LINKEDIN="https://www.linkedin.com/in/iamadityamaurya"
TWITTER="https://x.com/aditya_maurya0"
echo "Ready to build ambitious systems together."`}
            </pre>
          );
        } else if (targetFile === 'resume.pdf' || targetFile === 'resume') {
          output = (
            <div className="text-xs font-mono text-slate-300">
              <span className="text-white font-bold">Aditya_Kumar_Maurya_Resume.pdf</span> — Run <span className="text-cyan-400">contact</span> to request the latest version.
            </div>
          );
        } else {
          output = <span className="text-rose-400 text-xs">cat: {targetFile}: No such file or directory</span>;
        }
        break;

      case 'cd':
        const targetDir = args[0]?.toLowerCase();
        if (!targetDir || targetDir === '~' || targetDir === '/') {
          setCurrentDir('~');
          output = null;
        } else if (targetDir === '..' || targetDir === '../') {
          setCurrentDir('~');
          output = null;
        } else if (virtualDirs.includes(targetDir.replace('/', ''))) {
          const cleanDir = targetDir.replace('/', '');
          setCurrentDir(`~/${cleanDir}`);
          output = <span className="text-slate-400 text-xs">Moved to {cleanDir}/. Type <span className="text-white font-bold">ls</span> to view contents.</span>;
        } else {
          output = <span className="text-rose-400 text-xs">cd: no such file or directory: {args[0]}</span>;
        }
        break;

      case 'pwd':
        output = <span className="text-slate-300 text-xs font-mono">/home/aditya{currentDir === '~' ? '' : currentDir.replace('~', '')}</span>;
        break;

      case 'whoami':
        output = (
          <div className="text-xs sm:text-[13px] font-mono text-slate-300">
            <span className="text-emerald-400 font-bold">guest@portfolio</span> (uid=1000 gid=1000 groups=visitors,engineers,recruiters)
          </div>
        );
        break;

      case 'date':
        output = <div className="text-xs font-mono text-slate-300">{new Date().toString()}</div>;
        break;

      case 'uname':
        output = (
          <div className="text-xs font-mono text-slate-300">
            Linux aditya-portfolio 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux
          </div>
        );
        break;

      case 'echo':
        output = <div className="text-xs font-mono text-slate-300">{args.join(' ')}</div>;
        break;

      case 'sudo':
        output = (
          <div className="text-xs font-mono text-rose-400 leading-relaxed">
            [sudo] password for guest: <br />
            guest is not in the sudoers file. This incident will be reported to Aditya.
          </div>
        );
        break;

      case 'theme':
        const themeChoice = args[0]?.toLowerCase();
        if (!themeChoice) {
          output = (
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div>Current theme: <span className="text-white font-bold">{theme.name}</span></div>
              <div className="text-slate-400">Available: default | matrix | amber | cyberpunk</div>
              <div className="text-slate-500">Usage: theme matrix</div>
            </div>
          );
        } else if (THEMES[themeChoice]) {
          setCurrentTheme(themeChoice);
          output = <span className="text-emerald-400 text-xs font-mono">Theme switched to: {THEMES[themeChoice].name}</span>;
        } else {
          output = <span className="text-rose-400 text-xs font-mono">Unknown theme: {themeChoice}. Choose from: default, matrix, amber, cyberpunk</span>;
        }
        break;

      default:
        output = (
          <div className="text-xs sm:text-[13px] font-mono text-slate-400">
            zsh: command not found: <span className="text-rose-400">{rawCmd}</span>. Type <span className="text-emerald-400 font-semibold cursor-pointer underline" onClick={() => executeCommand('help')}>help</span> for available commands.
          </div>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        type: 'command',
        command: rawCmd,
        dir: currentDir,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      },
      ...(output ? [{ type: 'output', content: output }] : [])
    ]);

    setInput('');
  };

  const handleKeyDown = (e) => {
    // Tab autocompletion
    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      if (trimmed.startsWith('cat ')) {
        const filePrefix = trimmed.replace('cat ', '');
        const match = virtualFiles.find(f => f.startsWith(filePrefix));
        if (match) setInput(`cat ${match}`);
        return;
      }

      if (trimmed.startsWith('cd ')) {
        const dirPrefix = trimmed.replace('cd ', '');
        const match = virtualDirs.find(d => d.startsWith(dirPrefix));
        if (match) setInput(`cd ${match}`);
        return;
      }

      if (trimmed.startsWith('theme ')) {
        const themePrefix = trimmed.replace('theme ', '');
        const match = Object.keys(THEMES).find(t => t.startsWith(themePrefix));
        if (match) setInput(`theme ${match}`);
        return;
      }

      const match = allCommands.find(c => c.startsWith(trimmed.toLowerCase()));
      if (match) setInput(match);
      return;
    }

    // Up arrow history
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

    // Down arrow history
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
      <div 
        data-lenis-prevent
        className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-6"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Real Terminal Window Chassis */}
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={`relative flex flex-col w-full rounded-xl sm:rounded-2xl ${theme.bg} ${theme.border} border shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 transition-all duration-300 font-mono ${
            isMaximized ? 'h-[94vh] max-w-[97vw]' : 'w-full max-w-3xl h-[560px] max-h-[88vh]'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, ${theme.glow}, transparent 70%)`,
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* macOS Real Terminal Titlebar */}
          <div className={`flex items-center justify-between px-4 py-3 ${theme.headerBg} border-b ${theme.border} select-none`}>
            {/* Traffic Light Buttons */}
            <div className="flex items-center gap-2 group/lights">
              <button
                onClick={onClose}
                className="relative w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                title="Close terminal (Esc)"
                aria-label="Close"
              >
                <X className="w-2 h-2 text-black/70 opacity-0 group-hover/lights:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => {
                  setHistory([]);
                  setInput('');
                }}
                className="relative w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                title="Clear buffer (Ctrl+L)"
                aria-label="Clear"
              >
                <span className="w-1.5 h-0.5 bg-black/70 rounded-full opacity-0 group-hover/lights:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="relative w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center cursor-pointer transition-transform active:scale-90 hidden sm:flex"
                title={isMaximized ? "Restore window" : "Maximize window"}
                aria-label="Maximize"
              >
                <span className="w-1.5 h-1.5 border border-black/70 rounded-[1px] opacity-0 group-hover/lights:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Terminal Window Center Title */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <TerminalIcon className={`w-3.5 h-3.5 ${theme.accentColor}`} />
              <span>guest@portfolio:</span>
              <span className={theme.promptPath}>{currentDir}</span>
              <span className="text-slate-500 text-[11px] font-normal hidden sm:inline">(zsh)</span>
            </div>

            {/* Window Stats / Quick Actions */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-slate-400">
                80×24
              </span>
              <button
                onClick={onClose}
                className="p-1 hover:text-white rounded hover:bg-white/[0.08] transition-colors cursor-pointer sm:hidden"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Command Suggestions Chips */}
          <div className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 ${theme.statusBarBg} border-b ${theme.border} overflow-x-auto scrollbar-none text-[11px] font-mono`}>
            <span className="text-slate-500 select-none mr-1 flex items-center gap-1 shrink-0">
              <span className={theme.promptUser}>$</span> quick:
            </span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="px-2.5 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] hover:text-white text-slate-300 border border-white/[0.08] transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1 group"
              >
                <span className="text-slate-500 group-hover:text-emerald-400 transition-colors">&gt;</span>
                <span>{cmd}</span>
              </button>
            ))}
          </div>

          {/* Terminal Scrolling Screen Output & Inline Prompt */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 p-3 sm:p-5 overflow-y-auto overscroll-contain space-y-3 font-mono text-xs sm:text-[13px] scrollbar-thin scrollbar-thumb-white/10"
          >
            {history.map((item, index) => {
              if (item.type === 'banner') {
                return <div key={index}>{item.content}</div>;
              }
              if (item.type === 'command') {
                return (
                  <div key={index} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-1.5">
                    <span className="flex items-center gap-1 select-none whitespace-nowrap font-bold">
                      <span className={theme.promptUser}>guest@portfolio</span>
                      <span className="text-slate-600">:</span>
                      <span className={theme.promptPath}>{item.dir || '~'}</span>
                      <span className="text-slate-400">$</span>
                    </span>
                    <span className="text-white font-semibold flex-1">{item.command}</span>
                    <span className="text-[10px] text-slate-600 ml-auto select-none">{item.time}</span>
                  </div>
                );
              }
              if (item.type === 'output') {
                return (
                  <div key={index} className="pl-2 sm:pl-3 border-l-2 border-white/[0.08] my-1.5">
                    {item.content}
                  </div>
                );
              }
              return null;
            })}

            {/* Authentic INLINE Terminal Prompt (right in the scroll stream!) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeCommand(input);
              }}
              className="flex items-center flex-wrap gap-x-2 pt-1 font-mono text-xs sm:text-[13px]"
            >
              <div className="flex items-center gap-1 select-none whitespace-nowrap font-bold">
                <span className={theme.promptUser}>guest@portfolio</span>
                <span className="text-slate-600">:</span>
                <span className={theme.promptPath}>{currentDir}</span>
                <span className="text-slate-400">$</span>
              </div>
              <div className="relative flex-1 min-w-[120px] flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`w-full bg-transparent text-white font-mono text-xs sm:text-[13px] outline-none border-none p-0 focus:ring-0 focus:outline-none ${theme.caretColor}`}
                  autoComplete="off"
                  spellCheck="false"
                  autoCapitalize="off"
                  autoCorrect="off"
                  placeholder={history.length === 1 ? "type 'help' or click a command..." : ""}
                />
              </div>
            </form>

            <div ref={terminalEndRef} />
          </div>

          {/* UNIX / Tmux Status Bar at Bottom */}
          <div className={`flex items-center justify-between px-3 sm:px-4 py-1.5 ${theme.statusBarBg} border-t ${theme.border} text-[10px] sm:text-[11px] font-mono text-slate-500 select-none`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span className="hidden sm:inline">UTF-8</span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span className="text-slate-400">{theme.name}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <span className="hidden md:inline text-slate-600">Shortcuts:</span>
              <span className="hidden sm:inline"><kbd className="px-1 py-0.2 rounded bg-white/[0.08] text-slate-300 text-[10px]">Tab</kbd> complete</span>
              <span className="hidden sm:inline"><kbd className="px-1 py-0.2 rounded bg-white/[0.08] text-slate-300 text-[10px]">↑/↓</kbd> history</span>
              <span><kbd className="px-1 py-0.2 rounded bg-white/[0.08] text-slate-300 text-[10px]">Ctrl+L</kbd> clear</span>
              <span><kbd className="px-1 py-0.2 rounded bg-white/[0.08] text-slate-300 text-[10px]">Esc</kbd> exit</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TerminalModal;
