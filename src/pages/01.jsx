import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin, ChevronDown } from 'lucide-react';


const DecodingText = ({ text }) => {
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
                currentLetterCode += 1;
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className="font-mono">
            {display}
            {!isComplete && <span className="animate-pulse ml-0.5">_</span>}
        </span>
    );
}



const HomePage = () => {


    const titles = [
        { article: "a", role: "Full Stack Developer" },
        { article: "an", role: "Android Developer" }
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

            <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-4xl">

                    {/* 1. HELLO, I'M */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-emerald-500 font-medium tracking-widest mb-4 flex items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "3rem" }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="h-0.5 bg-emerald-500 inline-block"
                            ></motion.span>
                            <DecodingText text="HELLO, I'M" />
                        </h2>
                    </motion.div>

                    {/* 2. Name - Word by Word */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight flex flex-wrap gap-x-4 drop-shadow-2xl tracking-tighter">
                        {"Aditya Kumar Maurya".split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                className="inline-block whitespace-nowrap"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 1.5 + (i * 0.4), // Sequential delay
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
                        className="h-20 mb-8 flex items-center gap-2 text-3xl md:text-5xl font-bold text-slate-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 3.0 }}
                    >
                        <span>I am {titles[index].article}</span>
                        <AnimatePresence mode="wait">
                            <motion.h2
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 inline-block"
                            >
                                {titles[index].role}
                            </motion.h2>
                        </AnimatePresence>
                    </motion.div>

                    {/* 4. Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 3.5 }}
                        className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed"
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
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 3.8 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="#projects"
                            className="relative group px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold rounded-full overflow-hidden hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-[-20deg]"></div>
                        </a>

                        <a
                            href="#contact"
                            className="px-8 py-3 border border-slate-700 text-slate-300 font-medium rounded-full bg-slate-900/40 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-slate-900/60 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all hover:scale-105"
                        >
                            Contact Me
                        </a>
                    </motion.div>

                    {/* 6. Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 4.2 }}
                        className="mt-20 flex items-center gap-6 text-slate-400"
                    >
                        <a
                            href="https://github.com/addy1947"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center group hover:justify-start gap-0 hover:gap-3 hover:bg-slate-900/60 hover:backdrop-blur-md px-1 hover:pr-5 hover:pl-2 rounded-full transition-all duration-300 hover:border hover:border-slate-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] h-10 max-w-[40px] hover:max-w-[280px] overflow-hidden"
                        >
                            <Github className="w-8 h-8 min-w-[2rem] text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
                            <span className="max-w-0 group-hover:max-w-xs overflow-hidden opacity-0 group-hover:opacity-100 whitespace-nowrap text-sm font-medium text-slate-300 group-hover:text-emerald-50 transition-all duration-300 delay-75">
                                github.com/addy1947
                            </span>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/adityamaurya123"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center group hover:justify-start gap-0 hover:gap-3 hover:bg-slate-900/60 hover:backdrop-blur-md px-1 hover:pr-5 hover:pl-2 rounded-full transition-all duration-300 hover:border hover:border-slate-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] h-10 max-w-[40px] hover:max-w-[320px] overflow-hidden"
                        >
                            <Linkedin className="w-8 h-8 min-w-[2rem] text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
                            <span className="max-w-0 group-hover:max-w-xs overflow-hidden opacity-0 group-hover:opacity-100 whitespace-nowrap text-sm font-medium text-slate-300 group-hover:text-emerald-50 transition-all duration-300 delay-75">
                                linkedin/adityamaurya123
                            </span>
                        </a>
                        <a
                            href="mailto:adityamaurya1947@gmail.com"
                            className="flex items-center justify-center group hover:justify-start gap-0 hover:gap-3 hover:bg-slate-900/60 hover:backdrop-blur-md px-1 hover:pr-5 hover:pl-2 rounded-full transition-all duration-300 hover:border hover:border-slate-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] h-10 max-w-[40px] hover:max-w-[320px] overflow-hidden"
                        >
                            <Mail className="w-8 h-8 min-w-[2rem] text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
                            <span className="max-w-0 group-hover:max-w-xs overflow-hidden opacity-0 group-hover:opacity-100 whitespace-nowrap text-sm font-medium text-slate-300 group-hover:text-emerald-50 transition-all duration-300 delay-75">
                                adityamaurya1947@gmail.com
                            </span>
                        </a>
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
