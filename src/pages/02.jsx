import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Box, Cpu, Sparkles, Briefcase, Rocket } from 'lucide-react';
import profileImage from '../assets/755b323b46fad9c3f86784c55c858b74.jpg';

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
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 inline-block">
                        My Journey & Expertise
                    </h2>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Bio & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 text-lg text-slate-300 leading-relaxed"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                            <motion.div
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-4 transition-all hover:border-emerald-500/50 group cursor-default"
                            >
                                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">1+</h4>
                                    <p className="text-sm text-slate-400">Years Experience</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-4 transition-all hover:border-blue-500/50 group cursor-default"
                            >
                                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                                    <Rocket className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">4+</h4>
                                    <p className="text-sm text-slate-400">Projects Completed</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Hobbies / Interests */}
                        <div className="pt-8">
                            <h4 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-emerald-400" />
                                Beyond Coding
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <motion.div
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                                    className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-4 transition-all hover:border-emerald-500/50 group cursor-default"
                                >
                                    <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                                        <Box className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">3D Designing (Onshape)</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                                    className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-4 transition-all hover:border-blue-500/50 group cursor-default"
                                >
                                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                                        <Cpu className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">IoT & Embedded Systems</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-slate-800 group">
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050202] via-transparent to-transparent opacity-60 z-10" />

                            {/* Image */}
                            <img
                                src={profileImage}
                                alt="Aditya Kumar Maurya"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                <div className="h-1 w-20 bg-emerald-500 mb-4 rounded-full" />
                                <p className="text-slate-200 font-medium italic">“Building ideas into scalable digital solutions.”</p>
                            </div>
                        </div>

                        {/* Background Decoration elements behind image */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
