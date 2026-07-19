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
        <section id="skills" className="min-h-screen bg-transparent text-slate-50 py-20 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 inline-block">
                        Tech Stack
                    </h2>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-8 justify-items-center">
                    {technologies.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="group relative flex items-center justify-center p-4 md:p-6 bg-slate-800/75 backdrop-blur-sm border border-slate-700 rounded-2xl md:rounded-3xl hover:border-emerald-500/50 hover:bg-slate-700/80 transition-all duration-300 w-24 h-24 md:w-40 md:h-40 shadow-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:-translate-y-2 cursor-pointer overflow-hidden"
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-10 h-10 md:w-16 md:h-16 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 md:group-hover:-translate-y-4"
                            />

                            <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 md:translate-y-4">
                                <span className="text-emerald-400 font-bold text-[10px] md:text-sm text-center px-1 md:px-2 pointer-events-none truncate">
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
