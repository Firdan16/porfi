---
name: Porfi
description: Portfolio Neumorphic untuk Personal Branding & Creative Tech.
colors:
  primary: "#3388FF"
  neutral-bg: "#F0F2F5"
  neutral-text: "#64748B"
  accent: "#2563EB"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  accent:
    fontFamily: "Cormorant Garamond, serif"
    fontWeight: 600
rounded:
  sm: "0.5rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "3.5rem"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  card-project:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: Porfi

## 1. Overview

**Creative North Star: "The Tactile Lab"**

Sistem desain ini menggunakan pendekatan neumorphic modern yang mensimulasikan permukaan fisik dan kontrol taktil. Fokus utamanya adalah pada interaksi yang terasa "nyata" melalui bayangan (shadow) dan gradien halus, memberikan kesan instrumen teknis yang presisi.

Sistem ini menolak desain "flat" standar dan "glassmorphism" yang berlebihan. Estetika yang dibangun adalah industrial yang lembut namun canggih, menggabungkan tipografi sans-serif modern dengan aksen serif klasik untuk karakter yang unik.

**Key Characteristics:**
- Neumorphic depth (soft shadows).
- Industrial tech palette.
- Smooth choreographed motion (GSAP).
- High precision interaction (Magnetic elements).

## 2. Colors

Palette industrial yang bersih dengan aksen biru elektrik untuk fungsionalitas.

### Primary
- **Electric Blue** (#3388FF): Digunakan untuk elemen interaktif utama, indikator LED, dan aksen brand. Memberikan energi "Tech" pada layout yang netral.

### Neutral
- **Soft Industrial Gray** (#F0F2F5): Warna latar belakang utama yang mensimulasikan permukaan plastik/logam matte.
- **Slate Text** (#64748B): Digunakan untuk teks body dan keterangan agar kontras tetap nyaman namun tidak terlalu tajam.

### Named Rules
**The Shadow-as-State Rule.** Bayangan luar menandakan elemen yang menonjol (elevated), bayangan dalam (inset) menandakan elemen yang ditekan atau aktif.

## 3. Typography

Menggabungkan fungsionalitas teknis dengan keanggunan editorial.

**Display Font:** Plus Jakarta Sans
**Body Font:** Plus Jakarta Sans
**Accent Font:** Cormorant Garamond

### Hierarchy
- **Display** (700, clamp, 1.1): Digunakan untuk headline besar di Hero. Kuat dan modern.
- **Body** (400, 1rem, 1.6): Digunakan untuk narasi dan deskripsi proyek. Fokus pada keterbacaan.
- **Accent** (Serif, 600): Digunakan untuk penekanan artistik atau label tertentu untuk memberikan kontras karakter.

## 4. Elevation

Sistem ini sepenuhnya berbasis pada Neumorphism. Tidak menggunakan bayangan ambien standar, melainkan bayangan ganda (light/dark) untuk mensimulasikan kedalaman fisik.

### Shadow Vocabulary
- **Tactile Raise** (`5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff`): Efek tombol atau kartu yang menonjol dari permukaan.
- **Tactile Inset** (`inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff`): Efek elemen yang ditekan ke dalam.

## 5. Components

### Buttons
- **Shape:** Rounded Large (2.5rem).
- **Style:** Neumorphic tactile. Berubah dari raised menjadi inset saat ditekan (active state).
- **Primary:** Menggunakan Electric Blue dengan animasi glow pulsing.

### Cards
- **Shape:** Rounded Large (2.5rem).
- **Background:** Match dengan neutral-bg untuk efek "molded" dari permukaan yang sama.

### Navigation
- **Style:** Glass-nav dengan blur (12px) dan border halus, memberikan kontras terhadap permukaan solid di bawahnya.

## 6. Do's and Don'ts

### Do:
- **Do** gunakan OKLCH untuk modifikasi warna dinamis di CSS jika memungkinkan.
- **Do** pertahankan radius besar (2.5rem+) untuk elemen kontainer besar agar kesan taktil konsisten.
- **Do** gunakan GSAP untuk transisi state agar terasa organik.

### Don't:
- **Don't** gunakan bayangan hitam pekat. Gunakan warna yang diturunkan dari hue background.
- **Don't** gunakan desain flat tanpa kedalaman pada elemen interaktif utama.
- **Don't** gunakan gradien warna-warni yang mencolok; tetap pada satu aksen biru.
