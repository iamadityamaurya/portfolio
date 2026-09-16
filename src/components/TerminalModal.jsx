import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Maximize2, Minimize2, Terminal as TerminalIcon, 
  CornerDownLeft, Radio, Cpu, Award, FolderGit2, User, 
  Mail, Sparkles, Check, ExternalLink, GraduationCap,
  Globe, Smartphone, Layers, Wrench, ArrowRight, Github,
  Linkedin, FileText, Send, Copy, Info
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

  const quickCommands = [
    'help', 'about', 'projects', 'skills', 'hackathons', 'education', 'contact', 'ls', 'clear'
  ];

  const allKnownCommands = [
    'help', 'about', 'bio', 'projects', 'skills', 'tech', 'hackathons', 'awards',
    'education', 'college', 'bunkmait', 'fireshield', 'linefollower', 'nexgenquery',
    'robot-status', 'telemetry', 'contact', 'email', 'mail', 'github', 'git',
    'linkedin', 'resume', 'cv', 'whoami', 'pwd', 'ls', 'dir', 'cat', 'date',
    'sudo', 'clear', 'cls', 'exit', 'quit', 'history', 'echo'
  ];

  const renderBanner = () => (
    <div className="space-y-2 pb-3 text-xs sm:text-sm font-mono border-b border-slate-800/80">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-cyan-400 font-bold tracking-wider text-xs sm:text-sm flex items-center gap-2">
          <span>⚡ ADITYA KUMAR MAURYA — CORE TELEMETRY CLI [v3.2.0]</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">Type "help" or "ls"</span>
      </div>
      <div className="text-slate-400 flex items-center gap-2 flex-wrap text-xs">
        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        <span className="text-slate-500">Host:</span>
        <span className="text-slate-200 font-semibold">aditya@portfolio-core</span>
        <span className="text-slate-700">|</span>
        <span className="text-slate-400">MAIT Delhi (ECE)</span>
        <span className="text-slate-700">|</span>
        <span className="text-amber-400 font-semibold">3x Hackathon Champion</span>
      </div>
      <div className="text-slate-500 text-xs">
        Use <span className="text-slate-300 font-semibold">Tab</span> for auto-complete, <span className="text-slate-300 font-semibold">↑ / ↓</span> for history, or click quick actions above.
      </div>
    </div>
  );

  // Initialize terminal banner
  useEffect(() => {
    if (isOpen) {
      if (history.length === 0) {
        setHistory([
          {
            type: 'banner',
            content: renderBanner()
          }
        ]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Close on Escape & Global Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const executeCommand = (cmdText) => {
    const cleanCmd = cmdText.trim();
    if (!cleanCmd) return;

    // Add to command history for arrow navigation
    setCommandHistory(prev => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const parts = cleanCmd.toLowerCase().split(' ');
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(' ').trim();

    const newHistoryItem = {
      type: 'command',
      command: cleanCmd,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    if (mainCmd === 'clear' || mainCmd === 'cls') {
      setHistory([
        {
          type: 'banner',
          content: renderBanner()
        }
      ]);
      setInput('');
      return;
    }

    if (mainCmd === 'exit' || mainCmd === 'quit' || mainCmd === 'q') {
      onClose();
      return;
    }

    let outputComponent = null;

    switch (mainCmd) {
      case 'help':
        outputComponent = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-white font-bold flex items-center gap-1.5">
              <span>Available CLI Commands:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">about</span> / <span className="text-cyan-400">bio</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Bio, background &amp; engineering domains</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">projects</span> / <span className="text-cyan-400">bunkmait</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Browse web, mobile, IoT &amp; CAD builds</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">skills</span> / <span className="text-cyan-400">tech</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Technical stack, tools &amp; frameworks</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">hackathons</span> / <span className="text-cyan-400">awards</span>
                <p className="text-slate-400 text-[11px] mt-0.5">3x Hackathon championships info</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">contact</span> / <span className="text-cyan-400">email</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Email, GitHub, and social channels</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">telemetry</span> / <span className="text-cyan-400">robot-status</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Simulate live ROS 2 hardware monitor</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">ls</span> / <span className="text-cyan-400">cat &lt;file&gt;</span>
                <p className="text-slate-400 text-[11px] mt-0.5">List files or inspect section files</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">github</span> / <span className="text-cyan-400">linkedin</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Direct profile links &amp; repositories</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold">whoami</span> / <span className="text-cyan-400">pwd</span> / <span className="text-cyan-400">date</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Shell utilities &amp; identity</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        outputComponent = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-slate-300">
            <div className="flex items-center gap-2 text-white font-bold">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Aditya Kumar Maurya — Full-Stack &amp; Hardware Engineer</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Hey! I'm Aditya Kumar Maurya — a developer, IoT engineer, and 3x Hackathon Winner pursuing B.Tech in Electronics &amp; Communication Engineering at Maharaja Agrasen Institute of Technology (MAIT), Rohini, Delhi.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I specialize in bridging digital software with physical hardware: from Next.js 16 web applications and React Native mobile apps, to ESP32 smart home systems, high-speed line followers, and ROS 2 robotics.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div><span className="text-slate-500">Degree:</span> <span className="text-slate-200">B.Tech in ECE (2024–2028)</span></div>
              <div><span className="text-slate-500">College:</span> <span className="text-cyan-300">MAIT, Rohini, Delhi</span></div>
              <div><span className="text-slate-500">Track Record:</span> <span className="text-amber-300">3x Hackathon Champion</span></div>
              <div><span className="text-slate-500">Domains:</span> <span className="text-slate-200">Full Stack, Mobile, IoT, ROS 2</span></div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputComponent = (
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <div className="text-white font-semibold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                Featured Projects Catalog ({projectsData.length} items):
              </span>
              <a href="/project" className="text-cyan-400 hover:underline text-xs flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-2.5">
              {projectsData.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="text-white font-bold">{p.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2 leading-relaxed">{p.tagline || p.description}</p>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="text-slate-400">Stack:</span>
                    {p.tech.slice(0, 5).map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {t}
                      </span>
                    ))}
                    {p.links?.demo && (
                      <a 
                        href={p.links.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-auto inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline font-semibold"
                      >
                        Live App <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {p.links?.github && !p.links?.demo && (
                      <a 
                        href={p.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-auto inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline font-semibold"
                      >
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'hackathons':
      case 'awards':
        outputComponent = (
          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <div className="text-white font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>3x Hackathon Championships &amp; Hardware Victories:</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <div className="flex justify-between items-center font-bold">
                  <span>🏆 1st Prize — CULMYCA'26 Fast Line Follower</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20">Lap: 14.8s</span>
                </div>
                <p className="text-xs text-amber-200/80 mt-1">
                  Engineered 8-channel IR sensor array with custom AVR registers &amp; fixed-point PID steering for high-speed track navigation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                <div className="flex justify-between items-center font-bold">
                  <span>🏆 1st Prize — CULMYCA'26 FireShield IoT System</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20">&lt;50ms Latency</span>
                </div>
                <p className="text-xs text-amber-200/80 mt-1">
                  Real-time smart home fire and gas detection with dual-core ESP32 edge telemetry and React Native push alert dispatch.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                <div className="flex justify-between items-center font-bold">
                  <span>🥇 Competitive Hardware &amp; Robotics Champion</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">Faridabad</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Autonomous robotics trajectory optimization, custom chassis CAD design, and high-frequency sensor integration.
                </p>
              </div>
            </div>
          </div>
        );
        break;

      case 'skills':
      case 'tech':
        outputComponent = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-white font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Technical Arsenal &amp; Tech Stack:</span>
            </div>
            
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-cyan-400 font-semibold mb-1 text-xs flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Frontend, Web &amp; Mobile:</span>
                </div>
                <div className="text-slate-300 text-xs leading-relaxed">
                  React, Next.js, TypeScript, JavaScript (ES6+), React Native / Expo, Tailwind CSS, Framer Motion.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-blue-400 font-semibold mb-1 text-xs flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Hardware, Embedded &amp; Robotics:</span>
                </div>
                <div className="text-slate-300 text-xs leading-relaxed">
                  C++, C, Python, Arduino / ATmega328P, ESP32, ROS 2, Fixed-Point PID, 3D CAD (Onshape), 3D Printing.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-purple-400 font-semibold mb-1 text-xs flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Backend, Cloud &amp; Databases:</span>
                </div>
                <div className="text-slate-300 text-xs leading-relaxed">
                  Node.js, Express, Supabase (PostgreSQL), Firebase, MongoDB, Socket.IO, WebSockets, REST APIs.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-amber-400 font-semibold mb-1 text-xs flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Tools &amp; DevOps:</span>
                </div>
                <div className="text-slate-300 text-xs leading-relaxed">
                  Git, GitHub, Linux / Bash, Docker, Vite, Vercel, Render.
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'education':
      case 'college':
        outputComponent = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-purple-400 font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Background:</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-slate-100 font-bold text-sm">
                Maharaja Agrasen Institute of Technology (MAIT)
              </div>
              <div className="text-cyan-400 text-xs">
                Bachelor of Technology (B.Tech) — Electronics &amp; Communication Engineering
              </div>
              <div className="text-slate-400 text-xs">
                📅 Duration: 2024 – 2028 (3rd Year) • 📍 Rohini, Delhi, India
              </div>
              <div className="text-slate-400 text-xs pt-1 border-t border-slate-800">
                Core Focus: Microprocessors &amp; Microcontrollers, Digital Signal Processing, Embedded Systems, Computer Networks, VLSI &amp; Circuit Theory.
              </div>
            </div>
          </div>
        );
        break;

      case 'contact':
      case 'email':
      case 'mail':
        outputComponent = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-white font-bold flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Direct Communication Endpoints:</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-16">Email:</span>
                  <a href="mailto:adityamaurya1947@gmail.com" className="text-cyan-400 hover:underline font-semibold">
                    adityamaurya1947@gmail.com
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard('adityamaurya1947@gmail.com')}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px] cursor-pointer"
                >
                  {copiedEmail ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-16">GitHub:</span>
                <a href="https://github.com/iamadityamaurya" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white hover:underline">
                  github.com/iamadityamaurya
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-16">LinkedIn:</span>
                <a href="https://www.linkedin.com/in/iamadityamaurya/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white hover:underline">
                  linkedin.com/in/iamadityamaurya
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 w-16">Portfolio:</span>
                <a href="https://iamadityamaurya.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white hover:underline">
                  iamadityamaurya.vercel.app
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case 'github':
      case 'git':
        outputComponent = (
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>GitHub Profile — @iamadityamaurya</span>
            </div>
            <p className="text-slate-400">Explore open source repositories, firmware sketches, and project repositories.</p>
            <a 
              href="https://github.com/iamadityamaurya" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700 font-bold transition-colors"
            >
              Open github.com/iamadityamaurya <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        );
        break;

      case 'linkedin':
        outputComponent = (
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn Profile — Aditya Kumar Maurya</span>
            </div>
            <p className="text-slate-400">Connect for professional opportunities, collaborations, and engineering conversations.</p>
            <a 
              href="https://www.linkedin.com/in/iamadityamaurya/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-blue-400 hover:bg-slate-700 font-bold transition-colors"
            >
              Open LinkedIn Profile <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        outputComponent = (
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-mono space-y-2">
            <div className="text-white font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Aditya Kumar Maurya — Curriculum Vitae / Resume</span>
            </div>
            <p className="text-slate-400">Full-Stack Development, Mobile Engineering, IoT / Embedded Systems &amp; Robotics.</p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="/Aditya_Kumar_Maurya_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-slate-200 font-bold transition-colors"
              >
                Download Resume <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        );
        break;

      case 'bunkmait':
        outputComponent = (
          <div className="space-y-2.5 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-white font-bold flex items-center gap-2">
              <span>BunkMAIT — College Attendance &amp; Timetable Suite</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Solves attendance anxiety for university students by combining automated section timetables with predictive attendance analytics. Built with Next.js 16 on web and React Native / Expo on mobile.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div>• Tech Stack: Next.js 16, Expo, TypeScript, Supabase (PostgreSQL), Tailwind CSS, Framer Motion</div>
              <div>• Features: Safe bunk threshold simulation, slot-wise attendance, teacher cabin directory, syllabus downloads</div>
            </div>
            <a 
              href="https://bunkmait.adityamaurya.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-slate-200 font-bold transition-colors"
            >
              Open Live Web App <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        );
        break;

      case 'robot-status':
      case 'telemetry':
        outputComponent = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>ROS 2 Node Telemetry &amp; Hardware Monitor</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                PULSE: 1000 Hz
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-slate-500 text-[11px]">MASTER NODE</div>
                <div className="text-cyan-400 font-bold text-xs mt-0.5">/core_telemetry [ONLINE]</div>
                <div className="text-slate-400 text-[11px] mt-1">ROS 2 Humble • Domain: 42</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-slate-500 text-[11px]">BATTERY PACK</div>
                <div className="text-cyan-400 font-bold text-xs mt-0.5">12.42V (3S LiPo - 94%)</div>
                <div className="text-slate-400 text-[11px] mt-1">Temp: 28.4°C • Nominal</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-slate-500 text-[11px]">PID LOOP GAINS</div>
                <div className="text-amber-300 font-bold text-xs mt-0.5">Kp: 4.8 | Kd: 2.1 | Ki: 0.05</div>
                <div className="text-slate-400 text-[11px] mt-1">Tracking Error: ±0.002 mm</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                <div className="text-slate-500 text-[11px]">EDGE SENSORS</div>
                <div className="text-purple-400 font-bold text-xs mt-0.5">8-Ch IR Array [CALIBRATED]</div>
                <div className="text-slate-400 text-[11px] mt-1">Sampling: Direct AVR Registers</div>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs flex items-center justify-between">
              <span>● System state: NOMINAL — Ready for teleoperation</span>
              <span className="text-[10px] text-cyan-400 font-mono">LATENCY: 4ms</span>
            </div>
          </div>
        );
        break;

      case 'ls':
      case 'dir':
        outputComponent = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <div className="text-slate-400 text-xs">Directory contents in ~/portfolio:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <span className="text-cyan-300 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('about')}>about.md</span>
              <span className="text-purple-300 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('projects')}>projects/</span>
              <span className="text-blue-300 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('skills')}>skills.json</span>
              <span className="text-amber-300 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('hackathons')}>hackathons.log</span>
              <span className="text-emerald-300 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('contact')}>contact.sh</span>
              <span className="text-rose-300 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('bunkmait')}>bunkmait/</span>
              <span className="text-slate-300 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('resume')}>resume.pdf</span>
              <span className="text-cyan-400 font-bold cursor-pointer hover:underline" onClick={() => executeCommand('telemetry')}>telemetry.ros2</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">💡 Type <span className="text-slate-300">"cat &lt;file&gt;"</span> or click any file above to view.</p>
          </div>
        );
        break;

      case 'cat':
        if (!arg) {
          outputComponent = (
            <div className="text-xs sm:text-sm font-mono text-amber-400">
              usage: cat &lt;filename&gt; (e.g. "cat about.md", "cat projects", "cat contact.sh")
            </div>
          );
        } else {
          const target = arg.toLowerCase().replace('.md', '').replace('.json', '').replace('.sh', '').replace('.txt', '').replace('.log', '').replace('.pdf', '').replace('/', '');
          if (['about', 'bio'].includes(target)) executeCommand('about');
          else if (['projects', 'project'].includes(target)) executeCommand('projects');
          else if (['skills', 'skill', 'tech'].includes(target)) executeCommand('skills');
          else if (['hackathons', 'hackathon', 'awards'].includes(target)) executeCommand('hackathons');
          else if (['contact', 'email'].includes(target)) executeCommand('contact');
          else if (['bunkmait'].includes(target)) executeCommand('bunkmait');
          else if (['resume', 'cv'].includes(target)) executeCommand('resume');
          else if (['telemetry', 'robot-status'].includes(target)) executeCommand('telemetry');
          else {
            outputComponent = (
              <div className="text-xs sm:text-sm font-mono text-rose-400">
                cat: {arg}: No such file or directory. Type "ls" to view files.
              </div>
            );
          }
        }
        break;

      case 'cd':
        outputComponent = (
          <div className="text-xs sm:text-sm font-mono text-slate-400">
            Directory unchanged (~/portfolio). All sections and commands are accessible directly from this shell. Type <span className="text-cyan-400 font-bold cursor-pointer" onClick={() => executeCommand('ls')}>"ls"</span> to explore.
          </div>
        );
        break;

      case 'whoami':
        outputComponent = (
          <div className="text-xs sm:text-sm font-mono text-cyan-400">
            aditya — Full-Stack Developer &amp; Hardware Engineer [MAIT Delhi]
          </div>
        );
        break;

      case 'pwd':
        outputComponent = (
          <div className="text-xs sm:text-sm font-mono text-slate-300">
            /home/aditya/portfolio
          </div>
        );
        break;

      case 'date':
        outputComponent = (
          <div className="text-xs sm:text-sm font-mono text-slate-300">
            {new Date().toString()}
          </div>
        );
        break;

      case 'sudo':
        outputComponent = (
          <div className="text-xs sm:text-sm font-mono text-cyan-400">
            [sudo] user 'aditya' is authorized in sudoers. Full portfolio privileges active.
          </div>
        );
        break;

      case 'echo':
        outputComponent = (
          <div className="text-xs sm:text-sm font-mono text-slate-300">
            {arg || ''}
          </div>
        );
        break;

      case 'history':
        outputComponent = (
          <div className="space-y-1 text-xs font-mono text-slate-400">
            <div className="text-slate-300 font-bold">Recent Command History:</div>
            {commandHistory.slice(-8).map((cmd, idx) => (
              <div key={idx} className="text-slate-400 pl-2">
                {idx + 1}. <span className="text-cyan-300">{cmd}</span>
              </div>
            ))}
          </div>
        );
        break;

      default:
        outputComponent = (
          <div className="text-xs sm:text-sm font-mono text-rose-400">
            command not found: "{cleanCmd}". Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => executeCommand('help')}>"help"</span> or <span className="text-cyan-300 underline cursor-pointer" onClick={() => executeCommand('ls')}>"ls"</span> for valid commands.
          </div>
        );
        break;
    }

    if (outputComponent) {
      setHistory(prev => [
        ...prev,
        newHistoryItem,
        { type: 'output', content: outputComponent }
      ]);
    }

    setInput('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = input.trim().toLowerCase();
      if (currentInput) {
        const match = allKnownCommands.find(cmd => cmd.startsWith(currentInput));
        if (match) {
          setInput(match);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={`relative flex flex-col w-full rounded-2xl bg-[#090c15] border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden z-10 transition-all duration-200 ${
              isMaximized ? 'h-[94vh] max-w-[96vw]' : 'max-w-3xl h-[590px] max-h-[85vh]'
            }`}
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d111c] border-b border-slate-800 select-none">
              {/* Left: Window Dots & Title */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={onClose} 
                    className="w-3 h-3 rounded-full bg-[#ef4444] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center text-[8px] text-black opacity-90 group"
                    title="Close"
                  />
                  <button 
                    onClick={() => executeCommand('clear')} 
                    className="w-3 h-3 rounded-full bg-[#eab308] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center text-[8px] text-black opacity-90"
                    title="Clear Buffer"
                  />
                  <button 
                    onClick={() => setIsMaximized(!isMaximized)} 
                    className="w-3 h-3 rounded-full bg-[#22c55e] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center text-[8px] text-black opacity-90"
                    title="Maximize / Minimize"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>aditya@portfolio:~ (zsh)</span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1.5 text-slate-400">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
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

            {/* Quick Actions Row */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0b0e18] border-b border-slate-800/80 overflow-x-auto no-scrollbar text-xs font-mono">
              <span className="text-slate-500 font-medium shrink-0">quick:</span>
              <div className="flex items-center gap-1.5">
                {quickCommands.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-[11px] transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Body Output Area */}
            <div 
              className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 font-mono text-slate-200"
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
                    <div key={index} className="pl-3 sm:pl-4 border-l-2 border-slate-800 my-2">
                      {item.content}
                    </div>
                  );
                }
                return null;
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Bottom Input Bar */}
            <form 
              onSubmit={handleFormSubmit}
              className="flex items-center gap-2 px-4 py-3 bg-[#0d111c] border-t border-slate-800"
            >
              <span className="text-cyan-400 font-mono font-bold text-sm select-none">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command (e.g. 'help', 'about', 'projects', 'email', 'ls')..."
                className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-500 font-mono text-xs sm:text-sm outline-none"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex items-center justify-center p-2 rounded-lg bg-white hover:bg-slate-200 text-slate-950 font-bold disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-950 transition-all cursor-pointer"
                title="Execute command (Enter)"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
