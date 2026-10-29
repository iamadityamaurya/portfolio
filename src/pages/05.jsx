import { useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react';
import { Check, Copy, Loader2 } from 'lucide-react';
import { gsap, reducedMotion } from '../lib/scroll';

const EMAIL = 'adityamaurya1947@gmail.com';

// 16 diverse international languages (+5 added: Arabic, Bengali, Turkish, Vietnamese, Hebrew)
const WORDS = [
    'Contact',   // English
    'संपर्क',     // Hindi
    'Contacto',  // Spanish
    '連絡',      // Japanese
    'Kontakt',   // German
    'Επαφή',     // Greek
    '연락',      // Korean
    '联系',      // Chinese
    'Контакт',   // Russian
    'Contatto',  // Italian
    'Contactez', // French
    'اتصال',     // Arabic
    'যোগাযোগ',   // Bengali
    'İletişim',  // Turkish
    'Liên hệ',   // Vietnamese
    'קשר',       // Hebrew
];

const socials = [
    { name: 'GitHub', url: 'https://github.com/iamadityamaurya' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/iamadityamaurya/' },
    { name: 'X', url: 'https://x.com/aditya_maurya0' },
];

const fieldClass = 'w-full bg-transparent border-0 border-b border-paper/20 py-3 text-base text-paper placeholder:text-paper/30 outline-none focus:border-paper transition-all duration-300';

// Generates random non-overlapping coordinates across the canvas
// with an exclusion zone around the center title & buttons.
function generateRandomSlots(count, isMobile = false) {
    const slots = [];
    const minDistance = isMobile ? 20 : 15; // Minimum spacing in viewport units
    const maxAttempts = 400;

    // Center exclusion zone: protects main "CONTACT" heading, subtitle, and action buttons
    const excludeX = isMobile ? 32 : 27;
    const excludeY = isMobile ? 25 : 18;

    // Boundary limits (in vw and vh)
    const minX = isMobile ? -42 : -45;
    const maxX = isMobile ? 42 : 45;
    const minY = isMobile ? -40 : -42;
    const maxY = isMobile ? 40 : 42;

    for (let i = 0; i < count; i++) {
        let placed = false;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const x = Math.random() * (maxX - minX) + minX;
            const y = Math.random() * (maxY - minY) + minY;

            // Reject if inside center exclusion box
            if (Math.abs(x) < excludeX && Math.abs(y) < excludeY) {
                continue;
            }

            // Check distance against already placed slots to prevent overlapping
            const tooClose = slots.some((s) => {
                const dx = s.x - x;
                const dy = s.y - y;
                // Weighted Euclidean distance accounting for wide word aspect ratios
                return Math.sqrt(dx * dx * 0.75 + dy * dy * 1.35) < minDistance;
            });

            if (!tooClose) {
                slots.push({
                    x: Math.round(x * 10) / 10,
                    y: Math.round(y * 10) / 10,
                    scale: 0.85 + Math.random() * 0.28,
                    timeOffset: (i / count) * 0.52 + (Math.random() - 0.5) * 0.05,
                    driftAngle: Math.random() * Math.PI * 2,
                });
                placed = true;
                break;
            }
        }

        // Fallback perimeter anchor if random attempt limit is reached
        if (!placed) {
            const angle = (i / count) * Math.PI * 2;
            const rx = isMobile ? 36 : 39;
            const ry = isMobile ? 32 : 31;
            slots.push({
                x: Math.round(Math.cos(angle) * rx),
                y: Math.round(Math.sin(angle) * ry),
                scale: 0.9,
                timeOffset: (i / count) * 0.52,
                driftAngle: angle,
            });
        }
    }

    return slots;
}

const ContactPage = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 20 random slots on desktop, 10 on mobile (well-spaced and collision-free)
    const slotCount = isMobile ? 10 : 20;
    const slots = useMemo(() => generateRandomSlots(slotCount, isMobile), [slotCount, isMobile]);

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

    // 3D floating language words in randomized non-overlapping positions
    useLayoutEffect(() => {
        if (reducedMotion()) return;
        const ctx = gsap.context(() => {
            gsap.fromTo('[data-contact-content]',
                { opacity: 0, yPercent: 25, scale: 0.96, filter: 'blur(8px)' },
                { opacity: 1, yPercent: 0, scale: 1, filter: 'blur(0px)', ease: 'none',
                  scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'top 25%', scrub: true } });

            const words = gsap.utils.toArray('[data-word]');
            const n = words.length;
            if (!n) return;

            const tl = gsap.timeline({
                scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
            });

            words.forEach((word, i) => {
                const slot = slots[i % slots.length];
                const ax = (slot.x * window.innerWidth) / 100;
                const ay = (slot.y * window.innerHeight) / 100;
                const driftX = Math.cos(slot.driftAngle) * 24;
                const driftY = Math.sin(slot.driftAngle) * 16;
                const at = Math.max(0, slot.timeOffset);

                tl.fromTo(
                    word,
                    { x: ax - driftX, y: ay - driftY, z: -1100, scale: slot.scale * 0.45, opacity: 0 },
                    { x: ax, y: ay, z: 0, scale: slot.scale, opacity: 0.28, duration: 0.18, ease: 'power1.inOut' },
                    at
                ).to(word, {
                    x: ax + driftX * 1.4,
                    y: ay + driftY * 1.4,
                    z: 750,
                    scale: slot.scale * 1.35,
                    opacity: 0,
                    duration: 0.18,
                    ease: 'power1.in',
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [slots]);

    return (
        <section id="contact" className="relative bg-ink text-paper">
            <div ref={sectionRef} className="relative motion-safe:h-[200dvh] md:motion-safe:h-[250dvh]">
                <div className="sticky top-0 grid h-[100dvh] place-items-center overflow-hidden" style={{ perspective: '1000px' }}>
                    <div className="pointer-events-none absolute inset-0 motion-reduce:hidden" style={{ transformStyle: 'preserve-3d' }} aria-hidden="true">
                        {slots.map((_, i) => (
                            <span
                                key={i}
                                data-word
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(1.1rem,2vw,2.5rem)] font-light uppercase tracking-wider text-paper/75 opacity-0 select-none pointer-events-none"
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
