import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, ArrowLeft, Calendar, Users, Award,
  ExternalLink, Github, MapPin, Cpu, Wrench,
  Layers, Activity, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import fireshieldBanner from '../assets/project_png/fireshield-showcase.png';

const hackathons = [
  {
    id: 4,
    name: "CULMYCA’26 LFR (Line Follower Robot)",
    hackathon: "CULMYCA’26 Robotics",
    position: "1st",
    prize: "1st Place Winner",
    date: "10th April 2026",
    location: "J.C Bose (YMCA Faridabad)",
    description: "Secured 1st position in the high-speed Line Follower Robot competition. Designed and calibrated a high-speed tracking robot optimized for complex grids, intersections, and loops.",
    tech: ["Arduino Nano", "C++", "Sensors", "Hardware Design"],
    teamSize: 3,
    highlight: "Advanced 8-Channel Tracking",
    color: "emerald",
    medal: "🥇",
    specs: [
      { label: "Microcontroller", value: "Arduino Nano (ATmega328P @ 16MHz)" },
      { label: "Sensor Array", value: "8x TCRT5000 IR Phototransistors" },
      { label: "Actuators", value: "2x N20 Micro Gearmotors (6V, 600 RPM)" },
      { label: "Motor Driver", value: "TB6612FNG Dual H-Bridge" },
      { label: "Power Source", value: "7.4V 2S LiPo Battery (450mAh)" },
      { label: "Control Algorithm", value: "PID Control Loop with Dynamic Speed Scaling" },
      { label: "Hardware Chassis", value: "FR4 Fiberglass Laminate PCB Base Plate" }
    ],
    challenge: "Tuning the PID parameters (Kp, Ki, Kd) to prevent oscillation at top speeds on sharp 90-degree turns and loops. Solved by implementing dynamic Kp scaling based on current error magnitude and steering variance.",
    outcome: "Achieved the fastest run of 14.8 seconds, beating the runner-up by 2.1 seconds, with perfect line tracking stability."
  },
  {
    id: 3,
    name: "CULMYCA’26 Arduino Innovation (Fireshield)",
    hackathon: "CULMYCA’26 Innovation",
    position: "1st",
    prize: "1st Place Winner",
    date: "10th April 2024",
    location: "J.C Bose (YMCA Faridabad)",
    description: "Developed FireShield, a smart home fire and gas safety system. Features voice alerts, native push notifications, and real-time telemetry updates during emergency alerts.",
    tech: ["ESP32", "Arduino C++", "Node.js", "React Native", "Socket.IO"],
    teamSize: 3,
    highlight: "Real-time IoT Safety",
    color: "purple",
    medal: "🥇",
    image: fireshieldBanner,
    links: {
      code: "https://github.com/iamadityamaurya/fire",
      demo: "https://fire-1-l13l.onrender.com/health"
    },
    specs: [
      { label: "Microcontroller", value: "ESP32-WROOM-32D (Dual-Core @ 240MHz)" },
      { label: "Gas Detection", value: "MQ-2 Semiconductor Gas/Smoke Sensor" },
      { label: "Climate Tracking", value: "DHT22 Precision Temperature & Humidity" },
      { label: "Telemetry Protocol", value: "WebSockets via Socket.IO for real-time streams" },
      { label: "Alert System", value: "Expo Push Notification Service & TTS Engine" },
      { label: "Local Alarm", value: "85dB Active Piezo Buzzer & High-Intensity Status LED" }
    ],
    challenge: "Developing a non-blocking firmware architecture to continuously sample sensor data and trigger buzzer alerts while concurrently handling Wi-Fi handshakes and Socket.IO connections.",
    outcome: "First-place prize for the most complete, deployable IoT integration, demonstrating a live demo with simulated gas leaks and instant app notifications."
  },
  {
    id: 2,
    name: "LFR (Line Follower Robot)",
    hackathon: "YMCA Robotics Event",
    position: "2nd",
    prize: "Runner-Up",
    date: "3rd Feb 2026",
    location: "J.C Bose (YMCA Faridabad)",
    description: "Designed and built a custom Line Follower Robot with a 3D-printed chassis, 5-channel IR sensor, and N20 motors. Optimized hardware and tracking algorithms to secure the 2nd position.",
    tech: ["Arduino Nano", "C++", "3D Printing", "Robotics"],
    teamSize: 3,
    highlight: "Custom 3D-Printed Chassis",
    color: "blue",
    medal: "🥈",
    specs: [
      { label: "Microcontroller", value: "Arduino Nano (ATmega328P)" },
      { label: "Sensor Array", value: "5x TCRT5000 IR Sensor Board" },
      { label: "Chassis", value: "Custom 3D Printed PETG Chassis (designed in Onshape)" },
      { label: "Actuators", value: "2x N20 Micro Gearmotors (600 RPM)" },
      { label: "Control Algorithm", value: "Standard PID loop with speed clipping" },
      { label: "Power Source", value: "7.4V 2S LiPo Battery" }
    ],
    challenge: "Chassis flex and weight distribution causing traction loss on high-speed turns. Solved by redesigning the chassis in Onshape with reinforcing ribs and lowering the battery mount for a better center of gravity.",
    outcome: "Secured second place in a high-speed sprint trial. Run time of 16.4 seconds, with robust chassis stability throughout all runs."
  }
];

const TelemetryWidget = () => {
  const [gasLevel, setGasLevel] = useState(120);
  const [temp, setTemp] = useState(24.5);
  const [humidity, setHumidity] = useState(48.2);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setGasLevel(prev => Math.max(80, Math.min(250, Math.round(prev + (Math.random() - 0.5) * 15))));
      setTemp(prev => Math.max(22, Math.min(27, Number((prev + (Math.random() - 0.5) * 0.4).toFixed(2)))));
      setHumidity(prev => Math.max(40, Math.min(60, Number((prev + (Math.random() - 0.5) * 0.8).toFixed(2)))));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const isAlert = gasLevel > 200;

  return (
    <div className="bg-[#0a0404]/90 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-slate-400 relative overflow-hidden shadow-inner">
      <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live Device Telemetry</span>
        <span className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isAlert ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
          <span className={`text-[10px] font-bold ${isAlert ? 'text-red-400' : 'text-emerald-400'}`}>
            {isAlert ? 'ALARM: GAS DETECTED' : 'SYSTEM ONLINE'}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-900">
          <p className="text-[9px] text-slate-500 uppercase">Gas (MQ2)</p>
          <p className={`text-base font-bold mt-1 ${isAlert ? 'text-red-400 font-extrabold' : 'text-slate-200'}`}>{gasLevel} <span className="text-[9px] text-slate-500 font-normal">ppm</span></p>
        </div>
        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-900">
          <p className="text-[9px] text-slate-500 uppercase">Temp (DHT22)</p>
          <p className="text-base font-bold mt-1 text-slate-200">{temp}°C</p>
        </div>
        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-900">
          <p className="text-[9px] text-slate-500 uppercase">Humidity</p>
          <p className="text-base font-bold mt-1 text-slate-200">{humidity}%</p>
        </div>
      </div>

      <div className="p-2 bg-slate-950/60 rounded border border-slate-900 text-[9px] leading-relaxed text-left text-slate-500">
        <p>&gt; ESP32-WROOM-32 booting firmware...</p>
        <p>&gt; Connection established with Node.js websocket server.</p>
        <p>&gt; Broadcast buffer size: 512B. Telemetry sampling: 10Hz.</p>
      </div>
    </div>
  );
};

const LFR8ChannelSVG = () => (
  <div className="w-full h-full flex items-center justify-center bg-[#070303]/40 border border-slate-900 rounded-2xl p-4 relative overflow-hidden aspect-[4/3] max-h-[300px]">
    <svg viewBox="0 0 400 300" className="w-full h-full text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.5">
      <defs>
        <pattern id="svg-grid-lfr8" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#svg-grid-lfr8)" />

      {/* Robot chassis outline */}
      <path d="M120,60 C120,40 280,40 280,60 L290,200 C290,230 270,250 200,250 C130,250 110,230 110,200 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="stroke-slate-800" />

      {/* 8 Sensors curve */}
      <path d="M135,50 Q200,35 265,50" stroke="currentColor" strokeWidth="1.5" className="stroke-emerald-500/20" />
      {/* Sensors TCRT5000 */}
      {[135, 153, 172, 191, 209, 228, 247, 265].map((cx, i) => (
        <circle key={i} cx={cx} cy={40 + Math.pow(Math.abs(cx - 200) / 30, 2)} r="4" className="fill-emerald-500/80 stroke-emerald-400" strokeWidth="1" />
      ))}

      {/* Arduino Nano MCU box */}
      <rect x="170" y="100" width="60" height="95" rx="4" className="stroke-slate-800 fill-slate-950/90" />
      <text x="200" y="152" textAnchor="middle" className="fill-slate-600 font-mono text-[9px]" stroke="none">ATmega328P</text>
      <text x="200" y="130" textAnchor="middle" className="fill-emerald-400 font-mono text-[10px] font-bold" stroke="none">MCU</text>

      {/* Motors */}
      <rect x="80" y="160" width="30" height="50" rx="2" className="stroke-slate-800 fill-slate-950" />
      <rect x="290" y="160" width="30" height="50" rx="2" className="stroke-slate-800 fill-slate-950" />
      <line x1="110" y1="185" x2="170" y2="150" stroke="currentColor" className="stroke-slate-800" />
      <line x1="290" y1="185" x2="230" y2="150" stroke="currentColor" className="stroke-slate-800" />

      {/* Wheels */}
      <rect x="65" y="170" width="15" height="30" rx="2" className="stroke-slate-800 fill-slate-900" />
      <rect x="320" y="170" width="15" height="30" rx="2" className="stroke-slate-800 fill-slate-900" />

      {/* Labels */}
      <path d="M65,185 L35,185 L35,140 L50,140" stroke="currentColor" className="stroke-slate-800" />
      <text x="35" y="130" className="fill-slate-500 font-mono text-[9px]" stroke="none">N20 Motors</text>

      <path d="M135,45 L95,45 L95,90 L115,90" stroke="currentColor" className="stroke-slate-800" />
      <text x="95" y="80" className="fill-slate-500 font-mono text-[9px]" stroke="none">8x IR Array</text>
    </svg>
  </div>
);

const LFR5ChannelSVG = () => (
  <div className="w-full h-full flex items-center justify-center bg-[#070303]/40 border border-slate-900 rounded-2xl p-4 relative overflow-hidden aspect-[4/3] max-h-[300px]">
    <svg viewBox="0 0 400 300" className="w-full h-full text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.5">
      <defs>
        <pattern id="svg-grid-lfr5" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#svg-grid-lfr5)" />

      {/* 3D printed chassis details */}
      <path d="M130,70 L270,70 L270,110 L250,110 L250,210 L230,230 L170,230 L150,210 L150,110 L130,110 Z" stroke="currentColor" strokeWidth="2" className="stroke-slate-800 fill-slate-950/40" />
      <path d="M150,130 L250,130 M150,180 L250,180" stroke="currentColor" className="stroke-slate-800" />

      {/* 5 Sensors */}
      <path d="M140,65 L260,65" stroke="currentColor" strokeWidth="1" className="stroke-blue-500/20" />
      {[140, 170, 200, 230, 260].map((cx, i) => (
        <circle key={i} cx={cx} cy={65} r="4" className="fill-blue-500/80 stroke-blue-400" strokeWidth="1" />
      ))}

      {/* Arduino Nano MCU box */}
      <rect x="175" y="120" width="50" height="70" rx="3" className="stroke-slate-800 fill-slate-950/90" />
      <text x="200" y="160" textAnchor="middle" className="fill-slate-600 font-mono text-[8px]" stroke="none">328P</text>
      <text x="200" y="145" textAnchor="middle" className="fill-blue-400 font-mono text-[10px] font-bold" stroke="none">Nano</text>

      {/* Motors */}
      <rect x="110" y="180" width="25" height="40" rx="1" className="stroke-slate-800 fill-slate-900" transform="rotate(-10 110 180)" />
      <rect x="265" y="180" width="25" height="40" rx="1" className="stroke-slate-800 fill-slate-900" transform="rotate(10 265 180)" />

      <text x="200" y="260" textAnchor="middle" className="fill-slate-500 font-mono text-[9px]" stroke="none">3D-Printed Chassis (Onshape)</text>
    </svg>
  </div>
);

const HackathonPage = () => {
  const [activeTab, setActiveTab] = useState(hackathons[0].id);
  const activeH = hackathons.find((h) => h.id === activeTab) || hackathons[0];

  const totalWins = hackathons.length;
  const firstPlaces = hackathons.filter(h => h.position === "1st").length;

  return (
    <div className="min-h-screen bg-transparent text-slate-55 relative selection:bg-emerald-550/30 selection:text-emerald-400 antialiased font-sans">
      {/* Background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#050202] via-[#050202]/95 to-[#050202] pointer-events-none" />

      {/* Ambient orbs */}
      <div className="fixed top-1/4 left-1/4 w-80 h-80 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <main className="container mx-auto px-6 py-12 relative z-10 max-w-6xl">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-10 transition-colors font-medium group text-sm"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page header */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 border-b border-slate-900 pb-10"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
              <Trophy className="w-5 h-5" />
            </span>
            <span className="text-slate-400 font-semibold tracking-widest text-xs uppercase font-mono">
              Competitive Engineering
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-heading">
                Hackathon <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-emerald-400">Winnings</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
                Hardware design and programming projects engineered during intense developer sprints. Fully documented system blueprints and hardware specifications below.
              </p>
            </div>

            {/* Quick Stats Panel */}
            <div className="flex gap-4 bg-slate-950/80 border border-slate-900 rounded-2xl p-4 w-full md:w-auto shrink-0 font-mono text-xs text-slate-400">
              <div className="px-4 border-r border-slate-900">
                <span className="text-slate-500 text-[10px] uppercase">Entries</span>
                <p className="text-xl font-bold text-slate-200 mt-1">{totalWins}</p>
              </div>
              <div className="px-4 border-r border-slate-900">
                <span className="text-slate-500 text-[10px] uppercase">First Places</span>
                <p className="text-xl font-bold text-yellow-400 mt-1">{firstPlaces} 🥇</p>
              </div>
              <div className="px-4">
                <span className="text-slate-500 text-[10px] uppercase">Record</span>
                <p className="text-xl font-bold text-emerald-400 mt-1">Undefeated</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Tabs (4 cols on lg) */}
          <nav className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block mb-3 px-2">
              Select Achievements
            </span>
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-3 pb-3 lg:pb-0 scrollbar-none shrink-0">
              {hackathons.map((h) => {
                const isActive = h.id === activeTab;
                return (
                  <button
                    key={h.id}
                    onClick={() => setActiveTab(h.id)}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-200 flex flex-col gap-2 shrink-0 max-w-[280px] lg:max-w-none cursor-pointer ${isActive
                        ? 'bg-slate-900/60 border-slate-800 text-slate-100 shadow-md shadow-emerald-500/[0.02]'
                        : 'bg-[#060303]/40 border-slate-950 hover:bg-slate-950/60 text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-bold font-mono tracking-wider px-2 py-0.5 rounded-md bg-slate-950 border border-slate-900 text-slate-400">
                        {h.hackathon}
                      </span>
                      <span className="text-sm">{h.medal}</span>
                    </div>
                    <div className="flex items-center justify-between w-full mt-1">
                      <span className="font-bold text-sm tracking-tight truncate max-w-[180px] lg:max-w-none">
                        {h.name.replace(/^(CULMYCA’26 |LFR )/, '')}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isActive ? 'translate-x-0.5 text-emerald-400' : 'text-slate-600'}`} />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{h.date}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right Dossier Panel (8 cols on lg) */}
          <section className="lg:col-span-8 bg-slate-950/40 border border-slate-900 rounded-3xl p-6 md:p-8 relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeH.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Dossier Header */}
                <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-900 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        <Award className="w-3.5 h-3.5" />
                        {activeH.prize}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{activeH.location}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
                      {activeH.name}
                    </h2>
                  </div>

                  {/* Team Badge */}
                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-xl text-xs text-slate-400 shrink-0 self-start">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="font-medium font-mono text-[11px]">Team size: {activeH.teamSize}</span>
                  </div>
                </header>

                {/* Grid layout for Details and Illustration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Left: Specs Sheet / System schematic */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-slate-300 font-bold text-sm tracking-wide uppercase font-mono">
                      <Cpu className="w-4.5 h-4.5 text-emerald-400" />
                      Hardware Specs
                    </div>

                    <div className="border border-slate-900 rounded-2xl overflow-hidden bg-[#070303]/40">
                      <table className="w-full text-xs font-mono">
                        <tbody>
                          {activeH.specs.map((spec, i) => (
                            <tr key={i} className="border-b border-slate-900 last:border-0 hover:bg-slate-950/80 transition-colors">
                              <td className="p-3 text-slate-500 font-medium select-none w-1/3">{spec.label}</td>
                              <td className="p-3 text-slate-300 w-2/3">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right: Technical Diagram / Image */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-slate-300 font-bold text-sm tracking-wide uppercase font-mono">
                      <Layers className="w-4.5 h-4.5 text-blue-400" />
                      System Layout
                    </div>

                    {/* Choose corresponding diagram or telemetry widget */}
                    {activeH.id === 4 && <LFR8ChannelSVG />}
                    {activeH.id === 2 && <LFR5ChannelSVG />}
                    {activeH.id === 3 && (
                      <div className="space-y-4">
                        {activeH.image && (
                          <div className="w-full aspect-[4/3] bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden relative group">
                            <img
                              src={activeH.image}
                              alt="FireShield prototype banner"
                              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-30 pointer-events-none" />
                          </div>
                        )}
                        <TelemetryWidget />
                      </div>
                    )}
                  </div>
                </div>

                {/* Case Study Details */}
                <div className="space-y-6 border-t border-slate-900 pt-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono mb-2">Project Brief</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">
                      {activeH.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-red-400/90 font-mono mb-2 flex items-center gap-1.5">
                        <Activity className="w-4 h-4 text-red-500" />
                        The Sprint Challenge
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {activeH.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400/90 font-mono mb-2 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-500" />
                        Engineering Outcome
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {activeH.outcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Badges & Project Links */}
                <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-900 pt-6 mt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {activeH.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-950 border border-slate-900 text-emerald-400/80">
                        {t}
                      </span>
                    ))}
                  </div>

                  {activeH.links && (
                    <div className="flex gap-2">
                      {activeH.links.demo && (
                        <a
                          href={activeH.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Telemetry API
                        </a>
                      )}
                      {activeH.links.code && (
                        <a
                          href={activeH.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer"
                        >
                          <Github className="w-3.5 h-3.5" /> Hardware Source
                        </a>
                      )}
                    </div>
                  )}
                </footer>
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HackathonPage;
