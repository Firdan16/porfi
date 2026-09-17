import type { HermesPersona } from "./types";

export const personas: HermesPersona[] = [
  {
    id: "default",
    name: "Bagas",
    role: "Daily Partner & Conversation Buddy",
    personalityTag: "Casual Co-pilot",
    voiceHook: "Hey there — I'm Bagas.",
    voiceQuote:
      "I'm Firdan's daily partner. Casual briefings, brainstorming sessions, getting projects done together — whatever keeps his day productive, that's my job.",
    specialties: ["Casual Briefing", "Sprint Momentum", "Brainstorming", "Cron Automation"],
    accent: "blue",
    channel: "CH.01",
    frequency: 88.1,
    avatar: "/assets/hermes/bagas.jpg",
    directive: "Daily co-pilot for morning syncs, rapid brainstorming, and keeping development momentum high.",
    transmissionSample: {
      prompt: "Gas, let's break down today's sprint tasks over coffee.",
      response: "On it, bro! Our top priority today is polishing the micro-interactions on Porfi. Let's make it happen!",
    },
    styleTag: "Casual & Fast-paced",
  },
  {
    id: "dev",
    name: "Kang Nasrul",
    role: "Lead Tech & Priangan Code Mentor",
    personalityTag: "Priangan Tech Lead",
    voiceHook: "Sampurasun — I'm Kang Nasrul, Firdan's lead tech.",
    voiceQuote:
      "I help Firdan with NestJS architecture reviews, Flutter debugging, and clean code audits — fast, precise, no fluff. Flutter, NestJS, Supabase, clean architecture — that's my territory. Let's dig in until it's done.",
    specialties: ["Flutter & Dart", "NestJS & Supabase", "Git Worktree", "Clean Architecture"],
    accent: "emerald",
    channel: "CH.02",
    frequency: 92.4,
    avatar: "/assets/hermes/nasrul.jpg",
    directive: "Architecture audits, Flutter & NestJS code reviews, and debugging complex reactive states.",
    transmissionSample: {
      prompt: "Kang, could you audit this NestJS controller architecture and check our Flutter stream controllers for leaks?",
      response: "Let's dive into it! Make sure stream controllers are properly disposed and dependency injection is cleanly scoped.",
    },
    styleTag: "Precise & Analytical",
  },
  {
    id: "research",
    name: "Radit",
    role: "Vault Keeper & Deep Thinker",
    personalityTag: "Deep Thinker & Curator",
    voiceHook: "Allow me to introduce myself — I'm Radit.",
    voiceQuote:
      "I'm the keeper of Firdan's digital library. Every question opens a shelf yet unexplored — I research literature, compare architectures, and curate his Obsidian Vault. Calm, precise, structured.",
    specialties: ["Obsidian Vault MOC", "Local-First CRDT", "Stack Comparison", "Research Synthesis"],
    accent: "amber",
    channel: "CH.03",
    frequency: 97.8,
    avatar: "/assets/hermes/radit.jpg",
    directive: "Curating Obsidian Vault, literature synthesis, comparing tech stacks, and deep architectural dives.",
    transmissionSample: {
      prompt: "Radit, please compare the trade-offs between Local-First CRDTs and WebSocket sync for our technical notes.",
      response: "Already mapped in your Obsidian Vault: CRDTs excel at offline conflict resolution, with the primary trade-off being metadata overhead.",
    },
    styleTag: "Structured & Deep",
  },
];
