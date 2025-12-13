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
        { name: "C", icon: "https://cdn.simpleicons.org/c/A8B9CC" },
        { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
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
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 inline-block">
                        Technologies I Know
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        My preferred stack for building scalable and performant applications.
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
                    {technologies.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group relative flex items-center justify-center p-6 bg-[#0a0404]/40 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-[#0a0404]/60 transition-all duration-300 w-40 h-40 shadow-lg hover:shadow-emerald-500/10 cursor-pointer overflow-hidden"
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-16 h-16 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-4"
                            />

                            <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                <span className="text-emerald-400 font-bold text-sm text-center px-2 pointer-events-none">
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
