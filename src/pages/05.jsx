import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Loader2, Github, Linkedin, Twitter, Copy, Check, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [copiedName, setCopiedName] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCopy = (text, name) => {
        navigator.clipboard.writeText(text);
        setCopiedName(name);
        setTimeout(() => setCopiedName(null), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const endpoint = "https://api.web3forms.com/submit";
            const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'f440176e-6568-4965-96c1-85cfaf8d319c';

            const payload = {
                ...formData,
                access_key: accessKey
            };

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.7 },
                    colors: ['#22d3ee', '#10b981', '#f59e0b', '#f8fafc'],
                    disableForReducedMotion: true,
                });
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                console.error("Web3Forms error:", result);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        {
            name: 'Twitter',
            handle: 'x/AdityaMaur43164',
            url: 'https://x.com/AdityaMaur43164',
            icon: Twitter,
            hoverClass: 'hover:bg-sky-500/10 hover:border-sky-500/50',
            iconBgClass: 'group-hover:bg-sky-500/20 group-hover:text-sky-400'
        },
        {
            name: 'LinkedIn',
            handle: 'linkedin/iamadityamaurya',
            url: 'https://www.linkedin.com/in/iamadityamaurya/',
            icon: Linkedin,
            hoverClass: 'hover:bg-blue-500/10 hover:border-blue-500/50',
            iconBgClass: 'group-hover:bg-blue-500/20 group-hover:text-blue-400'
        },
        {
            name: 'GitHub',
            handle: 'github/iamadityamaurya',
            url: 'https://github.com/iamadityamaurya',
            icon: Github,
            hoverClass: 'hover:bg-purple-500/10 hover:border-purple-500/50',
            iconBgClass: 'group-hover:bg-purple-500/20 group-hover:text-purple-400'
        },
        {
            name: 'Email',
            handle: 'adityamaurya1947@gmail.com',
            url: 'mailto:adityamaurya1947@gmail.com',
            icon: Mail,
            hoverClass: 'hover:bg-rose-500/10 hover:border-rose-500/50',
            iconBgClass: 'group-hover:bg-rose-500/20 group-hover:text-rose-400'
        }
    ];

    return (
        <section id="contact" className="min-h-screen bg-transparent text-slate-50 py-16 sm:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden flex flex-col justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/3 right-1/4 w-[550px] h-[400px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 sm:mb-16 text-center"
                >
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase mb-3 select-none">
                        <span className="w-4 h-px bg-cyan-400" />
                        Inquiries &amp; Outreach
                        <span className="w-4 h-px bg-cyan-400" />
                    </span>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                        Get In Touch
                    </h2>
                    <p className="text-slate-400 mt-2 sm:mt-3 text-sm sm:text-base max-w-lg mx-auto">
                        Have a project, job opening, or hardware build in mind? Let's connect.
                    </p>
                </motion.div>

                {/* Main Grid with matching balanced spacious cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                    {/* Left Column: Contact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-7 h-full flex flex-col"
                    >
                        <div className="relative p-5 sm:p-8 md:p-10 rounded-3xl bg-[#0b101d]/85 border border-slate-800 backdrop-blur-xl shadow-2xl flex-1 flex flex-col justify-between">
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 flex-1 flex flex-col justify-between">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label htmlFor="name" className="text-xs sm:text-sm font-mono font-semibold text-slate-300">
                                            Your Name <span className="text-cyan-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm md:text-base text-slate-100 placeholder:text-slate-600 outline-none focus:border-slate-500 focus:bg-slate-950/90 transition-all"
                                            placeholder="e.g. Sarah Jenkins"
                                        />
                                    </div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label htmlFor="email" className="text-xs sm:text-sm font-mono font-semibold text-slate-300">
                                            Email Address <span className="text-cyan-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm md:text-base text-slate-100 placeholder:text-slate-600 outline-none focus:border-slate-500 focus:bg-slate-950/90 transition-all"
                                            placeholder="sarah@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5 sm:space-y-2">
                                    <label htmlFor="subject" className="text-xs sm:text-sm font-mono font-semibold text-slate-300">
                                        Subject / Project Intent <span className="text-cyan-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm md:text-base text-slate-100 placeholder:text-slate-600 outline-none focus:border-slate-500 focus:bg-slate-950/90 transition-all"
                                        placeholder="Project Inquiry / Job Opportunity"
                                    />
                                </div>

                                <div className="space-y-1.5 sm:space-y-2 flex-1 flex flex-col">
                                    <label htmlFor="message" className="text-xs sm:text-sm font-mono font-semibold text-slate-300">
                                        Message <span className="text-cyan-400">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full flex-1 min-h-[120px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm md:text-base text-slate-100 placeholder:text-slate-600 outline-none focus:border-slate-500 focus:bg-slate-950/90 transition-all resize-none leading-relaxed"
                                        placeholder="Hi Aditya, I'd like to discuss..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs sm:text-sm md:text-base shadow-xl transition-all active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                            <span>Transmitting Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>Send Transmission</span>
                                        </>
                                    )}
                                </button>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-center text-xs sm:text-sm font-medium"
                                    >
                                        ✨ Message sent successfully! I'll get back to you soon.
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center text-xs sm:text-sm font-medium"
                                    >
                                        ⚠️ Failed to send message. Please try again later.
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Column: Social Channels & Direct Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-5 h-full flex flex-col"
                    >
                        <div className="rounded-3xl bg-[#0b101d]/85 border border-slate-800 backdrop-blur-xl p-5 sm:p-8 md:p-10 shadow-2xl flex-1 flex flex-col justify-between">
                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">Let's Connect</h3>
                                <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
                                    I'm currently looking for new opportunities. Whether you have a question about my work, want to collaborate, or just want to say hi, I'll try my best to get back to you!
                                </p>
                            </div>

                            <div className="space-y-3 mt-6 sm:mt-8">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isCopied = copiedName === link.name;
                                    const copyValue = link.name === 'Email' ? link.handle : link.url;

                                    return (
                                        <div
                                            key={link.name}
                                            className={`p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 transition-all flex items-center justify-between group cursor-pointer ${link.hoverClass}`}
                                        >
                                            <a
                                                href={link.url}
                                                target={link.name === 'Email' ? undefined : "_blank"}
                                                rel={link.name === 'Email' ? undefined : "noopener noreferrer"}
                                                className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1"
                                            >
                                                <div className={`p-2.5 sm:p-3 rounded-xl bg-slate-900/90 text-slate-400 transition-colors shrink-0 ${link.iconBgClass}`}>
                                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </div>
                                                <div className="flex flex-col relative flex-1 h-6 sm:h-7 overflow-hidden">
                                                    <span className="font-bold text-sm sm:text-base md:text-lg absolute inset-0 flex items-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0 text-slate-200">
                                                        {link.name}
                                                    </span>
                                                    <span className="font-mono font-medium text-xs sm:text-sm text-cyan-400 absolute inset-0 flex items-center transition-all duration-300 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 truncate">
                                                        {link.handle}
                                                    </span>
                                                </div>
                                            </a>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCopy(copyValue, link.name);
                                                }}
                                                className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2 z-10"
                                                title={`Copy ${link.name}`}
                                            >
                                                {isCopied ? (
                                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                                                ) : (
                                                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
