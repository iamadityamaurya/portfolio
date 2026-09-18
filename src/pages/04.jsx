import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Terminal, Smartphone, Cpu, Globe, Server, PenTool } from 'lucide-react';

import onshapeLogo from '../assets/onshape.svg';



const SkillsPage = () => {
    // Tech Stack with Simple Icons SVG URLs
    const technologies = [
        { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
        { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
        { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
        { name: "Express", icon: "https://cdn.simpleicons.org/express/white" },
        { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
        { name: "Expo", icon: "https://cdn.simpleicons.org/expo/white" },
        { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
        { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
        { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
        { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00599C" },
        { name: "C", icon: "https://cdn.simpleicons.org/c/A8B9CC" },
        { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "ROS 2", icon: "https://cdn.simpleicons.org/ros/white" },
        { name: "Arduino", icon: "https://cdn.simpleicons.org/arduino/00979D" },
        { name: "Linux", icon: "https://cdn.simpleicons.org/linux/FCC624" },
        { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "Onshape", icon: onshapeLogo }
    ];

    return (
        <section id="skills" className="min-h-screen bg-transparent text-slate-50 py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-20 text-center"
                >
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3 select-none">
                        <span className="w-4 h-px bg-cyan-400" />
                        Capabilities
                        <span className="w-4 h-px bg-cyan-400" />
                    </span>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-tight leading-tight">
                        Tech Stack
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
                        Tools, frameworks, languages, and hardware platforms I engineer with.
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-6 md:gap-8 justify-items-center">
                    {technologies.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-800/75 backdrop-blur-sm border border-slate-700 rounded-2xl md:rounded-3xl hover:border-slate-500 hover:bg-slate-800 transition-all duration-300 w-full max-w-[100px] sm:max-w-[130px] md:max-w-[160px] aspect-square shadow-lg hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden"
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 sm:group-hover:-translate-y-2 md:group-hover:-translate-y-3"
                                loading="lazy"
                            />

                            <div className="absolute bottom-1.5 sm:bottom-3 md:bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                <span className="text-slate-200 font-semibold text-[9px] sm:text-xs md:text-sm text-center px-1 pointer-events-none truncate max-w-full">
                                    {tech.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsPage;
