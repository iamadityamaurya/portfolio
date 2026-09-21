import deepResearchBanner from '../assets/project_png/deepresearch-showcase.png';
import reelflowBanner from '../assets/project_png/reelflow-showcase.png';
import bunkmaitBanner from '../assets/project_png/bunkmait-showcase.png';
import liveTextOcrBanner from '../assets/project_png/live-text-ocr-showcase.png';
import aiFillerBanner from '../assets/project_png/ai-filler-showcase.png';
import medScrapperBanner from '../assets/project_png/medscrapper-showcase.png';
import restockerBanner from '../assets/project_png/restocker-showcase.png';
import addyBitesBanner from '../assets/project_png/addybites-showcase-wide.png';
import portfolioBanner from '../assets/project_png/image.png';
import motiaBanner from '../assets/project_png/motia-showcase.png';
import fireshieldBanner from '../assets/project_png/fireshield-showcase.png';
import nexgenqueryBanner from '../assets/project_png/nexgenquery-showcase.png';
import dsdBanner from '../assets/project_png/dsd-showcase.png';
import lineFollowerBanner from '../assets/project_png/line-follower-alpha.png';
import unlimitedStorageBanner from '../assets/project_png/unlimited-storage-showcase.png';

export const projectsData = [
  {
    id: 'reelflow-pipeline',
    title: 'ReelFlow: Autonomous AI Reel Pipeline',
    tagline: 'End-to-end automated educational video generation and Instagram publishing studio',
    category: 'Extensions & AI',
    categorySlug: 'extension',
    badge: 'Autonomous AI Pipeline',
    image: reelflowBanner,
    description: 'An automated pipeline orchestrated via Telegram that generates, animates, subtitles, and publishes viral educational 1080x1920 Reels. Features LLM scriptwriting, ElevenLabs voiceover, FFmpeg Ken Burns motion rendering, sidechain audio ducking, and direct Meta Graph API publishing.',
    fullDescription: 'ReelFlow is a fully automated content generation and publishing engine that turns simple topic prompts into production-grade, 60-second vertical videos (Reels/Shorts). Controlled entirely through an interactive Telegram Bot, the pipeline guides the creator through AI idea brainstorming, multi-format scriptwriting (Two-Person Dialogue, Solo Storyteller, Expert vs. Student, Thought Experiment), synchronized TTS voice synthesis, scene visual generation, dynamic Ken Burns motion rendering, burned-in karaoke subtitles, and 1-tap automated publishing via the Instagram Graph API with SQLite state persistence.',
    highlights: [
      'Multi-stage Telegram bot orchestrating brainstorming, scriptwriting, voiceover, and video rendering with inline approval loops',
      'FFmpeg sidechain auto-ducking engine dynamically suppressing background music by 18dB during voiceover with synchronized transition SFX',
      'Word-level synchronized karaoke subtitle generation (.ASS burn-in) and 1080x1920 60FPS Ken Burns motion animation',
      'Automated 1:1 Instagram profile grid safe-zone thumbnail cover generation with bold typography and glowing topic badges',
      'Direct Reel publishing via Meta Graph API container polling and Supabase S3-compatible cloud storage'
    ],
    tech: ['Python 3.14', 'Telegram Bot API', 'FFmpeg', 'Groq (Llama 3.3)', 'ElevenLabs API', 'Deepgram Aura', 'Instagram Graph API', 'Supabase S3', 'SQLite', 'Pillow / PIL'],
    links: {
      demo: 'https://www.instagram.com/_education4you/',
      github: 'https://github.com/iamadityamaurya'
    },
    featured: true,
    mainPageShow: true,
    stat: '1080x1920 60FPS • Auto-Publish'
  },
  {
    id: 'deepquery-agent',
    title: 'DeepQuery - Autonomous AI Research Agent',
    tagline: 'Autonomous deep research engine with LangGraph.js cyclic reasoning, 9 empirical tools & SSE streaming',
    category: 'Extensions & AI',
    categorySlug: 'extension',
    badge: 'Agentic AI & LangGraph',
    image: deepResearchBanner,
    description: 'An autonomous deep research engine powered by LangGraph.js and Next.js 16. It mimics human research workflows by generating initial hypotheses, orchestrating 9 specialized empirical tools concurrently, iteratively synthesizing cross-source evidence through cyclic reasoning loops, and streaming verified markdown reports via Server-Sent Events (SSE).',
    fullDescription: 'DeepQuery is an autonomous deep research platform utilizing compiled LangGraph.js StateGraphs with cyclic conditional routing and multi-provider LLM fallback across Groq (GPT-OSS 120B/20B, Qwen 27B) and Google Gemini 2.5 Flash. It coordinates a 9-tool empirical suite (ArXiv Search, GitHub Analyzer, Tech Discussions, Real-time Finance, Demographics, DNS Diagnostics, Wikipedia REST, Math AST Engine, and Live Web Search with Tavily/DDG fallback) with concurrent execution guards, zero-tool fast-path routing, deterministic MathJS AST evaluation, and real-time Server-Sent Events streaming directly into an interactive research workspace.',
    highlights: [
      'Autonomous Cyclic Reasoning: Dynamic LangGraph.js StateGraph with 4 nodes (plan_research, execute_tools, synthesize_notes, generate_report) and iterative gap-detection loops (up to 4 cycles in Deep Dive mode)',
      '9-Tool Empirical Suite: Concurrent execution (Promise.all) across ArXiv XML API, GitHub REST, HackerNews/Algolia, CoinGecko/Nasdaq, Wikipedia REST, Node.js DNS, and Math AST parsers with timeout guards',
      'Resilient Multi-Provider Fallback: Seamless cascading fallback from primary Groq models (GPT-OSS 120B) to secondary Groq/Google Gemini 2.5 Flash under rate limits or errors',
      'Deterministic Math AST & Zero-Tool Fast Path: mathjs AST evaluation to eliminate arithmetic hallucinations, plus intent heuristics to bypass tool latency on conversational queries',
      'Real-Time SSE Streaming & Rich Workspace: Live pipeline node pulsing, partial state updates, interactive tool inspector modals, and instant Markdown/JSON exports'
    ],
    tech: ['LangGraph.js', 'Next.js 16', 'React 19', 'TypeScript', 'Groq (GPT-OSS)', 'Gemini 2.5 Flash', 'Server-Sent Events', 'mathjs AST', 'Tailwind CSS 4', 'Zod / Cheerio'],
    links: {
      demo: 'https://deepquery.adityamaurya.dev/',
      github: 'https://github.com/iamadityamaurya/deepresearch-agent'
    },
    featured: true,
    mainPageShow: true,
    stat: '9 Empirical Tools • Cyclic AI'
  },
  {
    id: 'live-text-ocr',
    title: 'Live Text OCR for Ubuntu',
    tagline: 'Native, lightweight utility bringing macOS "Live Text" experience to Linux desktop environments',
    category: 'Extensions & AI',
    categorySlug: 'extension',
    badge: 'Desktop Utility & AI',
    image: liveTextOcrBanner,
    description: 'A native, lightweight utility that brings the macOS "Live Text" experience to Linux (Ubuntu, Debian, Wayland/X11). Select any text, code, or QR codes on your screen—such as paused videos, course slides, locked PDFs, or terminals—and instantly recognize, highlight, copy, or search it with zero disk writes.',
    fullDescription: 'Live Text OCR brings native macOS-style Live Text functionality to Linux (Ubuntu, Debian, and other Wayland/X11 environments). It allows users to select any on-screen text or code from videos, lectures, mockups, or terminals with an interactive glassmorphic overlay. Features zero disk writes via direct in-memory framebuffer capture, Python ctypes bindings to libtesseract.so.5 and libzbar.so.0, QR/barcode scanning, dark-mode auto-inversion, GNOME top-bar tray indicator, and global shortcut keybinding (Super + Shift + O).',
    highlights: [
      'Interactive macOS-style Live Text overlay with glowing word/line pills, marquee selection & instant double-click copy',
      'Integrated QR & barcode scanner automatically classifying URLs, Wi-Fi credentials, 2FA tokens, and plain text',
      'Zero disk writes via direct in-memory framebuffer capture streaming directly into libtesseract C-API',
      'Ubuntu GNOME top-panel tray indicator with recent clipboard history & native systemd user daemon'
    ],
    tech: ['Python', 'Tesseract OCR', 'libzbar', 'C-API ctypes', 'GNOME / Wayland / X11', 'Qt', 'systemd'],
    links: {
      github: 'https://github.com/iamadityamaurya/Live-Text-Like-Mac-in-Ubuntu'
    },
    featured: true,
    mainPageShow: true,
    stat: 'Zero Disk Writes'
  },
  {
    id: 'bunkmait',
    title: 'BunkMAIT - Attendance & Timetable Suite',
    tagline: 'College attendance & timetable management suite with predictive analytics',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Production Web & Mobile',
    image: bunkmaitBanner,
    description: 'BunkMAIT solves attendance anxiety for college students by combining automated group timetables with predictive attendance analytics. Built with Next.js 16 on the web and Expo on mobile, it allows students to mark attendance per slot, simulate future bunk limits, manage extra makeup classes, view faculty cabin locations, and check course syllabi in one unified interface. Powered by Supabase PostgreSQL with strict RLS policies and optimized for offline-ready fast loading.',
    fullDescription: 'BunkMAIT is an end-to-end college attendance tracking and timetable management ecosystem built for university students. It combines automated section-wise timetable generation with intelligent attendance calculations, allowing students to predict safe bunk allowances and required makeup classes to meet target thresholds (75%/80%). Featuring offline-first caching, Supabase Row-Level Security, syllabus downloads, and teacher directory lookups.',
    highlights: [
      'Next.js 16 App Router web client + cross-platform React Native / Expo mobile app',
      'Real-time predictive attendance calculator with custom target simulations & safe bunk quotas',
      'Automated section timetables, faculty cabin directory, and course syllabus repositories',
      'Supabase PostgreSQL database with strict Row-Level Security (RLS) & OAuth authentication'
    ],
    tech: ['Next.js 16', 'React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
    links: {
      demo: 'https://bunkmait.adityamaurya.dev/',
    },
    featured: true,
    mainPageShow: true,
    stat: 'Web & Mobile Suite'
  },
  {
    id: 'alpha-line-follower',
    title: 'Alpha Line Follower',
    tagline: 'High-speed autonomous tracking robot with PID control & custom AVR registers',
    category: 'IoT & Robotics',
    categorySlug: 'iot',
    badge: 'Hardware Champion',
    image: lineFollowerBanner,
    description: 'A high-speed autonomous line follower built around an Arduino Nano. It uses an 8-channel IR sensor array, a fixed-point PID controller, and direct AVR register control to make fast, stable steering decisions in real time.',
    fullDescription: 'Alpha Line Follower was engineered for high-precision, high-speed line tracking across complex loops, hairpin turns, and intersecting courses. By bypassing standard Arduino digitalRead calls with direct AVR port manipulation, sensor polling latency was reduced to microseconds.',
    highlights: [
      '8-Channel TCRT5000 IR sensor array for high-resolution edge detection',
      'Fixed-point PID steering loop with dynamic Kp gain scaling on sharp curves',
      'Dual N20 micro metal gearmotors (600 RPM) driven via TB6612FNG dual H-bridge',
      'EEPROM storage for instant track calibration without reflashing firmware'
    ],
    tech: ['Arduino Nano', 'ATmega328P', 'C++', '8-Channel IR Array', 'Fixed-Point PID', 'EEPROM Tuning', '3D CAD'],
    links: {
      github: 'https://github.com/iamadityamaurya'
    },
    featured: false,
    mainPageShow: false,
    stat: '14.8s Track Record'
  },
  {
    id: 'fireshield',
    title: 'FireShield Smart Safety',
    tagline: 'Real-time smart home fire, smoke & gas detection with mobile telemetry',
    category: 'IoT & Robotics',
    categorySlug: 'iot',
    badge: '1st Prize Winner',
    image: fireshieldBanner,
    description: 'A real-time smart home fire and gas safety system. An ESP32 microcontroller reads live sensor data and streams it to a mobile app via a Node.js backend. Features voice alerts, native push notifications, and a hardware buzzer for emergency situations.',
    fullDescription: 'FireShield is an end-to-end IoT safety platform integrating an ESP32 edge device with MQ-2 gas/smoke sensors and DHT22 temperature tracking. Real-time telemetry is streamed over WebSockets to a React Native mobile application and cloud dashboard, dispatching immediate emergency text-to-speech audio alerts and Expo push notifications.',
    highlights: [
      'Dual-core ESP32 edge processing with asynchronous sensor sampling',
      'Real-time WebSocket streaming with sub-50ms emergency latency',
      'React Native companion app with live environmental gauges and push alarms',
      'Active hardware 85dB piezo buzzer and emergency failsafe triggers'
    ],
    tech: ['React Native', 'Expo', 'Node.js', 'Socket.IO', 'ESP32', 'Arduino C++', 'MQ-2 Gas Sensor'],
    links: {
      demo: 'https://fire-1-l13l.onrender.com/health',
      github: 'https://github.com/iamadityamaurya/fire'
    },
    featured: false,
    mainPageShow: false,
    stat: '<50ms Alert Latency'
  },
  {
    id: 'nexgenquery',
    title: 'NexGenQuery',
    tagline: 'Client-side multi-CSV relational SQL execution engine with visual query builder',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Web Utility',
    image: nexgenqueryBanner,
    description: 'An interactive, premium client-side web application designed to load multiple CSV datasets, visually configure complex relational SQL queries through an intuitive wizard, preview highlighted SQL, and execute queries locally in the browser.',
    fullDescription: 'NexGenQuery transforms raw tabular CSV files into fully queryable relational in-memory tables directly in the browser without uploading sensitive data to any server. Includes syntax highlighting, schema inspector, and instant dataset export.',
    highlights: [
      'Client-side SQL engine with zero data leakage (100% private execution)',
      'Multi-table joins (INNER, LEFT, RIGHT), aggregations, and subqueries',
      'Interactive visual SQL query constructor with live code preview',
      'Instant CSV/JSON export with table schema visualization'
    ],
    tech: ['React', 'Tailwind CSS', 'Vite', 'Local SQL Engine', 'In-Memory CSV', 'TypeScript'],
    links: {
      demo: 'https://nexgenquery.vercel.app/',
      github: 'https://github.com/iamadityamaurya/nexgenquery'
    },
    featured: true,
    mainPageShow: true,
    stat: '100% In-Browser'
  },
  {
    id: 'nexgenstorage',
    title: 'NexGenStorage',
    tagline: 'Unlimited cloud drive built on top of Telegram API infrastructure',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Cloud Storage',
    image: unlimitedStorageBanner,
    description: 'A full-stack cloud drive web application leveraging Telegram API (GramJS) to convert Telegram channels into free, unlimited cloud storage. Features interactive file & folder management, direct media streaming, token authentication, and multi-drive organization.',
    fullDescription: 'NexGenStorage re-imagines cloud infrastructure by using distributed Telegram channels as encrypted object storage blocks. Files are chunked and streamed directly to users with a modern Google Drive-like explorer interface.',
    highlights: [
      'Encrypted chunked file streaming without server-side storage overhead',
      'Hierarchical folder tree and interactive file explorer interface',
      'Token-based channel authentication with multi-vault support',
      'Media preview player for video, audio, and PDF documents'
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Telegram API', 'GramJS', 'React Router', 'Node.js'],
    links: {
      github: 'https://github.com/iamadityamaurya/unlimited_storage'
    },
    featured: true,
    mainPageShow: true,
    stat: 'Unlimited Storage'
  },
  {
    id: 'medscrapper',
    title: 'MedScrapper',
    tagline: 'AI-assisted pharmaceutical price intelligence & comparative aggregator',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Healthcare AI',
    image: medScrapperBanner,
    description: 'Stop overpaying for your health. We search top pharmacies like 1mg and Apollo to find you the best deals in seconds.',
    fullDescription: 'MedScrapper aggregates medicine pricing across India’s leading online pharmacies (Tata 1mg, Apollo Pharmacy, Pharmeasy) and uses Google Gemini AI to analyze salt compositions, recommend cost-effective generic alternatives, and save users up to 70% on prescriptions.',
    highlights: [
      'Multi-source pricing scraper and composition matching algorithm',
      'Gemini AI integration for generic salt substitution suggestions',
      'Real-time availability and discount comparison matrix',
      'Prisma ORM database schema for caching searched drugs'
    ],
    tech: ['React', 'TypeScript', 'Prisma', 'Gemini AI', 'Tailwind CSS', 'Node.js'],
    links: {
      demo: 'https://medscrapper.vercel.app/',
      github: 'https://github.com/iamadityamaurya/med_scraper'
    },
    featured: true,
    mainPageShow: true,
    stat: 'Up to 70% Savings'
  },
  {
    id: 'ai-filler-google-form',
    title: 'AI Form AutoFiller (v2.2)',
    tagline: 'Multi-provider BYOK AI Chrome extension with draggable floating widget & smart profile autofill',
    category: 'Extensions & AI',
    categorySlug: 'extension',
    badge: 'Chrome Web Store (v2.2)',
    image: aiFillerBanner,
    description: 'A privacy-first Chrome extension (Manifest V3) that intelligently answers Google Forms using direct browser-to-AI calls (BYOK) with multi-model support across Gemini & Groq, custom persona profiles, and native DOM event simulation.',
    fullDescription: 'AI Form AutoFiller v2.2 eliminates external backend dependencies with a direct BYOK (Bring Your Own Key) architecture. It intelligently parses Google Form DOM trees (radio groups, checkboxes, dropdowns, and textareas), leverages custom personal info profiles for zero-hallucination identity fields, and streams direct browser-to-AI requests across Gemini (2.5 & 3.5 Flash) and Groq (GPT-OSS 120B/20B, Qwen 27B) while triggering native DOM input/change events.',
    highlights: [
      'Direct browser-to-AI BYOK architecture (zero backend servers for speed & privacy)',
      'Multi-provider LLM support: Google Gemini (2.5 / 3.5 Flash) & Groq (GPT-OSS, Qwen)',
      'Personal profile auto-fill for instant name, roll no, college, & contact completion',
      'Draggable in-page floating action widget for 1-click Google Forms automation',
      'Comprehensive DOM parsing & native event simulation (Radio, Checkbox, Dropdown, Textarea)'
    ],
    tech: ['Chrome Extension', 'Manifest V3', 'JavaScript', 'BYOK Serverless', 'Gemini AI', 'Groq API'],
    links: {
      demo: 'https://chromewebstore.google.com/detail/ai-filler-for-google-form/hdkgiebcambianonfpchpdbebnlmaafn',
      github: 'https://github.com/iamadityamaurya/google_form'
    },
    featured: true,
    mainPageShow: true,
    stat: 'v2.2 BYOK Direct'
  },
  {
    id: 'drive-stream-downloader',
    title: 'Drive Stream Downloader',
    tagline: 'High-definition video stream interceptor and FFmpeg command synthesizer',
    category: 'Extensions & AI',
    categorySlug: 'extension',
    badge: 'Developer Tool',
    image: dsdBanner,
    description: 'A Google Chrome extension designed to bypass player restrictions and download Google Drive videos that cannot be downloaded (blocked by Google to download). It analyzes network streams to capture separate high-resolution video and audio tracks, providing a local FFmpeg command builder for instant remuxing.',
    fullDescription: 'When Google Drive restricts download permissions on video files, this extension inspects internal blob requests and web worker stream chunks, captures fragmented video/audio tracks, and constructs lossless FFmpeg remuxing commands with zero quality loss.',
    highlights: [
      'Network stream packet sniffer for restricted HTML5 media players',
      'Multi-bitrate resolution selector and audio stream separator',
      'One-click FFmpeg command generator with automatic sync flags',
      'Lightweight background worker with zero memory leaks'
    ],
    tech: ['Chrome Extension', 'JavaScript', 'Manifest V3', 'FFmpeg', 'HTML5 APIs'],
    links: {
      demo: 'https://drive.google.com/drive/folders/148lG33yWUZCMRjr4oQzp1ACMO6MAe8Zi?usp=sharing',
      github: 'https://github.com/iamadityamaurya/dvd_extension'
    },
    featured: true,
    mainPageShow: false,
    stat: 'Lossless 1080p/4K'
  },
  {
    id: 'restocker',
    title: 'Restocker AI',
    tagline: 'Predictive restaurant inventory intelligence & waste mitigation system',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'AI Analytics',
    image: restockerBanner,
    description: 'AI-powered restaurant inventory management system. Helps reduce waste by 40% and eliminates stockouts with intelligent tracking.',
    fullDescription: 'Restocker automates kitchen supply chain tracking by analyzing order turnover rates, seasonal demand patterns, and expiration timelines to forecast exact replenishment schedules.',
    highlights: [
      'Predictive inventory consumption modeling with Gemini AI',
      'Interactive visual dashboard with Chart.js consumption analytics',
      'Automated low-stock notifications and supplier purchase order drafting',
      'Demonstrated 40% reduction in perishable food wastage'
    ],
    tech: ['React', 'Tailwind CSS', 'AI Analytics', 'Gemini AI', 'Chart.js', 'Node.js'],
    links: {
      demo: 'https://restocker.vercel.app/',
      github: 'https://github.com/iamadityamaurya/restocker_frontend'
    },
    featured: true,
    mainPageShow: false,
    stat: '-40% Food Waste'
  },
  {
    id: 'addybites',
    title: 'AddyBites Food Network',
    tagline: 'Modern full-stack food delivery experience with real-time checkout & order state',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'E-Commerce',
    image: addyBitesBanner,
    description: 'A full-stack food ordering platform featuring seamless cart management, user authentication, and real-time order tracking.',
    fullDescription: 'AddyBites provides a seamless food ordering pipeline with dynamic menu filtering, secure JWT session management, MongoDB order history, and instant order state updates.',
    highlights: [
      'Full authentication and role-based customer/admin dashboard',
      'Optimistic cart updates with persistent storage',
      'RESTful Express and MongoDB backend API architecture',
      'Responsive mobile-first UI with smooth micro-animations'
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
    links: {
      demo: 'https://addybites.vercel.app',
      github: 'https://github.com/iamadityamaurya/addyBites'
    },
    featured: true,
    mainPageShow: false,
    stat: 'Full E2E Stack'
  },
  {
    id: 'motia-onboarding',
    title: 'Motia Onboarding Automation',
    tagline: 'Event-driven enterprise employee onboarding workflow engine',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Enterprise Platform',
    image: motiaBanner,
    description: 'A comprehensive solution designed to streamline and automate the employee onboarding process. This project is a monorepo containing both the event-driven backend and the aesthetic, user-friendly frontend.',
    fullDescription: 'Motia simplifies company onboarding by automating credential provisioning, document verification workflows, task assignment checklists, and manager oversight in a unified portal.',
    highlights: [
      'Event-driven architectural workflow automation',
      'Multi-stage role-based approval hierarchies',
      'Clean modular monorepo architecture',
      'Glassmorphic dark UI with progress tracking metrics'
    ],
    tech: ['Motia Framework', 'React', 'JavaScript', 'Tailwind CSS', 'Vercel', 'Node.js'],
    links: {
      demo: 'https://motia-project.vercel.app/',
      github: 'https://github.com/iamadityamaurya/motia_project'
    },
    featured: true,
    mainPageShow: false,
    stat: 'Event-Driven'
  },
  {
    id: 'portfolio-v1',
    title: 'Developer Portfolio',
    tagline: 'Personal engineering showcase with dark obsidian glassmorphism & particle physics',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Portfolio',
    image: portfolioBanner,
    description: 'My personal portfolio website built to showcase my projects and skills. Features a premium dark theme, glassmorphism effects, and smooth animations.',
    fullDescription: 'Crafted to highlight the intersection of physical hardware engineering, robotics, and full-stack software development.',
    highlights: [
      'Next-generation dark aesthetic with custom glowing gradients',
      'Responsive design with dynamic spotlight Command Palette (Cmd+K)',
      'Rich case studies and live hardware telemetry specs',
      'Framer Motion layout transitions and spring physics'
    ],
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Lucide Icons'],
    links: {
      demo: 'https://iamadityamaurya.vercel.app',
      github: 'https://github.com/iamadityamaurya/portfolio'
    },
    featured: false,
    mainPageShow: false,
    stat: '60 FPS Motion'
  }
];
