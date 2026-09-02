import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Loader2, Github, Linkedin, Twitter, Copy, Check, MessageSquare } from 'lucide-react';

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
            color: 'hover:border-sky-500/50 hover:text-sky-300'
        },
        {
            name: 'LinkedIn',
            handle: 'linkedin/iamadityamaurya',
            url: 'https://www.linkedin.com/in/iamadityamaurya/',
            icon: Linkedin,
            color: 'hover:border-blue-500/50 hover:text-blue-300'
        },
        {
            name: 'GitHub',
            handle: 'github/iamadityamaurya',
            url: 'https://github.com/iamadityamaurya',
            icon: Github,
            color: 'hover:border-white/50 hover:text-white'
        },
        {
            name: 'Email',
            handle: 'adityamaurya1947@gmail.com',
            url: 'mailto:adityamaurya1947@gmail.com',
            icon: Mail,
            color: 'hover:border-emerald-500/50 hover:text-emerald-300'
        }
    ];

    return (
        <section id="contact" className="min-h-screen bg-transparent text-slate-50 py-28 px-4 sm:px-8 relative overflow-hidden flex flex-col justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/3 right-1/4 w-[550px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs sm:text-sm uppercase tracking-widest mb-4">
                        <MessageSquare className="w-4 h-4" />
                        Initiate Connection
                    </div>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Get In Touch
                    </h2>
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
                        <div className="relative p-7 sm:p-10 md:p-11 rounded-[32px] bg-[#0b101d]/85 border border-slate-800 backdrop-blur-xl shadow-2xl flex-1 flex flex-col justify-between">
                            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs sm:text-sm font-mono font-semibold text-slate-300">
                                            Your Name <span className="text-emerald-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm sm:text-base text-slate-100 placeholder:text-slate-600 outline-none focus:border-emerald-500/60 focus:bg-slate-950/90 transition-all"
                                            placeholder="e.g. Sarah Jenkins"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs sm:text-sm font-mono font-semibold text-slate-300">
                                            Email Address <span className="text-emerald-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm sm:text-base text-slate-100 placeholder:text-slate-600 outline-none focus:border-emerald-500/60 focus:bg-slate-950/90 transition-all"
                                            placeholder="sarah@company.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs sm:text-sm font-mono font-semibold text-slate-300">
                                        Subject / Project Intent <span className="text-emerald-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm sm:text-base text-slate-100 placeholder:text-slate-600 outline-none focus:border-emerald-500/60 focus:bg-slate-950/90 transition-all"
                                        placeholder="Project Inquiry / Job Opportunity / Hardware Prototype"
                                    />
                                </div>

                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label htmlFor="message" className="text-xs sm:text-sm font-mono font-semibold text-slate-300">
                                        Message <span className="text-emerald-400">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full flex-1 min-h-[130px] px-5 py-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-sm sm:text-base text-slate-100 placeholder:text-slate-600 outline-none focus:border-emerald-500/60 focus:bg-slate-950/90 transition-all resize-none leading-relaxed"
                                        placeholder="Hi Aditya, I'd like to discuss a project..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Transmitting Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Transmission</span>
                                        </>
                                    )}
                                </button>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-sm font-medium"
                                    >
                                        ✨ Message sent successfully! I'll get back to you soon.
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center text-sm font-medium"
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
                        <div className="rounded-[32px] bg-[#0b101d]/85 border border-slate-800 backdrop-blur-xl p-7 sm:p-10 md:p-11 shadow-2xl flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Let's Connect</h3>
                                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                                    I'm currently looking for new opportunities. Whether you have a question about my work, want to collaborate, or just want to say hi, I'll try my best to get back to you!
                                </p>
                            </div>

                            <div className="space-y-3.5 mt-8">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    const isCopied = copiedName === link.name;
                                    const copyValue = link.name === 'Email' ? link.handle : link.url;

                                    return (
                                        <div
                                            key={link.name}
                                            className={`p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 transition-all flex items-center justify-between group ${link.color}`}
                                        >
                                            <a
                                                href={link.url}
                                                target={link.name === 'Email' ? undefined : "_blank"}
                                                rel={link.name === 'Email' ? undefined : "noopener noreferrer"}
                                                className="flex items-center gap-3.5 min-w-0 flex-1"
                                            >
                                                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 text-slate-300 group-hover:text-white transition-colors shrink-0">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{link.name}</div>
                                                    <div className="text-xs font-mono text-slate-400 group-hover:text-emerald-400 truncate">
                                                        {link.handle}
                                                    </div>
                                                </div>
                                            </a>

                                            <button
                                                onClick={() => handleCopy(copyValue, link.name)}
                                                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                                                title={`Copy ${link.name}`}
                                            >
                                                {isCopied ? (
                                                    <Check className="w-4 h-4 text-emerald-400" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
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
