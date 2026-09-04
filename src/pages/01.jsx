import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin, ChevronDown, Trophy, Copy, Check, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';



const DecodingText = ({ text, onComplete }) => {
    const [display, setDisplay] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        let currentLetterCode = 65; // Start from 'A'
        let solvedPart = "";

        const interval = setInterval(() => {
            if (currentIndex >= text.length) {
                clearInterval(interval);
                setIsComplete(true);
                setDisplay(text);
                if (onComplete) onComplete();
                return;
            }

            const targetChar = text[currentIndex];

            // If target is not a letter, append immediately
            if (!/[A-Za-z]/.test(targetChar)) {
                solvedPart += targetChar;
                currentIndex++;
                currentLetterCode = 65;
                setDisplay(solvedPart);
                return;
            }

            // Current cycling character
            const cyclingChar = String.fromCharCode(currentLetterCode);
            setDisplay(solvedPart + cyclingChar);

            // Check if match
            if (cyclingChar === targetChar || currentLetterCode > targetChar.charCodeAt(0)) {
                solvedPart += targetChar;
                currentIndex++;
                currentLetterCode = 65;
            } else {
                currentLetterCode += 2;
            }
        }, 20);

        return () => clearInterval(interval);
    }, [text]); // Intentionally omitting onComplete to avoid re-running effect

    return (
        <span className="font-mono relative inline-block whitespace-nowrap">
            <span className="invisible">{text}</span>
            <span className="absolute left-0 top-0">
                {display}
                {!isComplete && <span className="animate-pulse ml-0.5">_</span>}
            </span>
        </span>
    );
}



const HomePage = ({ onOpenTerminal }) => {
    const [introFinished, setIntroFinished] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('adityamaurya1947@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2500);
    };

    const titles = [
        "Full Stack & Android Developer",
        "IoT & Embedded Systems Engineer",
        "Robotics Enthusiast",
        "3x Hackathon Winner"
    ];
    const [index, setIndex] = useState(0);

    // Rotating Titles
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent text-slate-50 antialiased">

            <main className="relative z-10 container mx-auto px-6 h-screen flex flex-col justify-center items-center text-center">
                <div className="max-w-6xl">

                    {/* 1. HELLO, I'M */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-sm tracking-[0.2em] shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-sm">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            <DecodingText text="HELLO, I'M" onComplete={() => setIntroFinished(true)} />
                        </div>
                    </motion.div>

                    {/* 2. Name - Word by Word */}
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none flex flex-wrap justify-center gap-x-4 drop-shadow-2xl tracking-tighter">
                        {"Aditya Kumar Maurya".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block whitespace-nowrap"
                                initial={{ opacity: 0, y: 20 }}
                                animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.5,
                                    delay: (i * 0.15),
                                    ease: "easeOut"
                                }}
                            >
                                {word.split("").map((char, j) => (
                                    <motion.span
                                        key={j}
                                        className="inline-block cursor-default hover:text-emerald-400 transition-colors"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.span>
                        ))}
                    </h1>

                    {/* 3. Titles/Role with Terminal Prompt Theme */}
                    <motion.div
                        className="h-16 mb-8 flex items-center justify-center font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
                        initial={{ opacity: 0, x: -20 }}
                        animate={introFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="inline-flex items-center gap-2 text-slate-200"
                            >
                                <span className="text-emerald-400 font-bold select-none">&gt;</span>
                                <span className="text-slate-100 font-mono">
                                    {titles[index]}
                                </span>
                                <span className="text-emerald-400 animate-pulse font-mono select-none">_</span>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>


                    {/* 4. Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.1, delay: 0 }}
                        className="text-lg md:text-xl text-slate-400 max-w-4xl mb-10 leading-relaxed mx-auto font-light"
                    >
                        {"I build fast, accessible, and visually striking digital experiences. Whether web or mobile, my apps are designed to solve real-world problems with clean code and great design."
                            .split(" ")
                            .map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block mr-1 cursor-default hover:text-emerald-400 transition-colors"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                    </motion.p>

                    {/* 5. Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        className="flex flex-wrap items-center justify-center gap-4 w-full px-2"
                    >
                        {/* Primary Button - Explore Projects */}
                        <a
                            href="/project"
                            className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_45px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Projects
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        {/* Interactive Terminal CLI Button */}
                        <button
                            onClick={onOpenTerminal}
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#080d1a]/90 hover:bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer backdrop-blur-md font-mono"
                            title="Launch interactive portfolio terminal CLI"
                        >
                            <Terminal className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                            <span>&gt;_ Terminal CLI</span>
                            <span className="hidden md:inline-block px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] text-emerald-300">
                                `
                            </span>
                        </button>

                        {/* Secondary Button - Hackathons */}
                        <Link
                            to="/hackathon-winning"
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-400/70 text-amber-300 hover:text-amber-200 font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-amber-500/5 hover:shadow-amber-500/20 active:scale-95"
                        >
                            <Trophy className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                            <span>Hackathon Wins</span>
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-[11px] font-mono font-bold text-amber-300">
                                3x
                            </span>
                        </Link>

                        {/* Tertiary Button - Copy Email */}
                        <button
                            onClick={copyEmail}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium text-sm sm:text-base transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                            title="Click to copy email address"
                        >
                            {copiedEmail ? (
                                <>
                                    <Check className="w-4 h-4 text-emerald-400" />
                                    <span className="text-emerald-400 font-medium">Email Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 text-slate-400" />
                                    <span>Copy Email</span>
                                </>
                            )}
                        </button>
                    </motion.div>


                    {/* 6. Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="mt-14 flex flex-wrap items-center justify-center gap-5 text-slate-400"
                    >
                        {[
                            { icon: Github, text: "github.com/iamadityamaurya", href: "https://github.com/iamadityamaurya", color: "group-hover:text-white", border: "hover:border-white/50", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" },
                            { icon: Linkedin, text: "linkedin/iamadityamaurya", href: "https://www.linkedin.com/in/iamadityamaurya/", color: "group-hover:text-blue-400", border: "hover:border-blue-500/50", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]" },
                            { icon: Mail, text: "adityamaurya1947@gmail.com", href: "mailto:adityamaurya1947@gmail.com", color: "group-hover:text-emerald-400", border: "hover:border-emerald-500/50", glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]" }
                        ].map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                target={link.text.includes('@') ? undefined : "_blank"}
                                rel={link.text.includes('@') ? undefined : "noopener noreferrer"}
                                className={`group flex items-center bg-slate-800/70 border border-slate-700/80 backdrop-blur-md rounded-full p-3.5 transition-all duration-300 ease-out hover:-translate-y-1 ${link.border} ${link.glow}`}
                            >
                                <link.icon className={`w-5 h-5 shrink-0 text-slate-400 transition-colors duration-300 ${link.color}`} />
                                <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-all duration-300 ease-out">
                                    <span className="overflow-hidden whitespace-nowrap text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-slate-100">
                                        <span className="pl-3 pr-1 block">{link.text}</span>
                                    </span>
                                </div>
                            </a>
                        ))}
                    </motion.div>

                </div>


                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 4.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </main>
        </div>
    );
};

export default HomePage;
