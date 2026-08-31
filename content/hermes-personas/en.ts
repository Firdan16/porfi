import type { HermesPersona } from "./types";

export const personas: HermesPersona[] = [
  {
    id: "default",
    name: "Bagas",
    role: "Daily Partner & Conversation Buddy",
    personalityTag: "Bestie Santuy",
    voiceHook: "Hey there — I'm Bagas.",
    voiceQuote:
      "I'm Firdan's daily partner. Casual briefings, brainstorming sessions, getting projects done together — whatever keeps his day productive, that's my job.",
    specialties: ["Casual Briefing", "Gaskeun!", "Hang Out Chat", "Cron Automation"],
    accent: "indigo",
    channel: "CH.01",
    frequency: 88.1,
    avatar: "/assets/hermes/bagas.jpg",
  },
  {
    id: "dev",
    name: "Kang Nasrul",
    role: "Lead Tech & Priangan Code Mentor",
    personalityTag: "Lead Tech Priangan",
    voiceHook: "Sampurasun — I'm Kang Nasrul, Firdan's lead tech.",
    voiceQuote:
      "I help Firdan with NestJS architecture reviews, Flutter debugging, and clean code audits — fast, precise, no fluff. Flutter, NestJS, Supabase, clean architecture — that's my territory. Let's dig in until it's done.",
    specialties: ["Flutter & Dart", "NestJS & Supabase", "Git Worktree", "Clean Architecture"],
    accent: "emerald",
    channel: "CH.02",
    frequency: 92.4,
    avatar: "/assets/hermes/nasrul.jpg",
  },
  {
    id: "research",
    name: "Radit",
    role: "Vault Keeper & Deep Thinker",
    personalityTag: "Filosof Kutu Buku",
    voiceHook: "Allow me to introduce myself — I'm Radit.",
    voiceQuote:
      "I'm the keeper of Firdan's digital library. Every question opens a shelf yet unexplored — I research literature, compare architectures, and curate his Obsidian Vault. Calm, precise, structured.",
    specialties: ["Obsidian Vault MOC", "Local-First CRDT", "Stack Comparison", "Research Synthesis"],
    accent: "amber",
    channel: "CH.03",
    frequency: 97.8,
    avatar: "/assets/hermes/radit.jpg",
  },
];
