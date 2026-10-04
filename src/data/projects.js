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
    fullDescription: 'I built an end-to-end Instagram content pipeline that starts by fetching an idea from the internet, then researches it using an AI agent, generates a few visual concepts, creates image assets, uses human-like voice generation for narration, combines the selected scenes into a final video, and pushes it directly to the content channel for publishing. The workflow is fully automated through a Telegram bot and runs through an internal production pipeline where each stage is validated before the final upload. It also handles rendering, subtitle generation, audio mixing, and direct publishing to Instagram, so the entire process works with minimal manual intervention.',
    highlights: [
      'Idea discovery starts from online research and is expanded through AI-driven topic analysis before content generation',
      'The workflow combines AI research, image generation, voice generation, and final video assembly into one automated pipeline',
      'A Telegram bot acts as the control layer for triggering, reviewing, and managing the publishing flow',
      'Rendered videos are exported in Reels-ready format, then uploaded automatically with the final production assets',
      'The system is built as a full end-to-end pipeline with minimal manual work after the initial idea is provided'
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
    title: 'DeepQuery - LangChain and LangGraph Research Agent',
    tagline: 'An autonomous research graph that routes questions through tools, evidence checks, and iterative synthesis',
    category: 'Extensions & AI',
    categorySlug: 'extension',
    badge: 'Autonomous Tool-Using AI',
    image: deepResearchBanner,
    fullDescription: 'DeepQuery is not a single prompt sent to a model and it is not a fixed chain of searches. It uses LangChain for the model and tool layer, and LangGraph.js to coordinate the full research workflow as a state graph. A user question enters the graph and the planning agent decides which tools are relevant. Tool nodes run searches and analysis, then return their results into the shared research state. A synthesis node summarizes the evidence and checks what is still missing. LangGraph conditional edges then decide whether to route the state back into planning for another round or move forward to report generation. Once the evidence is sufficient, the graph produces and streams a grounded research report with the collected findings and reasoning steps visible in the workspace.',
    highlights: [
      'LangChain powers the model and tool-calling layer, while LangGraph.js manages the stateful research workflow',
      'A LangGraph state graph routes work through planning, tool execution, evidence synthesis, and report generation nodes',
      'Conditional graph edges detect research gaps and send the state back for another tool-selection cycle when necessary',
      'The tool layer covers web research, GitHub, academic papers, discussions, finance, demographics, DNS, Wikipedia, and math',
      'The final report streams live into the workspace with collected evidence, tool activity, and intermediate state visible'
    ],
    tech: ['LangChain.js', 'LangGraph.js', 'Next.js 16', 'React 19', 'TypeScript', 'Groq (GPT-OSS)', 'Gemini 2.5 Flash', 'Server-Sent Events', 'mathjs AST', 'Tailwind CSS 4', 'Zod / Cheerio'],
    links: {
      demo: 'https://deepquery.adityamaurya.dev/',
      github: 'https://github.com/iamadityamaurya/deepresearch-agent'
    },
    featured: true,
    mainPageShow: true,
    stat: 'Iterative Tool-Driven Research'
  },
  {
    id: 'live-text-ocr',
    title: 'Live Text OCR for Ubuntu',
    tagline: 'Native, lightweight utility bringing macOS "Live Text" experience to Linux desktop environments',
    category: 'Extensions & AI',
    categorySlug: 'extension',
    badge: 'Desktop Utility & AI',
    image: liveTextOcrBanner,
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
    fullDescription: 'BunkMAIT was built to solve the real frustrations students face during the semester: manually calculating attendance, guessing which classes can be skipped, finding faculty cabins, tracking assignments, and keeping up with academic schedules. The platform lets students set any threshold they want — 30%, 50%, 75%, or even 90% — and instantly calculates how much attendance is safe to lose while still meeting the target. It includes automated timetable access, teacher and cabin lookup, syllabus tracking, academic calendar views, exam schedules, upcoming holidays, and attendance updates from students across the campus. This app was designed especially for students of Maharaja Agrasen Institute Of Technology, Delhi, and has been adopted by 1,000+ students in college, with students actively updating their attendance and academic details on the platform. A special thanks goes to my friends Swayam Bansal and Arun Kukrety for helping build this app.\n\nThe web app is available at bunkmait.adityamaurya.dev, the Android app is available via the linked APK, and the WhatsApp community helps students stay connected and updated.',
    highlights: [
      '1,000+ active student users in college, with daily attendance and timetable updates',
      'Predictive attendance calculator that lets students set any target threshold and plan safe bunk decisions',
      'Automatic timetable access, faculty cabin lookup, syllabus tracking, and academic calendar management',
      'Web + Android delivery with real student usage and campus-wide adoption'
    ],
    tech: ['Next.js 16', 'React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
    links: {
      demo: 'https://bunkmait.adityamaurya.dev/',
      
    },
    featured: true,
    mainPageShow: true,
    stat: '1K+ USERS'
  },
  {
    id: 'alpha-line-follower',
    title: 'Alpha Line Follower',
    tagline: 'High-speed autonomous tracking robot with PID control & custom AVR registers',
    category: 'IoT & Robotics',
    categorySlug: 'iot',
    badge: 'Hardware Champion',
    image: lineFollowerBanner,
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
    tagline: 'Local CSV visualizer and no-code SQL query generator',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Web Utility',
    image: nexgenqueryBanner,
    fullDescription: 'NexGenQuery is a local-first SQL query generator and execution tool for working with CSV data. Upload one or more CSV files, inspect the data through a visual interface, choose the relationships and operations you need, generate the SQL query through a visual builder, and execute it directly in the browser. The query engine runs against in-memory data on the user\'s device, which means both the files and the query results stay local and never pass through a server. Unlike sending private datasets to an LLM for SQL generation, NexGenQuery keeps the complete workflow inside the website.',
    highlights: [
      'Upload and visualize CSV datasets directly inside the browser',
      'Generate SQL queries visually without writing SQL by hand',
      'Generate and execute SQL locally in the browser against in-memory data',
      'Keep sensitive datasets private instead of sending them to an LLM or external service'
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
    tagline: 'Private client-side file storage and search built on Telegram channels',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Cloud Storage',
    image: unlimitedStorageBanner,
    fullDescription: 'NexGenStorage was built around a simple problem: Telegram can hold a lot of files, but finding one later is difficult when everything is buried in a group or channel. The app connects directly to Telegram from the client, so there is no server in between collecting or processing your files. You can upload files, place them inside folders, search across your stored data, and browse everything through a dedicated file explorer built for Telegram-backed storage. Keeping the workflow client-side also gives privacy more importance: your data is not routed through a separate storage server owned by the app.',
    highlights: [
      'Uses Telegram groups and channels as the underlying storage layer',
      'Searches uploaded files so users do not have to scan through Telegram messages',
      'Folder-based organization with an interactive cloud-drive file explorer',
      'Runs entirely on the client side with no intermediary server handling user files',
      'Supports direct browsing and previews for video, audio, and PDF files'
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
    tagline: 'Medicine price comparison across five Indian pharmacy websites',
    category: 'Full Stack',
    categorySlug: 'fullstack',
    badge: 'Healthcare AI',
    image: medScrapperBanner,
    fullDescription: 'I built MedScrapper because essential medicines should not become more expensive simply because someone does not know which pharmacy has the better price. When a user searches, the platform fetches live medicine information and current pricing from five Indian pharmacy websites, then presents the results together so users can compare options without checking every site manually. Since these services do not provide a simple public API for this workflow, I designed a careful, resilient data-collection pipeline that handles their different page structures and request restrictions. The result is a practical medicine search and comparison platform that brings live product details, availability, and pricing into one view, with Gemini AI helping analyze medicine compositions and identify relevant alternatives.',
    highlights: [
      'Fetches live medicine information and current prices from five Indian pharmacy websites',
      'Compares live availability, discounts, and product details in one interface',
      'Resilient source-specific data collection without relying on a single public API',
      'Gemini AI analysis for salt composition and relevant medicine alternatives'
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
