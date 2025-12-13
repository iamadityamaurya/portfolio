import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, Github, Linkedin, Twitter } from 'lucide-react';



const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Web3Forms Submission Endpoint
            const endpoint = "https://api.web3forms.com/submit";

            // Combine form data with your Web3Forms Access Key
            const payload = {
                ...formData,
                access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
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
            icon: <Twitter className="w-5 h-5" />,
            hoverClass: 'hover:bg-sky-500/10 hover:border-sky-500/50 hover:text-sky-400',
            iconBgClass: 'group-hover:bg-sky-500/20 group-hover:text-sky-400'
        },
        {
            name: 'LinkedIn',
            handle: 'linkedin/adityamaurya123',
            url: 'https://www.linkedin.com/in/adityamaurya123',
            icon: <Linkedin className="w-5 h-5" />,
            hoverClass: 'hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400',
            iconBgClass: 'group-hover:bg-blue-500/20 group-hover:text-blue-400'
        },
        {
            name: 'GitHub',
            handle: 'github/addy1947',
            url: 'https://github.com/addy1947',
            icon: <Github className="w-5 h-5" />,
            hoverClass: 'hover:bg-purple-500/10 hover:border-purple-500/50 hover:text-purple-400',
            iconBgClass: 'group-hover:bg-purple-500/20 group-hover:text-purple-400'
        },
        {
            name: 'Email',
            handle: 'adityamaurya1947@gmail.com',
            url: 'mailto:adityamaurya1947@gmail.com',
            icon: <Mail className="w-5 h-5" />,
            hoverClass: 'hover:bg-rose-500/10 hover:border-rose-500/50 hover:text-rose-400',
            iconBgClass: 'group-hover:bg-rose-500/20 group-hover:text-rose-400'
        }
    ];

    return (
        <section id="contact" className="min-h-screen bg-transparent text-slate-50 py-24 px-6 relative overflow-hidden">
            {/* Background Effects */}


            {/* Animated Glow Orbs */}
            {/* Animated Glow Orbs - Removed for Global Consistency */}

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 inline-block">
                        Get In Touch
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Have a groundbreaking idea or just want to chat about tech? <br className="hidden md:block" />
                        I'm always open to discussing new projects and opportunities.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Contact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-7 relative group"
                    >
                        {/* Card Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                        <div className="relative p-8 sm:p-10 rounded-2xl bg-[#0a0404]/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-slate-300 ml-1">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 rounded-xl bg-[#050202]/50 border border-slate-800 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-[#0a0404]/80 outline-none transition-all placeholder:text-slate-600"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-slate-300 ml-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 rounded-xl bg-[#050202]/50 border border-slate-800 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-[#0a0404]/80 outline-none transition-all placeholder:text-slate-600"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-semibold text-slate-300 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-xl bg-[#050202]/50 border border-slate-800 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-[#0a0404]/80 outline-none transition-all placeholder:text-slate-600"
                                        placeholder="Project Inquiry / Collaboration"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-slate-300 ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-5 py-4 rounded-xl bg-[#050202]/50 border border-slate-800 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-[#0a0404]/80 outline-none transition-all resize-none placeholder:text-slate-600 leading-relaxed"
                                        placeholder="Tell me about your project, goals, and timeline..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-[#050202] font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Sending Message...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center font-medium"
                                    >
                                        ✨ Message sent successfully! I'll get back to you soon.
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center font-medium"
                                    >
                                        ⚠️ Failed to send message. Please try again later.
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    </motion.div>

                    {/* Social Links Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-5 space-y-10 lg:pl-8 lg:border-l border-slate-800/50"
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-slate-100">Let's Connect</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                I'm currently looking for new opportunities. Whether you have a question about my work, want to collaborate, or just want to say hi, I'll try my best to get back to you!
                            </p>
                        </div>

                        <div className="space-y-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target={link.name === 'Email' ? undefined : "_blank"}
                                    rel={link.name === 'Email' ? undefined : "noopener noreferrer"}
                                    className={`flex items-center gap-5 p-5 rounded-2xl bg-[#0a0404]/40 border border-slate-800/60 text-slate-300 transition-all group backdrop-blur-sm ${link.hoverClass}`}
                                >
                                    <div className={`p-3 rounded-xl bg-[#050202]/80 text-slate-400 transition-colors shadow-inner z-10 relative ${link.iconBgClass}`}>
                                        {React.cloneElement(link.icon, { className: "w-6 h-6" })}
                                    </div>
                                    <div className="flex flex-col relative flex-1 h-6 overflow-hidden">
                                        <span className="font-bold text-lg absolute inset-0 flex items-center transition-all duration-300 ease-out group-hover:-translate-y-full group-hover:opacity-0">
                                            {link.name}
                                        </span>
                                        <span className="font-medium text-sm md:text-base text-emerald-300/90 absolute inset-0 flex items-center transition-all duration-300 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            {link.handle}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
