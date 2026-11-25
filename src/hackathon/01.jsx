import { useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Calendar,
  Cpu,
  ExternalLink,
  FileText,
  Github,
  MapPin,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { gsap, reducedMotion } from '../lib/scroll';

const hackathons = [
  {
    id: 4,
    name: 'CULMYCA’26 LFR (Line Follower Robot)',
    hackathon: 'CULMYCA’26 Robotics',
    category: 'Autonomous Robotics',
    position: '1st',
    prize: '1st Place Winner',
    date: '10th April 2026',
    location: 'J.C Bose (YMCA Faridabad)',
    metric: '14.8s Run · -2.1s Lead',
    description:
      'Secured 1st position in the high-speed Line Follower Robot competition. Designed and calibrated a high-speed tracking robot optimized for complex grids, intersections, and loops.',
    tech: ['Arduino Nano', 'C++', 'Sensors', 'Hardware Design'],
    teamSize: 3,
    highlight: 'Advanced 8-Channel Tracking',
    specs: [
      { label: 'Microcontroller', value: 'Arduino Nano (ATmega328P @ 16MHz)' },
      { label: 'Sensor Array', value: '8x TCRT5000 IR Phototransistors' },
      { label: 'Actuators', value: '2x N20 Micro Gearmotors (6V, 600 RPM)' },
      { label: 'Motor Driver', value: 'TB6612FNG Dual H-Bridge' },
      { label: 'Power Source', value: '7.4V 2S LiPo Battery (450mAh)' },
      { label: 'Control Algorithm', value: 'PID Control Loop with Dynamic Speed Scaling' },
      { label: 'Hardware Chassis', value: 'FR4 Fiberglass Laminate PCB Base Plate' },
    ],
    challenge:
      'Tuning the PID parameters (Kp, Ki, Kd) to prevent oscillation at top speeds on sharp 90-degree turns and loops. Solved by implementing dynamic Kp scaling based on current error magnitude and steering variance.',
    outcome:
      'Achieved the fastest run of 14.8 seconds, beating the runner-up by 2.1 seconds, with perfect line tracking stability.',
  },
  {
    id: 3,
    name: 'CULMYCA’26 Arduino Innovation (Fireshield)',
    hackathon: 'CULMYCA’26 Innovation',
    category: 'IoT & Embedded Systems',
    position: '1st',
    prize: '1st Place Winner',
    date: '10th April 2024',
    location: 'J.C Bose (YMCA Faridabad)',
    metric: 'Live Socket.IO · <1s Alert',
    description:
      'Developed FireShield, a smart home fire and gas safety system. Features voice alerts, native push notifications, and real-time telemetry updates during emergency alerts.',
    tech: ['ESP32', 'Arduino C++', 'Node.js', 'React Native', 'Socket.IO'],
    teamSize: 3,
    highlight: 'Real-time IoT Safety',
    links: {
      code: 'https://github.com/iamadityamaurya/fire',
      demo: 'https://fire-1-l13l.onrender.com/health',
    },
    specs: [
      { label: 'Microcontroller', value: 'ESP32-WROOM-32D (Dual-Core @ 240MHz)' },
      { label: 'Gas Detection', value: 'MQ-2 Semiconductor Gas/Smoke Sensor' },
      { label: 'Climate Tracking', value: 'DHT22 Precision Temperature & Humidity' },
      { label: 'Telemetry Protocol', value: 'WebSockets via Socket.IO for real-time streams' },
      { label: 'Alert System', value: 'Expo Push Notification Service & TTS Engine' },
      { label: 'Local Alarm', value: '85dB Active Piezo Buzzer & High-Intensity Status LED' },
    ],
    challenge:
      'Developing a non-blocking firmware architecture to continuously sample sensor data and trigger buzzer alerts while concurrently handling Wi-Fi handshakes and Socket.IO connections.',
    outcome:
      'First-place prize for the most complete, deployable IoT integration, demonstrating a live demo with simulated gas leaks and instant app notifications.',
  },
  {
    id: 2,
    name: 'LFR (Line Follower Robot)',
    hackathon: 'YMCA Robotics Event',
    category: '3D-Printed Robotics',
    position: '2nd',
    prize: 'Runner-Up',
    date: '3rd Feb 2026',
    location: 'J.C Bose (YMCA Faridabad)',
    metric: '16.4s Sprint Trial',
    description:
      'Designed and built a custom Line Follower Robot with a 3D-printed chassis, 5-channel IR sensor, and N20 motors. Optimized hardware and tracking algorithms to secure the 2nd position.',
    tech: ['Arduino Nano', 'C++', '3D Printing', 'Robotics'],
    teamSize: 3,
    highlight: 'Custom 3D-Printed Chassis',
    specs: [
      { label: 'Microcontroller', value: 'Arduino Nano (ATmega328P)' },
      { label: 'Sensor Array', value: '5x TCRT5000 IR Sensor Board' },
      { label: 'Chassis', value: 'Custom 3D Printed PETG Chassis (designed in Onshape)' },
      { label: 'Actuators', value: '2x N20 Micro Gearmotors (600 RPM)' },
      { label: 'Control Algorithm', value: 'Standard PID loop with speed clipping' },
      { label: 'Power Source', value: '7.4V 2S LiPo Battery' },
    ],
    challenge:
      'Chassis flex and weight distribution causing traction loss on high-speed turns. Solved by redesigning the chassis in Onshape with reinforcing ribs and lowering the battery mount for a better center of gravity.',
    outcome:
      'Secured second place in a high-speed sprint trial. Run time of 16.4 seconds, with robust chassis stability throughout all runs.',
  },
];

const summaryStats = [
  { code: '01', label: 'Total Podiums', value: '03', note: '100% Top-2 Finish' },
  { code: '02', label: '1st Place Wins', value: '02', note: 'Robotics & IoT' },
  { code: '03', label: 'Runner-Up', value: '01', note: 'Sprint Trial' },
];

const filterOptions = [
  { id: 'all', label: 'All Podiums', count: '03' },
  { id: '1st', label: '1st Place', count: '02' },
  { id: '2nd', label: 'Runner-Up', count: '01' },
];

function HackathonCard({ hackathon, idx }) {
  const [activeTab, setActiveTab] = useState('brief');
  const indexLabel = String(idx + 1).padStart(2, '0');
  const isFirst = hackathon.position === '1st';
  const PlacementIcon = isFirst ? Trophy : Award;

  return (
    <article
      data-hackathon-card
      className="group relative lg:pl-12"
    >
      {/* Desktop Timeline Spine Node */}
      <div
        className="hidden lg:flex absolute left-0 top-8 -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full border border-paper/20 bg-ink font-mono text-[10px] font-bold text-paper/80 transition-colors duration-300 group-hover:border-accent group-hover:text-accent z-10"
        aria-hidden="true"
      >
        {indexLabel}
      </div>

      <div className="rounded-2xl border border-paper/15 bg-paper/[0.02] overflow-hidden transition-all duration-300 hover:border-paper/30">
        {/* Top Telemetry Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 bg-paper/[0.02] px-5 py-3.5 sm:px-8">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
              [ {indexLabel} // {hackathon.hackathon} ]
            </span>
            <span className="hidden sm:inline-block text-paper/20">/</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {hackathon.category}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {hackathon.metric && (
              <span className="hidden sm:inline-flex items-center rounded-full border border-paper/10 bg-ink/60 px-3 py-1 font-mono text-[11px] text-paper/75">
                {hackathon.metric}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider select-none ${
                isFirst
                  ? 'border-accent/40 bg-accent/15 text-cyan-300'
                  : 'border-orange/40 bg-orange/15 text-orange'
              }`}
            >
              <PlacementIcon className="w-3 h-3" />
              <span>
                {hackathon.position} · {hackathon.prize}
              </span>
            </span>
          </div>
        </div>

        {/* Main 2-Column Body */}
        <div className="p-5 sm:p-8 md:p-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Rail: Title, Meta, Tech Stack & Links */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-paper group-hover:text-accent transition-colors leading-[1.02]">
                {hackathon.name}
              </h2>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 font-mono text-xs text-muted select-none">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-3.5 h-3.5 text-paper/40 shrink-0" />
                  <span>{hackathon.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-paper/40 shrink-0" />
                  <span>{hackathon.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-3.5 h-3.5 text-paper/40 shrink-0" />
                  <span>Team of {hackathon.teamSize}</span>
                </div>
                {hackathon.highlight && (
                  <div className="flex items-center gap-2.5 text-paper/80">
                    <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{hackathon.highlight}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-paper/10 space-y-5">
              <div>
                <h3 className="label text-[10px] text-muted mb-3 select-none">
                  Technologies Employed
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {hackathon.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-paper/15 bg-paper/[0.04] px-2.5 py-1 font-mono text-[11px] text-paper/80 select-none"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {hackathon.links && (
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {hackathon.links.code && (
                    <a
                      href={hackathon.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-paper transition-all hover:border-accent hover:bg-accent/10 hover:text-cyan-300 cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {hackathon.links.demo && (
                    <a
                      href={hackathon.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink transition-all hover:bg-accent hover:text-paper shadow-md cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Dossier: Tabbed Brief & Hardware Specs */}
          <div className="lg:col-span-7 flex flex-col border-t lg:border-t-0 lg:border-l border-paper/10 pt-7 lg:pt-0 lg:pl-10">
            {/* Dossier Tab Switcher */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div
                role="tablist"
                aria-label={`${hackathon.name} details`}
                className="inline-flex items-center rounded-full border border-paper/15 bg-ink/80 p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'brief'}
                  onClick={() => setActiveTab('brief')}
                  className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === 'brief' ? 'text-paper' : 'text-muted hover:text-paper/80'
                  }`}
                >
                  {activeTab === 'brief' && (
                    <Motion.span
                      layoutId={`dossier-tab-${hackathon.id}`}
                      className="absolute inset-0 rounded-full bg-paper/15"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <FileText className="relative z-10 w-3 h-3" />
                  <span className="relative z-10">Brief &amp; Impact</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'specs'}
                  onClick={() => setActiveTab('specs')}
                  className={`relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === 'specs' ? 'text-paper' : 'text-muted hover:text-paper/80'
                  }`}
                >
                  {activeTab === 'specs' && (
                    <Motion.span
                      layoutId={`dossier-tab-${hackathon.id}`}
                      className="absolute inset-0 rounded-full bg-accent/25 border border-accent/40"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <Cpu className="relative z-10 w-3 h-3" />
                  <span className="relative z-10">
                    Hardware Specs ({hackathon.specs.length})
                  </span>
                </button>
              </div>
            </div>

            {/* Tab Panel Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'brief' ? (
                <Motion.div
                  key="brief"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <p className="text-sm sm:text-base leading-relaxed text-paper/85">
                    {hackathon.description}
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {hackathon.challenge && (
                      <div className="rounded-xl border border-paper/10 bg-paper/[0.02] p-4 sm:p-5">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted block mb-2 select-none">
                          01 / Engineering Challenge
                        </span>
                        <p className="text-xs sm:text-sm text-paper/75 leading-relaxed">
                          {hackathon.challenge}
                        </p>
                      </div>
                    )}
                    {hackathon.outcome && (
                      <div
                        className={`rounded-xl border p-4 sm:p-5 ${
                          isFirst
                            ? 'border-accent/30 bg-accent/[0.07]'
                            : 'border-orange/30 bg-orange/[0.06]'
                        }`}
                      >
                        <span
                          className={`font-mono text-[10px] font-bold uppercase tracking-widest block mb-2 select-none ${
                            isFirst ? 'text-cyan-300' : 'text-orange'
                          }`}
                        >
                          02 / Key Outcome
                        </span>
                        <p className="text-xs sm:text-sm text-paper/90 leading-relaxed">
                          {hackathon.outcome}
                        </p>
                      </div>
                    )}
                  </div>
                </Motion.div>
              ) : (
                <Motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <dl className="divide-y divide-paper/10 rounded-xl border border-paper/10 bg-ink/50 overflow-hidden">
                    {hackathon.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-1 sm:gap-4 px-4 py-3 transition-colors hover:bg-paper/[0.03]"
                      >
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                          {spec.label}
                        </dt>
                        <dd className="text-xs sm:text-sm text-paper/90 font-medium">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  );
}

const HackathonsPage = () => {
  const rootRef = useRef(null);
  const [filter, setFilter] = useState('all');

  const filteredHackathons =
    filter === 'all'
      ? hackathons
      : hackathons.filter((h) => h.position === filter);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-line]', {
        yPercent: 110,
        duration: 1.0,
        ease: 'expo.out',
        stagger: 0.08,
      });
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.15,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-ink text-paper relative selection:bg-accent selection:text-paper antialiased overflow-x-hidden"
    >
      {/* Subtle architectural grid background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,rgba(236,233,226,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(236,233,226,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden="true"
      />

      {/* Subtle grain texture overlay matching Home */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
        }}
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-8 sm:pt-36">
        {/* Back link */}
        <Link
          to="/"
          data-hero-fade
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-paper mb-10 sm:mb-12"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to home
        </Link>

        {/* Editorial Hero Header */}
        <header className="pb-12 sm:pb-14">
          <p data-hero-fade className="label text-muted text-[11px] sm:text-xs">
            ( Championship Record )
          </p>

          <h1
            className="display mt-4 text-[clamp(2.8rem,10vw,8.5rem)]"
            aria-label="Hackathon Winnings"
          >
            <span className="mask pb-[0.04em]">
              <span data-hero-line className="text-paper">
                Hackathon
              </span>
            </span>
            <span className="mask pb-[0.04em]">
              <span data-hero-line className="text-accent">
                Winnings
              </span>
            </span>
          </h1>

          <div
            data-hero-fade
            className="mt-10 sm:mt-12 grid gap-4 border-t border-paper/15 pt-6 md:grid-cols-[180px_1fr] md:gap-12"
          >
            <span className="label text-muted">Overview</span>
            <p className="max-w-3xl text-base leading-snug text-paper/80 sm:text-xl md:text-2xl">
              High-pressure engineering sprints, embedded IoT builds, and competitive autonomous robotics challenges.
            </p>
          </div>

          {/* Architectural Telemetry Stats Strip */}
          <div
            data-hero-fade
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 border border-paper/15 rounded-2xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-paper/15 bg-paper/[0.02]"
          >
            {summaryStats.map((stat) => (
              <div key={stat.label} className="px-5 py-5 sm:px-6 sm:py-6 flex items-baseline justify-between gap-4">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                    {stat.code} // {stat.label}
                  </span>
                  <span className="font-mono text-xs text-paper/60">
                    {stat.note}
                  </span>
                </div>
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-paper tracking-tight">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Filter Bar */}
        <div
          data-hero-fade
          className="flex flex-wrap items-center justify-between gap-4 border-y border-paper/15 py-4 mb-12"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Filter Record
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            {filterOptions.map((option) => {
              const active = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  className={`relative rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    active ? 'text-ink font-bold' : 'text-paper/70 hover:text-paper'
                  }`}
                >
                  {active && (
                    <Motion.span
                      layoutId="hackathonFilterPill"
                      className="absolute inset-0 rounded-full bg-paper"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    {option.label}{' '}
                    <span className={active ? 'text-ink/60' : 'text-muted'}>
                      ({option.count})
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hackathons Timeline Feed */}
        <div className="relative">
          {/* Vertical Spine on Desktop */}
          <div
            className="hidden lg:block absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-accent/60 via-paper/15 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-10">
            <AnimatePresence mode="popLayout">
              {filteredHackathons.map((hackathon, idx) => (
                <Motion.div
                  key={hackathon.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <HackathonCard hackathon={hackathon} idx={idx} />
                </Motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Closing Navigation Band */}
        <footer className="mt-20 border-t border-paper/15 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="label text-muted text-[11px]">Continue Exploring</p>
            <p className="mt-2 text-lg sm:text-xl font-bold text-paper">
              See full-stack software &amp; hardware builds.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-paper transition-all hover:border-accent hover:bg-accent/10 hover:text-cyan-300"
            >
              <span>All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/experience"
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-all hover:bg-accent hover:text-paper"
            >
              <span>Experience</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HackathonsPage;
