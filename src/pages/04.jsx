import React from 'react';
import { motion } from 'framer-motion';
import { Braces, Cloud, Cpu, Database, Server, Sparkles } from 'lucide-react';

import motiaLogo from '../assets/motia-logo.svg';
import onshapeLogo from '../assets/onshape.svg';



const SkillsPage = () => {
    const categories = [
        {
            number: '01',
            name: 'Frameworks',
            description: 'Interfaces and applications',
            icon: Braces,
            accent: 'text-cyan-300',
            technologies: [
                { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
                { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
                { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
                { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
                { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
                { name: 'Expo', icon: 'https://cdn.simpleicons.org/expo/white' },
            ],
        },
        {
            number: '02',
            name: 'Backend',
            description: 'Services, APIs, and extensions',
            icon: Server,
            accent: 'text-violet-300',
            technologies: [
                { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
                { name: 'Express', icon: 'https://cdn.simpleicons.org/express/white' },
                { name: 'Motia Framework', icon: motiaLogo },
                { name: 'Vercel Serverless', icon: 'https://cdn.simpleicons.org/vercel/white' },
                { name: 'Chrome Extensions', icon: 'https://cdn.simpleicons.org/googlechrome/4285F4' },
                { name: 'Manifest V3', icon: 'https://cdn.simpleicons.org/chromewebstore/white' },
            ],
        },
        {
            number: '03',
            name: 'Databases',
            description: 'Storage and data platforms',
            icon: Database,
            accent: 'text-emerald-300',
            technologies: [
                { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
                { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
                { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
                { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
            ],
        },
        {
            number: '04',
            name: 'Cloud & DevOps',
            description: 'Deployment and infrastructure',
            icon: Cloud,
            accent: 'text-sky-300',
            technologies: [
                { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
                { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
                { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/white' },
                { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
            ],
        },
        {
            number: '05',
            name: 'Embedded & Robotics',
            description: 'Systems, robotics, and hardware',
            icon: Cpu,
            accent: 'text-amber-300',
            technologies: [
                { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
                { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/00599C' },
                { name: 'C', icon: 'https://cdn.simpleicons.org/c/A8B9CC' },
                { name: 'ROS 2', icon: 'https://cdn.simpleicons.org/ros/white' },
                { name: 'Arduino', icon: 'https://cdn.simpleicons.org/arduino/00979D' },
                { name: 'Onshape', icon: onshapeLogo },
            ],
        },
        {
            number: '06',
            name: 'Beyond Coding',
            description: 'Design, hardware, and physical systems',
            icon: Sparkles,
            accent: 'text-cyan-300',
            technologies: [
                { name: '3D Designing (Onshape)', icon: onshapeLogo },
                { name: 'IoT & Embedded Systems', icon: 'https://cdn.simpleicons.org/espressif/E7352C' },
                { name: 'Robotics & ROS 2', icon: 'https://cdn.simpleicons.org/ros/white' },
                { name: '3D Printing', icon: 'https://cdn.simpleicons.org/ultimaker/26BCE7' },
            ],
        },
    ];

    return (
        <section id="skills" className="relative overflow-hidden bg-transparent px-4 py-20 text-slate-50 sm:px-6 sm:py-28">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

            <div className="container relative z-10 mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
                >
                    <div>
                        
                        <h2 className="max-w-xl text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl">
                            My <span className="text-cyan-300">skills.</span>
                        </h2>
                    </div>
                    <div className="flex max-w-lg flex-col gap-5 lg:pb-1 lg:pl-10">
                        <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
                            A working stack for shipping polished products, reliable services, and hardware that can leave the screen.
                        </p>
                        
                    </div>
                </motion.div>

                <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {categories.map((category, categoryIndex) => {
                        const CategoryIcon = category.icon;
                        return (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                                className="group border border-slate-700/80 bg-slate-900/70 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-slate-500 sm:p-6"
                            >
                                <div className="mb-8 flex items-start justify-between border-b border-slate-800 pb-5">
                                    <div>
                                        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-slate-500">{category.number}</p>
                                        <h3 className={`text-2xl font-bold ${category.accent}`}>{category.name}</h3>
                                        <p className="mt-1 text-sm text-slate-500">{category.description}</p>
                                    </div>
                                    <CategoryIcon size={23} strokeWidth={1.5} className={`${category.accent} opacity-80`} />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {category.technologies.map((tech) => (
                                        <div key={tech.name} className="flex min-w-0 items-center gap-2.5 border border-transparent px-2 py-2.5 transition-colors duration-200 hover:border-slate-700 hover:bg-slate-800/70">
                                            <img src={tech.icon} alt="" className="h-5 w-5 shrink-0 object-contain" loading="lazy" />
                                            <span className="truncate text-sm font-medium text-slate-300">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default SkillsPage;
