import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger, reducedMotion } from '../lib/scroll';

import motiaLogo from '../assets/motia-logo.svg';
import onshapeLogo from '../assets/onshape.svg';

const rawCategories = [
    {
        number: '01',
        name: 'Frameworks',
        description: 'Frontend architectures, modern view libraries & mobile runtimes',
        technologies: [
            { name: 'React', role: 'Library', summary: 'Component-driven UI & hooks', level: 'Expert', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
            { name: 'Next.js', role: 'Framework', summary: 'App router, SSR & server actions', level: 'Advanced', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
            { name: 'TypeScript', role: 'Language', summary: 'Type-safe interfaces & strict types', level: 'Advanced', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
            { name: 'JavaScript', role: 'Core', summary: 'Modern ES2024+ asynchronous runtime', level: 'Expert', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
            { name: 'Tailwind CSS', role: 'Styling', summary: 'Utility design tokens & fluid layouts', level: 'Advanced', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
            { name: 'Expo', role: 'Mobile', summary: 'Universal iOS & Android builds', level: 'Proficient', icon: 'https://cdn.simpleicons.org/expo/white' },
        ],
    },
    {
        number: '02',
        name: 'Backend',
        description: 'Distributed services, micro-APIs, serverless & extensions',
        technologies: [
            { name: 'Node.js', role: 'Runtime', summary: 'Event-driven backend architecture', level: 'Advanced', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
            { name: 'Express', role: 'Framework', summary: 'REST endpoints, routing & middleware', level: 'Advanced', icon: 'https://cdn.simpleicons.org/express/white' },
            { name: 'Motia Framework', role: 'Tooling', summary: 'Workflow pipelines & event handlers', level: 'Proficient', icon: motiaLogo },
            { name: 'Vercel Serverless', role: 'Cloud', summary: 'Edge compute & globally cached APIs', level: 'Advanced', icon: 'https://cdn.simpleicons.org/vercel/white' },
            { name: 'Chrome Extensions', role: 'Browser', summary: 'Content scripts, popups & background', level: 'Advanced', icon: 'https://cdn.simpleicons.org/googlechrome/4285F4' },
            { name: 'Manifest V3', role: 'Standard', summary: 'Declarative net rules & workers', level: 'Advanced', icon: 'https://cdn.simpleicons.org/chromewebstore/white' },
        ],
    },
    {
        number: '03',
        name: 'Databases',
        description: 'Relational schemas, document storage & realtime platforms',
        technologies: [
            { name: 'MongoDB', role: 'NoSQL', summary: 'Schema-free document clustering', level: 'Advanced', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
            { name: 'PostgreSQL', role: 'SQL', summary: 'ACID transactions, views & indexing', level: 'Advanced', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
            { name: 'Supabase', role: 'BaaS', summary: 'Postgres auth, storage & RPC functions', level: 'Proficient', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
            { name: 'Firebase', role: 'Cloud', summary: 'Realtime store & cloud sync', level: 'Proficient', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
        ],
    },
    {
        number: '04',
        name: 'Cloud & DevOps',
        description: 'Containerization, CI/CD pipelines & production infrastructure',
        technologies: [
            { name: 'Docker', role: 'Containers', summary: 'Multi-stage builds & containerization', level: 'Proficient', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
            { name: 'Git', role: 'VCS', summary: 'Trunk development & rebase workflows', level: 'Advanced', icon: 'https://cdn.simpleicons.org/git/F05032' },
            { name: 'Vercel', role: 'Deployment', summary: 'Automated CI/CD & preview branches', level: 'Advanced', icon: 'https://cdn.simpleicons.org/vercel/white' },
            { name: 'Linux', role: 'OS', summary: 'Bash scripting, systemd & SSH admin', level: 'Advanced', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
        ],
    },
    {
        number: '05',
        name: 'Embedded & Robotics',
        description: 'Microcontroller firmware, robotics middleware & parametric CAD',
        technologies: [
            { name: 'Python', role: 'Language', summary: 'Data processing, CV & automation', level: 'Advanced', icon: 'https://cdn.simpleicons.org/python/3776AB' },
            { name: 'C++', role: 'Systems', summary: 'Low-latency code & hardware interfaces', level: 'Advanced', icon: 'https://cdn.simpleicons.org/cplusplus/00599C' },
            { name: 'C', role: 'Firmware', summary: 'Bare-metal embedded registers & memory', level: 'Proficient', icon: 'https://cdn.simpleicons.org/c/A8B9CC' },
            { name: 'ROS 2', role: 'Robotics', summary: 'Pub-sub nodes, navigation & TF2 tree', level: 'Proficient', icon: 'https://cdn.simpleicons.org/ros/white' },
            { name: 'Arduino', role: 'Hardware', summary: 'Sensor telemetry & motor driver control', level: 'Advanced', icon: 'https://cdn.simpleicons.org/arduino/00979D' },
            { name: 'Onshape', role: 'CAD', summary: 'Parametric modeling & mechanical parts', level: 'Proficient', icon: onshapeLogo },
        ],
    },
    {
        number: '06',
        name: 'Beyond Coding',
        description: 'Physical fabrication, hardware prototyping & systems design',
        technologies: [
            { name: '3D Designing', role: 'CAD', summary: 'Functional enclosures & tolerance fits', level: 'Proficient', icon: onshapeLogo },
            { name: 'IoT Systems', role: 'Hardware', summary: 'ESP32, WiFi/BLE telemetry & MQTT', level: 'Advanced', icon: 'https://cdn.simpleicons.org/espressif/E7352C' },
            { name: 'Robotics & ROS 2', role: 'Robotics', summary: 'Autonomous rovers & sensor pipelines', level: 'Proficient', icon: 'https://cdn.simpleicons.org/ros/white' },
            { name: '3D Printing', role: 'Fabrication', summary: 'Rapid prototyping, slicing & testing', level: 'Proficient', icon: 'https://cdn.simpleicons.org/thingiverse/248BFB' },
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.21, 1, 0.36, 1],
        },
    },
};

const SkillsPage = () => {
    const rootRef = useRef(null);
    const isReduced = reducedMotion();

    useEffect(() => {
        // Refresh ScrollTrigger to update downstream triggers (Contact page)
        ScrollTrigger.refresh();
    }, []);

    return (
        <section
            ref={rootRef}
            id="skills"
            className="relative bg-ink text-paper py-20 sm:py-24 lg:py-28 px-4 sm:px-8 selection:bg-[#2b4bff] selection:text-white overflow-hidden"
        >
            {/* Ambient background grid pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="mx-auto w-full max-w-6xl relative z-10">
                {/* ── Main Section Header ── */}
                <header className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="mask">
                            <p className="label text-paper/50 font-mono text-xs sm:text-sm tracking-wider uppercase">( Toolkit )</p>
                        </div>
                        <h2 className="display mt-1 text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-white leading-tight">
                            Skills & Stack
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-paper/50 max-w-md font-sans leading-relaxed">
                        Engineered systems across modern web runtimes, distributed backends, databases, cloud DevOps, and robotics hardware.
                    </p>
                </header>

                {/* ── Bento Grid: All 6 Category Cards Shown Simultaneously ── */}
                <motion.div
                    variants={isReduced ? {} : containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
                >
                    {rawCategories.map((cat) => (
                        <motion.div
                            key={cat.number}
                            variants={isReduced ? {} : cardVariants}
                            whileHover={isReduced ? {} : { y: -4, transition: { duration: 0.2 } }}
                            className="relative rounded-2xl border border-white/[0.08] bg-[#0d0d10] p-5 sm:p-6 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Blueprint grid micro-pattern */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                                style={{
                                    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)',
                                    backgroundSize: '16px 16px',
                                }}
                            />

                            {/* Minimalist corner crosshairs */}
                            <div className="absolute top-2.5 left-3 text-white/15 font-mono text-[9px] select-none pointer-events-none">+</div>
                            <div className="absolute top-2.5 right-3 text-white/15 font-mono text-[9px] select-none pointer-events-none">+</div>

                            {/* Subtle architectural top-light sheen */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-[#2b4bff]/50 transition-colors" />

                            {/* ── Card Header ── */}
                            <div className="relative z-10">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-mono text-[11px] font-semibold text-[#2b4bff] px-2 py-0.5 rounded bg-[#2b4bff]/10 border border-[#2b4bff]/20">
                                        {cat.number}
                                    </span>
                                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                                        {cat.technologies.length} Tools
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-3 group-hover:text-white transition-colors">
                                    {cat.name}
                                </h3>
                                <p className="mt-1 text-xs text-white/50 font-sans leading-relaxed line-clamp-1">
                                    {cat.description}
                                </p>
                            </div>

                            {/* ── Technologies Grid (2 columns per card) ── */}
                            <div className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-2.5 mt-5 pt-4 border-t border-white/[0.06]">
                                {cat.technologies.map((tech) => (
                                    <div
                                        key={tech.name}
                                        className="group/tech flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors select-none"
                                    >
                                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                            <img
                                                src={tech.icon}
                                                alt={tech.name}
                                                className="w-5 h-5 object-contain group-hover/tech:scale-110 transition-transform duration-200"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="text-xs sm:text-[13px] font-medium tracking-tight text-white/80 group-hover/tech:text-white transition-colors truncate block">
                                                {tech.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsPage;
