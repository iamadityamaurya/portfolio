import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin, ChevronDown, Trophy, Copy, Check, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';





const DecodingText = ({ text, onComplete, reducedMotion }) => {
    const [display, setDisplay] = useState(reducedMotion ? text : "");
    const [isComplete, setIsComplete] = useState(reducedMotion);

    useEffect(() => {
        if (reducedMotion) {
            setDisplay(text);
            setIsComplete(true);
            if (onComplete) onComplete();
            return;
        }

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
                {!isComplete && !reducedMotion && <span className="animate-pulse ml-0.5">_</span>}
            </span>
        </span>
    );
}



const HomePage = ({ onOpenTerminal }) => {
    const reducedMotion = useReducedMotion();
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
        if (reducedMotion) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [reducedMotion]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIntroFinished(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent text-slate-50 antialiased flex flex-col justify-center">

            <main className="relative z-10 container mx-auto px-4 sm:px-6 py-28 sm:py-24 md:py-20 min-h-screen flex flex-col justify-center items-center text-center">
                <div className="max-w-5xl w-full">

                    {/* 1. Intro Badge with Decoding Text */}
                    <motion.div
                        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
                        className="mb-6 sm:mb-8 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-mono backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                            <span className={`w-2 h-2 rounded-full bg-cyan-400 shrink-0 ${reducedMotion ? '' : 'animate-pulse'}`}></span>
                            <DecodingText text="HELLO, I'M" onComplete={() => setIntroFinished(true)} reducedMotion={reducedMotion} />
                        </div>
                    </motion.div>

                    {/* 2. Name - Word by Word */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight flex flex-wrap justify-center gap-x-2 sm:gap-x-4 drop-shadow-2xl tracking-tight">
                        {"Aditya Kumar Maurya".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block whitespace-nowrap"
                                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={reducedMotion ? { duration: 0 } : {
                                    duration: 0.5,
                                    delay: (i * 0.15),
                                    ease: "easeOut"
                                }}
                            >
                                {word.split("").map((char, j) => (
                                    <motion.span
                                        key={j}
                                        className="inline-block cursor-default hover:text-cyan-400 transition-colors"
                                        whileHover={reducedMotion ? {} : { scale: 1.2, rotate: 5 }}
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
                        className="min-h-[3rem] sm:min-h-[4rem] mb-6 sm:mb-8 flex items-center justify-center font-mono text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight px-2"
                        initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        animate={introFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
                                transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeInOut" }}
                                className="inline-flex items-center gap-1.5 sm:gap-2 text-slate-100 text-center flex-wrap justify-center"
                            >
                                <span className="text-cyan-400 font-bold select-none">&gt;</span>
                                <span className="text-slate-100 font-mono">
                                    {titles[index]}
                                </span>
                                <span className={`text-cyan-400 font-mono select-none ${reducedMotion ? '' : 'animate-pulse'}`}>_</span>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* 4. Description */}
                    <motion.p
                        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.1, delay: 0 }}
                        className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mb-8 sm:mb-10 leading-relaxed mx-auto font-normal px-2"
                    >
                        {"I build fast, accessible, and visually striking digital experiences. Whether web or mobile, my apps are designed to solve real-world problems with clean code and great design."
                            .split(" ")
                            .map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block mr-1 cursor-default hover:text-white transition-colors"
                                    whileHover={reducedMotion ? {} : { scale: 1.1, y: -2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                    </motion.p>

                    {/* 5. Action Buttons */}
                    <motion.div
                        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: 1.0 }}
                        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full px-2"
                    >
                        {/* Primary Button - Explore Projects */}
                        <a
                            href="/project"
                            className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:bg-slate-200 transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Projects
                                <ArrowRight className={`w-4 h-4 transition-transform ${reducedMotion ? '' : 'group-hover:translate-x-1'}`} />
                            </span>
                        </a>

                        {/* Interactive Terminal CLI Button */}
                        <button
                            onClick={onOpenTerminal}
                            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-[#080d1a]/90 hover:bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-slate-200 hover:text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg active:scale-95 cursor-pointer backdrop-blur-md font-mono"
                            title="Launch interactive portfolio terminal CLI"
                        >
                            <Terminal className={`w-4 h-4 text-slate-400 transition-transform ${reducedMotion ? '' : 'group-hover:text-cyan-400 group-hover:rotate-12'}`} />
                            <span>Terminal CLI</span>
                            <span className="hidden md:inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                                `
                            </span>
                        </button>

                        {/* Secondary Button - Hackathons */}
                        <Link
                            to="/hackathon-winning"
                            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-400/70 text-amber-300 hover:text-amber-200 font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-amber-500/5 hover:shadow-amber-500/20 active:scale-95"
                        >
                            <Trophy className={`w-4 h-4 text-amber-400 transition-transform ${reducedMotion ? '' : 'group-hover:rotate-12'}`} />
                            <span>Hackathon Wins</span>
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-[11px] font-mono font-bold text-amber-300">
                                3x
                            </span>
                        </Link>

                        {/* Tertiary Button - Copy Email */}
                        <button
                            onClick={copyEmail}
                            className="inline-flex items-center justify-center gap-2 px-5 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                            title="Click to copy email address"
                        >
                            {copiedEmail ? (
                                <>
                                    <Check className="w-4 h-4 text-cyan-400" />
                                    <span className="text-cyan-400 font-medium">Email Copied!</span>
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
                        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: 1.2 }}
                        className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-slate-400 px-2"
                    >
                        {[
                            { icon: Github, text: "github.com/iamadityamaurya", href: "https://github.com/iamadityamaurya", color: "group-hover:text-white", border: "hover:border-white/50", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" },
                            { icon: Linkedin, text: "linkedin/iamadityamaurya", href: "https://www.linkedin.com/in/iamadityamaurya/", color: "group-hover:text-blue-400", border: "hover:border-blue-500/50", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]" },
                            { icon: Mail, text: "adityamaurya1947@gmail.com", href: "mailto:adityamaurya1947@gmail.com", color: "group-hover:text-cyan-400", border: "hover:border-cyan-500/50", glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]" }
                        ].map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                target={link.text.includes('@') ? undefined : "_blank"}
                                rel={link.text.includes('@') ? undefined : "noopener noreferrer"}
                                className={`group flex items-center bg-slate-800/70 border border-slate-700/80 backdrop-blur-md rounded-full p-2.5 sm:p-3.5 transition-all duration-300 ease-out hover:-translate-y-1 ${link.border} ${link.glow}`}
                            >
                                <link.icon className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-slate-400 transition-colors duration-300 ${link.color}`} />
                                <div className="grid grid-cols-[0fr] sm:group-hover:grid-cols-[1fr] transition-all duration-300 ease-out">
                                    <span className="overflow-hidden whitespace-nowrap text-xs sm:text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-slate-100">
                                        <span className="pl-3 pr-1 block">{link.text}</span>
                                    </span>
                                </div>
                            </a>
                        ))}
                    </motion.div>

                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1, y: reducedMotion ? 0 : [0, 10, 0] }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity, delay: 4.5 }}
                    className="hidden sm:block absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-slate-500 pointer-events-none"
                >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
            </main>
        </div>
    );
};

export default HomePage;
