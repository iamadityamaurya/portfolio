import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Calendar, Github, ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const SectionLabel = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-3 select-none">
    <span className="w-4 h-px bg-emerald-400" />
    {children}
    <span className="w-4 h-px bg-emerald-400" />
  </span>
);

const HackathonsPage = () => {
  return (
    <div className="min-h-screen bg-transparent text-slate-50 relative selection:bg-emerald-500/30 selection:text-emerald-400 antialiased font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#050202] via-[#050202]/95 to-[#050202] pointer-events-none"></div>

      <main className="container mx-auto px-6 py-12 relative z-10 max-w-6xl">
        {/* Header */}
        <Link to="/" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        <header className="mt-12 border-b border-slate-800/80 pb-10 text-center">
          
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-100 md:text-6xl">
            Hackathons & <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">winnings.</span>
          </h1>
        </header>
  
        <div className="mt-8" />

        {/* Hackathons Row List */}
        <div className="flex flex-col gap-8">
          {hackathons.map((hackathon) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative bg-[#0a0404]/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-10"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Left Column: Hackathon Name, Position & Tech Used (md:w-5/12) */}
              <div className="md:w-5/12 shrink-0 flex flex-col justify-between relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl select-none">{hackathon.medal}</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 uppercase tracking-wider select-none">
                      {hackathon.position} • {hackathon.prize}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100 group-hover:text-emerald-400 transition-colors leading-tight">
                      {hackathon.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-mono tracking-wider uppercase mt-2 select-none">
                      {hackathon.hackathon}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-mono select-none">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-700" />
                      <span>{hackathon.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-700" />
                      <span>{hackathon.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-2.5 select-none">
                    Technologies Employed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hackathon.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/90 select-none">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Description & Challenges (md:w-7/12) */}
              <div className="md:w-7/12 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-900 pt-6 md:pt-0 md:pl-10 relative z-10">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-2 select-none">
                      Overview
                    </h4>
                    <p className="text-sm md:text-base text-slate-350 leading-relaxed font-sans">
                      {hackathon.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {hackathon.challenge && (
                      <div className="py-3 px-4 bg-slate-950/60 border border-slate-900 rounded-xl">
                        <span className="text-[9px] font-mono text-slate-650 uppercase block mb-1 tracking-wider select-none font-bold">Engineering Challenge</span>
                        <span className="text-xs md:text-sm text-slate-400 leading-relaxed block">{hackathon.challenge}</span>
                      </div>
                    )}
                    {hackathon.outcome && (
                      <div className="py-3 px-4 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-xl">
                        <span className="text-[9px] font-mono text-emerald-400/85 uppercase block mb-1 tracking-wider select-none font-bold">Key Outcome</span>
                        <span className="text-xs md:text-sm text-slate-400 leading-relaxed block">{hackathon.outcome}</span>
                      </div>
                    )}
                  </div>
                </div>

                {hackathon.links && (
                  <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-900/60">
                    {hackathon.links.code && (
                      <a href={hackathon.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800 cursor-pointer">
                        <Github className="w-4 h-4" /> Hardware Source
                      </a>
                    )}
                    {hackathon.links.demo && (
                      <a href={hackathon.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/10 cursor-pointer">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HackathonsPage;
