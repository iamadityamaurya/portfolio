import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowLeft, Calendar, Users, Zap, Award, Star, ExternalLink, Github, MapPin, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';

const hackathons = [
    {
        id: 4,
        name: "CULMYCA’26 LFR (Line Follower Robot)",
        hackathon: "CULMYCA’26",
        position: "1st",
        prize: "Winner",
        date: "10th April 2026",
        location: "J.C Bose (YMCA Faridabad)",
        description: "Secured 1st position in the Line Follower Robot competition. Engineered a high-speed, precision tracking robot featuring an 8-channel IR sensor array, Arduino Nano, and N20 motors.",
        tech: ["Arduino Nano", "C++", "Sensors", "Hardware Design"],
        teamSize: 3,
        highlight: "Advanced 8-Channel Tracking",
        color: "gold",
        medal: "🥇",
    },
    {
        id: 3,
        name: "CULMYCA’26 Arduino Innovation (Fireshield)",
        hackathon: "CULMYCA’26",
        position: "1st",
        prize: "Winner",
        date: "10th April 2024",
        location: "J.C Bose (YMCA Faridabad)",
        description: "Developed Fireshield, a smart home fire and gas safety system utilizing MQ2 gas sensors and DHT22 temperature sensors, providing real-time alerts and robust environmental monitoring.",
        tech: ["Arduino Nano", "C++", "IoT", "Sensors"],
        teamSize: 3,
        highlight: "Smart IoT Safety",
        color: "purple",
        medal: "🥇",
    },
    {
        id: 2,
        name: "LFR (Line Follower Robot)",
        hackathon: "YMCA Robotics Event",
        position: "2nd",
        prize: "Winner",
        date: "3rd Feb 2026",
        location: "J.C Bose (YMCA Faridabad)",
        description: "Designed and built a custom Line Follower Robot with a 3D-printed chassis, 5-channel IR sensor, and N20 motors. Optimized hardware and tracking algorithms to secure the 2nd position.",
        tech: ["Arduino Nano", "C++", "3D Printing", "Robotics"],
        teamSize: 3,
        highlight: "Custom 3D-Printed Chassis",
        color: "blue",
        medal: "🥈",
    },
    
];

const colorMap = {
    emerald: {
        gradient: "from-emerald-500 to-teal-400",
        glow: "shadow-emerald-500/20",
        border: "hover:border-emerald-500/60",
        badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        icon: "text-emerald-400",
        bar: "bg-emerald-500",
        tag: "bg-emerald-500/10 text-emerald-300",
        ring: "ring-emerald-500/30",
        orbA: "bg-emerald-500/10",
        orbB: "bg-teal-500/10",
    },
    gold: {
        gradient: "from-yellow-400 to-amber-500",
        glow: "shadow-yellow-500/20",
        border: "hover:border-yellow-500/60",
        badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
        icon: "text-yellow-400",
        bar: "bg-yellow-500",
        tag: "bg-yellow-500/10 text-yellow-300",
        ring: "ring-yellow-500/30",
        orbA: "bg-yellow-500/10",
        orbB: "bg-amber-500/10",
    },
    blue: {
        gradient: "from-blue-400 to-indigo-500",
        glow: "shadow-blue-500/20",
        border: "hover:border-blue-500/60",
        badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
        icon: "text-blue-400",
        bar: "bg-blue-500",
        tag: "bg-blue-500/10 text-blue-300",
        ring: "ring-blue-500/30",
        orbA: "bg-blue-500/10",
        orbB: "bg-indigo-500/10",
    },
    purple: {
        gradient: "from-purple-400 to-fuchsia-500",
        glow: "shadow-purple-500/20",
        border: "hover:border-purple-500/60",
        badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
        icon: "text-purple-400",
        bar: "bg-purple-500",
        tag: "bg-purple-500/10 text-purple-300",
        ring: "ring-purple-500/30",
        orbA: "bg-purple-500/10",
        orbB: "bg-fuchsia-500/10",
    },
};

const positionIcon = (position) => {
    if (position.toLowerCase().includes("1st") || position.toLowerCase() === "winner") return "🥇";
    if (position.toLowerCase().includes("2nd") || position.toLowerCase().includes("runner")) return "🥈";
    if (position.toLowerCase().includes("3rd")) return "🥉";
    return "🏆";
};

const HackathonCard = ({ h, index }) => {
    const c = colorMap[h.color] || colorMap.emerald;

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
            className={`group relative bg-[#0a0404]/60 border border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl ${c.glow} ${c.border} backdrop-blur-sm`}
        >
            {/* Top gradient bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${c.gradient}`} />

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Floating decoration orbs */}
            <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl ${c.orbA} pointer-events-none`} />
            <div className={`absolute -bottom-12 -left-12 w-40 h-40 rounded-full blur-3xl ${c.orbB} pointer-events-none`} />

            <div className="relative z-10 p-8">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`text-4xl select-none`}>{h.medal || positionIcon(h.position)}</div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
                                {h.name}
                            </h2>
                            <p className={`text-sm font-semibold mt-1 ${c.icon}`}>{h.hackathon}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 shrink-0">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${c.badge}`}>
                            <Trophy className="w-3.5 h-3.5" />
                            {h.position}
                        </span>
                    </div>
                </div>

                {/* Prize banner */}
                <div className={`flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-gradient-to-r ${c.gradient} bg-opacity-10`}
                    style={{ background: `linear-gradient(to right, rgba(16,185,129,0.08), rgba(20,184,166,0.04))` }}
                >
                    <Award className={`w-5 h-5 shrink-0 ${c.icon}`} />
                    <span className="text-sm font-semibold text-slate-200">{h.prize}</span>
                    {h.highlight && (
                        <span className={`ml-auto text-xs px-2.5 py-1 rounded-full font-medium ${c.tag}`}>
                            {h.highlight}
                        </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{h.description}</p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {h.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {h.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" /> Team of {h.teamSize}
                    </span>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {h.tech.map((t, i) => (
                        <span
                            key={i}
                            className={`text-xs font-mono px-2.5 py-1 rounded-md ${c.tag}`}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Links */}
                {h.links && (
                    <div className="flex gap-3">
                        {h.links.demo && (
                            <a
                                href={h.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r ${c.gradient} text-slate-950 hover:opacity-90 transition-opacity shadow-md`}
                            >
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                        {h.links.code && (
                            <a
                                href={h.links.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
                            >
                                <Github className="w-4 h-4" /> Source Code
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.article>
    );
};

const HackathonPage = () => {
    const totalWins = hackathons.length;
    const totalPrizes = hackathons.filter((h) => h.prize).length;

    return (
        <div className="min-h-screen bg-transparent text-slate-50 relative selection:bg-emerald-500/30 selection:text-emerald-400">
            {/* Background grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#050202] via-transparent to-[#050202] pointer-events-none" />

            {/* Ambient orbs */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

            <main className="container mx-auto px-6 py-12 relative z-10 max-w-5xl">
                {/* Back navigation */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-10 transition-colors font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Page header */}
                <motion.header
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                            <Trophy className="w-6 h-6 text-yellow-400" />
                        </div>
                        <span className="text-yellow-400 font-semibold tracking-widest text-sm uppercase">Achievements</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-emerald-400 inline-block">
                            Hackathon Winnings
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        A record of competitive wins — from building under 24-hour sprints to multi-day innovation challenges. Each entry represents a problem solved and a lesson learned.
                    </p>
                </motion.header>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16"
                >
                    {[
                        { label: "Hackathons Won", value: `${totalWins}+`, icon: <Trophy className="w-5 h-5" />, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
                        { label: "Awards Received", value: `${totalPrizes}+`, icon: <Medal className="w-5 h-5" />, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
                        { label: "Technologies Used", value: `${[...new Set(hackathons.flatMap(h => h.tech))].length}+`, icon: <Zap className="w-5 h-5" />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.03 }}
                            className={`flex items-center gap-4 p-5 rounded-2xl border ${stat.bg} backdrop-blur-sm cursor-default`}
                        >
                            <div className={`${stat.color}`}>{stat.icon}</div>
                            <div>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Hackathon cards */}
                <section className="space-y-8">
                    {hackathons.map((h, i) => (
                        <HackathonCard key={h.id} h={h} index={i} />
                    ))}
                </section>

                {/* Empty state */}
                {hackathons.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 text-slate-500"
                    >
                        <Trophy className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-xl">More wins coming soon...</p>
                    </motion.div>
                )}

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center text-slate-600 text-sm mt-20"
                >
                    Built under pressure. Shipped with passion.
                </motion.p>
            </main>
        </div>
    );
};

export default HackathonPage;
