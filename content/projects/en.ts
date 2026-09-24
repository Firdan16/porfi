import type { Project } from './types';

export const projects: Project[] = [
    {
        id: 1,
        kind: "app",
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
        appStoreUrl: "https://apps.apple.com/app/suluk/id6751481427"
    },
    // {
    //     id: 2,
    //     kind: "app",
    //     title: "Travelogi",
    //     description: "A comprehensive Islamic service platform specializing in Hajj and Umrah travel booking. Seamlessly integrates pilgrimage packages and digital transactions with rich religious features, including an interactive Al-Quran, accurate prayer schedules, and a Qibla compass.",
    //     category: "Mobile App",
    //     version: "ACTIVE",
    //     mainImage: "/assets/travelogi/Travelogi - 1.png",
    //     images: [
    //         "/assets/travelogi/Travelogi - 1.png",
    //         "/assets/travelogi/Travelogi - 2.png",
    //         "/assets/travelogi/Travelogi - 3.png",
    //         "/assets/travelogi/Travelogi - 4.png",
    //         "/assets/travelogi/Travelogi - 5.png"
    //     ],
    //     features: [
    //         { icon: "menu_book", text: "Integrated Quran", description: "Digital Al-Quran with surah/verse navigation, tafsir, and Arabic fonts." },
    //         { icon: "explore", text: "Islamic Services", description: "Location-based prayer time calculations and Qibla compass." },
    //         { icon: "send", text: "Hajj & Umrah Packages", description: "Easy selection, booking, and real-time monitoring of sacred pilgrimage journeys." },
    //         { icon: "revenuecat", text: "Financial Center", description: "Bill payments, digital wallet, and transfer services in a single app." }
    //     ],
    //     tech: ["Flutter", "Bloc", "Provider", "GetIt", "Firebase"],
    //     layout: "reverse",
    //     color: "#042f2e"
    // },
    {
        id: 3,
        kind: "app",
        title: "Bookglance",
        description: "A Flutter mobile application that provides short visual summaries of non-fiction books. A user opens the Home catalog, finds a summary, progresses through ordered visual cards to learn key ideas, and saves progress to their profile.",
        category: "Mobile App",
        version: "ACTIVE",
        mainImage: "/assets/vellum/Vellum - 1.png",
        images: [
            "/assets/vellum/Vellum - 1.png",
            "/assets/vellum/Vellum - 2.png",
            "/assets/vellum/Vellum - 3.png",
            "/assets/vellum/Vellum - 4.png",
            "/assets/vellum/Vellum - 5.png",
            "/assets/vellum/Vellum - 6.png",
            "/assets/vellum/Vellum - 7.png",
            "/assets/vellum/Vellum - 8.png"
        ],
        features: [
            { icon: "menu_book", text: "Visual Book Summaries", description: "Key ideas condensed into elegant, swipeable card presentations." },
            { icon: "sync", text: "Progress Tracking", description: "Real-time reading and completion metrics synchronized with Firestore." },
            { icon: "explore", text: "Curated Catalog", description: "Browse summaries by topics like Habits, Money, Psychology, and Productivity." },
            { icon: "brush", text: "Bookglance-Style Art", description: "Distinctive, minimal visual templates designed specifically for book summaries." }
        ],
        tech: ["Flutter", "Firebase", "Provider", "Google Fonts"],
        layout: "normal",
        color: "#451a03",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.vellum.vellum&pcampaignid=web_share",
        appStoreUrl: "https://apps.apple.com/id/app/bookglance-book-summaries/id6809606778",
    },
    {
        id: 4,
        kind: "app",
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
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.photo_ai.photo_ai&pcampaignid=web_share",
        appStoreUrl: "https://apps.apple.com/id/app/picglow-ai-photo-generator/id6755968576",
    },
    {
        id: 5,
        kind: "app",
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
        id: 6,
        kind: "app",
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
        color: "#064e3b",
        playStoreUrl: "https://play.google.com/store/apps/details?id=app.lifeos.lifesimulator.lifeos&pcampaignid=web_share",
        appStoreUrl: "https://apps.apple.com/id/app/manylives-life-simulator-game/id6811410273",
    },
    {
        id: 7,
        kind: "app",
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
            "/assets/musicai/Musicai - 6.png"
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
    },
    {
        id: 8,
        kind: "package",
        title: "Overmark",
        description: "A Flutter package for spotlight coach marks and onboarding tours. It dims the screen, highlights any widget through a cut-out, and explains it with a fully customizable card. Zero dependencies.",
        category: "Flutter Package",
        version: "0.2.0",
        mainImage: "/assets/overmark/demo-poster.jpg",
        demoVideo: "/assets/overmark/demo.mp4",
        features: [
            { icon: "sparkles", text: "Spotlight Engine", description: "Renders a tracked cut-out over any anchored widget with soft rim, blur, and pulse options." },
            { icon: "visibility", text: "Teach by Doing", description: "Action gates pass taps through the hole to the real control and wait for the user to finish." },
            { icon: "sync", text: "Real Route Behaviour", description: "Back gesture, dismissible config, and a returned outcome describing how the tour ended." },
            { icon: "brush", text: "Fully Themeable", description: "Every colour and text style falls back to the ambient ThemeData, or replace the card entirely." }
        ],
        tech: ["Flutter", "Dart", "Painting", "Overlay"],
        layout: "normal",
        color: "#16337a",
        pubDevUrl: "https://pub.dev/packages/overmark",
        repositoryUrl: "https://github.com/Firdan16/overmark",
        packageMeta: {
            publisher: "firdanumar.com",
            install: "overmark: ^0.2.0",
            snippet: [
                "final outcome = await Overmark.show(",
                "  context,",
                "  steps: [",
                "    OvermarkStep(",
                "      anchorKey: searchKey,",
                "      title: 'Find your next book',",
                "    ),",
                "  ],",
                ");",
            ],
            platforms: ["Android", "iOS", "Web", "macOS", "Windows", "Linux"],
            license: "MIT",
            dependencies: "Zero dependencies",
            likes: 7,
            downloads: 78,
        }
    }
];
