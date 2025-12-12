import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } }
    };

    const renderWords = (text, className = "text-slate-300 hover:text-emerald-400") => (
        text.split(" ").map((word, i) => (
            <motion.span
                key={i}
                className={`inline-block mr-1 cursor-default transition-colors ${className}`}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {word}
            </motion.span>
        ))
    );

    return (
        <section id="about" className="min-h-screen bg-transparent text-slate-50 py-20 px-6 relative overflow-hidden">
            {/* Background Gradient/Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a0404] via-[#050202] to-[#050202] -z-10" />

            <div className="container mx-auto max-w-6xl z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 inline-block">
                        My Journey & Expertise
                    </h2>
                </motion.div>

                {/* Bio Section Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6 text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto"
                >
                    <div>
                        {renderWords("I'm")}
                        {renderWords("Aditya Kumar Maurya,", "text-emerald-400 font-medium")}
                        {renderWords("a")}
                        {renderWords("Second Year College Student", "text-blue-400 font-medium")}
                        {renderWords("and a passionate developer. My journey started with a simple curiosity for how things work, which quickly evolved into a career crafting seamless digital experiences.")}
                    </div>
                    <div>
                        {renderWords("I specialize in both")}
                        {renderWords("Full Stack Web Development", "text-blue-400 font-medium")}
                        {renderWords("and")}
                        {renderWords("Android App Development.", "text-blue-400 font-medium")}
                        {renderWords("I thrive on solving complex problems and turning innovative ideas into reality. Whether it's optimizing server performance or crafting a pixel-perfect UI, I bring dedication and technical precision to every project.")}
                    </div>

                    {/* Stats / Highlights */}
                    <div className="grid grid-cols-2 gap-6 pt-8">
                        <motion.div
                            whileHover={{ y: -5, borderColor: 'rgba(52, 211, 153, 0.5)' }}
                            className="p-4 rounded-2xl bg-[#0a0404]/50 border border-slate-800 transition-colors cursor-default"
                        >
                            <h4 className="text-3xl font-bold text-emerald-400">1+</h4>
                            <p className="text-sm text-slate-400">Years Experience</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -5, borderColor: 'rgba(96, 165, 250, 0.5)' }}
                            className="p-4 rounded-2xl bg-[#0a0404]/50 border border-slate-800 transition-colors cursor-default"
                        >
                            <h4 className="text-3xl font-bold text-blue-400">4+</h4>
                            <p className="text-sm text-slate-400">Projects Completed</p>
                        </motion.div>
                    </div>

                    {/* Hobbies / Interests */}
                    <div className="pt-10">
                        <h4 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            Beyond Coding
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 rounded-full bg-[#0a0404]/80 border border-slate-800 text-slate-300 text-sm hover:border-emerald-500/50 transition-colors cursor-default">
                                3D Designing (Onshape)
                            </span>
                            <span className="px-4 py-2 rounded-full bg-[#0a0404]/80 border border-slate-800 text-slate-300 text-sm hover:border-blue-500/50 transition-colors cursor-default">
                                IoT & Embedded Systems
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutPage;
