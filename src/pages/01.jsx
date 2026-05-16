import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin, ChevronDown, Trophy } from 'lucide-react';
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



const HomePage = () => {
    const [introFinished, setIntroFinished] = useState(false);


    const titles = [
        "Full Stack Developer",
        "Android Developer",
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
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none flex flex-wrap justify-center gap-x-4 drop-shadow-2xl tracking-tighter">
                        {"Aditya Kumar Maurya".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block whitespace-nowrap"
                                initial={{ opacity: 0, y: 20 }}
                                animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.5,
                                    delay: (i * 0.15), // Sequential but faster and relative to trigger
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

                    {/* 3. Titles/Role */}
                    <motion.div
                        className="h-16 mb-8 flex items-center justify-center gap-3 text-2xl md:text-4xl lg:text-5xl font-bold text-slate-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={introFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 inline-block whitespace-nowrap"
                            >
                                {titles[index]}
                            </motion.h2>
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

                    {/* 5. Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full px-4"
                    >
                        {/* Primary Button */}
                        <a
                            href="#projects"
                            className="relative group w-full sm:w-auto px-9 py-4 bg-emerald-500 text-slate-950 text-base md:text-lg font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all hover:-translate-y-1.5"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                View Work
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-[-20deg]"></div>
                        </a>

                        {/* Secondary Button - Hackathons */}
                        <Link
                            to="/hackathon-winning"
                            className="relative group w-full sm:w-auto px-9 py-4 bg-[#0a0404]/80 text-yellow-400 text-base md:text-lg font-semibold rounded-full border border-yellow-500/30 hover:border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] backdrop-blur-md transition-all hover:-translate-y-1.5 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <Trophy className="w-5 h-5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
                                Hackathons
                            </span>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>

                        {/* Tertiary Button - Contact */}
                        <a
                            href="#contact"
                            className="relative group w-full sm:w-auto px-9 py-4 bg-transparent text-slate-300 hover:text-emerald-400 text-base md:text-lg font-semibold rounded-full border border-slate-700 hover:border-emerald-500/50 hover:bg-[#0a0404]/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all hover:-translate-y-1.5 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Contact Me
                            </span>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </a>
                    </motion.div>

                    {/* 6. Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={introFinished ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="mt-14 flex flex-wrap items-center justify-center gap-5 text-slate-400"
                    >
                        {[
                            { icon: Github, text: "github.com/addy1947", href: "https://github.com/addy1947", color: "group-hover:text-white", border: "hover:border-white/50", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" },
                            { icon: Linkedin, text: "linkedin/adityamaurya123", href: "https://www.linkedin.com/in/adityamaurya123", color: "group-hover:text-blue-400", border: "hover:border-blue-500/50", glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]" },
                            { icon: Mail, text: "adityamaurya1947@gmail.com", href: "mailto:adityamaurya1947@gmail.com", color: "group-hover:text-emerald-400", border: "hover:border-emerald-500/50", glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]" }
                        ].map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                target={link.text.includes('@') ? undefined : "_blank"}
                                rel={link.text.includes('@') ? undefined : "noopener noreferrer"}
                                className={`group flex items-center bg-[#0a0404]/50 border border-slate-800/80 backdrop-blur-md rounded-full p-3.5 transition-all duration-300 ease-out hover:-translate-y-1 ${link.border} ${link.glow}`}
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
