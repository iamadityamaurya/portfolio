import { useLayoutEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { gsap, reducedMotion, scrollToTarget } from '../lib/scroll';

import motiaLogo from '../assets/motia-logo.svg';
import onshapeLogo from '../assets/onshape.svg';

const categories = [
    {
        number: '01',
        name: 'FRAMEWORKS',
        description: 'Interfaces and applications',
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
        name: 'BACKEND',
        description: 'Services, APIs, and extensions',
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
        name: 'DATABASES',
        description: 'Storage and data platforms',
        technologies: [
            { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
            { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
            { name: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
            { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
        ],
    },
    {
        number: '04',
        name: 'CLOUD & DEVOPS',
        description: 'Deployment and infrastructure',
        technologies: [
            { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
            { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
            { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/white' },
            { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
        ],
    },
    {
        number: '05',
        name: 'EMBEDDED & ROBOTICS',
        description: 'Systems, robotics, and hardware',
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
        name: 'BEYOND CODING',
        description: 'Design, hardware, and physical systems',
        technologies: [
            { name: '3D Designing (Onshape)', icon: onshapeLogo },
            { name: 'IoT & Embedded Systems', icon: 'https://cdn.simpleicons.org/espressif/E7352C' },
            { name: 'Robotics & ROS 2', icon: 'https://cdn.simpleicons.org/ros/white' },
            { name: '3D Printing', icon: 'https://cdn.simpleicons.org/thingiverse/248BFB' },
        ],
    },
];

const totalTools = categories.reduce((sum, c) => sum + c.technologies.length, 0);

const SkillsPage = () => {
    const rootRef = useRef(null);
    const pinRef = useRef(null);
    const scrollTriggerRef = useRef(null);
    const [fallbackOpenIndex, setFallbackOpenIndex] = useState(0);

    useLayoutEffect(() => {
        if (!pinRef.current) return;
        if (reducedMotion()) return;

        const mm = gsap.matchMedia();
        mm.add('(min-height: 480px) and (prefers-reduced-motion: no-preference)', () => {
            const pin = pinRef.current;
            const panels = gsap.utils.toArray('[data-panel]', pin);
            const contents = gsap.utils.toArray('[data-content]', pin);
            const icons = gsap.utils.toArray('[data-icon]', pin);
            const nums = gsap.utils.toArray('[data-num]', pin);
            const titles = gsap.utils.toArray('[data-title]', pin);
            const pillsList = gsap.utils.toArray('[data-pills]', pin);
            const n = categories.length;

            const getPanelH = (i) => {
                const el = contents[i];
                if (!el) return 80;
                return el.scrollHeight || el.offsetHeight || 80;
            };

            // Initial setup: Row 0 is open, all other rows are collapsed
            gsap.set(panels[0], { height: () => getPanelH(0) });
            gsap.set(icons[0], { rotate: 45, color: '#2b4bff' });
            gsap.set(nums[0], { color: '#2b4bff' });
            gsap.set(titles[0], { color: '#ece9e2' });
            gsap.set(pillsList[0], { opacity: 1, y: 0 });

            for (let i = 1; i < n; i++) {
                gsap.set(panels[i], { height: 0 });
                gsap.set(icons[i], { rotate: 0, color: 'rgba(236, 233, 226, 0.4)' });
                gsap.set(nums[i], { color: 'rgba(236, 233, 226, 0.4)' });
                gsap.set(titles[i], { color: 'rgba(236, 233, 226, 0.75)' });
                gsap.set(pillsList[i], { opacity: 0, y: 8 });
            }

            // Timeline scrubbed by scroll:
            // Pins the section, opens items one-by-one, and when finished releases to next section.
            const tl = gsap.timeline({
                defaults: { ease: 'power1.inOut' },
                scrollTrigger: {
                    trigger: pin,
                    pin: true,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 3.2}`,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            });

            scrollTriggerRef.current = tl.scrollTrigger;

            // Sequential transitions between categories
            for (let i = 0; i < n - 1; i++) {
                const tStart = i * 1.0 + 0.2;
                const tDuration = 0.65;

                // Close category i
                tl.to(panels[i], { height: 0, duration: tDuration }, tStart)
                  .to(icons[i], { rotate: 0, color: 'rgba(236, 233, 226, 0.4)', duration: tDuration }, tStart)
                  .to(nums[i], { color: 'rgba(236, 233, 226, 0.4)', duration: tDuration }, tStart)
                  .to(titles[i], { color: 'rgba(236, 233, 226, 0.75)', duration: tDuration }, tStart)
                  .to(pillsList[i], { opacity: 0, y: -6, duration: tDuration * 0.6 }, tStart);

                // Open category i + 1
                tl.to(panels[i + 1], { height: () => getPanelH(i + 1), duration: tDuration }, tStart)
                  .to(icons[i + 1], { rotate: 45, color: '#2b4bff', duration: tDuration }, tStart)
                  .to(nums[i + 1], { color: '#2b4bff', duration: tDuration }, tStart)
                  .to(titles[i + 1], { color: '#ece9e2', duration: tDuration }, tStart)
                  .fromTo(
                      pillsList[i + 1],
                      { opacity: 0, y: 8 },
                      { opacity: 1, y: 0, duration: tDuration * 0.75 },
                      tStart + 0.15
                  );
            }

            // Settle hold at the end for the last item (BEYOND CODING)
            // before releasing pin to the next section
            tl.to({}, { duration: 0.5 });

            return () => {
                tl.kill();
                scrollTriggerRef.current = null;
            };
        });

        return () => mm.revert();
    }, []);

    const handleRowClick = (index) => {
        const st = scrollTriggerRef.current;
        if (st && st.pin) {
            // Calculate corresponding scroll position along the pin scrub range
            const stepProgress = Math.min(0.96, Math.max(0.04, (index + 0.15) / categories.length));
            const targetY = st.start + stepProgress * (st.end - st.start);
            scrollToTarget(targetY);
        } else {
            // Fallback for reduced-motion or non-pinned viewports
            setFallbackOpenIndex((prev) => (prev === index ? -1 : index));
        }
    };

    return (
        <section
            ref={rootRef}
            id="skills"
            className="relative bg-ink text-paper"
        >
            <div
                ref={pinRef}
                className="relative flex h-[100svh] min-h-[580px] w-full flex-col justify-center px-4 sm:px-8 lg:px-12 pt-20 pb-10 overflow-hidden"
            >
                <div className="mx-auto w-full max-w-6xl">
                    {/* Header */}
                    <header className="mb-6 sm:mb-10 flex items-end justify-between gap-6">
                        <div>
                            <div className="mask">
                                <p className="label text-paper/50">( SKILLS )</p>
                            </div>
                            <h2 className="display mt-2 sm:mt-4 text-[clamp(2.5rem,7.5vw,6.5rem)] text-paper">
                                Toolkit
                            </h2>
                        </div>
                        <div className="text-right">
                            <p className="label leading-relaxed text-paper/40">
                                {String(totalTools).padStart(2, '0')} TOOLS
                                <br />
                                06 DISCIPLINES
                            </p>
                        </div>
                    </header>

                    {/* Accordion ledger: one full-width row per discipline */}
                    <div className="border-t border-slate-800">
                        {categories.map((category, index) => {
                            const isFallbackOpen = fallbackOpenIndex === index;
                            return (
                                <div
                                    key={category.number}
                                    data-category-row
                                    className="border-b border-slate-800"
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleRowClick(index)}
                                        aria-expanded={isFallbackOpen}
                                        className="group flex w-full cursor-pointer items-center justify-between py-3.5 sm:py-4.5 text-left transition-colors"
                                    >
                                        <div className="flex items-center gap-4 sm:gap-10 min-w-0">
                                            <span
                                                data-num
                                                className={`label transition-colors duration-200 ${isFallbackOpen ? 'text-accent' : 'text-paper/40'}`}
                                            >
                                                {category.number}
                                            </span>
                                            <span
                                                data-title
                                                className={`display truncate text-[clamp(1.4rem,3.8vw,3rem)] transition-colors duration-200 ${isFallbackOpen ? 'text-paper' : 'text-paper/75 group-hover:text-paper'}`}
                                            >
                                                {category.name}
                                            </span>
                                        </div>
                                        <div className="flex h-7 w-7 items-center justify-center shrink-0">
                                            <Plus
                                                data-icon
                                                aria-hidden="true"
                                                strokeWidth={1.5}
                                                className={`h-5 w-5 transition-colors duration-200 ${isFallbackOpen ? 'text-accent' : 'text-paper/40 group-hover:text-paper'}`}
                                                style={{ transform: isFallbackOpen ? 'rotate(45deg)' : undefined }}
                                            />
                                        </div>
                                    </button>

                                    {/* Expanding panel */}
                                    <div
                                        data-panel
                                        className="overflow-hidden"
                                    >
                                        <div
                                            data-content
                                            className="pt-1 pb-5 sm:pb-6 pl-0 sm:pl-[4.5rem]"
                                        >
                                            <p className="mb-3 text-xs text-paper/50 sm:hidden">
                                                {category.description}
                                            </p>
                                            <ul
                                                data-pills
                                                className="flex flex-wrap gap-2 sm:gap-2.5"
                                            >
                                                {category.technologies.map((tech) => (
                                                    <li
                                                        key={tech.name}
                                                        className="flex items-center gap-2.5 rounded-full border border-slate-800 bg-[#0d0d0d] px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-paper/85 transition-colors hover:border-accent/60 hover:text-paper shadow-sm"
                                                    >
                                                        <img
                                                            src={tech.icon}
                                                            alt=""
                                                            className="h-4 w-4 shrink-0 object-contain"
                                                            loading="lazy"
                                                        />
                                                        <span className="whitespace-nowrap font-medium">{tech.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsPage;
