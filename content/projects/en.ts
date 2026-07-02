import type { Project } from './types';

export const projects: Project[] = [
    {
        id: 1,
        title: "Suluk",
        description: "A comprehensive Islamic lifestyle and social platform. Integrates prayer times, Qibla direction, and social features with a robust Supabase backend for real-time synchronization.",
        category: "Mobile App",
        version: "STABLE",
        mainImage: "/assets/suluk/Suluk-main-1.png",
        images: [
            "/assets/suluk/Suluk-main-1.png",
            "/assets/suluk/Suluk-main-2.png",
            "/assets/suluk/Suluk-main-3.png",
            "/assets/suluk/Suluk-main-4.png",
            "/assets/suluk/Suluk-main-5.png"
        ],
        features: [
            { icon: "explore", text: "Qibla Compass Engine", description: "High-precision directional logic using mobile sensors." },
            { icon: "sync", text: "Real-time Sync", description: "Instant data sync across devices with low latency." },
            { icon: "schedule", text: "Prayer Time Algorithm", description: "Accurate calculation based on geolocation coordinates." },
            { icon: "groups", text: "Social Community", description: "Connect with others through shared religious goals." }
        ],
        tech: ["Flutter", "Bloc", "Google Maps API"],
        layout: "normal",
        color: "#0f172a",
        playStoreUrl: "https://play.google.com/store/apps/details?id=id.bapli.idrisiyyah&hl=id",
    },
    {
        id: 2,
        title: "Photo AI",
        description: "AI-powered image generation and editing suite. Leverages Google Gemini via Firebase Cloud Functions to transform text prompts and existing photos into high-quality AI art.",
        category: "Mobile App",
        version: "RELEASED",
        mainImage: "/assets/photo-ai/Photo-ai-main-1.png",
        images: [
            "/assets/photo-ai/Photo-ai-main-1.png",
            "/assets/photo-ai/Photo-ai-main-2.png",
            "/assets/photo-ai/Photo-ai-main-3.png",
            "/assets/photo-ai/Photo-ai-main-4.png",
            "/assets/photo-ai/Photo-ai-main-5.png"
        ],
        features: [
            { icon: "auto_fix_high", text: "Gemini Vision Integration", description: "Advanced prompt engineering for AI image analysis." },
            { icon: "cloud_done", text: "Serverless Architecture", description: "Scalable backend logic using Firebase Cloud Functions." },
            { icon: "brush", text: "AI Style Transfer", description: "Apply artistic styles to any photograph instantly." },
            { icon: "security", text: "Secure Auth Layer", description: "Robust user authentication with Firebase Auth." }
        ],
        tech: ["Flutter", "Firebase", "Vertex AI", "Node.js"],
        layout: "reverse",
        color: "#1e1b4b",
    },
    {
        id: 3,
        title: "Text RPG",
        description: "An interactive story engine where players shape their own adventure. Features AI-generated branching narratives, genre-specific visual styles, and hidden 'glimpses' to unlock.",
        category: "Mobile App",
        version: "ACTIVE",
        mainImage: "/assets/text-rpg/textrpg-main-1.png",
        images: [
            "/assets/text-rpg/textrpg-main-1.png",
            "/assets/text-rpg/textrpg-main-2.png",
            "/assets/text-rpg/textrpg-main-3.png",
            "/assets/text-rpg/textrpg-main-4.png",
            "/assets/text-rpg/textrpg-main-5.png"
        ],
        features: [
            { icon: "menu_book", text: "Branching Narratives", description: "Dynamic story paths generated based on player decisions." },
            { icon: "visibility", text: "Hidden Glimpse System", description: "Special unlockable events hidden throughout the gameplay." },
            { icon: "psychology", text: "AI Narrator Logic", description: "LLM-powered storytelling with consistent world-building." },
            { icon: "palette", text: "Thematic UI Skins", description: "Visual styles that adapt to the current story genre." }
        ],
        tech: ["Flutter", "Vertex AI", "OpenAI", "Python", "Firebase"],
        layout: "normal",
        color: "#27272a"
    },
    {
        id: 4,
        title: "LifeOS",
        description: "A notification-first life simulator mobile game. Players navigate custom career tracks, build relationships, manage resources, and face persistent narrative consequences shaped by real-time generative AI.",
        category: "Mobile App",
        version: "ACTIVE",
        mainImage: "/assets/lifeos/Lifeos - 1.png",
        images: [
            "/assets/lifeos/Lifeos - 1.png",
            "/assets/lifeos/Lifeos - 2.png",
            "/assets/lifeos/Lifeos - 3.png",
            "/assets/lifeos/Lifeos - 4.png",
            "/assets/lifeos/Lifeos - 5.png"
        ],
        features: [
            { icon: "psychology", text: "Generative AI Events", description: "Dynamic story progression powered by LLMs generating year-by-year life occurrences." },
            { icon: "work", text: "Diverse Career Tracks", description: "Climb the ranks in specialized careers like Startup Founder, Crime Boss, or Politician." },
            { icon: "send", text: "Notification Simulation", description: "Engage in game choices modeled entirely as immersive system notifications." },
            { icon: "revenuecat", text: "Subscription Gating", description: "Entitlements managed in real-time with RevenueCat integration." }
        ],
        tech: ["Flutter", "Firebase", "Grok AI", "RevenueCat", "Node.js"],
        layout: "reverse",
        color: "#064e3b"
    },
    {
        id: 5,
        title: "MusicAI",
        description: "An AI-powered music generation app. Leverages Google Lyria models to generate high-quality audio tracks from prompts, dynamically generates album covers, and builds MP4 files for distribution.",
        category: "Mobile App",
        version: "ACTIVE",
        mainImage: "/assets/musicai/Musicai - 1.png",
        images: [
            "/assets/musicai/Musicai - 1.png",
            "/assets/musicai/Musicai - 2.png",
            "/assets/musicai/Musicai - 3.png",
            "/assets/musicai/Musicai - 4.png",
            "/assets/musicai/Musicai - 5.png",
            "/assets/musicai/Musicai - 6.png",
            "/assets/musicai/Musicai - 7.png"
        ],
        features: [
            { icon: "auto_fix_high", text: "Google Lyria Synthesis", description: "Generates 30s clips or full-length tracks using specialized Lyria audio models." },
            { icon: "palette", text: "Gemini Cover Generation", description: "Automatically crafts matching visual album art using Gemini Image generation." },
            { icon: "cloud_done", text: "Serverless Audio Pipeline", description: "Deducts user credits and processes jobs asynchronously via Cloud Functions and FFmpeg." },
            { icon: "visibility", text: "Custom Audio Player", description: "Features in-app playback with support for audio background services." }
        ],
        tech: ["Flutter", "Firebase", "Vertex AI", "Lyria AI", "FFmpeg"],
        layout: "normal",
        color: "#3b0764"
    }
];
