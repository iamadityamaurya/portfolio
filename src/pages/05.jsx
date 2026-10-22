import { useLayoutEffect, useRef, useState } from 'react';
import { Check, Copy, Loader2 } from 'lucide-react';
import { gsap, reducedMotion } from '../lib/scroll';

const EMAIL = 'adityamaurya1947@gmail.com';
const WORDS = ['Contact', 'Contacto', 'Kontakt', 'Contatto', 'Contato', 'संपर्क', '連絡', '연락', '联系', 'Επαφή', 'Контакт'];
const socials = [
    { name: 'GitHub', url: 'https://github.com/iamadityamaurya' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/iamadityamaurya/' },
    { name: 'X', url: 'https://x.com/aditya_maurya0' },
];

const fieldClass = 'w-full bg-transparent border-0 border-b border-paper/20 py-3 text-base text-paper placeholder:text-paper/30 outline-none focus:border-accent transition-colors';

const ContactPage = () => {
    const sectionRef = useRef(null);
    const [wordCount] = useState(() => (window.innerWidth < 768 ? 16 : 40));
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'f440176e-6568-4965-96c1-85cfaf8d319c';
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ ...formData, access_key: accessKey }),
            });
            const result = await response.json();
            if (result.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                console.error('Web3Forms error:', result);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // alejandroha.com contact: content scrubs in from blur, and a tunnel of "contact" words
    // in 11 languages flies from deep z, through anchor points, past the camera.
    useLayoutEffect(() => {
        if (reducedMotion()) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('[data-contact-content]',
                { opacity: 0, yPercent: 25, scale: 0.96, filter: 'blur(8px)' },
                { opacity: 1, yPercent: 0, scale: 1, filter: 'blur(0px)', ease: 'none',
                  scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'top 25%', scrub: true } });

            const words = gsap.utils.toArray('[data-word]');
            const rand = gsap.utils.random;
            const tl = gsap.timeline({
                scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
            });
            words.forEach((word, i) => {
                const angle = (i % 16) / 16 * Math.PI * 2 + rand(-0.15, 0.15);
                const ax = Math.cos(angle) * rand(14, 42) * window.innerWidth / 100;
                const ay = Math.sin(angle) * rand(14, 40) * window.innerHeight / 100;
                const m = rand(0.7, 1.3);
                const at = rand(0, 0.52) + Math.floor(i / 16) * 0.12;
                tl.fromTo(word,
                    { x: ax * 0.15, y: ay * 0.15, z: rand(-1600, -1100), scale: 0.35 * m, opacity: 0 },
                    { x: ax, y: ay, z: 0, scale: m, opacity: rand(0.25, 0.62), duration: rand(0.12, 0.18), ease: 'power1.inOut' }, at)
                  .to(word, { z: rand(800, 1200), scale: m * rand(1.3, 1.65), opacity: 0, duration: 0.18, ease: 'power1.in' });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" className="relative bg-ink text-paper">
            <div ref={sectionRef} className="relative motion-safe:h-[200dvh] md:motion-safe:h-[250dvh]">
                <div className="sticky top-0 grid h-[100dvh] place-items-center overflow-hidden" style={{ perspective: '1000px' }}>
                    <div className="pointer-events-none absolute inset-0 motion-reduce:hidden" style={{ transformStyle: 'preserve-3d' }} aria-hidden="true">
                        {Array.from({ length: wordCount }, (_, i) => (
                            <span
                                key={i}
                                data-word
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(1.5rem,3.5vw,4.5rem)] font-normal uppercase text-paper opacity-0"
                            >
                                {WORDS[i % WORDS.length]}
                            </span>
                        ))}
                    </div>

                    <div data-contact-content className="relative z-10 flex w-[min(90%,50rem)] flex-col items-center gap-8 text-center">
                        <h2 className="display text-[clamp(3.5rem,13vw,12.5rem)]">Contact</h2>
                        <p className="max-w-[30em] text-base leading-relaxed text-paper/70 sm:text-lg">
                            Open to internships, freelance builds and hackathon teams. Have an idea? Let&apos;s talk.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                onClick={copyEmail}
                                className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm text-white transition-transform hover:scale-[1.03] cursor-pointer"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied' : EMAIL}
                            </button>
                            {socials.map((s) => (
                                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                                   className="rounded-full border border-paper/25 px-5 py-3 font-mono text-sm transition-colors hover:border-paper hover:bg-paper hover:text-ink">
                                    {s.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                    <p className="label text-muted">( Or write )</p>
                    <h3 className="display mt-4 text-[clamp(2rem,5vw,4rem)]">Send a<br />message</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" aria-label="Name" className={fieldClass} />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" aria-label="Email" className={fieldClass} />
                    </div>
                    <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="Subject" aria-label="Subject" className={fieldClass} />
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" placeholder="Message" aria-label="Message" className={`${fieldClass} resize-none`} />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="label flex items-center gap-3 text-paper transition-colors hover:text-accent disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Sending' : 'Send message ——→'}
                    </button>
                    {submitStatus === 'success' && <p className="text-sm text-accent">Message sent. I&apos;ll get back to you soon.</p>}
                    {submitStatus === 'error' && <p className="text-sm text-orange">Failed to send. Please email me directly.</p>}
                </form>
            </div>

            <footer className="flex flex-wrap justify-between gap-4 border-t border-paper/10 px-4 py-6 font-mono text-xs text-muted sm:px-8">
                <span>© {new Date().getFullYear()} Aditya Kumar Maurya</span>
                <span>Press ` for terminal</span>
            </footer>
        </section>
    );
};

export default ContactPage;
